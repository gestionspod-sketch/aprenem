/* Aprenem - pantalles v5: closca (menú lateral i barra inferior), inici, assignatures, practicar,
   el meu progrés i pàgina d'assignatura (unitats com un camí, làmines i material al costat).
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */

/* ---------- càlculs de progrés ---------- */
// Un tema es mostra si no té cursos (serveix per a tots) o si inclou el curs de l'infant
const forCurs=c=>!c||!c.length||c.includes(+S.perfil.curs);
const unitsOf=m=>{const U=(UNITS[m]||[]).filter(u=>forCurs(u[2])).map(([n,ks])=>[n,ks.filter(k=>SK[k]&&forCurs(SK[k].curs))]).filter(u=>u[1].length);
 const all=new Set((UNITS[m]||[]).flatMap(u=>u[1])),rest=Object.keys(SK).filter(k=>matOf(k)===m&&!all.has(k)&&forCurs(SK[k].curs));
 if(rest.length)U.push(['Altres temes',rest]);return U};
const topicsOf=m=>unitsOf(m).flatMap(u=>u[1]);
const lvScore=k=>[0,.15,.6,1][level(k)+1];
const mastery=ks=>ks.length?Math.round(ks.reduce((a,k)=>a+lvScore(k),0)/ks.length*100):0;
const LV_TXT=['Sense començar','En procés','Comprèn','Domina'];
const lvName=k=>LV_TXT[level(k)+1];
const lvTag=k=>`<span class="lvt l${level(k)+1}">${lvName(k)}</span>`;
// Nivell d'una unitat: 3 domina (tots dominats) · 2 comprèn (tots ≥ comprèn) · 1 en procés (algun començat) · 0 sense començar
function unitLv(ks){const ls=ks.map(level);if(ls.every(l=>l>=2))return 3;if(ls.every(l=>l>=1))return 2;if(ls.some(l=>l>=0))return 1;return 0}
const dayKey=d=>{const x=new Date(d);return x.getFullYear()+'-'+(x.getMonth()+1)+'-'+x.getDate()};
function streak(){const days=new Set(S.log.map(l=>dayKey(l.data)));let n=0;const d=new Date();if(!days.has(dayKey(d)))d.setDate(d.getDate()-1);while(days.has(dayKey(d))){n++;d.setDate(d.getDate()-1)}return n}
const todayMin=()=>Math.round(S.log.filter(l=>dayKey(l.data)===dayKey(Date.now())).reduce((a,b)=>a+b.min,0));
function lastTopic(m){let best=null,t=0;for(const[k,p]of Object.entries(S.prog))if(SK[k]&&(!m||matOf(k)===m)&&forCurs(SK[k].curs)&&p.last>t){t=p.last;best=k}return best}
// Unitat on és l'infant: la del darrer tema practicat (si encara no la comprèn tota) o la primera que no comprèn
function curUnit(m,U){if(!U.length)return 0;const lt=lastTopic(m),ui=lt?U.findIndex(u=>u[1].includes(lt)):-1;
 if(ui>=0&&unitLv(U[ui][1])<2)return ui;const nx=U.findIndex((u,i)=>i>ui&&unitLv(u[1])<2);if(nx>=0)return nx;
 const f=U.findIndex(u=>unitLv(u[1])<2);return f>=0?f:Math.max(0,ui)}
const abOf=k=>SK[k].ab||(typeof AB!=='undefined'&&AB[k])||SK[k].nom.slice(0,2);
const sujC=m=>`--c:var(--s-${m})`;
function greet(){const h=new Date().getHours();return h<6?'Bona nit':h<14?'Bon dia':h<21?'Bona tarda':'Bona nit'}
function dateStr(){try{const t=new Date().toLocaleDateString('ca-ES',{weekday:'long',day:'numeric',month:'long'});return t.charAt(0).toUpperCase()+t.slice(1)}catch(e){return''}}
const LEGEND=`<div class="legend5"><span><i></i>Sense començar</span><span><i class="l1"></i>En procés</span><span><i class="l2"></i>Comprèn</span><span><i class="l3"></i>Domina</span></div>`;

