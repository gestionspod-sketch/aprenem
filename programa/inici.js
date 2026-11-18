/* Aprenem - pantalles v3: inici (objectiu del dia, ratxa, continua) i pàgina d'assignatura (unitats i domini)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */

/* ---------- càlculs de progrés ---------- */
const unitsOf=m=>{const U=(UNITS[m]||[]).map(([n,ks])=>[n,ks.filter(k=>SK[k])]).filter(u=>u[1].length);
 const used=new Set(U.flatMap(u=>u[1])),rest=Object.keys(SK).filter(k=>matOf(k)===m&&!used.has(k));
 if(rest.length)U.push(['Altres temes',rest]);return U};
const topicsOf=m=>unitsOf(m).flatMap(u=>u[1]);
const lvScore=k=>[0,.15,.6,1][level(k)+1];                       // sense dades, en procés, comprèn, domina
const mastery=ks=>ks.length?Math.round(ks.reduce((a,k)=>a+lvScore(k),0)/ks.length*100):0;
const lvName=k=>{const l=level(k);return l<0?'No començat':LV[l]};
const lvTag=k=>`<span class="lvt l${level(k)+1}">${lvName(k)}</span>`;
const segBar=ks=>`<div class="seg" role="img" aria-label="Domini per temes">${ks.map(k=>`<span class="l${level(k)+1}" title="${esc(SK[k].nom)}: ${lvName(k)}"></span>`).join('')}</div>`;
const dayKey=d=>{const x=new Date(d);return x.getFullYear()+'-'+(x.getMonth()+1)+'-'+x.getDate()};
function streak(){const days=new Set(S.log.map(l=>dayKey(l.data)));let n=0;const d=new Date();if(!days.has(dayKey(d)))d.setDate(d.getDate()-1);while(days.has(dayKey(d))){n++;d.setDate(d.getDate()-1)}return n}
const todayMin=()=>Math.round(S.log.filter(l=>dayKey(l.data)===dayKey(Date.now())).reduce((a,b)=>a+b.min,0));
function lastTopic(){let best=null,t=0;for(const[k,p]of Object.entries(S.prog))if(SK[k]&&p.last>t){t=p.last;best=k}return best}
const ringSVG=(pct,sz=74)=>{const r=30,c=2*Math.PI*r,p=Math.max(0,Math.min(100,pct));return`<svg class="ring3" width="${sz}" height="${sz}" viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="${r}" class="rg-b"/><circle cx="36" cy="36" r="${r}" class="rg-f" stroke-dasharray="${c*p/100} ${c}" transform="rotate(-90 36 36)"/><text x="36" y="41" text-anchor="middle" class="rg-t">${p}%</text></svg>`};
const subjIcon=m=>SUBJ[m].ic;
const illo=(m,icon)=>`<div class="illo" style="--c:var(--s-${m})"><span class="illo-ic">${icon||subjIcon(m)}</span><span class="illo-a"></span><span class="illo-b"></span></div>`;

