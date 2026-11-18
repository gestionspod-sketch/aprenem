/* Aprenem - pantalles v4: inici i pàgina d'assignatura (estil per a Primària: colors vius, dibuixos, botons grans)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */

/* ---------- càlculs de progrés ---------- */
const unitsOf=m=>{const U=(UNITS[m]||[]).map(([n,ks])=>[n,ks.filter(k=>SK[k])]).filter(u=>u[1].length);
 const used=new Set(U.flatMap(u=>u[1])),rest=Object.keys(SK).filter(k=>matOf(k)===m&&!used.has(k));
 if(rest.length)U.push(['Altres temes',rest]);return U};
const topicsOf=m=>unitsOf(m).flatMap(u=>u[1]);
const lvScore=k=>[0,.15,.6,1][level(k)+1];
const mastery=ks=>ks.length?Math.round(ks.reduce((a,k)=>a+lvScore(k),0)/ks.length*100):0;
const lvName=k=>{const l=level(k);return l<0?'Per començar':LV[l]};
const lvTag=k=>`<span class="lvt l${level(k)+1}">${lvName(k)}</span>`;
const dayKey=d=>{const x=new Date(d);return x.getFullYear()+'-'+(x.getMonth()+1)+'-'+x.getDate()};
function streak(){const days=new Set(S.log.map(l=>dayKey(l.data)));let n=0;const d=new Date();if(!days.has(dayKey(d)))d.setDate(d.getDate()-1);while(days.has(dayKey(d))){n++;d.setDate(d.getDate()-1)}return n}
const todayMin=()=>Math.round(S.log.filter(l=>dayKey(l.data)===dayKey(Date.now())).reduce((a,b)=>a+b.min,0));
function lastTopic(){let best=null,t=0;for(const[k,p]of Object.entries(S.prog))if(SK[k]&&p.last>t){t=p.last;best=k}return best}
const ringSVG=(pct,sz=70)=>{const r=29,c=2*Math.PI*r,p=Math.max(0,Math.min(100,pct));return`<svg class="ring4" width="${sz}" height="${sz}" viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="${r}" class="rg-b"/><circle cx="36" cy="36" r="${r}" class="rg-f" stroke-dasharray="${c*p/100} ${c}" transform="rotate(-90 36 36)"/><text x="36" y="42" text-anchor="middle" class="rg-t">${p}%</text></svg>`};

/* ---------- colors i dibuixos ---------- */
const MODE_COL={combinada:'#6C4CF5',professor:'#2F6BFF',aventura:'#F59E0B',exercicis:'#0FA3A3',escriptura:'#EF4E5A',comprovacio:'#22A45D'};
const MODE_TXT={combinada:'La sessió completa',professor:'Aprèn amb el Mestre Òliba',aventura:'Supera proves',exercicis:'Reptes visuals',escriptura:'Al teu quadern',comprovacio:'Estàs preparat?'};
// Dibuix de cada assignatura (formes simples en blanc sobre el color de l'assignatura)
function subjArt(m){const W='rgba(255,255,255,';
 if(m==='mates')return`<svg class="art" viewBox="0 0 220 140" aria-hidden="true"><rect x="128" y="18" width="54" height="54" fill="${W}.22)"/><path d="M155 30v30M140 45h30" stroke="#fff" stroke-width="7"/><circle cx="196" cy="104" r="26" fill="${W}.18)"/><path d="M184 104h24M196 92v0M196 116v0" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="196" cy="93" r="3.5" fill="#fff"/><circle cx="196" cy="115" r="3.5" fill="#fff"/><path d="M92 128 122 76 152 128Z" fill="none" stroke="${W}.7)" stroke-width="4"/><text x="70" y="62" fill="#fff" font-size="34" font-weight="800" font-family="system-ui">¾</text></svg>`;
 if(m==='angles')return`<svg class="art" viewBox="0 0 220 140" aria-hidden="true"><path d="M110 20h84v46h-52l-16 16V66h-16Z" fill="${W}.25)"/><text x="126" y="53" fill="#fff" font-size="24" font-weight="800" font-family="system-ui">Hi!</text><path d="M84 78h72v40h-16v14l-14-14H84Z" fill="#fff"/><text x="98" y="106" fill="currentColor" font-size="20" font-weight="800" font-family="system-ui">ABC</text><path d="M196 92l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z" fill="${W}.8)"/></svg>`;
 return`<svg class="art" viewBox="0 0 220 140" aria-hidden="true"><circle cx="186" cy="40" r="20" fill="${W}.25)"/><ellipse cx="186" cy="40" rx="34" ry="9" fill="none" stroke="${W}.7)" stroke-width="3" transform="rotate(-18 186 40)"/><path d="M118 40h28M124 40v26l-16 40c-3 7 2 14 9 14h30c7 0 12-7 9-14l-16-40V40" fill="none" stroke="#fff" stroke-width="5"/><path d="M112 98h44l7 14c2 4-1 8-5 8h-48c-4 0-7-4-5-8Z" fill="${W}.55)"/><path d="M178 128c-24-2-30-24-12-44 20 14 26 34 12 44Z" fill="${W}.8)"/><path d="M176 124c-4-12-6-22-8-34" stroke="currentColor" stroke-width="2.5" fill="none"/></svg>`}

