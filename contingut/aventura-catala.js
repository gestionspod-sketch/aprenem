/* Aprenem - LLENGUA CATALANA: illa de l'aventura interactiva («L'Illa de les Paraules»)
   Part de l'app d'estudi. Vegeu CLAUDE.md (secció «Aventura: motor i illes») per a l'API del motor.
   Un poble mariner amb moll, torre del rellotge, taller, barques i un far amb biblioteca.
   Estacions (la resposta queda amagada fins que es comprova; les respostes finals s'escriuen):
     1. El moll de les frases      — carregar al carro les paraules del subjecte i fer concordar el verb
                                     (ca_subjecte, ca_sintagma_nominal)
     2. La torre de les síl·labes  — tallar una paraula en síl·labes, dir si és aguda, plana o esdrúixola
                                     i escriure-la ben accentuada (ca_accent, ca_diftongs)
     3. El taller de paraules      — enganxar un prefix o un sufix i escriure la paraula derivada
                                     (ca_derivacio, ca_prefixos)
     4. La barca dels pronoms      — carregar el complement a la barca i escriure el pronom feble + verb
                                     (ca_febles, ca_cd, ci)
     5. La biblioteca del far      — restaurar les lletres esborrades d'un diari: b/v, g/j, tg/tj, s/ss,
                                     c/ç, m/n, x/ix/tx (ca_consonants, ca_x_ix, ca_m_n)
     Segell (el posa el motor): el guardià del far, exercici escrit sense pistes amb un dels temes de la sessió.
   Totes les frases i paraules són originals. S'accepten les formes balears (cantam, cant, anam...).
   Aquest arxiu afegeix uns quants estils propis (classes cav-...) amb una etiqueta <style>, perquè no toca estil/. */

Object.assign(ERR,{
 ca_av_subj_verb:{kid:'Has posat el verb dins el subjecte. El verb és el centre del predicat; el subjecte és qui fa l\'acció o de qui es parla.',par:'Inclou el verb dins el subjecte'},
 ca_av_subj_incomplet:{kid:'Hi falten paraules. El subjecte és tot el grup: el nom amb l\'article, els adjectius i els complements que l\'acompanyen.',par:'Marca només una part del subjecte (el nucli sense els seus complements)'},
 ca_av_subj_sobra:{kid:'Hi has posat paraules de més. Al subjecte només hi va el grup que respon a «qui?»; la resta és el predicat.',par:'Afegeix paraules del predicat al subjecte'},
 ca_av_subj_inici:{kid:'El subjecte no sempre va al principi de la frase! Busca el verb i pregunta-li «qui?».',par:'Creu que el subjecte és sempre el que va primer (no el troba quan va darrere el verb)'},
 ca_av_concord:{kid:'Has deixat el verb igual. Si el subjecte canvia de nombre o de persona, el verb també canvia: concorden.',par:'No fa concordar el verb amb el subjecte'},
 ca_av_sil_digraf:{kid:'Hi ha lletres que van sempre juntes a la mateixa síl·laba: ll, ny, qu i gu (davant e, i) i grups com bl, br, pl, pr, tr, cr, gr, fl, fr, dr.',par:'Separa dígrafs (ll, ny, qu) o grups com tr, bl en dividir síl·labes'},
 ca_av_sil_dues:{kid:'Quan hi ha dues consonants entre vocals, normalment se separen: pas‑tís, car‑ro, mas‑sa, plat‑ja, rel‑lot‑ge.',par:'No separa dues consonants seguides (rr, ss, tj, tg...) en dividir síl·labes'},
 ca_av_sil_vocals:{kid:'Revisa les vocals: ai, ei, au, eu, iu, ou fan diftong i van juntes (tau‑la, ciu‑tat); en canvi, en «io» cada vocal va a una síl·laba (ca‑mi‑ó).',par:'Confon diftongs i hiats en dividir síl·labes'},
 ca_av_sil_cv:{kid:'Una consonant sola entre dues vocals va amb la vocal de darrere: ca‑sa, ga‑vi‑na. Compte: la i de ai, ei, oi, ui va amb la vocal d\'abans (vai‑xell).',par:'Divideix malament una consonant entre vocals (cas‑a)'},
 ca_av_tonica:{kid:'Pronuncia-la picant de mans i busca la síl·laba que sona més forta. Compta des del final: si és la darrera, és aguda; la penúltima, plana; l\'antepenúltima, esdrúixola.',par:'No reconeix la síl·laba tònica (aguda, plana, esdrúixola)'},
 ca_av_afix:{kid:'Aquesta peça forma un altre tipus de paraula. Pensa què vol dir cada prefix o sufix.',par:'Tria un prefix o un sufix que no correspon al significat'},
 ca_av_pref_assim:{kid:'El prefix in- canvia segons la lletra que ve darrere: im- davant p i b (impossible), il- davant l (il·legal) i ir- davant r (irregular).',par:'No fa el canvi in- → im-, il-, ir-'},
 ca_av_suf_grafia:{kid:'En enganxar el sufix, algunes lletres canvien per conservar el so: ç → c davant e, i (placeta); c → qu (barqueta); c → gu (groguejar).',par:'No adapta l\'ortografia en afegir un sufix (barceta, feliçitat)'},
 ca_av_feble_lloc:{kid:'Amb un verb conjugat, el pronom feble va davant del verb: «la repara», no «repara la».',par:'Posa el pronom feble darrere un verb conjugat'},
 ca_av_ci_nombre:{kid:'Mira si el complement és singular o plural: per a una persona, li (a ell, a ella); per a més d\'una, els (a ells, a elles).',par:'Confon li i els (complement indirecte singular i plural)'},
 ca_av_feble_compl:{kid:'El pronom substitueix el complement: no hi pots deixar les dues coses. Escriu només el pronom i el verb.',par:'Repeteix el complement i el pronom'},
 ca_av_bv:{kid:'La b i la v no tenen una regla fixa: pensa en paraules de la mateixa família (cavall → cavaller, llibre → llibreria).',par:'Confon b i v'},
 ca_av_gj:{kid:'Davant a, o, u s\'escriu j (o tj); davant e, i, normalment g (o tg).',par:'Confon g / j o tg / tj'},
 ca_av_s_ss:{kid:'Entre vocals, la s sona suau, com a «casa»; la ss sona forta, com a «massa».',par:'Confon s i ss entre vocals'},
 ca_av_c_cedilla:{kid:'El so «s» davant a, o, u s\'escriu ç (plaça); davant e, i, s\'escriu c (cel, cinc).',par:'Confon c i ç'}
});

