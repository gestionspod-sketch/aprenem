/* Aprenem - MÚSICA: illa de l'aventura interactiva («L'Illa del Festival»)
   Part de l'app d'estudi. Vegeu CLAUDE.md (secció «Aventura: motor i illes») per a l'API del motor.
   Es carrega després de contingut/musica.js i contingut/musica-lm.js: en reaprofita el pentagrama
   (muNoteSVG, muRestSVG, muAcc, lmStaff, lmClefSVG), la teoria (lmIntOf, lmUp, lmKsAcc, lmMajor...) i el so (muAC, muTone, muClick).
   Estacions (jocs que es fan movent o tocant coses; la resposta queda amagada fins que es comprova):
     1. El faristol del director — posar una nota al pentagrama i llegir-ne una altra, en clau de sol o de fa
        (mu_notes, lm_clau_sol, lm_clau_fa, mu_ordre)
     2. El taller de compassos   — completar un compàs simple o compost amb figures i silencis
        (mu_completar, mu_compas, mu_silencis, lm_compassos, lm_ritme, mu_durades)
     3. La batucada              — tocar un ritme escrit al temps del metrònom (Web Audio, només després de tocar un botó)
        (mu_figures, mu_durades, lm_ritme, mu_silencis)
     4. La taula de so           — ordenar termes de dinàmica o de tempo i dir què volen dir (mu_dinamica, mu_tempo, lm_termes)
     5. Les campanes             — nombre i classe d'un interval, amb un teclat per comptar semitons (mu_intervals, lm_int_classe, lm_int_construir)
     6. L'armari de les armadures — escriure l'armadura d'una tonalitat amb sostinguts o bemolls (lm_armadura, lm_escala_major, lm_cercle, lm_relatiu)
     Segell (el posa el motor): l'assaig general, exercici escrit sense pistes amb un dels temes de la sessió.
   Les estacions de Primària van primer: si el motor ha d'afegir estacions de farciment, agafa les primeres de la llista.
   Ajuda pròpia (no és al motor): TX() fa una fila de resposta de TEXT (AV.answer és numèrica: teclat decimal al mòbil)
   i hi ha uns quants estils propis (mu-av-*) que s'afegeixen des d'aquí mateix. */

Object.assign(ERR,{
 mu_av_blanca:{kid:'Una blanca dura 2 temps: mentre sona no s\'hi torna a tocar. Deixa-la sonar i compta els temps per dins.',par:'En llegir ritmes, no manté les figures llargues (torna a tocar dins la durada d\'una blanca)'},
 mu_av_silenci:{kid:'Als silencis no es toca: també duren, però en silenci. Compta\'ls per dins.',par:'Toca a sobre dels silencis en llegir ritmes'},
 mu_av_corxeres:{kid:'Dues corxeres caben en un sol temps: són dos tocs ràpids i iguals dins el mateix temps.',par:'No divideix el temps en dues corxeres en llegir ritmes'},
 mu_av_arm_tipus:{kid:'Aquesta tonalitat no porta aquest tipus d\'alteració. Les tonalitats majors amb bemolls són fa major i les que tenen bemoll al nom (si♭, mi♭, la♭...); les altres porten sostinguts.',par:'Confon si una armadura porta sostinguts o bemolls'}
});

