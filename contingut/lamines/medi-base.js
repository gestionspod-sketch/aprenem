/* Aprenem - base comuna de les làmines de MEDI (temari de 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Cada làmina (contingut/lamines/*.js) es registra amb lamReg(id,{...}):
     nom, desc, ic, intro         títol, descripció (targeta), icona, text de la pantalla
     vb, mw                        viewBox de l'SVG i amplada màxima en píxels
     parts:{id:{n, nom, a:'sinònims|...', p:[x,y] punt, l:[x,y] etiqueta, s:'l'|'r'|'c', f:'funció', q:'descripció per preguntar', lv:1}}
     draw(H,mode)                  dibuix; H('id') retorna els atributs del grup clicable d'una part
     skill                         tema d'exercicis associat (botons «Aprendre» i «Practicar»)
     llista, extra, bind(redibuixa) títol de la llista de parts, HTML extra i interaccions extra
   Les classes .lamsvg, .lab, .bd, .lt... són a estil/app.css (les mateixes que l'aparell respiratori). */
const LAM={};
const lamAns=r=>[r.nom,...(r.a?r.a.split('|'):[])];
const reEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
// Amaga el nom de la part dins la seva explicació (perquè la pista no doni la resposta)
const lamHide=(t,r)=>lamAns(r).sort((a,b)=>b.length-a.length).reduce((s,x)=>s.replace(new RegExp(reEsc(x),'gi'),'…'),t);
// L.fs: escala de les etiquetes (per a làmines amples, perquè la lletra no quedi massa petita)
function lamLabels(L,mode,hi){const show=mode==='labels',k=L.fs||1,o=4*k;
 return Object.entries(L.parts).map(([id,r])=>{const[px,py]=r.p,[lx,ly]=r.l;let bx=lx,tx=lx,ty=ly,an='middle',x1=null;
  if(r.s==='l'){an='end';bx=lx+16*k;x1=lx+27*k}else if(r.s==='r'){an='start';bx=lx-16*k;x1=lx-27*k}else ty=ly+24*k;
  return`<g class="lab${hi===id?' hi':''}" data-part="${id}">${x1!=null?`<line x1="${x1}" y1="${ly-o}" x2="${px}" y2="${py}" class="ld"/><circle cx="${px}" cy="${py}" r="${3*k}" class="pt"/>`:''}<circle cx="${bx}" cy="${ly-o}" r="${10.5*k}" class="bd"/><text x="${bx}" y="${ly}" class="bn" text-anchor="middle" style="font-size:${12*k}px">${r.n}</text>${show?`<text x="${tx}" y="${ty}" text-anchor="${an}" class="lt" style="font-size:${15*k}px;paint-order:stroke;stroke:#fff;stroke-width:${4*k}px;stroke-linejoin:round">${r.nom}</text>`:''}</g>`}).join('')}
function lamSVG(id,o={}){const L=LAM[id],mode=o.mode||'labels',hi=o.hi||null,H=p=>`class="part${hi===p?' hi':''}" data-part="${p}"`;
 return`<svg class="lamsvg" viewBox="${L.vb}" style="max-width:${L.mw||600}px" role="img" aria-label="Làmina: ${esc(L.nom)}">${L.draw(H,mode)}${lamLabels(L,mode,hi)}</svg>`}
