'use strict';
// Suggest a browser language. Never redirect or replace the visitor's choice.
const languages = {es:'Español',en:'English',pt:'Português',it:'Italiano',fr:'Français',de:'Deutsch'};
const lang = document.documentElement.lang;
const parts = location.pathname.split('/').filter(Boolean);
const campaign = ['navidad', 'christmas'].includes(parts[1]);
const page = ['terms','privacy','refunds','shipping'].includes(parts[1]) ? parts[1] + '/' : '';
const preferred = (navigator.languages || [navigator.language]).map(value => value.toLowerCase().split('-')[0]).find(value => languages[value] && (!campaign || ['es','en'].includes(value)));
const suggestion = document.querySelector('[data-suggest]');
if (suggestion && preferred && preferred !== lang) {
  let dismissed = false;
  try { dismissed = sessionStorage.getItem('kinfm-language-dismissed') === preferred; } catch (_) { /* Privacy mode: suggestion still works. */ }
  if (!dismissed) {
    const text = document.createElement('div');
    text.append(document.createTextNode(suggestion.dataset.prefix + ' ' + languages[preferred] + '? '));
    const link = document.createElement('a');
    const campaignLang = preferred === 'es' ? 'es' : 'en';
    const campaignPath = campaignLang === 'es' ? 'navidad/' : 'christmas/';
    link.href = campaign ? '/' + campaignLang + '/' + campaignPath + (parts.length > 2 ? (campaignLang === 'es' ? 'tarjeta/' : 'card/') : '') : '/' + preferred + '/' + page;
    link.lang = preferred;
    link.hreflang = preferred;
    link.textContent = suggestion.dataset.action;
    text.append(link);
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = '×';
    close.setAttribute('aria-label', suggestion.dataset.dismiss);
    close.addEventListener('click', () => {
      suggestion.hidden = true;
      try { sessionStorage.setItem('kinfm-language-dismissed', preferred); } catch (_) { /* Non-essential. */ }
    });
    suggestion.append(text, close);
    suggestion.hidden = false;
  }
}
// No missing audio request when the demo is absent. The director adds the file,
// then regenerates the site; generate.py connects only the real local asset.
for (const audio of document.querySelectorAll('audio[data-demo][src]')) {
  const pending = audio.parentElement.querySelector('[data-demo-pending]');
  const caption = audio.parentElement.querySelector('[data-demo-caption]');
  audio.addEventListener('error', () => {
    audio.hidden = true;
    if (caption) caption.hidden = true;
    if (pending) pending.hidden = false;
  });
}
// Escape closes the language picker and restores keyboard focus.
for (const picker of document.querySelectorAll('.language-picker')) {
  picker.addEventListener('keydown', event => {
    if (event.key === 'Escape') { picker.open = false; picker.querySelector('summary').focus(); }
  });
}