/* ---------- closca: menú lateral (ordinador i tauleta) i barra inferior (mòbil) ---------- */
let NAV={k:'inici',m:null};
function nav(k,m=null){NAV={k,m};drawShell()}
function drawShell(){const s=$('#side'),t=$('#tabbar');if(!s||!t)return;const on=x=>NAV.k===x?' class="on" aria-current="page"':'';
 s.innerHTML=`<button class="logo5" onclick="home()" aria-label="Aprenem: anar a l'inici">${OWLM(36)}<b>Aprenem</b></button>
 <nav class="nav5"><button${on('inici')} onclick="home()" title="Inici">${IC.home}Inici</button>
 <button${on('assig')} onclick="subjects()" title="Assignatures">${IC.book}Assignatures</button>
 ${NAV.k==='assig'?`<div class="subs">${Object.keys(SUBJ).map(m=>`<button class="${NAV.m===m?'cur':''}" style="${sujC(m)}" onclick="subject('${m}')"><i></i>${SUBJ[m].nom}</button>`).join('')}</div>`:''}
 <button${on('practicar')} onclick="practicar()" title="Practicar">${IC.grid}Practicar</button>
 <button onclick="start('aventura')" title="Aventura">${IC.map}Aventura</button>
 <button${on('progres')} onclick="progres()" title="El meu progrés">${IC.chart}El meu progrés</button></nav>
 <div class="nav5 side-foot"><button${on('families')} onclick="askPin()" title="Famílies (amb PIN)">${IC.lock}Famílies</button></div>`;
 t.innerHTML=[['inici','home()',IC.home,'Inici'],['assig','subjects()',IC.book,'Assignatures'],['progres','progres()',IC.chart,'Progrés'],['families','askPin()',IC.lock,'Famílies']]
  .map(([k,f,i,n])=>`<button${on(k)} onclick="${f}">${i}${n}</button>`).join('')}

/* ---------- peces reutilitzables ---------- */
function ring(done,goal,sz){const big=sz>60,r=big?35:17,w=big?9:5,c=2*Math.PI*r,p=Math.max(0,Math.min(1,done/(goal||1))),h=sz/2;
 return`<svg class="ring5" width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" role="img" aria-label="${done} de ${goal} minuts"><circle cx="${h}" cy="${h}" r="${r}" fill="none" stroke="#E2E7EF" stroke-width="${w}"/><circle cx="${h}" cy="${h}" r="${r}" fill="none" stroke="#2BA36B" stroke-width="${w}" stroke-dasharray="${(c*p).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 ${h} ${h})"/>${big
  ?`<text x="${h}" y="${h-1}" text-anchor="middle" font-weight="700" font-size="20" fill="#14213D">${done}</text><text x="${h}" y="${h+15}" text-anchor="middle" font-size="10" fill="#64708A">de ${goal} min</text>`
  :`<text x="${h}" y="${h+4}" text-anchor="middle" font-weight="700" font-size="12" fill="#14213D">${done}'</text>`}</svg>`}
// Les 6 maneres de practicar (ordre i colors del disseny v5)
const MODE5=()=>[['professor','Professor','T\'ho explica pas a pas','#3B6FE0',IC.cap],['exercicis','Exercicis','Practica un tema','#2BA36B',IC.grid],['aventura','Aventura','Proves amb segell','#F08A24',IC.map],
 ['combinada','Sessió combinada','Una mica de tot','#7B5CE0',IC.layers],['escriptura','Escriptura','Escriu a mà i fes foto','#E0457B',IC.pen],['comprovacio','Comprovació','Ja ho domines?','#14213D',IC.okc]];
const modeTiles=big=>MODE5().map(([k,n,d,c,i])=>`<button class="mode5" style="--c:${c}" data-m="${k}"><span class="ico5">${i}</span>${big?MODES[k].nom:n}<small>${big?MODES[k].desc:d}</small></button>`).join('');
function subCard(m){const U=unitsOf(m),ks=U.flatMap(u=>u[1]),ms=mastery(ks),ui=curUnit(m,U);
 return`<button class="sub5" style="${sujC(m)}" onclick="subject('${m}')"><span class="sub5-t"><b>${SUBJ[m].ic}${SUBJ[m].nom}</b><em>${ms}%</em></span>${U.length
  ?`<span class="seg" aria-hidden="true">${U.map(u=>`<span class="l${unitLv(u[1])}"></span>`).join('')}</span><small>Unitat ${ui+1} de ${U.length} · ${esc(U[ui][0])}</small>`:'<small>Properament</small>'}<span class="mbar" aria-hidden="true"><span><i style="width:${ms}%"></i></span><b>${ms}%</b></span></button>`}
const topicRow=(k,ctx)=>{const v=SK[k],l=level(k);let teo='';try{teo=plain((v.teoria||[]).join(' '))}catch(e){}
 return`<div class="topic5" style="${sujC(matOf(k))}" data-s="${esc(sfold(v.nom+' '+(typeof ctx==='string'?ctx:'')+' '+teo))}"><span class="ab5">${abOf(k)}</span><span class="tn"><b>${v.nom}</b>${ctx&&ctx.show?`<small>${ctx.show}</small>`:''}</span>${lvTag(k)}<span class="tb"><button class="btn2" data-l="${k}">Aprendre</button><button class="btn2${l===0||l===1?' dk':''}" data-p="${k}">Practicar</button></span></div>`};
function bindModes(root){root.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>start(b.dataset.m))}
// Consell de l'òliba: a partir de l'error típic més repetit
function owlTip(){let best=null;for(const[k,p]of Object.entries(S.prog))if(SK[k])for(const[t,n]of Object.entries(p.errs||{}))if(ERR[t]&&(!best||n>best.n))best={k,t,n};
 const tips=['si t\'equivoques dues vegades, t\'explicaré la solució pas a pas. Equivocar-se també és aprendre!','una mica cada dia val més que molt d\'un sol cop.','abans d\'escriure la resposta, llegeix l\'enunciat dues vegades.','quan un tema et costi, entra a «Aprendre» i mira l\'exemple resolt.'];
 const txt=!best?tips[new Date().getDate()%tips.length]:best.t==='massa_rapid'?'llegeix cada enunciat amb calma abans de respondre. Pensar primer estalvia errors!'
  :`a <b>${SK[best.k].nom}</b> ${best.n>1?`t'has equivocat ${best.n} vegades de la mateixa manera`:`t'has equivocat una vegada`}. Recorda: ${ERR[best.t].kid.replace(/^Gairebé!\s*/,'')}`;
 return`<div class="tip5">${OWLM(34,'#F26B1D','#14213D')}<div><b>Consell de l'òliba:</b> ${txt}</div></div>`}

