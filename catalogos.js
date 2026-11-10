/* Módulo complementar: não altera window.PORTFOLIO_DADOS nem o diário. */
(() => {
  'use strict';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const path = p => typeof p === 'string' && !p.startsWith('/') && !p.startsWith('//') && !p.includes('..') && /^(?:[\w-]+\/)*[\w.\-]+$/.test(p) ? p : null;
  const url = p => {if(!p) return null; const v=path(p); if(v)return v; try{const u=new URL(p);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}};
  async function jsonFile(file) {const r = await fetch(file+'?v='+Date.now(), {cache:'no-store'});if(!r.ok)throw new Error(`${file}: ${r.status}`);return r.json();}
  function addSection(parent,title,desc,id){const section=document.createElement('div');section.className='catalogo-block';section.innerHTML=`<div class="section-head"><div><h3>${esc(title)}</h3><p class="intro">${esc(desc)}</p></div></div><div id="${id}" class="grid"><div class="empty">Carregando catálogo…</div></div>`;parent.append(section);return section.querySelector('#'+id);}
  function empty(root,msg){root.innerHTML=`<div class="empty">${esc(msg)}</div>`;}
  function link(label,target){const v=url(target);return v?`<a class="btn outline" target="_blank" rel="noopener noreferrer" href="${esc(v)}">${esc(label)} ↗</a>`:'';}
  function fmtDate(v){if(!v)return 'Data a registrar';const d=new Date(v+'T12:00:00');return isNaN(d.getTime())?String(v):new Intl.DateTimeFormat('pt-BR').format(d);}
  function cardSample(x){const fig=url(x.previa);const label=x.classe||'Classe não informada';return `<article class="card catalogo-card">${fig?`<img class="catalogo-thumb" loading="lazy" src="${esc(fig)}" alt="Prévia da amostra ${esc(x.id||'')}" />`:''}<span class="badge">${esc(label)}</span><h3>${esc(x.id||'Amostra')}</h3><p>${esc(x.descricao||'Amostra catalogada.')}</p><div class="pillrow">${x.imagem_origem?`<span class="pill">Origem: ${esc(x.imagem_origem)}</span>`:''}${x.conjunto?`<span class="pill">${esc(x.conjunto)}</span>`:''}</div>${link('Arquivo da amostra',x.arquivo)}</article>`;}
  function cardTest(x){const date=fmtDate(x.data);return `<article class="card catalogo-card"><span class="badge">${esc(x.status||'Registrado')}</span><h3>${esc(x.titulo||x.id||'Experimento')}</h3><p>${esc(x.descricao||'')}</p><div class="pillrow"><span class="pill">${esc(date)}</span>${Number.isFinite(x.total_amostras)?`<span class="pill">${x.total_amostras} amostras</span>`:''}${Number.isFinite(x.acuracia_teste)?`<span class="pill">Teste: ${(x.acuracia_teste*100).toFixed(2)}%</span>`:''}</div>${link('Ver resultados',x.pagina||(`testes/${x.id}/resumo.json`))}</article>`;}
  async function render(){
    const samplesRoot=document.getElementById('lista-amostras');
    const testsRoot=document.getElementById('lista-experimentos');
    const historyRoot=document.getElementById('lista-historico');
    if(!samplesRoot||!testsRoot)return;
    const sm=addSection(samplesRoot.parentElement,'Galeria de amostras','Pré-visualizações e informações do catálogo público, separadas dos GeoTIFFs mantidos no Drive.','catalogo-amostras');
    const tm=addSection(testsRoot.parentElement,'Testes publicados','Experimentos lidos automaticamente do catálogo JSON do repositório.','catalogo-testes');
    try{
      const d=await jsonFile('amostras/catalogo.json');
      const arr=Array.isArray(d.amostras)?d.amostras:[];
      if(arr.length)sm.innerHTML=arr.map(cardSample).join('');else empty(sm,'Ainda não existem amostras publicadas neste catálogo.');
      const qtd=d.contagens_por_classe||{};
      if(Object.keys(qtd).length){const p=document.createElement('p');p.className='hint';p.textContent='Contagens verificadas por classe: '+Object.entries(qtd).map(([c,n])=>`${c}: ${n}`).join(' · ');sm.before(p);}
    }catch(e){console.warn(e);empty(sm,'Catálogo de amostras indisponível. Confira amostras/catalogo.json.');}
    try{
      const d=await jsonFile('testes/catalogo.json');const arr=Array.isArray(d.experimentos)?d.experimentos:[];
      if(arr.length){tm.innerHTML=arr.slice().sort((a,b)=>String(b.data||'').localeCompare(String(a.data||''))).map(cardTest).join('');}
      else empty(tm,'Nenhum novo experimento foi publicado nesta pasta. Os registros históricos continuam acima.');
    }catch(e){console.warn(e);empty(tm,'Catálogo de testes indisponível. Confira testes/catalogo.json.');}
    if(historyRoot){try{const h=await jsonFile('historico/atualizacoes.json');const arr=Array.isArray(h.atualizacoes)?h.atualizacoes:[];if(arr.length){const group=document.createElement('div');group.innerHTML='<h3>Atualizações publicadas automaticamente</h3>'+arr.slice().sort((a,b)=>String(b.data||'').localeCompare(String(a.data||''))).map(x=>`<article class="list-date"><div class="date">${esc(fmtDate(x.data))}</div><h3>${esc(x.titulo)}</h3><p>${esc(x.descricao||'')}</p></article>`).join('');historyRoot.append(group);}}catch(e){console.warn(e);}}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
