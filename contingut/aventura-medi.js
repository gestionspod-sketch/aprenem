/* Aprenem - MEDI: illa de l'aventura interactiva («L'Illa de l'Expedició»)
   Part de l'app d'estudi. Vegeu CLAUDE.md (secció «Aventura: motor i illes») per a l'API del motor.
   Fa servir les làmines de Medi (LAM, lamSVG, lamAns, lamHide: contingut/lamines/medi-base.js), les edats i els
   segles de la línia del temps (EDATS, FETS, ROM, segle: contingut/lamines/linia-del-temps.js) i fold (contingut/ciencies.js).
   Estacions (la resposta no es veu fins que es comprova; els noms s'escriuen):
     1. El laboratori del campament — escriure el nom de les parts numerades d'una làmina del cos o de la cèl·lula
        (md_digestiu, md_circulatori, md_cellula, md_nervios, md_sentits, md_locomotor)
     2. El riu del cos humà        — ordenar les etapes d'un recorregut: aliments, aire, sang, acte reflex, orina
        (md_digestiu, ci_respiratori, md_circulatori, md_nervios, md_excretor)
     3. La xarxa del bosc          — muntar una cadena tròfica d'un ecosistema (sobretot de les Balears) i escriure què
        passa si desapareix una espècie (ci_ecosis, md_ecobal)
     4. El mapa del navegant       — clavar banderes al seu lloc en un mapa sense noms: Balears, relleu o comunitats
        (md_illes, md_relleu, md_comunitats)
     5. El túnel del temps         — posar fets a la seva edat de la història i escriure el segle d'un fet
        (md_temps, md_moderna, md_contemporania, md_segle19, md_segle20, md_histbal)
     Segell (el posa el motor): la porta del temple, exercici escrit sense pistes amb un dels temes de la sessió.
   Ajuda pròpia (no és al motor): MDZ, unes «caselles» HTML on es deixen targetes arrossegant-les amb el dit o el
   ratolí, o tocant-les (serveix per ordenar i per classificar; els estils s'afegeixen des d'aquí mateix). */

Object.assign(ERR,{
 md_av_cami:{kid:'Has canviat l\'ordre del recorregut. Pensa què passa a cada lloc i on ha d\'anar just després.',par:'Confon l\'ordre dels òrgans en un recorregut del cos (aliments, aire, sang, orina o missatge nerviós)'},
 md_av_efecte:{kid:'Pensa en les dues direccions de la cadena: qui es queda sense menjar i qui ja no és menjat per ningú.',par:'No preveu bé què passa en una cadena tròfica quan desapareix una espècie'},
 md_av_mapa:{kid:'Has confós dos llocs del mapa. Fixa\'t on és cada lloc respecte als altres (nord, sud, costa, interior).',par:'Confon la situació dels llocs en un mapa d\'Espanya'}
});

