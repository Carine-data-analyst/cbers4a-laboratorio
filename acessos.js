/* ACERVO RESTRITO — configure APENAS URLs do Drive, nunca tokens ou senhas.
   1) Drive > Compartilhar > Acesso geral: RESTRITO.
   2) Adicione as contas Google autorizadas como Leitor.
   3) Cole o link da pasta em linkDrive, entre aspas.
   4) Links são VISÍVEIS no código público, mas não dão acesso sem permissão.
   5) Deixe linkDrive vazio até que a pasta esteja pronta.
*/
(() => {
'use strict';
const acessos = [
 {titulo:'Códigos e notebooks da pesquisa',descricao:'Versões de trabalho, notebooks internos e documentação técnica ainda não autorizada para divulgação.',linkDrive:''},
 {titulo:'Banco completo de amostras',descricao:'GeoTIFFs, shapefiles, polígonos do CVAT, recortes e bancos de treinamento.',linkDrive:''},
 {titulo:'Testes e experimentos completos',descricao:'Tabelas, gráficos, matrizes de confusão, modelos e relatórios integrais.',linkDrive:''},
 {titulo:'Arquivos gerados',descricao:'Visualizações, tabelas e relatórios produzidos durante o processamento das imagens.',linkDrive:''}
];
function driveUrl(v) {
 if(typeof v!=='string'||!v.trim())return null;
 try {const url=new URL(v.trim());
   if(url.protocol!=='https:' || !['drive.google.com','docs.google.com'].includes(url.hostname))return null;
   return url.href;
 }catch{return null;}
}
function render() {
 const root=document.getElementById('lista-acessos');if(!root)return;
 root.replaceChildren();
 for(const a of acessos){
   const card=document.createElement('article');card.className='card acesso-card';
   const badge=document.createElement('span');badge.className='badge';badge.textContent='Google Drive · Restrito';
   const title=document.createElement('h3');title.textContent=a.titulo;
   const desc=document.createElement('p');desc.textContent=a.descricao;
   card.append(badge,title,desc);
   const url=driveUrl(a.linkDrive);
   if(url){
     const link=document.createElement('a');link.className='btn outline';
     link.href=url;link.target='_blank';link.rel='noopener noreferrer';
     link.textContent='Solicitar ou acessar arquivos ↗';card.append(link);
   } else {
     const txt=document.createElement('p');txt.className='hint';
     txt.textContent='Link ainda não configurado.';card.append(txt);
   }
   root.append(card);
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
