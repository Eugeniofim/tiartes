/* =====================================================
   FREDDY TURISMO — a vitrine (primeira tela) e o "Quem é o Roberto"
   (14/10/2026)

   Pedido do Roberto: vitrine mais parecida com a da Dulcineia (Conexão
   Berlim), com MENOS coisas — foto grande, redes no topo, poucos botões e
   diretos. Por isso esta tela substitui a do demo de Londres (carol.js),
   que tinha consultoria, ingressos, eBooks e vale-presente na frente.
   Essas telas continuam existindo (o painel as usa), só saíram da vitrine.
   ===================================================== */
'use strict';

const ICONE_MSG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/></svg>';
const ICONE_CARRO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 16v-3.5L5 8h14l2 4.5V16"/><path d="M3 16h18"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/><path d="M6 12h12"/></svg>';

function viewHub() {
  const st = DB.settings;
  const aval = (DB.avaliacoes || []).filter(a => a.publicar);
  const ig = String(st.insta || '').replace(/^@/, '');
  /* redes NO TOPO, sobre a foto (pedido dele) */
  const redes = [
    ig ? { u: 'https://instagram.com/' + ig, ic: ICONE_IG, n: 'Instagram', c: 'ig' } : null,
    st.whats ? { u: waLink('Olá, Roberto! Vim pelo app da Freddy Turismo.'), ic: ICONE_WA, n: 'WhatsApp', c: 'wa' } : null,
    linkExterno(st.facebook) ? { u: linkExterno(st.facebook), ic: ICONE_FB, n: 'Facebook', c: 'fb' } : null,
    linkExterno(st.site) ? { u: linkExterno(st.site), ic: ICONE_SITE, n: 'Site', c: 'site' } : null,
    st.email ? { u: 'mailto:' + st.email, ic: IC.email, n: 'E-mail', c: 'mail' } : null,
  ].filter(Boolean);
  const bt = (id, ic, tit, sub, cls = '') => `<button class="lk ${cls}" id="${id}"><span class="ic">${ic}</span><span><b>${tit}</b><small>${sub}</small></span><span class="go" aria-hidden="true">→</span></button>`;
  app.innerHTML = `
  <div class="fdHub">
    <header class="fdTopo" style="background-image:url(${esc(st.homePhoto || 'fotos/p-tower-bridge.jpg')})">
      <nav class="fdRedes" aria-label="Redes da Freddy Turismo">${redes.map(r =>
        `<a class="fdRede ${r.c}" href="${esc(r.u)}" target="_blank" rel="noopener" aria-label="${r.n}" title="${r.n}">${r.ic}</a>`).join('')}</nav>
      ${langBar('right fdLangs')}
      ${st.homePhotoCr ? `<small class="fdCr">${esc(st.homePhotoCr)}</small>` : ''}
    </header>
    <div class="fdIn">
      <div class="fdCard">
        <div class="fdLogo">${logoImg(58, 'claro')}</div>
        <p class="fdLema">Londres de Mercedes, com quem conhece.</p>
        <p class="fdTag">${esc(noIdioma(st.homeText) || t('tagline'))}</p>
        <p class="fdSelos"><span>Desde 2008</span><span>PT · EN · IT · ES</span><span>★ 5,0 TripAdvisor</span></p>
      </div>

      ${bt('goTours', ICONE_MENU.passeios, 'Passeios', 'City tour, Windsor, Stonehenge, Oxford, Cotswolds…', 'main')}
      ${bt('goTransfer', ICONE_MENU.transfer, 'Transfer', 'Aeroporto, hotel, porto ou entre cidades')}
      ${bt('goMsg', ICONE_MSG, 'Mensagens', 'Fale com o Roberto e receba os avisos da viagem')}
      ${bt('goRoteiro', ICONE_MENU.roteiro, 'Monte seu roteiro', 'Me diga os dias, eu organizo tudo')}
      <button class="lk" id="goAbout"><span class="ic">${ICONE_CARRO}</span><span><b>Quem é o Roberto e a frota</b><small>Brasileiro em Londres desde 2008 · Mercedes executivos</small></span><span class="go" aria-hidden="true">→</span></button>
      ${bt('goAval', IC.estrela, 'Avaliações', aval.length ? `${aval.length} ${aval.length === 1 ? 'avaliação' : 'avaliações'} · deixe a sua` : 'Fez um passeio comigo? Deixe a sua')}

      ${typeof secaoDepoimentos === 'function' ? secaoDepoimentos('noHub') : ''}
      ${typeof secaoViagem === 'function' ? secaoViagem() : ''}

      ${typeof temNuvem === 'function' && !temNuvem()
        ? `<button class="adm-demo" id="admEntry"><span class="ic" aria-hidden="true">✦</span><span><b>Roberto, abra o seu painel</b><small>Reservas, transfers, agenda, ficha dos clientes, Comunicação e o assistente de IA</small></span><span class="go" aria-hidden="true">→</span></button>`
        : `<button class="adm-entry" id="admEntry">🔒 ${t('admEntry')}</button>`}
      <p class="fdRodape">Freddy Turismo London · TfL licensed · ${esc(st.whats || '')}</p>
    </div>
  </div>`;
  bindLang(app);
  $('#goTours').onclick = () => go('/tours');
  $('#goTransfer').onclick = () => go('/transfer');
  $('#goMsg').onclick = () => go('/mensagens');
  $('#goRoteiro').onclick = () => go('/roteiro');
  $('#goAbout').onclick = () => go('/about');
  $('#goAval').onclick = () => go('/avaliacoes');
  $('#admEntry').onclick = () => go('/adm/today');
}