(()=>{
 /* ---------- utilitats pròpies ---------- */
 const lev=(a,b)=>{const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]};
 // Compara una resposta escrita amb una llista de respostes: true (bé), text (bé però amb una falta d'ortografia) o false
 const match=(v,list)=>{const fv=fold(v);if(!fv)return false;const hit=list.find(t=>fold(t)===fv);if(hit)return true;
  const near=fv.length>=7&&list.find(t=>lev(fold(t),fv)<=1);return near?`Compte amb l'ortografia: s'escriu «${esc(near)}».`:false};
 const up=s=>s.replace(/^((?:<[^>]+>)*)(.)/,(m,a,b)=>a+b.toUpperCase());
 const txtAnswer=(label,ph)=>AV.answer(label,ph).replace('inputmode="decimal"','inputmode="text"');
 const TXT='inputmode="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"';

 /* ---------- MDZ: caselles on es deixen targetes (arrossegar o tocar) ---------- */
 let cssOn=false;
 function css(){if(cssOn)return;cssOn=true;const s=document.createElement('style');s.textContent=`
.mdz-tray{display:flex;gap:10px;flex-wrap:wrap;min-height:60px;margin:12px 0;padding:8px;border-radius:18px;background:var(--soft,#F4F2FA)}
.mdz-tray:empty::after{content:attr(data-empty);color:var(--muted,#8A879E);font-size:14px;align-self:center;padding:0 8px}
.mdz-zones{display:flex;flex-direction:column;gap:6px}
.mdz-zone{display:flex;align-items:center;gap:10px;min-height:60px;border:2px dashed #CFC6F5;border-radius:18px;padding:6px 10px;background:#FAF8FF;cursor:pointer;transition:border-color .12s,background .12s}
.mdz-zone.tgt{border-color:var(--pri,#8B6CF0)}.mdz-zone.hov{background:var(--pri-l,#EEE8FD);border-style:solid}
.mdz-lab{flex:none;font-size:14px;color:var(--muted,#8A879E);min-width:28px;line-height:1.25}
.mdz-lab.mdz-bar{border-left:6px solid;padding-left:8px;width:150px;color:var(--ink,#1E1B3A);font-weight:500}
.mdz-in{display:flex;gap:8px;flex-wrap:wrap;flex:1;min-width:0}
.mdz-arrow{text-align:center;color:var(--muted,#8A879E);font-size:13px;line-height:1.1}
button.mdz-chip{touch-action:none;min-height:46px;font-size:16px;text-align:left;line-height:1.25;padding:6px 14px;background:#fff;border:2px solid #E3D9FD;box-shadow:0 2px 6px rgba(30,27,58,.06)}
button.mdz-chip.on{border-color:var(--pri,#8B6CF0);background:var(--pri-l,#EEE8FD)}
button.mdz-chip.mdz-fix{background:var(--mint,#D4F1E4);opacity:1;cursor:default}
.mdz-float{position:fixed;z-index:1000;pointer-events:none;transform:translate(-50%,-50%) rotate(-2deg);box-shadow:0 10px 24px rgba(30,27,58,.22)!important;opacity:.95}
.md-flds .av-ans{margin-top:10px}.md-flds input.av-in[readonly]{background:var(--mint,#D4F1E4);border-color:#5FBF97;color:#155C3D}
.md-lam svg{display:block;margin:0 auto;width:100%;height:auto;max-height:min(64vh,540px)}
.md-q{margin-top:6px}.md-q .av-ans{margin-top:10px}
@media (max-width:520px){.mdz-lab.mdz-bar{width:96px;font-size:13px}button.mdz-chip{font-size:15px}}`;document.head.appendChild(s)}

 // o: {zones:[{id,lab,col,aria}], items:[{id,t}], cap:1|0 (0 = sense límit), auto:bool (tocar = primer lloc buit),
 //     fixed:{zona:item}, arrow:'text entre caselles', empty:'text de la safata buida', onChange}
 function zones(el,o){css();const pos={},ord={},fixed=new Set(Object.values(o.fixed||{}));let n=0,sel=null,off=false,skipClick=false;
  o.items.forEach(i=>pos[i.id]=null);Object.entries(o.fixed||{}).forEach(([z,i])=>pos[i]=z);
  el.innerHTML=`<div class="mdz-tray" data-empty="${esc(o.empty||'Ja has col·locat totes les targetes.')}"></div><div class="mdz-zones">${o.zones.map((z,j)=>`${j&&o.arrow?`<div class="mdz-arrow" aria-hidden="true">${o.arrow}</div>`:''}<div class="mdz-zone" data-z="${z.id}" role="button" tabindex="0" aria-label="${esc(z.aria||z.lab)}">${z.lab!=null?`<span class="mdz-lab${z.col?' mdz-bar':''}"${z.col?` style="border-color:${z.col}"`:''}>${z.lab}</span>`:''}<span class="mdz-in"></span></div>`).join('')}</div>`;
  const tray=el.querySelector('.mdz-tray'),T=Object.fromEntries(o.items.map(i=>[i.id,i.t]));
  const chip=id=>`<button class="av-chip mdz-chip${sel===id?' on':''}${fixed.has(id)?' mdz-fix':''}" data-i="${id}"${fixed.has(id)||off?' disabled':''}>${T[id]}</button>`;
  const inZ=z=>o.items.map(i=>i.id).filter(id=>pos[id]===z).sort((a,b)=>(ord[a]||0)-(ord[b]||0));
  function render(){tray.innerHTML=o.items.filter(i=>pos[i.id]===null).map(i=>chip(i.id)).join('');
   el.querySelectorAll('.mdz-zone').forEach(zd=>{zd.querySelector('.mdz-in').innerHTML=inZ(zd.dataset.z).map(chip).join('');zd.classList.toggle('tgt',sel!==null&&!off)});
   if(o.onChange)o.onChange(A)}
  function place(id,z){if(fixed.has(id))return;if(o.cap){const occ=inZ(z).filter(x=>x!==id);if(occ.length>=o.cap){const v=occ.find(x=>!fixed.has(x));if(!v)return;pos[v]=null}}
   pos[id]=z;ord[id]=++n;sel=null;render()}
  function tap(id){if(off||fixed.has(id))return;
   if(pos[id]!==null){pos[id]=null;sel=o.auto?null:id;render();return}
   if(o.auto){const z=o.zones.find(z=>!inZ(z.id).length);if(z){place(id,z.id);return}}
   sel=sel===id?null:id;render()}
  el.addEventListener('click',e=>{if(skipClick){skipClick=false;return}if(off)return;const c=e.target.closest('.mdz-chip');if(c){tap(c.dataset.i);return}
   const zd=e.target.closest('.mdz-zone');if(zd&&sel!==null){place(sel,zd.dataset.z);return}
   if(e.target.closest('.mdz-tray')&&sel!==null&&pos[sel]!==null){pos[sel]=null;sel=null;render()}});
  el.addEventListener('keydown',e=>{const zd=e.target.closest('.mdz-zone');if(zd&&e.target===zd&&(e.key==='Enter'||e.key===' ')&&sel!==null){e.preventDefault();place(sel,zd.dataset.z)}});
  // arrossegar amb el dit o el ratolí
  el.addEventListener('pointerdown',e=>{const c=e.target.closest('.mdz-chip');if(!c||c.disabled||off||e.button>0)return;
   const id=c.dataset.i,x0=e.clientX,y0=e.clientY;let fl=null,hov=null;
   const under=ev=>{const t=document.elementFromPoint(ev.clientX,ev.clientY);return t&&el.contains(t)?t.closest('.mdz-zone,.mdz-tray'):null};
   const mv=ev=>{if(!fl){if(Math.hypot(ev.clientX-x0,ev.clientY-y0)<8)return;fl=c.cloneNode(true);fl.classList.add('mdz-float');fl.style.width=c.offsetWidth+'px';document.body.appendChild(fl);c.style.opacity='.35'}
    ev.preventDefault();fl.style.left=ev.clientX+'px';fl.style.top=ev.clientY+'px';const h=under(ev);if(h!==hov){if(hov)hov.classList.remove('hov');hov=h;if(hov&&hov.classList.contains('mdz-zone'))hov.classList.add('hov')}};
   const end=(ev,cancel)=>{document.removeEventListener('pointermove',mv);document.removeEventListener('pointerup',fin);document.removeEventListener('pointercancel',can);
    if(hov)hov.classList.remove('hov');if(!fl)return;fl.remove();c.style.opacity='';skipClick=true;setTimeout(()=>skipClick=false,350);
    if(cancel){render();return}const t=under(ev);if(t&&t.classList.contains('mdz-zone'))place(id,t.dataset.z);else if(t&&!fixed.has(id)){pos[id]=null;sel=null;render()}else render()};
   const fin=ev=>end(ev,false),can=ev=>end(ev,true);
   document.addEventListener('pointermove',mv,{passive:false});document.addEventListener('pointerup',fin);document.addEventListener('pointercancel',can)});
  const A={at:z=>inZ(z),zoneOf:id=>pos[id],full:()=>o.items.every(i=>pos[i.id]!==null),
   back(ids){ids.forEach(id=>{if(!fixed.has(id))pos[id]=null});sel=null;render()},
   lock(){off=true;sel=null;render()}};
  render();return A}

 /* =================== 1. El laboratori del campament (làmines) =================== */
 const LABS={md_digestiu:'digestiu',md_circulatori:'cor',md_cellula:'cellula',md_nervios:'nervios',md_sentits:'sentits',md_locomotor:'locomotor'};
 const lab={id:'lab',nom:'El laboratori',desc:'La pluja ha esborrat els noms d\'una làmina: escriu el nom de cada part numerada.',
  skills:Object.keys(LABS),
  render(el,api){
   const sk=LABS[api.k]&&LAM[LABS[api.k]]?api.k:Object.keys(LABS).find(k=>LAM[LABS[k]]),id=LABS[sk],L=LAM[id];
   const pool=Object.keys(L.parts).filter(p=>api.lv>0||!L.parts[p].lv),n=Math.min(pool.length,api.lv>1?4:3);
   const ask=AV.shuf(pool).slice(0,n).sort((a,b)=>L.parts[a].n-L.parts[b].n),okd={};let hi=null,fin=false;
   el.innerHTML=`<p>Al laboratori de l'expedició, la pluja ha esborrat els noms de la làmina <b>«${esc(L.nom)}»</b>. Escriu com es diuen les parts marcades amb els números <b>${ask.map(p=>L.parts[p].n).join(', ')}</b>. Si toques un número del dibuix, es destaca.</p>
    <div class="md-lam"></div>
    <div class="md-flds">${ask.map(p=>`<div class="av-ans"><label class="lbl">Número ${L.parts[p].n}</label><div class="av-ans-r"><input class="av-in" data-p="${p}" ${TXT} placeholder="${esc(L.camp||'Nom')}" aria-label="Nom de la part número ${L.parts[p].n}"></div></div>`).join('')}</div>
    <div class="av-row"><button class="av-chk">Comprova els noms</button></div>`;
   const box=el.querySelector('.md-lam'),ins=[...el.querySelectorAll('.md-flds input')],chk=el.querySelector('.av-chk');
   const [vx,vy,vw,vh]=L.vb.split(/\s+/).map(Number);
   const draw=()=>{const W=el.clientWidth||700;let crop=null,shown=Math.min(vw,L.mw||600);
    // a pantalles estretes: si la làmina és molt ampla, s'amplia la zona de les parts que es pregunten
    if(W<560&&vw>640){const ps=ask.flatMap(p=>[L.parts[p].p,L.parts[p].l]);let x0=Math.min(...ps.map(q=>q[0]))-60,x1=Math.max(...ps.map(q=>q[0]))+60,y0=Math.min(...ps.map(q=>q[1]))-50,y1=Math.max(...ps.map(q=>q[1]))+50;
     const w=Math.min(vw,Math.max(x1-x0,480)),h=Math.min(vh,Math.max(y1-y0,w*.6)),cx=(x0+x1)/2,cy=(y0+y1)/2;
     x0=Math.max(vx,Math.min(vx+vw-w,cx-w/2));y0=Math.max(vy,Math.min(vy+vh-h,cy-h/2));crop=`${x0} ${y0} ${w} ${h}`;shown=w}
    // i els números es fan més grossos perquè es puguin llegir (uns 13 px a la pantalla)
    const fs0=L.fs,px=Math.min(W,L.mw||600);if(W<560)L.fs=Math.max(fs0||1,Math.min(2.4,1.08*shown/px));
    try{box.innerHTML=lamSVG(id,{mode:'numbers',hi})}finally{L.fs=fs0}
    const svg=box.querySelector('svg');svg.style.maxWidth=(L.mw||600)+'px';if(crop)svg.setAttribute('viewBox',crop);
    svg.querySelectorAll('[data-part]').forEach(g=>g.addEventListener('click',()=>{const i=ins.find(x=>x.dataset.p===g.dataset.part);if(i&&!fin){i.focus({preventScroll:true})}}))};
   ins.forEach((i,j)=>{i.addEventListener('focus',()=>{if(hi!==i.dataset.p){hi=i.dataset.p;draw()}});
    i.addEventListener('keydown',e=>{if(e.key!=='Enter')return;e.preventDefault();const nx=ins.slice(j+1).concat(ins.slice(0,j)).find(x=>!x.readOnly&&!x.value.trim());if(nx)nx.focus();else chk.click()})});
   const steps=()=>[...ask.map(p=>`El número ${L.parts[p].n} és <b>${L.parts[p].nom}</b>: ${L.parts[p].f}`),'Ara tindràs una làmina amb altres números.'];
   chk.onclick=()=>{if(fin)return;if(ins.some(i=>!i.value.trim())){api.tip('Escriu un nom a cada número abans de comprovar.','warn');return}
    const notes=[],bad=[];ins.forEach(i=>{const p=i.dataset.p;if(okd[p])return;const m=match(i.value,lamAns(L.parts[p]));if(m){okd[p]=1;if(m!==true)notes.push(m)}else bad.push(p)});
    if(!bad.length){fin=true;ins.forEach(i=>i.readOnly=true);hi=null;draw();
     api.ok({msg:`<b>Làmina recuperada!</b> ${ask.map(p=>`${L.parts[p].n}: ${L.parts[p].nom}`).join(' · ')}.${notes.length?' '+notes.join(' '):''}`});return}
    let err=null;const msg=bad.map(p=>{const r=L.parts[p],v=ins.find(i=>i.dataset.p===p).value.trim(),o=Object.values(L.parts).find(x=>x!==r&&lamAns(x).some(t=>fold(t)===fold(v)));
     if(o){err=sk;return`el número ${r.n} no és ${o.nom}: ${o.nom} és el número ${o.n}`}
     return`el número ${r.n} no és «${esc(v)}». Fixa't en què fa: ${lamHide(r.f,r)}`}).join('; ');
    const res=api.fail({err:err&&ERR[err]?err:null,steps:steps(),msg:`<b>Encara no.</b> ${up(msg)}.${notes.length?' '+notes.join(' '):''}`});
    if(res==='retry'){ins.forEach(i=>{if(okd[i.dataset.p])i.readOnly=true;else i.value=''});const f=ins.find(i=>!i.readOnly);if(f)f.focus({preventScroll:true})}};
   draw()}};

 /* =================== 2. El riu del cos humà (recorreguts) =================== */
 const SEQ={
  md_digestiu:{t:'el camí dels aliments',intro:'L\'explorador ha mossegat un tros de pa.',it:[['Boca','les dents trossegen el menjar i la saliva l\'humiteja'],['Faringe','el bol alimentari passa pel tub que comparteixen el menjar i l\'aire'],['Esòfag','un tub musculós empeny el bol cap avall'],['Estómac','els sucs gàstrics el converteixen en quim'],['Intestí prim','acaba la digestió i els nutrients passen a la sang'],['Intestí gros','s\'absorbeix l\'aigua i es forma la femta'],['Recte','s\'acumula la femta'],['Anus','la femta surt a l\'exterior']]},
  ci_respiratori:{t:'el camí de l\'aire quan inspiram',intro:'L\'exploradora respira fondo a dalt de la muntanya.',it:[['Fosses nasals','l\'aire entra, s\'escalfa i es filtra'],['Faringe','l\'aire passa pel tub que comparteix amb el menjar'],['Laringe','hi ha les cordes vocals'],['Tràquea','un tub amb anells de cartílag baixa pel coll'],['Bronquis','la tràquea es divideix en dos tubs, un per a cada pulmó'],['Bronquíols','els bronquis es ramifiquen en tubs cada vegada més prims'],['Alvèols','unes bossetes on l\'oxigen passa a la sang']]},
  md_circulatori:{t:'el viatge de la sang',intro:'Seguim una gota de sang dins el cos de l\'explorador.',cyc:true,it:[['Ventricle esquerre','bombeja la sang rica en oxigen'],['Artèria aorta','reparteix la sang rica en oxigen per tot el cos'],['Capil·lars del cos','la sang deixa oxigen i nutrients a les cèl·lules'],['Venes caves','la sang pobra en oxigen torna cap al cor'],['Aurícula dreta','rep la sang de les venes caves'],['Ventricle dret','bombeja la sang cap als pulmons'],['Artèria pulmonar','porta la sang pobra en oxigen als pulmons'],['Pulmons','la sang deixa el diòxid de carboni i agafa oxigen'],['Venes pulmonars','porten la sang rica en oxigen cap al cor'],['Aurícula esquerra','rep la sang de les venes pulmonars']]},
  md_nervios:{t:'el camí d\'un acte reflex',intro:'L\'explorador toca sense voler l\'olla calenta del foc.',it:[['Receptors de la pell','noten la calor i fan néixer un missatge'],['Nervi sensitiu','porta el missatge cap al sistema nerviós central'],['Medul·la espinal','dona l\'ordre molt de pressa, sense esperar el cervell'],['Nervi motor','porta l\'ordre cap al múscul'],['Múscul del braç','es contreu i aparta la mà']]},
  md_excretor:{t:'el camí de l\'orina',intro:'L\'exploradora ha begut molta aigua de la cantimplora.',it:[['Ronyons','filtren la sang i fabriquen l\'orina'],['Urèters','porten l\'orina dels ronyons a la bufeta'],['Bufeta urinària','guarda l\'orina'],['Uretra','treu l\'orina a l\'exterior']]}};
 const cami={id:'cami',nom:'El riu del cos',desc:'Ordena les etapes d\'un viatge per dins el cos.',
  skills:['md_digestiu','ci_respiratori','md_circulatori','md_nervios','md_excretor'],
  render(el,api){const key=SEQ[api.k]?api.k:pick(api.ks.filter(k=>SEQ[k]).concat(['md_digestiu'])),Q=SEQ[key],N=Q.it.length,len=Math.min(N,api.lv>0?6:5);
   const st=Q.cyc?rnd(0,N-1):rnd(0,N-len),seq=Array.from({length:len},(_,j)=>Q.it[(st+j)%N]);
   el.innerHTML=`<p>${Q.intro} Ordena <b>${Q.t}</b>. La primera etapa ja hi és: arrossega cada targeta al seu lloc, o toca-la i anirà al primer lloc buit (si la tornes a tocar, torna a dalt).</p>
    <div class="md-z"></div><div class="av-row"><button class="av-chk" disabled>Comprova el recorregut</button></div>`;
   const chk=el.querySelector('.av-chk'),items=seq.map((s,j)=>({id:'s'+j,t:s[0]}));
   const Z=zones(el.querySelector('.md-z'),{zones:seq.map((s,j)=>({id:'z'+j,lab:String(j+1),aria:'Lloc '+(j+1)})),items:[items[0],...AV.shuf(items.slice(1))],fixed:{z0:'s0'},cap:1,auto:true,arrow:'↓',onChange:z=>{chk.disabled=!z.full()}});
   const steps=[`Recordem ${Q.t}, pas a pas:`,...seq.map((s,j)=>`${j+1}. <b>${s[0]}</b>: ${s[1]}.`)];
   chk.onclick=()=>{const got=seq.map((s,j)=>Z.at('z'+j)[0]),bad=seq.map((s,j)=>j).filter(j=>got[j]!=='s'+j);
    if(!bad.length){Z.lock();chk.disabled=true;api.ok({msg:`<b>Viatge complet!</b> ${seq.map(s=>s[0]).join(' → ')}.`});return}
    const i=bad[0],prev=seq[i-1],put=seq[+got[i].slice(1)][0];
    const r=api.fail({err:'md_av_cami',steps,msg:`<b>El riu es desvia!</b> Després de l'etapa <b>${prev[0]}</b> (on ${prev[1]}) no ve <b>${put}</b>. ${bad.length>1?`Hi ha ${bad.length} llocs per revisar. `:''}Pensa on ha d'anar just després.`});
    if(r==='retry')Z.back(bad.map(j=>got[j]))};
  }};

 /* =================== 3. La xarxa del bosc (cadenes tròfiques) =================== */
 const CAD=[{eco:'la praderia de posidònia',ch:['posidònia','salpa','déntol','dofí']},{eco:'la garriga',ch:['romaní','saltamartí','sargantana','falcó']},
  {eco:'s\'Albufera',ch:['canyís','eruga','granota','agró']},{eco:'l\'alzinar de la Serra de Tramuntana',ch:['alzina','ratolí','serp','àguila']},
  {eco:'la mar oberta',ch:['fitoplàncton','sardina','tonyina','tauró']},{eco:'un prat',ch:['herba','saltamartí','granota','serp']},{eco:'un pinar',ch:['pi','processionària','mallerenga','esparver']}];
 // gènere de cada ésser viu (per posar l'article: «la salpa», «l'eruga», «del déntol»)
 const FEM=new Set(['posidònia','salpa','sargantana','eruga','granota','alzina','serp','àguila','sardina','tonyina','herba','processionària','mallerenga']);
 const vow=s=>/^[aeiouàèéíòóúh]/i.test(s),A=s=>vow(s)?`l'${s}`:`${FEM.has(s)?'la':'el'} ${s}`,DE=s=>vow(s)?`de l'${s}`:FEM.has(s)?`de la ${s}`:`del ${s}`;
 const ROL=['Productor','Consumidor primari','Consumidor secundari','Consumidor terciari'];
 const AUG=/(augment|creix|puja|incrementa|multiplica|\bmes\b|n'hi ha mes)/,DIS=/(disminu|baixa|minva|decreix|menys|redu|mor|desapar|extingeix|fam)/;
 const efecte=v=>{const f=fold(v);if(/\bno\b/.test(f))return null;const d=DIS.test(f),a=AUG.test(f);return d&&!a?'d':a&&!d?'a':null};
 const xarxa={id:'xarxa',nom:'La xarxa del bosc',desc:'Munta la cadena tròfica d\'un ecosistema i descobreix què passa si en falta una peça.',
  skills:['ci_ecosis','md_ecobal'],
  render(el,api){const C=pick(CAD),ch=C.ch,j=rnd(1,ch.length-2),eD=(/^u/.test(C.eco)?"d'":'de ')+C.eco;let phase=0;
   el.innerHTML=`<p>Els exploradors estudien <b>${C.eco}</b>. Munta la seva cadena tròfica: posa cada ésser viu al seu lloc. La fletxa vol dir <b>«és menjat per»</b>.</p>
    <div class="md-z"></div><div class="av-row"><button class="av-chk" disabled>Comprova la cadena</button></div><div class="md-q"></div>`;
   const chk=el.querySelector('.av-chk'),q=el.querySelector('.md-q'),items=ch.map((s,i)=>({id:'c'+i,t:s}));
   const Z=zones(el.querySelector('.md-z'),{zones:ch.map((s,i)=>({id:'r'+i,lab:ROL[i],col:['#7BC86C','#F5B946','#F2853A','#8B6CF0'][i]})),items:AV.shuf(items),cap:1,auto:true,arrow:'↓ és menjat per',onChange:z=>{chk.disabled=phase>0||!z.full()}});
   const steps=[`La cadena ${eD} és: <b>${ch.join(' → ')}</b>. La fletxa vol dir «és menjat per».`,
    `Si desapareix <b>${A(ch[j])}</b>, ningú no menja <b>${A(ch[j-1])}</b>: la seva població <b>augmenta</b>.`,
    `I <b>${A(ch[j+1])}</b> es queda sense el seu aliment: la seva població <b>disminueix</b> (o ha de cercar un altre menjar).`,
    'Per això en un ecosistema totes les espècies depenen unes de les altres, i cal protegir-les totes.'];
   const stepsOrd=[`El primer de la cadena és el <b>productor</b>: fabrica el seu aliment amb la fotosíntesi. Aquí és <b>${A(ch[0])}</b>.`,
    ...ch.slice(1).map((s,i)=>`El <b>${ROL[i+1].toLowerCase()}</b> menja ${A(ch[i])}: és <b>${A(s)}</b>.`),`La cadena és: <b>${ch.join(' → ')}</b>.`];
   chk.onclick=()=>{const got=ch.map((s,i)=>Z.at('r'+i)[0]),bad=ch.map((s,i)=>i).filter(i=>got[i]!=='c'+i);
    if(!bad.length){phase=1;Z.lock();chk.disabled=true;api.clear();api.restart();
     q.innerHTML=`<div class="av-tip ok">${AV.owl(36)}<div>Cadena correcta: <b>${ch.join(' → ')}</b>. Ara imagina que una malaltia fa desaparèixer ${A(ch[j])} ${eD}.</div></div>
      <div class="av-ans"><label class="lbl">Què passarà amb la població ${DE(ch[j-1])}?</label><div class="av-ans-r"><input class="av-in md-e0" ${TXT} placeholder="Augmenta o disminueix?"></div></div>
      <div class="av-ans"><label class="lbl">I amb la població ${DE(ch[j+1])}?</label><div class="av-ans-r"><input class="av-in md-e1" ${TXT} placeholder="Augmenta o disminueix?"></div></div>
      <div class="av-row"><button class="md-ok2">Comprova</button></div>`;
     const i0=q.querySelector('.md-e0'),i1=q.querySelector('.md-e1'),b=q.querySelector('.md-ok2');i0.focus({preventScroll:true});
     i0.onkeydown=e=>{if(e.key==='Enter')i1.focus()};i1.onkeydown=e=>{if(e.key==='Enter')b.click()};
     b.onclick=()=>{const a=efecte(i0.value),c=efecte(i1.value);
      if(!i0.value.trim()||!i1.value.trim()){api.tip('Respon les dues preguntes.','warn');return}
      if(!a||!c){api.tip('Escriu si la població <b>augmenta</b> o <b>disminueix</b>.','warn');return}
      if(a==='a'&&c==='d'){phase=2;api.ok({msg:`<b>Ho has entès!</b> Sense ${A(ch[j])}, la població ${DE(ch[j-1])} augmenta (ja no la menja ningú) i la ${DE(ch[j+1])} disminueix (es queda sense aliment).`});return}
      const m=[];if(a!=='a')m.push(`Pensa: ${A(ch[j])} menjava ${A(ch[j-1])}. Si ${A(ch[j])} desapareix, qui menja ara ${A(ch[j-1])}?`);
      if(c!=='d')m.push(`Pensa: ${A(ch[j+1])} menjava ${A(ch[j])}. Si ja no en queda, de què s'alimentarà?`);
      const r=api.fail({err:'md_av_efecte',k:api.ks.includes('ci_ecosis')?'ci_ecosis':api.k,steps,msg:up(m.join(' '))});
      if(r==='retry'){if(a!=='a')i0.value='';if(c!=='d')i1.value=''}};
     return}
    const i=bad[0],put=ch[+got[i].slice(1)];
    const msg=i===0?`Al lloc del productor hi has posat <b>${A(put)}</b>, però el productor fabrica el seu propi aliment amb la fotosíntesi: ha de ser una planta o una alga.`
     :`En aquesta cadena, qui menja <b>${A(ch[i-1])}</b> no és <b>${A(put)}</b>.`;
    const r=api.fail({err:'ci_cadena',steps:stepsOrd,msg:`<b>La cadena es trenca!</b> ${msg}${bad.length>1?` Hi ha ${bad.length} llocs per revisar.`:''}`});
    if(r==='retry')Z.back(bad.map(i=>got[i]))};
  }};

 /* =================== 4. El mapa del navegant (banderes) =================== */
 const MAPS={md_illes:{lam:'illes',err:'md_illes',t:'de les Illes Balears'},md_relleu:{lam:'espfis',err:'md_relleu',t:'del relleu i les aigües d\'Espanya'},md_comunitats:{lam:'esppol',err:'md_av_mapa',t:'de les comunitats autònomes d\'Espanya'}};
 const FCOL=['#E8564A','#5B8DEF','#2BA36B','#F2853A'];
 const navegant={id:'navegant',nom:'El mapa del navegant',desc:'Clava cada bandera al seu lloc en un mapa sense noms.',
  skills:['md_illes','md_relleu','md_comunitats'],
  render(el,api){const key=MAPS[api.k]&&LAM[MAPS[api.k].lam]?api.k:Object.keys(MAPS).find(k=>LAM[MAPS[k].lam]),M=MAPS[key],L=LAM[M.lam];
   const [vx,vy,vw,vh]=L.vb.split(/\s+/).map(Number),s=vw/Math.max(280,Math.min(el.clientWidth||700,L.mw||700)),R=11*s,FS=14*s;
   const pool=AV.shuf(Object.keys(L.parts).filter(p=>api.lv>0||!L.parts[p].lv)),n=Math.min(api.lv>0?4:3,pool.length),ask=pool.slice(0,n);
   const P=p=>L.parts[p].p,far=(a,b)=>Math.hypot(P(a)[0]-P(b)[0],P(a)[1]-P(b)[1])>R*3.4;
   const tg=ask.slice();for(const p of pool.slice(n)){if(tg.length>=n+4)break;if(tg.every(t=>far(t,p)))tg.push(p)}
   const at=ask.map(()=>null);let act=0,fin=false;
   el.innerHTML=`<p>El navegant ha perdut els noms del mapa <b>${M.t}</b>. Clava cada bandera al seu lloc: toca una bandera i després el cercle del mapa (o arrossega-la). Hi ha més cercles que banderes.</p>
    <div class="av-tray">${ask.map((p,i)=>`<button class="av-chip" data-f="${i}"><span style="color:${FCOL[i]}">⚑</span> ${esc(L.parts[p].nom)}</button>`).join('')}</div>
    <svg class="av-stage" viewBox="${L.vb}" style="max-width:${L.mw||700}px;margin:0 auto" role="img" aria-label="Mapa ${esc(M.t)} sense noms"></svg>
    <div class="av-row"><button class="av-chk" disabled>Comprova les banderes</button></div>`;
   const svg=el.querySelector('svg'),chk=el.querySelector('.av-chk'),chips=[...el.querySelectorAll('.av-chip')];
   const base=L.draw(()=>'','numbers');
   const draw=()=>{const flags=ask.map((p,i)=>{const t=at[i];if(!t)return"";const[x,y]=P(t),nm=L.parts[p].nom,lft=x+R*2.5+nm.length*FS*.56>vx+vw;
     return`<g class="mflag" data-i="${i}" style="cursor:grab"><circle cx="${x}" cy="${y-R*1.4}" r="${R*2.2}" fill="transparent"/><line x1="${x}" y1="${y}" x2="${x}" y2="${y-R*3.2}" stroke="#4E4B66" stroke-width="${R*.28}"/><path d="M${x} ${y-R*3.2}h${R*2.2}l-${R*.6} ${R*.75} ${R*.6} ${R*.75}h-${R*2.2}Z" fill="${FCOL[i]}"/><circle cx="${x}" cy="${y}" r="${R*.45}" fill="${FCOL[i]}" stroke="#fff" stroke-width="${R*.2}"/>
      <text x="${lft?x-R*.7:x+R*2.5}" y="${y-R*1.9}"${lft?' text-anchor="end"':""} font-size="${FS}" font-weight="500" fill="#1E1B3A" style="paint-order:stroke;stroke:#fff;stroke-width:${FS*.3}px;stroke-linejoin:round">${esc(nm)}</text></g>`}).join('');
    svg.innerHTML=`${base}${tg.map(t=>`<circle cx="${P(t)[0]}" cy="${P(t)[1]}" r="${R}" fill="#fff" fill-opacity=".9" stroke="#6E4FE0" stroke-width="${R*.26}"/>`).join('')}${flags}`;
    chips.forEach((b,i)=>{b.classList.toggle('on',i===act&&!fin);b.disabled=fin});chk.disabled=fin||at.some(t=>!t)};
   const near=p=>{let best=null,d=R*3.2;tg.forEach(t=>{const e=Math.hypot(P(t)[0]-p.x,P(t)[1]-p.y);if(e<d){d=e;best=t}});return best};
   const put=(i,p,drop)=>{const t=near(p);if(!t){if(drop)at[i]=null;draw();return}const o=at.indexOf(t);if(o>=0&&o!==i)at[o]=null;at[i]=t;const nx=at.findIndex(v=>!v);act=nx>=0?nx:i;draw()};
   chips.forEach((b,i)=>b.onclick=()=>{act=i;draw()});
   AV.drag(svg,{items:'.mflag',disabled:()=>fin,onDrop(g,p){put(+g.dataset.i,p,true)},onTap(g){act=+g.dataset.i;draw()},onTapEmpty(p){put(act,p)}});
   const steps=[...ask.map(p=>`<b>${L.parts[p].nom}</b>: ${L.parts[p].f}`),`Repassa-ho a la làmina «${L.nom}» (pàgina de Medi). Ara tindràs un mapa amb altres llocs.`];
   chk.onclick=()=>{const bad=ask.map((p,i)=>i).filter(i=>at[i]!==ask[i]);
    if(!bad.length){fin=true;draw();api.ok({msg:`<b>Mapa complet!</b> Totes les banderes són al seu lloc: ${ask.map(p=>L.parts[p].nom).join(', ')}.`});return}
    const err=bad.some(i=>ask.includes(at[i]))||M.err==='md_illes'?M.err:'md_av_mapa';
    const msg=bad.map(i=>`la bandera <b>${esc(L.parts[ask[i]].nom)}</b> l'has clavada on hi ha ${esc(L.parts[at[i]].nom)}`).join('; ');
    const r=api.fail({err:ERR[err]?err:null,steps,msg:`<b>El vaixell no troba el port!</b> ${up(msg)}. ${ERR.md_av_mapa.kid}`});
    if(r==='retry'){bad.forEach(i=>at[i]=null);act=at.findIndex(v=>!v);if(act<0)act=0;draw()}};
   draw()}};

 /* =================== 5. El túnel del temps (edats i segles) =================== */
 // [any (negatiu = aC), fet, aproximat]
 const EVT=[[-15000,'les pintures de la cova d\'Altamira',1],[-2500,'la construcció de les grans piràmides d\'Egipte',1],[-123,'la conquesta romana de les Illes Balears'],
  [711,'l\'arribada dels musulmans a la península Ibèrica'],[902,'la conquesta musulmana de les Illes Balears'],[1522,'la primera volta al món, acabada per Juan Sebastián Elcano'],
  [1605,'la publicació del Quixot'],[1808,'el començament de la Guerra del Francès'],[1969,'l\'arribada de l\'ésser humà a la Lluna'],
  ...(typeof FETS!=='undefined'?FETS.filter(f=>![476,1492,1789].includes(f[0])).map(f=>[f[0],f[1]]):[])];
 const eraOf=y=>y<-3000?0:y<476?1:y<1492?2:y<1789?3:4;
 const RANG=['des dels primers éssers humans fins a la invenció de l\'escriptura (cap al 3000 aC)','del 3000 aC al 476','del 476 al 1492','del 1492 al 1789','del 1789 fins avui'];
 const aLa=i=>i===0?'a la Prehistòria':'a l\''+EDATS[i][1];
 const yr=e=>`${e[2]?'cap al ':''}${e[0]<0?(-e[0]>=10000?(-e[0]).toLocaleString('ca'):-e[0])+' aC':e[0]}`;
 const tunel={id:'tunel',nom:'El túnel del temps',desc:'Porta cada fet a la seva edat de la història i digues-ne el segle.',
  skills:['md_temps','md_moderna','md_contemporania','md_segle19','md_segle20','md_histbal'],
  render(el,api){const n=api.lv>0?4:3,ev=[],eras=new Set();
   for(const e of AV.shuf(EVT))if(ev.length<n&&!eras.has(eraOf(e[0]))){ev.push(e);eras.add(eraOf(e[0]))}
   let phase=0;
   el.innerHTML=`<p>Al túnel del temps s'han barrejat uns quants fets. Porta cada fet a la seva <b>edat de la història</b>: arrossega'l, o toca'l i després toca l'edat.</p>
    <div class="md-z"></div><div class="av-row"><button class="av-chk" disabled>Comprova el túnel</button></div><div class="md-q"></div>`;
   const chk=el.querySelector('.av-chk'),q=el.querySelector('.md-q'),items=ev.map((e,i)=>({id:'e'+i,t:`${up(e[1])} <span class="muted">(${yr(e)})</span>`}));
   const Z=zones(el.querySelector('.md-z'),{zones:EDATS.map((E,i)=>({id:'a'+i,lab:E[1],col:E[2]})),items,cap:0,auto:false,arrow:'',onChange:z=>{chk.disabled=phase>0||!z.full()}});
   const stepsE=['Les edats se separen per quatre fets: la invenció de l\'escriptura (cap al 3000 aC), la caiguda de l\'Imperi romà (476), l\'arribada de Colom a Amèrica (1492) i la Revolució Francesa (1789).',
    ...ev.map(e=>`${up(e[1])} (${yr(e)}) pertany ${aLa(eraOf(e[0]))}, que va ${RANG[eraOf(e[0])]}.`)];
   chk.onclick=()=>{const bad=ev.map((e,i)=>i).filter(i=>Z.zoneOf('e'+i)!=='a'+eraOf(ev[i][0]));
    if(!bad.length){phase=1;Z.lock();chk.disabled=true;api.clear();api.restart();
     const c=ev.filter(e=>e[0]>100&&e[0]%100);const e=pick(c.length?c:[[1229,'la conquesta de Mallorca per Jaume I']]),sg=segle(e[0]),rs=ROM(sg);
     q.innerHTML=`<div class="av-tip ok">${AV.owl(36)}<div>Tots els fets són a la seva edat! Per obrir la sortida del túnel, digues en quin <b>segle</b> va passar ${e[1]} (any <b>${e[0]}</b>). Escriu-lo en nombres romans.</div></div>${txtAnswer('Segle','Per exemple: XIV')}`;
     const st2=[`El segle I va de l'any 1 al 100, el segle II del 101 al 200... Per trobar el segle, treu les dues darreres xifres i suma'n 1.`,`A l'any ${e[0]} li treiem les dues darreres xifres: ${Math.floor(e[0]/100)}. Hi sumam 1: <b>${sg}</b>.`,`El segle ${sg} en nombres romans és <b>${rs}</b> (I = 1, V = 5, X = 10, L = 50, C = 100).`];
     AV.onAnswer(q,v=>{const x=fold(v).replace(/^segle\s+/,'');
      if(x===rs.toLowerCase()||x===String(sg)){phase=2;api.ok({msg:`<b>La sortida s'obre!</b> L'any ${e[0]} és del segle ${rs}${x===String(sg)?` (en nombres romans s'escriu ${rs})`:''}.`});return}
      const ant=x===ROM(sg-1).toLowerCase()||x===String(sg-1);
      const r=api.fail({err:ant?'md_segle':null,k:api.ks.includes('md_temps')?'md_temps':api.k,steps:st2,msg:ant?ERR.md_segle.kid:`Compte: el segle I va de l'any 1 al 100, i el segle II, del 101 al 200. En quin segle cau l'any ${e[0]}?`});
      if(r==='retry'){const i=q.querySelector('.av-in');i.value='';i.focus({preventScroll:true})}});
     return}
    const msg=bad.map(i=>{const z=+Z.zoneOf('e'+i).slice(1);return`<b>${ev[i][1]}</b> (${yr(ev[i])}) l'has portat ${aLa(z)}, que va ${RANG[z]}`}).join('; ');
    const r=api.fail({err:'md_edats',steps:stepsE,msg:`<b>El túnel tremola!</b> ${up(msg)}.`});
    if(r==='retry')Z.back(bad.map(i=>'e'+i))};
  }};

 /* =================== l'illa =================== */
 const palm=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})"><path d="M0 0q4 -22 -2 -44" stroke="#9B6B3D" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-2 -44q-20 -6 -30 6q14 -4 30 -6Zm0 0q20 -8 32 4q-16 -2 -32 -4Zm0 0q-6 -18 -22 -22q10 10 22 22Zm0 0q8 -18 24 -20q-12 8 -24 20Z" fill="#4FA65B"/></g>`;
 (ILLES.ciencies=ILLES.ciencies||[]).push({id:'expedicio',nom:'L\'Illa de l\'Expedició',
  mapa:{mar:'#A8DCEB',sorra:'#F3DFA8',herba:'#BFE3A5',deco:()=>`${palm(40,262,.8)}${palm(668,232,.9)}${palm(505,182,.6)}${palm(195,262,.55)}
   <path d="M276 178l24 -36 24 36Z" fill="#E6795A"/><path d="M300 142v36" stroke="#B5523A" stroke-width="2"/><ellipse cx="400" cy="306" rx="26" ry="10" fill="#7CC6E8"/>
   <path d="M612 300q10 -18 22 0q10 -16 20 0" stroke="#3E8B4A" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M60 70q20 -10 40 0M610 40q14 -8 28 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`},
  segell:{nom:'La porta del temple',desc:'Un repte escrit, sense pistes i amb un sol intent.',txt:'«Demostra el que has après a l\'expedició, sense cap ajuda, i la porta del temple s\'obrirà.»'},
  estacions:[lab,cami,xarxa,navegant,tunel]});
})();