/* ---------- inici ---------- */
function home(){endSession();PARENT_OK=false;nav('inici');
 const nm=S.perfil.nom?esc(S.perfil.nom):'',s=S.sessio,goal=+s.minuts||30,done=todayMin(),st=streak(),lt=lastTopic();
 app(`<div class="home5"><div class="h5-main">
  <div class="h5-head"><span class="h5-logo">${OWLM(32)}</span><div class="h5-hi"><h1>${greet()}${nm?', '+nm:''}!</h1><p>${dateStr()} · ${ORD[S.perfil.curs]} de Primària</p></div>
   <div class="h5-mini"><span class="fl" title="Dies seguits">${IC.flame}${st}</span>${ring(done,goal,44)}</div>
   <label class="srch5" for="cerca">${IC.search}<input id="cerca" type="search" placeholder="Cerca un tema o una unitat" autocomplete="off" enterkeyhint="search"><button class="srx" type="button" aria-label="Esborrar la cerca" hidden>✕</button></label></div>
  <div id="cres" aria-live="polite"></div>
  ${contCard(lt)}
  <section><h2 class="h5">Com vols practicar?</h2><div class="modes5">${modeTiles(false)}</div></section>
  <section><div class="h5row"><h2>Assignatures</h2><a onclick="subjects()">Veure-les totes</a></div><div class="subjs5">${Object.keys(SUBJ).map(subCard).join('')}</div>${LEGEND}</section>
 </div>
 <aside class="h5-side">${goalCard(done,goal)}${streakCard(st)}${missionCard()}${owlTip()}</aside></div>`);
 bindModes($('.modes5'));
 const cg=$('#cGo');if(cg)cg.onclick=lt?()=>start('exercicis',[lt],15):()=>start(s.mode);
 $('#mGo').onclick=()=>start(s.mode);
 bindSearch($('#cerca'),q=>{$('#cres').innerHTML=q?searchHTML(q):'';bindTopicButtons($('#cres'))})}