(()=>{
 /* ---------- ajudes comunes ---------- */
 if(!document.getElementById('muAvCss')){const st=document.createElement('style');st.id='muAvCss';st.textContent=`
.mu-av-score{background:#fff;border-radius:18px;padding:6px;margin:6px 0;overflow:hidden}
.mu-av-beats{display:flex;justify-content:center;gap:14px;align-items:center;min-height:46px;margin:6px 0;font-size:22px;font-weight:500;color:var(--pri-dd)}
.mu-av-beats i{width:22px;height:22px;border-radius:50%;background:var(--soft);display:inline-block;transition:transform .08s}
.mu-av-beats i.on{background:var(--pri);transform:scale(1.3)}
.mu-av-beats i.f.on{background:#F2853A}
button.mu-av-pad{display:block;width:100%;min-height:120px;border-radius:28px;font-size:24px;margin-top:10px;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
button.mu-av-pad.hit{transform:scale(.97);filter:brightness(1.18)}
button.av-chip.mu-av-fc{display:inline-flex;align-items:center;gap:6px;padding:0 12px 0 6px}
button.av-chip.mu-av-fc svg{flex:none}
.mu-av-big{max-width:470px;margin:0 auto}`;document.head.appendChild(st)}
 const TX=(label,ph='Escriu-ho aquí')=>AV.answer(label,ph).replace('inputmode="decimal"','inputmode="text"');
 const has=(api,k)=>api.ks.includes(k);
 const pOfY=y=>Math.round((78-y)/6)+2;           // posició a la pauta a partir de la y (coordenades de lmStaff)
 const lines=(x1,x2)=>[2,4,6,8,10].map(p=>`<path d="M${x1} ${muY(p)}H${x2}" stroke="${MU_COL}" stroke-width="1.3"/>`).join('');
 // on és una posició de la pauta, en paraules (2 = 1a línia ... 10 = 5a línia)
 const where=p=>p>=2&&p<=10?(p%2===0?`a la ${MU_ORDF[(p-2)/2+1]} línia`:`al ${MU_ORDM[(p-1)/2]} espai`):
  p===1?'just davall la primera línia':p===11?'just damunt la cinquena línia':
  p<1?(p%2===0?`a la ${MU_ORDF[(2-p)/2]} línia addicional de davall`:`davall la ${MU_ORDF[(1-p)/2]} línia addicional de davall`):
  (p%2===0?`a la ${MU_ORDF[(p-10)/2]} línia addicional de damunt`:`damunt la ${MU_ORDF[(p-11)/2]} línia addicional de damunt`);
 const audioOff='Aquest aparell no deixa fer sons ara mateix. Revisa el volum i torna-ho a provar.';

 /* ---------- 1. El faristol del director (lectura de notes) ---------- */
 const faristol={id:'faristol',nom:'El faristol del director',desc:'Posa al pentagrama la nota que demana el director i llegeix la que t\'ensenya.',
  skills:['mu_notes','lm_clau_sol','lm_clau_fa','mu_ordre'],
  render(el,api){const L=api.lv;
   const fa=has(api,'lm_clau_fa')&&(!(has(api,'lm_clau_sol')||has(api,'mu_notes'))||Math.random()<.5);
   const clef=fa?'fa':'sol',off=LM_OFF[clef],lo=[1,0,-2][L],hi=[11,12,14][L];
   const nm=p=>LM_L[lmMod(p-off,7)],solNm=p=>LM_L[lmMod(p,7)];
   const refP=fa?8:4,refN=fa?'fa':'sol';
   const ref=fa?'La clau de fa en 4a marca el <b>fa</b> a la quarta línia (la que queda entre els dos punts).':'La clau de sol marca el <b>sol</b> a la segona línia (on comença a dibuixar-se la clau).';
   const tp=rnd(lo,hi),tn=nm(tp);let rp;do rp=rnd(lo,hi);while(nm(rp)===tn||Math.abs(rp-tp)<2);
   const near=n=>{let b=null;for(let q=lo;q<=hi;q++)if(nm(q)===n&&(b===null||Math.abs(q-refP)<Math.abs(b-refP)))b=q;return b};
   const chain=p=>{if(p===refP)return[refN];const s=Math.sign(p-refP),o=[];for(let q=refP;q!==p+s;q+=s)o.push(nm(q));return o};
   let phase=0,cur=null;
   el.innerHTML=`<p>El director prepara el concert i et demana: <b>«Posa'm un ${tn}${fa?' en clau de fa':''}»</b>. Toca el pentagrama on va la nota (o arrossega-la des de la safata). Amb ▲ i ▼ la pots moure d'un lloc en un lloc. Qualsevol ${tn} val, també el d'una altra octava.</p>
    <svg class="av-stage mu-av-big" viewBox="0 -16 200 136" role="img" aria-label="Pentagrama en ${LM_CLEFN[clef]}"></svg>
    <div class="av-row mu-av-mv"><button class="sec av-up" aria-label="Puja la nota">▲ Amunt</button><button class="sec av-dn" aria-label="Baixa la nota">▼ Avall</button><button class="av-chk" disabled>Comprova la nota</button></div><div class="av-q2"></div>`;
   const svg=el.querySelector('svg'),chk=el.querySelector('.av-chk'),q=el.querySelector('.av-q2'),mv=el.querySelector('.mu-av-mv');
   const draw=()=>{let s=`<rect x="0" y="-16" width="200" height="136" fill="#fff"/>${lines(4,phase===0?152:196)}${lmClefSVG(clef)}`;
    if(phase===0){s+=`<rect x="158" y="28" width="38" height="52" rx="9" fill="#F1ECFF"/><text x="177" y="94" text-anchor="middle" font-size="9" fill="#8A879E">safata</text>`;
     s+=cur===null?`<g class="tok" style="cursor:grab"><rect x="158" y="28" width="38" height="52" fill="transparent"/>${muNoteSVG(177,{n:6,d:'r',hi:1}).replace(/<path d="M\d[^"]*h24"[^>]*>/g,'')}</g>`
      :`<g class="tok" style="cursor:grab"><rect x="88" y="${muY(cur)-10}" width="44" height="20" fill="transparent"/>${muNoteSVG(110,{n:cur,d:'r',hi:1})}</g>`}
    else s+=muNoteSVG(110,{n:rp,d:'r',hi:1});
    svg.innerHTML=s;chk.disabled=phase!==0||cur===null};
   const put=p=>{if(phase!==0)return;if(p.x>=50&&p.x<=154)cur=Math.max(-3,Math.min(15,pOfY(p.y)));else if(p.x>154)cur=null;draw()};
   AV.drag(svg,{items:'.tok',disabled:()=>phase!==0,onDrop(g,p){put(p)},onTap(){},onTapEmpty(p){put(p)}});
   el.querySelector('.av-up').onclick=()=>{if(phase)return;cur=cur===null?6:Math.min(15,cur+1);draw()};
   el.querySelector('.av-dn').onclick=()=>{if(phase)return;cur=cur===null?6:Math.max(-3,cur-1);draw()};
   const bp=near(tn);
   const steps1=[ref,bp===refP?`El ${tn} és just la nota que marca la clau.`:`Des del ${refN} compta nota a nota ${bp>refP?'cap amunt':'cap avall'}, alternant línia i espai: ${chain(bp).join(', ')}.`,
    `El ${tn} va <b>${where(bp)}</b> (també el pots posar una octava més amunt o més avall).`];
   chk.onclick=()=>{if(cur===null)return;
    if(nm(cur)===tn){phase=1;draw();mv.style.display='none';api.clear();api.restart();el.querySelector('p').innerHTML=`Has posat bé el ${tn}. Ara el director t'ensenya una altra nota${fa?' en clau de fa':''}: llegeix-la i escriu com es diu.`;
     q.innerHTML=`<div class="av-tip ok">${AV.owl(36)}<div>Molt bé: aquest és un ${tn}. Ara el director t'ensenya una altra nota al faristol. <b>Quina és?</b></div></div>${TX('Nom de la nota')}`;
     AV.onAnswer(q,v=>read(v));return}
    let err=null;if(nm(cur+1)===tn||nm(cur-1)===tn)err='mu_nota_veina';if(fa&&solNm(cur)===tn)err='lm_clau';
    const r=api.fail({err,steps:steps1,msg:`<b>Aquesta no és!</b> Has posat la nota ${where(cur)}, i allà hi va un <b>${nm(cur)}</b>, no un ${tn}. ${err?ERR[err].kid:`Comença pel ${refN}, que el marca la clau, i compta línia-espai-línia.`}`});
    if(r==='retry'){cur=null;draw()}};
   const steps2=[ref,rp===refP?`La nota és just on marca la clau.`:`La nota és ${where(rp)}. Des del ${refN}: ${chain(rp).join(', ')}.`,`És un <b>${nm(rp)}</b>.`];
   function read(v){const ok=lmIn(v,lmNoteTxt({l:rp-off,a:0}));
    if(ok){phase=2;api.ok({msg:`<b>Bravo!</b> Has posat el ${tn} i has llegit el <b>${nm(rp)}</b> ${where(rp)}.`});return}
    if(!LM_L.some(n=>lmStrip(norm(v)).startsWith(n))){api.tip('Escriu el nom d\'una nota: do, re, mi, fa, sol, la o si.','warn');return}
    let err=null;if(lmIn(v,[nm(rp+1)])||lmIn(v,[nm(rp-1)]))err='mu_nota_veina';if(fa&&lmIn(v,[solNm(rp)]))err='lm_clau';
    api.fail({err,steps:steps2,msg:`<b>No és ${esc(v)}.</b> ${err?ERR[err].kid:`La nota és ${where(rp)}: compta des del ${refN}, que el marca la clau.`}`})}
   draw()}};

 /* ---------- 2. El taller de compassos (completar) ---------- */
 const UV={r:16,b:8,n:4,c:2,s:1};                       // valors en semicorxeres
 const fv=f=>UV[f.d]*(f.dot?1.5:1);
 const fnm=f=>(f.rest?'silenci de ':'')+MU_F[f.d].nom+(f.dot?' amb puntet':'');
 const figIco=f=>`<svg viewBox="0 12 50 74" width="28" height="42" aria-hidden="true">${f.rest?(f.d==='b'?'<path d="M12 54h26" stroke="#1F2A44" stroke-width="1.3"/>':'')+muRestSVG(25,f.d)+(f.dot?`<circle cx="38" cy="48" r="2.6" fill="${MU_COL}"/>`:''):muNoteSVG(20,{n:5,d:f.d,dot:f.dot})}</svg>`;
 const taller={id:'taller',nom:'El taller de compassos',desc:'Completa el compàs amb les figures que hi falten perquè la banda pugui assajar.',
  skills:['mu_completar','mu_compas','mu_silencis','lm_compassos','lm_ritme','mu_durades'],
  render(el,api){const L=api.lv;
   const comp=has(api,'lm_compassos')&&Math.random()<.7;
   const ts=comp?pick(L?['6/8','9/8','12/8']:['6/8','9/8']):pick(L?['2/4','3/4','4/4']:['3/4','4/4']);
   const [a,b]=ts.split('/').map(Number),cap=a*16/b,beat=comp?6:4;
   const rests=has(api,'mu_silencis')||L>0,dots=has(api,'lm_ritme')||L>1;
   let opts=comp?[{d:'n',dot:1},{d:'n'},{d:'c'},{d:'b',dot:1}]:[{d:'b'},{d:'n'},{d:'c'}];
   if(!comp&&a===4)opts.unshift({d:'r'});if(!comp&&dots)opts.push({d:'n',dot:1});
   if(rests)opts.push(comp?{d:'c',rest:1}:{d:'n',rest:1});if(rests&&!comp&&L>0)opts.push({d:'b',rest:1});
   // què falta (m) i què ja hi ha (pre), escrit per temps
   const ms=(comp?[2,4,6,8,12]:[2,4,6,8,12]).filter(x=>x<cap&&(L>0||x>=4));const m=pick(ms),pre=cap-m;
   const CH=comp?[[{d:'n',dot:1}],[{d:'c'},{d:'c'},{d:'c'}],[{d:'n'},{d:'c'}]].concat(rests?[[{d:'c',rest:1},{d:'n'}]]:[]):
    [[{d:'n'}],[{d:'n'}],[{d:'c'},{d:'c'}]].concat(rests?[[{d:'n',rest:1}]]:[]);
   const pf=[];let u=0;
   while(pre-u>=beat){if(!comp&&pre-u>=8&&Math.random()<.3){pf.push({d:'b'});u+=8;continue}if(comp&&pre-u>=12&&Math.random()<.25){pf.push({d:'b',dot:1});u+=12;continue}
    pick(CH).forEach(f=>pf.push({...f}));u+=beat}
   if(pre-u===2)pf.push({d:'c'});else if(pre-u===4)pf.push({d:'n'});
   const pitches=pf.map(()=>rnd(2,7)),preRest=pf.filter(f=>f.rest).reduce((s,f)=>s+fv(f),0);
   const vt=x=>comp?`${x/2} ${x===2?'corxera':'corxeres'}`:`${muFmt(R(x,4))} temps`;
   let placed=[],fin=false;
   el.innerHTML=`<p>La partitura de la banda té un compàs de <b>${ts}</b> a mig escriure. Completa'l amb figures o silencis: toca les peces de la safata per afegir-les al final del compàs.${comp?' Compte: és un compàs <b>compost</b>.':''}</p>
    <div class="mu-av-score"></div>
    <div class="av-tray">${opts.map((f,i)=>`<button class="av-chip mu-av-fc" data-i="${i}" aria-label="Afegeix: ${fnm(f)}">${figIco(f)}<span>${fnm(f)}</span></button>`).join('')}</div>
    <div class="av-count" aria-live="polite"></div>
    <div class="av-row"><button class="av-chk" disabled>Assaja el compàs</button><button class="sec av-undo">Treu la darrera</button><button class="sec av-clr">Treu-les totes</button></div>`;
   const sc=el.querySelector('.mu-av-score'),cnt=el.querySelector('.av-count'),chk=el.querySelector('.av-chk');
   const draw=()=>{const items=pf.map((f,i)=>f.rest?{r:f.d,dot:f.dot}:{n:pitches[i],d:f.d,dot:f.dot});items.push({gap:8});
    if(placed.length)placed.forEach((f,i)=>items.push(f.rest?{r:f.d,dot:f.dot,id:i,hi:1}:{n:5,d:f.d,dot:f.dot,id:i,hi:1}));else items.push({q:1,n:5});
    items.push({end:1});sc.innerHTML=lmStaff(items,{ts,minW:300,aria:`Compàs de ${ts} per completar`});
    cnt.textContent=placed.length?`Hi has afegit ${placed.length} ${placed.length===1?'peça':'peces'}. Toca'n una al pentagrama per treure-la.`:'Encara no hi has afegit cap peça.';
    chk.disabled=fin||!placed.length};
   sc.onclick=e=>{const g=e.target.closest('[data-n]');if(!g||fin)return;placed.splice(+g.dataset.n,1);draw()};
   el.querySelectorAll('.av-tray .av-chip').forEach(bt=>bt.onclick=()=>{if(!fin&&placed.length<8){placed.push({...opts[+bt.dataset.i]});draw()}});
   el.querySelector('.av-undo').onclick=()=>{if(!fin){placed.pop();draw()}};
   el.querySelector('.av-clr').onclick=()=>{if(!fin){placed=[];draw()}};
   const example=()=>{const ns=opts.filter(f=>!f.rest).sort((x,y)=>fv(y)-fv(x)),one=ns.find(f=>fv(f)===m);if(one)return fnm(one);
    const r=[];let rem=m;for(const f of ns)while(fv(f)<=rem){r.push(fnm(f));rem-=fv(f)}return r.join(' + ')};
   const steps=[comp?`El compàs de ${ts} és compost: té <b>${a} corxeres</b> (${a/3} temps de negra amb puntet).`:`El compàs de ${ts} té <b>${a} temps</b> (${a} negres).`,
    `Ja hi ha: ${pf.map(f=>`${fnm(f)} (${vt(fv(f))})`).join(' + ')} = ${vt(pre)}.`,
    `Falten ${vt(cap)} − ${vt(pre)} = <b>${vt(m)}</b>. Per exemple: ${example()}.`];
   chk.onclick=()=>{const sum=placed.reduce((s,f)=>s+fv(f),0);
    if(sum===m){fin=true;chk.disabled=true;el.querySelectorAll('.av-tray .av-chip,.av-undo,.av-clr').forEach(x=>x.disabled=true);
     api.ok({msg:`<b>La banda ja pot assajar!</b> ${vt(pre)} que hi havia + ${placed.map(f=>vt(fv(f))).join(' + ')} = ${vt(cap)}: el compàs de ${ts} és ple.`});return}
    let err=null;if(sum===cap)err='mu_compas_falta';else if(comp&&pre+sum===a*4)err='lm_compost';else if(preRest&&sum===m+preRest)err='mu_silenci_compta';
    const r=api.fail({err,steps,msg:`<b>La banda s'atura!</b> Amb les teves peces (${placed.map(fnm).join(', ')}) el compàs fa ${vt(pre+sum)}, i un compàs de ${ts} n'ha de fer ${vt(cap)}. ${err?ERR[err].kid:'Suma el que ja hi havia abans d\'afegir-hi res.'}`});
    if(r==='retry'){placed=[];draw()}};
   draw()}};

 /* ---------- 3. La batucada (tocar un ritme amb el metrònom) ---------- */
 const DUR={b:'2 temps',n:'1 temps',c:'mig temps'};
 const durT=e=>e.dot?'un temps i mig':DUR[e.d];
 const batucada={id:'batucada',nom:'La batucada',desc:'Toca el ritme escrit al temps del metrònom.',minMs:1,
  skills:['mu_figures','mu_durades','lm_ritme','mu_silencis'],
  render(el,api){const L=api.lv;
   const ts=L?pick(['2/4','3/4','4/4']):pick(['3/4','4/4']),a=+ts[0],bars=a===4&&L<2?1:2;
   const bpm=[66,72,80][L],beat=60/bpm,ei=beat/2,term=bpm<70?'Adagio':'Andante';
   const CH=[{len:2,f:[{d:'n'}]},{len:2,f:[{d:'n'}]},{len:4,f:[{d:'b'}]}];
   if(L>=1||has(api,'mu_silencis'))CH.push({len:2,f:[{d:'n',rest:1}]});
   if(L>=1||has(api,'lm_ritme'))CH.push({len:2,f:[{d:'c'},{d:'c'}]},{len:2,f:[{d:'c'},{d:'c'}]});
   if(L>=2||(L>=1&&has(api,'lm_ritme')))CH.push({len:4,f:[{d:'n',dot:1},{d:'c'}]});
   let ev=null;
   for(let g=0;g<80&&!ev;g++){const e=[];let u=0;
    for(let bb=0;bb<bars;bb++){let rem=2*a;while(rem>0){const c=pick(CH.filter(c=>c.len<=rem));c.f.forEach(f=>{const len=f.d==='b'?4:f.d==='c'?1:f.dot?3:2;e.push({...f,u,len,bar:bb});u+=len});rem-=c.len}}
    const ns=e.filter(x=>!x.rest);if(ns.length<3||e[0].rest||e.every(x=>x.d==='n'&&!x.dot&&!x.rest)||(L===0&&e[e.length-1].rest))continue;ev=e}
   if(!ev){ev=[];let u=0;for(let bb=0;bb<bars;bb++){ev.push({d:'b',u,len:4,bar:bb});u+=4;for(let k=2;k<a;k++){ev.push({d:'n',u,len:2,bar:bb});u+=2}}}
   const notes=ev.filter(x=>!x.rest),total=bars*2*a;
   const at=u=>{const bl=2*a,bb=Math.floor(u/bl),w=u%bl,bt=Math.floor(w/2)+1;return`${w%2?'a la segona meitat del':'al'} temps ${bt}${bars>1?` del compàs ${bb+1}`:''}`};
   const items=[];ev.forEach((x,i)=>{if(i&&x.bar!==ev[i-1].bar)items.push({bar:1});items.push(x.rest?{r:x.d,dot:x.dot}:{n:4,d:x.d,dot:x.dot})});items.push({end:1});
   el.innerHTML=`<p>La batucada de l'illa necessita algú que llegeixi el ritme. Prem <b>Comença</b>: sentiràs ${a} tocs de metrònom per entrar i després el metrònom continua. Toca el <b>botó gros</b> (o la barra d'espai) <b>una vegada a cada nota</b>, just quan comença. Als silencis i mentre dura una nota llarga, no es toca.</p>
    <p class="muted" style="font-size:15px">Tempo: <i>${term}</i> (${bpm} pulsacions per minut). Apuja el volum.</p>
    <div class="mu-av-score">${lmStaff(items,{ts,minW:260,aria:`Ritme en compàs de ${ts}`})}</div>
    <div class="mu-av-beats" aria-live="off">${Array.from({length:a},(_,i)=>`<i class="${i?'':'f'}"></i>`).join('')}</div>
    <div class="av-row"><button class="av-go">▶ Comença</button><button class="sec av-listen">Escolta com sona (ajuda)</button></div>
    <button class="mu-av-pad" disabled>Toca aquí</button>`;
   const go=el.querySelector('.av-go'),lis=el.querySelector('.av-listen'),pad=el.querySelector('.mu-av-pad'),bts=el.querySelector('.mu-av-beats');
   const dotsHTML=on=>Array.from({length:a},(_,i)=>`<i class="${i?'':'f'}${i===on?' on':''}"></i>`).join('');
   let run=null,taps=[];
   const stop=()=>{if(run){run.off=true;document.removeEventListener('keydown',run.key)}run=null;pad.disabled=true};
   const tick=()=>{if(!run||run.off)return;if(!el.isConnected){stop();return}const t=run.ac.currentTime,k=Math.floor((t-run.t0)/beat);
    if(k<0)bts.innerHTML=dotsHTML(-1);else if(k<a&&run.count)bts.innerHTML=`<span>${a-k}</span>`;else bts.innerHTML=dotsHTML(lmMod(k-(run.count?a:0),a));
    if(t>run.end+.35){const done=run.cb;stop();bts.innerHTML=dotsHTML(-1);done();return}setTimeout(tick,25)};
   function schedule(withNotes,cb){const ac=muAC();if(!ac){api.tip(audioOff,'warn');return false}
    const t0=ac.currentTime+.3,T0=t0+a*beat;for(let i=0;i<a+total/2;i++)muClick(ac,t0+i*beat,i%a===0);
    if(withNotes)notes.forEach(x=>muTone(ac,T0+x.u*ei,523.25,Math.max(.12,x.len*ei-.06),.25));
    run={ac,t0,T0,end:T0+total*ei,count:true,cb,off:false,key:null};tick();return true}
   const hit=()=>{if(!run||!run.tap)return;const ac=run.ac;taps.push(ac.currentTime-(ac.outputLatency||0)-run.T0);muTone(ac,ac.currentTime,659.25,.1,.16);
    pad.classList.add('hit');setTimeout(()=>pad.classList.remove('hit'),90)};
   pad.addEventListener('pointerdown',e=>{e.preventDefault();hit()});
   pad.addEventListener('click',e=>e.preventDefault());
   go.onclick=()=>{taps=[];api.clear();if(!schedule(false,evaluate))return;run.tap=true;go.disabled=true;lis.disabled=true;pad.disabled=false;
    run.key=e=>{if(!el.isConnected){stop();return}if(e.code==='Space'||e.key===' '||e.key==='Enter'){e.preventDefault();if(!e.repeat)hit()}};document.addEventListener('keydown',run.key);
    try{pad.focus({preventScroll:true})}catch(_){}};
   lis.onclick=()=>{api.hint('Escolta-ho bé: primer el compte enrere i després el ritme, amb el metrònom de fons. Després toca-ho tu.');go.disabled=true;lis.disabled=true;
    if(!schedule(true,()=>{go.disabled=false;lis.disabled=false}))go.disabled=lis.disabled=false};
   const steps=[...Array.from({length:bars},(_,bb)=>`${bars>1?`Compàs ${bb+1}`:'El compàs'} (${ts}): ${ev.filter(x=>x.bar===bb).map(x=>`${fnm(x)} (${durT(x)})`).join(', ')}.`),
    `Toca només on comença cada nota: ${notes.map(x=>at(x.u)).join(', ')}.`,
    'Compta «1, 2, 3...» per dins mentre toques: els silencis i les notes llargues també es compten, encara que no toquis.'];
   function evaluate(){go.disabled=false;lis.disabled=false;go.textContent='▶ Torna-ho a provar';
    const ex=notes.map(x=>x.u*ei),inR=taps.filter(t=>t>-ei*.6&&t<total*ei+ei*.6);
    if(!inR.length){api.tip('No has tocat cap vegada mentre sonava el ritme. Prem «Comença», espera el compte enrere i toca el botó gros a cada nota.','warn');return}
    const d0=inR.map(t=>ex.reduce((b,e)=>Math.abs(t-e)<Math.abs(t-b)?e:b,ex[0])).map((e,i)=>inR[i]-e).filter(d=>Math.abs(d)<.25).sort((x,y)=>x-y);
    const lat=d0.length?Math.max(-.12,Math.min(.12,d0[Math.floor(d0.length/2)])):0,tt=inR.map(t=>t-lat),tol=Math.min(.2,ei*.45);
    const used=[],miss=[];
    ex.forEach((e,i)=>{let j=-1,bd=1e9;tt.forEach((t,k)=>{const dd=Math.abs(t-e);if(!used[k]&&dd<=tol&&dd<bd){bd=dd;j=k}});if(j<0)miss.push(i);else used[j]=1});
    const extra=tt.filter((t,k)=>!used[k]);
    if(!miss.length&&!extra.length){api.ok({msg:`<b>La batucada sona perfecta!</b> Has tocat les ${notes.length} notes a temps.`});return}
    const say=[];let err=null;
    extra.forEach(t=>{const uu=Math.max(0,Math.min(total-1,Math.round(t/ei))),x=ev.find(z=>z.u<=uu&&uu<z.u+z.len);if(!x)return;
     if(x.u===uu&&!x.rest){if(!miss.includes(notes.indexOf(x)))say.push(`${at(uu)[0].toUpperCase()+at(uu).slice(1)} has tocat dues vegades: cada nota és un sol toc.`)}
     else if(x.rest){say.push(`Has tocat ${at(uu)}, i allà hi ha un silenci.`);err=err||'mu_av_silenci'}
     else{say.push(`Has tocat ${at(uu)}, i allà encara sona la ${fnm(x)} que comença ${at(x.u)} (dura ${durT(x)}).`);err=err||(x.d==='b'?'mu_av_blanca':x.dot?'mu_puntet':null)}});
    miss.forEach(i=>{const x=notes[i];say.push(`La ${fnm(x)} ${at(x.u)} no l'has tocada a temps.`);if(x.d==='c')err=err||'mu_av_corxeres'});
    const r=api.fail({err,steps,msg:`<b>La batucada s'ha descompassat.</b> ${[...new Set(say)].slice(0,2).join(' ')} ${err?ERR[err].kid:'Compta els temps per dins i toca només on comença cada nota.'}`});
    if(r==='lock'){go.disabled=true;lis.disabled=true;setTimeout(()=>{if(el.isConnected){go.disabled=false;lis.disabled=false}},AVENTURA.LOCK_S*1000)}}
   bts.innerHTML=dotsHTML(-1)}};

 /* ---------- 4. La taula de so (dinàmica i tempo) ---------- */
 const TEMG=[['Largo'],['Lento','Adagio'],['Andante'],['Moderato'],['Allegro'],['Presto']];
 const DINR=MU_DIN.slice(0,6).map(muDinRow);   // pp p mp mf f ff
 const TEMR=t=>MU_TEMPO.find(r=>r[0]===t);
 const taula={id:'taula',nom:'La taula de so',desc:'Ordena els termes de dinàmica o de tempo a la taula de so i digues què volen dir.',
  skills:['mu_dinamica','mu_tempo','lm_termes'],
  render(el,api){const L=api.lv;
   const dyn=has(api,'mu_dinamica')&&!has(api,'mu_tempo')?true:has(api,'mu_tempo')&&!has(api,'mu_dinamica')?false:Math.random()<.5;
   let its;
   if(dyn){const pool=L===0?DINR.filter(r=>r.lv===0):DINR;its=AV.shuf(pool).slice(0,4).map(r=>({t:r.s,rank:DINR.indexOf(r),mean:r.m[0],ok:r.m.concat(),row:r}))}
   else{const gs=TEMG.map((g,i)=>({g:g.filter(t=>L>0||(TEMR(t)[3]||0)===0),i})).filter(x=>x.g.length);
    its=AV.shuf(gs).slice(0,4).map(x=>{const t=pick(x.g),r=TEMR(t);return{t,rank:x.i,mean:r[2],ok:r[1].split('|'),row:r}})}
   its.sort((x,y)=>x.rank-y.rank);
   const ord=AV.shuf(its.map((_,i)=>i));let slot=[null,null,null,null],sel=null,phase=0;
   const lab=dyn?['més fluix','més fort']:['més lent','més ràpid'];
   el.innerHTML=`<p>Abans del concert cal preparar la taula de so. Posa els quatre ${dyn?'signes de <b>dinàmica</b>':'termes de <b>tempo</b>'} als controls, del ${lab[0]} al ${lab[1]}: arrossega cada targeta (o toca una targeta i després el control).</p>
    <svg class="av-stage" viewBox="0 0 600 270" role="img" aria-label="Taula de so amb quatre controls"></svg>
    <div class="av-row"><button class="av-chk" disabled>Prova el so</button><button class="sec av-clr">Treu-les totes</button></div><div class="av-q2"></div>`;
   const svg=el.querySelector('svg'),chk=el.querySelector('.av-chk'),q=el.querySelector('.av-q2');
   const SX=i=>75+i*150,TX_=i=>75+ord.indexOf(i)*150;
   const card=(i,x,y,big)=>{const it=its[i],w=128,h=54,on=sel===i;return`<g class="mu-tc" data-i="${i}" style="cursor:grab"><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="14" fill="${on?'#8B6CF0':'#fff'}" stroke="${on?'#6E4FE0':'#D9D6E4'}" stroke-width="2"/>
     <text x="${x}" y="${y+(dyn?10:8)}" text-anchor="middle" font-size="${dyn?30:21}" font-style="italic" font-weight="700" font-family="${dyn?"Georgia,'Times New Roman',serif":'inherit'}" fill="${on?'#fff':'#1E1B3A'}">${esc(it.t)}</text></g>`};
   const draw=()=>{let s=`<rect width="600" height="270" rx="22" fill="#2E2A4F"/><rect x="14" y="14" width="572" height="150" rx="16" fill="#3B3664"/>
     <text x="30" y="40" font-size="14" fill="#C9C3F0">← ${lab[0]}</text><text x="570" y="40" text-anchor="end" font-size="14" fill="#C9C3F0">${lab[1]} →</text>`;
    for(let i=0;i<4;i++){const x=SX(i);s+=`<g class="slot" data-s="${i}"><rect x="${x-68}" y="54" width="136" height="98" rx="14" fill="#4A4478"/><line x1="${x}" y1="66" x2="${x}" y2="96" stroke="#6D66A6" stroke-width="6" stroke-linecap="round"/><circle cx="${x}" cy="81" r="9" fill="#9C93D8"/></g>`}
    slot.forEach((it,i)=>{if(it!==null)s+=card(it,SX(i),124)});
    its.forEach((_,i)=>{if(!slot.includes(i))s+=card(i,TX_(i),220)});
    svg.innerHTML=s;chk.disabled=phase!==0||slot.includes(null)};
   const slotAt=p=>p.y>40&&p.y<175?Math.max(0,Math.min(3,Math.round((p.x-75)/150))):null;
   const putIn=(i,s)=>{const was=slot.indexOf(i);if(s===null){if(was>=0)slot[was]=null}else{const other=slot[s];if(was>=0)slot[was]=other;else if(other!==null)slot[s]=null;slot[s]=i}sel=null;draw()};
   AV.drag(svg,{items:'.mu-tc',disabled:()=>phase!==0,onDrop(g,p){putIn(+g.dataset.i,slotAt(p))},
    onTap(g){const i=+g.dataset.i;if(slot.includes(i)){slot[slot.indexOf(i)]=null;sel=i}else sel=sel===i?null:i;draw()},
    onTapEmpty(p){const s=slotAt(p);if(sel!==null&&s!==null)putIn(sel,s)}});
   el.querySelector('.av-clr').onclick=()=>{if(phase===0){slot=[null,null,null,null];sel=null;draw()}};
   const seen=new Set();
   const steps=dyn?['La dinàmica diu si es toca fort o fluix: <i>p</i> (piano) vol dir fluix i <i>f</i> (forte), fort.','Amb una <i>m</i> davant (mezzo) vol dir «mig»: <i>mp</i> mig fluix, <i>mf</i> mig fort. Amb la lletra doble vol dir «molt»: <i>pp</i> molt fluix, <i>ff</i> molt fort.',`D'aquí, del més fluix al més fort: ${its.map(x=>`<i>${x.t}</i> (${x.mean})`).join(' → ')}.`]
    :['El tempo és la velocitat de la música. Del més lent al més ràpid: Largo, Lento, Adagio, Andante, Moderato, Allegro, Presto.',`Aquests termes, del més lent al més ràpid: ${its.map(x=>`<i>${x.t}</i> (${x.mean})`).join(' → ')}.`];
   chk.onclick=()=>{const rk=slot.map(i=>its[i].rank);
    if(slot.every((it,i)=>it===i)){phase=1;draw();api.clear();api.restart();el.querySelector('.av-clr').disabled=true;
     const cand=its.filter(x=>!seen.has(x.t)),X=pick(cand.length?cand:its);
     q.innerHTML=`<div class="av-tip ok">${AV.owl(36)}<div>La taula ja està a punt. Ara el tècnic de so et pregunta: <b>què vol dir <i>${esc(X.t)}</i>?</b></div></div>${TX('Què vol dir?','Escriu-ho amb paraules')}`;
     AV.onAnswer(q,v=>mean(v,X));return}
    let j=0;while(j<3&&rk[j]<rk[j+1])j++;const A=its[slot[j]],B=its[slot[j+1]];seen.add(A.t);seen.add(B.t);
    const rev=rk.every((x,i)=>!i||x<rk[i-1]),cross=dyn&&A.rank>=3&&B.rank<=2;
    const err=rev?(dyn?'mu_dinamica':'mu_tempo'):cross?'mu_dinamica':dyn?null:'mu_tempo';
    const r=api.fail({err,steps,msg:`<b>Sona estrany!</b> Has posat <i>${esc(A.t)}</i> abans de <i>${esc(B.t)}</i>, però <i>${esc(A.t)}</i> vol dir «${A.mean}» i <i>${esc(B.t)}</i> vol dir «${B.mean}». ${err&&rev?ERR[err].kid:`Pensa què vol dir cada ${dyn?'signe':'terme'} abans de posar-lo.`}`});
    if(r==='retry'){slot=[null,null,null,null];sel=null;draw()}};
   function mean(v,X){if(muIs(v,X.ok)){phase=2;api.ok({msg:`<b>So perfecte!</b> <i>${esc(X.t)}</i> vol dir «${X.mean}». Ordre: ${its.map(x=>`<i>${esc(x.t)}</i>`).join(' → ')}.`});return}
    let err=null;
    if(dyn){const c=DINR.find(r=>r.s===X.row.c);if(c&&muIs(v,c.m))err='mu_dinamica';else if(MU_TEMPO.some(r=>muIs(v,r[1].split('|'))))err='mu_din_tempo'}
    else{if(MU_DIN.some(r=>muIs(v,r[2].split('|'))))err='mu_tempo_din';else if(MU_TEMPO.some(r=>r!==X.row&&muIs(v,r[1].split('|'))))err='mu_tempo'}
    const i=its.indexOf(X);
    api.fail({err,steps:steps.concat([`<i>${esc(X.t)}</i> vol dir <b>${X.mean}</b>.`]),msg:`<b>No és ben bé això.</b> ${err?ERR[err].kid:''} Fixa't on l'has posat a la taula: ${i>0?`després de <i>${esc(its[i-1].t)}</i>`:'és el primer'}${i<3?` i abans de <i>${esc(its[i+1].t)}</i>`:' i és el darrer'}.`})}
   draw()}};

 /* ---------- 5. Les campanes (intervals) ---------- */
 const numOf=v=>{const s=lmStrip(norm(v)).replace(/^una? /,'').trim(),m=s.match(/^(\d)/);if(m)return+m[1];return LM_NUMW[s.split(/\s+/)[0]]||null};
 const qualOf=v=>{for(const w of lmStrip(norm(v)).split(/\s+/)){if(/^maj/.test(w))return'M';if(/^men/.test(w))return'm';if(/^(just|perf)/.test(w)||w==='j')return'J';if(/^aug/.test(w))return'A';if(/^dim|^dism/.test(w))return'd'}return null};
 function kbd(lo,hi,marks){const ws=[];for(let l=lo;l<=hi;l++)ws.push(l);const w=40,H=150;let s='';
  ws.forEach((l,i)=>{const on=marks.has(`${l}:0`);s+=`<g class="key" data-k="${l}:0" style="cursor:pointer"><rect x="${i*w+1}" y="1" width="${w-2}" height="${H-2}" rx="6" fill="${on?'#C9B8FA':'#fff'}" stroke="#B5B3C4" stroke-width="2"/><text x="${i*w+w/2}" y="${H-12}" text-anchor="middle" font-size="13" fill="#8A879E">${LM_L[lmMod(l,7)]}</text></g>`});
  ws.forEach((l,i)=>{if(i===ws.length-1||[2,6].includes(lmMod(l,7)))return;const on=marks.has(`${l}:1`);s+=`<g class="key" data-k="${l}:1" style="cursor:pointer"><rect x="${i*w+w*.68}" y="1" width="${w*.64}" height="${H*.6}" rx="4" fill="${on?'#8B6CF0':'#1E1B3A'}"/></g>`});
  return{svg:s,W:ws.length*w,H}}
 const campanes={id:'campanes',nom:'Les campanes',desc:'Esbrina quin interval fan les dues campanes del campanar.',
  skills:['mu_intervals','lm_int_classe','lm_int_construir'],
  render(el,api){const L=api.lv,cls=has(api,'lm_int_classe')||has(api,'lm_int_construir');
   let n1,n2,I,g=0;
   if(!cls){const k=rnd(2,L?8:5),lo=L?0:1,hi=L?12:11;let p;do p=rnd(lo,hi);while(p+k-1>hi);n1={l:p,a:0};n2={l:p+k-1,a:0};I={k}}
   else{do{const k=rnd(2,8);n1={l:rnd(0,6),a:L>1?pick([0,0,1,-1]):0};n2=L===0?{l:n1.l+k-1,a:0}:lmUp(n1,k,pick(lmQs(k,L>1)));I=lmIntOf(n1,n2)}while((Math.abs(n2.a)>1||!I.q)&&g++<80);
    if(!I.q){n1={l:0,a:0};n2={l:4,a:0};I=lmIntOf(n1,n2)}}
   const down=L>0&&Math.random()<.35,A=down?n2:n1,B=down?n1:n2;
   const marks=new Set(),kl=Math.min(n1.l,n2.l)-1;let kh=Math.max(n1.l,n2.l)+1;if(kh-kl<7)kh=kl+7;
   let phase=0;
   el.innerHTML=`<p>Al campanar del festival sonen dues campanes, una darrere l'altra. Quin <b>interval</b> fan? Escriu-ne el número (per exemple «3a» o «tercera»)${cls?' i després la classe':''}.</p>
    <div class="mu-av-score">${lmStaff([{n:A.l,acc:A.a,d:'r'},{gap:10},{n:B.l,acc:B.a,d:'r'}],{minW:200,aria:'Dues notes al pentagrama'})}</div>
    ${muSndBtn(lmEv([A,B],{gap:.9,dur:.8}),'Escolta les campanes')}
    <p class="muted" style="font-size:15px;margin-top:12px">Teclat per comptar: toca les tecles per marcar-les (i sentir-les). No diu la resposta: t'ajuda a comptar notes i semitons.</p>
    <svg class="av-stage" style="touch-action:manipulation;margin:6px auto 0" role="img" aria-label="Teclat per comptar"></svg>
    <div class="av-row"><button class="sec av-clr">Esborra les marques</button></div><div class="av-q2"></div>`;
   const kb=el.querySelector('svg.av-stage'),q=el.querySelector('.av-q2');
   const drawK=()=>{const k=kbd(kl,kh,marks);kb.setAttribute('viewBox',`0 0 ${k.W} ${k.H}`);kb.style.maxWidth=Math.round(k.W*1.1)+'px';kb.innerHTML=k.svg};
   kb.onclick=e=>{const g=e.target.closest('.key');if(!g)return;const id=g.dataset.k;if(marks.has(id))marks.delete(id);else marks.add(id);drawK();
    const [l,a]=id.split(':').map(Number),ac=muAC();if(ac)muTone(ac,ac.currentTime+.02,lmFreq({l,a}),.45,.22)};
   el.querySelector('.av-clr').onclick=()=>{marks.clear();drawK()};
   const chain=Array.from({length:I.k},(_,i)=>LM_L[lmMod(n1.l+i,7)]);
   const stepsN=[`Les notes són <b>${lmNom(A)}</b> i <b>${lmNom(B)}</b>${down?' (l\'interval baixa: compta igualment de la més greu a la més aguda)':''}.`,`Compta les notes incloent-hi la primera i la darrera: ${chain.map((x,i)=>`${x} (${i+1})`).join(', ')}.`,`Són ${I.k} notes: és una <b>${I.k}a</b> (${MU_INT[I.k]}).`];
   const stepsQ=I.q?stepsN.concat([`Ara els semitons de ${lmNom(n1)} a ${lmNom(n2)} (al teclat, d'una tecla a la del costat, blanca o negra, hi ha un semitò): <b>${I.s}</b>.`,`Una ${I.k}a amb ${I.s} semitons és <b>${lmIntName(I.k,I.q)}</b>. (${LM_SEMTAB})`]):stepsN;
   const ask=()=>{q.innerHTML=TX('Quin interval és?','Per exemple: 3a');AV.onAnswer(q,v=>check(v))};
   function check(v){if(phase===0){const k=numOf(v);if(!k||k<1||k>8){api.tip('Escriu el número de l\'interval, per exemple <b>3a</b> o <b>tercera</b>.','warn');return}
     if(k===I.k){if(!cls){phase=2;api.ok({msg:`<b>Les campanes repiquen!</b> De ${lmNom(A)} a ${lmNom(B)}: ${chain.join(', ')} → ${I.k} notes, una <b>${MU_INT[I.k]}</b>.`});return}
      const qq=qualOf(v);if(qq===I.q){phase=2;api.ok({msg:`<b>Les campanes repiquen!</b> És una <b>${lmIntName(I.k,I.q)}</b>: ${I.k} notes i ${I.s} semitons.`});return}
      phase=1;api.clear();api.restart();q.innerHTML=`<div class="av-tip ok">${AV.owl(36)}<div>Sí, és una <b>${I.k}a</b>. Ara la <b>classe</b>: compta els semitons (pots marcar les tecles). Major, menor, justa, augmentada o disminuïda?</div></div>${TX('Classe de l\'interval','Per exemple: major')}`;
      AV.onAnswer(q,v2=>check(v2));return}
     const err=Math.abs(k-I.k)===1?'mu_interval':null;
     api.fail({err,steps:cls?stepsQ:stepsN,msg:`<b>Les campanes desafinen.</b> De ${lmNom(A)} a ${lmNom(B)} no hi ha una ${k}a. ${err?ERR[err].kid:'Compta les notes una per una, incloent-hi la primera i la darrera.'}`});return}
    const qq=qualOf(v);if(!qq){api.tip('Escriu la classe: <b>major</b>, <b>menor</b>, <b>justa</b>, <b>augmentada</b> o <b>disminuïda</b>.','warn');return}
    if(qq===I.q){phase=2;api.ok({msg:`<b>Les campanes repiquen!</b> És una <b>${lmIntName(I.k,I.q)}</b>: ${I.k} notes i ${I.s} semitons.`});return}
    const bad=lmPerf(I.k)?['M','m'].includes(qq):qq==='J';
    api.fail({err:'lm_int_classe',steps:stepsQ,msg:bad?`<b>Les campanes desafinen.</b> Una ${I.k}a no pot ser ${LM_QN[qq]}: ${lmPerf(I.k)?'la 4a, la 5a i la 8a són justes (o augmentades o disminuïdes)':'la 2a, la 3a, la 6a i la 7a són majors o menors (o augmentades o disminuïdes)'}.`
     :`<b>Les campanes desafinen.</b> Una ${I.k}a ${LM_QN[qq]} tindria ${lmSemisOf(I.k,qq)} semitons. Compta, tecla a tecla, els semitons que hi ha de ${lmNom(n1)} a ${lmNom(n2)}.`})}
   drawK();ask()}};

 /* ---------- 6. L'armari de les armadures ---------- */
 const armari={id:'armari',nom:'L\'armari de les armadures',desc:'Escriu l\'armadura de la tonalitat que tocarà l\'orquestra.',
  skills:['lm_armadura','lm_escala_major','lm_cercle','lm_relatiu'],
  render(el,api){const L=api.lv;
   let n=lmNRange(L);if(!n)n=pick([1,-1]);
   const minor=has(api,'lm_relatiu')&&L>0&&Math.random()<.5,t=minor?lmMinor(n):lmMajor(n),key=lmKey(t,minor?'menor':'major'),acc=lmKsAcc(n);
   let placed=[],sel=null,fin=false;
   el.innerHTML=`<p>L'orquestra tocarà en <b>${key}</b> i a les partitures els falta l'<b>armadura</b>. Tria el sostingut o el bemoll i toca la línia o l'espai on va, en ordre (cada alteració nova es posa a la dreta de l'anterior).</p>
    <div class="av-tray"><button class="av-chip" data-a="1">♯ Sostingut</button><button class="av-chip" data-a="-1">♭ Bemoll</button></div>
    <svg class="av-stage mu-av-big" viewBox="0 -16 200 136" role="img" aria-label="Pentagrama en clau de sol per escriure l'armadura"></svg>
    <div class="av-count" aria-live="polite"></div>
    <div class="av-row"><button class="av-chk" disabled>Comprova l'armadura</button><button class="sec av-undo">Treu la darrera</button><button class="sec av-clr">Treu-les totes</button></div>`;
   const svg=el.querySelector('svg'),chk=el.querySelector('.av-chk'),cnt=el.querySelector('.av-count'),chips=el.querySelectorAll('.av-tray .av-chip');
   const draw=()=>{let s=`<rect x="0" y="-16" width="200" height="136" fill="#fff"/>${lines(4,196)}${MU_CLEF}`;
    placed.forEach((z,i)=>s+=muAcc(72+i*16,muY(z.p),z.a,MU_HI));svg.innerHTML=s;
    chips.forEach(b=>b.classList.toggle('on',+b.dataset.a===sel));
    cnt.textContent=placed.length?`Hi has posat ${placed.length} ${placed.length===1?'alteració':'alteracions'}.`:sel===null?'Tria primer el sostingut o el bemoll.':'Ara toca el pentagrama.';
    chk.disabled=fin||!placed.length};
   chips.forEach(b=>b.onclick=()=>{if(!fin){sel=+b.dataset.a;draw()}});
   svg.addEventListener('click',e=>{if(fin)return;if(sel===null){api.tip('Tria primer si vols posar un <b>sostingut</b> o un <b>bemoll</b>.','info');return}
    if(placed.length>=7)return;const p=AV.pt(svg,e);placed.push({p:Math.max(1,Math.min(11,pOfY(p.y))),a:sel});draw()});
   el.querySelector('.av-undo').onclick=()=>{if(!fin){placed.pop();draw()}};
   el.querySelector('.av-clr').onclick=()=>{if(!fin){placed=[];draw()}};
   const nmz=z=>({l:lmMod(z.p,7),a:z.a}),list=zs=>zs.map(z=>lmNomC(nmz(z))).join(', ');
   const M=lmMajor(n),last=acc[acc.length-1],sf=n>0?'sostinguts':'bemolls';
   const steps=[...(minor?[`${muCap(key)} té la mateixa armadura que la seva relativa major, <b>${lmKey(M,'major')}</b> (una 3a menor per damunt).`]:[]),
    n>0?`${muCap(lmKey(M,'major'))} porta sostinguts. Truc: el darrer sostingut és un semitò per davall de la tònica (${lmNom(M)}) → el darrer és <b>${lmNom(last)}</b>.`
     :n===-1?'Fa major porta un sol bemoll: <b>si♭</b>.':`${muCap(lmKey(M,'major'))} porta bemolls. Truc: la tònica (${lmNom(M)}) és el penúltim bemoll, així que n'hi ha un més: el darrer és <b>${lmNom(last)}</b>.`,
    `Ordre dels ${sf}: ${(n>0?LM_SH:LM_FL).map(l=>LM_L[l]).join(', ')}. Fins a ${lmNom(last)}: <b>${acc.map(lmNomC).join(', ')}</b> (${lmAltTxt(n)}).${lmStaff([],{ks:n,minW:200,aria:'Armadura correcta'})}`];
   chk.onclick=()=>{const zs=placed.map(nmz);
    if(zs.length===acc.length&&zs.every((z,i)=>z.l===lmMod(acc[i].l,7)&&z.a===acc[i].a)){fin=true;chk.disabled=true;chips.forEach(b=>b.disabled=true);el.querySelectorAll('.av-undo,.av-clr').forEach(b=>b.disabled=true);
     api.ok({msg:`<b>Les partitures ja estan llestes!</b> ${muCap(key)}: ${lmAltTxt(n)}, ${acc.map(lmNomC).join(', ')}.`});return}
    // l'armadura que ha escrit, és la d'alguna tonalitat?
    let pn=null;const ty=zs[0].a;if(zs.every(z=>z.a===ty)){const ref=lmKsAcc(ty*zs.length);if(zs.every((z,i)=>z.l===lmMod(ref[i].l,7)))pn=ty*zs.length}
    let err=null;
    if(zs.every(z=>z.a!==Math.sign(n)))err='mu_av_arm_tipus';
    else if(zs.length===acc.length&&zs.every(z=>z.a===Math.sign(n))&&acc.every(x=>zs.some(z=>z.l===lmMod(x.l,7)))&&pn===null)err='lm_ordre_alt';
    else if(minor&&pn!==null&&pn===lmNOf(t,'major'))err='lm_homonima';
    const what=pn!==null?`Aquesta armadura (${list(placed)}) és la de <b>${lmKey(lmMajor(pn),'major')}</b>${minor?` i ${lmKey(lmMinor(pn),'menor')}`:''}, no la de ${key}.`:`Has escrit ${list(placed)}: les alteracions d'una armadura són totes del mateix tipus i van sempre en el mateix ordre.`;
    const r=api.fail({err,steps,msg:`<b>Encara no.</b> ${what} ${err?ERR[err].kid:''}`});
    if(r==='retry'){placed=[];draw()}};
   draw()}};

 (ILLES.musica=ILLES.musica||[]).push({id:'festival',nom:'L\'Illa del Festival',
  mapa:{mar:'#C4E3F6',sorra:'#F6E3B4',herba:'#D6ECC2',
   deco:`<path d="M150 26Q260 52 370 26T590 26" fill="none" stroke="#fff" stroke-width="2"/>${[175,215,255,300,345,395,440,485,530,570].map((x,i)=>`<path d="M${x-7} ${26+Math.sin((x-150)/440*Math.PI*2)*-9+3}l7 14 7 -14Z" fill="${['#F2853A','#8B6CF0','#5FD3C4','#F7C948','#F28BB5'][i%5]}"/>`).join('')}
    <text x="38" y="80" font-size="30" fill="#fff" opacity=".85">♪</text><text x="640" y="300" font-size="34" fill="#fff" opacity=".85">♫</text><text x="660" y="60" font-size="26" fill="#fff" opacity=".7">♪</text><text x="20" y="300" font-size="26" fill="#fff" opacity=".7">♫</text>
    <path d="M376 330v-22h88v22Z" fill="#8B6CF0"/><path d="M368 308h104l-10 -12h-84Z" fill="#6E4FE0"/><circle cx="398" cy="302" r="3" fill="#F7C948"/><circle cx="420" cy="302" r="3" fill="#F7C948"/><circle cx="442" cy="302" r="3" fill="#F7C948"/>`},
  segell:{nom:'L\'assaig general',desc:'Un repte escrit, sense pistes i amb un sol intent.',txt:'«Toca-ho sense ajuda i el concert del festival començarà.»'},
  estacions:[faristol,taller,batucada,taula,campanes,armari]});
})();
