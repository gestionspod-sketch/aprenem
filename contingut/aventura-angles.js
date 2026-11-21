/* Aprenem - ANGLÈS: illa de l'aventura interactiva («L'Illa del Far»)
   Part de l'app d'estudi. Vegeu CLAUDE.md (secció «Aventura: motor i illes») per a l'API del motor.
   Estacions (la resposta queda amagada fins que es comprova; les respostes s'escriuen o s'ordenen):
     1. El moll de les frases — carregar caixes-paraula al vaixell en ordre: negatives i preguntes
                                 (past simple amb did, present amb do/does, going to). Sempre hi sobren caixes-trampa
                                 (went, plays, don't...) per detectar «didn't went», «doesn't plays»...
                                 (en_past_neg, en_pres_neg, en_going)
     2. La màquina dels verbs — escriure el passat (o el participi) de 3 verbs per fer girar els engranatges
                                 (en_irr_past, en_reg_past, en_irr_pp, en_past)
     3. La cursa de vaixells  — llegir les dades de 3 vaixells i escriure el comparatiu / superlatiu adequat
                                 (en_compar, en_super)
     4. El poble d'abans      — comparar dos dibuixos (fa cent anys / ara) i escriure there was / were / is / are
                                 i el número en anglès (en_there, en_was)
     5. El far que parla      — escoltar una paraula o frase (veu anglesa del navegador) i escriure-la
                                 (en_listen, en_vocab)
     Segell (el posa el motor): el capità del port, exercici escrit sense pistes amb un dels temes de la sessió.
   Dades: taules d'angles.js (IRR, REG, PAST, PRES, VOCAB, EN_SENT) i llistes pròpies d'aquest arxiu.
   Helpers propis (no són al motor): un camp de text amb teclat de lletres (AV.answer obre el numèric a l'iPhone),
   un petit full d'estils per a les peces d'aquesta illa (prefix .aven-) i la normalització de contraccions. */

Object.assign(ERR,{
 en_av_ordre_q:{kid:'A les preguntes, l\'auxiliar (Did, Do, Does, Is, Are...) va al <b>principi</b>, davant del subjecte: <i>Did you see...? Is she going to...?</i>',par:'A les preguntes no posa l\'auxiliar davant del subjecte'},
 en_av_ordre:{kid:'Les paraules són bones, però l\'ordre no. En anglès: <b>subjecte + auxiliar + verb + la resta</b>: <i>She didn\'t eat...</i>',par:'Ordena malament les paraules d\'una frase negativa'},
 en_av_oposat:{kid:'La forma està ben feta, però és l\'adjectiu <b>contrari</b>. Mira els números de cada vaixell abans de triar l\'adjectiu.',par:'Tria l\'adjectiu contrari en comparar (no llegeix bé les dades)'},
 en_av_compte:{kid:'La primera part és correcta, però el número no coincideix amb el dibuix. Compta-ho al dibuix que toca (fa cent anys o ara).',par:'Compta malament els elements d\'un dibuix en descriure\'l'}
});