/* ---------- inici ---------- */
function home(){endSession();PARENT_OK=false;
 const nm=S.perfil.nom?esc(S.perfil.nom):'',s=S.sessio,m=MODES[s.mode],goal=+s.minuts||30,done=todayMin(),pct=Math.round(Math.min(100,done/goal*100)),st=streak();
 const lt=lastTopic();
 app(`<section class="hero4"><button class="lockbtn" onclick="askPin()" aria-label="Zona famílies (amb PIN)">${IC.lock} Famílies</button>
  <div class="h4-row"><div class="h4-owl">${OWL(96)}</div><div class="h4-t"><span class="h4-pill">${ORD[S.perfil.curs]} de Primària</span><h2>${nm?`Hola, ${nm}!`:'Hola!'}</h2><p>${done>=goal?'Objectiu d\'avui complert. Molt bé!':done>0?`Ja portes ${done} de ${goal} minuts. Endavant!`:'Què t\'agradaria aprendre avui?'}</p></div>
  <div class="h4-stats"><div class="h4-st">${ringSVG(pct)}<span>Objectiu<br>d'avui</span></div><div class="h4-st"><b class="streak4">${IC.flame}${st}</b><span>${st===1?'dia':'dies'}<br>seguits</span></div></div></div></section>

 <h3 class="sec4">Com vols practicar?</h3>
 <div class="modes4">${Object.entries(MODES).map(([k,mm])=>`<button class="mode4${k==='combinada'?' main':''}" style="--mc:${MODE_COL[k]}" data-m="${k}"><span class="m4-ic">${mm.ic}</span><b>${mm.nom}</b><small>${MODE_TXT[k]}</small></button>`).join('')}</div>

 <section class="mis4"><div class="mis4-t"><span class="eyebrow4">Missió d'avui · l'han preparada els teus pares</span><h3>${s.mode==='escriptura'?'Escriptura al quadern':s.skills.slice(0,3).map(k=>SK[k].nom).join(' · ')+(s.skills.length>3?` i ${s.skills.length-3} més`:'')}</h3><small>${m.nom} · ${s.minuts} minuts</small></div>
  <button class="btn4 big4" onclick="start('${s.mode}')">Comença &rarr;</button></section>
 ${lt?`<button class="cont4" id="cP" style="--c:var(--s-${matOf(lt)})"><span class="tile">${SK[lt].ic}</span><span class="c4t"><small>Continua on ho deixares</small><b>${SK[lt].nom}</b></span>${lvTag(lt)}<span class="c4go">Practicar &rarr;</span></button>`:''}

 <h3 class="sec4">Les teves assignatures</h3>
 <div class="subjs4">${Object.keys(SUBJ).map(k=>{const ks=topicsOf(k),ms=mastery(ks);return`<button class="subj4" style="--c:var(--s-${k})" onclick="subject('${k}')">${subjArt(k)}<span class="s4-ic">${SUBJ[k].ic}</span><b>${SUBJ[k].nom}</b><small>${unitsOf(k).length} unitats · ${ks.length} temes${k==='ciencies'?' · làmines':k==='angles'?' · taula de verbs':''}</small><span class="s4-bar"><i style="width:${Math.max(ms,3)}%"></i></span><span class="s4-pct">${ms}% après</span></button>`}).join('')}</div>`);
 if(lt)$('#cP').onclick=()=>start('exercicis',[lt],15);
 document.querySelectorAll('.modes4 [data-m]').forEach(b=>b.onclick=()=>start(b.dataset.m))}

