/* Aprenem - motor de l'AVENTURA interactiva (mapa d'illa + estacions de joc)
   Part de l'app d'estudi. Vegeu CLAUDE.md (secció «Aventura: motor i illes») per a l'API completa.

   Cada assignatura pot registrar una o més illes des del seu arxiu de contingut:
     (ILLES.<assig>=ILLES.<assig>||[]).push({id, nom, mapa:{...}, segell:{nom, txt}, estacions:[...]});
   Cada estació és un objecte de joc:
     {id, nom, desc, skills:['id_tema',...], render(el, api)}
   El motor dibuixa el mapa, fa saltar l'òliba, compta les gemmes, afegeix sempre el SEGELL al final
   (exercici escrit, sense pistes, un sol intent, dades noves) i acaba amb la pantalla del tresor.
   Els resultats es guarden amb record()/recErr() (nucli.js), igual que els exercicis normals.
   Aquest arxiu es carrega abans dels blocs de les assignatures: aquí només es defineixen coses;
   les funcions de nucli.js i pantalles.js s'usen quan es juga. */

const ILLES={};

/* ===================== utilitats per a les estacions ===================== */
const AV={
 // Òliba com a HTML o dins un SVG (x, y = cantó de dalt a l'esquerra)
 owl:(s=40)=>OWLM(s),
 owlG:(x,y,s=48)=>`<g transform="translate(${x},${y})">${OWLM(s).replace('<svg','<svg x="0" y="0"')}</g>`,
 // Fracció HTML simplificada (3/6 → 1/2; 4/2 → 2)
 frac(n,d){const g=gcd(n,d)||1;n/=g;d/=g;return d===1?`${n}`:F(n,d)},
 // Decimal amb coma (1.5 → «1,5»)
 dc:x=>(Math.round(x*1000)/1000).toString().replace('.',','),
 // Llegeix una resposta escrita: «12», «2,5», «3/4», «1 1/2». Torna un nombre o NaN.
 num(s){const r=parseVal(String(s||'').replace(/−/g,'-'));return r?r.n/r.d:NaN},
 same:(a,b)=>isFinite(a)&&isFinite(b)&&Math.abs(a-b)<1e-9,
 shuf(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a},
 // Coordenades d'un esdeveniment dins el viewBox d'un SVG
 pt(svg,e){const r=svg.getBoundingClientRect(),vb=svg.viewBox.baseVal;return{x:(e.clientX-r.left)*vb.width/r.width+vb.x,y:(e.clientY-r.top)*vb.height/r.height+vb.y}},
 // Animació per temps (no per fotogrames): fn(e) amb e de 0 a 1. Respecta «reduir moviment».
 anim(ms,fn,then){const red=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(red||ms<=0){fn(1);if(then)then();return}const t0=performance.now();
  const st=now=>{const e=Math.min(1,(now-t0)/ms);fn(e);if(e<1)requestAnimationFrame(st);else if(then)then()};requestAnimationFrame(st)},
 // Arrossegar dins un SVG amb el dit o el ratolí, amb alternativa «toca per triar i toca per posar».
 //   o.items: selector dels grups que es poden moure (sense atribut transform propi!)
 //   o.onDrop(g,p) en deixar-lo anar · o.onTap(g,p) en tocar-lo sense moure'l · o.onTapEmpty(p) en tocar un lloc buit
 //   Després d'onDrop l'estació ha de tornar a dibuixar l'SVG (el grup queda desplaçat fins aleshores).
 drag(svg,o){svg.style.touchAction='none';svg.style.userSelect='none';svg.style.webkitUserSelect='none';let d=null;
  svg.addEventListener('pointerdown',e=>{if(o.disabled&&o.disabled())return;const g=e.target.closest(o.items);d={g,p0:AV.pt(svg,e),moved:false};
   try{svg.setPointerCapture(e.pointerId)}catch(_){}if(g)e.preventDefault()});
  svg.addEventListener('pointermove',e=>{if(!d||!d.g)return;const p=AV.pt(svg,e);if(!d.moved&&Math.hypot(p.x-d.p0.x,p.y-d.p0.y)<8)return;
   d.moved=true;d.g.setAttribute('transform',`translate(${p.x-d.p0.x},${p.y-d.p0.y})`);d.g.style.pointerEvents='none'});
  svg.addEventListener('pointerup',e=>{if(!d)return;const D=d;d=null;const p=AV.pt(svg,e);
   if(D.g){if(D.moved){if(o.onDrop)o.onDrop(D.g,p)}else if(o.onTap)o.onTap(D.g,p)}else if(o.onTapEmpty)o.onTapEmpty(p)});
  svg.addEventListener('pointercancel',()=>{if(d&&d.g){d.g.removeAttribute('transform');d.g.style.pointerEvents=''}d=null})},
 // Fila de resposta escrita (camp lila + botó). Torna l'HTML; el botó té la classe av-ok.
 answer:(label,ph='Escriu-lo aquí',btn='Comprova')=>`<div class="av-ans"><label class="lbl">${label}</label><div class="av-ans-r"><input class="av-in" inputmode="decimal" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${ph}" aria-label="${esc(String(label).replace(/<[^>]+>/g,''))}"><button class="av-ok">${btn}</button></div></div>`,
 // Connecta una fila de resposta: crida fn(text) amb Enter o amb el botó
 onAnswer(root,fn){const i=root.querySelector('.av-in'),b=root.querySelector('.av-ok');const go=()=>{const v=i.value.trim();if(v)fn(v,i)};b.onclick=go;i.onkeydown=e=>{if(e.key==='Enter')go()};i.focus({preventScroll:true});return i}
};