function contCard(lt){
 if(!lt){const k=S.sessio.skills.find(x=>SK[x]),m=k?matOf(k):'mates';
  return`<div class="card cont5" style="${sujC(m)}"><i></i><div class="cont5-b"><div class="cont5-t"><span class="lbl">Comença per aquí</span><h2>${S.sessio.mode==='escriptura'?'Escriptura al quadern':'La missió d\'avui'}</h2><p>${k?S.sessio.skills.filter(x=>SK[x]).slice(0,3).map(x=>SK[x].nom).join(' · '):'Tria una assignatura i comença a aprendre.'}</p></div><button class="go" id="cGo">Comença →</button></div></div>`}
 const m=matOf(lt),U=unitsOf(m),ui=U.findIndex(u=>u[1].includes(lt)),un=ui<0?'':U[ui][0],ks=ui<0?[lt]:U[ui][1];
 const st=ks.map(k=>k===lt?'c':level(k)>=1?'d':''),pv=unitLv(ks)>=3?'d':'';
 const steps=ks.map((k,j)=>`${j?`<em class="${st[j-1]==='d'?'d':''}"></em>`:''}<span class="${st[j]}" title="${esc(SK[k].nom)}">${st[j]==='d'?'✓':j+1}</span>`).join('')+`<em class="${st[st.length-1]==='d'?'d':''}"></em><span class="${pv}" title="Prova de la unitat">${pv?'✓':'P'}</span>`;
 return`<div class="card cont5" style="${sujC(m)}"><i></i><div class="cont5-b"><div class="cont5-t"><span class="lbl">Continua on ho deixares</span><h2>${SUBJ[m].nom}${ui>=0?` · Unitat ${ui+1}: ${esc(un)}`:''}</h2><p>Tema: ${SK[lt].nom}</p>
  <div class="steps5" aria-hidden="true">${steps}</div><div class="steps5-l" aria-hidden="true">${ks.map(k=>`<span>${abOf(k)}</span>`).join('')}<span>Prova</span></div></div><button class="go" id="cGo">Continua →</button></div></div>`}
function goalCard(done,goal){const q=goal-done;
 return`<div class="card goal5">${ring(done,goal,84)}<div><span class="lbl">Objectiu d'avui</span><p>${q<=0?'<b>Objectiu complert!</b> Molt bona feina.':`Et ${q===1?'queda':'queden'} <b>${q} ${q===1?'minut':'minuts'}</b>.`}</p></div></div>`}
function streakCard(st){const days=new Set(S.log.map(l=>dayKey(l.data))),d0=new Date(),dow=(d0.getDay()+6)%7;
 const cells=['Dl','Dt','Dc','Dj','Dv','Ds','Dg'].map((n,i)=>{const d=new Date(d0);d.setDate(d0.getDate()-dow+i);return`<span>${n}<i class="${days.has(dayKey(d))?'d':i===dow?'t':''}"></i></span>`}).join('');
 return`<div class="card strk5"><div class="strk5-h"><span class="lbl">Ratxa</span><b>${st?`${st} ${st===1?'dia seguit':'dies seguits'}`:'Comença avui!'}</b></div><div class="week5" aria-hidden="true">${cells}</div></div>`}
function missionCard(){const s=S.sessio,ks=s.skills.filter(k=>SK[k]),today=dayKey(Date.now());let first=true;
 const it=(txt,d)=>{const c=d?'d':first?'n':'';if(!d)first=false;return`<div class="mis5-i${d?' d':''}"><span class="${c}">${d?'✓':''}</span><em>${txt}</em></div>`};
 const items=s.mode==='escriptura'?it('<b>Escriptura</b> al quadern',false):ks.slice(0,4).map(k=>{const p=S.prog[k];return it(`${SK[k].nom} <span class="muted">· ${SUBJ[matOf(k)].nom}</span>`,!!(p&&p.last&&dayKey(p.last)===today))}).join('')+(ks.length>4?`<small>i ${ks.length-4} temes més</small>`:'');
 return`<div class="card mis5"><span class="lbl">Missió d'avui</span><small>${MODES[s.mode].nom} · ${s.minuts} minuts · la preparen els teus pares</small>${items||'<small>Encara no hi ha cap tema triat.</small>'}<button class="dark" id="mGo">Comença la missió</button></div>`}

