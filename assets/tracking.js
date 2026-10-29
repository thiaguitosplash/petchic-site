/* PetChic - medição (Google Analytics 4): clique no WhatsApp + aviso de cookies.
   Coloque este arquivo em assets/tracking.js. Depende do snippet do <head> (gtag). */
(function () {
  var KEY = 'petchic_cookies';
  function track(name, params) { if (typeof gtag === 'function') gtag('event', name, params || {}); }

  // 1) Clique em qualquer link do WhatsApp (wa.me)
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href*="wa.me"]') : null;
    if (!a) return;
    var onde = a.classList.contains('wa') ? 'botao_flutuante'
      : a.closest('header') ? 'cabecalho'
      : a.closest('footer') ? 'rodape' : 'conteudo';
    track('whatsapp_click', { link_location: onde, pagina: location.pathname, transport_type: 'beacon' });
  });

  // 2) Consentimento de cookies
  function setConsent(v) {
    if (typeof gtag !== 'function') return;
    gtag('consent', 'update', { analytics_storage: v, ad_storage: v, ad_user_data: v });
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (err) {}
  if (saved === 'granted') { setConsent('granted'); return; }
  if (saved === 'denied') { return; }

  function mk(tag, css, txt) { var el = document.createElement(tag); el.style.cssText = css; if (txt) el.textContent = txt; return el; }
  var bar = mk('div', 'position:fixed;left:0;right:0;bottom:0;z-index:20;background:#0B1B44;color:#fff;border-top:3px solid #D1AC55;padding:14px 16px;font:15px/1.5 "Nunito Sans",system-ui,sans-serif;display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;justify-content:center');
  bar.setAttribute('role', 'dialog'); bar.setAttribute('aria-label', 'Aviso de cookies');
  var p = mk('p', 'margin:0;max-width:46em');
  p.appendChild(document.createTextNode('Usamos cookies de medição do Google (Analytics e Google Ads) para entender como o site é usado e melhorar o atendimento. Você pode aceitar ou recusar. '));
  var l = mk('a', 'color:#D1AC55', 'Política de Privacidade'); l.href = 'privacidade.html'; p.appendChild(l);
  function done(v) { try { localStorage.setItem(KEY, v); } catch (err) {} setConsent(v); bar.remove(); }
  var ok = mk('button', 'background:#D1AC55;color:#07122E;border:2px solid #D1AC55;border-radius:99px;padding:10px 22px;font-weight:800;cursor:pointer;font-size:15px', 'Aceitar');
  var no = mk('button', 'background:transparent;color:#fff;border:2px solid #D1AC55;border-radius:99px;padding:10px 22px;font-weight:800;cursor:pointer;font-size:15px', 'Recusar');
  ok.onclick = function () { done('granted'); }; no.onclick = function () { done('denied'); };
  bar.appendChild(p); bar.appendChild(ok); bar.appendChild(no);
  document.body.appendChild(bar);
})();