(()=>{
 /* ---------- helpers propis ---------- */
 const CSS=`.aven-orig{background:#fff;border:2px dashed #C9B8FA;border-radius:16px;padding:12px 16px;font-size:19px;font-weight:500;margin:6px 0 10px;color:#1E1B3A}
 .aven-sea{overflow:hidden;border-radius:18px;background:#DDF1FA;padding:14px 12px 0;margin-top:10px}
 .aven-boat{transition:transform 1.6s ease-in}.aven-boat.go{transform:translateX(130%)}
 .aven-deck{min-height:66px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 14px;background:#B98B5E;border-radius:10px 10px 48px 48px}
 .aven-deck .av-chip{background:#F6E3B4;min-height:46px}.aven-deck .ph{color:#FBEBD3;font-size:15px;padding:0 4px}
 .aven-wave{height:16px;background:repeating-radial-gradient(circle at 12px -4px,#7CC6E8 0 12px,transparent 13px 24px);background-size:24px 16px}
 .aven-tray .av-chip{background:#E3D9FD}.aven-tray .av-chip.used{visibility:hidden}
 .aven-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-top:12px}
 .aven-card{background:#F7F5FE;border-radius:18px;padding:12px 14px}.aven-card b{font-size:18px}
 .aven-card .muted{font-size:14px}.aven-card svg{display:block;margin:0 auto 4px}
 .aven-f{display:block;margin-top:8px}.aven-f .lbl{font-size:14px}
 .aven-in{display:block;width:100%;height:52px;border-radius:16px;border:2px solid var(--pri);background:var(--pri-l);font:500 20px var(--font);color:var(--pri-dd);padding:0 14px;box-sizing:border-box}
 .aven-in:disabled{opacity:.7}
 .aven-sent{font-size:18px;line-height:1.6;margin:16px 0 0}.aven-sent .gap{display:inline-block;min-width:64px;border-bottom:2px solid #8B6CF0;margin:0 4px}
 .aven-pics{display:flex;gap:12px;flex-wrap:wrap}.aven-pics figure{flex:1 1 250px;margin:0}
 .aven-pics figcaption{font-weight:500;margin:0 0 6px 4px}
 .aven-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
 .aven-listen{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:10px 0 4px}
 .aven-boats{grid-template-columns:repeat(3,minmax(0,1fr))}
 @media (max-width:520px){.aven-row2{grid-template-columns:1fr}.aven-orig{font-size:17px}.aven-race{display:none}
  .aven-boats{gap:8px}.aven-boats .aven-card{padding:10px 8px;text-align:center}.aven-boats .aven-card b{font-size:14px;display:block}.aven-boats .aven-card .muted{font-size:12px}.aven-boats svg{width:64px;height:auto}}`;
 const css=()=>{if(!document.getElementById('avEnCss')){const s=document.createElement('style');s.id='avEnCss';s.textContent=CSS;document.head.appendChild(s)}};
 // camp de text (teclat de lletres) amb etiqueta
 const field=(label,cls='')=>`<label class="aven-f"><span class="lbl">${label}</span><input class="aven-in ${cls}" inputmode="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="${esc(String(label).replace(/<[^>]+>/g,''))}"></label>`;
 // connecta els camps: el botó només s'activa quan tots tenen text; Enter a l'últim camp = comprovar
 const wire=(el,btn,fn)=>{const ins=[...el.querySelectorAll('.aven-in')];const upd=()=>{btn.disabled=!!btn.dataset.fi||ins.some(i=>!i.value.trim())};
  ins.forEach((i,j)=>{i.oninput=upd;i.onkeydown=e=>{if(e.key!=='Enter')return;e.preventDefault();if(j<ins.length-1&&!ins[j+1].value.trim())ins[j+1].focus();else if(!btn.disabled)fn()}});
  btn.onclick=fn;upd();return{ins,upd}};
 const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
 const lowS=s=>s==='I'?'I':s.charAt(0).toLowerCase()+s.slice(1);
 // normalitza i desfà contraccions (what's → what is...) per comparar respostes
 const EXP=[["what's",'what is'],["it's",'it is'],["i'm",'i am'],["don't",'do not'],["doesn't",'does not'],["didn't",'did not'],["can't",'cannot'],['can not','cannot'],["isn't",'is not'],["aren't",'are not'],["wasn't",'was not'],["weren't",'were not'],["there's",'there is'],["she's",'she is'],["he's",'he is'],["they're",'they are'],["we're",'we are'],["you're",'you are'],["i've",'i have'],["let's",'let us']];
 const X=s=>{let t=' '+norm(s)+' ';EXP.forEach(([a,b])=>{t=t.split(' '+a+' ').join(' '+b+' ')});return t.trim()};
 const NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];

 /* ---------- 1. El moll de les frases (ordenar paraules) ---------- */
 const SUBJ=[['I',0],['You',2],['We',2],['They',2],['She',1],['He',1],['My brother',1],['Our teacher',1],['My friends',2]];
 const GOING=[['visit','my cousins'],['buy','a new bike'],['play','tennis'],['watch','a film'],['cook','dinner'],['clean','the kitchen'],['paint','the door'],['read','a comic'],['make','a cake'],['wash','the car'],['help','my grandma']];
 const s3=b=>b==='have'?'has':/(ch|sh|ss|x|o)$/.test(b)?b+'es':/[^aeiou]y$/.test(b)?b.slice(0,-1)+'ies':b+'s';
 const ingF=b=>/[^e]e$/.test(b)?b.slice(0,-1)+'ing':b+'ing';
 function frase(type,lv){const[su,pers]=pick(SUBJ),third=pers===1,q=lv>0?Math.random()<.5:Math.random()<.35;let o;
  if(type==='past'){const[b,pa,rest]=pick(lv?PAST:PAST.slice(0,12)),time=pick(['yesterday','last weekend','last summer','two days ago']);
   o={orig:`${su} ${pa} ${rest} ${time}.`,good:q?['Did',lowS(su),b,rest,time]:[su,"didn't",b,rest,time],wrongV:pa,wrongA:q?(third?'Does':'Do'):(third?"doesn't":"don't"),
    errV:'en_did_inf',errA:'en_did_temps',
    steps:[`La frase és en <b>passat</b>: «${pa}» és el passat de «${b}».`,q?`A la pregunta, <b>Did</b> va al principi, davant del subjecte, i el verb queda en <b>infinitiu</b>: ${b} (no ${pa}). <i>Did</i> ja indica el passat.`:`En negativa fem servir <b>didn't</b> + el verb en <b>infinitiu</b>: ${b} (no ${pa}). <i>Didn't</i> ja indica el passat.`]}}
  else if(type==='pres'){const[b,t3,rest]=pick((lv?PRES:PRES.slice(0,10)).filter(x=>x[0]!=='do')),aux=third?'does':'do';
   o={orig:`${su} ${third?t3:b} ${rest}.`,good:q?[cap(aux),lowS(su),b,rest]:[su,aux+"n't",b,rest],wrongV:third?t3:s3(b),wrongA:q?(third?'Do':'Does'):(third?"don't":"doesn't"),
    errV:'en_does_s',errA:'en_do_does',
    steps:[`«${su}» és ${third?'he, she o it':'I, you, we o they'} → l'auxiliar és <b>${q?cap(aux):aux+"n't"}</b>.`,`Després de l'auxiliar, el verb va en <b>infinitiu</b>, sense -s: <b>${b}</b>.${q?' A la pregunta, l\'auxiliar va davant del subjecte.':''}`]}}
  else{const[b,rest]=pick(GOING),be=['am','is','are'][pers],time=pick(['tomorrow','next week','this weekend','next summer']);
   o={orig:`${su} ${be} going to ${b} ${rest} ${time}.`,good:q?[cap(be),lowS(su),'going to',b,rest,time]:[su,pers===0?'am not':be+"n't",'going to',b,rest,time],wrongV:q?ingF(b):s3(b),wrongA:q?(third?'Does':'Do'):(third?"doesn't":"don't"),
    errV:'en_going',errA:'en_going_be',
    steps:[`<i>Going to</i> va amb el verb <b>to be</b>: «${su}» → <b>${be}</b> (no do / does).`,q?`A la pregunta, <b>${cap(be)}</b> va davant del subjecte. Després de «going to», el verb en <b>infinitiu</b>: ${b}.`:`En negativa: <b>${pers===0?'am not':be+"n't"}</b> + going to + el verb en <b>infinitiu</b>: ${b}.`]}}
  o.q=q;o.type=type;o.steps.push(`Ordre: ${q?'auxiliar + subjecte + verb + la resta':'subjecte + auxiliar + verb + la resta'}: <b>${o.good.join(' ')}${q?'?':'.'}</b>`);return o}
 const moll={id:'moll',nom:'El moll de les frases',desc:'Carrega les caixes-paraula al vaixell en l\'ordre correcte.',
  skills:['en_past_neg','en_pres_neg','en_going'],minMs:5000,
  render(el,api){css();
   const tp={en_past_neg:'past',en_pres_neg:'pres',en_going:'going'},types=api.ks.map(k=>tp[k]).filter(Boolean);
   const F=frase(pick(types.length?types:Object.values(tp)),api.lv);
   const tiles=AV.shuf([...F.good,F.wrongV,F.wrongA]).map((t,i)=>({t,i}));let placed=[],fin=false;
   el.innerHTML=`<p>El capità ha escrit aquesta frase al diari de bord:</p><div class="aven-orig">${esc(F.orig)}</div>
    <p>Construeix-la en <b>${F.q?'pregunta':'negativa'}</b>: toca les caixes en ordre per carregar-les al vaixell (toca una caixa del vaixell per tornar-la al moll). <b>Compte: hi sobren dues caixes.</b></p>
    <div class="aven-sea"><div class="aven-boat"><div class="aven-deck" aria-live="polite"></div></div><div class="aven-wave"></div></div>
    <div class="av-tray aven-tray"></div>
    <div class="av-row"><button class="av-chk">Fes salpar el vaixell</button><button class="sec av-clr">Buida el vaixell</button></div>`;
   const deck=el.querySelector('.aven-deck'),tray=el.querySelector('.aven-tray'),chk=el.querySelector('.av-chk'),boat=el.querySelector('.aven-boat');
   const draw=()=>{deck.innerHTML=placed.length?placed.map((i,j)=>`<button class="av-chip" data-j="${j}">${esc(tiles[i].t)}</button>`).join('')+`<span class="ph">${F.q?'?':'.'}</span>`:'<span class="ph">El vaixell és buit: toca les caixes de sota.</span>';
    tray.innerHTML=tiles.map(x=>`<button class="av-chip${placed.includes(x.i)?' used':''}" data-i="${x.i}"${placed.includes(x.i)?' tabindex="-1" aria-hidden="true"':''}>${esc(x.t)}</button>`).join('');
    deck.querySelectorAll('.av-chip').forEach(b=>b.onclick=()=>{if(fin)return;placed.splice(+b.dataset.j,1);draw()});
    tray.querySelectorAll('.av-chip').forEach(b=>b.onclick=()=>{if(fin||placed.includes(+b.dataset.i))return;placed.push(+b.dataset.i);draw()});
    chk.disabled=fin||placed.length<3;if(fin)el.querySelectorAll('.av-chip,.av-clr').forEach(b=>b.disabled=true)};
   el.querySelector('.av-clr').onclick=()=>{if(!fin){placed=[];draw()}};
   chk.onclick=()=>{const arr=placed.map(i=>tiles[i].t),lc=a=>a.map(s=>s.toLowerCase()).join('|');
    const alt=F.q||F.type==='pres'?null:[F.good[F.good.length-1],...F.good.slice(0,-1)];   // «Yesterday she didn't...» també val
    if(lc(arr)===lc(F.good)||(alt&&lc(arr)===lc(alt))){fin=true;draw();boat.classList.add('go');
     api.ok({msg:`<b>El vaixell salpa!</b> ${esc(F.good.join(' '))}${F.q?'?':'.'}`});return}
    let err=null,msg;
    if(arr.includes(F.wrongV)){err=F.errV;msg=`Has carregat «<b>${esc(F.wrongV)}</b>». ${ERR[err].kid}`}
    else if(arr.includes(F.wrongA)){err=F.errA;msg=`Has carregat «<b>${esc(F.wrongA)}</b>». ${ERR[err].kid}`}
    else if(F.good.some(t=>!arr.includes(t)))msg='Falta alguna caixa: la frase ha de dir el mateix que la del capità, però en '+(F.q?'pregunta':'negativa')+'.';
    else{err=F.q&&arr[0].toLowerCase()!==F.good[0].toLowerCase()?'en_av_ordre_q':'en_av_ordre';msg=ERR[err].kid}
    const r=api.fail({err,msg:`<b>El vaixell no pot salpar.</b> ${msg}`,steps:F.steps});
    if(r==='retry'){placed=[];draw()}};
   draw()}};

 /* ---------- 2. La màquina dels verbs (passat i participi) ---------- */
 const gearD=(cx,cy,r,n)=>{let d='';for(let i=0;i<n*2;i++){const a1=i*Math.PI/n,a2=(i+1)*Math.PI/n,R=i%2?r:r+9;
   d+=`${i?'L':'M'}${(cx+R*Math.cos(a1)).toFixed(1)} ${(cy+R*Math.sin(a1)).toFixed(1)}L${(cx+R*Math.cos(a2)).toFixed(1)} ${(cy+R*Math.sin(a2)).toFixed(1)}`}return d+'Z'};
 const maquina={id:'maquina',nom:'La màquina dels verbs',desc:'Escriu el passat dels verbs per fer girar els engranatges.',
  skills:['en_irr_past','en_reg_past','en_irr_pp','en_past'],minMs:6000,
  render(el,api){css();
   const pp=api.k==='en_irr_pp',withReg=!pp&&(api.ks.includes('en_reg_past')||api.ks.includes('en_past'));
   const irr=AV.shuf(vpool(IRR,api.lv).filter(v=>v.b!=='be'&&(!pp||v.pp[0]!==v.b))),reg=AV.shuf(vpool(REG,api.lv));
   const vs=withReg?[irr[0],irr[1],reg[0]]:irr.slice(0,3),items=AV.shuf(vs).map(v=>({v,ans:pp?v.pp:v.p}));
   const G=[[150,'#F2853A'],[350,'#8B6CF0'],[550,'#3FB27F']];let fin=false;
   el.innerHTML=`<p>La màquina del port funciona amb verbs. Escriu el <b>${pp?'participi (la tercera forma)':'passat simple'}</b> de cada verb i engega-la. Si un sol verb no és correcte, els engranatges no giraran.</p>
    <svg class="av-stage" viewBox="0 0 700 170" role="img" aria-label="Màquina amb tres engranatges"></svg>
    <div class="aven-grid">${items.map((it,j)=>`<div class="aven-card"><b>${esc(it.v.b)}</b> <span class="muted">(${esc(caList(it.v))})</span>${pp?`<div class="muted">passat: ${esc(it.v.p.join(' / '))}</div>`:''}${field(pp?'Participi':'Passat',`m${j}`)}</div>`).join('')}</div>
    <div class="av-row"><button class="av-chk">Engega la màquina</button></div>`;
   const svg=el.querySelector('svg'),chk=el.querySelector('.av-chk');
   const draw=a=>{svg.innerHTML=`<rect width="700" height="170" fill="#EEF0F7"/><rect x="40" y="128" width="620" height="16" rx="8" fill="#C9CDE0"/>
     <path d="M610 128v-70h34v70Z" fill="#8A879E"/><rect x="604" y="46" width="46" height="14" rx="5" fill="#6E6B85"/>
     ${a>0?`<circle cx="${627+a%1*10}" cy="${36-a%1*26}" r="${8+a%1*8}" fill="#fff" opacity="${1-a%1}"/>`:''}
     ${G.map(([x,c],j)=>`<g transform="rotate(${(j%2?-1:1)*a*120} ${x} 72)"><path d="${gearD(x,72,40,10)}" fill="${c}"/><circle cx="${x}" cy="72" r="12" fill="#fff"/></g>`).join('')}
     <path d="M190 72h120M390 72h120" stroke="#C9CDE0" stroke-width="8" stroke-linecap="round" opacity=".6"/>`};
   const steps=()=>[...items.map(it=>it.v.irr?`<b>${it.v.b}</b> és irregular: ${pp?`les tres formes són ${it.v.b} – ${it.v.p[0]} – <b>${it.v.pp[0]}</b>`:`el passat és <b>${it.v.p.join(' / ')}</b> (s'ha d'aprendre de memòria).${famHint(it.v.b)}`}`:`<b>${it.v.b}</b> és regular: ${regRule(it.v.b)} → <b>${it.v.p[0]}</b>.`),'Repeteix-los en veu alta i escriu-los una vegada al quadern.'];
   const why=(it,v)=>{const b=it.v.b;
    if(pp){if(it.v.p.includes(v))return'en_pp_passat';if(v===b+'ed'||v===regPast(b))return'en_irregular';return null}
    if(it.v.irr&&(v===b+'ed'||v===regPast(b)))return'en_irregular';
    if(!it.v.irr&&[b+'ed',b+'d',b+b.slice(-1)+'ed',b.slice(0,-1)+'ied'].includes(v))return'en_reg_regla';
    if(v===b||v===s3(b))return'en_passat_no';
    if(lev(v,it.ans[0])<=1)return'en_lletrejat';return null};
   const W=wire(el,chk,()=>{const vals=W.ins.map(i=>norm(i.value)),bad=items.map((it,j)=>!it.ans.includes(vals[j]));
    if(!bad.some(Boolean)){fin=true;chk.dataset.fi=1;W.upd();W.ins.forEach(i=>i.disabled=true);
     api.ok({msg:`<b>La màquina funciona!</b> ${items.map(it=>`${it.v.b} → ${it.ans[0]}`).join(' · ')}.`});AV.anim(2200,e=>draw(e*3));return}
    const errs=items.map((it,j)=>bad[j]?why(it,vals[j]):null),err=errs.find(Boolean)||null;
    const msg=items.map((it,j)=>!bad[j]?null:`«${esc(it.v.b)}»: has escrit «${esc(vals[j])}». ${errs[j]?ERR[errs[j]].kid:`No és el ${pp?'participi':'passat'} d'aquest verb.`}`).filter(Boolean).join('<br>');
    const r=api.fail({err,steps:steps(),msg:`<b>Els engranatges no giren.</b><br>${msg}`});
    if(r==='retry'){W.ins.forEach((i,j)=>{if(bad[j])i.value=''});W.upd();const f=W.ins.find(i=>!i.value);if(f)f.focus({preventScroll:true})}});
   draw(0)}};

 /* ---------- 3. La cursa de vaixells (comparatius i superlatius) ---------- */
 const CF={fast:['faster','the fastest','ràpid'],slow:['slower','the slowest','lent'],long:['longer','the longest','llarg'],short:['shorter','the shortest','curt'],
  old:['older','the oldest','vell'],new:['newer','the newest','nou'],expensive:['more expensive','the most expensive','car'],cheap:['cheaper','the cheapest','barat'],
  heavy:['heavier','the heaviest','pesat'],light:['lighter','the lightest','lleuger']};
 const ATTR=[{a:['fast','slow'],lab:'Velocitat',u:'km/h',lo:8,hi:40,st:1},{a:['long','short'],lab:'Llargada',u:'m',lo:5,hi:30,st:1},{a:['old','new'],lab:'Edat',u:'anys',lo:2,hi:60,st:1},
  {a:['expensive','cheap'],lab:'Preu',u:'€',lo:3,hi:90,st:100,h:1},{a:['heavy','light'],lab:'Pes',u:'kg',lo:4,hi:40,st:50,h:1}];
 const BOATS=[['red','#E8564A','vermell'],['blue','#5B8DEF','blau'],['green','#3FB27F','verd'],['yellow','#F2B61F','groc'],['purple','#8B6CF0','lila']];
 const ruleC=(a,sup)=>{const f=CF[a][sup?1:0];return f.includes('most')||f.includes('more')?`«${a}» és un adjectiu llarg → ${sup?'the most':'more'} + adjectiu`:/ie(r|st)$/.test(f)?`«${a}» acaba en y → canviem la y per ${sup?'-iest':'-ier'}`:`«${a}» és curt → ${sup?'the + -est':'+ -er'}`};
 const boatSVG=(c,w=110)=>`<svg viewBox="0 0 110 70" width="${w}" height="${w*70/110}" aria-hidden="true"><path d="M52 6v44" stroke="#4E4B66" stroke-width="3"/><path d="M55 8l30 36H55Z" fill="#fff" stroke="#D9D6E4" stroke-width="2"/><path d="M49 14L24 44h25Z" fill="${c}" opacity=".85"/><path d="M8 50h94l-14 16H22Z" fill="${c}"/></svg>`;
 const cursa={id:'cursa',nom:'La cursa de vaixells',desc:'Llegeix les dades dels vaixells i escriu el comparatiu o el superlatiu.',
  skills:['en_compar','en_super'],minMs:6000,
  render(el,api){css();
   const ats=AV.shuf(ATTR.filter(t=>api.lv>0||!t.h)).slice(0,2),bs=AV.shuf(BOATS).slice(0,3);
   const vals=ats.map(t=>{let v;do{v=AV.shuf(Array.from({length:t.hi-t.lo+1},(_,i)=>t.lo+i)).slice(0,3)}while(Math.min(...v.map((x,i)=>Math.min(...v.filter((_,j)=>j!==i).map(y=>Math.abs(x-y)))))<2);return v.map(x=>x*t.st)});
   const onlySup=api.ks.length===1&&api.ks[0]==='en_super',sup2=onlySup||api.ks.includes('en_super')||api.lv>0;
   const Q=[0,1].map(n=>{const t=ats[n],v=vals[n],sup=n===0?onlySup:sup2;
    if(sup){const ex=Math.random()<.5?v.indexOf(Math.max(...v)):v.indexOf(Math.min(...v)),adj=v[ex]===Math.max(...v)?t.a[0]:t.a[1];
     return{t,sup,i:ex,adj,opp:t.a[0]===adj?t.a[1]:t.a[0],ans:CF[adj][1],sent:`The ${bs[ex][0]} boat is ___ boat in the race.`}}
    const[i,j]=AV.shuf([0,1,2]),adj=v[i]>v[j]?t.a[0]:t.a[1];
    return{t,sup,i,j,adj,opp:t.a[0]===adj?t.a[1]:t.a[0],ans:CF[adj][0],sent:`The ${bs[i][0]} boat is ___ than the ${bs[j][0]} boat.`}});
   const fmt=(n,x)=>`${x.toLocaleString('ca-ES')} ${ats[n].u}`;let fin=false;
   el.innerHTML=`<p>Tres vaixells es preparen per a la cursa del port. Llegeix bé les seves dades i completa les frases amb l'adjectiu adequat en <b>comparatiu</b> o <b>superlatiu</b>.</p>
    <div class="aven-sea aven-race" style="padding:0"><svg class="av-stage" viewBox="0 0 700 110" role="img" aria-label="Tres vaixells a la línia de sortida"></svg></div>
    <div class="aven-grid aven-boats">${bs.map((b,k)=>`<div class="aven-card">${boatSVG(b[1],90)}<b>The ${b[0]} boat</b>${ats.map((t,n)=>`<div class="muted">${t.lab}: <span style="font-weight:500;color:#1E1B3A;white-space:nowrap">${fmt(n,vals[n][k])}</span></div>`).join('')}</div>`).join('')}</div>
    ${Q.map((q,n)=>`<p class="aven-sent">${n+1}. ${esc(q.sent).replace('___','<span class="gap"></span>')} <span class="muted">(${q.t.a[0]} / ${q.t.a[1]})</span></p>${field(q.sup?'Superlatiu (amb the)':'Comparatiu')}`).join('')}
    <div class="av-row"><button class="av-chk">Que comenci la cursa!</button></div>`;
   const svg=el.querySelector('svg'),chk=el.querySelector('.av-chk');
   const draw=e=>{svg.innerHTML=`<rect width="700" height="110" fill="#BFE6F5"/><path d="M640 0v110" stroke="#fff" stroke-width="6" stroke-dasharray="12 10"/>
     ${bs.map((b,k)=>{const sp=ats[0].a[0]==='fast'?vals[0][k]/Math.max(...vals[0]):1,x=10+e*sp*580;return`<g transform="translate(${x},${4+k*35})">${boatSVG(b[1],48).replace('<svg','<svg x="0" y="0"')}</g>`}).join('')}`};
   const why=(q,v)=>{if(v===CF[q.opp][q.sup?1:0]||v===CF[q.opp][1].replace('the ','')||v===CF[q.opp][0])return'en_av_oposat';
    if(q.sup){if(v===q.ans.replace('the ',''))return'en_super_the';if(v===CF[q.adj][0])return'en_comp_sup';if(/^the /.test(v)||/est$/.test(v))return'en_superlatiu';return null}
    if(/^the /.test(v)||/est$/.test(v))return'en_comp_sup';if(/er$/.test(v)||/^more /.test(v))return'en_comparatiu';return null};
   const nm=k=>`${bs[k][2]} (${bs[k][0]})`;
   const steps=()=>Q.flatMap((q,n)=>{const d=k=>fmt(n,vals[n][k]);
    return[q.sup?`Frase ${n+1}: el vaixell ${nm(q.i)} fa ${d(q.i)}: és ${q.adj===q.t.a[0]?'el número més alt':'el número més baix'} dels tres → és el més <b>${CF[q.adj][2]}</b> de tots: <b>${q.adj}</b>, en superlatiu.`
      :`Frase ${n+1}: el vaixell ${nm(q.i)} fa ${d(q.i)} i el ${nm(q.j)}, ${d(q.j)} → el ${bs[q.i][2]} és més <b>${CF[q.adj][2]}</b>: <b>${q.adj}</b>, en comparatiu (hi ha <i>than</i>).`,
     `${ruleC(q.adj,q.sup)}: <b>${q.sent.replace('___',q.ans)}</b>`]});
   const W=wire(el,chk,()=>{const vs=W.ins.map(i=>norm(i.value)),bad=Q.map((q,n)=>vs[n]!==q.ans);
    if(!bad.some(Boolean)){fin=true;chk.dataset.fi=1;W.upd();W.ins.forEach(i=>i.disabled=true);
     api.ok({msg:`<b>Bona cursa!</b> ${Q.map(q=>q.sent.replace('___','<b>'+q.ans+'</b>')).join(' ')}`});AV.anim(1800,draw);return}
    const errs=Q.map((q,n)=>bad[n]?why(q,vs[n]):null),err=errs.find(Boolean)||null;
    const msg=Q.map((q,n)=>!bad[n]?null:`Frase ${n+1}: has escrit «${esc(vs[n])}». ${errs[n]?ERR[errs[n]].kid:q.sup?'Revisa-ho: és el número u dels tres vaixells (superlatiu, amb <i>the</i>).':'Revisa-ho: comparam dos vaixells (comparatiu + <i>than</i>).'}`).filter(Boolean).join('<br>');
    const r=api.fail({err,k:errs.find((e,n)=>e&&Q[n].sup)?'en_super':undefined,steps:steps(),msg:`<b>Encara no podem sortir.</b><br>${msg}`});
    if(r==='retry'){W.ins.forEach((i,n)=>{if(bad[n])i.value=''});W.upd()}});
   draw(0)}};

 /* ---------- 4. El poble d'abans (there was / were · there is / are) ---------- */
 const ITEMS=[['boat','boats','⛵',0],['horse','horses','🐴',1],['car','cars','🚗',2],['house','houses','🏠',0],['tree','trees','🌳',0],['bike','bikes','🚲',0],['shop','shops','🏪',0],['plane','planes','✈️',2],['cow','cows','🐄',1],['bus','buses','🚌',2],['dog','dogs','🐕',0]];
 const poble={id:'poble',nom:'El poble d\'abans',desc:'Compara el poble de fa cent anys amb el d\'ara i descriu-lo.',
  skills:['en_there','en_was'],minMs:6000,
  render(el,api){css();
   // 0 = hi pot ser sempre · 1 = abans sí, ara poc · 2 = abans no n'hi havia
   const its=AV.shuf(ITEMS).slice(0,5),cnt=[its.map(x=>x[3]===2?0:rnd(x[3]===1?2:0,4)),its.map(x=>x[3]===1?rnd(0,1):rnd(x[3]===2?1:0,5))];
   [0,1].forEach(era=>{let g=0;while(cnt[era].filter(c=>c>0).length<2&&g++<40){const i=rnd(0,4);if(era===0&&its[i][3]===2)continue;cnt[era][i]=rnd(1,3)}});
   const ERA=['A hundred years ago','Now'];
   const mk=(era,used)=>{const opts=its.map((x,i)=>i).filter(i=>!used.includes(i)&&(api.lv>0||cnt[era][i]>0));const i=pick(opts.length?opts:its.map((x,i)=>i).filter(i=>cnt[era][i]>0)),c=cnt[era][i],it=its[i],past=era===0;
    const V=c===0?(past?"there weren't":"there aren't"):c===1?(past?'there was':'there is'):(past?'there were':'there are');
    return{era,i,c,it,past,V,num:c===1?['one','a','an','1']:[NUMW[c],String(c)],sent:c===0?`${ERA[era]} ___ any ${it[1]} in the village.`:`${ERA[era]} ___ ___ ${c===1?it[0]:it[1]} in the village.`}};
   const order=AV.shuf([0,1]),q1=mk(order[0],[]),Q=[q1,mk(order[1],[q1.i])];let fin=false;
   el.innerHTML=`<p>L'avi del far guarda un dibuix del poble de fa cent anys. Compara'l amb el poble d'ara i completa les frases: <b>there was / were</b> (abans) o <b>there is / are</b> (ara) i, si cal, el número <b>en anglès</b> (one, two...).</p>
    <div class="aven-pics">${[0,1].map(era=>`<figure><figcaption>${ERA[era]}</figcaption><svg class="av-stage" viewBox="0 0 320 190" role="img" aria-label="${ERA[era]}"></svg></figure>`).join('')}</div>
    ${Q.map((q,n)=>`<p class="aven-sent">${n+1}. ${esc(q.sent).replace(/___/g,'<span class="gap"></span>')}</p><div class="${q.c?'aven-row2':''}">${field(q.c===0?'There + verb (negativa)':'There + verb')}${q.c?field('Número en anglès'):''}</div>`).join('')}
    <div class="av-row"><button class="av-chk">Comprova</button></div>`;
   el.querySelectorAll('.aven-pics svg').forEach((s,era)=>{const cells=AV.shuf(Array.from({length:24},(_,k)=>k));let k=0,g='';
    its.forEach((x,i)=>{for(let n=0;n<cnt[era][i];n++){const c=cells[k++],cx=24+(c%8)*39,cy=72+Math.floor(c/8)*40;g+=`<text x="${cx}" y="${cy}" font-size="32" text-anchor="middle">${x[2]}</text>`}});
    s.innerHTML=`<rect width="320" height="190" rx="16" fill="${era?'#E5F3DA':'#F3E6CC'}"/><rect y="0" width="320" height="34" rx="16" fill="${era?'#CDE6F7':'#E8D7B4'}"/>${g}`;
    if(!era)s.style.filter='sepia(.5)'});
   const chk=el.querySelector('.av-chk'),inputs=()=>{let j=0;return Q.map(q=>{const a=W.ins[j++],b=q.c?W.ins[j++]:null;return[a,b]})};
   const steps=()=>Q.flatMap((q,n)=>[`Frase ${n+1}: al dibuix «${ERA[q.era]}» hi ha <b>${q.c}</b> ${q.it[2]}.`,
    `${q.c===0?'No n\'hi ha cap → negativa amb <i>any</i>':q.c===1?'N\'hi ha un → singular':'N\'hi ha més d\'un → plural'} i ${q.past?'és el passat («A hundred years ago») → was / were':'és ara («Now») → is / are'}: <b>${q.sent.replace('___',q.V).replace('___',q.c?NUMW[q.c]:'')}</b>`]);
   const W=wire(el,chk,()=>{const pr=inputs(),res=Q.map((q,n)=>{const v=X(pr[n][0].value),u=pr[n][1]?norm(pr[n][1].value):null;
     const okV=v===X(q.V),okN=!q.c||q.num.includes(u);let err=null,msg=null;
     if(!okV){const sg=q.c===1,forms=(p,s,ng)=>X(`there ${p?(s?'was':'were'):(s?'is':'are')}${ng?' not':''}`);
      if(!v.startsWith('there'))msg='Falta <b>there</b>: «hi havia» és <i>there was / there were</i>, i «hi ha», <i>there is / there are</i>.';
      else if(v===forms(q.past,!sg,!q.c)||(q.c===0&&v===forms(q.past,true,true)))err='en_there';
      else if([forms(!q.past,sg,!q.c),forms(!q.past,!sg,!q.c)].includes(v))err='en_there_temps';
      else if(q.c===0&&v.replace(' not','')===v)msg='Al dibuix no n\'hi ha cap i la frase diu <i>any</i>: ha de ser <b>negativa</b> (not).';
      else if(q.c>0&&v.includes(' not'))msg='Al dibuix sí que n\'hi ha: la frase és afirmativa.'}
     else if(!okN)err=/^\d+$/.test(u)||!NUMW.includes(u)&&!['a','an'].includes(u)?null:'en_av_compte';
     if(!okV||!okN)msg=msg||(err?ERR[err].kid:!okN&&/^\d+$/.test(u)?'Escriu el número amb lletres, en anglès (one, two, three...).':!okN?'Escriu el número en anglès (one, two, three...) i comprova que coincideix amb el dibuix.':'Revisa la forma: there + was / were / is / are.');
     return{ok:okV&&okN,okV,err,msg}});
    if(res.every(r=>r.ok)){fin=true;chk.dataset.fi=1;W.upd();W.ins.forEach(i=>i.disabled=true);
     api.ok({msg:`<b>Així era i així és el poble!</b> ${Q.map(q=>q.sent.replace('___','<b>'+q.V+'</b>').replace('___','<b>'+(q.c?NUMW[q.c]:'')+'</b>')).join(' ')}`});return}
    const err=(res.find(r=>!r.ok&&r.err)||{}).err||null;
    const r=api.fail({err,k:'en_there',steps:steps(),msg:`<b>No és ben bé així.</b><br>${res.map((x,n)=>x.ok?null:`Frase ${n+1}: ${x.msg}`).filter(Boolean).join('<br>')}`});
    if(r==='retry'){pr.forEach(([a,b],n)=>{if(!res[n].okV)a.value='';if(b&&!res[n].ok&&res[n].okV)b.value=''});W.upd()}});
  }};

 /* ---------- 5. El far que parla (listening) ---------- */
 const SENT2=[['The lighthouse is very tall','El far és molt alt'],['There were three boats in the harbour','Hi havia tres vaixells al port'],['We are going to swim tomorrow','Demà anirem a nedar'],['She didn\'t see the dolphin','Ella no va veure el dofí'],['My dog is faster than my cat','El meu gos és més ràpid que el meu gat'],['Did you go to the beach','Vas anar a la platja?'],['The sea was very cold','La mar estava molt freda'],['I bought a new book yesterday','Ahir vaig comprar un llibre nou']];
 const far={id:'far',nom:'El far que parla',desc:'Escolta el missatge del far i escriu-lo en anglès.',
  skills:['en_listen','en_vocab'],minMs:4000,
  render(el,api){css();
   const voice=typeof speechSynthesis!=='undefined'&&typeof SpeechSynthesisUtterance!=='undefined';
   let t,ca,em='';
   if(!voice||api.lv===0&&Math.random()<.6||api.k==='en_vocab'&&Math.random()<.6){const w=pick(VOCAB.filter(w=>api.lv>0||!w.h));t=w.en;ca=w.ca;em=w.em||''}
   else[t,ca]=pick(api.lv>1?[...SENT2,...EN_SENT]:EN_SENT.concat(SENT2.slice(0,4)));
   const words=t.split(' ').length,heard={n:0};
   el.innerHTML=voice?`<p>El far envia missatges als vaixells. Escolta'l (tantes vegades com vulguis) i escriu en anglès el que diu.</p>
    <svg class="av-stage" viewBox="0 0 700 150" role="img" aria-label="Un far que envia un missatge"></svg>
    <div class="aven-listen"><button class="av-play">▶ Escolta</button><button class="sec av-slow">A poc a poc</button><button class="sec av-pista">Pista (perds la gemma)</button></div>
    ${field(words>1?'Escriu la frase':'Escriu la paraula')}<div class="av-row"><button class="av-chk">Comprova</button></div>`
    :`<p>Aquest aparell no té veu, així que el far t'ensenya un dibuix. Escriu en anglès com es diu.</p><div style="font-size:64px;text-align:center">${em}</div><p style="text-align:center">«<b>${esc(ca)}</b>»</p>
    ${field('En anglès')}<div class="av-row"><button class="av-chk">Comprova</button></div>`;
   const svg=el.querySelector('svg'),chk=el.querySelector('.av-chk');
   const draw=e=>{if(!svg)return;svg.innerHTML=`<rect width="700" height="150" fill="#BFE6F5"/><path d="M0 130q175 -14 350 0t350 0v20H0Z" fill="#7CC6E8"/>
     <path d="M70 130l12 -96h28l12 96Z" fill="#fff"/><path d="M74 100h44l2 14H72ZM79 62h34l2 14H77Z" fill="#E8564A"/><rect x="80" y="18" width="32" height="18" rx="4" fill="#F7C948"/><path d="M76 18h40l-20 -12Z" fill="#E8564A"/>
     ${[0,1,2].map(k=>`<path d="M${150+k*34} ${44-k*10}q${18+k*6} ${30+k*10} 0 ${60+k*20}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="${e?Math.max(.15,1-Math.abs(e*3-k)/1.5):.35}"/>`).join('')}
     ${AV.owlG(560,40,70)}`};
   const play=rate=>{if(!heard.n++)api.restart();say(t,rate,'en-GB');AV.anim(1600,draw,()=>draw(0))};
   if(voice){el.querySelector('.av-play').onclick=()=>play(.8);el.querySelector('.av-slow').onclick=()=>play(.55);
    el.querySelector('.av-pista').onclick=e=>{e.target.disabled=true;api.hint(`Vol dir «${esc(ca)}»${em?' '+em:''}. ${words>1?`Té ${words} paraules i comença per «${esc(t.split(' ')[0])}».`:`Comença per «${t[0]}» i té ${t.length} lletres.`}`)}}
   const steps=[voice?`El far deia: <b>${esc(t)}</b>.`:`«${esc(ca)}» en anglès és <b>${esc(t)}</b>.`,`Vol dir: «${esc(ca)}».`,voice?'Escolta-ho una altra vegada mentre ho llegeixes.':`S'escriu així: ${esc(t.toUpperCase().split('').join(' - '))}.`];
   const W=wire(el,chk,()=>{const v=X(W.ins[0].value),g=X(t);
    if(v===g){chk.dataset.fi=1;W.upd();W.ins[0].disabled=true;el.querySelectorAll('.aven-listen button').forEach(b=>b.disabled=true);
     api.ok({msg:`<b>Missatge rebut!</b> «${esc(t)}» vol dir «${esc(ca)}».`});return}
    const d=lev(v,g),nv=norm(W.ins[0].value).split(' ').length,ng=norm(t).split(' ').length,err=d<=Math.max(2,Math.floor(g.length/8))?'en_lletrejat':null;
    const msg=err?ERR.en_lletrejat.kid:nv!==ng&&ng>1?`El missatge té <b>${ng}</b> paraules i n'has escrit ${nv}. Torna-ho a escoltar a poc a poc.`:'No és el que diu el far. Torna-ho a escoltar a poc a poc i fixa\'t en cada paraula.';
    const r=api.fail({err,steps,msg:`<b>El missatge no arriba bé.</b> ${msg}`});
    if(r==='retry')W.ins[0].select()});
   draw(0)}};

 (ILLES.angles=ILLES.angles||[]).push({id:'illa-far',nom:'L\'Illa del Far',
  mapa:{mar:'#BFE6F5',sorra:'#F6E3B4',herba:'#CDE9B5',
   deco:`<g transform="translate(646,40)"><path d="M-9 80l5 -64h10l5 64Z" fill="#fff"/><path d="M-7 56h14l1 9h-16ZM-5 32h10l1 9h-12Z" fill="#E8564A"/><rect x="-6" y="6" width="12" height="10" rx="2" fill="#F7C948"/><path d="M-8 6h16l-8 -7Z" fill="#E8564A"/><path d="M8 10l26 -8v18Z" fill="#F7C948" opacity=".55"/></g>
    <g transform="translate(30,26)"><path d="M18 2v26" stroke="#4E4B66" stroke-width="2"/><path d="M20 4l16 20H20Z" fill="#fff"/><path d="M0 30h44l-8 9H8Z" fill="#E8564A"/></g>
    <g transform="translate(166,262)"><rect x="0" y="12" width="18" height="34" fill="#C79B6B"/><path d="M-3 12h24l-12 -14Z" fill="#8E5A2B"/><circle cx="9" cy="24" r="6" fill="#fff"/><path d="M9 24v-4M9 24h3" stroke="#4E4B66" stroke-width="1.5"/></g>
    <path d="M90 318q14 -8 28 0M520 26q14 -8 28 0M250 30q12 -7 24 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>
    <circle cx="210" cy="196" r="14" fill="#9DD18A"/><circle cx="500" cy="190" r="16" fill="#9DD18A"/>`},
  segell:{nom:'El capità del port',desc:'Un repte escrit, sense pistes i amb un sol intent.',txt:'«Ready, sailor? Respon-me sense ajuda i et deixaré salpar.»'},
  estacions:[moll,maquina,cursa,poble,far]});
})();
