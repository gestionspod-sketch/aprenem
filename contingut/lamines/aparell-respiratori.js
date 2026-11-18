/* Aprenem - lamina interactiva: aparell respiratori
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */
/* ================= Làmina: l'aparell respiratori ================= */
const RESP={
 fosses:{n:1,nom:'Fosses nasals',a:'fosses nasals|nas|fosses|forats del nas',p:[300,98],l:[150,84],s:'l',f:'Per aquí entra l\'aire. Els pèls i la mucosa del nas filtren la pols, i l\'aire s\'escalfa i s\'humiteja abans d\'arribar als pulmons.'},
 faringe:{n:2,nom:'Faringe',a:'faringe',p:[300,150],l:[150,150],s:'l',f:'Tub que comparteixen l\'aparell respiratori i el digestiu: hi passen l\'aire i també el menjar.'},
 laringe:{n:3,nom:'Laringe',a:'laringe',p:[312,186],l:[450,180],s:'r',f:'Hi ha les cordes vocals, que vibren quan parlam. Una tapadora, l\'epiglotis, la tanca quan empassam perquè el menjar no hi entri.'},
 traquea:{n:4,nom:'Tràquea',a:'tràquea',p:[309,262],l:[450,250],s:'r',f:'Tub reforçat amb anells de cartílag, que el mantenen obert, i que porta l\'aire fins als bronquis.'},
 bronquis:{n:5,nom:'Bronquis',a:'bronquis|bronqui',p:[276,350],l:[150,330],s:'l',f:'Les dues branques en què es divideix la tràquea: una va a cada pulmó.'},
 bronquiols:{n:6,nom:'Bronquíols',a:'bronquíols|bronquíol',p:[222,410],l:[150,410],s:'l',lv:1,f:'Branques cada vegada més primes dels bronquis, dins els pulmons. Al final de cada bronquíol hi ha els alvèols.'},
 pulmons:{n:7,nom:'Pulmons',a:'pulmons|pulmó',p:[386,300],l:[450,310],s:'r',f:'Dos òrgans esponjosos on es fa l\'intercanvi de gasos. L\'esquerre és una mica més petit per deixar lloc al cor.'},
 diafragma:{n:8,nom:'Diafragma',a:'diafragma',p:[396,480],l:[450,450],s:'r',f:'Múscul en forma de cúpula que hi ha davall els pulmons. Quan es contreu i baixa, entra l\'aire (inspiració); quan es relaxa i puja, l\'aire surt (espiració).'},
 alveols:{n:9,nom:'Alvèols',a:'alvèols|alvèol|alvèols pulmonars',p:[110,514],l:[110,500],s:'c',lv:1,f:'Saquets petitíssims envoltats de capil·lars (vasos sanguinis molt prims). Aquí l\'oxigen passa a la sang i el diòxid de carboni passa de la sang a l\'aire.'}};