// Pregunta d'una làmina: «com es diu la part número N?» o «quina part ... ?» (resposta escrita)
function lamQ(id,lv,errT){const L=LAM[id],ids=Object.keys(L.parts).filter(k=>lv>0||!L.parts[k].lv);
 const err=k=>v=>Object.entries(L.parts).some(([o,r])=>o!==k&&lamAns(r).map(fold).includes(fold(v[0])))?errT:null;
 const dq=ids.filter(k=>L.parts[k].q),len=r=>[...r.nom.replace(/[ ·'’-]/g,'')].length;
 if(!dq.length||Math.random()<.6){const k=pick(ids),r=L.parts[k];
  return{text:`Observa la làmina. Com es diu ${L.que||'la part'} número <b>${r.n}</b>?`,fig:lamSVG(id,{mode:'numbers',hi:k}),fields:[{label:L.camp||'Nom',txt:lamAns(r),loose:true,wide:true}],vis:null,
   hints:[`Pista: ${lamHide(r.f,r)}`,`Comença per «${r.nom[0].toUpperCase()}» i té ${len(r)} lletres.`],steps:[`El número ${r.n} és: <b>${r.nom}</b>.`,r.f],err:err(k)}}
 const k=pick(dq),r=L.parts[k];
 return{text:`${L.pregunta||'Quina part'} ${r.q}?`,fields:[{label:L.camp||'Nom',txt:lamAns(r),loose:true,wide:true}],vis:null,
  hints:[L.recorda||'Repassa la làmina de la teoria.',`Comença per «${r.nom[0].toUpperCase()}» i té ${len(r)} lletres.`],steps:[`És: <b>${r.nom}</b>.`,r.f],err:err(k)}}
// Tema amb làmina: barreja preguntes de la làmina, del banc i (opcional) d'un generador propi
function lamSkill(id,o){return{mat:'ciencies',curs:[6],ab:o.ab,nom:o.nom,ic:'',teoria:o.teoria,fig:()=>lamSVG(id),bank:o.bank||[],
 gen(lv){if(o.gen&&Math.random()<(o.pGen||.25)){const g=o.gen(lv);if(g)return g}
  const b=(o.bank||[]).filter(q=>lv>0||!q.lv);
  if(b.length&&Math.random()<(o.pBank==null?.45:o.pBank))return qProb(pick(b),o.errT);return lamQ(id,lv,o.errT)}}}
function lamScreen(id){endSession();const L=LAM[id];let mode='labels',hi=null;
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-ciencies)">Làmina · Medi</div><h2>${L.nom}</h2><p class="muted">${L.intro||'Toca cada part del dibuix per saber què és.'}</p></div><button class="ghost" onclick="subject('ciencies')">← Tornar</button></div>
 <div class="lam"><div class="card lam-fig"><div class="tabs" style="margin:0 0 12px"><button id="lm1" class="on">Amb noms</button><button id="lm2">Sense noms (posa't a prova)</button></div><div id="lsvg"></div></div>
 <div><div class="card" id="linfo"></div>${L.extra||''}
 <div class="row"><button id="la">Aprendre el tema</button><button class="sec" id="lp">Practicar amb la làmina</button></div></div></div>`);
 const ids=Object.keys(L.parts).sort((a,b)=>L.parts[a].n-L.parts[b].n);
 const info=()=>{$('#linfo').innerHTML=hi?`<div class="eyebrow" style="color:var(--s-ciencies)">Número ${L.parts[hi].n} de ${ids.length}</div><h3 style="margin:4px 0 8px">${mode==='labels'?L.parts[hi].nom:'Què és?'}</h3><p style="margin:0">${mode==='labels'?L.parts[hi].f:'Mode prova: digues el nom en veu alta i després canvia a «Amb noms» per comprovar-ho.'}</p><p style="margin:10px 0 0"><a href="#" id="lall">Veure la llista</a></p>`
  :`<h3 style="margin-top:0">${L.llista||'Les parts'}</h3><ol class="steps" style="margin:0">${ids.map(k=>`<li><a href="#" data-go="${k}">${mode==='labels'?L.parts[k].nom:'Número '+L.parts[k].n}</a></li>`).join('')}</ol>`;
  $('#linfo').querySelectorAll('[data-go]').forEach(a=>a.onclick=e=>{e.preventDefault();hi=a.dataset.go;draw()});
  const all=$('#lall');if(all)all.onclick=e=>{e.preventDefault();hi=null;draw()}};
 const draw=()=>{$('#lsvg').innerHTML=lamSVG(id,{mode,hi});$('#lsvg').querySelectorAll('[data-part]').forEach(g=>g.onclick=()=>{hi=g.dataset.part;draw()});info()};
 $('#lm1').onclick=()=>{mode='labels';$('#lm1').className='on';$('#lm2').className='';draw()};
 $('#lm2').onclick=()=>{mode='numbers';$('#lm2').className='on';$('#lm1').className='';draw()};
 $('#la').onclick=()=>start('professor',[L.skill],15);$('#lp').onclick=()=>start('exercicis',[L.skill],15);
 if(L.bind)L.bind(draw);draw()}
function lamReg(id,def){LAM[id]=def;(LAMINES.ciencies=LAMINES.ciencies||[]).push({obre:`lamScreen('${id}')`,nom:def.nom,desc:def.desc,ic:def.ic})}
// Icones de les làmines (IC es defineix a programa/icones.js, que es carrega després)
document.addEventListener('DOMContentLoaded',()=>{if(typeof ICO!=='function')return;Object.assign(IC,{
 stomach:ICO('<path d="M9 3v4c0 2-2 3-3 5-1.5 3 0 8 5 8 4 0 9-2 9-7 0-3-2-5-5-5-2 0-3 1-3 3"/>'),
 heart:ICO('<path d="M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11Z"/>'),
 cell:ICO('<ellipse cx="12" cy="12" rx="9" ry="7"/><circle cx="11" cy="11" r="2.5"/><path d="M16 15h2"/>'),
 bolt:ICO('<path d="M13 2 5 13h6l-1 9 8-11h-6Z"/>'),
 island:ICO('<path d="M3 15c3-4 6-5 9-4s5 3 9 2"/><path d="M4 19h16"/><path d="M8 11V6l4 2"/>'),
 clock:ICO('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')})});