/* ===================== el motor ===================== */
const AVENTURA={
 MIN_MS:3500,   // temps mínim per respondre (si no, «pensa abans de respondre»)
 LOCK_S:6,      // segons de bloqueig
 GENERIC:['La cova de l\'eco','El far vell','La cabana del pirata','El bosc de palmeres'],

 // Tria l'illa i les estacions per als temes de la sessió. Torna null si l'assignatura no té illa.
 plan(ks,mins){ks=(ks||[]).filter(k=>SK[k]);
  const cnt={};ks.forEach(k=>{const m=matOf(k);if(ILLES[m]&&ILLES[m].length)cnt[m]=(cnt[m]||0)+1});
  const m=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0];if(!m)return null;
  const mk=ks.filter(k=>matOf(k)===m),hits=I=>I.estacions.filter(e=>e.skills.some(k=>mk.includes(k))).length;
  const illa=ILLES[m].slice().sort((a,b)=>hits(b)-hits(a)||Math.random()-.5)[0];
  const max=Math.max(2,Math.min(4,Math.round((mins||12)/3)));
  let est=illa.estacions.filter(e=>e.skills.some(k=>mk.includes(k)));
  // temes de la sessió que cap estació no practica → estació d'exercici escrit (amb pistes)
  const unc=mk.filter(k=>!est.some(e=>e.skills.includes(k)));let gi=0;
  while(est.length<max&&unc.length)est.push({id:'gen'+gi,nom:this.GENERIC[gi++%this.GENERIC.length],desc:'Resol el repte escrit per continuar el camí.',skills:[unc.shift()],tipus:'exercici'});
  // si encara en falten, s'hi afegeixen altres estacions de l'illa (practiquen temes propers)
  for(const e of illa.estacions)if(est.length<Math.min(3,max)&&!est.includes(e))est.push(e);
  est=est.slice(0,max);
  const sk=mk.filter(k=>est.some(e=>e.skills.includes(k)));const sealK=pick(sk.length?sk:mk);
  const sg=illa.segell||{};
  est.push({id:'segell',nom:sg.nom||'El segell del guardià',desc:sg.desc||'Un repte escrit, sense pistes i amb un sol intent.',txt:sg.txt||'«Respon-me sense ajuda i el camí s\'obrirà.»',skills:[sealK],segell:true});
  return{illa,m,ks:mk,k0:mk[0],estacions:est}},

 // Juga l'illa. done() continua la sessió.
 run(root,P,done){const self=this;
  const G={pos:0,gems:[],st:P.estacions.map(()=>({anyErr:false,help:false}))};
  const N=()=>P.estacions.length;
  const kOf=E=>E.skills.find(k=>P.ks.includes(k))||E.skills.find(k=>SK[k])||P.k0;
  const gemN=()=>G.gems.filter(Boolean).length;
  const gemsHTML=()=>`<span class="av-gems" aria-label="${gemN()} gemmes">${P.estacions.map((_,i)=>`<i class="${G.gems[i]?'on':''}"></i>`).join('')}<b>${gemN()}</b></span>`;
  const bar=k=>setBar(k||P.k0,P.estacions.map((e,i)=>i<G.pos?(G.gems[i]?'ok':'help'):i===G.pos?'cur':''),G.pos<N()?`Prova ${G.pos+1} de ${N()}`:'Tresor');
  const unpin=()=>{if(typeof pinAns==='function')pinAns(null)};

  /* ---------- mapa ---------- */
  function layout(n){const p=[];for(let i=0;i<n;i++){const t=n>1?i/(n-1):0;p.push({x:Math.round(92+t*516),y:i%2?122:242})}return p}
  function islandSVG(pts){const M=P.illa.mapa||{};if(typeof M==='function')return M(pts);
   const mar=M.mar||'#BFE6F5',sorra=M.sorra||'#F6E3B4',herba=M.herba||'#CDE9B5',deco=typeof M.deco==='function'?M.deco(pts):(M.deco||'');
   return`<rect width="700" height="340" fill="${mar}"/><path d="M40 300C20 220 60 120 160 90 260 60 330 40 430 70 560 100 690 70 670 190 655 290 560 320 400 318 240 330 70 345 40 300Z" fill="${sorra}"/>
    <path d="M70 290C60 230 90 150 170 120 260 92 330 80 420 100 540 125 640 110 630 200 620 270 540 295 400 292 250 300 95 315 70 290Z" fill="${herba}"/>${deco}`}
  function pathD(pts){return pts.map((p,i)=>{if(!i)return`M${p.x} ${p.y}`;const a=pts[i-1],dx=(p.x-a.x)/2;return`C${a.x+dx} ${a.y} ${p.x-dx} ${p.y} ${p.x} ${p.y}`}).join('')}
  function map(hop){unpin();bar();const all=[...P.estacions,{nom:'El tresor',tresor:true}],pts=layout(all.length),o=pts[G.pos],cur=all[G.pos];
   root.innerHTML=`<div class="av card"><div class="av-hd"><div><div class="eyebrow">${esc(SUBJ[P.m].nom)} · Aventura</div><h2>${esc(P.illa.nom)}</h2></div>${gemsHTML()}</div>
   <svg class="av-map" viewBox="0 0 700 340" role="img" aria-label="Mapa de l'illa: prova ${Math.min(G.pos+1,N())} de ${N()}">${islandSVG(pts)}
    <path d="${pathD(pts)}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 18"/>
    ${all.map((s,i)=>{const done=i<G.pos,c=i===G.pos,p=pts[i],up=i%2===1;
     return`<g class="av-st${c?' cur':''}" data-i="${i}"${c?' tabindex="0" role="button" aria-label="Entra: '+esc(s.nom)+'"':''}>
      <circle cx="${p.x}" cy="${p.y}" r="${c?30:24}" fill="${done?(G.gems[i]?'#5FD3C4':'#B9A8F5'):c?'#8B6CF0':'#fff'}" stroke="${i>G.pos?'#D9D6E4':'#fff'}" stroke-width="4"/>
      <text x="${p.x}" y="${p.y+6}" text-anchor="middle" font-size="${s.tresor?20:18}" font-weight="500" fill="${c||done?'#fff':'#B5B3C4'}">${s.tresor?'★':done?'✓':s.segell?'':i+1}</text>${s.segell&&!done?`<path d="M${p.x-8} ${p.y-2}h16v12h-16Z M${p.x-5} ${p.y-2}v-4a5 5 0 0 1 10 0v4" fill="none" stroke="${c?'#fff':'#B5B3C4'}" stroke-width="2.5" stroke-linejoin="round"/>`:''}
      <text class="av-lab" x="${p.x}" y="${p.y+(up?-42:50)}" text-anchor="middle" font-size="14" fill="#1E1B3A">${esc(s.nom)}</text></g>`}).join('')}
    <g id="avTok" transform="translate(${o.x-24},${o.y-82})">${OWLM(48).replace('<svg','<svg x="0" y="0"')}</g>
   </svg>
   <div class="av-foot"><div><div class="eyebrow">${cur.tresor?'Final':cur.segell?'Darrera prova · segell':'Prova '+(G.pos+1)+' de '+N()}</div><b>${esc(cur.nom)}</b><p class="muted">${cur.tresor?'Has arribat al final del camí!':esc(cur.desc||'')}</p></div>
    <button id="avGo">${cur.tresor?'Obre el tresor':'Entra a la prova'}</button></div>
   <p class="av-note">Les gemmes només es guanyen fent la prova bé a la primera i sense ajuda.</p></div>`;
   const enter=()=>cur.tresor?treasure():play(G.pos);
   $('#avGo').onclick=enter;
   root.querySelectorAll('.av-st').forEach(g=>{const i=+g.dataset.i;g.onclick=()=>{if(i===G.pos)enter()};g.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&i===G.pos){e.preventDefault();enter()}}});
   if(hop!=null&&pts[hop]){const a=pts[hop],b=o,t=$('#avTok');t.setAttribute('transform',`translate(${a.x-24},${a.y-82})`);
    AV.anim(750,e=>{const x=a.x+(b.x-a.x)*e,y=a.y+(b.y-a.y)*e-Math.sin(e*Math.PI)*46;t.setAttribute('transform',`translate(${x-24},${y-82})`)})}
  }
  function next(gem){const from=G.pos;G.gems[G.pos]=!!gem;G.pos++;
   // si s'ha acabat el temps de la fase, es salta directament al segell
   if(G.pos<N()-1&&timeUp()){P.estacions.splice(G.pos,N()-1-G.pos);G.st.splice(G.pos,G.st.length-1-G.pos)}
   map(from)}

  /* ---------- una estació ---------- */
  function shell(E,i,extra=''){const k=kOf(E);bar(k);
   root.innerHTML=`<div class="av card av-stn${E.segell?' av-seal':''}"><div class="av-hd"><div><div class="eyebrow">${E.segell?'Darrera prova · segell':'Prova '+(i+1)+' de '+N()} · ${esc(P.illa.nom)}</div><h2>${esc(E.nom)}</h2></div>${gemsHTML()}</div>
    ${extra}<div class="av-area"></div><div class="av-fb" aria-live="polite"></div>
    <div class="av-nav"><button class="sec av-back">Tornar al mapa</button></div></div>`;
   root.querySelector('.av-back').onclick=()=>map();
   return{k,area:root.querySelector('.av-area'),fb:root.querySelector('.av-fb'),nav:root.querySelector('.av-nav')}}

  function play(i){const E=P.estacions[i];if(E.segell)return seal(E,i);if(E.tipus==='exercici')return written(E,i);
   const {k,area,fb,nav}=shell(E,i),ST=G.st[i];
   let R={errs:0,help:false,t0:Date.now(),lock:false,done:false};
   const tip=(html,kind='info')=>{fb.innerHTML=`<div class="av-tip ${kind}">${OWLM(36)}<div>${html}</div></div>`};
   const lockArea=()=>area.querySelectorAll('button,input').forEach(x=>x.disabled=true);
   const api={
    k,ks:E.skills.filter(x=>P.ks.includes(x)),lv:Math.max(0,level(k)),curs:+S.perfil.curs,station:E,
    get errors(){return R.errs},
    // quadre de l'òliba: kind = 'info' | 'ok' | 'warn' | 'err'
    tip,clear(){fb.innerHTML=''},
    // una ajuda: es mostra i la gemma es perd
    hint(html){R.help=true;ST.help=true;if(CUR){CUR.hints=(CUR.hints||0)+1;if(typeof sessSide==='function')sessSide()}tip(html,'info')},
    // torna a posar en marxa el rellotge de «massa de pressa» (p. ex. en començar una segona part)
    restart(){R.t0=Date.now()},
    // massa de pressa? (només abans del primer error). Si ho és, bloqueja uns segons i torna true.
    tooFast(){if(R.lock)return true;if(R.errs>0||Date.now()-R.t0>=(E.minMs||self.MIN_MS))return false;
     R.lock=true;recErr(k,'massa_rapid');let s=self.LOCK_S;
     const upd=()=>tip(`<b>Pensa abans de respondre.</b> Has anat molt de pressa: mira-ho amb calma. (${s})`,'warn');upd();
     const iv=setInterval(()=>{if(!fb.isConnected){clearInterval(iv);return}s--;if(s<=0){clearInterval(iv);R.lock=false;R.t0=Date.now()-self.MIN_MS;tip('Ara sí: pensa-ho bé i torna-ho a provar.','info')}else upd()},1000);return true},
    // resposta incorrecta. info = {msg, err, steps, k}: err = codi d'ERR (es desa a info.k, si és un tema, o a api.k).
    // Torna 'lock' | 'retry' | 'explain'.
    fail(info={}){if(R.done)return'retry';if(api.tooFast())return'lock';
     R.errs++;ST.anyErr=true;const e=info.err&&ERR[info.err]?info.err:null;if(e)recErr(info.k&&SK[info.k]?info.k:k,e);
     if(R.errs>=2){record(k,false,true,false);api.explain(info.steps||E.steps||['Torna a llegir l\'enunciat amb calma.']);return'explain'}
     tip(info.msg||(e&&ERR[e].kid)||'Encara no és correcte. Revisa-ho amb calma.','err');R.t0=Date.now();return'retry'},
    // explicació guiada pas a pas i, en acabar, dades noves
    explain(steps,intro){R.help=true;ST.help=true;lockArea();guided(fb,steps,()=>api.newData(),intro||'Ho fem junts, pas a pas:')},
    // torna a començar l'estació amb dades noves
    newData(){R={errs:0,help:false,t0:Date.now(),lock:false,done:false};fb.innerHTML='';area.innerHTML='';E.render(area,api)},
    // resposta correcta. o = {msg, help}
    ok(o={}){if(R.done)return;R.done=true;const used=!!o.help||R.errs>0||R.help;if(o.help)ST.help=true;record(k,true,used,false);
     const gem=!ST.anyErr&&!ST.help;lockArea();
     tip(`${o.msg||'<b>Molt bé!</b>'}${gem?' <b>Has guanyat una gemma!</b>':''}`,'ok');
     fb.insertAdjacentHTML('beforeend','<div class="av-row"><button class="av-next">Continua el camí →</button></div>');
     const b=fb.querySelector('.av-next');b.onclick=goOn(()=>next(gem));b.focus({preventScroll:true})}
   };
   E.render(area,api)}

  /* ---------- estació d'exercici escrit (temes sense joc propi) ---------- */
  function written(E,i){const {k,area}=shell(E,i,'<p class="muted av-intro">Resol el repte per continuar el camí. Si cal, demana una pista.</p>'),ST=G.st[i];
   exercise(area,k,{mode:'adv',onWrong:()=>{ST.anyErr=true},onDone:r=>{if(r.help)ST.help=true;next(!ST.anyErr&&!ST.help)}})}

  /* ---------- segell: escrit, sense pistes, un sol intent, dades noves ---------- */
  function seal(E,i){const {k,area}=shell(E,i,`<div class="av-guard">${OWLM(76)}<div><p class="av-q">${esc(E.txt)}</p><p class="muted">Sense pistes i amb un sol intent. Si falles, et mostraré com es fa i en tindràs un altre de nou.</p></div></div>`),ST=G.st[i];
   exercise(area,k,{mode:'seal',one:true,onWrong:()=>{ST.anyErr=true},onDone:r=>{next(!ST.anyErr&&!r.help)}})}

  /* ---------- tresor ---------- */
  function treasure(){unpin();setBar(P.k0,P.estacions.map((e,i)=>G.gems[i]?'ok':'help'),'Tresor');const n=gemN(),T=N();
   root.innerHTML=`<div class="av card av-tre"><svg viewBox="0 0 200 150" width="200" height="150" aria-hidden="true"><ellipse cx="100" cy="138" rx="78" ry="9" fill="#C9B8FA"/>
    <path d="M38 70h124v62H38Z" fill="#C9874A"/><path d="M38 70c0-30 124-30 124 0Z" fill="#E2A15F"/><path d="M38 92h124v10H38Z" fill="#8E5A2B"/><rect x="90" y="86" width="20" height="24" rx="4" fill="#F7C948"/>
    ${Array.from({length:T},(_,j)=>`<path d="M${93+(j-(T-1)/2)*19} 58l7-9 7 9-7 9Z" fill="${j<n?"#5FD3C4":"#E9E4FB"}"/>`).join("")}</svg>
    ${OWLM(70)}<h2>Has trobat el tresor de l'illa!</h2>
    <p>Gemmes: <b>${n} de ${T}</b>. ${n===T?'Totes! Ho has fet tot a la primera i sense ajuda.':'Les gemmes només es guanyen fent la prova bé a la primera, sense ajuda.'}</p>
    <p class="muted">Superar l'aventura és un gran pas. Per saber si ja ho domines de veritat, fes una comprovació sense pistes.</p>
    <button id="avEnd">Continuar →</button></div>`;
   $('#avEnd').onclick=done}

  map();
 }
};

// Mode Aventura (el crida runMode, a pantalles.js). Sense illa per a l'assignatura → aventura clàssica.
function mAdv(el,done){const mins=phaseEnd?(phaseEnd-Date.now())/60000:S.sessio.minuts;
 const P=AVENTURA.plan(CUR.skills,mins);if(!P)return mAdvClassic(el,done);AVENTURA.run(el,P,done)}
