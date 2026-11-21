/* Aprenem - CASTELLÀ: illa de l'aventura interactiva («El Castillo de las Palabras»)
   Part de l'app d'estudi. Vegeu CLAUDE.md (secció «Aventura: motor i illes») per a l'API del motor.
   Com la resta de Castellà (vegeu contingut/castella.js): les instruccions i els avisos són en català;
   el contingut (paraules, frases, regles i explicacions pas a pas) és en castellà.
   Estacions (la resposta queda amagada fins que es comprova; cap color de bé / malament abans de comprovar):
     1. La torre de las tildes     — síl·laba tònica i tilde de 3-4 paraules alhora + tipus escrit (cs_acentuacion, cs_hiatos)
     2. El mercado de las palabras — classificar les paraules d'una frase en calaixos de categories (cs_categorias, cs_determinantes, cs_nexos)
     3. La muralla del sujeto      — marcar el subjecte (o dir que és omès) + nucli escrit (cs_sujeto)
     4. La máquina de los verbos   — conjugar escrivint (regulars i irregulars) i dir el temps (cs_conjugar, cs_irregulares, cs_tiempos)
     5. La carta del rey           — trobar i corregir les faltes d'un missatge (cs_bv, cs_gj, cs_h, cs_lly)
     Segell (el posa el motor): el pont llevadís, exercici escrit sense pistes amb un dels temes de la sessió.
   Ajuda pròpia d'aquest arxiu: hdrag() arrossega botons HTML (el motor només en té per a SVG), amb l'alternativa
   «toca per triar i toca per posar». Uns quants estils propis (prefix cv-) s'afegeixen des d'aquí.
   Totes les frases i paraules són originals. */

Object.assign(ERR,{
 cs_av_tonica:{kid:'Aquesta no és la síl·laba que sona més forta. Digues la paraula en veu alta, com si cridessis algú des de lluny: la síl·laba que allargues és la tònica.',par:'Castellà: no troba la síl·laba tònica'},
 cs_av_hiato:{kid:'Quan la i o la u són tòniques al costat d\'una a, una e o una o, fan hiat i porten tilde sempre (maíz, río, búho), encara que les regles generals no la demanin.',par:'Castellà: oblida la tilde dels hiats amb i / u tòniques (rio, maiz)'}
});

