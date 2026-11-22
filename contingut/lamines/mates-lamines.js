/* Aprenem - MATEMÀTIQUES 6è: làmines interactives i material d'estudi
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Làmines (LAMINES.mates): figures planes, cossos geomètrics (amb desenvolupaments), recta numèrica
   de fraccions i decimals, geoplà de coordenades (simetria, gir i translació).
   Material (MATERIAL.mates): convertidor d'unitats i taules de nombres (fraccions-decimals-percentatges,
   nombres primers, quadrats i cubs). Dibuixos i textos originals. */
(()=>{
const {dc,svg,tx,ln,pts,C,taula,regPts,fo}=MT;
const head=(t,s,ey)=>`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-mates)">${ey||'Làmina · Matemàtiques'}</div><h2>${t}</h2><p class="muted">${s}</p></div><button class="ghost" onclick="subject('mates')">← Tornar</button></div>`;
const btns=(id,opts,on)=>`<div class="tabs" id="${id}" style="margin:0 0 12px;flex-wrap:wrap">${opts.map(([v,t])=>`<button data-v="${v}" class="${v==on?'on':''}">${t}</button>`).join('')}</div>`;
const bindBtns=(id,fn)=>document.querySelectorAll(`#${id} [data-v]`).forEach(b=>b.onclick=()=>{document.querySelectorAll(`#${id} [data-v]`).forEach(x=>x.className='');b.className='on';fn(b.dataset.v)});
const nf=x=>Math.abs(x)<1e-12?'0':Number(x.toPrecision(12)).toLocaleString('ca-ES',{maximumFractionDigits:12,useGrouping:Math.abs(x)>=10000});

/* =====================================================================
   Làmines de figures: una quadrícula de peces numerades, clicables
   ===================================================================== */
const MLAM={};
// Cada peça es dibuixa dins una cel·la de 150 × 130. d(x,y) retorna l'SVG de la figura centrada a (x,y).
function mlamSVG(id,mode,hi){const L=MLAM[id],ks=Object.keys(L.parts),cols=L.cols||3,W=150,H=L.ch||135,rows=Math.ceil(ks.length/cols);
 let g='';ks.forEach((k,i)=>{const r=L.parts[k],x=(i%cols)*W,y=Math.floor(i/cols)*H,on=hi===k;
  g+=`<g data-part="${k}" style="cursor:pointer"><rect x="${x+4}" y="${y+4}" width="${W-8}" height="${H-8}" fill="${on?'#FFF1D6':'#fff'}" stroke="${on?C.o:C.gl}" stroke-width="${on?3:1.5}"/>${r.d(x+W/2,y+(H-26)/2+4)}`;
  g+=mode==='labels'?tx(x+W/2,y+H-17,r.nom,{fs:13}):`<circle cx="${x+W/2}" cy="${y+H-18}" r="11" fill="${on?C.o:C.b}"/>`+tx(x+W/2,y+H-18,r.n,{fs:13,c:'#fff'});
  g+='</g>'});
 return svg(cols*W,rows*H,g,cols*W)}
function mlamScreen(id){endSession();const L=MLAM[id];let mode='labels',hi=null;
 app(head(L.nom,L.intro)+`<div class="lam"><div class="card lam-fig">${btns('mlm',[['labels','Amb noms'],['numbers','Sense noms (posa\'t a prova)']],'labels')}<div id="msvg"></div></div>
  <div><div class="card" id="minfo"></div><div class="row"><button id="mla">Aprendre el tema</button><button class="sec" id="mlp">Practicar amb la làmina</button></div></div></div>`);
 const info=()=>{const r=hi&&L.parts[hi];$('#minfo').innerHTML=!r?`<h3 style="margin-top:0">${L.llista}</h3><p class="muted" style="margin:0">Toca una peça del dibuix per veure'n els elements i les fórmules.</p>`
   :mode==='numbers'?`<div class="eyebrow" style="color:var(--s-mates)">Número ${r.n}</div><h3 style="margin:4px 0 8px">Com es diu?</h3><p style="margin:0">Pensa'n el nom i després torna a «Amb noms» per comprovar-ho.</p>`
   :`<div class="eyebrow" style="color:var(--s-mates)">Número ${r.n}</div><h3 style="margin:4px 0 8px">${r.nom}</h3><p style="margin:0 0 8px">${r.f}</p>${r.fm?`<p style="margin:0 0 8px;font-size:18px"><b>${r.fm}</b></p>`:''}${r.dev?`<div class="muted" style="font-size:14px;margin-top:6px">Desenvolupament pla:</div>${r.dev()}`:''}`};
 const draw=()=>{$('#msvg').innerHTML=mlamSVG(id,mode,hi);$('#msvg').querySelectorAll('[data-part]').forEach(g=>g.onclick=()=>{hi=g.dataset.part;draw()});info()};
 bindBtns('mlm',v=>{mode=v;draw()});$('#mla').onclick=()=>start('professor',[L.skill],15);$('#mlp').onclick=()=>start('exercicis',[L.skill],15);draw()}
window.mlamScreen=mlamScreen;
const ans=r=>[r.nom,...(r.a?r.a.split('|'):[])];
function mlamSkill(id,o){return{mat:'mates',curs:[6],ab:o.ab,nom:o.nom,teoria:o.teoria,fig:()=>mlamSVG(id,'labels'),
 gen(lv){const L=MLAM[id],ks=Object.keys(L.parts),k=pick(ks),r=L.parts[k],errF=v=>Object.entries(L.parts).some(([o2,p])=>o2!==k&&ans(p).map(fold).includes(fold(v[0])))?o.errT:null;
  const ex=o.extra&&o.extra(lv,k,r,errF);if(ex)return ex;
  if(lv>0&&r.q&&Math.random()<.5)return{text:`${L.pregunta} ${r.q}?`,fields:[{label:'Nom',txt:ans(r),loose:true,wide:true}],
   hints:[L.recorda,`Comença per «${r.nom[0].toUpperCase()}».`],steps:[`És el <b>${r.nom}</b>.`,r.f],err:errF};
  return{text:`Observa la làmina. Com es diu la figura número <b>${r.n}</b>?`,fig:mlamSVG(id,'numbers',k),fields:[{label:'Nom',txt:ans(r),loose:true,wide:true}],
   hints:[`Pista: ${r.p}`,`Comença per «${r.nom[0].toUpperCase()}» i té ${[...r.nom.replace(/[ ·'’-]/g,'')].length} lletres.`],steps:[`El número ${r.n} és el <b>${r.nom}</b>.`,r.f],err:errF}}}}

const P=(p,f=C.bl,s=C.b)=>`<polygon points="${pts(p)}" fill="${f}" stroke="${s}" stroke-width="2.5"/>`;
const D=(x1,y1,x2,y2)=>ln(x1,y1,x2,y2,{c:C.o,w:2,dash:1});
/* ---------- Làmina 1: figures planes ---------- */
MLAM.figures={nom:'Figures planes',intro:'Toca cada figura per veure\'n els elements i les fórmules del perímetre i de l\'àrea.',llista:'Les figures planes',skill:'mt_lam_figures',cols:3,
 pregunta:'Quina figura',recorda:'Repassa la làmina de les figures planes.',
 parts:{
  quadrat:{n:1,nom:'quadrat',d:(x,y)=>P([[x-35,y-35],[x+35,y-35],[x+35,y+35],[x-35,y+35]]),p:'Té 4 costats iguals i 4 angles rectes.',f:'Quadrilàter amb els 4 costats iguals i els 4 angles rectes. Té 4 eixos de simetria.',fm:'P = 4 × c · A = c × c',q:'té els quatre costats iguals i els quatre angles rectes'},
  rectangle:{n:2,nom:'rectangle',d:(x,y)=>P([[x-55,y-30],[x+55,y-30],[x+55,y+30],[x-55,y+30]]),p:'Té 4 angles rectes, però els costats no són tots iguals.',f:'Quadrilàter amb 4 angles rectes i els costats oposats iguals. Té 2 eixos de simetria.',fm:'P = 2 × b + 2 × h · A = b × h',q:'té quatre angles rectes i els costats oposats iguals dos a dos'},
  rombe:{n:3,nom:'rombe',d:(x,y)=>P([[x,y-40],[x+42,y],[x,y+40],[x-42,y]])+D(x-42,y,x+42,y)+D(x,y-40,x,y+40),p:'Té 4 costats iguals, però no té angles rectes.',f:'Quadrilàter amb els 4 costats iguals i els angles oposats iguals. Les diagonals (D i d) es tallen en angle recte.',fm:'A = D × d : 2',q:'té els quatre costats iguals però cap angle recte'},
  romboide:{n:4,nom:'romboide',d:(x,y)=>P([[x-45,y+28],[x+25,y+28],[x+50,y-28],[x-20,y-28]])+D(x-20,y-28,x-20,y+28),p:'Té els costats oposats iguals i paral·lels, però cap angle recte.',f:'Paral·lelogram amb els costats oposats iguals i paral·lels i sense angles rectes. Per a l\'àrea es fa servir l\'altura, no el costat inclinat.',fm:'A = b × h',q:'és un paral·lelogram sense angles rectes i amb costats consecutius diferents'},
  trapezi:{n:5,nom:'trapezi',a:'trapezi isòsceles|trapezi rectangle',d:(x,y)=>P([[x-55,y+28],[x+55,y+28],[x+28,y-28],[x-28,y-28]])+D(x-28,y-28,x-28,y+28),p:'Només té dos costats paral·lels (les bases).',f:'Quadrilàter amb només dos costats paral·lels: la base major (B) i la base menor (b).',fm:'A = (B + b) × h : 2',q:'només té dos costats paral·lels, la base major i la base menor'},
  triangle:{n:6,nom:'triangle',d:(x,y)=>P([[x-50,y+30],[x+50,y+30],[x-10,y-35]])+D(x-10,y-35,x-10,y+30),p:'És el polígon amb menys costats.',f:'Polígon de 3 costats. Els seus 3 angles sumen 180°.',fm:'A = b × h : 2',q:'té tres costats i els seus angles sumen 180 graus'},
  pentagon:{n:7,nom:'pentàgon regular',a:'pentàgon|pentagon',d:(x,y)=>P(regPts(5,x,y+3,38)),p:'Polígon regular de 5 costats.',f:'Polígon de 5 costats iguals i 5 angles iguals. L\'apotema (a) va del centre al mig d\'un costat.',fm:'P = 5 × c · A = P × a : 2',q:'és un polígon regular de cinc costats'},
  hexagon:{n:8,nom:'hexàgon regular',a:'hexàgon|hexagon',d:(x,y)=>P(regPts(6,x,y,38))+D(x,y,x,y+33),p:'Polígon regular de 6 costats, com una cel·la de bresca.',f:'Polígon de 6 costats iguals. Es pot dividir en 6 triangles equilàters iguals. La línia taronja és l\'apotema.',fm:'P = 6 × c · A = P × a : 2',q:'és un polígon regular de sis costats'},
  cercle:{n:9,nom:'cercle',a:'circumferència|el cercle',d:(x,y)=>`<circle cx="${x}" cy="${y}" r="38" fill="${C.bl}" stroke="${C.b}" stroke-width="2.5"/>`+ln(x,y,x+38,y,{c:C.o,w:2.5})+`<circle cx="${x}" cy="${y}" r="3" fill="${C.t}"/>`,p:'No té costats: la vora és una línia corba.',f:'La <b>circumferència</b> és la línia corba; el <b>cercle</b> és la superfície de dins. Tots els punts de la circumferència són a la mateixa distància del centre: el radi (r).',fm:'L = 2 × π × r · A = π × r × r (π ≈ 3,14)',q:'és la superfície limitada per una circumferència'}}};
SK.mt_lam_figures=mlamSkill('figures',{nom:'Làmina: figures planes',ab:'Lf',errT:'mt_lam_figura',
 teoria:['Les <b>figures planes</b> només tenen llargària i amplària. Els <b>polígons</b> tenen costats rectes; el <b>cercle</b> està limitat per una línia corba.','Cada figura té una fórmula per calcular el seu <b>perímetre</b> (la vora) i la seva <b>àrea</b> (la superfície de dins). Toca cada figura de la làmina per veure-la.']});

/* ---------- Làmina 2: cossos geomètrics ---------- */
const box3=(x,y,w,h,dp,f=C.bl)=>P([[x-w/2,y-h/2+dp/2],[x+w/2-dp,y-h/2+dp/2],[x+w/2-dp,y+h/2],[x-w/2,y+h/2]],f)+P([[x-w/2,y-h/2+dp/2],[x-w/2+dp,y-h/2],[x+w/2,y-h/2],[x+w/2-dp,y-h/2+dp/2]],'#EEF3FF')+P([[x+w/2-dp,y-h/2+dp/2],[x+w/2,y-h/2],[x+w/2,y+h/2-dp/2],[x+w/2-dp,y+h/2]],'#D3E0FF');
const devSq=(cells,s=26)=>{const xs=cells.map(c=>c[0]),ys=cells.map(c=>c[1]),w=(Math.max(...xs)+1)*s+10,h=(Math.max(...ys)+1)*s+10;
 return svg(w,h,cells.map(([cx,cy,ww=1,hh=1])=>`<rect x="${5+cx*s}" y="${5+cy*s}" width="${ww*s}" height="${hh*s}" fill="${C.bl}" stroke="${C.b}" stroke-width="2"/>`).join(''),Math.min(w*1.2,260))};
MLAM.cossos={nom:'Cossos geomètrics',intro:'Toca cada cos per veure\'n els elements, com es calcula el volum i el seu desenvolupament pla.',llista:'Els cossos geomètrics',skill:'mt_lam_cossos',cols:3,ch:140,
 pregunta:'Quin cos geomètric',recorda:'Repassa la làmina dels cossos geomètrics: poliedres (cares planes) i cossos rodons.',
 parts:{
  cub:{n:1,nom:'cub',a:'hexàedre',d:(x,y)=>box3(x,y,74,74,22),p:'Les seves 6 cares són quadrats iguals, com un dau.',f:'Poliedre amb 6 cares quadrades iguals, 12 arestes i 8 vèrtexs.',fm:'V = a × a × a',q:'té sis cares quadrades iguals, com un dau',
   dev:()=>devSq([[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]])},
  ortoedre:{n:2,nom:'ortoedre',a:'prisma rectangular|paral·lelepípede',d:(x,y)=>box3(x,y,96,62,22),p:'Té forma de capsa de sabates: 6 cares rectangulars.',f:'Prisma amb 6 cares rectangulars (iguals dues a dues), 12 arestes i 8 vèrtexs.',fm:'V = llarg × ample × alt',q:'té sis cares rectangulars, com una capsa de sabates',
   dev:()=>devSq([[1,0,2,1],[0,1],[1,1,2,1],[3,1],[4,1,2,1],[1,2,2,1]])},
  prisma:{n:3,nom:'prisma triangular',a:'prisma',d:(x,y)=>P([[x+5,y+30],[x+40,y+12],[x+15,y-33],[x-20,y-15]],'#D3E0FF')+P([[x-45,y+30],[x+5,y+30],[x-20,y-15]]),p:'Té dues bases iguals en forma de triangle.',f:'Poliedre amb dues bases triangulars iguals i paral·leles i 3 cares laterals rectangulars: 5 cares, 9 arestes i 6 vèrtexs.',fm:'V = àrea de la base × altura',q:'té dues bases triangulars iguals i tres cares laterals rectangulars',
   dev:()=>svg(200,120,P([[40,40],[160,40],[160,90],[40,90]])+ln(80,40,80,90,{c:C.b,w:2})+ln(120,40,120,90,{c:C.b,w:2})+P([[80,40],[120,40],[100,8]])+P([[80,90],[120,90],[100,118]]),200)},
  piramide:{n:4,nom:'piràmide quadrangular',a:'piràmide|piramide',d:(x,y)=>P([[x-42,y+30],[x+22,y+30],[x+42,y+14],[x-22,y+14]].concat([[x-42,y+30]]),'#EEF3FF')+P([[x-42,y+30],[x+22,y+30],[x,y-40]])+P([[x+22,y+30],[x+42,y+14],[x,y-40]],'#D3E0FF'),p:'Té una sola base i les cares laterals són triangles que s\'ajunten en un punt.',f:'Poliedre amb una base quadrada i 4 cares laterals triangulars que s\'ajunten al vèrtex: 5 cares, 8 arestes i 5 vèrtexs.',fm:'V = àrea de la base × altura : 3',q:'té una base i cares triangulars que s\'ajunten en un vèrtex',
   dev:()=>svg(160,160,P([[55,55],[105,55],[105,105],[55,105]])+P([[55,55],[105,55],[80,10]])+P([[105,55],[105,105],[150,80]])+P([[55,105],[105,105],[80,150]])+P([[55,55],[55,105],[10,80]]),160)},
  cilindre:{n:5,nom:'cilindre',d:(x,y)=>`<path d="M${x-32} ${y-28} V${y+28} A32 10 0 0 0 ${x+32} ${y+28} V${y-28}" fill="${C.bl}" stroke="${C.b}" stroke-width="2.5"/><ellipse cx="${x}" cy="${y-28}" rx="32" ry="10" fill="#EEF3FF" stroke="${C.b}" stroke-width="2.5"/>`,p:'És un cos rodó amb dues bases circulars, com una llauna.',f:'Cos rodó amb dues bases circulars iguals i una superfície lateral corba que, desplegada, és un rectangle.',fm:'V = π × r × r × altura',q:'és un cos rodó amb dues bases circulars, com una llauna',
   dev:()=>svg(200,150,`<rect x="30" y="45" width="140" height="60" fill="${C.bl}" stroke="${C.b}" stroke-width="2"/><circle cx="100" cy="23" r="21" fill="${C.bl}" stroke="${C.b}" stroke-width="2"/><circle cx="100" cy="127" r="21" fill="${C.bl}" stroke="${C.b}" stroke-width="2"/>`,200)},
  con:{n:6,nom:'con',d:(x,y)=>`<path d="M${x-34} ${y+26} L${x} ${y-40} L${x+34} ${y+26} A34 10 0 0 1 ${x-34} ${y+26}Z" fill="${C.bl}" stroke="${C.b}" stroke-width="2.5"/><ellipse cx="${x}" cy="${y+26}" rx="34" ry="10" fill="none" stroke="${C.b}" stroke-width="1.5" stroke-dasharray="4 3"/>`,p:'Té una base circular i acaba en punta, com un cucurutx de gelat.',f:'Cos rodó amb una base circular i una superfície lateral corba que acaba en un vèrtex.',fm:'V = π × r × r × altura : 3',q:'té una base circular i acaba en punta, com un cucurutx',
   dev:()=>svg(180,150,`<path d="M90 10 L30 95 A75 75 0 0 0 150 95Z" fill="${C.bl}" stroke="${C.b}" stroke-width="2"/><circle cx="90" cy="122" r="22" fill="${C.bl}" stroke="${C.b}" stroke-width="2"/>`,180)},
  esfera:{n:7,nom:'esfera',d:(x,y)=>`<circle cx="${x}" cy="${y}" r="38" fill="${C.bl}" stroke="${C.b}" stroke-width="2.5"/><ellipse cx="${x}" cy="${y}" rx="38" ry="11" fill="none" stroke="${C.b}" stroke-width="1.5" stroke-dasharray="4 3"/>`,p:'És rodona per tot arreu, com una pilota.',f:'Cos rodó en què tots els punts de la superfície són a la mateixa distància del centre (el radi). No té cap desenvolupament pla.',fm:'V = 4 × π × r × r × r : 3',q:'és rodona per tot arreu, com una pilota'}}};
// Elements de cada cos (per a les preguntes de comptar): cares, arestes, vèrtexs; als cossos rodons, bases circulars.
const COS_EL={cub:{c:6,a:12,v:8},ortoedre:{c:6,a:12,v:8},prisma:{c:5,a:9,v:6},piramide:{c:5,a:8,v:5},cilindre:{b:2},con:{b:1},esfera:{b:0}};
const ELN={c:['cares','Cares'],a:['arestes','Arestes'],v:['vèrtexs','Vèrtexs'],b:['bases circulars','Bases circulars']};
const ELH={c:['Les cares són les superfícies planes del cos. Compta primer les bases i després les cares laterals.','Pensa també en les cares que queden amagades darrere del dibuix.'],
 a:['Una aresta és la línia on es troben dues cares. Compta les arestes de cada base i després les que les uneixen.','No t\'oblidis de les arestes amagades darrere del dibuix.'],
 v:['Un vèrtex és una cantonada: un punt on es troben diverses arestes.','Compta els vèrtexs de les bases i mira si n\'hi ha cap fora de les bases.'],
 b:['Les bases dels cossos rodons són les cares planes i rodones (cercles).','Imagina\'t el cos damunt la taula: té alguna cara plana i rodona a baix? I a dalt?']};
function cosExtra(lv,k,r,errF){
 if(r.dev&&Math.random()<.25)return{text:'Si retalles aquest <b>desenvolupament pla</b> i el plegues, quin cos geomètric obtens?',fig:r.dev(),fields:[{label:'Nom',txt:ans(r),loose:true,wide:true}],
  hints:['Compta quantes peces té el desenvolupament i fixa\'t en la forma de cada una.','Les bases són les peces que queden a dalt i a baix en plegar-lo. Quina forma tenen?'],
  steps:['Miram les peces del desenvolupament i quina forma tenen.',`En plegar-lo obtenim el <b>${r.nom}</b>.`,r.f],err:errF};
 const E=COS_EL[k];if(!E||Math.random()<(lv?.45:.55))return null;
 const ks=Object.keys(E),e=pick(ks),val0=E[e];
 return{text:`Observa la làmina. Quantes <b>${ELN[e][0]}</b> té el cos número <b>${r.n}</b>?`,fig:mlamSVG('cossos','numbers',k),fields:[{label:ELN[e][1],ans:R(val0)}],
  hints:ELH[e],
  steps:[e==='b'?'Les bases dels cossos rodons són les cares planes i circulars.':`Comptam les ${ELN[e][0]}, també les que no es veuen al dibuix.`,`El número ${r.n} és el <b>${r.nom}</b>: ${r.f}`,val0===0?'No en té <b>cap</b> (0): no té cap cara plana.':`Té <b>${val0}</b> ${val0===1?'base circular':ELN[e][0]}.`],
  err:x=>{const y=x[0]&&x[0].d===1?x[0].n:null;return y!==null&&y!==val0&&ks.some(o2=>o2!==e&&E[o2]===y)?'mt_lam_elem':null}}}
SK.mt_lam_cossos=mlamSkill('cossos',{nom:'Làmina: cossos geomètrics',ab:'Lc',errT:'mt_lam_cos',extra:cosExtra,
 teoria:['Els <b>cossos geomètrics</b> tenen tres dimensions: llargària, amplària i altura. Els <b>poliedres</b> tenen totes les cares planes (cub, prismes, piràmides); els <b>cossos rodons</b> tenen alguna superfície corba (cilindre, con, esfera).','Si retallam un cos i el desplegam damunt la taula, obtenim el seu <b>desenvolupament pla</b>. Toca cada cos per veure\'l.']});
Object.assign(ERR,{mt_lam_figura:{kid:'Aquesta és una altra figura de la làmina. Fixa\'t en els costats: quants en té, si són iguals i si són paral·lels.',par:'Confon les figures planes'},
 mt_lam_elem:{kid:'Aquest nombre correspon a un altre element del cos. Recorda: les cares són superfícies, les arestes són línies i els vèrtexs són punts.',par:'Confon cares, arestes i vèrtexs'},
 mt_lam_cos:{kid:'Aquest és un altre cos de la làmina. Fixa\'t en les bases i en si les cares són planes o corbes.',par:'Confon els cossos geomètrics'}});

/* =====================================================================
   Làmina 3: recta numèrica de fraccions i decimals
   ===================================================================== */
window.mtRecta=function(){endSession();let den=4,zoom=null,sel=null;
 app(head('Recta numèrica','Fraccions, decimals i percentatges al mateix lloc de la recta. Toca una marca.')+`<div class="card">
  <div class="muted" style="margin-bottom:6px">Divideix cada unitat en parts iguals:</div>${btns('rden',[[2,'Meitats'],[3,'Terços'],[4,'Quarts'],[5,'Cinquens'],[8,'Vuitens'],[10,'Dècimes']],4)}
  <div id="rsvg"></div><div id="rinfo" class="card" style="margin:12px 0 0;background:#F5F8FF"></div>
  <div id="rzoom"></div></div>`);
 const W=640,x0=30,x1=610,S=(x1-x0)/2,X=v=>x0+v*S;
 const info=()=>{if(!sel){$('#rinfo').innerHTML='<p style="margin:0">Toca una marca de la recta per veure el seu valor com a <b>fracció</b>, <b>decimal</b> i <b>percentatge</b>.</p>';return}
  const [n,d]=sel,s=R(n,d),v=n/d,ex=Math.abs(v*1000-Math.round(v*1000))<1e-9;
  $('#rinfo').innerHTML=`<div style="display:flex;gap:22px;flex-wrap:wrap;font-size:20px;align-items:center"><span>Fracció: <b>${F(n,d)}</b>${s.d!==d||s.n!==n?` = ${s.d===1?s.n:F(s.n,s.d)}`:''}</span><span>Decimal: <b>${ex?dc(v):'≈ '+dc(Math.round(v*1000)/1000)}</b></span><span>Percentatge: <b>${ex?dc(Math.round(v*1000)/10):'≈ '+dc(Math.round(v*1000)/10)} %</b></span></div>${!ex?'<p class="muted" style="margin:8px 0 0">Aquest decimal no s\'acaba mai: les xifres es repeteixen (és periòdic).</p>':''}`};
 const draw=()=>{let g=ln(x0-10,60,x1+10,60,{w:3});
  for(let k=0;k<=2*den;k++){const x=X(k/den),big=k%den===0,on=sel&&sel[0]===k&&sel[1]===den;
   g+=`<g data-k="${k}" style="cursor:pointer"><rect x="${x-12}" y="30" width="24" height="70" fill="transparent"/>${ln(x,big?42:48,x,big?78:72,{w:big?3:2,c:on?C.o:C.t})}${on?`<circle cx="${x}" cy="60" r="7" fill="${C.o}"/>`:''}`;
   g+=big?tx(x,94,k/den,{fs:16}):(den<=8||k%2===0?`<text x="${x}" y="22" font-size="11" font-weight="700" fill="${C.b}" text-anchor="middle">${k}/${den}</text>`:'');g+='</g>'}
  $('#rsvg').innerHTML=svg(W,110,g,W);$('#rsvg').querySelectorAll('[data-k]').forEach(e=>e.onclick=()=>{sel=[+e.dataset.k,den];draw();info()});
  // Lupa: les centèsimes entre dues dècimes
  if(den===10){const z=zoom==null?3:zoom;let h=`<h3 style="margin:16px 0 4px">Lupa: les centèsimes</h3><p class="muted" style="margin:0 0 6px">Entre ${dc(z/10)} i ${dc((z+1)/10)} hi ha 10 centèsimes. Tria quina dècima vols mirar de prop:</p>${btns('rzb',Array.from({length:10},(_,i)=>[i,`${dc(i/10)}`]),z)}`;
   let gz=ln(x0-10,60,x1+10,60,{w:3});for(let k=0;k<=10;k++){const x=x0+k*(x1-x0)/10,v=(z*10+k)/100;gz+=ln(x,k%5?48:42,x,k%5?72:78,{w:k%5?2:3})+tx(x,94,dc(v),{fs:12})}
   $('#rzoom').innerHTML=h+svg(W,105,gz,W);bindBtns('rzb',v=>{zoom=+v;draw()})}else $('#rzoom').innerHTML=''};
 bindBtns('rden',v=>{den=+v;sel=null;draw();info()});draw();info()};

/* =====================================================================
   Làmina 4: geoplà de coordenades
   ===================================================================== */
window.mtGeopla=function(){endSession();let V=[],closed=false,img=null;
 app(head('Geoplà de coordenades','Toca els punts de la quadrícula per fer una figura. Després prova la simetria, el gir i la translació.')+`<div class="lam"><div class="card lam-fig"><div id="gsvg"></div></div>
  <div><div class="card" id="ginfo"></div><div class="row" style="flex-wrap:wrap">
   <button id="gc">Tancar la figura</button><button class="sec" id="gs">Simetria (eix vertical)</button><button class="sec" id="gg">Gir de 180°</button><button class="sec" id="gt">Translació (→ 3, ↑ 1)</button><button class="ghost" id="gu">Desfer</button><button class="ghost" id="ge">Esborrar</button></div></div></div>`);
 const mn=-6,mx=6,Wd=340,pad=24,s=(Wd-2*pad)/(mx-mn),X=x=>pad+(x-mn)*s,Y=y=>Wd-pad-(y-mn)*s,cx=v=>v<0?'−'+(-v):v;
 const area=Q=>Math.abs(Q.reduce((a,[x,y],i)=>{const[x2,y2]=Q[(i+1)%Q.length];return a+x*y2-x2*y},0))/2;
 const per=Q=>Q.every(([x,y],i)=>{const[x2,y2]=Q[(i+1)%Q.length];return x===x2||y===y2})?Q.reduce((a,[x,y],i)=>{const[x2,y2]=Q[(i+1)%Q.length];return a+Math.abs(x2-x)+Math.abs(y2-y)},0):null;
 const L='ABCDEFGHIJ';
 const info=()=>{let h=`<h3 style="margin-top:0">${closed?'La teva figura':'Punts'}</h3>`;
  h+=V.length?`<p style="margin:0 0 8px;font-size:18px">${V.map(([x,y],i)=>`${L[i]}(${cx(x)}, ${cx(y)})`).join(' · ')}</p>`:'<p class="muted" style="margin:0">Toca la quadrícula per posar el primer vèrtex (fins a 10).</p>';
  if(closed&&V.length>=3){const p=per(V);h+=`<p style="margin:0">Àrea: <b>${dc(area(V))} quadrets</b>${p!=null?` · Perímetre: <b>${p} unitats</b>`:'<br><span class="muted">Té costats inclinats: el perímetre s\'ha de mesurar amb regle.</span>'}</p>`}
  if(img)h+=`<p style="margin:10px 0 0;color:#B26B00"><b>${img.nom}:</b> ${img.Q.map(([x,y],i)=>`${L[i]}'(${cx(x)}, ${cx(y)})`).join(' · ')}</p><p class="muted" style="margin:4px 0 0">${img.why}</p>`;
  $('#ginfo').innerHTML=h};
 const draw=()=>{let g='';for(let k=mn;k<=mx;k++)g+=ln(X(k),Y(mn),X(k),Y(mx),{c:C.gl,w:1})+ln(X(mn),Y(k),X(mx),Y(k),{c:C.gl,w:1});
  g+=ln(X(mn),Y(0),X(mx),Y(0),{w:2})+ln(X(0),Y(mn),X(0),Y(mx),{w:2});for(let k=mn;k<=mx;k++)if(k)g+=tx(X(k),Y(0)+11,cx(k),{fs:9,fw:600,c:'#4A5468'})+tx(X(0)-8,Y(k),cx(k),{fs:9,fw:600,c:'#4A5468',a:'end'});
  if(img&&img.nom.startsWith('Simetria'))g+=ln(X(0),Y(mn),X(0),Y(mx),{c:C.r,w:2.5,dash:1});
  const shape=(Q,c,f,lab)=>(Q.length>1?(closed?`<polygon points="${pts(Q.map(([x,y])=>[X(x),Y(y)]))}" fill="${f}" fill-opacity=".6" stroke="${c}" stroke-width="3"/>`:`<polyline points="${pts(Q.map(([x,y])=>[X(x),Y(y)]))}" fill="none" stroke="${c}" stroke-width="3"/>`):'')+Q.map(([x,y],i)=>`<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="${c}"/>`+tx(X(x)+9,Y(y)-9,L[i]+lab,{fs:12,c})).join('');
  g+=shape(V,C.b,C.bl,'');if(img)g+=shape(img.Q,C.o,C.ol,"'");
  for(let x=mn;x<=mx;x++)for(let y=mn;y<=mx;y++)g+=`<circle data-x="${x}" data-y="${y}" cx="${X(x)}" cy="${Y(y)}" r="${s/2-1}" fill="transparent" style="cursor:pointer"/>`;
  $('#gsvg').innerHTML=svg(Wd,Wd,g,420);$('#gsvg').querySelectorAll('[data-x]').forEach(c=>c.onclick=()=>{if(closed||V.length>=10)return;const p=[+c.dataset.x,+c.dataset.y];if(V.some(q=>q[0]===p[0]&&q[1]===p[1]))return;V.push(p);img=null;draw()});info()};
 const tr=(nom,f,why)=>{if(!closed||V.length<3)return toastG();const Q=V.map(f);if(Q.some(([x,y])=>x<mn||x>mx||y<mn||y>mx)){$('#ginfo').insertAdjacentHTML('beforeend','<p class="muted">La figura sortiria de la quadrícula. Prova-ho amb una figura més petita o més centrada.</p>');return}img={nom,Q,why};draw()};
 const toastG=()=>$('#ginfo').insertAdjacentHTML('beforeend','<p class="muted">Primer fes una figura d\'almenys 3 punts i tanca-la.</p>');
 $('#gc').onclick=()=>{if(V.length>=3){closed=true;draw()}else toastG()};
 $('#gs').onclick=()=>tr('Simetria respecte de l\'eix vertical',([x,y])=>[-x,y],'La x canvia de signe i la y es queda igual: cada punt queda a la mateixa distància de l\'eix, a l\'altra banda.');
 $('#gg').onclick=()=>tr('Gir de 180° al voltant de l\'origen',([x,y])=>[-x,-y],'Les dues coordenades canvien de signe. La figura no canvia de forma ni de mida.');
 $('#gt').onclick=()=>tr('Translació 3 a la dreta i 1 amunt',([x,y])=>[x+3,y+1],'Sumam 3 a totes les x i 1 a totes les y. Tots els punts es mouen igual.');
 $('#gu').onclick=()=>{if(img)img=null;else if(closed)closed=false;else V.pop();draw()};$('#ge').onclick=()=>{V=[];closed=false;img=null;draw()};draw()};

/* =====================================================================
   Material: convertidor d'unitats i taules de nombres
   ===================================================================== */
const MAG={longitud:{n:'Longitud',u:['km','hm','dam','m','dm','cm','mm'],f:10},massa:{n:'Massa',u:['kg','hg','dag','g','dg','cg','mg'],f:10},
 capacitat:{n:'Capacitat',u:['kl','hl','dal','l','dl','cl','ml'],f:10},superficie:{n:'Superfície',u:['km²','hm²','dam²','m²','dm²','cm²','mm²'],f:100},volum:{n:'Volum',u:['m³','dm³','cm³','mm³'],f:1000}};
window.mtConvertidor=function(){endSession();let m='longitud';
 app(head('Convertidor d\'unitats','Escriu una quantitat i mira-la en totes les unitats de l\'escala.','Material · Matemàtiques')+`<div class="card">${btns('cmag',Object.entries(MAG).map(([k,v])=>[k,v.n]),m)}
  <div class="row" style="align-items:flex-end;flex-wrap:wrap"><div><label>Quantitat</label><input id="cval" value="1" inputmode="decimal" style="width:160px"></div><div><label>Unitat</label><select id="cuni" style="font-size:20px;padding:8px"></select></div></div>
  <div id="cout" style="margin-top:14px"></div><p class="muted" id="cnote" style="margin:10px 0 0"></p></div>`);
 const fill=()=>{const M=MAG[m];$('#cuni').innerHTML=M.u.map((u,i)=>`<option value="${i}" ${u==='m'||u==='g'||u==='l'||u==='m²'||u==='dm³'?'selected':''}>${u}</option>`).join('');calc()};
 const calc=()=>{const M=MAG[m],i=+$('#cuni').value,raw=$('#cval').value.trim().replace(/\./g,'').replace(',','.'),v=parseFloat(raw);
  if(!isFinite(v)){$('#cout').innerHTML='<p class="muted">Escriu un nombre (per exemple 2,5).</p>';return}
  $('#cout').innerHTML=`<div class="tablewrap"><table class="mini"><tr>${M.u.map(u=>`<th style="text-transform:none">${u}</th>`).join('')}</tr><tr>${M.u.map((u,j)=>`<td style="text-align:center;${j===i?'background:#FFF1D6;font-weight:800':''}">${nf(v*M.f**(j-i))}</td>`).join('')}</tr></table></div>`;
  $('#cnote').innerHTML=`Cada graó cap a la dreta multiplica per <b>${M.f===10?'10':M.f===100?'100':'1.000'}</b>; cap a l'esquerra, divideix.${m==='volum'?' Recorda: 1 dm³ = 1 l i 1 cm³ = 1 ml.':m==='superficie'?' 1 ha = 1 hm² · 1 a = 1 dam² · 1 ca = 1 m².':''}`};
 bindBtns('cmag',v=>{m=v;fill()});$('#cval').oninput=calc;$('#cuni').onchange=calc;fill()};

window.mtTaulesNombres=function(){endSession();const pr=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
 const FDP=[[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[1,10],[3,10],[1,20],[1,25],[1,50],[1,100]].map(([n,d])=>{const v=n/d,ex=Math.abs(v*1000-Math.round(v*1000))<1e-9;return[F(n,d),ex?dc(v):'≈ '+dc(Math.round(v*1000)/1000),(ex?'':'≈ ')+dc(Math.round(v*1000)/10)+' %']});
 let cent='<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:3px;max-width:420px">';for(let i=1;i<=100;i++)cent+=`<div style="text-align:center;padding:5px 0;font-weight:${pr(i)?800:500};background:${pr(i)?'#2F6BFF':'#F2F5FB'};color:${pr(i)?'#fff':'#1D2433'}">${i}</div>`;cent+='</div>';
 app(head('Taules de nombres','Equivalències, nombres primers, quadrats, cubs i potències de 10','Material · Matemàtiques')+
  `<div class="card"><h3 style="margin-top:0">Fraccions, decimals i percentatges</h3>${taula(['Fracció','Decimal','Percentatge'],FDP)}</div>`+
  `<div class="card"><h3 style="margin-top:0">Nombres primers fins a 100</h3><p class="muted" style="margin:0 0 8px">Els blaus són primers: només es poden dividir entre 1 i ells mateixos. N'hi ha 25.</p>${cent}</div>`+
  `<div class="card"><h3 style="margin-top:0">Quadrats i cubs</h3>${taula(['n','n²','n³'],Array.from({length:12},(_,i)=>[i+1,(i+1)**2,MT.num((i+1)**3)]))}<p class="muted" style="margin:8px 0 0">L'arrel quadrada desfà el quadrat: √81 = 9 perquè 9² = 81.</p></div>`+
  `<div class="card"><h3 style="margin-top:0">Potències de 10</h3>${taula(['Potència','Valor','Nom'],[['10¹','10','deu'],['10²','100','cent'],['10³','1.000','mil'],['10⁴','10.000','deu mil'],['10⁵','100.000','cent mil'],['10⁶','1.000.000','un milió']])}</div>`)};

(LAMINES.mates=LAMINES.mates||[]).push(
 {obre:"mlamScreen('figures')",nom:'Figures planes',desc:'Elements, perímetre i àrea de cada figura',ic:'shapes'},
 {obre:"mlamScreen('cossos')",nom:'Cossos geomètrics',desc:'Poliedres i cossos rodons, volum i desenvolupament pla',ic:'cube'},
 {obre:'mtRecta()',nom:'Recta numèrica',desc:'Fraccions, decimals i percentatges a la recta',ic:'ruler'},
 {obre:'mtGeopla()',nom:'Geoplà de coordenades',desc:'Fes figures i prova la simetria, el gir i la translació',ic:'grid'});
(MATERIAL.mates=MATERIAL.mates||[]).push(
 {obre:'mtConvertidor()',nom:'Convertidor d\'unitats',desc:'Longitud, massa, capacitat, superfície i volum',ic:'calc'},
 {obre:'mtTaulesNombres()',nom:'Taules de nombres',desc:'Fraccions-decimals-percentatges, primers, quadrats i cubs',ic:'list'});
// Icones (IC es defineix a programa/icones.js, que es carrega després)
document.addEventListener('DOMContentLoaded',()=>{if(typeof ICO!=='function')return;Object.assign(IC,{
 shapes:ICO('<rect x="3" y="12" width="8" height="8"/><circle cx="17" cy="16" r="4"/><path d="M12 3l5 7H7Z"/>'),
 cube:ICO('<path d="M12 3 4 7v10l8 4 8-4V7Z"/><path d="m4 7 8 4 8-4M12 11v10"/>'),
 ruler:ICO('<path d="M2 12h20"/><path d="M4 9v6M9 10v4M14 10v4M19 9v6"/>')})});
})();