(()=>{
 /* ---------- utilitats ---------- */
 const low=s=>String(s||'').trim().toLowerCase().replace(/[’`´]/g,"'").replace(/\s*'\s*/g,"'").replace(/\s+/g,' ').replace(/[.!?]+$/,'');
 const noAcc=s=>CA_STRIP(low(s));
 const cap=s=>s?s[0].toUpperCase()+s.slice(1):s;
 const lc1=s=>s?s[0].toLowerCase()+s.slice(1):s;
 const tip0=(html,kind='')=>`<div class="av-tip ${kind}">${AV.owl(36)}<div>${html}</div></div>`;
 const TXT='autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"';
 // tema on es desa l'error típic: el que toca, si és a la sessió; si no, el tema de l'estació
 const kk=(api,k)=>api.ks.includes(k)?k:api.k;
 const ans=(label,ph)=>AV.answer(label,ph).replace('inputmode="decimal"','inputmode="text"');

 if(!document.getElementById('cav-css')){const st=document.createElement('style');st.id='cav-css';st.textContent=`
.cav-sent{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:14px 0}
button.cav-w{background:#fff;color:var(--ink);border:2px solid var(--lav);box-shadow:none;border-radius:14px;min-height:48px;padding:0 14px;font:500 18px var(--font)}
button.cav-w:hover{background:var(--soft)}
button.cav-w.on,button.cav-w.on:hover{background:var(--pri-l);border-color:var(--pri);color:var(--pri-dd)}
button.cav-w:disabled{opacity:1;cursor:default}
.cav-cart{display:flex;align-items:center;flex-wrap:wrap;gap:10px;min-height:58px;border:2px dashed #C9B8FA;border-radius:18px;padding:8px 14px;background:#FBF9FF}
.cav-tag{background:var(--pri);color:#fff;border-radius:999px;padding:3px 12px;font-size:13px}
.cav-cw{font-size:18px;font-weight:500;color:var(--pri-dd)}
.cav-syl{display:flex;justify-content:center;align-items:stretch;margin:18px 0 8px;font:500 34px/1 var(--font);color:var(--ink)}
.cav-l{display:flex;align-items:center;padding:0 1px}
.av-ans>input.cav-t{display:block;width:100%;margin-top:4px}
button.cav-gap{position:relative;width:30px;min-width:0;min-height:0;height:74px;margin:0 -8px;padding:0;background:transparent;box-shadow:none;border-radius:10px;z-index:1}
button.cav-gap:hover{background:rgba(139,108,240,.08)}
button.cav-gap i{position:absolute;left:50%;top:10px;bottom:10px;border-left:3px dotted var(--line2);transform:translateX(-50%)}
button.cav-gap.on i{border-left:4px solid var(--pri)}
button.cav-gap:disabled{opacity:1;cursor:default;background:transparent}
.cav-bench{display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;margin:16px 0 4px}
.cav-base{background:var(--peach);border-radius:14px;padding:10px 18px;font:500 22px var(--font)}
.cav-plus{font-size:22px;color:var(--muted)}
button.cav-slot{min-width:92px;min-height:52px;border:2px dashed #C9B8FA;border-radius:14px;background:#FBF9FF;color:var(--muted);box-shadow:none;font:500 20px var(--font);padding:0 14px}
button.cav-slot:hover{background:#F3EFFE}
button.cav-slot.full,button.cav-slot.full:hover{border-style:solid;border-color:var(--pri);background:var(--pri-l);color:var(--pri-dd)}
button.cav-slot:disabled{opacity:1;cursor:default}
.cav-frase{font-size:18px;line-height:2.1}
.cav-box{white-space:nowrap;background:#F6D7A7;border:2px solid #C9874A;border-radius:10px;padding:2px 8px;font-weight:500}
.cav-blank{display:inline-block;min-width:70px;border-bottom:3px solid var(--pri);text-align:center;color:var(--pri);line-height:1.3}
.cav-page{background:#FBF3DF;border-radius:18px;padding:12px 18px;font-size:18px;line-height:2.5;box-shadow:inset 0 0 0 2px #EFDDB5}
.cav-page p{margin:0;padding:2px 0}.cav-page p+p{border-top:1.5px dashed #EFDDB5}
.cav-page input.cav-in{display:inline-block;width:3.1em;height:42px;padding:0 4px;margin:0 2px;border:2px solid var(--pri);border-radius:12px;background:var(--pri-l);font:500 20px var(--font);color:var(--pri-dd);text-align:center;vertical-align:middle}
@media (max-width:520px){.cav-syl{font-size:28px}button.cav-gap{width:28px;margin:0 -9px}.cav-page{padding:10px 14px;font-size:17px}}
`;document.head.appendChild(st)}

 /* ===================== 1. El moll de les frases (subjecte i concordança) ===================== */
 // [frase: [subjecte] i {verb}, subjecte nou, formes del verb amb el subjecte nou]
 const OR=[
  ['[La gavina blanca] {vola} damunt el port','les gavines blanques',['volen']],
  ['[Els pescadors] {reparen} les xarxes al moll','el pescador',['repara']],
  ['Cada matí [la padrina] {compra} peix fresc','les padrines',['compren']],
  ['Al far {viu} [un faroner molt simpàtic]','uns faroners molt simpàtics',['viuen']],
  ['Demà {arribaran} [els meus cosins de Menorca]','el meu cosí de Menorca',['arribarà']],
  ['[Tu i jo] {pintarem} la barca de blau','tu',['pintaràs']],
  ['[El vent del nord] {mou} les veles','els vents del nord',['mouen']],
  ['[Les onades] {colpegen} les roques','l\'onada',['colpeja']],
  ['A la plaça {juguen} [uns infants]','un infant',['juga']],
  ['[La biblioteca del poble] {obre} a les deu','les biblioteques del poble',['obren']],
  ['[El meu germà petit] {dibuixa} vaixells','els meus germans petits',['dibuixen']],
  ['Per la finestra {entra} [una llum daurada]','unes llums daurades',['entren']],
  ['[Nosaltres] {cantam} cançons a la festa','jo',['cant','canto']],
  ['[L\'àvia i el padrí] {passegen} per la platja','l\'àvia',['passeja']],
  ['Aquest estiu {navegaran} [les barques de vela] fins a Cabrera','la barca de vela',['navegarà']]];
 const parseOR=([t,alt,altV])=>{const w=[],S=[];let V=-1,inS=false;
  t.split(' ').forEach(x=>{let s=x,end=false;if(s[0]==='['){inS=true;s=s.slice(1)}if(s.endsWith(']')){end=true;s=s.slice(0,-1)}
   if(s[0]==='{'){s=s.slice(1,-1);V=w.length}if(inS)S.push(w.length);w.push(s);if(end)inS=false});
  return{w,S,V,alt,altV,subj:S.map(i=>w[i]).join(' '),verb:w[V],inv:S[0]>V}};

 const moll={id:'moll',nom:'El moll de les frases',desc:'Carrega al carro les paraules del subjecte i fes concordar el verb.',
  skills:['ca_subjecte','ca_sintagma_nominal'],
  render(el,api){const o=pick(OR.map(parseOR).filter(x=>api.lv>0||!x.inv)),sel=new Set(),sub=lc1(o.subj);let phase=0;el._cav=o;
   el.innerHTML=`<p>Al moll, les frases arriben en caixes de paraules. <b>Toca les paraules que formen el subjecte</b> per carregar-les al carro. Si en toques una de carregada, torna a la frase.</p>
    <div class="cav-sent" role="group" aria-label="Paraules de la frase"></div>
    <div class="cav-cart" aria-live="polite"><span class="cav-tag">Carro del subjecte</span><span class="cav-cw"></span></div>
    <div class="av-row"><button class="av-chk" disabled>Comprova el carro</button></div><div class="av-q2"></div>`;
   const sent=el.querySelector('.cav-sent'),cw=el.querySelector('.cav-cw'),chk=el.querySelector('.av-chk'),q=el.querySelector('.av-q2');
   const draw=()=>{sent.innerHTML=o.w.map((w,i)=>`<button class="cav-w${sel.has(i)?' on':''}" data-i="${i}" aria-pressed="${sel.has(i)}"${phase?' disabled':''}>${esc(w)}${i===o.w.length-1?'.':''}</button>`).join('');
    const s=[...sel].sort((a,b)=>a-b);cw.innerHTML=s.length?esc(s.map(i=>o.w[i]).join(' ')):'<span class="muted" style="font-weight:400">buit</span>';
    chk.disabled=phase>0||!sel.size;
    sent.querySelectorAll('.cav-w').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);draw()})};
   const steps=[`Busca el verb, la paraula que es conjuga: <b>${o.verb}</b>.`,
    `Pregunta-li «qui?»: qui ${o.verb}? → <b>${sub}</b>. Aquest grup és el subjecte; la resta de la frase és el predicat.`,
    `Comprova-ho amb la concordança: si canvies el subjecte, el verb també canvia: <b>${cap(o.alt)} ${o.altV[0]}</b>.`];
   chk.onclick=()=>{const s=[...sel].sort((a,b)=>a-b),S=o.S;
    if(s.length===S.length&&s.every((v,i)=>v===S[i])){phase=1;draw();api.clear();api.restart();
     q.innerHTML=tip0(`<b>Carro ben carregat!</b> El subjecte és «${sub}». Ara una prova: canvia el subjecte per <b>«${o.alt}»</b>. Com s'ha d'escriure el verb <b>${o.verb}</b>?`,'ok')+ans('El verb amb el subjecte nou','Escriu el verb');
     AV.onAnswer(q,check2);return}
    let err=null;
    if(sel.has(o.V))err='ca_av_subj_verb';else if(s.every(i=>S.includes(i)))err='ca_av_subj_incomplet';else if(S.every(i=>sel.has(i)))err='ca_av_subj_sobra';else if(o.inv&&!s.some(i=>S.includes(i)))err='ca_av_subj_inici';
    const r=api.fail({err,steps,msg:`<b>El carro no arrenca.</b> ${err?ERR[err].kid:'El subjecte és qui fa l\'acció o de qui es diu alguna cosa. Busca el verb i pregunta-li «qui?».'}`});
    if(r==='retry'){sel.clear();draw()}};
   function check2(v,inp){const a=low(v);
    if(o.altV.includes(a)){phase=2;api.ok({msg:`<b>Perfecte!</b> ${cap(o.alt)} <b>${a}</b>: el verb concorda amb el subjecte. Per això sabem segur que el subjecte era «${sub}».`});return}
    let err=null;if(a===low(o.verb))err='ca_av_concord';else err=caAccentErr(o.altV[0],a);
    const r=api.fail({err,steps,msg:err?ERR[err].kid:`Digues en veu baixa la frase sencera amb el subjecte nou: «${cap(o.alt)}…». Com sona el verb?`});
    if(r==='retry'){inp.value='';inp.focus()}}
   draw()}};

 /* ===================== 2. La torre de les síl·labes (síl·labes i accentuació) ===================== */
 // síl·labes separades per guions; * = síl·laba tònica; ! = més difícil (nivell ≥ 1)
 const TS=['ca-fè*','so-fà*','ca-mi-ó*','tam-bé*','fran-cès*','pas-tís*','des-prés*','ma-tí*','a-vi-ó*','pa-gès*','jar-dí*','ca-mí*',
  'ma-ri-ner*','co-lor*','a-ni-mal*','!ciu-tat*','mi-rall*','pes-ca-dor*','tre-sor*','!vai-xell*',
  'fà*-cil','di-fí*-cil','te-lè*-fon','cò*-mic','nú*-vol','rà*-pid','mò*-bil','tí*-mid','!àn*-gel',
  'ca-di*-ra','es-co*-la','fi-nes*-tra','plat*-ja','tau*-la','ga-vi*-na','sar-di*-na','o-na*-da','i*-lla','!mun-ta*-nya','!rel-lot*-ge','mas*-sa','!car-re-te*-ra','pla*-ça','!e-xa*-men',
  'mú*-si-ca','!mà*-qui-na','pà*-gi-na','làm*-pa-da','fí*-si-ca','àn*-co-ra','nú*-me-ro','!àr*-bi-tre','rà*-pi-da'];
 const TIP=['aguda','plana','esdrúixola'],POS=['la darrera','la penúltima','l\'antepenúltima'];
 const parseTS=x=>{const syl=x.replace('!','').split('-'),ton=syl.findIndex(s=>s.includes('*'));const S=syl.map(s=>s.replace('*',''));
  const word=S.join(''),cuts=[];let c=0;S.slice(0,-1).forEach(s=>{c+=s.length;cuts.push(c)});return{syl:S,ton,word,cuts,tip:TIP[S.length-1-ton],pos:POS[S.length-1-ton]}};
 const isV=c=>'aeiou'.includes(c),CL=/^(bl|br|pl|pr|tr|cr|gr|fl|fr|dr|cl|gl)$/;
 const digraf=(s,p)=>{const a=s[p-1],b=s[p],ab=a+b;return ab==='ll'||ab==='ny'||CL.test(ab)||((ab==='qu'||ab==='gu')&&/[ei]/.test(s[p+1]||''))||(a==='u'&&/[qg]/.test(s[p-2]||''))};
 // tall de més (extra) o tall que falta: quin error típic és?
 function cutErr(s,p,extra){const a=s[p-1],b=s[p];
  if(extra){if(digraf(s,p))return'ca_av_sil_digraf';if(isV(a)&&isV(b))return'ca_av_sil_vocals';return isV(a)!==isV(b)?'ca_av_sil_cv':null}
  if(isV(a)&&isV(b))return'ca_av_sil_vocals';if(!isV(a)&&!isV(b))return'ca_av_sil_dues';return'ca_av_sil_cv'}
 // notes per a l'explicació: per què es talla així
 function sylNotes(s,cuts){const n=[];for(let p=1;p<s.length;p++){const a=s[p-1],b=s[p],ab=a+b,cut=cuts.includes(p);
   if(!cut&&digraf(s,p)&&!(a==='u'))n.push(ab==='ll'||ab==='ny'?`La <b>${ab}</b> no es separa.`:ab==='qu'||ab==='gu'?`La <b>${ab}</b> va junta (la u no sona).`:`El grup <b>${ab}</b> no es separa.`);
   else if(cut&&!isV(a)&&!isV(b))n.push(`Entre <b>${a}</b> i <b>${b}</b> es talla: dues consonants se separen.`);
   else if(!cut&&isV(a)&&isV(b)&&!/[qg]/.test(s[p-2]||''))n.push(`<b>${ab}</b> fan diftong: van juntes.`);
   else if(cut&&isV(a)&&isV(b))n.push(`<b>${a}</b> i <b>${b}</b> van separades (hiat).`)}
  return n.length?' '+[...new Set(n)].join(' '):''}

 const torre={id:'torre',nom:'La torre de les síl·labes',desc:'Talla la paraula en síl·labes, troba la que sona més forta i posa-hi l\'accent.',
  skills:['ca_accent','ca_diftongs'],
  render(el,api){const it=parseTS(pick(TS.filter(x=>api.lv>0||x[0]!=='!'))),s=CA_STRIP(it.word),L=[...s],cut=new Set();let phase=0;el._cav=it;
   el.innerHTML=`<p>Al rellotge de la torre, les paraules hi són escrites <b>sense accents</b>. Primer, <b>toca entre les lletres</b> per tallar la paraula en síl·labes. Si et descuides, torna a tocar el tall per treure'l.</p>
    <div class="cav-syl" role="group" aria-label="Lletres de la paraula ${s}"></div>
    <div class="av-row"><button class="av-chk" disabled>Talla en síl·labes</button></div><div class="av-q2"></div>`;
   const box=el.querySelector('.cav-syl'),chk=el.querySelector('.av-chk'),q=el.querySelector('.av-q2');
   const draw=()=>{box.innerHTML=L.map((c,i)=>(i?`<button class="cav-gap${cut.has(i)?' on':''}" data-i="${i}" aria-label="Talla entre ${L[i-1]} i ${c}" aria-pressed="${cut.has(i)}"${phase?' disabled':''}><i></i></button>`:'')+`<span class="cav-l">${c}</span>`).join('');
    chk.disabled=phase>0||!cut.size;box.querySelectorAll('.cav-gap').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;cut.has(i)?cut.delete(i):cut.add(i);draw()})};
   const sylS=it.syl.map(CA_STRIP).join(' - ');
   const rule=it.tip==='esdrúixola'?'Les esdrúixoles porten <b>sempre</b> accent.':it.tip==='aguda'?'Les agudes porten accent si acaben en vocal, -as, -es, -is, -os, -us, -en, -in.':'Les planes porten accent si <b>no</b> acaben en vocal, -as, -es, -is, -os, -us, -en, -in.';
   const steps=[`Es talla així: <b>${sylS}</b>.${sylNotes(s,it.cuts)}`,`La síl·laba que sona més forta és <b>${CA_STRIP(it.syl[it.ton])}</b>, ${it.pos}: és una paraula <b>${it.tip}</b>.`,`${rule} Per això s'escriu <b>${it.word}</b>.`];
   chk.onclick=()=>{const c=[...cut].sort((a,b)=>a-b);
    if(c.length===it.cuts.length&&c.every((v,i)=>v===it.cuts[i])){phase=1;draw();api.clear();api.restart();phase2();return}
    const extra=c.filter(p=>!it.cuts.includes(p)),miss=it.cuts.filter(p=>!cut.has(p));
    const err=extra.map(p=>cutErr(s,p,true)).concat(miss.map(p=>cutErr(s,p,false))).find(Boolean)||null;
    const r=api.fail({err,k:kk(api,'ca_diftongs'),steps,msg:`<b>La paraula no encaixa al rellotge.</b> ${err?ERR[err].kid:'Digues la paraula a poc a poc i pica de mans a cada cop de veu.'}`});
    if(r==='retry'){cut.clear();draw()}};
   function phase2(){q.innerHTML=tip0(`<b>Ben tallada:</b> ${sylS}. Ara digues quina mena de paraula és i escriu-la ben accentuada (si porta accent).`,'ok')+
     `<div class="av-ans"><label class="lbl">Aguda, plana o esdrúixola?</label><input class="av-in cav-t" inputmode="text" ${TXT} placeholder="Escriu-ho aquí" aria-label="Aguda, plana o esdrúixola"></div>
      <div class="av-ans"><label class="lbl">La paraula ben escrita</label><div class="av-ans-r"><input class="av-in cav-p" inputmode="text" ${TXT} placeholder="Escriu la paraula" aria-label="La paraula ben escrita"><button class="av-ok">Comprova</button></div></div>`;
    const t=q.querySelector('.cav-t'),p=q.querySelector('.cav-p'),b=q.querySelector('.av-ok');
    const go=()=>{if(!t.value.trim()||!p.value.trim()){api.tip('Escriu les dues respostes.','warn');(t.value.trim()?p:t).focus();return}
     const tOk=noAcc(t.value)===CA_STRIP(it.tip),pv=low(p.value),pOk=pv===it.word;
     if(tOk&&pOk){api.ok({msg:`<b>El rellotge toca les hores!</b> ${it.syl.join(" - ")}: la tònica és <b>${it.syl[it.ton]}</b>, és ${it.tip} i s'escriu <b>${it.word}</b>.`});return}
     let err=null;const msg=[];
     if(!pOk){err=caAccentErr(it.word,pv);if(err)msg.push(ERR[err].kid);else msg.push(CA_STRIP(pv)!==s?`Escriu la mateixa paraula, «${s}», amb accent si en porta.`:'Revisa l\'accent.')}
     if(!tOk){err=err||'ca_av_tonica';msg.push(ERR.ca_av_tonica.kid)}
     const r=api.fail({err,k:kk(api,'ca_accent'),steps,msg:msg.join(' ')});
     if(r==='retry'){if(!tOk)t.value='';if(!pOk)p.value='';(tOk?p:t).focus()}};
    t.onkeydown=e=>{if(e.key==='Enter')p.focus()};p.onkeydown=e=>{if(e.key==='Enter')go()};b.onclick=go;t.focus({preventScroll:true})}
   draw()}};

 /* ===================== 3. El taller de paraules (prefixos i sufixos) ===================== */
 const AFC={'des-':'p1','in-':'p2','re-':'p3','pre-':'p4','-itat':'qual','-esa':'qual','-ia':'qual','-dor':'pers','-eria':'bot','-ós':'adj','-ible':'pot','-í':'orig','-enc':'orig','-eta':'dim','-ció':'acc','-ejar':'verb'};
 const AFD={'des-':'vol dir «el contrari» o «treure» (desfer, destapar)','in-':'vol dir «no» (inútil); davant p i b es torna im-, davant l il- i davant r ir-','re-':'vol dir «tornar a» (refer)','pre-':'vol dir «abans» (prehistòria)',
  '-itat':'forma noms de qualitats (bondat → la qualitat de ser bo)','-esa':'forma noms de qualitats (tristesa)','-ia':'forma noms de qualitats (valentia)','-dor':'forma noms de persones que fan una acció (nedador)','-eria':'forma noms de botigues (llibreria)',
  '-ós':'forma adjectius que volen dir «que té» o «que fa» (perillós)','-ible':'forma adjectius que volen dir «que es pot» (llegible)','-í':'forma gentilicis, el nom de la gent d\'un lloc (mallorquí)','-enc':'forma gentilicis, el nom de la gent d\'un lloc (eivissenc)',
  '-eta':'forma diminutius, coses petites (caseta)','-ció':'forma noms d\'accions (explicació)','-ejar':'forma verbs (netejar)'};
 const isPre=a=>a.endsWith('-');
 // [significat, paraula base, peça, respostes acceptades, explicació, (1 = més difícil)]
 const AFX=[
  ['que no és possible','possible','in-',['impossible'],'Davant p, in- es torna im-: <b>impossible</b>.'],
  ['que no és legal','legal','in-',['il·legal'],'Davant l, in- es torna il- i s\'escriu amb ela geminada: <b>il·legal</b>.',1],
  ['que no és regular','regular','in-',['irregular'],'Davant r, in- es torna ir-: <b>irregular</b>.'],
  ['que no és responsable','responsable','in-',['irresponsable'],'Davant r, in- es torna ir- i hi queden dues erres: <b>irresponsable</b>.',1],
  ['que no és útil','útil','in-',['inútil'],'in- + útil = <b>inútil</b> (conserva l\'accent).'],
  ['que no és visible','visible','in-',['invisible'],'in- + visible = <b>invisible</b>.'],
  ['que no és prudent','prudent','in-',['imprudent'],'Davant p, in- es torna im-: <b>imprudent</b>.',1],
  ['que no és capaç','capaç','in-',['incapaç'],'in- + capaç = <b>incapaç</b>.'],
  ['desfer el que s\'ha fet','fer','des-',['desfer'],'des- + fer = <b>desfer</b>.'],
  ['que no està ordenat','ordenat','des-',['desordenat','desordenada'],'des- + ordenat = <b>desordenat</b>.'],
  ['que no és agradable','agradable','des-',['desagradable'],'des- + agradable = <b>desagradable</b>.'],
  ['treure la tapa','tapar','des-',['destapar'],'des- + tapar = <b>destapar</b>.'],
  ['tornar a llegir','llegir','re-',['rellegir'],'re- + llegir = <b>rellegir</b>.'],
  ['tornar a omplir','omplir','re-',['reomplir'],'re- + omplir = <b>reomplir</b>.'],
  ['tornar a escriure','escriure','re-',['reescriure'],'re- + escriure = <b>reescriure</b> (amb dues e).',1],
  ['tornar a fer','fer','re-',['refer'],'re- + fer = <b>refer</b>.'],
  ['l\'època abans de la història','història','pre-',['prehistòria'],'pre- + història = <b>prehistòria</b> (conserva l\'accent).',1],
  ['la qualitat de ser feliç','feliç','-itat',['felicitat'],'La ç es torna c davant de i: feliç → <b>felicitat</b>.',1],
  ['la qualitat de ser trist','trist','-esa',['tristesa'],'trist + esa = <b>tristesa</b>.'],
  ['la qualitat de ser bell','bell','-esa',['bellesa'],'bell + esa = <b>bellesa</b>.'],
  ['la qualitat de ser valent','valent','-ia',['valentia'],'valent + ia = <b>valentia</b>.'],
  ['la persona que neda','nedar','-dor',['nedador','nedadora'],'Treim la r de nedar i hi afegim -dor: <b>nedador</b>.'],
  ['la persona que pesca','pescar','-dor',['pescador','pescadora'],'Treim la r de pescar i hi afegim -dor: <b>pescador</b>.'],
  ['la persona que treballa','treballar','-dor',['treballador','treballadora'],'Treim la r de treballar i hi afegim -dor: <b>treballador</b>.'],
  ['la botiga on venen llibres','llibre','-eria',['llibreria'],'Treim la e de llibre: llibr + eria = <b>llibreria</b>.'],
  ['la botiga on venen fruita','fruita','-eria',['fruiteria'],'Treim la a de fruita: fruit + eria = <b>fruiteria</b>.'],
  ['la botiga on venen sabates','sabata','-eria',['sabateria'],'Treim la a de sabata: sabat + eria = <b>sabateria</b>.'],
  ['que té perill','perill','-ós',['perillós','perillosa'],'perill + ós = <b>perillós</b>.'],
  ['que fa molt de soroll','soroll','-ós',['sorollós','sorollosa'],'soroll + ós = <b>sorollós</b>.'],
  ['que es pot llegir','llegir','-ible',['llegible'],'Treim la -ir de llegir: lleg + ible = <b>llegible</b>.'],
  ['que es pot creure','creure','-ible',['creïble'],'cre + ible: la i sona separada de la e, i per això porta dièresi: <b>creïble</b>.',1],
  ['una persona de Mallorca','Mallorca','-í',['mallorquí','mallorquina'],'La c es torna qu davant de i: Mallorca → <b>mallorquí</b>.',1],
  ['una persona de Menorca','Menorca','-í',['menorquí','menorquina'],'La c es torna qu davant de i: Menorca → <b>menorquí</b>.',1],
  ['una persona d\'Eivissa','Eivissa','-enc',['eivissenc','eivissenca'],'Treim la a d\'Eivissa: eiviss + enc = <b>eivissenc</b>.'],
  ['una casa petita','casa','-eta',['caseta'],'Treim la a de casa: cas + eta = <b>caseta</b>.'],
  ['una barca petita','barca','-eta',['barqueta'],'La c es torna qu davant de e: barca → <b>barqueta</b>.',1],
  ['una plaça petita','plaça','-eta',['placeta'],'La ç es torna c davant de e: plaça → <b>placeta</b>.',1],
  ['l\'acció d\'explicar','explicar','-ció',['explicació'],'Treim la r d\'explicar: explica + ció = <b>explicació</b>.'],
  ['l\'acció d\'informar','informar','-ció',['informació'],'Treim la r d\'informar: informa + ció = <b>informació</b>.'],
  ['fer net una cosa','net','-ejar',['netejar'],'net + ejar = <b>netejar</b>.'],
  ['tornar-se groc','groc','-ejar',['groguejar'],'La c es torna gu davant de e: groc → <b>groguejar</b>.',1]];

 const taller={id:'taller',nom:'El taller de paraules',desc:'Enganxa un prefix o un sufix a una paraula i escriu la paraula nova.',
  skills:['ca_derivacio','ca_prefixos'],
  render(el,api){const ks=api.ks,both=ks.includes('ca_prefixos')&&ks.includes('ca_derivacio');
   const pre=both||!ks.length?Math.random()<.5:ks.includes('ca_prefixos');
   const [def,base,af,A,note]=pick(AFX.filter(x=>isPre(x[2])===pre&&(api.lv>0||!x[5])));
   // peces de distracció: d'un altre tipus (mai dues que puguin fer la mateixa feina)
   const seen=new Set([AFC[af]]),dis=AV.shuf(Object.keys(AFC).filter(a=>isPre(a)===pre)).filter(a=>{if(seen.has(AFC[a]))return false;seen.add(AFC[a]);return true}).slice(0,4);
   const chips=AV.shuf([af,...dis]),kErr=pre?'ca_prefixos':'ca_derivacio';let ch=null;el._cav={af,A};
   el.innerHTML=`<p>Al taller del fuster es fabriquen paraules noves. Hi ha un encàrrec: una paraula que vulgui dir <b>«${def}»</b>.</p>
    <p>Toca la peça que s'ha d'enganxar a <b>${esc(base)}</b> i després escriu la paraula nova. Compte: en enganxar-la, algunes lletres poden canviar.</p>
    <div class="cav-bench" aria-live="polite"></div>
    <div class="av-tray" role="group" aria-label="Peces del taller">${chips.map(c=>`<button class="av-chip" data-c="${c}">${c}</button>`).join('')}</div>
    ${ans('La paraula nova','Escriu-la aquí')}`;
   const bench=el.querySelector('.cav-bench'),inp=el.querySelector('.av-in');
   const draw=()=>{const slot=`<button class="cav-slot${ch?' full':''}" aria-label="${ch?'Treu la peça '+ch:'Lloc per a la peça'}">${ch||'?'}</button>`;
    bench.innerHTML=(pre?slot+'<span class="cav-plus">+</span>':'')+`<span class="cav-base">${esc(base)}</span>`+(pre?'':'<span class="cav-plus">+</span>'+slot);
    bench.querySelector('.cav-slot').onclick=()=>{if(ch){ch=null;draw()}};
    el.querySelectorAll('.av-chip').forEach(b=>{b.classList.toggle('on',b.dataset.c===ch);b.setAttribute('aria-pressed',b.dataset.c===ch)})};
   el.querySelectorAll('.av-chip').forEach(b=>b.onclick=()=>{ch=b.dataset.c;draw();inp.focus({preventScroll:true})});
   const join=c=>pre?`${c} + ${base}`:`${base} + ${c}`;
   const steps=[`Volem una paraula que vulgui dir «${def}».`,`La peça que ho fa és <b>${af}</b>: ${AFD[af]}.`,note];
   AV.onAnswer(el,(v,i)=>{if(!ch){api.tip('Primer enganxa una peça: toca un prefix o un sufix.','warn');return}
    const a=low(v);
    if(ch===af&&A.includes(a)){api.ok({msg:`<b>Encàrrec fet!</b> «${def}»: <b>${a}</b>. ${note}`});return}
    let err=null,msg;
    if(ch!==af){err='ca_av_afix';msg=`La peça <b>${ch}</b> ${AFD[ch]}. I l'encàrrec és una paraula que vulgui dir «${def}».`}
    else{const W=A[0],dots=x=>x.replace(/[·.\-]/g,'');
     if(pre&&/^i[mlr]/.test(W)&&(dots(a)===dots('in'+W.slice(2))||(W.startsWith('irr')&&a==='i'+W.slice(2))))err='ca_av_pref_assim';
     else if(W.includes('l·l')&&['ll','l.l','l','l-l'].some(x=>W.replace('l·l',x)===a))err='ca_l_geminada';
     else if(CA_STRIP_UML(W)!==W&&CA_STRIP_UML(W)===a)err='ca_dieresi_falta';
     else if([W.replace('qu','c'),W.replace(/c(?=[ei])/,'ç'),W.replace('gu','g')].some(x=>x!==W&&x===a))err='ca_av_suf_grafia';
     else{const m=A.find(x=>noAcc(x)===noAcc(a));if(m)err=caAccentErr(m,a)}
     msg=err?ERR[err].kid:`Enganxa bé les peces: ${join(af)}. Llegeix en veu alta la paraula que t'ha sortit: existeix així?`}
    const r=api.fail({err,k:kk(api,kErr),steps,msg});
    if(r==='retry'){if(ch!==af){ch=null;draw()}else i.value='';i.focus()}});
   draw()}};

 /* ===================== 4. La barca dels pronoms (pronoms febles) ===================== */
 // [frase amb *complement*, frase amb el forat ___, respostes (pronom + verb), tipus, (1 = més difícil)]
 const PB=[
  ['El pescador repara *la xarxa* al moll.','El pescador ___ al moll.',['la repara'],'cdf'],
  ['La padrina cuina *el peix* a la brasa.','La padrina ___ a la brasa.',['el cuina'],'cdm'],
  ['En Pau espera *l\'autobús* a la plaça.','En Pau ___ a la plaça.',['l\'espera'],'cdm',1],
  ['Els infants obren *la porta del far*.','Els infants ___.',['l\'obren'],'cdf',1],
  ['La Marta renta *els plats* després de sopar.','La Marta ___ després de sopar.',['els renta'],'cdpl'],
  ['Nosaltres pintam *les barques* de blau.','Nosaltres ___ de blau.',['les pintam','les pintem'],'cdpl'],
  ['Les gavines miren *els pescadors*.','Les gavines ___.',['els miren'],'cdpl'],
  ['En Miquel porta *la sobrassada* d\'excursió.','En Miquel ___ d\'excursió.',['la porta'],'cdf'],
  ['El faroner sap *això* de memòria.','El faroner ___ de memòria.',['ho sap'],'ho'],
  ['La mestra explica *això* molt bé.','La mestra ___ molt bé.',['ho explica'],'ho'],
  ['L\'avi menja *pomes* cada dia.','L\'avi ___ cada dia.',['en menja'],'en',1],
  ['En Joan agafa *aigua* de la font.','En Joan ___ de la font.',['n\'agafa'],'en',1],
  ['La mare dona un regal *a la Joana*.','La mare ___ un regal.',['li dona'],'ci'],
  ['La Neus telefona *al seu padrí*.','La Neus ___.',['li telefona'],'ci'],
  ['El mestre explica un conte *als alumnes*.','El mestre ___ un conte.',['els explica'],'cipl'],
  ['Escric una carta *a les meves cosines*.','___ una carta.',['els escric'],'cipl',1],
  ['Anam *a Ciutadella* aquest estiu.','___ aquest estiu.',['hi anam','hi anem'],'hi',1],
  ['La gata dorm *damunt el sofà*.','La gata ___.',['hi dorm'],'hi']];
 const PK={cdm:['què?','un complement directe masculí singular','el'],cdf:['què?','un complement directe femení singular','la'],cdpl:['què?','un complement directe plural amb article','els (masculí) o les (femení)'],
  ho:['què?','un complement directe neutre («això»)','ho'],en:['què?','un complement directe sense article','en'],ci:['a qui?','un complement indirecte singular','li'],cipl:['a qui?','un complement indirecte plural','els (també en femení)'],hi:['on?','un complement de lloc','hi']};

 const barca={id:'barca',nom:'La barca dels pronoms',desc:'Carrega el complement a la barca i escriu el pronom feble que ocupa el seu lloc.',
  skills:['ca_febles','ca_cd','ca_ci'],
  render(el,api){const [s,R,A,t]=pick(PB.filter(x=>api.lv>0||!x[4])),c=s.match(/\*(.+?)\*/)[1],K=PK[t],a0=A[0];let phase=0;el._cav={A};
   const nar=(el.clientWidth||700)<520,W=nar?420:700,H=230,bx=W*(nar?.73:.76),hw=nar?92:118;
   const fs=Math.min(nar?24:21,(W*.6-28)/(c.length*.6)),cw=28+c.length*fs*.6;
   const full=cap(R.replace('___',a0)),rH=esc(R).replace('___','<span class="cav-blank">?</span>');
   el.innerHTML=`<p class="cav-frase">${esc(s).replace(/\*(.+?)\*/,'<span class="cav-box">$1</span>')}</p>
    <p>La caixa destacada és un complement. <b>Carrega-la a la barca</b>: arrossega-la o toca-la. Després hauràs d'escriure el pronom feble que ocupa el seu lloc.</p>
    <svg class="av-stage" viewBox="0 0 ${W} ${H}" role="img" aria-label="Moll amb una caixa i una barca"></svg><div class="av-q2"></div>`;
   const svg=el.querySelector('svg'),q=el.querySelector('.av-q2');
   const crate=(x,y,w,f,cls)=>`<g ${cls||''}><rect x="${x}" y="${y}" width="${w}" height="${f*2.3}" rx="8" fill="#E2A15F" stroke="#8E5A2B" stroke-width="3"/><path d="M${x+6} ${y+6}h${w-12}M${x+6} ${y+f*2.3-6}h${w-12}" stroke="#C9874A" stroke-width="2"/><text x="${x+w/2}" y="${y+f*1.5}" text-anchor="middle" font-size="${f}" font-weight="500" fill="#3D2408">${esc(c)}</text></g>`;
   const draw=()=>{const loaded=phase>0,bw=Math.min(cw,hw*1.8),bf=fs*bw/cw;
    svg.innerHTML=`<rect width="${W}" height="${H}" fill="#DDF1FA"/><path d="M0 150q${W/8} -10 ${W/4} 0t${W/4} 0t${W/4} 0t${W/4} 0V${H}H0Z" fill="#7CC6E8"/>
     <path d="M0 120h${W*.44}v14H0Z" fill="#B98B5E"/><path d="M${W*.08} 134h12v${H-134}h-12ZM${W*.32} 134h12v${H-134}h-12Z" fill="#8E5A2B"/>
     <path d="M${bx-hw} 152h${hw*2}l-${hw*.28} 46h-${hw*1.44}Z" fill="#fff" stroke="#E86A9E" stroke-width="4" stroke-linejoin="round"/><path d="M${bx-hw*.95} 166h${hw*1.9}" stroke="#E86A9E" stroke-width="3"/>
     <path d="M${bx} 152V40" stroke="#8E5A2B" stroke-width="5"/><path d="M${bx+4} 46l${hw*.7} 90h-${hw*.7}Z" fill="#FBF3DF" stroke="#EFDDB5" stroke-width="2"/>
     ${loaded?crate(bx-bw/2,152-bf*2.3,bw,bf):crate(10,120-fs*2.3,cw,fs,'class="cav-crate" style="cursor:grab"')}`};
   const load=()=>{if(phase)return;phase=1;draw();api.restart();
    el.querySelector('.cav-frase').innerHTML=rH;
    q.innerHTML=tip0(`La caixa ja és a la barca i la frase s'ha quedat amb un forat. Escriu el <b>pronom feble i el verb</b> que hi van.`)+ans('Pronom feble + verb','Escriu-ho aquí');
    AV.onAnswer(q,check)};
   AV.drag(svg,{items:'.cav-crate',disabled:()=>phase>0,onDrop(g,p){if(p.x>W*.5)load();else draw()},onTap(){load()}});
   const apos=a0.includes("'"),prD=apos?a0.split("'")[0]+"'":a0.split(' ')[0];
   const steps=[`«${c}» respon a la pregunta <b>${K[0]}</b>: és ${K[1]}.`,
    `Aquest complement se substitueix pel pronom <b>${K[2]}</b>${apos?`; com que el verb comença per vocal, s'apostrofa: <b>${prD}</b>`:''}.`,
    `Amb un verb conjugat, el pronom va davant del verb: <b>${full}</b>`];
   function check(v,inp){const a=low(v);
    if(A.includes(a)){phase=2;api.ok({msg:`<b>La barca surt del port!</b> ${full}`});return}
    const vb=a0.replace(/^(l'|n'|\S+ )/,'');let err=null;
    if(apos&&[a0.replace(/^l'/,'la '),a0.replace(/^l'/,'el '),a0.replace(/^n'/,'en ')].includes(a))err='ca_apostrof_feble';
    else if(a.startsWith(vb+' ')||a.startsWith(vb+'-'))err='ca_av_feble_lloc';
    else if(c.split(' ').filter(w=>w.length>3).some(w=>noAcc(a).includes(noAcc(w))))err='ca_av_feble_compl';
    else if(t==='cipl'&&a.startsWith('les '))err='ca_ci_les';
    else if(t==='cipl'&&a.startsWith('li ')||t==='ci'&&a.startsWith('els '))err='ca_av_ci_nombre';
    else if((t==='ci'||t==='cipl')&&/^(el|la|les) |^l'/.test(a)||/^cd/.test(t)&&/^li /.test(a))err='ca_cd_li';
    const r=api.fail({err,k:kk(api,'ca_febles'),steps,msg:err?ERR[err].kid:`Pensa a quina pregunta respon «${c}»: què?, a qui? o on? Cada mena de complement té el seu pronom.`});
    if(r==='retry'){inp.value='';inp.focus()}}
   draw()}};

 /* ===================== 5. La biblioteca del far (ortografia de les consonants) ===================== */
 // [frase amb les {lletres amagades}, regla, per què]
 const ORT=[
  ['El ca{v}all del pagès menja palla.','b-v','com cavaller i cavalcar'],
  ['He tornat el lli{b}re a la biblioteca.','b-v','com llibreria i llibreta'],
  ['Les gavines {v}olen damunt les barques.','b-v','com vol i volar'],
  ['El pescador vol re{b}re una carta.','b-v','com rebut'],
  ['La {b}arca blava surt del port.','b-v','com barquer i barqueta'],
  ['El {j}ardí del far és ple de flors.','g-j','davant a s\'escriu j'],
  ['Els infants pu{j}aven les escales del far.','g-j','davant a s\'escriu j'],
  ['La {g}ent del poble balla a la plaça.','g-j','davant e, normalment g'],
  ['El {g}elat de llimona s\'ha fos.','g-j','davant e, normalment g'],
  ['Hem trobat un {j}oc de cartes vell.','g-j','davant o s\'escriu j'],
  ['El rello{tg}e de la plaça toca les deu.','tg-tj','davant e s\'escriu tg'],
  ['Anirem a la pla{tj}a després de dinar.','tg-tj','davant a s\'escriu tj'],
  ['Hem fet un via{tg}e en barca.','tg-tj','davant e s\'escriu tg'],
  ['M\'he posat un mi{tj}ó de cada color.','tg-tj','davant o s\'escriu tj'],
  ['La ca{s}a del faroner és blanca.','s-ss','entre vocals sona suau: s'],
  ['Avui fa ma{ss}a vent per sortir a pescar.','s-ss','entre vocals sona fort: ss'],
  ['La padrina cuina amb una ca{ss}ola de fang.','s-ss','entre vocals sona fort: ss'],
  ['Una ro{s}a vermella creix al jardí.','s-ss','entre vocals sona suau: s'],
  ['Ens veurem a la pla{ç}a del poble.','c-ç','so «s» davant a: ç'],
  ['Els moixos ca{ç}aven ratolins al moll.','c-ç','so «s» davant a: ç'],
  ['Hi ha {c}inc barques al port.','c-ç','so «s» davant i: c'],
  ['El {c}el és ben blau avui.','c-ç','so «s» davant e: c'],
  ['La for{ç}a de les onades és enorme.','c-ç','so «s» davant a: ç'],
  ['Hem anat al ca{m}p de futbol.','m-n','davant p s\'escriu m'],
  ['Els bo{m}bers han apagat el foc.','m-n','davant b s\'escriu m'],
  ['Hem rebut un co{n}vit per a la festa.','m-n','davant v s\'escriu n'],
  ['Hi ha una i{n}formació nova al tauler.','m-n','davant f s\'escriu n'],
  ['El te{m}ps és bo per navegar.','m-n','davant p s\'escriu m'],
  ['Hem posat la {x}arxa a assecar.','x-ix','a principi de paraula s\'escriu x'],
  ['Hi ha molts pe{ix}os dins la barca.','x-ix','darrere vocal s\'escriu ix'],
  ['Guardam les eines dins una ca{ix}a.','x-ix','darrere vocal s\'escriu ix'],
  ['El co{tx}e del metge és vermell.','x-ix','quan sona fort, com a «cotxe», s\'escriu tx'],
  ['La pan{x}a del moix és blanca.','x-ix','darrere consonant s\'escriu x']];
 const NOR={'b-v':'<b>b / v</b>: pensa en una paraula de la mateixa família (cavall → cavaller).','g-j':'<b>g / j</b>: davant a, o, u s\'escriu j; davant e, i, normalment g.','tg-tj':'<b>tg / tj</b>: davant e, i, tg (rellotge); davant a, o, u, tj (platja).',
  's-ss':'<b>s / ss</b>: entre vocals, so suau → s (casa); so fort → ss (massa).','c-ç':'<b>c / ç</b>: el so «s» davant a, o, u és ç (plaça); davant e, i, c (cel).','m-n':'<b>m / n</b>: davant p, b, m s\'escriu m; davant v, f, n.','x-ix':'<b>x / ix / tx</b>: x a principi de paraula o darrere consonant; ix darrere vocal; tx quan sona fort (cotxe).'};
 const RERR={'b-v':'ca_av_bv','g-j':'ca_av_gj','tg-tj':'ca_av_gj','s-ss':'ca_av_s_ss','c-ç':'ca_av_c_cedilla','m-n':'ca_m_n','x-ix':'ca_x_ix'};
 const RK=r=>r==='m-n'?'ca_m_n':r==='x-ix'?'ca_x_ix':'ca_consonants';
 const TOP={ca_consonants:['b-v','g-j','tg-tj','s-ss','c-ç'],ca_x_ix:['x-ix'],ca_m_n:['m-n']};
 const parseORT=([s,r,why])=>{const h=s.match(/\{(.+?)\}/)[1],tok=s.split(' ').find(x=>x.includes('{')),w=tok.replace(/[{}]/g,'').replace(/[.,!?]/g,'').replace(/^[a-z]'/i,'');return{s,r,why,h,w}};

 const biblio={id:'biblio',nom:'La biblioteca del far',desc:'Restaura les lletres que la humitat ha esborrat del diari del faroner.',
  skills:['ca_consonants','ca_x_ix','ca_m_n'],
  render(el,api){const all=Object.keys(NOR),want=[...new Set(api.ks.flatMap(k=>TOP[k]||[]))],w=want.length?want:all;
   let rules=AV.shuf(w).concat(AV.shuf(all.filter(r=>!w.includes(r))));
   rules=w.length===1?[w[0],w[0],rules[1]]:rules.slice(0,3);   // un sol tema: dues frases d'aquella regla
   const items=[];rules.forEach(r=>{const it=AV.shuf(ORT.filter(x=>x[1]===r&&!items.some(y=>y.s===x[0])))[0];if(it)items.push(parseORT(it))});
   el.innerHTML=`<p>A la biblioteca del far, la humitat ha esborrat algunes lletres del diari del faroner. <b>Escriu les lletres que falten</b> a cada forat. Llegeix cada frase en veu baixa: el so i les regles t'ajudaran.</p>
    <div class="cav-page">${items.map((it,i)=>`<p>${esc(it.s).replace(/\{(.+?)\}/,`<input class="cav-in" data-i="${i}" maxlength="3" inputmode="text" ${TXT} aria-label="Lletres que falten a la frase ${i+1}">`)}</p>`).join('')}</div>
    <div class="av-row"><button class="av-chk">Restaura el diari</button></div>`;
   const ins=[...el.querySelectorAll('.cav-in')],chk=el.querySelector('.av-chk');el._cav=items;
   ins.forEach((x,i)=>x.onkeydown=e=>{if(e.key==='Enter'){if(i<ins.length-1)ins[i+1].focus();else chk.click()}});
   ins[0].focus({preventScroll:true});
   const steps=[...items.map(it=>`<b>${it.w}</b>: ${it.why}.`),'Abans d\'escriure, mira quina lletra ve darrere i escolta com sona: així no has d\'endevinar.'];
   chk.onclick=()=>{const v=ins.map(x=>low(x.value));if(v.some(x=>!x)){api.tip('Omple tots els forats abans de comprovar.','warn');ins[v.findIndex(x=>!x)].focus();return}
    const bad=items.map((it,i)=>v[i]!==it.h);
    if(!bad.some(Boolean)){api.ok({msg:`<b>Diari restaurat!</b> ${items.map(it=>'<b>'+it.w+'</b>').join(', ')}: totes les lletres són al seu lloc.`});return}
    const bi=items.filter((_,i)=>bad[i]),n=bi.length,rs=[...new Set(items.map(it=>it.r))];   // totes les regles de la pàgina: no diu quin forat és el dolent
    api.fail({err:RERR[bi[0].r],k:kk(api,RK(bi[0].r)),steps,
     msg:`<b>La tinta encara no s'asseca.</b> ${n===1?'Hi ha un forat':'Hi ha '+n+' forats'} amb lletres que no hi van. Repassa ${rs.length>1?'aquestes regles':'aquesta regla'} i torna a llegir les frases: ${rs.map(r=>NOR[r]).join(' ')}`})};
  }};

 /* ===================== l'illa ===================== */
 const deco=`<path d="M0 166h58v10H0Z" fill="#B98B5E"/><path d="M14 176h6v26h-6ZM40 176h6v26h-6Z" fill="#8E5A2B"/>
  <g transform="translate(26,26)"><path d="M0 18h46l-8 12H8Z" fill="#fff" stroke="#E86A9E" stroke-width="2"/><path d="M22 18V0l16 14Z" fill="#FBF3DF"/></g>
  <g transform="translate(500,30)"><path d="M0 16h40l-7 10H7Z" fill="#fff" stroke="#5B8DEF" stroke-width="2"/><path d="M19 16V0l14 12Z" fill="#FBF3DF"/></g>
  <path d="M636 96q22-26 56-8v38h-56Z" fill="#B7B0A0"/>
  <path d="M654 94l4-60h16l4 60Z" fill="#fff" stroke="#E86A9E" stroke-width="2"/><path d="M656 76h20l-.7 9h-18.6ZM658 52h16l-.6 9h-14.8Z" fill="#E86A9E"/>
  <rect x="656" y="24" width="20" height="10" rx="3" fill="#F7C948"/><path d="M653 24h26l-13-11Z" fill="#E86A9E"/><path d="M680 27l16-7M680 30l16 6" stroke="#F7C948" stroke-width="3" stroke-linecap="round" opacity=".85"/>
  <g transform="translate(588,288)"><path d="M0 12h20v16H0Z" fill="#fff"/><path d="M-2 13l12-11 12 11Z" fill="#E2A15F"/><path d="M26 6h22v22H26Z" fill="#fff"/><path d="M24 7l13-10 13 10Z" fill="#C9874A"/><rect x="33" y="17" width="7" height="11" fill="#8E5A2B"/><rect x="6" y="17" width="7" height="6" fill="#9FC3F5"/></g>
  <circle cx="232" cy="272" r="15" fill="#A8D58F"/><circle cx="452" cy="182" r="18" fill="#A8D58F"/><path d="M80 60q18 -9 36 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`;

 (ILLES.catala=ILLES.catala||[]).push({id:'illa-paraules',nom:'L\'Illa de les Paraules',
  mapa:{mar:'#BFE6F5',sorra:'#F6E3B4',herba:'#D9EDC2',deco},
  segell:{nom:'El guardià del far',desc:'Un repte escrit, sense pistes i amb un sol intent.',txt:'«Escriu-ho bé sense ajuda i la llum del far s\'encendrà.»'},
  estacions:[moll,torre,taller,barca,biblio]});
})();
