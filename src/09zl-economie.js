/* ---------- Économie d'énergie : la question du premier lancement au doigt ----------
   Au doigt (téléphone, tablette), l'économie d'énergie (30 images par seconde, CAP, et réglages d'image choisis par le jeu, ECO_GFX, 01-core.js) part activée et le jeu demande une fois s'il faut
   la garder (#ecoAsk, au milieu de l'écran) : Activer (en jaune, où arrive le focus) ou Non merci. Échap, B ou un clic sur le fond la gardent.
   La question attend le menu principal libre (fenêtre « Quoi de neuf », installation de l'application, partie reprise après un rechargement).
   Settings.ecoAsk reste vrai tant que le joueur n'a pas répondu : une page fermée avant la réponse repose la question au lancement suivant.
   Sur un bureau à puce faible (GPU_WEAK, rendu logiciel, ou puce intégrée 2015-2020 de GPU_IGPU, 01-core.js), l'économie part coupée et ecoAsk ne
   vaut jamais vrai : ecoAsk() ci-dessous pose alors la même question une fois, pour l'activer ; la réponse est marquée (Settings.ecoWeakAsked,
   posé dans ecoClose) et un refus n'est jamais redemandé. */
function ecoBusy() {
  if (MATCH.state !== 'menu' || UI.screen !== 'main' || document.body.classList.contains('gated')) return true;
  return [...document.querySelectorAll('[role=dialog], [role=alertdialog]')].some((e) => e.id !== 'ecoAsk' && !e.classList.contains('hidden') && e.getClientRects().length > 0);
}
function ecoAsk() {
  // bureau à puce faible : la question n'y a jamais été posée, on la pose une fois (réponse marquée dans ecoClose)
  if (!Settings.ecoAsk && !COARSE && !Settings.ecoWeakAsked && (GPU_WEAK || GPU_SOFT || GPU_IGPU)) Settings.ecoAsk = true;
  if (!Settings.ecoAsk || !$('ecoAsk').classList.contains('hidden')) return;
  if (ecoBusy()) { setTimeout(ecoAsk, 1500); return; }
  const el = $('ecoAsk'); el._from = document.activeElement; el.classList.remove('hidden');
  if (lmWantFocus()) $('ecoOn').focus({ preventScroll: true });
}
function ecoClose(on) {
  const el = $('ecoAsk'); if (el.classList.contains('hidden')) return;
  el.classList.add('hidden'); sfxUi('click');
  const was = Settings.eco; Settings.eco = on; Settings.ecoAsk = false; Settings.ecoWeakAsked = true; saveSettings(); syncOptions(); if (was !== on) ecoApply();
  const f = el._from; el._from = null; if (f && f.isConnected && f.focus && lmWantFocus()) f.focus({ preventScroll: true });
}
/* Économie d'énergie activée ou coupée : la qualité en vigueur (gfxSet) change, le mode automatique repart de son échelon de départ ;
   un passage à Minimale ou depuis Minimale propose de relancer (ombres décidées au lancement) */
function ecoApply() { qualityReset(); qualityBootCheck(); }
function ecoInit() {
  $('ecoOn').addEventListener('click', () => ecoClose(true)); $('ecoOff').addEventListener('click', () => ecoClose(false));
  $('ecoAsk').addEventListener('click', (e) => { if (e.target === e.currentTarget) ecoClose(true); }); // un clic sur le fond : elle reste activée
  addEventListener('keydown', (e) => { if (e.code === 'Escape' && !$('ecoAsk').classList.contains('hidden')) { e.preventDefault(); e.stopImmediatePropagation(); ecoClose(true); } }, true);
}
ecoInit();