/* ---------- cercador ---------- */
// Índex de cerca: temes (nom, unitat, assignatura i explicació), làmines i material. Sense accents ni majúscules.
// Text preparat per cercar inici de paraula: « paraula1 paraula2 » (sense accents, només lletres i xifres)
const sfold=s=>' '+fold(s).replace(/[^a-z0-9]+/g,' ')+' ';
const hit=(txt,w)=>txt.includes(' '+w+(w.length<=3?' ':''));   // paraules curtes: paraula sencera; llargues: inici de paraula
function searchIndex(){const out=[];
 for(const m of Object.keys(SUBJ)){
  unitsOf(m).forEach(([un,uk],ui)=>uk.forEach(k=>{const v=SK[k];let teo='';try{teo=plain((v.teoria||[]).join(' '))}catch(e){}
   out.push({t:'tema',m,k,un,ui,name:sfold(v.nom),ctx:sfold(un+' '+SUBJ[m].nom),body:sfold(teo)})}));
  for(const[kind,list]of[['làmina',LAMINES[m]||[]],['material',MATERIAL[m]||[]]])for(const x of list)out.push({t:kind,m,x,name:sfold(x.nom),ctx:sfold(SUBJ[m].nom+' '+(x.desc||'')),body:''})}
 return out}
const qWords=q=>fold(q).replace(/[^a-z0-9]+/g,' ').split(' ').filter(w=>w.length>1);
function searchHTML(q){const words=qWords(q);if(!words.length)return'';
 const res=searchIndex().map(e=>{let sc=0;for(const w of words){if(hit(e.name,w))sc+=e.name.startsWith(' '+w)?6:4;else if(hit(e.ctx,w))sc+=2;else if(hit(e.body,w))sc+=1;else return null}return{e,sc}}).filter(Boolean).sort((a,b)=>b.sc-a.sc).slice(0,12);
 if(!res.length)return`<div class="sres5 empty"><b>No he trobat res amb «${esc(q)}».</b><small>Prova amb una altra paraula o entra a una assignatura.</small></div>`;
 return`<div class="sres5"><div class="sres-h lbl">${res.length} ${res.length===1?'resultat':'resultats'}</div>${res.map(({e})=>e.t==='tema'
  ?topicRow(e.k,{show:`${SUBJ[e.m].nom} · Unitat ${e.ui+1}: ${esc(e.un)}`})
  :`<div class="topic5" style="${sujC(e.m)}"><span class="ab5">${IC[e.x.ic]||IC.book}</span><span class="tn"><b>${esc(e.x.nom)}</b><small>${SUBJ[e.m].nom} · ${e.t==='làmina'?'Làmina interactiva':'Material'}</small></span><span class="tb"><button class="btn2 dk" onclick="${e.x.obre}">Obrir</button></span></div>`).join('')}</div>`}
function bindTopicButtons(root){root.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>start('professor',[b.dataset.l],15));root.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>start('exercicis',[b.dataset.p],15))}
function bindSearch(inp,fn){if(!inp)return;const x=inp.parentNode.querySelector('.srx');let t;
 inp.oninput=()=>{clearTimeout(t);x.hidden=!inp.value;t=setTimeout(()=>fn(inp.value.trim()),120)};
 inp.onkeydown=e=>{if(e.key==='Escape'){inp.value='';x.hidden=true;fn('')}};
 x.onclick=()=>{inp.value='';x.hidden=true;fn('');inp.focus()}}

// Temari d'anglès obert des de la pàgina de l'assignatura (en tornar, va a Anglès)
function temariAngles(){temari(false);const b=document.querySelector('.ph .ghost');if(b)b.onclick=()=>subject('angles')}

// Teoria d'un tema en una finestra (botó «Repassa la teoria» dels exercicis amb ajuda)
function showTheory(k){const s=SK[k];if(!s)return;let fig='';try{fig=s.fig?`<div class="fig">${s.fig()}</div>`:''}catch(e){}
 modal(`<h3 style="margin-top:0">${IC.cap} ${s.nom}</h3><div class="teo5">${(s.teoria||[]).map(t=>`<p>${t}</p>`).join('')}</div>${fig}<div class="row" style="justify-content:flex-end;margin-top:12px"><button class="sec" onclick="closeModal()">Tanca</button></div>`,'wide')}