function respSVG({mode='labels',hi=null}={}){const H=id=>hi===id?' hi':'',show=mode==='labels';
 const lab=Object.entries(RESP).map(([id,r])=>{const[px,py]=r.p,[lx,ly]=r.l;let bx,tx,an,x1=null;
  if(r.s==='l'){an='end';tx=lx;bx=lx+16;x1=lx+27}else if(r.s==='r'){an='start';tx=lx;bx=lx-16;x1=lx-27}else{an='middle';tx=lx+12;bx=show?lx-36:lx}
  return`<g class="lab${H(id)}" data-part="${id}">${x1!=null?`<line x1="${x1}" y1="${ly-4}" x2="${px}" y2="${py}" class="ld"/>`:''}<circle cx="${px}" cy="${py}" r="3" class="pt"/><circle cx="${bx}" cy="${ly-4}" r="10.5" class="bd"/><text x="${bx}" y="${ly}" class="bn" text-anchor="middle">${r.n}</text>${show?`<text x="${tx}" y="${ly}" text-anchor="${an}" class="lt">${r.nom}</text>`:''}</g>`}).join('');
 return`<svg class="lamsvg" viewBox="0 0 600 660" role="img" aria-label="Làmina de l'aparell respiratori">
 <defs><linearGradient id="lgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBD5DA"/><stop offset="1" stop-color="#EE9AA7"/></linearGradient><clipPath id="acl"><circle cx="110" cy="572" r="56"/></clipPath></defs>
 <g class="body"><ellipse cx="300" cy="92" rx="56" ry="64"/><path d="M277 146 L277 202 L323 202 L323 146Z"/><path d="M300 196 C250 196 205 200 160 214 C120 228 102 252 94 300 L84 600 Q84 650 140 650 L460 650 Q516 650 516 600 L506 300 C498 252 480 228 440 214 C395 200 350 196 300 196Z"/></g>
 <g class="face"><circle cx="280" cy="72" r="4"/><circle cx="320" cy="72" r="4"/><path class="mouth" d="M288 132 Q300 140 312 132"/></g>
 <g class="part${H('pulmons')}" data-part="pulmons"><path class="lung" d="M284 250 C250 246 206 276 190 336 C178 392 182 450 196 486 C218 500 256 496 286 482 C292 420 292 330 284 250Z"/><path class="lung" d="M316 250 C350 246 394 276 410 336 C422 392 418 450 404 486 C382 500 344 496 314 482 C316 460 328 446 334 428 C320 404 316 330 316 250Z"/></g>
 <g class="part${H('bronquiols')}" data-part="bronquiols"><path class="br2" d="M262 362 Q240 345 228 312 M262 362 Q238 382 222 410 M262 362 Q256 405 248 452 M338 362 Q360 345 372 312 M338 362 Q362 382 378 410 M338 362 Q344 405 352 452"/><path class="br3" d="M228 312 l-13 -9 M228 312 l-3 -16 M222 410 l-17 3 M222 410 l-7 15 M248 452 l-15 6 M248 452 l3 16 M372 312 l13 -9 M372 312 l3 -16 M378 410 l17 3 M378 410 l7 15 M352 452 l15 6 M352 452 l-3 16"/></g>
 <g class="part${H('bronquis')}" data-part="bronquis"><path class="br1" d="M300 328 Q284 338 262 362 M300 328 Q316 338 338 362"/></g>
 <g class="part${H('traquea')}" data-part="traquea"><rect class="air" x="291" y="202" width="18" height="128"/><path class="ring" d="${Array.from({length:10},(_,i)=>`M291 ${211+i*12}h18`).join('')}"/></g>
 <g class="part${H('laringe')}" data-part="laringe"><path class="air" d="M287 172 h26 l-3 30 h-20Z"/><path class="ring" d="M293 186 l7 6 l7 -6"/></g>
 <g class="part${H('faringe')}" data-part="faringe"><rect class="air" x="292" y="112" width="16" height="60"/></g>
 <g class="part${H('fosses')}" data-part="fosses"><path class="nose" d="M300 80 L290 106 Q300 113 310 106Z"/></g>
 <g class="part${H('diafragma')}" data-part="diafragma"><path class="dia" d="M176 494 Q300 432 424 494"/><path class="dia2" d="M176 503 Q300 441 424 503"/></g>
 <line x1="248" y1="468" x2="150" y2="534" class="ld dash"/>
 <g class="part${H('alveols')}" data-part="alveols"><circle cx="110" cy="572" r="58" class="inset"/><g clip-path="url(#acl)"><path class="cap-r" d="M50 604 C90 560 130 622 172 570"/><path class="cap-b" d="M50 548 C90 592 130 530 172 588"/>${[[96,560],[114,552],[128,568],[104,578],[120,586],[88,594],[136,592],[110,602],[82,568]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" class="alv"/>`).join('')}<path class="br2" d="M172 516 Q144 532 116 552"/></g></g>
 ${show?'<text x="110" y="652" text-anchor="middle" class="cap">Ampliació: alvèols i capil·lars</text>':'<text x="110" y="652" text-anchor="middle" class="cap">Ampliació</text>'}
 ${lab}</svg>`}
const RESP_Q=[['té les cordes vocals, que vibren quan parlam','laringe'],['és el tub amb anells de cartílag que porta l\'aire fins als bronquis','traquea'],['és el múscul que fa entrar i sortir l\'aire dels pulmons','diafragma'],['són els saquets on l\'oxigen passa a la sang','alveols'],['és per on entra l\'aire i on es filtra la pols','fosses'],['comparteixen l\'aparell respiratori i el digestiu','faringe'],['són les dues branques en què es divideix la tràquea','bronquis'],['són els òrgans esponjosos on es fa l\'intercanvi de gasos','pulmons']];
SK.ci_respiratori={mat:'ciencies',nom:'L\'aparell respiratori',ic:'Rs',fig:()=>respSVG(),
 teoria:['Respiram per agafar <b>oxigen</b> de l\'aire, que les cèl·lules necessiten per obtenir energia, i per expulsar el <b>diòxid de carboni</b>, que és un residu.','Camí de l\'aire: <b>fosses nasals → faringe → laringe → tràquea → bronquis → bronquíols → alvèols</b>, dins els <b>pulmons</b>.','La respiració té dues fases: la <b>inspiració</b> (el diafragma baixa i l\'aire entra) i l\'<b>espiració</b> (el diafragma puja i l\'aire surt). Mira la làmina:'],
 gen(lv){const ids=Object.keys(RESP).filter(id=>lv>0||!RESP[id].lv);
  const err=(id)=>v=>Object.entries(RESP).some(([o,r])=>o!==id&&r.a.split('|').map(fold).includes(fold(v[0])))?'ci_organs':null;
  if(lv>0&&Math.random()<.2){const ins=Math.random()<.5;return{text:`Com es diu la fase de la respiració en què l'aire ${ins?'<b>entra</b> als':'<b>surt</b> dels'} pulmons?`,fields:[{label:'Fase',txt:[ins?'inspiració':'espiració'],loose:true,wide:true}],vis:null,
   hints:['Pensa en el diafragma: baixa o puja?',`Comença per «${ins?'I':'E'}».`],steps:[ins?'Quan el diafragma es contreu i baixa, els pulmons s\'omplen d\'aire.':'Quan el diafragma es relaxa i puja, l\'aire surt dels pulmons.',`Aquesta fase és l'<b>${ins?'inspiració':'espiració'}</b>.`]}}
  if(Math.random()<.65){const id=pick(ids),r=RESP[id];
   return{text:`Observa la làmina. Com es diu la part número <b>${r.n}</b>?`,fig:respSVG({mode:'numbers',hi:id}),fields:[{label:'Nom de la part',txt:r.a.split('|'),loose:true,wide:true}],vis:null,
    hints:[`Pista: ${r.f.replace(new RegExp(r.nom,'gi'),'…')}`,`Comença per «${r.nom[0]}» i té ${[...r.nom.replace(/ /g,'')].length} lletres.`],
    steps:[`El número ${r.n} és: <b>${r.nom}</b>.`,r.f],err:err(id)}}
  const[q,id]=pick(RESP_Q.filter(x=>ids.includes(x[1]))),r=RESP[id];
  return{text:`Quina part de l'aparell respiratori ${q}?`,fields:[{label:'Part',txt:r.a.split('|'),loose:true,wide:true}],vis:null,
   hints:['Recorda el camí de l\'aire: nas, faringe, laringe, tràquea, bronquis, bronquíols, alvèols.',`Comença per «${r.nom[0]}».`],steps:[`És ${/s$/.test(r.nom)?'els':'la'} <b>${r.nom}</b>.`,r.f],err:err(id)}}};