/* ---------- inici ---------- */
function home(){endSession();PARENT_OK=false;
 const nm=S.perfil.nom?esc(S.perfil.nom):'',s=S.sessio,m=MODES[s.mode],goal=+s.minuts||30,done=todayMin(),pct=Math.round(Math.min(100,done/goal*100)),st=streak();
 const lt=lastTopic(),cont=lt||s.skills[0]||topicsOf('mates')[0],cm=matOf(cont);
 app(`<section class="hero hero3"><button class="lockbtn" onclick="askPin()" aria-label="Zona famílies (amb PIN)">${IC.lock} Famílies</button>
 <div class="hero-row"><div class="hero-t"><span class="pill light">${ORD[S.perfil.curs]} de Primària</span><h2>${nm?`Hola, ${nm}!`:'Hola!'}</h2><p>${done>=goal?'Objectiu d\'avui complert. Molt bona feina!':done>0?`Avui portes ${done} de ${goal} minuts.`:`L'objectiu d'avui són ${goal} minuts d'estudi.`}</p></div>
 <div class="hstats"><div class="hst">${ringSVG(pct)}<span>Objectiu<br>del dia</span></div><div class="hst"><b class="streak">${IC.flame}${st}</b><span>${st===1?'dia':'dies'}<br>seguits</span></div></div></div></section>

 <div class="grid2 top3">
  <article class="card c3 cont">${illo(cm,cont==='ci_respiratori'?IC.lungs:null)}<div class="c3b"><div class="eyebrow3" style="color:var(--s-${cm})">${lt?'Continua on ho deixares':'Comença per aquí'} · ${SUBJ[cm].nom}</div><h3>${SK[cont].nom}</h3>
   <div class="row" style="align-items:center;gap:10px;margin:6px 0 14px">${lvTag(cont)}<div class="pbar"><i style="width:${Math.round(lvScore(cont)*100)}%;background:var(--s-${cm})"></i></div></div>
   <div class="row"><button id="cP">Practicar</button><button class="sec" id="cL">Repassar la teoria</button></div></div></article>
  <article class="card c3 mis"><div class="c3b"><div class="eyebrow3">Missió d'avui · l'han preparada els teus pares</div><h3>${m.ic} ${m.nom} <span class="muted" style="font-weight:500">· ${s.minuts} min</span></h3>
   <ul class="mlist">${s.mode==='escriptura'?`<li><span class="tile">${IC.pen}</span>Escriptura al quadern</li>`:s.skills.slice(0,4).map(k=>`<li><span class="tile" style="${sc(k)}">${SK[k].ic}</span><span>${SK[k].nom}</span></li>`).join('')+(s.skills.length>4?`<li class="muted">i ${s.skills.length-4} temes més</li>`:'')}</ul>
   <button class="big" onclick="start('${s.mode}')">Comença la missió &rarr;</button></div></article>
 </div>

 <h3 class="sec3">Assignatures</h3>
 <div class="grid3">${Object.keys(SUBJ).map(k=>{const ks=topicsOf(k),ok=ks.filter(x=>level(x)>=1).length;return`<button class="card c3 subj3" onclick="subject('${k}')">${illo(k)}<div class="c3b"><b class="t3">${SUBJ[k].nom}</b><small>${ok} de ${ks.length} temes compresos · ${unitsOf(k).length} unitats</small>${segBar(ks)}<span class="mpct">Domini ${mastery(ks)}%</span></div></button>`}).join('')}</div>

 <h3 class="sec3">Làmines i material d'estudi</h3>
 <div class="grid3">
  ${(LAMINES.ciencies||[]).map(l=>`<button class="card c3 mat3" onclick="${l.obre}()">${illo('ciencies',IC[l.ic])}<div class="c3b"><span class="eyebrow3" style="color:var(--s-ciencies)">Làmina · Ciències</span><b class="t3">${l.nom}</b><small>${l.desc}</small></div></button>`).join('')}
  <button class="card c3 mat3" onclick="verbTable()">${illo('angles',IC.book)}<div class="c3b"><span class="eyebrow3" style="color:var(--s-angles)">Taula · Anglès</span><b class="t3">Verbs anglesos</b><small>Infinitiu, passat, participi i traducció</small></div></button>
  <button class="card c3 mat3" onclick="temari(false)">${illo('angles',IC.list)}<div class="c3b"><span class="eyebrow3" style="color:var(--s-angles)">Temari · Anglès</span><b class="t3">Què s'aprèn a 5è i 6è</b><small>I com practicar cada tema</small></div></button>
 </div>

 <h3 class="sec3">Altres maneres de practicar</h3>
 <div class="modes3" id="om">${Object.entries(MODES).filter(([k])=>k!=='combinada').map(([k,mm])=>`<button class="ghost m3" data-m="${k}">${mm.ic}<span>${mm.nom}</span></button>`).join('')}</div>`);
 $('#cP').onclick=()=>start('exercicis',[cont],15);$('#cL').onclick=()=>start('professor',[cont],15);
 document.querySelectorAll('#om [data-m]').forEach(b=>b.onclick=()=>start(b.dataset.m))}

/* ---------- pàgina d'assignatura ---------- */
function subject(m){endSession();const sb=SUBJ[m],U=unitsOf(m),ks=U.flatMap(u=>u[1]);
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-start"><div class="row" style="align-items:center;gap:14px;flex-wrap:nowrap"><span class="tile big3" style="--c:var(--s-${m})">${sb.ic}</span><div><h2 style="margin:0">${sb.nom}</h2><p class="muted" style="margin:0">${ORD[S.perfil.curs]} de Primària · ${U.length} unitats · ${ks.length} temes</p></div></div><button class="ghost" onclick="home()">← Inici</button></div>
 <div class="card dom3" style="--c:var(--s-${m})"><div class="row" style="justify-content:space-between;align-items:baseline"><b>Domini de l'assignatura</b><b class="dpct">${mastery(ks)}%</b></div>${segBar(ks)}
  <div class="legend3"><span><i class="l1"></i>En procés</span><span><i class="l2"></i>Comprèn</span><span><i class="l3"></i>Domina</span><span><i class="l0"></i>No començat</span></div></div>
 ${m==='ciencies'&&LAMINES.ciencies?`<div class="grid3" style="margin-bottom:18px">${LAMINES.ciencies.map(l=>`<button class="card c3 mat3" onclick="${l.obre}()">${illo('ciencies',IC[l.ic])}<div class="c3b"><span class="eyebrow3" style="color:var(--s-ciencies)">Làmina</span><b class="t3">${l.nom}</b><small>${l.desc}</small></div></button>`).join('')}</div>`:''}
 ${m==='angles'?`<div class="grid3" style="margin-bottom:18px"><button class="card c3 mat3" onclick="verbTable('irr','angles')">${illo('angles',IC.book)}<div class="c3b"><span class="eyebrow3" style="color:var(--s-angles)">Taula</span><b class="t3">Verbs anglesos</b><small>Infinitiu, passat, participi i traducció</small></div></button><button class="card c3 mat3" id="tm">${illo('angles',IC.list)}<div class="c3b"><span class="eyebrow3" style="color:var(--s-angles)">Temari</span><b class="t3">5è i 6è de Primària</b><small>Què s'aprèn a cada curs</small></div></button></div>`:''}
 ${U.map(([un,uk],i)=>`<section class="card unit3" style="--c:var(--s-${m})"><header class="uh"><div><span class="eyebrow3" style="color:var(--s-${m})">Unitat ${i+1}</span><h3>${un}</h3></div><div class="ust"><b>${mastery(uk)}%</b><small>domini</small></div></header>
  ${uk.map(k=>{const v=SK[k];return`<div class="trow"><span class="tile" style="${sc(k)}">${v.ic}</span><span class="tn"><b>${v.nom}</b>${lvTag(k)}</span><span class="tb"><button class="ghost" data-l="${k}">Aprendre</button><button class="sec" data-p="${k}">Practicar</button></span></div>`}).join('')}
  <footer class="uf"><span class="muted">Prova de la unitat: exercicis nous, sense pistes</span><button data-u="${i}">Fer la prova</button></footer></section>`).join('')}`);
 if($('#tm'))$('#tm').onclick=()=>{temari(false);const b=document.querySelector('.ph .ghost');if(b)b.onclick=()=>subject('angles')};
 document.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>start('professor',[b.dataset.l],15));
 document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>start('exercicis',[b.dataset.p],15));
 document.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>start('comprovacio',U[+b.dataset.u][1],15));
}
