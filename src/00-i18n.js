/* ==========================================================================
   LANGUES : français et anglais
   Les textes du code sont écrits en français : _t('texte') renvoie ce texte tel quel en français et sa traduction en anglais
   (dictionnaire i18n/en.txt, intégré par build.py à la place du marqueur ci-dessous). Une clé sans traduction reste en français.
   Paramètres : _t('Niveau {0} sur {1}', n, max). Pluriels : _tn(n, '{0} ennemi', '{0} ennemis', ...autres) (n est {0} ; le français compte 0 et 1 au singulier,
   l'anglais seulement 1). La langue se choisit au chargement de la page (Options > Jeu > Langue) : dans ce fork destiné au
   public vietnamien, le mode automatique retient la première langue reconnue (vi, fr ou en) annoncée par le navigateur et,
   à défaut, le vietnamien ; un choix manuel enregistré (dc_settings) prime toujours ; un changement recharge la page. Voir README, « Langues ».
   ========================================================================== */
const I18N_EN = /*__I18N_EN__*/ {};
const I18N_VI = /*__I18N_VI__*/ {}; // dictionnaire vietnamien (i18n/vi.txt), intégré par build.py comme I18N_EN
const I18N_MISS = new Set(); // clés absentes du dictionnaire rencontrées en anglais (contrôle : tools/dev/check_i18n.py)
/* Langue choisie : 'auto', 'en', 'fr' ou 'vi' (enregistrée avec les réglages) ; la langue effective, LANG, est 'en', 'fr' ou 'vi' */
const LANG_PREF = (() => {
  try { const s = JSON.parse(localStorage.getItem('dc_settings') || 'null'); if (s && (s.lang === 'en' || s.lang === 'fr' || s.lang === 'vi')) return s.lang; } catch (e) { /* ignoré */ }
  return 'auto';
})();
const LANG = (() => {
  // Cầu nối Sân Chơi 9X : le paramètre d'URL prime pour la session — ?lang=vi|en|fr explicite,
  // ou ?xk9x=1 (entrée depuis Sân Chơi) qui impose le vietnamien par défaut, même si un ancien
  // dc_settings avait figé l'anglais. Rien n'est écrit dans dc_settings : hors cầu nối, le choix
  // enregistré et la détection automatique ci-dessous s'appliquent comme avant.
  try { const q = new URLSearchParams(location.search), l = q.get('lang'); if (l === 'en' || l === 'fr' || l === 'vi') return l; if (q.get('xk9x')) return 'vi'; } catch (e) { /* ignoré */ }
  if (LANG_PREF !== 'auto') return LANG_PREF;
  const l = (typeof navigator !== 'undefined' && (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language])) || [];
  for (const x of l) { const c = String(x || '').slice(0, 2).toLowerCase(); if (c === 'fr' || c === 'en' || c === 'vi') return c; }
  return 'vi'; // fork vietnamien : à défaut d'une langue reconnue, le vietnamien prime (et non l'anglais comme en amont)
})();
/* Công tắc mở khóa súng tạm thời (đợt trải nghiệm, cầu nối Sân Chơi) : ?unlockall=1|0 lu dès ici, avant Settings
   (01-core.js) et avant tout appel à weaponLock (06r-arsenal.js). true/false si le paramètre est présent, null sinon
   (on garde alors la valeur enregistrée dans les réglages). 01-core.js l'applique et l'enregistre. */
const UNLOCKALL_URL = (() => {
  try { const v = new URLSearchParams(location.search).get('unlockall'); if (v === '1') return true; if (v === '0') return false; } catch (e) { /* ignoré */ }
  return null;
})();
const LOCALE = LANG === 'fr' ? 'fr-FR' : LANG === 'vi' ? 'vi-VN' : 'en-US';
const PCT = LANG === 'fr' ? ' %' : '%'; // « 10 % » en français, « 10% » en anglais et en vietnamien
const I18N_DICT = LANG === 'vi' ? I18N_VI : I18N_EN; // dictionnaire actif (le français n'en a pas : les clés sont en français)
function _t(fr, ...a) {
  let s = fr;
  if (LANG === 'en' || LANG === 'vi') { const e = I18N_DICT[fr]; if (e !== undefined && Object.prototype.hasOwnProperty.call(I18N_DICT, fr)) s = e; else I18N_MISS.add(fr); }
  return a.length ? s.replace(/\{(\d+)\}/g, (m, i) => (+i < a.length ? String(a[+i]) : m)) : s;
}
/* Pluriel : one sert pour 1 en anglais, pour 0 et 1 en français ; les deux formes se traduisent séparément */
function _tn(n, one, many, ...a) { return _t((LANG === 'en' || LANG === 'vi' ? n === 1 : n < 2) ? one : many, n, ...a); } // vietnamien : comme l'anglais, « one » pour 1 seul (le vietnamien n'a pas de pluriel ; les deux formes sont traduites dans vi.txt)
/* Nombre et date selon la langue */
function fmtNum(n, digits) { return Number(n).toLocaleString(LOCALE, digits === undefined ? undefined : { minimumFractionDigits: digits, maximumFractionDigits: digits }); }
function fmtDate(d, opts) { return d.toLocaleDateString(LOCALE, opts); }
/* Traduit les textes statiques de la page (shell.html) : nœuds de texte et attributs dont le texte est une clé du dictionnaire */
function i18nDom(root) {
  if (LANG !== 'en' && LANG !== 'vi') return;
  const tr = (s) => { const k = s.trim(); if (!k || !Object.prototype.hasOwnProperty.call(I18N_DICT, k)) return s; return s.replace(k, () => I18N_DICT[k]); };
  const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.nodeType === 1 && (n.tagName === 'SCRIPT' || n.tagName === 'STYLE') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
  for (let n = w.currentNode; n; n = w.nextNode()) {
    if (n.nodeType === 3) { const v = tr(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; continue; }
    if (n.nodeType !== 1) continue;
    for (const a of ['aria-label', 'placeholder', 'title', 'alt']) if (n.hasAttribute && n.hasAttribute(a)) { const v = n.getAttribute(a), r = tr(v); if (r !== v) n.setAttribute(a, r); }
  }
}
document.documentElement.lang = LANG;
i18nDom(document.body);
if (LANG === 'en' || LANG === 'vi') document.title = _t(document.title); // titre de l'onglet (dans <head>, hors de body)