function viewAbout() {
  const st = DB.settings;
  const paras = ((st.bio && tl(st.bio)) || '').split(/\n\s*\n/).filter(Boolean);
  const carros = [
    ['Mercedes Classe S', 'Para quem quer o máximo de conforto', 'até 3 pessoas'],
    ['Mercedes Classe E', 'Casais, executivos e transfers', 'até 3 pessoas'],
    ['Mercedes V-Class AMG', 'Famílias e grupos, com espaço para malas', 'até 7 pessoas'],
  ];
  app.innerHTML = `${topoCarol()}
  <main class="wrap about carolAbout">
    <div class="abFoto"><img src="${esc(st.photo || 'fotos/home-westminster.jpg')}" alt=""></div>
    <p class="lema escuro">Londres de Mercedes, com quem conhece.</p>
    <h1 class="pageh">Quem é o ${esc(guiaNome())}</h1>
    <p class="abSub">${esc(st.badge || '')}</p>
    <div class="ab-body">${paras.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    <div class="ab-facts">
      <div><small>Em Londres desde</small><b>2008</b></div>
      <div><small>Idiomas</small><b>${esc(G.idiomas || 'Português')}</b></div>
      <div><small>Carros</small><b>Mercedes · TfL</b></div>
    </div>
    <h2 class="h3 fdFrotaTit">A frota</h2>
    <div class="fdFrota">${carros.map(([n, s, q]) => `<div class="fdCarro"><span class="ic">${ICONE_CARRO}</span><b>${n}</b><small>${s}</small><em>${q}</em></div>`).join('')}</div>
    <p class="why">Todos licenciados pela TfL, com Wi-Fi, água, guarda-chuva e limpeza completa depois de cada serviço.</p>
    ${typeof secaoDepoimentos === 'function' ? secaoDepoimentos('noSobre') : ''}
    <div class="ab-cta">
      <h3>Vamos planejar a sua Londres?</h3>
      <div class="ab-btns">
        <button class="cta" id="abTours">${t('seeTours')}</button>
        <a class="mini" href="#/mensagens">Mensagens</a>
        <a class="mini" href="${waLink('Olá, Roberto!')}" target="_blank" rel="noopener">WhatsApp</a>
        <a class="mini" href="https://instagram.com/${esc(String(st.insta || '').replace(/^@/, ''))}" target="_blank" rel="noopener">@${esc(String(st.insta || '').replace(/^@/, ''))}</a>
      </div>
    </div>
  </main>`;
  ligaVoltar('/');
  $('#abTours').onclick = () => go('/tours');
}