(()=>{
 /* ---------- estils propis de l'illa ---------- */
 if(!document.getElementById('cv-css')){const st=document.createElement('style');st.id='cv-css';st.textContent=`
 .cv-words{display:flex;flex-direction:column;gap:14px;margin:14px 0}
 .cv-word{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
 .cv-word .cv-n{width:30px;height:30px;border-radius:50%;background:var(--lav);color:var(--pri-dd);display:grid;place-items:center;font-size:14px;font-weight:500;flex:none}
 .cv-syls{display:flex;gap:4px}
 button.cv-syl{min-width:58px;min-height:56px;padding:0 12px;border-radius:14px;background:var(--soft);color:var(--ink);box-shadow:none;font-size:22px;font-weight:500;border:2px solid var(--line2)}
 button.cv-syl.ton{background:var(--pri-l);border-color:var(--pri);color:var(--pri-dd)}
 button.cv-syl:disabled{opacity:1;cursor:default}
 .cv-sent{font-size:20px;line-height:1.6;background:var(--soft);border-radius:18px;padding:12px 16px;margin:8px 0}
 .cv-tray{display:flex;flex-wrap:wrap;gap:8px;min-height:62px;padding:8px;border:2px dashed var(--line2);border-radius:18px;margin:10px 0}
 .cv-tray:empty::after{content:'Ja les has posat totes.';color:var(--muted);font-size:14px;align-self:center;padding:0 6px}
 button.cv-chip{min-height:48px;padding:0 14px;border-radius:14px;background:#fff;color:var(--ink);box-shadow:0 2px 6px rgba(30,27,58,.08);font-size:17px;border:2px solid var(--line2);touch-action:none}
 button.cv-chip.on{border-color:var(--pri);background:var(--pri-l);color:var(--pri-dd)}
 .cv-ghost{position:fixed;z-index:1000;pointer-events:none;opacity:.92;box-shadow:0 10px 24px rgba(30,27,58,.22)!important;margin:0}
 .cv-drawers{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
 .cv-drw{border-radius:18px;background:var(--t,#F6F5FA);padding:8px;min-height:96px;cursor:pointer}
 .cv-drw>b{display:block;font-size:13px;font-weight:500;color:var(--d,#4E4B66);margin:2px 4px 6px;text-transform:uppercase;letter-spacing:.03em}
 .cv-drw .cv-in{display:flex;flex-wrap:wrap;gap:6px}
 .cv-drw button.cv-chip{min-height:42px;font-size:15px;padding:0 10px}
 .cv-toks{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
 button.cv-tok{min-height:52px;padding:0 14px;border-radius:14px;background:var(--soft);color:var(--ink);box-shadow:none;font-size:19px;border:2px solid transparent}
 button.cv-tok.on{background:var(--pri-l);border-color:var(--pri);color:var(--pri-dd)}
 button.cv-tok:disabled,button.cv-chip:disabled,button.cv-om:disabled{opacity:1;cursor:default}
 button.cv-om{background:#fff;color:var(--pri-dd);border:2px solid var(--line2);box-shadow:none}
 button.cv-om.on{border-color:var(--pri);background:var(--pri-l)}
 .cv-mach{background:linear-gradient(#EDE7FF,#E3D9FD);border-radius:24px;padding:14px;position:relative;margin:10px 0}
 .cv-wins{display:grid;grid-template-columns:1fr 1fr 1.4fr;gap:10px}
 .cv-win{background:#fff;border-radius:16px;padding:8px 12px;min-width:0}
 .cv-win small{display:block;font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
 .cv-win b{font-size:19px;font-weight:500;color:var(--pri-dd);overflow-wrap:anywhere}
 .cv-gears{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
 .cv-gears svg{width:44px;height:44px}
 .cv-gears.spin svg{animation:cvspin 1.1s ease-in-out}
 .cv-gears.spin svg:nth-child(2){animation-direction:reverse}
 @keyframes cvspin{to{transform:rotate(240deg)}}
 @media (prefers-reduced-motion:reduce){.cv-gears.spin svg{animation:none}}
 .cv-tickets{display:flex;flex-wrap:wrap;gap:8px;flex:1;justify-content:center}
 .cv-ticket{background:#fff;border-radius:10px;padding:6px 12px;font-size:16px;color:#155C3D;border:2px dashed #8ED3B3}
 .cv-carta{background:#FBF3DF;border-radius:20px;padding:16px 18px;font-size:19px;line-height:2.1;box-shadow:inset 0 0 0 2px #EADCB8;margin:10px 0}
 .cv-carta .cv-sal{font-style:italic;color:#7A5B2E}
 button.cv-w{display:inline;min-height:0;padding:2px 1px;margin:0;border-radius:8px;background:none;color:var(--ink);box-shadow:none;font:inherit;line-height:1.5;border-bottom:2px dotted transparent}
 button.cv-w:hover{border-bottom-color:#C9B48A}
 button.cv-w.sel{background:var(--pri-l);outline:2px solid var(--pri)}
 button.cv-w.ed{color:var(--pri-dd);background:var(--pri-l);border-bottom:2px solid var(--pri)}
 button.cv-w:disabled{opacity:1;cursor:default}
 @media (max-width:520px){button.cv-syl{min-width:50px;font-size:20px;padding:0 8px}.cv-wins{grid-template-columns:1fr 1fr}.cv-wins .cv-win:last-child{grid-column:1/-1}.cv-sent{font-size:18px}.cv-carta{font-size:17px;padding:14px}}
 `;document.head.appendChild(st)}

 /* ---------- ajudes ---------- */
 const ans=(label,ph,btn)=>AV.answer(label,ph,btn).replace('inputmode="decimal"','inputmode="text"');
 const cap=s=>s[0].toUpperCase()+s.slice(1);
 const es=s=>`<span lang="es">${s}</span>`;
 const list=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' i '+a[a.length-1];
 // Arrossegar botons HTML (dit o ratolí). o.chip: selector dels botons · o.target: selector de les zones on es poden deixar
 // o.onDrop(boto, zona|null) · o.disabled(). Un toc sense moure no és arrossegar (el gestiona l'onclick de cada botó).
 function hdrag(root,o){let d=null;
  root.addEventListener('pointerdown',e=>{const c=e.target.closest(o.chip);if(!c||c.disabled||(o.disabled&&o.disabled()))return;d={c,x:e.clientX,y:e.clientY,g:null}});
  root.addEventListener('pointermove',e=>{if(!d)return;
   if(!d.g){if(Math.hypot(e.clientX-d.x,e.clientY-d.y)<8)return;const r=d.c.getBoundingClientRect(),g=d.c.cloneNode(true);
    g.classList.add('cv-ghost');g.style.width=r.width+'px';g.style.left=r.left+'px';g.style.top=r.top+'px';document.body.appendChild(g);
    d.g=g;d.ox=d.x-r.left;d.oy=d.y-r.top;d.c.style.opacity='.35';try{root.setPointerCapture(e.pointerId)}catch(_){}}
   d.g.style.left=(e.clientX-d.ox)+'px';d.g.style.top=(e.clientY-d.oy)+'px';e.preventDefault()});
  const end=(e,cancel)=>{if(!d)return;const D=d;d=null;if(!D.g)return;D.g.remove();D.c.style.opacity='';root._cvDrag=Date.now();
   if(cancel)return;const t=document.elementFromPoint(e.clientX,e.clientY);o.onDrop(D.c,t&&t.closest(o.target))};
  root.addEventListener('pointerup',e=>end(e,false));root.addEventListener('pointercancel',e=>end(e,true))}
 const justDragged=root=>root._cvDrag&&Date.now()-root._cvDrag<350;

 /* =====================================================================
    1. La torre de las tildes (acentuación, diptongos e hiatos)
    ===================================================================== */
 // síl·labes separades per |, la tònica amb *
 const ACW=['ca|*fé','so|*fá','ca|*mión','ra|*tón','can|*ción','au|to|*bús','com|*pás','ja|*más','sa|*lón','re|*loj','ciu|*dad','pa|*red','co|*mer','fe|*liz','ho|*tel','co|*lor','ver|*dad','na|*riz',
  '*ár|bol','*lá|piz','*fá|cil','di|*fí|cil','*cés|ped','a|*zú|car','*mó|vil','*cár|cel','*fút|bol','*dé|bil','*ca|sa','*me|sa','e|*xa|men','*jo|ven','*lu|nes','ven|*ta|na','o|*ri|gen','*li|bro','*mar|tes','za|*pa|to',
  '*mú|si|ca','*pá|ja|ro','*plá|ta|no','*mé|di|co','te|*lé|fo|no','*sá|ba|do','*miér|co|les','*brú|ju|la','mur|*cié|la|go','*lám|pa|ra','*má|qui|na','*nú|me|ro','*cuén|ta|me|lo','*dí|ga|me|lo','ex|*plí|ca|se|lo'];
 // diftongs (d) i hiats (h)
 const HIW=['ma|*íz:h','pa|*ís:h','*rí|o:h','*dí|a:h','*bú|ho:h','o|*í|do:h','ra|*íz:h','ba|*úl:h','*tí|o:h','po|li|*cí|a:h','*frí|o:h','*grú|a:h','re|*ír:h','son|*rí|e:h',
  'po|*e|ta:h','le|*ón:h','te|*a|tro:h','mu|*se|o:h','*hé|ro|e:h','*cie|lo:d','*nie|ve:d','des|*pués:d','a|*diós:d','*cuen|to:d','*pia|no:d','*bai|le:d','cui|*da|do:d'];
 const TIP_PL=['agudes','planes','esdrúixoles','sobreesdrúixoles'],TIP=['aguda','llana','esdrújula','sobresdrújula'],TIP_CA=['aguda','plana (llana)','esdrúixola','sobreesdrúixola'];
 const TIP_ALT=[['aguda'],['llana','grave','plana'],['esdrújula','esdrujula','esdruixola','esdrúixola'],['sobresdrújula','sobreesdrújula','sobresdrujula','sobreesdrujula','sobreesdrúixola','sobreesdruixola']];
 const RULE_ES=['Las <b>agudas</b> llevan tilde si acaban en <b>vocal, -n o -s</b> (café, camión, francés).','Las <b>llanas</b> llevan tilde si <b>no</b> acaban en vocal, -n o -s (árbol, lápiz, fácil).','Las <b>esdrújulas</b> llevan tilde <b>siempre</b> (música, pájaro).','Las <b>sobresdrújulas</b> llevan tilde <b>siempre</b> (cuéntamelo).'];
 const HI_RULE='Si la <b>i</b> o la <b>u</b> es la tónica y está junto a <b>a, e, o</b>, hay hiato y <b>siempre lleva tilde</b> (maíz, río, búho).';
 const parseW=s=>{const[w,k]=s.split(':'),raw=w.split('|'),ton=raw.findIndex(x=>x[0]==='*'),syl=raw.map(x=>x.replace('*','')),n=syl.length;
  const word=syl.join(''),tilde=/[áéíóú]/.test(syl[ton]),plain=syl.map(x=>CS.strip(x));
  return{syl,plain,ton,word,disp:plain.join(''),tilde,tipo:Math.min(3,n-1-ton),kind:k||null,forced:k==='h'&&/[íú]/.test(syl[ton])}};
 const ACC=ACW.map(parseW),HIA=HIW.map(parseW);
 // posa la tilde a la vocal que toca d'una síl·laba (a, e, o primer; si només n'hi ha de tancades, la darrera)
 const addT=s=>{const m={a:'á',e:'é',i:'í',o:'ó',u:'ú'};let i=s.search(/[aeo]/);if(i<0){const v=[...s.matchAll(/[iu]/g)].map(x=>x.index);i=v.length?v[v.length-1]:-1}
  return i<0?s:s.slice(0,i)+m[s[i]]+s.slice(i+1)};
 const endsIn=w=>{const l=w.disp.slice(-1);return/[aeiou]/.test(l)?'vocal':l==='n'?'-n':l==='s'?'-s':'«'+l+'»'};
 const torre={id:'torre',nom:'La torre de las tildes',desc:'Troba la síl·laba tònica de cada paraula i posa la tilde on toqui.',
  skills:['cs_acentuacion','cs_hiatos'],
  render(el,api){const L=api.lv,hiaOn=api.ks.includes('cs_hiatos')||L>0,n=L===0?3:4;
   const pool=ACC.filter(w=>L>1||w.tipo<3).concat(hiaOn?HIA:[]);let W;
   do{W=AV.shuf(pool).slice(0,n)}while(!W.some(w=>w.tilde)||!W.some(w=>!w.tilde)||new Set(W.map(w=>w.tipo)).size<2||(api.ks.includes('cs_hiatos')&&!W.some(w=>w.kind))||new Set(W.map(w=>w.disp)).size<n);
   const st=W.map(()=>({t:-1,til:false})),bad=new Set();let phase=0;
   el.innerHTML=`<p>Per pujar a la torre, cada paraula ha de quedar ben escrita. Les tildes s'han esborrat!</p>
    <p class="muted" style="font-size:15px">Toca <b>una vegada</b> la síl·laba tònica (la que sona més forta). Si ha de portar tilde, toca-la <b>una altra vegada</b>. Un tercer toc l'esborra.</p>
    <div class="cv-words"></div><div class="av-row"><button class="av-chk" disabled>Comprova les paraules</button></div><div class="av-q2"></div>`;
   const box=el.querySelector('.cv-words'),chk=el.querySelector('.av-chk'),q=el.querySelector('.av-q2');
   const draw=()=>{box.innerHTML=W.map((w,i)=>`<div class="cv-word"><span class="cv-n">${i+1}</span><div class="cv-syls" lang="es" role="group" aria-label="Paraula ${i+1}">${w.plain.map((s,j)=>{const on=st[i].t===j;
     return`<button class="cv-syl${on?' ton':''}" data-i="${i}" data-j="${j}" aria-pressed="${on}"${phase?' disabled':''}>${on&&st[i].til?addT(s):s}</button>`}).join('')}</div></div>`).join('');
    box.querySelectorAll('.cv-syl').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,j=+b.dataset.j,s=st[i];
     if(s.t!==j){s.t=j;s.til=false}else if(!s.til)s.til=true;else s.t=-1;draw()});
    chk.disabled=!!phase||st.some(s=>s.t<0)};
   const stepsW=w=>[`Separamos «${w.disp}» en sílabas: ${w.plain.join(' - ')}.`,`La sílaba que suena más fuerte es <b>${w.plain[w.ton]}</b>: es una palabra <b>${TIP[w.tipo]}</b>${w.kind?` y tiene ${w.kind==='h'?'un <b>hiato</b>':'un <b>diptongo</b>'}`:''}.`,
    w.forced?HI_RULE:RULE_ES[w.tipo]+(w.tipo<2?` «${w.disp}» acaba en ${endsIn(w)}.`:''),`Por eso se escribe <b>${w.word}</b>.`,'Haz lo mismo con cada palabra: primero la sílaba tónica y después la regla.'];
   chk.onclick=()=>{const errs=[];let code=null,first=null;
    W.forEach((w,i)=>{const s=st[i],sy=w.plain[s.t];if(s.t!==w.ton){errs.push(`a «${w.disp}» has marcat «${sy}» com a tònica, però no és la que sona més forta`);code=code||'cs_av_tonica'}
     else if(w.tilde&&!s.til){errs.push(w.forced?`«${w.disp}» té la síl·laba tònica bé, però la i (o la u) tònica al costat d'una vocal oberta fa hiat i porta tilde sempre`:`«${w.disp}» és ${TIP_CA[w.tipo]}${w.tipo<2?` i acaba en ${endsIn(w)}`:''}: mira la regla de les ${TIP_PL[w.tipo]}`);code=code||(w.forced?'cs_av_hiato':'cs_tilde_falta')}
     else if(!w.tilde&&s.til){errs.push(`«${w.disp}» és ${TIP_CA[w.tipo]} i acaba en ${endsIn(w)}: amb aquesta terminació, no porta tilde`);code=code||'cs_tilde_sobra'}
     else return;bad.add(i);if(first===null)first=i});
    if(!errs.length){phase=1;draw();api.restart();ask();return}
    const r=api.fail({err:code,k:code==='cs_av_hiato'&&SK.cs_hiatos?'cs_hiatos':undefined,steps:stepsW(W[first]),msg:`<b>La porta de la torre no s'obre.</b> ${cap(errs.join('; '))}.`});
    if(r==='retry'){W.forEach((w,i)=>{const s=st[i];if(s.t!==w.ton||s.til!==w.tilde){s.t=-1;s.til=false}});draw()}};
   // 2a part: el tipus de paraula (o diftong / hiat), escrit
   function ask(){const cand=W.map((w,i)=>i).filter(i=>!bad.has(i)),pickI=a=>pick(a.length?a:W.map((w,i)=>i));
    const hiI=W.map((w,i)=>i).filter(i=>W[i].kind),dh=api.ks.includes('cs_hiatos')&&hiI.length&&(!api.ks.includes('cs_acentuacion')||Math.random()<.5);
    const hiOk=hiI.filter(x=>!bad.has(x)),i=dh?pick(hiOk.length?hiOk:hiI):pickI(cand),w=W[i];
    q.innerHTML=`<div class="av-tip ok">${AV.owl(36)}<div>Paraules ben escrites! L'última clau: ${dh?`la paraula «${es('<b>'+w.word+'</b>')}» té <b>diptongo</b> o <b>hiato</b>?`:`com és la paraula «${es('<b>'+w.word+'</b>')}»: aguda, llana, esdrújula o sobresdrújula?`}</div></div>${ans(dh?'Diptongo o hiato':'Aguda, llana, esdrújula...')}`;
    AV.onAnswer(q,v=>{const ok=dh?fold(v)===(w.kind==='h'?'hiato':'diptongo'):TIP_ALT[w.tipo].some(a=>fold(a)===fold(v));
     if(ok){phase=2;q.querySelectorAll('input,button').forEach(x=>x.disabled=true);api.ok({msg:`<b>La torre s'obre!</b> ${W.map(x=>x.word).join(', ')}. «${w.word}» és ${dh?(w.kind==='h'?'un hiato':'un diptongo'):TIP[w.tipo]}.`});return}
     const tw=TIP_ALT.findIndex(a=>a.some(x=>fold(x)===fold(v)));
     if(!dh&&tw<0&&!/hiato|diptongo/.test(fold(v))){api.tip('Escriu <b>aguda</b>, <b>llana</b>, <b>esdrújula</b> o <b>sobresdrújula</b>.','warn');return}
     api.fail({err:dh?'cs_hiato':null,k:dh&&SK.cs_hiatos?'cs_hiatos':undefined,steps:dh?[`Separamos «${w.word}» en sílabas: ${w.syl.join(' - ')}.`,w.kind==='h'?'Las dos vocales seguidas van en <b>sílabas distintas</b>: es un <b>hiato</b>.':'Las dos vocales seguidas van en la <b>misma sílaba</b>: es un <b>diptongo</b>.']:stepsW(w).slice(0,2),
      msg:dh?`Separa «${w.word}» en síl·labes a poc a poc: les dues vocals seguides, van a la mateixa síl·laba o a síl·labes diferents?`:`Has escrit «${esc(v)}». Compta les síl·labes des del final: si la tònica és l'última, és aguda; la penúltima, llana; l'antepenúltima, esdrújula.`});
     const i2=q.querySelector('.av-in');if(i2){i2.value='';i2.focus()}})}
   draw()}};

 /* =====================================================================
    2. El mercado de las palabras (categorías gramaticales)
    ===================================================================== */
 // paraula|etiqueta: s sustantivo, v verbo, a adjetivo, r adverbio, d determinante, p preposición, c conjunción, o pronombre
 const MERC=['El|d perro|s pequeño|a ladra|v mucho|r por|p la|d noche|s','Mi|d abuela|s cocina|v siempre|r unas|d croquetas|s riquísimas|a',
  'Ayer|r compramos|v dos|d melones|s enormes|a en|p el|d mercado|s','Los|d gatos|s negros|a duermen|v tranquilamente|r sobre|p el|d sofá|s',
  'Mañana|r visitaremos|v un|d castillo|s antiguo|a con|p mis|d primos|s','Aquí|r venden|v unas|d naranjas|s dulces|a y|c baratas|a',
  'El|d viento|s helado|a sopla|v hoy|r desde|p el|d norte|s','Nuestro|d equipo|s ganó|v fácilmente|r un|d partido|s difícil|a',
  'Las|d gaviotas|s blancas|a vuelan|v lentamente|r sobre|p el|d puerto|s','Mi|d hermano|s mayor|a nunca|r lee|v novelas|s aburridas|a',
  'Aquellos|d marineros|s valientes|a llegaron|v tarde|r a|p la|d isla|s','El|d panadero|s simpático|a prepara|v pan|s caliente|a temprano|r',
  'Una|d niña|s curiosa|a encontró|v allí|r tres|d monedas|s doradas|a','Los|d turistas|s cansados|a caminan|v despacio|r hacia|p la|d plaza|s',
  'Esta|d frutera|s amable|a regala|v siempre|r cerezas|s rojas|a','La|d reina|s escribe|v cartas|s largas|a cada|d semana|s pacientemente|r'];
 const CN={s:['sustantivos','sustantivo'],v:['verbos','verbo'],a:['adjetivos','adjetivo'],r:['adverbios','adverbio'],d:['determinantes','determinante'],p:['preposiciones','preposición']};
 const CDEF={s:'un sustantivo anomena persones, animals, coses o idees, i hi pots posar «el» o «la» davant',v:'un verbo expressa una acció o un estat i es pot conjugar (yo…, tú…, ellos…)',
  a:'un adjetivo diu com és un sustantivo i canvia de gènere i nombre (alto, alta, altos)',r:'un adverbio diu com, quan, on o quant, i no canvia mai de forma',
  d:'un determinante va just davant del sustantivo per presentar-lo (el, mi, este, dos)',p:'una preposición uneix paraules i no canvia mai (a, con, de, en, sobre)'};
 const CDEF_ES={s:'nombra personas, animales, cosas o ideas; puedes ponerle «el» o «la» delante',v:'expresa una acción o un estado y se conjuga (yo, tú, él...)',
  a:'dice cómo es un sustantivo y cambia de género y número',r:'dice cómo, cuándo, dónde o cuánto, y no cambia nunca',d:'va delante del sustantivo y lo presenta',p:'une palabras y no cambia nunca'};
 const CCOL={s:['--t-castella','--d-castella'],v:['--t-mates','--d-mates'],a:['--t-ciencies','--d-ciencies'],r:['--t-musica','--d-musica'],d:['--t-angles','--d-angles'],p:['--t-catala','--d-catala']};
 const mercado={id:'mercado',nom:'El mercado de las palabras',desc:'Posa cada paraula de la frase a la parada de la seva categoria.',
  skills:['cs_categorias','cs_determinantes','cs_nexos'],
  render(el,api){const L=api.lv,cats=['s','v','a','r'];if(api.ks.includes('cs_determinantes')||L>0)cats.push('d');if(api.ks.includes('cs_nexos')||L>1)cats.push('p');
   let toks,items;do{toks=pick(MERC).split(' ').map(x=>{const[w,t]=x.split('|');return{w,t}});items=toks.map((x,i)=>({...x,i})).filter(x=>cats.includes(x.t))}while(items.length<5||items.length>10);
   const place=items.map(()=>null);let sel=null,fin=false;const order=AV.shuf(items.map((_,j)=>j));
   el.innerHTML=`<p>Al mercat del castell, cada paraula té la seva parada. Posa les paraules de la frase a la parada de la seva <b>categoria</b>: arrossega-les o toca una paraula i després la parada.</p>
    <div class="cv-sent" lang="es">${toks.map(x=>x.w).join(' ')}.</div>
    <div class="cv-tray" lang="es" aria-label="Paraules per posar"></div><div class="cv-drawers"></div>
    <div class="av-row"><button class="av-chk" disabled>Obre les parades</button></div>`;
   const tray=el.querySelector('.cv-tray'),drw=el.querySelector('.cv-drawers'),chk=el.querySelector('.av-chk');
   const chip=j=>`<button class="cv-chip${sel===j?' on':''}" data-j="${j}" aria-pressed="${sel===j}"${fin?' disabled':''}>${items[j].w}</button>`;
   const draw=()=>{tray.innerHTML=order.filter(j=>place[j]===null).map(chip).join('');
    drw.innerHTML=cats.map(c=>`<div class="cv-drw" data-c="${c}" style="--t:var(${CCOL[c][0]});--d:var(${CCOL[c][1]})" role="button" tabindex="0" aria-label="Parada de ${CN[c][0]}"><b>${CN[c][0]}</b><div class="cv-in" lang="es">${order.filter(j=>place[j]===c).map(chip).join('')}</div></div>`).join('');
    el.querySelectorAll('.cv-chip').forEach(b=>b.onclick=e=>{e.stopPropagation();if(justDragged(el)||fin)return;const j=+b.dataset.j;sel=sel===j?null:j;draw()});
    drw.querySelectorAll('.cv-drw').forEach(d=>{const go=()=>{if(sel===null||fin)return;place[sel]=d.dataset.c;sel=null;draw()};d.onclick=go;d.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}}});
    chk.disabled=fin||place.some(p=>p===null)};
   tray.onclick=()=>{if(sel!==null&&place[sel]!==null&&!fin){place[sel]=null;sel=null;draw()}};
   hdrag(el,{chip:'.cv-chip',target:'.cv-drw,.cv-tray',disabled:()=>fin,onDrop(b,t){if(!t)return draw();const j=+b.dataset.j;place[j]=t.classList.contains('cv-tray')?null:t.dataset.c;sel=null;draw()}});
   chk.onclick=()=>{const bad=items.map((x,j)=>place[j]!==x.t);
    if(!bad.some(Boolean)){fin=true;draw();api.ok({msg:`<b>Totes les parades en ordre!</b> ${cats.filter(c=>items.some(x=>x.t===c)).map(c=>`${CN[c][0]}: ${es(items.filter(x=>x.t===c).map(x=>x.w).join(', '))}`).join(' · ')}.`});return}
    const wr=items.map((x,j)=>j).filter(j=>bad[j]);
    const msg=wr.slice(0,3).map(j=>`«${es(items[j].w)}» l'has posat a <b>${CN[place[j]][0]}</b>, però ${CDEF[place[j]]}. Ho fa, «${es(items[j].w)}», en aquesta frase?`).join(' ');
    const r=api.fail({err:'cs_categoria',k:SK.cs_categorias?'cs_categorias':undefined,msg:`<b>Hi ha paraules a una parada equivocada${wr.length>1?` (${wr.length})`:''}.</b> ${msg}`,
     steps:[...wr.slice(0,3).map(j=>`«${items[j].w}» es un <b>${CN[items[j].t][1]}</b>: ${CDEF_ES[items[j].t]}.`),'Con cada palabra, haz la prueba: ¿puedo ponerle «el» delante? ¿Se conjuga? ¿Dice cómo es algo? ¿Cambia de forma?']});
    if(r==='retry'){wr.forEach(j=>place[j]=null);sel=null;draw()}};
   draw()}};

 /* =====================================================================
    3. La muralla del sujeto (sujeto y predicado; sujeto omitido)
    ===================================================================== */
 // [singular, plural, nucli singular, nucli plural]
 const SUJ=[['mi hermana','mis hermanas','hermana','hermanas'],['la profesora nueva','las profesoras nuevas','profesora','profesoras'],['nuestro vecino','nuestros vecinos','vecino','vecinos'],
  ['el abuelo de Marta','los abuelos de Marta','abuelo','abuelos'],['un niño de quinto','unos niños de quinto','niño','niños'],['mi primo pequeño','mis primos pequeños','primo','primos'],
  ['la cocinera del castillo','las cocineras del castillo','cocinera','cocineras'],['el caballero valiente','los caballeros valientes','caballero','caballeros']];
 // verb: [3a sg, 3a pl, 1a pl, 2a pl]
 const PRED=[{v:['juega','juegan','jugamos','jugáis'],r:'al fútbol',f:'por la tarde'},{v:['pinta','pintan','pintamos','pintáis'],r:'un mural enorme',f:'en el patio'},
  {v:['llegó','llegaron','llegamos','llegasteis'],r:'tarde a la fiesta',f:'ayer'},{v:['prepara','preparan','preparamos','preparáis'],r:'una sorpresa',f:'esta semana'},
  {v:['canta','cantan','cantamos','cantáis'],r:'canciones alegres',f:'cada domingo'},{v:['visitó','visitaron','visitamos','visitasteis'],r:'el castillo',f:'el sábado'},
  {v:['come','comen','comemos','coméis'],r:'paella',f:'los domingos'}];
 const GEXP=['me','te','a mi hermano le','a nosotros nos','a mis amigas les','a la reina le'];
 const GTH=[['el chocolate','chocolate',0],['la música rock','música',0],['el teatro','teatro',0],['las películas de miedo','películas',1],['los cómics de aventuras','cómics',1],['las fresas con nata','fresas',1]];
 const PRON=[null,null,['nosotros','nosotras'],['vosotros','vosotras']];
 function oracion(L){const ty=pick(L>0?['n','n','f','o','g']:['n','n','f','o','o']);const w=[];let subj=[],exp=[],verb,o={ty};
  const add=(s,role)=>s.split(' ').forEach(x=>{if(role==='s')subj.push(w.length);if(role==='e')exp.push(w.length);if(role==='v')verb=w.length;w.push(x)});
  if(ty==='g'){const e=pick(GEXP),th=pick(GTH),vb=pick([['gusta','gustan'],['encanta','encantan']]);add(e,'e');add(vb[th[2]],'v');add(th[0],'s');
   Object.assign(o,{nuc:th[1],vf:vb,n:th[2],st:th[0]})}
  else{const S=pick(SUJ),P=pick(PRED),n=rnd(0,1);
   if(ty==='o'){const p=rnd(2,3);add(P.f,'x');add(P.v[p],'v');add(P.r,'x');Object.assign(o,{pron:PRON[p],p,P})}
   else{if(ty==='f'){add(P.f,'x');add(P.v[n],'v');add(S[n],'s');add(P.r,'x')}else{add(S[n],'s');add(P.v[n],'v');add(P.r,'x')}
    Object.assign(o,{nuc:S[2+n],n,S,P,st:S[n]})}}
  w[0]=cap(w[0]);w[w.length-1]+='.';return Object.assign(o,{w,subj,exp,verb,vb:w[verb].replace('.','')})}
 const muralla={id:'muralla',nom:'La muralla del sujeto',desc:'Marca el subjecte de cada oració per obrir la porta de la muralla.',
  skills:['cs_sujeto'],
  render(el,api){const O=oracion(api.lv),sel=new Set();let om=false,phase=0;
   el.innerHTML=`<p>El guarda de la muralla només deixa passar qui troba el <b>subjecte</b>. Toca totes les paraules que formen el subjecte. Si l'oració no en té d'escrit, toca «Subjecte omès».</p>
    <div class="cv-toks" lang="es"></div><div class="av-row"><button class="cv-om" aria-pressed="false">Subjecte omès</button><button class="av-chk" disabled>Comprova el subjecte</button></div><div class="av-q2"></div>`;
   const tk=el.querySelector('.cv-toks'),omB=el.querySelector('.cv-om'),chk=el.querySelector('.av-chk'),q=el.querySelector('.av-q2');
   const draw=()=>{tk.innerHTML=O.w.map((x,i)=>`<button class="cv-tok${sel.has(i)?' on':''}" data-i="${i}" aria-pressed="${sel.has(i)}"${phase?' disabled':''}>${x}</button>`).join('');
    tk.querySelectorAll('.cv-tok').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);om=false;draw()});
    omB.classList.toggle('on',om);omB.setAttribute('aria-pressed',om);omB.disabled=!!phase;chk.disabled=!!phase||(!om&&!sel.size)};
   omB.onclick=()=>{om=!om;if(om)sel.clear();draw()};
   const words=a=>a.map(i=>O.w[i].replace('.','')).join(' ');
   const steps=()=>O.ty==='o'?[`Buscamos el verbo: «${O.vb}».`,`Termina en <b>${O.p===2?'-mos':'-is'}</b>: es la ${O.p===2?'1.ª':'2.ª'} persona del plural.`,`Ninguna palabra de la oración concuerda con él: el sujeto está <b>omitido</b>. Es <b>${O.pron[0]}</b> (o ${O.pron[1]}).`]
    :O.ty==='g'?[`Buscamos el verbo: «${O.vb}».`,`Le preguntamos: ¿qué ${O.vb}? → «${O.st}». Eso es el <b>sujeto</b>.`,`Con «gustar» o «encantar», el verbo concuerda con lo que gusta: «${O.vf[0]}» en singular, «${O.vf[1]}» en plural. La persona (${words(O.exp)}) no es el sujeto.`,`El núcleo del sujeto es el sustantivo: <b>${O.nuc}</b>.`]
    :[`Buscamos el verbo: «${O.vb}».`,`Le preguntamos: ¿quién ${O.vb}? → «${O.st}». Ese es el <b>sujeto</b>${O.ty==='f'?', aunque vaya detrás del verbo':''}.`,`Concordancia: si lo cambiamos de número, el verbo también cambia: «${O.S[1-O.n]}» → «${O.P.v[1-O.n]}».`,`El núcleo del sujeto es el sustantivo: <b>${O.nuc}</b>.`];
   chk.onclick=()=>{const S=O.subj,eq=!om&&sel.size===S.length&&S.every(i=>sel.has(i));
    if((O.ty==='o'&&om)||(O.ty!=='o'&&eq)){phase=1;draw();api.clear();api.restart();ask();return}
    const sw=`«${es(words([...sel].sort((a,b)=>a-b)))}»`;let msg,err=null;
    if(om)msg=`Aquesta oració <b>sí</b> que té el subjecte escrit. Busca el verb «${es(O.vb)}» i pregunta-li: ¿quién…? o ¿qué…?`;
    else if(O.ty==='o')msg=`Has marcat ${sw}, però no concorda amb el verb «${es(O.vb)}»: si preguntes al verb «¿quién…?», la resposta no és aquesta. Fixa't en la terminació del verb.`;
    else if(sel.has(O.verb))msg=`Has marcat el verb «${es(O.vb)}». El verb és el nucli del predicat: no forma part del subjecte.`;
    else if(O.ty==='g'&&O.exp.some(i=>sel.has(i))){err='cs_sujeto_gustar';msg=`Has marcat ${sw}. ${ERR.cs_sujeto_gustar.kid}`}
    else if([...sel].every(i=>S.includes(i)))msg=`Hi falta alguna paraula: el subjecte és tot el grup que va amb el nom (també els determinants i els complements del nom).`;
    else if(S.every(i=>sel.has(i)))msg=`Has marcat paraules de més: «${es(words([...sel].filter(i=>!S.includes(i)).sort((a,b)=>a-b)))}» no forma part del subjecte. Pregunta al verb: ¿quién…?`;
    else msg=`${sw} no és el subjecte. Fes la prova de la concordança: si canvies el subjecte de singular a plural, el verb «${es(O.vb)}» també ha de canviar.`;
    const r=api.fail({err,steps:steps(),msg:`<b>La porta no s'obre.</b> ${msg}`});
    if(r==='retry'){sel.clear();om=false;draw()}};
   function ask(){const o=O.ty==='o';
    q.innerHTML=`<div class="av-tip ok">${AV.owl(36)}<div>${o?`Molt bé: el subjecte és omès. Quin <b>pronom personal</b> seria el subjecte de «${es(O.vb)}»?`:`Molt bé: el subjecte és «${es(O.st)}». Escriu-ne el <b>nucli</b> (la paraula més important del subjecte).`}</div></div>${ans(o?'Sujeto omitido':'Núcleo del sujeto')}`;
    AV.onAnswer(q,v=>{const okA=o?O.pron:[O.nuc];
     if(okA.some(a=>fold(a)===fold(v))){phase=2;q.querySelectorAll('input,button').forEach(x=>x.disabled=true);api.ok({msg:`<b>La muralla s'obre!</b> ${o?`El subjecte omès de «${es(O.vb)}» és ${es(O.pron[0])}.`:`Subjecte: «${es(O.st)}»; nucli: ${es(O.nuc)}.`}`});return}
     let msg;if(fold(v)===fold(O.vb))msg=`«${esc(v)}» és el verb: és el nucli del <b>predicat</b>. El nucli del subjecte és un nom.`;
     else if(!o&&O.subj.some(i=>fold(O.w[i])===fold(v)))msg=`«${esc(v)}» forma part del subjecte, però no n'és la paraula més important. El nucli és el <b>sustantivo</b>: la paraula que concorda amb el verb.`;
     else if(o)msg=`Fixa't en la terminació del verb «${es(O.vb)}»: -mos → nosotros; -is → vosotros.`;
     else msg=`El nucli ha de ser una paraula del subjecte «${es(O.st)}»: el nom que concorda amb el verb.`;
     api.fail({err:o?'cs_persona':null,steps:steps(),msg});const i2=q.querySelector('.av-in');if(i2){i2.value='';i2.focus()}})}
   draw()}};

 /* =====================================================================
    4. La máquina de los verbos (conjugación, irregulares, tiempos)
    ===================================================================== */
 const GEAR=c=>`<svg viewBox="0 0 44 44" aria-hidden="true"><path d="M22 3l3 5 6-2 1 6 6 1-2 6 5 3-5 3 2 6-6 1-1 6-6-2-3 5-3-5-6 2-1-6-6-1 2-6-5-3 5-3-2-6 6-1 1-6 6 2Z" fill="${c}"/><circle cx="22" cy="22" r="6" fill="#fff"/></svg>`;
 const ALLT=['pres','imp','pps','fut','cond','ppc','plus','futc','subj'];
 const IRRF=[{i:1,t:'pres',p:0},{i:2,t:'pps',p:0},{i:3,t:'pps',p:2},{i:4,t:'fut',p:0},{i:5,t:'part'}];
 function verbItem(L,irr){
  if(irr){let r,f,form,reg;do{r=pick(CS.IRR);f=pick(IRRF);form=r[f.i];reg=f.t==='part'?CS.part(r[0]):CS.conj(r[0],f.t)[f.p]}while(CS.strip(form)===CS.strip(reg));
   return{irr:true,inf:r[0],t:f.t,p:f.p,ans:form,reg,r}}
  const ts=L===0?['pres','imp','pps','fut']:L===1?['pres','imp','pps','fut','cond','ppc']:ALLT;const inf=pick(CS.VERBS)[0],t=pick(ts),p=rnd(0,5);
  return{inf,t,p,ans:CS.conj(inf,t)[p]}}
 const maquina={id:'maquina',nom:'La máquina de los verbos',desc:'La màquina demana formes verbals: escriu-les ben conjugades.',
  skills:['cs_conjugar','cs_irregulares','cs_tiempos'],
  render(el,api){const L=api.lv,ks=api.ks,irrOn=ks.includes('cs_irregulares')||L>0,onlyIrr=api.k==='cs_irregulares';
   const items=[verbItem(L,onlyIrr),verbItem(L,irrOn)];
   if(items[0].inf===items[1].inf)items[1]=verbItem(L,irrOn);
   let tq=null;if(ks.includes('cs_tiempos')||L>1){let inf,t,p,f,ok;do{inf=pick(CS.VERBS)[0];t=pick(ALLT);p=rnd(0,5);f=CS.conj(inf,t)[p];ok=ALLT.every(t2=>t2===t||!CS.conj(inf,t2).includes(f))}while(!ok);tq={inf,t,p,f}}
   let step=0;const done=[];
   el.innerHTML=`<p>La màquina del castell fabrica <b>formes verbals</b>. Mira el que demana cada finestra i escriu la forma ben escrita (amb tilde, si en porta).</p>
    <div class="cv-mach"><div class="cv-wins"></div><div class="cv-gears">${GEAR('#8B6CF0')}<div class="cv-tickets" lang="es"></div>${GEAR('#F2853A')}</div></div><div class="av-q2"></div>`;
   const wins=el.querySelector('.cv-wins'),gears=el.querySelector('.cv-gears'),tix=el.querySelector('.cv-tickets'),q=el.querySelector('.av-q2');
   const N=items.length+(tq?1:0);
   const win=(a,b)=>`<div class="cv-win"><small>${a}</small><b lang="es">${b}</b></div>`;
   const spin=()=>{gears.classList.remove('spin');void gears.offsetWidth;gears.classList.add('spin')};
   const stepsOf=it=>{if(it.irr){const r=it.r;return[`«${it.inf}» es un verbo <b>irregular</b>: cambia la raíz o la terminación.`,`Si fuera regular diríamos «${it.reg}», pero eso no es correcto.`,`La forma correcta es <b>${it.ans}</b>. Apréndela con las demás: yo ${r[1]}, yo ${r[2]}, él ${r[3]}, yo ${r[4]}, participio ${r[5]}.`]}
    const c=CS.conjOf(it.inf),stem=it.inf.slice(0,-2),pers=CS.PERS[it.p];
    if(CS.COMPUESTOS.includes(it.t))return[`«${it.inf}» es de la ${CS.MODEL[c]}.`,`El ${CS.T[it.t]} es un tiempo <b>compuesto</b>: verbo haber (<b>${CS.HAB[it.t][it.p]}</b>) + participio (<b>${CS.part(it.inf)}</b>).`,`Resultado: ${pers} <b>${it.ans}</b>.`];
    if(it.t==='fut'||it.t==='cond'){const base=CS.strip(it.inf);return[`«${it.inf}» es de la ${CS.MODEL[c]}.`,`El ${CS.T[it.t]} se forma con el <b>infinitivo entero</b> (${base}) + la terminación <b>-${it.ans.slice(base.length)}</b>.`,`Resultado: ${pers} <b>${it.ans}</b>.`]}
    return[`«${it.inf}» es de la ${CS.MODEL[c]}. Su raíz es <b>${stem}-</b>.`,`En ${CS.T[it.t]}, la persona «${pers}» termina en <b>-${it.ans.slice(stem.length)}</b>.`,`Resultado: ${it.t==='subj'?'que ':''}${pers} <b>${it.ans}</b>.`]};
   function show(){const it=step<items.length?items[step]:null;
    wins.innerHTML=it?win('Verbo',it.inf)+win('Persona',it.t==='part'?'—':CS.PERS[it.p])+win('Tiempo',it.t==='part'?'participio':CS.T[it.t]):win('Forma',tq.f)+win('Verbo',tq.inf)+win('Tiempo','?');
    q.innerHTML=`<p class="muted" style="margin:8px 0 0;font-size:14px">Comanda ${step+1} de ${N}</p>${ans(it?(it.t==='part'?'Escriu el participi':it.t==='subj'?'Escriu la forma (sense «que»)':'Escriu la forma verbal'):`En quin temps verbal està «${tq.f}»?`)}`;
    AV.onAnswer(q,v=>check(v))}
   function next(txt){done.push(txt);tix.innerHTML=done.map(x=>`<span class="cv-ticket">✓ ${x}</span>`).join('');spin();step++;
    if(step<N){api.clear();api.restart();show();return}
    q.innerHTML='';api.ok({msg:`<b>La màquina funciona!</b> ${done.join(' · ')}.`})}
   function check(raw){const i2=q.querySelector('.av-in'),clear=()=>{if(i2){i2.value='';i2.focus()}};
    if(step>=items.length){const ok=CS.T_ALT[tq.t].some(a=>fold(a)===fold(raw));if(ok)return next(`${tq.f}: ${CS.T[tq.t]}`);
     const named=ALLT.find(t2=>CS.T_ALT[t2].some(a=>fold(a)===fold(raw)));
     api.fail({err:named?'cs_tiempo_nombre':null,k:SK.cs_tiempos?'cs_tiempos':undefined,msg:named?`«${es(tq.f)}» no és ${CS.T[named]}. Fixa't en la terminació (-aba, -ía, -é, -ré, -ría...) i en si porta «haber» davant.`:`Escriu el nom d'un temps verbal (per exemple, <b>pretérito imperfecto</b>).`,
      steps:[`«${tq.f}» es del verbo «${tq.inf}», persona «${CS.PERS[tq.p]}».`,CS.COMPUESTOS.includes(tq.t)?`Lleva el verbo haber (${CS.HAB[tq.t][tq.p]}) + participio: es un tiempo compuesto.`:'No lleva haber: es un tiempo simple. Mira la terminación.',`Es el <b>${CS.T[tq.t]}</b>.`]});clear();return}
    const it=items[step],v=norm(raw).replace(/^que /,'');
    if(v===norm(it.ans))return next(`${it.t==='part'?'participio de '+it.inf:CS.PERS[it.p].split(' / ')[0]}: ${it.ans}`);
    let err=null,msg;
    if(CS.strip(v)===CS.strip(it.ans)){err='cs_verbo_tilde';msg=ERR.cs_verbo_tilde.kid}
    else if(it.irr&&CS.strip(v)===CS.strip(it.reg)){err='cs_irregular';msg=`Has escrit «${esc(v)}». ${ERR.cs_irregular.kid}`}
    else if(!it.irr){const fs=CS.conj(it.inf,it.t),j=fs.indexOf(v),t2=ALLT.find(x=>x!==it.t&&CS.conj(it.inf,x)[it.p]===v);
     if(j>=0){err='cs_persona';msg=`«${esc(v)}» és la forma de <b>${CS.PERS[j]}</b>, i la màquina demana <b>${CS.PERS[it.p]}</b>.`}
     else if(t2){err=t2==='subj'||it.t==='subj'?'cs_modo':'cs_tiempo';msg=`«${esc(v)}» és el ${CS.T[t2]}, i la màquina demana el <b>${CS.T[it.t]}</b>.`}}
    if(!msg)msg=`«${esc(v)}» no és la forma que demana la màquina. ${it.irr?`«${es(it.inf)}» és un verb irregular: pensa com el dius quan parles.`:`Busca l'arrel del verb i posa-hi la terminació del ${CS.T[it.t]}.`}`;
    api.fail({err,k:it.irr&&SK.cs_irregulares?'cs_irregulares':undefined,msg,steps:stepsOf(it)});clear()}
   show()}};

 /* =====================================================================
    5. La carta del rey (b/v, g/j, h, ll/y)
    ===================================================================== */
 // [frase amb {paraula}, paraula mal escrita, família, norma (CS.REGLAS), codi d'error]
 const CARTA=[['Ayer {recibí} una carta del rey.','reciví','bv','bir','cs_bv'],['Los guardias {estuvieron} toda la noche en la torre.','estubieron','bv','ir','cs_bv'],
  ['De pequeños {jugábamos} en el patio del castillo.','jugávamos','bv','aba','cs_bv'],['La princesa lleva un vestido {blanco} precioso.','vlanco','bv','bl','cs_bv'],
  ['El mago tiene un caballo muy {activo} y rápido.','actibo','bv','ivo','cs_bv'],['Queremos {evitar} problemas con el dragón.','ebitar','bv','eva','cs_bv'],
  ['En {invierno} el agua del foso se congela.','inbierno','bv','mb','cs_bv'],['El rey quiere {elegir} un caballero nuevo.','elejir','gj','ger','cs_gj'],
  ['Preparamos el {equipaje} para la excursión.','equipage','gj','aje','cs_gj'],['El {relojero} arregló el reloj de la torre.','relogero','gj','jero','cs_gj'],
  ['En clase de {geografía} estudiamos los ríos.','jeografía','gj','geo','cs_gj'],['Los mercaderes {trajeron} telas de colores.','trageron','gj','dije','cs_gj'],
  ['El castillo está lleno de {magia} y secretos.','majia','gj','gia','cs_gj'],['La reina es muy {inteligente} y justa.','intelijente','gj','gen','cs_gj'],
  ['En enero hay {hielo} en el foso.','ielo','h','hie','cs_h_falta'],['El {humo} sale por la chimenea de la cocina.','umo','h','hum','cs_h_falta'],
  ['El rey {había} perdido su corona.','abía','h','verb','cs_h_falta'],['Por la ventana entró un {búho} enorme.','búo','h','int','cs_h_falta'],
  ['La cocinera manda {echar} sal a la sopa.','hechar','h','no','cs_hechar'],['El caballero {hizo} una reverencia.','izo','h','verb','cs_h_falta'],
  ['Un {pasillo} muy largo lleva a la torre.','pasiyo','lly','illo','cs_lly'],['Las estrellas {brillan} sobre el castillo.','briyan','lly','llar','cs_lly'],
  ['El ladrón {huyó} por el bosque.','hulló','lly','uyo','cs_lly'],['Los albañiles {construyeron} la muralla.','construlleron','lly','uyo','cs_lly'],
  ['Una {ardilla} sube por el árbol del jardín.','ardiya','lly','illo','cs_lly']];
 const FAM_SK={bv:'cs_bv',gj:'cs_gj',h:'cs_h',lly:'cs_lly'},FAM_TXT={bv:'b / v',gj:'g / j',h:'h',lly:'ll / y'};
 const carta={id:'carta',nom:'La carta del rey',desc:'El rei ha escrit una carta amb presses: troba les faltes i corregeix-les.',
  skills:['cs_bv','cs_gj','cs_h','cs_lly'],
  render(el,api){const L=api.lv,nS=L===0?3:4,nW=L===0?2:3;
   // famílies dels temes de la sessió (si no n'hi ha cap, totes)
   let fams=api.ks.map(k=>Object.keys(FAM_SK).find(f=>FAM_SK[f]===k)).filter(Boolean);if(!fams.length)fams=Object.keys(FAM_SK);
   const pool=AV.shuf(CARTA.filter(c=>fams.includes(c[2]))),rest=AV.shuf(CARTA.filter(c=>!fams.includes(c[2])));
   const S=[];for(const c of pool.concat(rest)){if(S.length>=nS)break;if(S.filter(x=>x[2]===c[2]).length<2||pool.length+rest.length<=nS)S.push(c)}
   const wrongIdx=new Set(AV.shuf(S.map((_,i)=>i).filter(i=>fams.includes(S[i][2]))).concat(AV.shuf(S.map((_,i)=>i).filter(i=>!fams.includes(S[i][2])))).slice(0,nW));
   // fitxes: {w, p (puntuació), t: índex de frase si és la paraula objectiu, good, bad}
   const toks=[];S.forEach((c,si)=>{c[0].split(' ').forEach(x=>{const m=x.match(/^\{(.+)\}([.,]?)$/);
    if(m)toks.push({w:wrongIdx.has(si)?c[1]:m[1],p:m[2],t:si,good:m[1]});else{const mm=x.match(/^(.+?)([.,]?)$/);toks.push({w:mm[1],p:mm[2]})}})});
   const ed=toks.map(()=>null);let sel=null,fin=false;
   el.innerHTML=`<p>El rei ha escrit aquesta carta amb molta pressa i hi ha <b>${nW} faltes</b> d'ortografia (${list([...new Set(S.map(c=>FAM_TXT[c[2]]))])}). Toca cada paraula mal escrita i escriu-la bé.</p>
    <div class="cv-carta" lang="es"></div><div class="cv-edit"></div>
    <div class="av-row"><button class="av-chk" disabled>Envia la carta</button></div>`;
   const box=el.querySelector('.cv-carta'),edit=el.querySelector('.cv-edit'),chk=el.querySelector('.av-chk');
   const cur=i=>ed[i]===null?toks[i].w:ed[i];
   const draw=()=>{box.innerHTML=`<span class="cv-sal">Querida cocinera:</span><br>${toks.map((x,i)=>`<button class="cv-w${ed[i]!==null?' ed':''}${sel===i?' sel':''}" data-i="${i}"${fin?' disabled':''}>${cur(i)}</button>${x.p}`).join(' ')}<br><span class="cv-sal">El rey</span>`;
    box.querySelectorAll('.cv-w').forEach(b=>b.onclick=()=>{sel=+b.dataset.i;draw();openEdit()});chk.disabled=fin||ed.every(x=>x===null)};
   function openEdit(){if(sel===null){edit.innerHTML='';return}const i=sel;
    edit.innerHTML=ans(`Corregeix «${esc(toks[i].w)}» (si ja és correcta, deixa-la igual)`,'Escriu-la ben escrita','D\'acord')+(ed[i]!==null?'<div class="av-row"><button class="sec cv-undo">Torna a la paraula original</button></div>':'');
    const inp=edit.querySelector('.av-in');inp.value=cur(i);inp.select&&inp.select();
    AV.onAnswer(edit,v=>{v=v.trim().replace(/[.,;:]+$/,'');ed[i]=v===toks[i].w?null:v;sel=null;edit.innerHTML='';draw()});
    const u=edit.querySelector('.cv-undo');if(u)u.onclick=()=>{ed[i]=null;sel=null;edit.innerHTML='';draw()}}
   chk.onclick=()=>{const T=toks.map((x,i)=>({x,i}));
    const missing=T.filter(o=>o.x.t!==undefined&&wrongIdx.has(o.x.t)&&ed[o.i]===null);
    const badFix=T.filter(o=>o.x.t!==undefined&&wrongIdx.has(o.x.t)&&ed[o.i]!==null&&norm(ed[o.i])!==norm(o.x.good));
    const spoiled=T.filter(o=>!(o.x.t!==undefined&&wrongIdx.has(o.x.t))&&ed[o.i]!==null&&norm(ed[o.i])!==norm(o.x.w));
    if(!missing.length&&!badFix.length&&!spoiled.length){fin=true;sel=null;edit.innerHTML='';draw();
     api.ok({msg:`<b>Carta enviada sense faltes!</b> ${[...wrongIdx].map(si=>`${es(S[si][1])} → <b>${es(S[si][0].match(/\{(.+)\}/)[1])}</b>`).join(' · ')}.`});return}
    const parts=[];
    badFix.forEach(o=>parts.push(CS.strip(norm(ed[o.i]))===CS.strip(norm(o.x.good))?`«${esc(ed[o.i])}» té les lletres bé, però mira la tilde`:`«${esc(ed[o.i])}» encara no està ben escrita`));
    spoiled.forEach(o=>parts.push(`«${es(o.x.w)}» ja estava ben escrita, i l'has canviada per «${esc(ed[o.i])}»`));
    if(missing.length)parts.push(`encara ${missing.length===1?'queda <b>1 falta</b>':`queden <b>${missing.length} faltes</b>`} per trobar`);
    const firstBad=(badFix[0]||missing[0]);const err=firstBad?S[firstBad.x.t][4]:null;
    const wr=[...wrongIdx];
    const r=api.fail({err,k:firstBad&&SK[FAM_SK[S[firstBad.x.t][2]]]?FAM_SK[S[firstBad.x.t][2]]:undefined,msg:`<b>La carta encara no es pot enviar.</b> ${cap(parts.join('; '))}.`,
     steps:[...wr.map(si=>{const c=S[si];return`«${c[1]}» → <b>${c[0].match(/\{(.+)\}/)[1]}</b>. ${CS.REGLAS[c[2]][c[3]]}`}),'Antes de escribir, piensa en la regla o en una palabra de la misma familia.']});
    if(r==='retry'){badFix.concat(spoiled).forEach(o=>ed[o.i]=null);sel=null;edit.innerHTML='';draw()}};
   draw()}};

 /* ---------- l'illa ---------- */
 const DECO=`<path d="M14 100q56-30 128 0Z" fill="#9AA6B2"/>
  <rect x="38" y="52" width="80" height="46" fill="#E8D9C0"/><rect x="28" y="34" width="24" height="64" fill="#DCC9A8"/><rect x="104" y="34" width="24" height="64" fill="#DCC9A8"/>
  <path d="M28 34h6v-7h6v7h6v-7h6v7" fill="#DCC9A8"/><path d="M104 34h6v-7h6v7h6v-7h6v7" fill="#DCC9A8"/><path d="M38 52h8v-6h8v6h8v-6h8v6h8v-6h8v6h8v-6h8v6" fill="#E8D9C0"/>
  <path d="M68 98v-20a10 10 0 0 1 20 0v20Z" fill="#8E5A2B"/><path d="M40 27v-17" stroke="#6E6B85" stroke-width="2"/><path d="M40 10h14l-4 4 4 4h-14Z" fill="#F2853A"/><path d="M116 27v-17" stroke="#6E6B85" stroke-width="2"/><path d="M116 10h14l-4 4 4 4h-14Z" fill="#8B6CF0"/>
  <rect x="34" y="50" width="6" height="9" rx="3" fill="#8E7A5B"/><rect x="110" y="50" width="6" height="9" rx="3" fill="#8E7A5B"/>
  <g transform="translate(624,258)"><path d="M0 22h62v38H0Z" fill="#E2A15F"/><path d="M-6 22l8-20h58l10 20Z" fill="#F7B6A3"/><path d="M8 2l-4 20M22 2l-1 20M36 2l1 20M50 2l4 20" stroke="#fff" stroke-width="5"/><circle cx="14" cy="18" r="0"/>
   <circle cx="14" cy="32" r="6" fill="#F2853A"/><circle cx="28" cy="32" r="6" fill="#E8564A"/><circle cx="44" cy="32" r="6" fill="#9DD18A"/></g>
  <circle cx="230" cy="290" r="14" fill="#9DD18A"/><circle cx="470" cy="160" r="18" fill="#9DD18A"/><circle cx="560" cy="300" r="12" fill="#9DD18A"/>
  <path d="M600 40q20 -10 40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/><path d="M200 30q16 -8 32 0" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>`;
 (ILLES.castella=ILLES.castella||[]).push({id:'castillo-palabras',nom:'El Castillo de las Palabras',
  mapa:{mar:'#BFE6F5',sorra:'#F6E3B4',herba:'#D9EDC2',deco:DECO},
  segell:{nom:'El puente levadizo',desc:'Un repte escrit, sense pistes i amb un sol intent.',txt:'«Responde sin ayuda y bajaré el puente levadizo.»'},
  estacions:[torre,mercado,muralla,maquina,carta]});
})();