function lamina(){endSession();let mode='labels',hi=null;
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-ciencies)">Làmina · Ciències naturals</div><h2>L'aparell respiratori</h2><p class="muted">Toca cada part del dibuix per saber què fa.</p></div><button class="ghost" onclick="subject('ciencies')">← Tornar</button></div>
 <div class="lam"><div class="card lam-fig"><div class="tabs" style="margin:0 0 12px"><button id="lm1" class="on">Amb noms</button><button id="lm2">Sense noms (posa't a prova)</button></div><div id="lsvg"></div></div>
 <div><div class="card" id="linfo"></div>
 <div class="card"><h3>Com respiram?</h3><div class="grid" style="grid-template-columns:1fr 1fr"><div class="stat"><b style="font-size:16px;color:var(--s-ciencies)">Inspiració</b><span>El diafragma es contreu i <b>baixa</b>. Els pulmons s'eixamplen i l'aire <b>entra</b>.</span></div><div class="stat"><b style="font-size:16px;color:var(--s-ciencies)">Espiració</b><span>El diafragma es relaxa i <b>puja</b>. Els pulmons es fan petits i l'aire <b>surt</b>.</span></div></div>
 <p style="margin-bottom:0">Als <b>alvèols</b>, l'oxigen (<span style="color:#D63B3B;font-weight:700">sang vermella</span>) passa a la sang, i el diòxid de carboni (<span style="color:#3B6FD6;font-weight:700">sang blava</span>) en surt.</p></div>
 <div class="row"><button id="la">Aprendre el tema</button><button class="sec" id="lp">Practicar amb la làmina</button></div></div></div>`);
 const info=()=>{const ids=Object.keys(RESP);$('#linfo').innerHTML=hi?`<div class="eyebrow" style="color:var(--s-ciencies)">Part ${RESP[hi].n} de ${ids.length}</div><h3 style="margin:4px 0 8px">${mode==='labels'?RESP[hi].nom:'Quina part és?'}</h3><p style="margin:0">${mode==='labels'?RESP[hi].f:'Mode prova: digues el nom en veu alta i després canvia a «Amb noms» per comprovar-ho.'}</p>`
  :`<h3 style="margin-top:0">El camí de l'aire</h3><ol class="steps" style="margin:0">${ids.map(id=>`<li><a href="#" data-go="${id}">${RESP[id].nom}</a></li>`).join('')}</ol>`;
  $('#linfo').querySelectorAll('[data-go]').forEach(a=>a.onclick=e=>{e.preventDefault();hi=a.dataset.go;draw()})};
 const draw=()=>{$('#lsvg').innerHTML=respSVG({mode,hi});$('#lsvg').querySelectorAll('[data-part]').forEach(g=>g.onclick=()=>{hi=g.dataset.part;draw()});info()};
 $('#lm1').onclick=()=>{mode='labels';$('#lm1').className='on';$('#lm2').className='';draw()};
 $('#lm2').onclick=()=>{mode='numbers';$('#lm2').className='on';$('#lm1').className='';draw()};
 $('#la').onclick=()=>start('professor',['ci_respiratori'],15);$('#lp').onclick=()=>start('exercicis',['ci_respiratori'],15);draw()}