/* ---------- pàgina d'assignatura ---------- */
function subject(m){endSession();const sb=SUBJ[m],U=unitsOf(m),ks=U.flatMap(u=>u[1]),ms=mastery(ks);
 const lam=(LAMINES[m]||[]),mat=m==='angles'?[{f:"verbTable('irr','angles')",ic:IC.book,nom:'Taula de verbs',desc:'Infinitiu, passat, participi i traducció'},{id:'tm',ic:IC.list,nom:'Temari de 5è i 6è',desc:'Què s\'aprèn a cada curs'}]:[];
 app(`<section class="shead4" style="--c:var(--s-${m})">${subjArt(m)}<button class="back4" onclick="home()">&larr; Inici</button>
  <div class="sh4-t"><span class="s4-ic">${sb.ic}</span><h2>${sb.nom}</h2><p>${ORD[S.perfil.curs]} de Primària · ${U.length} unitats · ${ks.length} temes</p>
  <div class="sh4-bar"><span class="s4-bar"><i style="width:${Math.max(ms,3)}%"></i></span><b>${ms}% après</b></div></div></section>

 ${lam.length||mat.length?`<h3 class="sec4">${lam.length?'Làmines per aprendre':'Material d\'estudi'}</h3><div class="mat4">
  ${lam.map(l=>`<button class="matc4" style="--c:var(--s-${m})" onclick="${l.obre}()"><span class="mt4-ic">${IC[l.ic]||IC.book}</span><span><small>Làmina interactiva</small><b>${l.nom}</b><em>${l.desc}</em></span><span class="arr4">&rarr;</span></button>`).join('')}
  ${mat.map(x=>`<button class="matc4" style="--c:var(--s-${m})" ${x.id?`id="${x.id}"`:`onclick="${x.f}"`}><span class="mt4-ic">${x.ic}</span><span><small>Material</small><b>${x.nom}</b><em>${x.desc}</em></span><span class="arr4">&rarr;</span></button>`).join('')}</div>`:''}

 <h3 class="sec4">Unitats</h3>
 ${U.map(([un,uk],i)=>`<section class="unit4" style="--c:var(--s-${m})"><header><span class="un4">${i+1}</span><div class="u4t"><h3>${un}</h3><small>${uk.length} ${uk.length===1?'tema':'temes'}</small></div><span class="u4p">${mastery(uk)}%</span></header>
  ${uk.map(k=>{const v=SK[k];return`<div class="trow4"><span class="tile">${v.ic}</span><span class="tn4"><b>${v.nom}</b>${lvTag(k)}</span><span class="tb4"><button class="btn4o" data-l="${k}">Aprendre</button><button class="btn4 sm" data-p="${k}">Practicar</button></span></div>`}).join('')}
  <footer><button class="btn4o wide" data-u="${i}">${IC.target} Prova de la unitat</button></footer></section>`).join('')}`);
 if($('#tm'))$('#tm').onclick=()=>{temari(false);const b=document.querySelector('.ph .ghost');if(b)b.onclick=()=>subject('angles')};
 document.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>start('professor',[b.dataset.l],15));
 document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>start('exercicis',[b.dataset.p],15));
 document.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>start('comprovacio',U[+b.dataset.u][1],15));
}