/* ---------- llista d'assignatures, practicar i el meu progrés ---------- */
function subjects(){endSession();nav('assig');
 app(`<div class="pagehead5"><h1>Assignatures</h1><p>${ORD[S.perfil.curs]} de Primària · tria una assignatura per veure'n les unitats, les làmines i el material.</p></div><div class="subjs5 big">${Object.keys(SUBJ).map(subCard).join('')}</div>${LEGEND}`)}
function practicar(){endSession();nav('practicar');const ks=S.sessio.skills.filter(k=>SK[k]);
 app(`<div class="pagehead5"><h1>Com vols practicar?</h1><p>${ks.length?`Practicaràs els temes de la missió d'avui: <b>${ks.slice(0,4).map(k=>SK[k].nom).join(', ')}${ks.length>4?'…':''}</b>.`:'Encara no hi ha temes a la missió d\'avui.'} Per practicar un altre tema, entra a una assignatura.</p></div><div class="modes5 big">${modeTiles(true)}</div>`);
 bindModes($('.modes5'))}
function progres(){endSession();nav('progres');
 const wk=S.log.filter(l=>Date.now()-new Date(l.data)<7*864e5).reduce((a,b)=>a+b.min,0),all=Object.keys(SUBJ).flatMap(topicsOf);
 const nEx=Object.entries(S.prog).filter(([k])=>SK[k]).reduce((a,[,p])=>a+(p.att||0),0),nDom=all.filter(k=>level(k)===2).length;
 app(`<div class="pagehead5"><h1>El meu progrés</h1><p>Com vas a cada assignatura. Un tema està <b>dominat</b> quan superes la comprovació final sense pistes.</p></div>
 <div class="stats5"><div><b>${streak()}</b><span>dies seguits</span></div><div><b>${Math.round(wk)} min</b><span>aquesta setmana</span></div><div><b>${nEx}</b><span>exercicis fets</span></div><div><b>${nDom}</b><span>temes dominats</span></div></div>
 <div class="prog5">${Object.keys(SUBJ).map(m=>{const ks=topicsOf(m),c=[0,0,0,0];ks.forEach(k=>c[level(k)+1]++);
  return`<div class="card" style="${sujC(m)}"><div class="sub5-t"><b>${SUBJ[m].ic}${SUBJ[m].nom}</b><em>${mastery(ks)}%</em></div><div class="seg" style="margin-top:12px">${ks.map(k=>`<span class="l${level(k)+1}" title="${esc(SK[k].nom)}"></span>`).join('')}</div>
  <div class="prog5-n"><span><b>${c[3]}</b> domina</span><span><b>${c[2]}</b> comprèn</span><span><b>${c[1]}</b> en procés</span><span><b>${c[0]}</b> sense començar</span></div><button class="btn2" style="margin-top:14px" onclick="subject('${m}')">Veure les unitats</button></div>`}).join('')}</div>${LEGEND}`)}

/* ---------- pàgina d'assignatura ---------- */
function unitHTML(m,[un,uk],i,cu){const lv=unitLv(uk),st=i===cu?'cur':lv>=2?'done':'todo',nD=uk.filter(k=>level(k)===2).length;
 return`<section class="u5 ${st}${i===cu?' open':''}" style="${sujC(m)}"><div class="u5-rail"><span class="u5-node">${i+1}</span><i></i></div>
 <div class="u5-card"><button class="u5-h" aria-expanded="${i===cu}"><span class="u5-ht">${i===cu?'<span class="lbl">Ara estàs aquí</span>':''}<b>${esc(un)}</b><small>${uk.length} ${uk.length===1?'tema':'temes'}${nD?` · ${nD} ${nD===1?'dominat':'dominats'}`:''}</small></span><span class="lvt l${lv}">${LV_TXT[lv]}</span><span class="u5-chev">${IC.chev}</span></button>
 <div class="u5-body">${uk.map(k=>topicRow(k,un)).join('')}<div class="u5-foot"><button data-pv="${i}">Fer la prova de la unitat</button></div></div></div></section>`}
function subject(m){endSession();nav('assig',m);const sb=SUBJ[m],U=unitsOf(m),ks=U.flatMap(u=>u[1]),ms=mastery(ks),cu=curUnit(m,U);
 const lam=LAMINES[m]||[],mat=MATERIAL[m]||[],n=[0,0,0,0];ks.forEach(k=>n[level(k)+1]++);
 let best=null;for(const k of ks)for(const[t,c]of Object.entries(S.prog[k]?.errs||{}))if(ERR[t]&&t!=='massa_rapid'&&(!best||c>best.n))best={k,t,n:c};
 const card=(x,kind)=>`<button class="mat5" style="${sujC(m)}" onclick="${x.obre}"><span class="mat5-ic">${IC[x.ic]||IC.book}</span><span><span class="k">${kind}</span><b>${x.nom}</b><small>${x.desc||''}</small></span></button>`;
 const side=lam.length||mat.length||best?`<aside class="sp5-side">${lam.length||mat.length?`<h2>${lam.length&&mat.length?'Làmines i material':lam.length?'Làmines':'Material'}</h2>`:''}${lam.map(l=>card(l,'Làmina')).join('')}${mat.map(x=>card(x,'Material')).join('')}
  ${best?`<div class="rev5"><span class="lbl">Per repassar</span><p>A <b>${SK[best.k].nom}</b> t'has equivocat ${best.n} ${best.n>1?'vegades':'vegada'} de la mateixa manera. ${ERR[best.t].kid}</p><a id="rvGo">Repassar-ho ara →</a></div>`:''}</aside>`:'';
 app(`<header class="sh5 bleed" style="${sujC(m)}"><span class="wm" aria-hidden="true">${sb.ic}</span><button class="back5" onclick="subjects()">${IC.left} Assignatures</button><span class="sh5-ic" aria-hidden="true">${sb.ic}</span>
  <div class="sh5-t"><small>${ORD[S.perfil.curs]} de Primària · ${U.length} unitats · ${ks.length} temes</small><h1>${sb.nom}</h1></div>
  <div class="sh5-p"><div><span>Has après</span><b>${ms}%</b></div><div class="sh5-bar"><i style="width:${ms}%"></i></div><small>${n[3]} ${n[3]===1?'tema dominat':'temes dominats'} · ${n[2]} comprèn · ${n[1]} en procés</small></div></header>
 <div class="sp5"><div class="sp5-main"><div class="h5row"><h2>Unitats del llibre</h2>${ks.length?`<label class="srch5" for="cercaU">${IC.search}<input id="cercaU" type="search" placeholder="Cerca dins ${esc(sb.nom)}" autocomplete="off" enterkeyhint="search"><button class="srx" type="button" aria-label="Esborrar la cerca" hidden>✕</button></label>`:''}</div>
  <div id="unone" class="sres5 empty" hidden><b>Cap tema coincideix amb la cerca.</b><small>Prova amb una altra paraula.</small></div>
  ${ks.length?'':`<div class="card"><h3>Aviat hi haurà temes</h3><p class="muted">Estam preparant el temari d'aquesta assignatura.</p></div>`}
  ${U.map((u,i)=>unitHTML(m,u,i,cu)).join('')}</div>${side}</div>`);
 bindTopicButtons($('#app'));
 document.querySelectorAll('.u5-h').forEach(h=>h.onclick=()=>{const u=h.closest('.u5');u.classList.toggle('open');h.setAttribute('aria-expanded',u.classList.contains('open'))});
 document.querySelectorAll('[data-pv]').forEach(b=>b.onclick=()=>start('comprovacio',U[+b.dataset.pv][1],15));
 if(best)$('#rvGo').onclick=()=>start('exercicis',[best.k],10);
 // Filtre dins l'assignatura: amaga els temes i les unitats que no coincideixen (i obre les que sí)
 bindSearch($('#cercaU'),q=>{const words=qWords(q);let any=0;
  document.querySelectorAll('.u5').forEach((u,i)=>{let vis=0;const hdr=sfold(u.querySelector('.u5-ht b').textContent),unitHit=words.length&&words.every(w=>hit(hdr,w));
   u.querySelectorAll('.topic5').forEach(r=>{const ok=!words.length||unitHit||words.every(w=>hit(r.dataset.s,w));r.hidden=!ok;if(ok)vis++});
   u.hidden=!vis;u.classList.toggle('open',words.length?!!vis:i===cu);if(vis)any++});
  document.querySelectorAll('.sp5-side .mat5').forEach(c=>{const ok=!words.length||words.every(w=>hit(sfold(c.textContent),w));c.hidden=!ok;if(ok)any++});
  $('#unone').hidden=!!any});
}
