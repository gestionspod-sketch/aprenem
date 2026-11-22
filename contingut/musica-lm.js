/* Aprenem - contingut de MÚSICA: LLENGUATGE MUSICAL d'ensenyaments elementals (1r a 4t d'elementals)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Es carrega DESPRÉS de contingut/musica.js i en reaprofita el pentagrama (muNoteSVG, muAcc, muRestSVG),
   les figures (MU_F, muV, muFill...), el so (muSndBtn, muTone) i els errors típics.

   Dos nivells dins l'assignatura Música (es tria a la targeta «Nivell de Música»):
   - «Música de Primària»: les 11 unitats de contingut/musica.js (per a tothom).
   - «Llenguatge musical d'elementals»: les unitats d'aquest arxiu, per a qui fa conservatori o escola integrada.
     Cada unitat porta el curs d'elementals (1r-4t) on se sol treballar; l'infant tria fins a quin curs vol veure.
   La tria es guarda només en aquest aparell (localStorage, clau 'aprenem_musica').

   Fonts del temari (contrastades; el temari i els exercicis són originals):
   - Illes Balears: currículum dels ensenyaments elementals de música (Decret 23/2011, d'1 d'abril, i modificacions
     posteriors), assignatura de Llenguatge musical; pàgina «Currículums ensenyaments artístics» de la Conselleria
     d'Educació (caib.es/sites/ensenyamentsderegimespecial) i instruccions dels centres integrats CEIPIEEM.
   - Comunitat Valenciana: Decret 159/2007 (ensenyaments elementals de música), Llenguatge musical (DOGV).
   - Comunitat de Madrid: Decreto 7/2014 (plan de estudios de las enseñanzas elementales de música; Lenguaje
     Musical, Instrumento i Coro) i Orden de 2015 d'implantació.
   - Catalunya: programacions de Llenguatge musical de grau elemental de conservatoris i escoles de música
     (p. ex. plans docents públics del Conservatori de Tarragona) i continguts de la prova d'accés a grau professional.
   - Seqüència habitual dels mètodes més usats: Ibáñez-Cursá «Nuevo Lenguaje Musical», Robles «Lenguaje Musical
     Rítmico / Melódico», «Pentagrama» (Amat-Casanova, Boileau), Si Bemoll, Dinsic «Llenguatge musical» 1-4.
   Seqüència resumida: 1r-2n clau de sol i de fa en 4a, figures fins a la semicorxera, puntet, lligadura,
   compassos simples, signes de repetició, termes de tempo/dinàmica/articulació · 2n-3r compassos compostos,
   síncopes, contratemps, treset, alteracions i enharmonia, intervals (nombre i classe), escales majors, armadures,
   cercle de quintes, relatius, escales menors (natural, harmònica, melòdica) · 3r-4t graus tonals, acords tríada,
   clau de do en 3a i 4a, inversió d'intervals, transport, formes musicals i història bàsica.
   Temes: ids 'lm_*', mat:'musica'. Unitats a LM_UNITS. Errors típics 'lm_*' a ERR. */

/* ===================== nivell triat (Primària / elementals) ===================== */
const LM_KEY='aprenem_musica';let LM_C=null;
function lmCfg(){if(LM_C)return LM_C;let c={};try{c=JSON.parse(localStorage.getItem(LM_KEY)||'{}')||{}}catch(e){}
 LM_C={nivell:['pri','tots','lm'].includes(c.nivell)?c.nivell:'pri',ee:[1,2,3,4].includes(c.ee)?c.ee:4,ins:typeof c.ins==='string'?c.ins:''};return LM_C}
const LM_EXTRA=[]; // altres arxius hi afegeixen funcions c=>[unitats] (p. ex. «El meu instrument»)
function lmSetCfg(c){LM_C={...lmCfg(),...c};try{localStorage.setItem(LM_KEY,JSON.stringify(LM_C))}catch(e){}}
const lmOn=()=>lmCfg().nivell!=='pri';

/* ===================== teoria musical (càlcul) ===================== */
// Nota: {l, a}  l = grau diatònic absolut (0 = do central, 1 = re, 7 = do de dalt, -1 = si de davall...)
//               a = alteració (-2 doble bemoll, -1 bemoll, 0 natural, 1 sostingut, 2 doble sostingut)
const LM_L=MU_N,LM_SEMI=[0,2,4,5,7,9,11];
const lmMod=(x,m)=>((x%m)+m)%m;
const lmN12=x=>lmMod(x+6,12)-6;
const lmS=n=>12*Math.floor(n.l/7)+LM_SEMI[lmMod(n.l,7)]+n.a;
const LM_ACC={'-2':'doble bemoll','-1':'bemoll','0':'','1':'sostingut','2':'doble sostingut'};
const LM_SYM={'-2':'𝄫','-1':'♭','0':'','1':'♯','2':'𝄪'};
const lmNom=n=>LM_L[lmMod(n.l,7)]+(n.a?' '+LM_ACC[n.a]:'');
const lmNomC=n=>LM_L[lmMod(n.l,7)]+LM_SYM[n.a];
const lmFreq=n=>261.63*2**(lmS(n)/12);
const lmSame=(a,b)=>lmMod(a.l,7)===lmMod(b.l,7)&&a.a===b.a;
const lmSh=a=>[...a].sort(()=>Math.random()-.5);
// respostes acceptades: com les deixa norm() (minúscules, sense punts) i també sense accents
const lmStrip=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/·/g,'');
const lmV=list=>[...new Set(list.flatMap(s=>{const a=norm(s);return[a,lmStrip(a),a.replace(/ª/g,'a')]}))];
const lmF=(list,label='Resposta',wide=true)=>({label,txt:lmV(list),wide});
const lmIn=(v,list)=>v!=null&&lmV(list).includes(norm(v));
function lmNoteTxt(n){const b=LM_L[lmMod(n.l,7)];
 if(!n.a)return[b,`${b} natural`,`${b} becaire`];
 if(n.a===1)return[`${b} sostingut`,`${b}#`,`${b} #`,`${b}♯`,`${b} ♯`,`${b}sostingut`,`${b} sost`];
 if(n.a===-1)return[`${b} bemoll`,`${b}b`,`${b} b`,`${b}♭`,`${b} ♭`,`${b}bemoll`,`${b} bemol`];
 if(n.a===2)return[`${b} doble sostingut`,`${b}##`,`${b} ##`,`${b}x`,`${b} x`,`${b}𝄪`];
 return[`${b} doble bemoll`,`${b}bb`,`${b} bb`,`${b}𝄫`]}
const lmNF=(n,label='Nota')=>lmF(lmNoteTxt(n),label,false);
// lletra bona però alteració oblidada o equivocada
const lmLetterOnly=(v,n)=>v!=null&&!lmIn(v,lmNoteTxt(n))&&[-2,-1,0,1,2].some(a=>lmIn(v,lmNoteTxt({l:n.l,a})));

/* ---------- intervals ---------- */
const LM_IB=[0,0,2,4,5,7,9,11,12]; // semitons dels intervals majors i justos (índex = nombre)
const lmPerf=k=>[1,4,5,8].includes(k);
const LM_QN={M:'major',m:'menor',J:'justa',A:'augmentada',d:'disminuïda'};
const LM_QV={M:['major','maj'],m:['menor','men'],J:['justa','just','j','perfecta'],A:['augmentada','aug','augmentat'],d:['disminuïda','disminuida','dim','disminuït','disminuit']};
const LM_ORD=['','uníson','segona','tercera','quarta','quinta','sexta','sèptima','octava'];
const lmQual=(k,df)=>lmPerf(k)?({'-1':'d','0':'J','1':'A'})[df]:({'-2':'d','-1':'m','0':'M','1':'A'})[df];
const lmQDiff=(k,q)=>lmPerf(k)?{d:-1,J:0,A:1}[q]:{d:-2,m:-1,M:0,A:1}[q];
const lmIntOf=(n1,n2)=>{const k=n2.l-n1.l+1,s=lmS(n2)-lmS(n1);return{k,s,q:lmQual(k,s-LM_IB[k])}};
const lmUp=(n,k,q)=>{const l=n.l+k-1,t=lmS(n)+LM_IB[k]+lmQDiff(k,q);return{l,a:t-lmS({l,a:0})}};
const lmDown=(n,k,q)=>{const l=n.l-(k-1),t=lmS(n)-LM_IB[k]-lmQDiff(k,q);return{l,a:t-lmS({l,a:0})}};
const lmQs=(k,adv)=>!adv?(lmPerf(k)?['J']:['M','m']):lmPerf(k)?(k===8?['J']:['J','J','A','d']):['M','m','M','m',...(k!==2?['d']:[]),...(k!==7?['A']:[])];
const lmSemisOf=(k,q)=>LM_IB[k]+lmQDiff(k,q);
const lmIntName=(k,q)=>`${k}a ${LM_QN[q]}`;
function lmIntTxt(k,q){const nums=[`${k}a`,`${k}ª`,`${k}`,`${k} a`,LM_ORD[k],`una ${LM_ORD[k]}`].concat(k===6?['sisena']:k===7?['setena','septima']:[]);
 return nums.flatMap(n=>LM_QV[q].map(w=>`${n} ${w}`))}
const LM_NUMW={segona:2,tercera:3,quarta:4,quinta:5,cinquena:5,sexta:6,sisena:6,septima:7,setena:7,octava:8,unison:1};
function lmParseInt(v){if(!v)return null;const s=lmStrip(norm(v)).replace(/^una? /,'');
 const m=s.match(/^(\d)\s*(?:a|ª)?\s*(.+)$/)||s.match(/^([a-z]+)\s+(.+)$/);if(!m)return null;
 const k=/^\d$/.test(m[1])?+m[1]:LM_NUMW[m[1]];if(!k)return null;const w=m[2].trim();
 const q=/^maj/.test(w)?'M':/^men/.test(w)?'m':/^(j|just|perf)/.test(w)?'J':/^aug/.test(w)?'A':/^dim/.test(w)?'d':null;return q?{k,q}:null}
const LM_SEMTAB='2a m = 1 · 2a M = 2 · 3a m = 3 · 3a M = 4 · 4a J = 5 · 4a A = 6 · 5a d = 6 · 5a J = 7 · 6a m = 8 · 6a M = 9 · 7a m = 10 · 7a M = 11 · 8a J = 12';

/* ---------- tonalitats ---------- */
// n = alteracions de l'armadura (+ sostinguts, - bemolls), de -7 a 7
const LM_SH=[3,0,4,1,5,2,6],LM_FL=[6,2,5,1,4,0,3]; // ordre dels sostinguts (fa do sol re la mi si) i dels bemolls (si mi la re sol do fa)
const lmKsAcc=n=>n>0?LM_SH.slice(0,n).map(l=>({l,a:1})):LM_FL.slice(0,-n).map(l=>({l,a:-1}));
const lmMajor=n=>{const l=lmMod(4*n,7);return{l,a:lmN12(7*n-LM_SEMI[l])}};
const lmMinor=n=>{const l=lmMod(4*n+5,7);return{l,a:lmN12(7*n+9-LM_SEMI[l])}};
const lmNOf=(t,mode)=>{for(let n=-7;n<=7;n++){const x=mode==='menor'?lmMinor(n):lmMajor(n);if(lmSame(x,t))return n}return null};
const LM_SC={maj:[0,2,4,5,7,9,11],nat:[0,2,3,5,7,8,10],har:[0,2,3,5,7,8,11],mel:[0,2,3,5,7,9,11]};
const LM_SCN={nat:'natural',har:'harmònica',mel:'melòdica'};
const lmScale=(t,ty)=>LM_SC[ty].map((o,i)=>{const l=t.l+i;return{l,a:LM_SEMI[lmMod(t.l,7)]+t.a+o-lmS({l:l,a:0})+12*Math.floor(t.l/7)}});
const lmKey=(t,mode)=>`${lmNom(t)} ${mode}`;
const lmKeyTxt=(t,mode,bare)=>lmNoteTxt(t).flatMap(v=>[`${v} ${mode}`,...(bare?[v]:[])]);
const lmAltTxt=n=>`${Math.abs(n)} ${Math.abs(n)===1?(n>0?'sostingut':'bemoll'):(n>0?'sostinguts':'bemolls')}`;
const lmNRange=lv=>{const m=[3,5,7][lv];let n;do n=rnd(-m,m);while(lv<2&&n===0&&Math.random()<.6);return n};

/* ---------- pentagrama amb claus de sol, fa i do, armadura, lligadures i tresets ---------- */
const LM_OFF={sol:0,fa:12,do3:6,do4:8}; // posició a la pauta = l + LM_OFF (2 = 1a línia, 10 = 5a línia)
const LM_KSP={s:[10,7,11,8,5,9,6],f:[6,9,5,8,4,7,3]},LM_KSSH={sol:0,fa:2,do3:1,do4:3};
const LM_CLEFN={sol:'clau de sol',fa:'clau de fa en 4a',do3:'clau de do en 3a',do4:'clau de do en 4a'};
function lmClefSVG(c){if(c==='sol')return MU_CLEF;
 if(c==='fa'){const y=muY(8);return`<g fill="${MU_COL}"><circle cx="15" cy="${y}" r="4.2"/><path d="M12 ${y}C12 ${y-12} 36 ${y-13} 36 ${y+3}C36 ${y+18} 22 ${y+30} 10 ${y+35}" fill="none" stroke="${MU_COL}" stroke-width="3.4" stroke-linecap="round"/><circle cx="43" cy="${y-6}" r="2.7"/><circle cx="43" cy="${y+6}" r="2.7"/></g>`}
 const y=muY(c==='do3'?6:8);
 return`<g fill="none" stroke="${MU_COL}" stroke-linecap="round"><path d="M10 30V78" stroke-width="5"/><path d="M18 30V78" stroke-width="1.8"/><path d="M19 ${y}L26 ${y-5}C40 ${y-5} 41 ${y-24} 31 ${y-24}C26 ${y-24} 25 ${y-19} 28 ${y-17}M19 ${y}L26 ${y+5}C40 ${y+5} 41 ${y+24} 31 ${y+24}C26 ${y+24} 25 ${y+19} 28 ${y+17}" stroke-width="2.6"/></g>`}
// items: {n:l, acc, d:'r'|'b'|'n'|'c'|'s', dot, hi, lab, tie, tri, id} nota · {r:d, dot} silenci · {ch:[{n,acc}]} acord
//        {q:1, n} interrogant · {bar:1} · {end:1} · {repL:1} · {repR:1} · {gap:px}
function lmStaff(items,o={}){const clef=o.clef||'sol',off=LM_OFF[clef],ks=o.ks||0,pos=[];let x=o.noClef?14:50,body='',labs='',over='';
 if(ks){const sp=(ks>0?LM_KSP.s:LM_KSP.f).map(p=>p-LM_KSSH[clef]);for(let i=0;i<Math.abs(ks);i++){body+=muAcc(x+22,muY(sp[i]),ks>0?1:-1,MU_COL);x+=12}x+=12}
 if(o.ts){const[a,b]=o.ts.split('/');body+=`<g font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="27" fill="${MU_COL}" text-anchor="middle"><text x="${x+8}" y="52">${a}</text><text x="${x+8}" y="76">${b}</text></g>`;x+=34}else x+=8;
 const bl=xx=>`<path d="M${xx} 30V78" stroke="${MU_COL}" stroke-width="1.6"/>`,dots=xx=>`<circle cx="${xx}" cy="48" r="2.6" fill="${MU_COL}"/><circle cx="${xx}" cy="60" r="2.6" fill="${MU_COL}"/>`;
 for(const it of items){
  if(it.gap){x+=it.gap;continue}
  if(it.bar){x+=4;body+=bl(x);x+=20;continue}
  if(it.end){x+=4;body+=bl(x)+`<path d="M${x+6} 30V78" stroke="${MU_COL}" stroke-width="4.5"/>`;x+=12;continue}
  if(it.repL){body+=`<path d="M${x} 30V78" stroke="${MU_COL}" stroke-width="4.5"/>`+bl(x+6)+dots(x+12);x+=30;continue}
  if(it.repR){x+=2;body+=dots(x)+bl(x+6)+`<path d="M${x+12} 30V78" stroke="${MU_COL}" stroke-width="4.5"/>`;x+=26;continue}
  const c=it.hi?MU_HI:MU_COL;let s='';
  if(it.ch){const ns=[...it.ch].sort((a,b)=>b.n-a.n),na=ns.filter(z=>z.acc).length;x+=14*Math.max(0,na-1)+(na?14:0);let j=0;
   for(const z of ns){const p=z.n+off;s+=muNoteSVG(x,{n:p,d:'r',hi:it.hi});if(z.acc){s+=muAcc(x-14*j,muY(p),z.acc,c);j++}}
   body+=s;if(it.lab!=null)labs+=`<text x="${x}" y="124" text-anchor="middle" font-size="13" font-weight="700" fill="#475569">${it.lab}</text>`;x+=it.w||48;continue}
  const p=it.n!=null?it.n+off:null;if(it.acc)x+=14;
  if(it.r)s=muRestSVG(x+4,it.r,it.hi?MU_HI:null)+(it.dot?`<circle cx="${x+17}" cy="48" r="2.6" fill="${c}"/>`:'');
  else if(it.q)s=`<text x="${x}" y="${muY(p)+9}" text-anchor="middle" font-size="26" font-weight="800" fill="${MU_HI}">?</text>`;
  else{s=muNoteSVG(x,{n:p,d:it.d||'r',dot:it.dot,acc:it.acc,hi:it.hi});pos.push({x,p,tie:it.tie,tri:it.tri,d:it.d||'r'})}
  body+=it.id!=null?`<g data-n="${it.id}" style="cursor:pointer"><rect x="${x-17}" y="-4" width="34" height="124" fill="transparent"/>${s}</g>`:s;
  if(it.lab!=null)labs+=`<text x="${x}" y="124" text-anchor="middle" font-size="13" font-weight="700" fill="${it.hi?MU_HI:'#475569'}">${it.lab}</text>`;
  x+=(it.w||40)+(it.dot?6:0)}
 pos.forEach((a,i)=>{const b=pos[i+1];
  if(a.tie&&b){const dn=a.p<6,y=muY(a.p)+(dn?9:-9),y2=muY(b.p)+(dn?9:-9),cy=(y+y2)/2+(dn?10:-10);over+=`<path d="M${a.x+5} ${y}Q${(a.x+b.x)/2} ${cy} ${b.x-5} ${y2}" fill="none" stroke="${MU_COL}" stroke-width="2"/>`}
  if(a.tri&&pos[i+2]){const z=pos[i+2];over+=`<path d="M${a.x-4} 14V8H${z.x+8}V14" fill="none" stroke="${MU_COL}" stroke-width="1.5"/><rect x="${(a.x+z.x)/2-3}" y="2" width="14" height="12" fill="#fff"/><text x="${(a.x+z.x)/2+4}" y="12" text-anchor="middle" font-size="13" font-weight="700" font-style="italic" fill="${MU_COL}">3</text>`}});
 const W=Math.max(x+10,o.minW||0),H=labs?132:116;
 const lines=[2,4,6,8,10].map(p=>`<path d="M6 ${muY(p)}H${W-4}" stroke="${MU_COL}" stroke-width="1.3"/>`).join('');
 return`<svg class="mu-st" viewBox="0 -4 ${W} ${H}" width="${Math.round(W*1.7)}" style="max-width:100%;height:auto;display:block;margin:0 auto" role="img" aria-label="${o.aria||'Pentagrama'}">${lines}${o.noClef?'':lmClefSVG(clef)}${body}${over}${labs}${o.extra||''}</svg>`}
// so: notes seguides (i, si harm=true, totes juntes al final)
function lmEv(ns,{gap=.62,dur=.56,harm=false}={}){const ev=ns.map((n,i)=>({at:i*gap,f:lmFreq(n),dur}));if(harm)ns.forEach(n=>ev.push({at:ns.length*gap+.25,f:lmFreq(n),dur:1.3,vol:.2}));return ev}
const lmRomTxt=g=>[MU_ROM[g-1],`grau ${MU_ROM[g-1]}`,`${g}`,`grau ${g}`,`${g}è`,`${g}r`,`${g}n`,`${g}t`];

/* ---------- ritme ---------- */
const lmFigTxt=(d,dot)=>dot?[`${MU_F[d].nom} amb puntet`,`${MU_F[d].nom} amb punt`,`${MU_F[d].nom} puntejada`]:[MU_F[d].nom];
const lmTimes=fs=>fs.map(f=>muFmt(muV(f.d,f.dot))).join(' + ');
const LM_TS={'2/4':{t:'s',p:2,u:['negra'],f:['blanca']},'3/4':{t:'s',p:3,u:['negra'],f:lmFigTxt('b',1)},'4/4':{t:'s',p:4,u:['negra'],f:['rodona']},
 '2/2':{t:'s',p:2,u:['blanca'],f:['rodona']},'3/8':{t:'s',p:3,u:['corxera'],f:lmFigTxt('n',1)},
 '6/8':{t:'c',p:2,u:lmFigTxt('n',1),f:lmFigTxt('b',1)},'9/8':{t:'c',p:3,u:lmFigTxt('n',1),f:null},'12/8':{t:'c',p:4,u:lmFigTxt('n',1),f:lmFigTxt('r',1)},'6/4':{t:'c',p:2,u:lmFigTxt('b',1),f:lmFigTxt('r',1)}};
const LM_CLS=['','','binari','ternari','quaternari'];
const LM_EQ={'2/4':'6/8','3/4':'9/8','4/4':'12/8','2/2':'6/4'};

/* ===================== temes ===================== */
function lmClauGen(clef,lv){const off=LM_OFF[clef],lo=[1,-1,-3][lv],hi=[11,13,15][lv],n=lv===0?(Math.random()<.6?1:2):lv===1?3:4,ns=[];
 while(ns.length<n){const p=rnd(lo,hi),l=p-off,a=lv>1&&Math.random()<.4?pick([1,-1]):0;if(!ns.length||ns[ns.length-1].l!==l)ns.push({l,a})}
 const tip={sol:'Línies (de baix a dalt): mi, sol, si, re, fa. Espais: fa, la, do, mi.',fa:'Línies (de baix a dalt): sol, si, re, fa, la. Espais: la, do, mi, sol.',do3:'Línies (de baix a dalt): fa, la, do, mi, sol. Espais: sol, si, re, fa.',do4:'Línies (de baix a dalt): re, fa, la, do, mi. Espais: mi, sol, si, re.'}[clef];
 const ref={sol:'La clau de sol marca el <b>sol</b> a la 2a línia.',fa:'La clau de fa en 4a marca el <b>fa</b> a la 4a línia (entre els dos punts).',do3:'La clau de do en 3a marca el <b>do central</b> a la 3a línia.',do4:'La clau de do en 4a marca el <b>do central</b> a la 4a línia.'}[clef];
 const where=p=>p>=2&&p<=10?(p%2===0?`${MU_ORDF[(p-2)/2+1]} línia`:`${MU_ORDM[(p-1)/2]} espai`):p<2?'per davall del pentagrama':'per damunt del pentagrama';
 return{text:`${muCap(LM_CLEFN[clef])}. ${n===1?'Quina nota és?':'Escriu el nom de cada nota, d\'esquerra a dreta.'}${ns.some(z=>z.a)?' Digues també l\'alteració.':''}`,
  fig:lmStaff(ns.map((z,i)=>({n:z.l,acc:z.a,d:'n',hi:n===1,lab:n>1?i+1:null})),{clef})+muSndBtn(lmEv(ns),'Escolta-les'),
  fields:ns.map((z,i)=>lmNF(z,n>1?`Nota ${i+1}`:'Nota')),
  hints:[ref.replace(/<\/?b>/g,'')+' '+tip,'Troba primer la nota que marca la clau i compta línia-espai-línia a partir d\'ella.'],
  steps:[ref,...ns.map((z,i)=>`${n>1?`Nota ${i+1}: `:''}${where(z.l+off)} → <b>${lmNom(z)}</b>.`)],
  err:v=>{for(let i=0;i<ns.length;i++){const z=ns[i],p=z.l+off;if(clef!=='sol'&&lmIn(v[i],lmNoteTxt({l:p,a:z.a})))return'lm_clau'}
   for(let i=0;i<ns.length;i++){const z=ns[i];if(lmIn(v[i],lmNoteTxt({l:z.l-1,a:z.a}))||lmIn(v[i],lmNoteTxt({l:z.l+1,a:z.a})))return'mu_nota_veina';if(lmLetterOnly(v[i],z))return'mu_alteracio_oblida'}return null}}}

Object.assign(SK,{

/* ---------- 1. Claus ---------- */
lm_clau_sol:{mat:'musica',ab:'Sl',nom:'Lectura en clau de sol (amb línies addicionals)',
 teoria:['La <b>clau de sol</b> s\'escriu a la 2a línia: aquesta línia és el <b>sol</b> (sol4, el de damunt del do central).','Línies: <b>mi, sol, si, re, fa</b>. Espais: <b>fa, la, do, mi</b>.','Per davall i per damunt hi ha les <b>línies addicionals</b>: el do central (do4) té una línia addicional per davall; el la5, una per damunt; el do6, dues per damunt.','Truc: llegeix per <b>notes de referència</b> (do central, sol de la 2a línia, do del 3r espai, la de la 1a addicional de dalt) i compta a partir d\'elles.'],
 fig:()=>lmStaff([-2,0,2,4,6,7,9,12,14].map(l=>({n:l,d:'r',lab:LM_L[lmMod(l,7)],w:36})),{aria:'Notes de referència en clau de sol'}),
 gen(lv){return lmClauGen('sol',lv)}},

lm_clau_fa:{mat:'musica',ab:'Fa',nom:'Lectura en clau de fa en 4a',
 teoria:['La <b>clau de fa en 4a</b> s\'usa per als sons <b>greus</b> (piano mà esquerra, violoncel, fagot, contrabaix...). Els dos punts envolten la 4a línia: aquesta línia és el <b>fa</b> (fa3).','Línies: <b>sol, si, re, fa, la</b>. Espais: <b>la, do, mi, sol</b>.','El <b>do central</b> (do4) en clau de fa queda a la primera línia addicional <b>de damunt</b>: és el mateix do que en clau de sol té una línia addicional per davall.','Compte: no llegeixis com si fos clau de sol! En clau de fa, cada nota és <b>dues notes més amunt</b> que en clau de sol (la 1a línia és sol, no mi).'],
 fig:()=>lmStaff([-10,-8,-6,-4,-2,-9,-7,-5,-3,0].map(l=>({n:l,d:'r',lab:LM_L[lmMod(l,7)],w:34})),{clef:'fa',aria:'Línies i espais en clau de fa'}),
 gen(lv){return lmClauGen('fa',lv)}},

lm_clau_do:{mat:'musica',ab:'Do',nom:'Lectura en clau de do (en 3a i en 4a)',
 teoria:['La <b>clau de do</b> marca on és el <b>do central</b> (do4). La més usada és la <b>clau de do en 3a</b> (la de la viola): la 3a línia és el do central.','Clau de do en 3a: línies <b>fa, la, do, mi, sol</b>; espais <b>sol, si, re, fa</b>.','La <b>clau de do en 4a</b> (violoncel, fagot i trombó en els passatges aguts) posa el do central a la 4a línia: línies <b>re, fa, la, do, mi</b>; espais <b>mi, sol, si, re</b>.','Totes les claus serveixen per escriure les mateixes notes amb poques línies addicionals: cada instrument usa la clau que millor s\'adapta a la seva extensió.'],
 fig:()=>lmStaff([-4,-3,-2,-1,0,1,2,3,4].map(l=>({n:l,d:'r',lab:LM_L[lmMod(l,7)],w:34})),{clef:'do3',aria:'Notes en clau de do en 3a'}),
 gen(lv){return lmClauGen(lv>1&&Math.random()<.5||lv===1&&Math.random()<.3?'do4':'do3',lv)}},

/* ---------- 2. Ritme ---------- */
lm_ritme:{mat:'musica',ab:'Rt',nom:'Figures, puntets i lligadures',
 teoria:['Valors (negra = 1 temps): rodona 4 · blanca 2 · negra 1 · corxera ½ · semicorxera ¼. Cada figura val el doble de la següent.','El <b>puntet</b> afegeix la <b>meitat</b> del valor de la figura: negra amb puntet = 1 + ½ = 1½; corxera amb puntet = ½ + ¼ = ¾.','El <b>doble puntet</b>: el segon punt afegeix la meitat del primer. Blanca amb doble puntet = 2 + 1 + ½ = 3½.','La <b>lligadura de prolongació</b> uneix dues notes de la <b>mateixa altura</b>: només es toca la primera i dura la suma de les dues (blanca lligada a negra = 3 temps).'],
 fig:()=>lmStaff([{n:4,d:'b',tie:1,lab:'2'},{n:4,d:'n',lab:'+ 1'},{gap:10},{n:4,d:'n',dot:1,lab:'1½'},{n:4,d:'c',lab:'½'},{gap:10},{n:4,d:'c',dot:1,lab:'¾'},{n:4,d:'s',lab:'¼'}],{noClef:true,aria:'Lligadura i puntets'}),
 gen(lv){const t=pick(lv>1?['suma','lliga','doble','equiv','suma']:lv?['suma','lliga','equiv']:['suma','lliga']);
  const opts=[{d:'b'},{d:'n'},{d:'n'},{d:'c'},{d:'c'},{d:'n',dot:true}];if(lv>=1)opts.push({d:'s'},{d:'s'},{d:'b',dot:true},{d:'n',rest:true});if(lv>=2)opts.push({d:'c',dot:true},{d:'c',rest:true});
  if(t==='suma'){const fs=muFill(R(rnd(3,lv?5:4)),opts),s=muSum(fs);
   return{text:'Quants temps (negra = 1) dura aquest fragment? Compta també els silencis.',fig:lmStaff(fs.map(f=>f.rest?{r:f.d,dot:f.dot}:{n:rnd(2,8),d:f.d,dot:f.dot}),{noClef:true}),fields:[{label:'Temps',ans:s}],
    hints:['Escriu davall de cada figura el seu valor.','Puntet = afegeix la meitat. Pots escriure fraccions (3/4) o decimals (0,75).'],
    steps:[fs.map(f=>`${f.rest?'silenci de ':''}${muFigName(f.d,f.dot)} = ${muFmt(muV(f.d,f.dot))}`).join(' · '),`Total: ${lmTimes(fs)} = <b>${muFmt(s)}</b> temps.`],err:null}}
  if(t==='lliga'){const k=lv>1?rnd(2,3):2,ch=[];const o2=[{d:'r'},{d:'b'},{d:'n'},{d:'c'},{d:'b',dot:true},{d:'n',dot:true}].concat(lv?[{d:'s'}]:[]);for(let i=0;i<k;i++)ch.push(pick(o2));
   const s=muSum(ch),first=muV(ch[0].d,ch[0].dot),p=rnd(3,8);
   return{text:'Quants temps <b>sona</b> la nota lligada (en color)?',fig:lmStaff([{n:rnd(2,8),d:'n'},...ch.map((f,i)=>({n:p,d:f.d,dot:f.dot,hi:1,tie:i<k-1})),{n:rnd(2,8),d:'n'}],{noClef:true}),fields:[{label:'Temps',ans:s}],
    hints:['La lligadura uneix notes de la mateixa altura: es toca una sola vegada.','Suma el valor de totes les figures lligades.'],
    steps:[ch.map(f=>`${muFigName(f.d,f.dot)} = ${muFmt(muV(f.d,f.dot))}`).join(' + '),`La nota sona <b>${muFmt(s)}</b> temps.`],err:x=>req(x[0],first)&&!req(first,s)?'lm_lligadura':null}}
  if(t==='doble'){const d=pick(['r','b','n']),v=MU_F[d].v,ans=R(v.n*7,v.d*4),one=muV(d,true);
   return{text:`Quants temps dura una <b>${MU_F[d].nom} amb doble puntet</b>?`,fields:[{label:'Temps',ans}],
    hints:[`El primer puntet afegeix la meitat de la ${MU_F[d].nom}.`,'El segon puntet afegeix la meitat del que ha afegit el primer.'],
    steps:[`${muCap(MU_F[d].nom)} = ${muFmt(v)}.`,`1r puntet: + ${muFmt(R(v.n,v.d*2))}. 2n puntet: + ${muFmt(R(v.n,v.d*4))}.`,`Total: <b>${fmtR(ans)}</b> temps (${(ans.n/ans.d).toString().replace('.',',')}).`],err:x=>req(x[0],one)?'mu_puntet':null}}
  const big=pick([['b',true],['n',true],['r',false],['b',false]]),sm=pick(['n','c','s'].filter(z=>muLt(muV(z),muV(big[0],big[1])))),k=R(muV(big[0],big[1]).n*MU_F[sm].v.d,muV(big[0],big[1]).d*MU_F[sm].v.n);
  return{text:`Quantes <b>${MU_F[sm].nom}s</b> valen el mateix que una <b>${muFigName(big[0],big[1])}</b>?`,fields:[{label:'Quantes',ans:k}],
   hints:['Passa les dues figures a temps (negra = 1).','Divideix: quantes vegades cap la petita dins la gran?'],
   steps:[`${muCap(muFigName(big[0],big[1]))} = ${muFmt(muV(big[0],big[1]))} · ${MU_F[sm].nom} = ${muFmt(MU_F[sm].v)}.`,`${muFmt(muV(big[0],big[1]))} : ${muFmt(MU_F[sm].v)} = <b>${fmtR(k)}</b>.`],
   err:x=>big[1]&&req(x[0],R(muV(big[0]).n*MU_F[sm].v.d,muV(big[0]).d*MU_F[sm].v.n))?'mu_puntet':null}}},

/* ---------- 3. Signes i termes ---------- */
lm_repeticio:{mat:'musica',ab:'Rp',nom:'Signes de repetició, D.C. i caselles',
 teoria:['<b>Barres de repetició</b> (𝄆 … 𝄇): es repeteix el tros que hi ha entre els dos signes. Si només hi ha el signe del final, es repeteix des del <b>principi</b>.','<b>1a i 2a casella</b> (1. 2.): la primera vegada es toca la 1a casella i es torna enrere; la segona vegada se salta la 1a casella i es toca la 2a.','<b>D.C. al Fine</b> (<i>da capo</i>): tornar al principi i acabar on diu <b>Fine</b>. <b>D.S. al Fine</b> (<i>dal segno</i>): tornar al signe 𝄋 i acabar a Fine.','Als exercicis, escriu l\'ordre dels compassos separats per espais, comes o guionets (p. ex. 1 2 3 2 3 4).'],
 svg(bars,extra){const w=58,h=44,y0=34;let s='';bars.forEach((b,i)=>{const x=14+i*w;
   s+=`<rect x="${x}" y="${y0}" width="${w}" height="${h}" fill="#fff" stroke="${MU_COL}" stroke-width="1.2"/><text x="${x+w/2}" y="${y0+28}" text-anchor="middle" font-size="18" font-weight="800" fill="${MU_COL}">${b.n}</text>`;
   if(b.repL)s+=`<path d="M${x+3} ${y0}v${h}" stroke="${MU_COL}" stroke-width="5"/><path d="M${x+9} ${y0}v${h}" stroke="${MU_COL}" stroke-width="1.6"/><circle cx="${x+15}" cy="${y0+15}" r="2.6" fill="${MU_COL}"/><circle cx="${x+15}" cy="${y0+29}" r="2.6" fill="${MU_COL}"/>`;
   if(b.repR)s+=`<path d="M${x+w-3} ${y0}v${h}" stroke="${MU_COL}" stroke-width="5"/><path d="M${x+w-9} ${y0}v${h}" stroke="${MU_COL}" stroke-width="1.6"/><circle cx="${x+w-15}" cy="${y0+15}" r="2.6" fill="${MU_COL}"/><circle cx="${x+w-15}" cy="${y0+29}" r="2.6" fill="${MU_COL}"/>`;
   if(b.cas)s+=`<path d="M${x+2} ${y0-4}V${y0-18}H${x+w-4}${b.cas===1?`V${y0-4}`:''}" fill="none" stroke="${MU_COL}" stroke-width="1.6"/><text x="${x+8}" y="${y0-6}" font-size="12" font-weight="700" fill="${MU_COL}">${b.cas}.</text>`;
   if(b.fine)s+=`<text x="${x+w-2}" y="${y0-6}" text-anchor="end" font-size="14" font-style="italic" font-weight="700" fill="${MU_HI}">Fine</text>`;
   if(b.segno)s+=`<text x="${x+4}" y="${y0-6}" font-size="20" fill="${MU_HI}">𝄋</text>`;
   if(b.dc)s+=`<text x="${x+w-2}" y="${y0+h+18}" text-anchor="end" font-size="13" font-style="italic" font-weight="700" fill="${MU_HI}">${b.dc}</text>`;
   if(b.end)s+=`<path d="M${x+w-3} ${y0}v${h}" stroke="${MU_COL}" stroke-width="5"/>`});
  const W=28+bars.length*w;return`<svg viewBox="0 0 ${W} 104" width="${W*1.4}" style="max-width:100%;height:auto;display:block;margin:0 auto" role="img" aria-label="Esquema de compassos">${s}</svg>`},
 gen(lv){const ty=pick(lv>1?['rep','cas','dc','ds']:lv?['rep','cas','dc']:['rep','rep']);let n,bars,ord,how;
  if(ty==='rep'){n=rnd(4,6);const a=lv?rnd(1,n-2):pick([1,1,2]),b=lv?rnd(a+1,n-1):(Math.random()<.5?n:rnd(a+1,n));
   bars=Array.from({length:n},(_,i)=>({n:i+1,repL:i+1===a&&a>1,repR:i+1===b,end:i+1===n&&b!==n}));
   ord=[...Array(b).keys()].map(i=>i+1);for(let i=a;i<=b;i++)ord.push(i);for(let i=b+1;i<=n;i++)ord.push(i);
   how=`Es toca fins al compàs ${b}, es torna ${a>1?`al compàs ${a} (on hi ha el signe d'inici)`:'al principi'} i es continua fins al final.`}
  else if(ty==='cas'){const a=pick([1,1,2]),c=rnd(a+1,4);n=c+rnd(1,2);
   bars=Array.from({length:n},(_,i)=>({n:i+1,repL:i+1===a&&a>1,repR:i+1===c,cas:i+1===c?1:i+1===c+1?2:0,end:i+1===n}));
   ord=[];for(let i=1;i<=c;i++)ord.push(i);for(let i=a;i<c;i++)ord.push(i);for(let i=c+1;i<=n;i++)ord.push(i);
   how=`1a vegada: compassos 1 a ${c} (amb la 1a casella). 2a vegada: es torna ${a>1?`al ${a}`:'al principi'}, se salta la 1a casella i es toca la 2a (${c+1}).`}
  else{n=rnd(5,7);const f=rnd(2,n-1),sg=ty==='ds'?rnd(2,f):1;
   bars=Array.from({length:n},(_,i)=>({n:i+1,fine:i+1===f,segno:ty==='ds'&&i+1===sg,dc:i+1===n?(ty==='ds'?'D.S. al Fine':'D.C. al Fine'):'',end:i+1===n}));
   ord=[...Array(n).keys()].map(i=>i+1);for(let i=sg;i<=f;i++)ord.push(i);
   how=`Es toca tot (1 a ${n}); el ${ty==='ds'?'D.S. envia al signe 𝄋 (compàs '+sg+')':'D.C. envia al principi'} i s'acaba a Fine (compàs ${f}).`}
  const lin=[...Array(n).keys()].map(i=>i+1),fig=this.svg(bars);
  if(Math.random()<.4)return{text:'Quants compassos sonen en total, comptant les repeticions?',fig,fields:[{label:'Compassos',ans:R(ord.length)}],
   hints:['Segueix la partitura amb el dit i escriu l\'ordre dels compassos.','Els signes de repetició et fan tornar enrere.'],steps:[how,`Ordre: ${ord.join(' ')}.`,`Sonen <b>${ord.length}</b> compassos.`],err:x=>req(x[0],R(n))?'lm_repeticio':null};
  const vs=[' ','-',' - ',', ',''].map(j=>ord.join(j));
  return{text:'Escriu l\'ordre en què es toquen els compassos (p. ex. 1 2 3 2 3).',fig,fields:[{label:'Ordre dels compassos',txt:lmV(vs),wide:true}],
   hints:['Segueix la partitura amb el dit, compàs a compàs.','Quan arribes a un signe de repetició (o a un D.C.), torna enrere on toca.'],steps:[how,`Ordre: <b>${ord.join(' ')}</b>.`],
   err:v=>lmIn(v[0],[' ','-',' - ',''].map(j=>lin.join(j)))?'lm_repeticio':null}}},

lm_termes:{mat:'musica',ab:'Ag',nom:'Agògica, dinàmica i articulació',
 teoria:['<b>Agògica</b>: canvis de velocitat. <i>Ritardando</i> / <i>rallentando</i> (rit., rall.: cada vegada més lent), <i>accelerando</i> (accel.: cada vegada més ràpid), <i>a tempo</i> (tornar al tempo d\'abans), <i>rubato</i> (tempo flexible), <i>meno mosso</i> / <i>più mosso</i> (menys / més moviment). El <b>calderó</b> (𝄐) allarga la nota a voluntat.','<b>Dinàmica</b>: a més de pp, p, mp, mf, f, ff i els reguladors: <i>sforzando</i> (sf, sfz: una nota forta de cop), <i>fp</i> (fort i de seguida fluix), <i>subito</i> (de sobte), <i>morendo</i> (apagant-se).','<b>Articulació</b>: <i>staccato</i> (punt: nota curta i separada), <i>legato</i> (lligat), <b>accent</b> (&gt;: més fort), <i>tenuto</i> (ratlla: mantenir tot el valor). La <b>lligadura d\'expressió</b> uneix notes diferents (lligat); la <b>de prolongació</b> uneix notes iguals (suma valors).','Altres signes: <b>D.C.</b> (<i>da capo</i>: al principi), <b>D.S.</b> (<i>dal segno</i>: al signe 𝄋), <b>Fine</b> (final), <b>Coda</b> (𝄌: salt al final), <b>8va</b> (una octava més agut).'],
 sig(k){const nt=lmStaff([{n:4,d:'n'}],{noClef:true,minW:90,extra:{stacc:'<circle cx="22" cy="86" r="3.2" fill="#1F2A44"/>',acc:'<path d="M14 84L30 90L14 96" fill="none" stroke="#1F2A44" stroke-width="2.4"/>',ten:'<path d="M12 88H32" stroke="#1F2A44" stroke-width="3"/>',cald:'<path d="M8 22C10 6 34 6 36 22" fill="none" stroke="#1F2A44" stroke-width="2.6"/><circle cx="22" cy="18" r="3" fill="#1F2A44"/>'}[k]});
  if(k==='coda')return`<svg viewBox="0 0 80 80" width="90" style="display:block;margin:0 auto"><circle cx="40" cy="40" r="20" fill="none" stroke="#1F2A44" stroke-width="3"/><path d="M40 8V72M8 40H72" stroke="#1F2A44" stroke-width="3"/></svg>`;return nt},
 bank:[
  ['Què vol dir <i>ritardando</i> (rit.)?','cada vegada més lent|alentint|frenant|més lent|anar més lent|cada cop més lent|retardant','És un terme d\'agògica (velocitat).','<i>Ritardando</i>: anar <b>cada vegada més lent</b>.','cada vegada més ràpid|accelerant|cada vegada més fluix',0],
  ['Què vol dir <i>accelerando</i> (accel.)?','cada vegada més ràpid|accelerant|més ràpid|cada cop més ràpid','Pensa en un cotxe que accelera.','<i>Accelerando</i>: <b>cada vegada més ràpid</b>.','cada vegada més lent|alentint|cada vegada més fort',0],
  ['Què vol dir <i>a tempo</i>?','tornar al tempo|tornar al tempo d\'abans|tempo inicial|recuperar el tempo|torna al tempo|al tempo d\'abans|tornar al tempo inicial','Sol aparèixer després d\'un ritardando.','<i>A tempo</i>: <b>tornar al tempo d\'abans</b>.','',0],
  ['Què vol dir <i>rallentando</i> (rall.)?','cada vegada més lent|alentint|frenant|més lent|cada cop més lent','Vol dir el mateix que <i>ritardando</i>.','<i>Rallentando</i>: <b>cada vegada més lent</b>.','cada vegada més ràpid|accelerant',1],
  ['Què vol dir <i>allegretto</i>?','una mica ràpid|bastant ràpid|menys ràpid que allegro|moderadament ràpid|un poc ràpid','És el diminutiu d\'<i>allegro</i>.','<i>Allegretto</i>: <b>una mica ràpid</b>, menys que l\'allegro.','',1],
  ['Què vol dir <i>vivace</i>?','viu|ràpid|amb vivacitat|animat|molt viu','Pensa en una persona plena d\'energia i alegria.','<i>Vivace</i>: <b>viu</b>, ràpid i animat.','',1],
  ['Què vol dir <i>rubato</i>?','tempo flexible|amb llibertat|lliure|flexible|tempo lliure','El músic «roba» una mica de temps i després el retorna.','<i>Rubato</i>: <b>tempo flexible</b>, amb llibertat expressiva.','',2],
  ['Què vol dir <i>meno mosso</i>?','menys moviment|més lent|menys ràpid|amb menys moviment','<i>Meno</i> vol dir «menys».','<i>Meno mosso</i>: <b>amb menys moviment</b> (més lent).','més ràpid|més moviment',2],
  ['Què vol dir <i>più mosso</i>?','més moviment|més ràpid|amb més moviment','<i>Più</i> vol dir «més».','<i>Più mosso</i>: <b>amb més moviment</b> (més ràpid).','més lent|menys moviment',2],
  ['Què vol dir <i>sforzando</i> (sf, sfz)?','una nota forta de cop|accent fort|nota molt forta de cop|fort de cop|reforçat|forçat|fort sobtat','És un terme de dinàmica sobre una sola nota.','<i>Sforzando</i>: <b>una nota forta de cop</b>, molt accentuada.','',1],
  ['Què vol dir <i>fp</i> (<i>fortepiano</i>)?','fort i de seguida fluix|fort i després fluix|fort i tot seguit fluix|fort i després piano','Combina dues dinàmiques, una darrere l\'altra.','<i>fp</i>: <b>fort i de seguida fluix</b>.','fluix i després fort',1],
  ['Què vol dir <i>subito</i>?','de sobte|sobtadament|de cop|immediatament','Acompanya altres termes: <i>subito piano</i>.','<i>Subito</i>: <b>de sobte</b>.','',1],
  ['Què vol dir <i>morendo</i>?','apagant-se|morint|cada vegada més fluix i lent|apagant|extingint-se|morir','Ve del verb «morir».','<i>Morendo</i>: <b>apagant-se</b>, cada vegada més fluix (i sovint més lent).','',2],
  ['Com es diu aquest signe d\'articulació (un punt damunt o davall la nota)?','staccato|picat|estacato','La nota es toca curta i separada.','És l\'<b>staccato</b>: nota curta i separada.','legato|accent|tenuto',0,'stacc'],
  ['Com es diu aquest signe (&gt;) damunt o davall una nota?','accent|accentuada|accent fort','Aquesta nota ha de sonar més forta que les altres.','És l\'<b>accent</b>: la nota sona més forta.','staccato|regulador|diminuendo',0,'acc'],
  ['Com es diu aquest signe (una ratlla curta damunt o davall la nota)?','tenuto|tenut','Vol dir «mantingut».','És el <b>tenuto</b>: mantenir la nota tot el seu valor.','staccato|accent',1,'ten'],
  ['Com es diu aquest signe, que allarga la nota tant com vulgui l\'intèrpret o el director?','calderó|caldero|fermata','Té forma d\'un arc amb un punt.','És el <b>calderó</b> (o <i>fermata</i>).','',0,'cald'],
  ['Com es diu aquest signe, que indica un salt cap a la part final de la peça?','coda','És una paraula italiana que vol dir «cua».','És la <b>coda</b>.','',1,'coda'],
  ['Com es diu tocar les notes ben unides, sense separació?','legato|lligat|ligato','És el contrari de l\'staccato.','És el <b>legato</b> (lligat).','staccato|picat',0],
  ['Com es diu la línia corba que uneix dues notes de la mateixa altura i en suma el valor?','lligadura de prolongació|lligadura|lligadura de valor|lligadura d\'unió','Només es toca la primera nota.','És la <b>lligadura de prolongació</b>.','lligadura d\'expressió',0],
  ['Com es diu la línia corba que uneix notes d\'altura diferent i indica tocar-les lligades?','lligadura d\'expressió|lligadura de fraseig|lligadura d\'expressio','Uneix notes diferents.','És la <b>lligadura d\'expressió</b>.','lligadura de prolongació',1],
  ['Què vol dir <i>D.C.</i>?','da capo|tornar al principi|des del principi|al principi|torna al principi','<i>Capo</i> vol dir «cap», el principi.','<i>D.C.</i> (<i>da capo</i>): <b>tornar al principi</b>.','dal segno|tornar al signe',0],
  ['Què vol dir <i>D.S.</i>?','dal segno|des del signe|tornar al signe|torna al signe|al signe','<i>Segno</i> vol dir «signe».','<i>D.S.</i> (<i>dal segno</i>): <b>tornar al signe</b> 𝄋.','da capo|tornar al principi',1],
  ['Quina paraula indica on s\'acaba la peça després d\'un D.C. o d\'un D.S.?','fine','És italiana i vol dir «final».','La paraula és <b>Fine</b>.','coda',0],
  ['Què vol dir <i>8va</i> damunt d\'unes notes?','una octava més aguda|tocar una octava amunt|una octava amunt|octava alta|una octava més agut','8va = octava.','<i>8va</i>: tocar <b>una octava més aguda</b>.','',2],
  ['En una repetició, com es diu el compàs marcat «1.» que només es toca la primera vegada?','primera casella|1a casella|casella 1|primera volta|1a volta','La segona vegada se salta.','És la <b>1a casella</b> (o primera volta).','segona casella',1]],
 gen(lv){const b=this.bank.filter(x=>(x[5]||0)<=lv),[q,a,h,ex,c,,fg]=pick(b),it={q,a:a.split('|'),h,ex,c:(c||'').split('|').filter(Boolean)};
  const p=muBankP(it,'lm_termes');if(fg)p.fig=this.sig(fg);return p}},

/* ---------- 4. Compassos ---------- */
lm_compassos:{mat:'musica',ab:'Cs',nom:'Compassos simples i compostos',
 teoria:['Als <b>compassos simples</b> cada temps es divideix en <b>2</b> parts: 2/4, 3/4, 4/4, 2/2, 3/8. El número de dalt diu els temps i el de baix la figura que fa un temps (4 negra, 2 blanca, 8 corxera).','Als <b>compassos compostos</b> cada temps es divideix en <b>3</b> parts i dura una figura <b>amb puntet</b>: 6/8, 9/8, 12/8, 6/4.','Als compostos, el número de dalt diu les <b>parts</b> (no els temps): per saber els temps, <b>divideix entre 3</b>. 6/8 → 6 corxeres → <b>2 temps</b> de negra amb puntet. 9/8 → 3 temps. 12/8 → 4 temps.','Segons els temps, un compàs és <b>binari</b> (2), <b>ternari</b> (3) o <b>quaternari</b> (4). El 2/2 es diu també <i>compasillo</i> partit o <i>alla breve</i> (C barrada) i el 4/4 s\'escriu sovint amb una C.'],
 fig:()=>lmStaff([{n:4,d:'n',dot:1,lab:'1'},{n:5,d:'n',dot:1,lab:'2'},{bar:1},{n:6,d:'c',lab:'1'},{n:5,d:'c'},{n:4,d:'c'},{n:3,d:'n',dot:1,lab:'2'},{end:1}],{ts:'6/8',aria:'Compàs de 6/8: dos temps de negra amb puntet'}),
 gen(lv){const ks=lv?Object.keys(LM_TS):['2/4','3/4','4/4','6/8','9/8','12/8'],ts=pick(ks),T=LM_TS[ts],[a,b]=ts.split('/').map(Number);
  const tys=['tipus','temps','unitat','classe'];if(lv)tys.push('subdiv','quantes');if(lv>1&&T.f)tys.push('omple');const ty=pick(tys);
  const tn=T.t==='s'?'simple':'compost';
  if(ty==='tipus')return{text:`El compàs de <b>${ts}</b>, és simple o compost?`,fields:[lmF([tn,`compàs ${tn}`,`${tn}s`])],
   hints:['Pensa en com es divideix cada temps: en 2 parts o en 3?','Si el número de dalt és 6, 9 o 12, cada temps té 3 parts i dura una figura amb puntet.'],
   steps:[T.t==='s'?`Cada temps es divideix en 2 parts → <b>simple</b>.`:`El ${a} de dalt és múltiple de 3 (≥ 6): cada temps té 3 parts → <b>compost</b>.`],err:v=>lmIn(v[0],[T.t==='s'?'compost':'simple'])?'lm_compost':null};
  if(ty==='temps')return{text:`Quants <b>temps</b> (pulsacions) té cada compàs de <b>${ts}</b>?`,fields:[{label:'Temps',ans:R(T.p)}],
   hints:['Primer decideix si és simple o compost.','Als compostos, el número de dalt són parts: divideix-lo entre 3.'],
   steps:[T.t==='s'?`És simple: el número de dalt són els temps → <b>${T.p}</b>.`:`És compost: ${a} parts : 3 = <b>${T.p}</b> temps.`],err:x=>T.t==='c'&&req(x[0],R(a))?'lm_compost':null};
  if(ty==='unitat')return{text:`Quina figura dura <b>un temps</b> al compàs de <b>${ts}</b>?`,fields:[lmF(T.u,'Figura')],
   hints:['Mira el número de baix: indica en quantes parts es divideix la rodona (2 meitats, 4 quarts, 8 vuitens).',T.t==='s'?'És un compàs simple: la figura del número de baix fa un temps.':'És un compàs compost: un temps són 3 figures de les de baix, és a dir, una figura amb puntet.'],
   steps:[T.t==='s'?`El ${b} de baix és la ${['','','blanca','','negra','','','','corxera'][b]}: un temps = <b>${T.u[0]}</b>.`:`El ${b} de baix és la ${b===8?'corxera':'negra'}; un temps = 3 ${b===8?'corxeres':'negres'} = <b>${T.u[0]}</b>.`],
   err:v=>T.t==='c'&&lmIn(v[0],[b===8?'corxera':'negra'])?'lm_compost':null};
  if(ty==='classe'){const nm=LM_CLS[T.p];return{text:`El compàs de <b>${ts}</b>, és binari, ternari o quaternari?`,fields:[lmF([nm,`compàs ${nm}`,`${tn} ${nm}`,`${nm} ${tn}`])],
   hints:['Depèn del nombre de temps (no de parts). Als compostos, divideix el número de dalt entre 3.','Compta els temps i pensa en el prefix: bi- (dos), ter- (tres), quater- (quatre).'],steps:[`El ${ts} té ${T.p} temps → <b>${nm}</b>${T.t==='c'?' (és un '+nm+' compost)':''}.`],
   err:v=>T.t==='c'&&a===6&&lmIn(v[0],['ternari'])||T.t==='c'&&a===12&&lmIn(v[0],['ternari'])?'lm_compost':null}}
  if(ty==='subdiv')return{text:`En quantes parts es divideix cada temps del compàs de <b>${ts}</b>?`,fields:[{label:'Parts',ans:R(T.t==='s'?2:3)}],
   hints:['És simple o compost?','Simple: subdivisió binària · compost: subdivisió ternària.'],steps:[`És ${tn}: cada temps es divideix en <b>${T.t==='s'?2:3}</b> parts.`],err:null};
  if(ty==='quantes'){const nC=a*8/b;return{text:`Quantes <b>corxeres</b> caben en un compàs de <b>${ts}</b>?`,fields:[{label:'Corxeres',ans:R(nC)}],
   hints:[`El número de baix (${b}) diu quina figura es compta.`,'Una negra = 2 corxeres; una blanca = 4 corxeres.'],steps:[`${a} ${['','','blanques','','negres','','','','corxeres'][b]} × ${8/b} = <b>${nC}</b> corxeres.`],err:null}}
  return{text:`Quina figura <b>sola</b> omple tot un compàs de <b>${ts}</b>?`,fields:[lmF(T.f,'Figura')],
   hints:[`Quantes ${b===8?'corxeres':b===4?'negres':'blanques'} té el compàs?`,'Pot ser una figura amb puntet.'],steps:[`El compàs val ${a} ${b===8?'corxeres':b===4?'negres':'blanques'}.`,`Una sola figura que ho val: <b>${T.f[0]}</b>.`],err:null}}},

lm_equivalencies:{mat:'musica',ab:'Eq',nom:'Equivalències entre compassos simples i compostos',
 teoria:['Cada compàs simple té un <b>compost equivalent</b>: amb els mateixos temps, però amb el temps dividit en 3 en lloc de 2.','2/4 ↔ <b>6/8</b> · 3/4 ↔ <b>9/8</b> · 4/4 ↔ <b>12/8</b> · 2/2 ↔ <b>6/4</b>. Regla: numerador × 3 i denominador × 2.','Si en 2/4 el temps és una negra, en 6/8 és una <b>negra amb puntet</b> (= 3 corxeres).','En compàs compost: corxera = ⅓ de temps · negra = ⅔ · negra amb puntet = 1 · blanca amb puntet = 2.'],
 gen(lv){const ty=pick(lv?['eq','falta','val','eq']:['eq','falta']);
  if(ty==='eq'){const s=pick(Object.keys(LM_EQ)),c=LM_EQ[s],rev=Math.random()<.5,q=rev?c:s,ans=rev?s:c;
   return{text:`Quin és el compàs ${rev?'<b>simple</b>':'<b>compost</b>'} equivalent al <b>${q}</b> (mateixos temps)?`,fields:[{label:'Compàs',txt:lmV([ans,ans.replace('/',' '),ans.replace('/',' per ')]),wide:false}],
    hints:[rev?'Fes el camí invers: numerador : 3 i denominador : 2.':'Numerador × 3 i denominador × 2.',`El ${q} té ${LM_TS[q].p} temps.`],
    steps:[rev?`${q}: ${q.split('/')[0]} : 3 = ${ans.split('/')[0]} · ${q.split('/')[1]} : 2 = ${ans.split('/')[1]}.`:`${q}: ${q.split('/')[0]} × 3 = ${ans.split('/')[0]} · ${q.split('/')[1]} × 2 = ${ans.split('/')[1]}.`,`El compàs equivalent és el <b>${ans}</b>.`],
    err:v=>Object.entries(LM_EQ).some(([x,y])=>(rev?x:y)!==ans&&lmIn(v[0],[rev?x:y]))?'lm_equiv':null}}
  if(ty==='val'){const opts=[['n',true,R(1)],['b',true,R(2)],['r',true,R(4)]].concat(lv>1?[['n',false,R(2,3)],['c',false,R(1,3)]]:[['n',false,R(2,3)]]),[d,dot,v]=pick(opts),ts=pick(['6/8','9/8','12/8']);
   return{text:`Al compàs de <b>${ts}</b>, quants <b>temps</b> dura una <b>${muFigName(d,dot)}</b>?`,fields:[{label:'Temps',ans:v}],
    hints:[`Al ${ts}, un temps és una negra amb puntet (3 corxeres).`,'Compta quantes corxeres val la figura i divideix entre 3.'],
    steps:[`${muCap(muFigName(d,dot))} = ${fmtR(R(muV(d,dot).n*2,muV(d,dot).d))} corxeres.`,`${fmtR(R(muV(d,dot).n*2,muV(d,dot).d))} : 3 = <b>${fmtR(v)}</b> temps.`],err:x=>req(x[0],muV(d,dot))&&!req(v,muV(d,dot))?'lm_compost':null}}
  const ts=pick(lv?['6/8','9/8','12/8']:['6/8','9/8']),a=+ts.split('/')[0],tot=R(a,2),m=pick([R(1,2),R(1),R(3,2)]);
  const op=[{d:'c'},{d:'c'},{d:'n'},{d:'n',dot:true},{d:'n',dot:true}];if(lv)op.push({d:'c',rest:true},{d:'s'},{d:'s'});
  const fs=muFill(muSub(tot,m),op),had=muSum(fs),toC=r=>R(r.n*2,r.d);
  return{text:`Aquest compàs de <b>${ts}</b> està incomplet. Quantes <b>corxeres</b> hi falten?`,fig:lmStaff([...fs.map(f=>f.rest?{r:f.d,dot:f.dot}:{n:rnd(3,8),d:f.d,dot:f.dot}),{n:6,q:1},{end:1}],{ts}),fields:[{label:'Corxeres que falten',ans:toC(m)}],
   hints:[`Un compàs de ${ts} té ${a} corxeres.`,'Passa cada figura a corxeres (negra = 2, negra amb puntet = 3, semicorxera = ½) i resta.'],
   steps:[`Ja hi ha: ${fs.map(f=>fmtR(toC(muV(f.d,f.dot)))).join(' + ')} = ${fmtR(toC(had))} corxeres.`,`Falten ${a} − ${fmtR(toC(had))} = <b>${fmtR(toC(m))}</b> corxeres.`],
   err:x=>!req(toC(had),toC(m))&&req(x[0],toC(had))||req(x[0],m)&&!req(m,toC(m))?'mu_compas_falta':null}}},

/* ---------- 5. Síncopes, contratemps i grups irregulars ---------- */
lm_sincopa:{mat:'musica',ab:'Sn',nom:'Síncopes i contratemps',
 teoria:['La <b>síncope</b> és una nota que comença en una part <b>feble</b> i es prolonga fins a la part <b>forta</b> següent: l\'accent es desplaça. Exemple típic: corxera – negra – corxera.','També es pot escriure amb una <b>lligadura</b>: corxera – corxera lligada a corxera – corxera sona igual que corxera – negra – corxera.','El <b>contratemps</b> és una nota que comença en part feble després d\'un <b>silenci</b> a la part forta: silenci de corxera – corxera.','Diferència: a la síncope la nota <b>continua sonant</b> a la part forta; al contratemps la part forta és un <b>silenci</b>.'],
 fig:()=>lmStaff([{n:5,d:'c',lab:'síncope'},{n:5,d:'n'},{n:5,d:'c'},{bar:1},{r:'c',lab:'contratemps'},{n:5,d:'c'},{r:'c'},{n:5,d:'c'},{end:1}],{ts:'2/4',aria:'Síncope i contratemps'}),
 gen(lv){if(lv===0&&Math.random()<.3){const s=Math.random()<.5;
   return{text:s?'Com es diu una nota que comença en part feble i es prolonga fins a la part forta següent?':'Com es diu una nota que comença en part feble després d\'un silenci a la part forta?',fields:[lmF(s?['síncope','sincopa','una síncope']:['contratemps','contratemp','un contratemps'])],
    hints:['A una la nota continua sonant a la part forta; a l\'altra hi ha un silenci.','Les dues desplacen l\'accent.'],steps:[s?'La nota es prolonga fins a la part forta: és una <b>síncope</b>.':'Silenci a la part forta i nota a la feble: és un <b>contratemps</b>.'],err:v=>lmIn(v[0],[s?'contratemps':'síncope'])?'lm_sincopa':null}}
  if(Math.random()<.35){const C=[['corxera – negra – corxera','2/4',1],['silenci de corxera – corxera','2/4',0],['corxera – corxera lligada a una altra corxera – corxera','2/4',1],['negra – blanca – negra','4/4',1],['silenci de negra – negra','2/4',0],['negra – negra lligada a una altra negra – negra','4/4',1],['silenci de negra – negra – silenci de negra – negra','4/4',0]];
   if(lv)C.push(['semicorxera – corxera – semicorxera','2/4',1],['silenci de semicorxera – semicorxera – corxera','2/4',0],['silenci de corxera – corxera – silenci de corxera – corxera','2/4',0]);
   const[ds,ts,s]=pick(C),ans=s?['síncope','sincopa','una síncope']:['contratemps','contratemp','un contratemps'];
   return{text:`En un compàs de <b>${ts}</b>, apareix aquest ritme: <b>${ds}</b>. És una síncope o un contratemps?`,fields:[lmF(ans)],
    hints:['Mira què passa a la part forta del temps: hi sona una nota que ve d\'abans, o hi ha un silenci?','Si la part forta és un silenci, la nota entra després; si no, mira si alguna nota es prolonga per damunt de la part forta.'],
    steps:[s?'Una nota comença a la part feble i continua sonant a la part forta següent: és una <b>síncope</b>.':'A la part forta hi ha un silenci i la nota sona a la part feble: és un <b>contratemps</b>.'],
    err:v=>lmIn(v[0],[s?'contratemps':'síncope'])?'lm_sincopa':null}}
  const one=[['n',[{d:'n'}],0,0],['cc',[{d:'c'},{d:'c'}],0,0],['ct',[{d:'c',rest:true},{d:'c'}],0,1]];if(lv>1)one.push(['ss',[{d:'s'},{d:'c'},{d:'s'}],1,0],['st',[{d:'s',rest:true},{d:'s'},{d:'c'}],0,1]);
  const two=[['sin',[{d:'c'},{d:'n'},{d:'c'}],1,0]];if(lv)two.push(['sinl',[{d:'c'},{d:'c',tie:1},{d:'c'},{d:'c'}],1,0],['ctl',[{d:'c',rest:true},{d:'c'},{d:'c',rest:true},{d:'c'}],0,2]);
  const nb=lv?rnd(2,3):2;let cells,S,C,g=0;do{cells=[];S=0;C=0;for(let b=0;b<nb;b++){const bar=Math.random()<.55?[pick(two)]:[pick(one),pick(one)];bar.forEach(x=>{S+=x[2];C+=x[3]});cells.push(bar)}}while((S+C===0||S===C&&g<5)&&g++<30);
  const items=[];cells.forEach((bar,bi)=>{bar.forEach(x=>x[1].forEach(f=>items.push(f.rest?{r:f.d}:{n:5,d:f.d,tie:f.tie})));items.push(bi===nb-1?{end:1}:{bar:1})});
  return{text:`Quantes <b>síncopes</b> i quants <b>contratemps</b> hi ha en aquest fragment de <b>${nb} compassos</b>?`,fig:lmStaff(items,{ts:'2/4'})+muSndBtn((()=>{let t=0;const ev=[];cells.flat().forEach(x=>x[1].forEach((f,i,arr)=>{const v=muV(f.d).n/muV(f.d).d*.5;if(!f.rest&&!(i>0&&arr[i-1].tie))ev.push({at:t,f:440,dur:(f.tie?v+muV(arr[i+1].d).n/muV(arr[i+1].d).d*.5:v)*.9});t+=v}));return ev})(),'Escolta el ritme'),
   fields:[{label:'Síncopes',ans:R(S)},{label:'Contratemps',ans:R(C)}],
   hints:['Busca notes que comencen a la segona meitat d\'un temps.','Si la part forta anterior és un silenci → contratemps. Si la nota continua sonant per damunt del temps fort → síncope.'],
   steps:[...cells.flat().filter(x=>x[2]||x[3]).map(x=>x[2]?`${x[0]==='sinl'?'Corxera lligada':x[0]==='ss'?'Semicorxera – corxera – semicorxera':'Corxera – negra – corxera'}: <b>síncope</b>.`:`Silenci${x[0]==='ctl'?'s':''} a la part forta i nota a la feble: <b>contratemps</b>${x[3]>1?' (dos)':''}.`),`Total: <b>${S}</b> síncope${S===1?'':'s'} i <b>${C}</b> contratemps.`],
   err:x=>S!==C&&req(x[0],R(C))&&req(x[1],R(S))?'lm_sincopa':null}}},

lm_grups:{mat:'musica',ab:'Gi',nom:'Grups irregulars: treset, doset, cinquet',
 teoria:['Un <b>grup irregular</b> té més (o menys) notes de les que li tocarien. S\'indica amb un número damunt.','<b>Treset</b> (3): tres notes en el temps de dues. Un treset de corxeres dura com 2 corxeres, és a dir, <b>1 temps</b> de negra. Cada corxera del treset val ⅓.','<b>Doset</b> (2): als compassos compostos, dues notes en el temps de tres (un doset de corxeres dura com 3 corxeres).','<b>Cinquet</b> (5): cinc notes en el temps de quatre. <b>Seisillo</b> (6): sis en el temps de quatre.'],
 fig:()=>lmStaff([{n:4,d:'c',tri:1},{n:5,d:'c'},{n:6,d:'c'},{n:7,d:'n'},{end:1}],{ts:'2/4',aria:'Treset de corxeres'}),
 gen(lv){const ty=pick(lv>1?['quantes','temps','suma','cada','nom']:lv?['quantes','temps','suma','cada','nom']:['quantes','temps','nom']);
  // [nom, figura normal (plural), quantes normals ocupa, temps que dura, figura, notes del grup]
  const G=[['treset de corxeres','corxeres',2,R(1),'c',3],['treset de negres','negres',2,R(2),'n',3],['treset de semicorxeres','semicorxeres',2,R(1,2),'s',3]];
  if(lv)G.push(['doset de corxeres (en 6/8)','corxeres',3,R(3,2),'c',2],['cinquet de semicorxeres','semicorxeres',4,R(1),'s',5],['treset de blanques','blanques',2,R(4),'b',3],['seisillo de semicorxeres','semicorxeres',4,R(1),'s',6]);
  if(lv>1)G.push(['cinquet de corxeres','corxeres',4,R(2),'c',5]);
  const [nm,un,k,t,d,cnt]=pick(ty==='temps'||ty==='cada'?G.filter(x=>!/doset/.test(x[0])):G),sg={corxeres:'corxera',negres:'negra',semicorxeres:'semicorxera',blanques:'blanca'}[un],gn=nm.split(' ')[0];
  if(ty==='nom'){const N=[['treset',3,2,'corxeres','treset|tresillo'],['doset',2,3,'corxeres','doset|dosillo']].concat(lv?[['cinquet',5,4,'semicorxeres','cinquet|quintillo'],['seisillo',6,4,'semicorxeres','seisillo|sisillo']]:[]),[g1,a1,b1,u1,ok]=pick(N);
   return{text:`Com es diu el grup irregular de <b>${a1} ${u1}</b> que ocupen el temps de <b>${b1}</b>?`,fields:[lmF(ok.split('|'))],
    hints:['Fixa\'t en el nombre de notes que té el grup, no en el temps que ocupa.','El nom de cada grup s\'assembla al número de notes que té.'],steps:[`${a1} notes en el temps de ${b1}: és un <b>${g1}</b>.`],err:null}}
  if(ty==='quantes')return{text:`Un <b>${nm}</b> dura el mateix que quantes ${un} normals?`,fields:[{label:'Quantes',ans:R(k)}],
   hints:['El número del grup diu quantes notes té, no quant dura.',`Pensa en quin espai ocupa un ${gn}: en aquest espai, quantes ${un} hi cabrien normalment?`],steps:[`El ${nm.replace(/ \(.*\)/,'')} té ${cnt} notes i ocupa el temps de <b>${k}</b> ${un}.`],err:x=>req(x[0],R(cnt))?'lm_treset':null};
  if(ty==='temps')return{text:`Quants <b>temps</b> dura un <b>${nm}</b> (negra = 1 temps)?`,fields:[{label:'Temps',ans:t}],
   hints:['Primer: quantes figures normals val el grup?','Després passa-ho a temps.'],steps:[`El ${nm} val ${k} ${un} normals.`,`${k} ${un} = <b>${muFmt(t)}</b> temps.`],err:x=>req(x[0],R(t.n*cnt,t.d*k))?'lm_treset':null};
  if(ty==='cada'){const v=R(t.n,t.d*cnt),norm=R(t.n,t.d*k);return{text:`Quant dura cada ${sg} d'un <b>${nm}</b> (negra = 1 temps)?`,fields:[{label:'Temps',ans:v}],
   hints:[`Primer: quants temps dura tot el ${gn}?`,`Reparteix aquest temps entre les ${cnt} notes del grup.`],steps:[`El ${nm} dura ${muFmt(t)} temps.`,`${muFmt(t)} : ${cnt} = <b>${fmtR(v)}</b> de temps cada ${sg}.`],err:x=>req(x[0],norm)?'lm_treset':null}}
  const ts=pick(['2/4','3/4']),a=+ts[0],fs=muFill(R(a-1),[{d:'n'},{d:'n'},{d:'c'},{d:'c'}].concat(lv>1?[{d:'s'}]:[])),pos=rnd(0,fs.length),p=rnd(3,7),items=fs.map(f=>({n:rnd(3,8),d:f.d}));
  items.splice(pos,0,{n:p,d:'c',tri:1},{n:p+1,d:'c'},{n:p+2,d:'c'});
  return{text:'Quants temps sumen aquestes figures? Compte amb el treset!',fig:lmStaff(items,{noClef:true}),fields:[{label:'Temps',ans:R(a)}],
   hints:['Un treset de corxeres dura 1 temps (no 1 i ½).','Suma la resta de figures a part.'],steps:[`Treset de corxeres = 1 temps.`,`Resta: ${lmTimes(fs)} = ${muFmt(R(a-1))}.`,`Total: 1 + ${muFmt(R(a-1))} = <b>${a}</b> temps.`],err:x=>req(x[0],R(2*a+1,2))?'lm_treset':null}}},

/* ---------- 6. Alteracions i enharmonia ---------- */
lm_enharmonia:{mat:'musica',ab:'Eh',nom:'Alteracions, semitons i enharmonia',
 teoria:['A més del sostingut (♯), el bemoll (♭) i el becaire (♮), hi ha el <b>doble sostingut</b> (𝄪, puja dos semitons) i el <b>doble bemoll</b> (𝄫, baixa dos semitons).','Dues notes són <b>enharmòniques</b> si tenen nom diferent però <b>sonen igual</b>: do♯ = re♭, fa♯ = sol♭, mi♯ = fa, si♯ = do, do♭ = si, fa♭ = mi, do𝄪 = re.','El <b>semitò cromàtic</b> uneix dues notes amb el <b>mateix nom</b> (do – do♯). El <b>semitò diatònic</b> uneix notes de <b>nom diferent</b> (do♯ – re, mi – fa).','Alteracions <b>accidentals</b>: valen fins al final del compàs. Alteracions <b>pròpies</b> (a l\'armadura): valen tota la peça.'],
 gen(lv){const ty=pick(lv>1?['enh','enh','semi','tons']:lv?['enh','semi','tons']:['enh','enh','semi']);
  if(ty==='enh'){const maxA=lv>1?2:1;let n,others;
   do{const l=rnd(0,6),a=lv?pick(lv>1?[-2,-1,1,2,-1,1]:[-1,1,-1,1,0]):pick([-1,1]);n={l,a};const pc=lmMod(LM_SEMI[l]+a,12);
    others=[];for(let l2=0;l2<7;l2++)for(let a2=-maxA;a2<=maxA;a2++)if(l2!==l&&lmMod(LM_SEMI[l2]+a2,12)===pc)others.push({l:l2,a:a2})}while(!others.length||lv===0&&others.every(o=>o.a===0));
   if(lv===0)others=others.filter(o=>o.a!==0);
   return{text:`Escriu una nota <b>enharmònica</b> de <b>${lmNom(n)}</b> (que soni igual però amb un altre nom).`,fig:lmStaff([{n:n.l+(n.l<2?7:0),acc:Math.abs(n.a)===2?null:n.a,d:'r'}],{minW:140})+(Math.abs(n.a)===2?`<p style="text-align:center;margin:0;font-size:22px;font-weight:800">${lmNomC(n)}</p>`:''),
    fields:[lmF(others.flatMap(lmNoteTxt),'Nota')],
    hints:['Pensa en el teclat del piano: quina tecla és?','Recorda que entre mi-fa i si-do només hi ha un semitò.'],
    steps:[`${muCap(lmNom(n))} és la mateixa tecla que <b>${others.map(lmNom).join('</b> o <b>')}</b>.`],err:v=>[-2,-1,0,1,2].some(a=>lmIn(v[0],lmNoteTxt({l:n.l,a})))?'lm_enharm':null}}
  if(ty==='semi'){const l=rnd(0,6),chrom=Math.random()<.5;let n1,n2;
   if(chrom){n1={l,a:pick([0,-1])};n2={l,a:n1.a+1}}else{n1={l,a:pick(LM_SEMI[lmMod(l+1,7)]-LM_SEMI[l]===1||l===6?[0]:[1])};n2={l:l+1,a:0};if(lmS(n2)-lmS(n1)!==1)n2={l:l+1,a:lmS(n1)+1-lmS({l:l+1,a:0})}}
   const ans=chrom?'cromàtic':'diatònic';
   return{text:`De <b>${lmNom(n1)}</b> a <b>${lmNom(n2)}</b> hi ha un semitò. És <b>cromàtic</b> o <b>diatònic</b>?`,fields:[lmF([ans,`semitò ${ans}`,ans.replace('à','a').replace('ò','o')])],
    hints:['Mira el nom de les dues notes (sense l\'alteració): és el mateix o és diferent?','Recorda la teoria: un tipus de semitò uneix dues notes amb el mateix nom; l\'altre, dues notes de nom diferent.'],steps:[chrom?`Les dues notes es diuen ${LM_L[lmMod(l,7)]}: és un semitò <b>cromàtic</b>.`:`Les notes tenen nom diferent (${LM_L[lmMod(n1.l,7)]} i ${LM_L[lmMod(n2.l,7)]}): és un semitò <b>diatònic</b>.`],
    err:v=>lmIn(v[0],[chrom?'diatònic':'cromàtic'])?'lm_semito_tipus':null}}
  const n1={l:rnd(0,6),a:pick([0,0,1,-1])},k=rnd(2,lv>1?8:6);let n2;do n2={l:n1.l+k-1,a:pick([0,0,1,-1])};while(lmS(n2)-lmS(n1)<1||lmS(n2)-lmS(n1)>12);const s=lmS(n2)-lmS(n1);
  return{text:`Quants <b>semitons</b> hi ha de <b>${lmNom(n1)}</b> a <b>${lmNom(n2)}</b> (pujant)?`,fields:[{label:'Semitons',ans:R(s)}],
   hints:['Compta primer els semitons entre les notes naturals (T = 2, S = 1; S entre mi-fa i si-do).','Després suma o resta les alteracions: ♯ afegeix 1 si és a la nota de dalt, ♭ en treu 1.'],
   steps:[`De ${LM_L[lmMod(n1.l,7)]} a ${LM_L[lmMod(n2.l,7)]} (naturals): ${lmS({l:n2.l,a:0})-lmS({l:n1.l,a:0})} semitons.`,`Ajust per les alteracions: ${n2.a?`${n2.a>0?'+':'−'}1 (nota de dalt)`:''}${n1.a?` ${n1.a>0?'−':'+'}1 (nota de baix)`:''}${!n1.a&&!n2.a?'cap':''}.`,`Total: <b>${s}</b> semitons.`],err:null}}},

/* ---------- 7. Intervals ---------- */
lm_int_classe:{mat:'musica',ab:'Ic',nom:'Intervals: nombre i classe (3a M, 5a J...)',
 teoria:['Per classificar un interval mira dues coses: el <b>nombre</b> (comptant les notes: do-mi = 3a) i la <b>classe</b> (comptant els <b>semitons</b>).','La 2a, 3a, 6a i 7a poden ser <b>majors</b> (M) o <b>menors</b> (m). La 4a, 5a i 8a són <b>justes</b> (J). Si tenen un semitò més: <b>augmentades</b> (A); un menys que la menor o la justa: <b>disminuïdes</b> (d).','Semitons: 2a m = 1 · 2a M = 2 · 3a m = 3 · 3a M = 4 · 4a J = 5 · 4a A = 6 (tríton) · 5a d = 6 · 5a J = 7 · 6a m = 8 · 6a M = 9 · 7a m = 10 · 7a M = 11 · 8a J = 12.','Truc: a l\'escala major, tots els intervals des de la tònica són majors o justos. Com que no podem escriure M i m (majúscula i minúscula), escriu la paraula: <b>3a major</b>, <b>3a menor</b>, <b>4a justa</b>, <b>5a augmentada</b>, <b>5a disminuïda</b> (o <i>maj, men, j, aug, dim</i>).'],
 fig:()=>lmStaff([{n:0,d:'r',lab:'3a M'},{n:2,d:'r'},{gap:16},{n:2,d:'r',lab:'3a m'},{n:4,d:'r'},{gap:16},{n:3,d:'r',lab:'4a A'},{n:6,d:'r'},{gap:16},{n:6,d:'r',lab:'5a d'},{n:10,d:'r'}],{aria:'Exemples d\'intervals'}),
 gen(lv){let n1,n2,I,g=0,clef='sol';
  do{const k=rnd(2,8);if(lv===0){n1={l:rnd(0,6),a:0};n2={l:n1.l+k-1,a:0}}
   else{n1={l:rnd(0,6),a:lv>1?pick([0,0,1,-1]):0};n2=lmUp(n1,k,pick(lmQs(k,lv>1)))}
   I=lmIntOf(n1,n2)}while((Math.abs(n2.a)>1||!I.q||lv===0&&n1.l===n2.l)&&g++<80);
  if(lv>1&&Math.random()<.4){clef='fa';n1={...n1,l:n1.l-14};n2={...n2,l:n2.l-14}}
  const chain=Array.from({length:I.k},(_,i)=>LM_L[lmMod(n1.l+i,7)]);
  return{text:'Classifica aquest interval: nombre i classe (p. ex. «3a major», «5a justa»).',fig:lmStaff([{n:n1.l,acc:n1.a,d:'r'},{n:n2.l,acc:n2.a,d:'r'}],{clef,minW:180})+muSndBtn(lmEv([n1,n2],{harm:true})),
   fields:[lmF(lmIntTxt(I.k,I.q),'Interval')],
   hints:['Primer el nombre: compta les notes incloent-hi la primera i la darrera.','Després compta els semitons (T = 2, S = 1) i mira la taula: '+LM_SEMTAB+'.'],
   steps:[`Notes: <b>${lmNom(n1)}</b> i <b>${lmNom(n2)}</b>${clef==='fa'?' (clau de fa)':''}.`,`Nombre: ${chain.join(', ')} → ${I.k} notes → <b>${I.k}a</b>.`,`Semitons de ${lmNom(n1)} a ${lmNom(n2)}: <b>${I.s}</b>.`,`Una ${I.k}a amb ${I.s} semitons és <b>${lmIntName(I.k,I.q)}</b>.`],
   err:v=>{const p=lmParseInt(v[0]);if(!p)return null;if(p.k===I.k&&p.q!==I.q)return'lm_int_classe';if(Math.abs(p.k-I.k)===1)return'mu_interval';return null}}}},

lm_int_construir:{mat:'musica',ab:'Ib',nom:'Construir intervals',
 teoria:['Per escriure un interval a partir d\'una nota: <b>1)</b> compta les notes per trobar el <b>nom</b> de la segona nota · <b>2)</b> compta els <b>semitons</b> i posa-hi l\'alteració que calgui.','Exemple: 3a menor sobre re. Re-mi-<b>fa</b> (3a). De re a fa hi ha 3 semitons → ja és menor: <b>fa</b>.','Exemple: 3a major sobre re. Re-mi-fa (3a), però necessitam 4 semitons → <b>fa♯</b>.','Descendent: el mateix, però comptant cap avall.'],
 gen(lv){let n1,n2,k,q,down,g=0;
  do{k=rnd(2,8);q=pick(lmQs(k,lv>1));n1={l:rnd(0,6),a:lv>1?pick([0,0,1,-1]):0};down=lv>0&&Math.random()<.35;n2=down?lmDown(n1,k,q):lmUp(n1,k,q)}while(Math.abs(n2.a)>1&&g++<80);
  const dl=down?n1.l+7:n1.l;
  return{text:`Quina nota fa una <b>${lmIntName(k,q)}</b> ${down?'<b>descendent</b> (per davall)':'ascendent'} a partir de <b>${lmNom(n1)}</b>?`,fig:lmStaff([{n:dl,acc:n1.a,d:'r'},{n:down?dl-(k-1):dl+(k-1),q:1}],{minW:170}),fields:[lmNF(n2)],
   hints:[`Primer el nom: compta ${k} notes ${down?'cap avall':'cap amunt'} a partir de ${LM_L[lmMod(n1.l,7)]} (inclou-la).`,`Una ${lmIntName(k,q)} té ${lmSemisOf(k,q)} semitons. Ajusta amb ♯ o ♭.`],
   steps:[`Nom: ${Array.from({length:k},(_,i)=>LM_L[lmMod(down?n1.l-i:n1.l+i,7)]).join(', ')} → <b>${LM_L[lmMod(n2.l,7)]}</b>.`,`Necessitam ${lmSemisOf(k,q)} semitons; amb ${LM_L[lmMod(n2.l,7)]} natural n'hi hauria ${Math.abs(lmS({l:n2.l,a:0})-lmS(n1))}.`,`La nota és <b>${lmNom(n2)}</b>.`],
   err:v=>lmLetterOnly(v[0],n2)?'lm_int_classe':(lmIn(v[0],[-1,0,1].flatMap(a=>lmNoteTxt({l:n2.l+1,a})))||lmIn(v[0],[-1,0,1].flatMap(a=>lmNoteTxt({l:n2.l-1,a}))))?'mu_interval':null}}},

/* ---------- 8. Escales majors i armadures ---------- */
lm_armadura:{mat:'musica',ab:'Ar',nom:'Armadures de les tonalitats majors',
 teoria:['L\'<b>armadura</b> són les alteracions que s\'escriuen just després de la clau i valen per a tota la peça.','Ordre dels <b>sostinguts</b>: <b>fa, do, sol, re, la, mi, si</b>. Ordre dels <b>bemolls</b>: al revés, <b>si, mi, la, re, sol, do, fa</b>.','Truc per als sostinguts: la tonalitat major és <b>un semitò per damunt del darrer sostingut</b> (fa♯, do♯ → re major).','Truc per als bemolls: la tonalitat major és el <b>penúltim bemoll</b> (si♭, mi♭, la♭ → mi♭ major). Amb un sol bemoll és <b>fa major</b>. Sense alteracions: <b>do major</b>.'],
 fig:()=>lmStaff([],{ks:7,minW:200,aria:'Ordre dels sostinguts'})+lmStaff([],{ks:-7,minW:200,aria:'Ordre dels bemolls'}),
 gen(lv){let n=lmNRange(lv);if(n===0)n=pick([1,-1]);const t=lmMajor(n),acc=lmKsAcc(n),last=acc[acc.length-1],clef=lv>1&&Math.random()<.4?'fa':'sol';
  const ty=pick(lv?['major','major','quines','ordre']:['major','major','ordre']);const sf=n>0?'sostingut':'bemoll';
  const rule=n>0?`El darrer sostingut és ${lmNom(last)}; un semitò per damunt → <b>${lmNom(t)}</b>.`:n===-1?'Un sol bemoll (si♭) → <b>fa major</b>.':`El penúltim bemoll és <b>${lmNom(acc[acc.length-2])}</b> → ${lmKey(t,'major')}.`;
  if(ty==='major')return{text:'Quina tonalitat <b>major</b> té aquesta armadura?',fig:lmStaff([],{ks:n,clef,minW:190}),fields:[lmF(lmKeyTxt(t,'major',true),'Tonalitat')],
   hints:[n>0?'Ordre dels sostinguts: fa, do, sol, re, la, mi, si. Quin és el darrer?':'Ordre dels bemolls: si, mi, la, re, sol, do, fa. Quin és el penúltim?',n>0?'Puja un semitò des del darrer sostingut.':n===-1?'Amb un sol bemoll no hi ha penúltim: és el cas especial que cal saber de memòria (és una 5a per davall de do).':'La tonalitat té el nom del penúltim bemoll.'],
   steps:[`L'armadura té ${lmAltTxt(n)}: ${acc.map(lmNom).join(', ')}.`,rule,`És <b>${lmKey(t,'major')}</b>.`],
   err:v=>lmIn(v[0],lmKeyTxt(lmMinor(n),'menor',false))?'lm_relativa':lmIn(v[0],lmKeyTxt(last,'major',true))&&!lmSame(last,t)?'lm_armadura_regla':null};
  if(ty==='ordre'){const i=rnd(1,lv?7:4),nn=n>0?{l:LM_SH[i-1],a:1}:{l:LM_FL[i-1],a:-1};
   return{text:`Quin és el <b>${MU_ORDM[i]||(i===6?'sisè':'setè')}</b> ${sf} de l'ordre de les alteracions?`,fields:[lmNF(nn,'Alteració')],
    hints:[n>0?'Cada sostingut nou és una 5a per damunt de l\'anterior.':'Cada bemoll nou és una 5a per davall de l\'anterior (l\'ordre dels bemolls és el dels sostinguts al revés).',i===1?(n>0?'Pensa en sol major: quina nota hi porta sostingut?':'Pensa en fa major: quina nota hi porta bemoll?'):(n>0?'El primer és el fa: compta a partir d\'aquí.':'El primer és el si: compta a partir d\'aquí.')],
    steps:[`Ordre dels ${sf}s: ${(n>0?LM_SH:LM_FL).map(l=>LM_L[l]).join(', ')}.`,`El número ${i} és <b>${lmNom(nn)}</b>.`],
    err:v=>LM_SH[i-1]!==LM_FL[i-1]&&lmIn(v[0],lmNoteTxt(n>0?{l:LM_FL[i-1],a:1}:{l:LM_SH[i-1],a:-1}))||lmIn(v[0],[LM_L[n>0?LM_FL[i-1]:LM_SH[i-1]]])?'lm_ordre_alt':lmLetterOnly(v[0],nn)?'mu_alteracio_oblida':null}}
  let m=n;if(Math.abs(m)>4)m=Math.sign(m)*rnd(2,4);const t2=lmMajor(m),a2=lmKsAcc(m);
  return{text:`Escriu, <b>en ordre</b>, les alteracions de l'armadura de <b>${lmKey(t2,'major')}</b>.`,fields:a2.map((z,i)=>lmNF(z,`${i+1}a alteració`)),
   hints:['Primer decideix si són sostinguts o bemolls i quants n\'hi ha.',m>0?'El primer sostingut és el fa i cada un dels següents és una 5a més amunt.':'El primer bemoll és el si i cada un dels següents és una 5a més avall.'],
   steps:[`${muCap(lmKey(t2,'major'))} té ${lmAltTxt(m)}.`,`En ordre: <b>${a2.map(lmNom).join(', ')}</b>.`],
   err:v=>{const set=a2.map(z=>z.l);if(v.every((x,i)=>a2.some(z=>lmIn(x,lmNoteTxt(z))))&&!v.every((x,i)=>lmIn(x,lmNoteTxt(a2[i]))))return'lm_ordre_alt';if(v.some((x,i)=>lmLetterOnly(x,a2[i])))return'mu_alteracio_oblida';return null}}}},

lm_escala_major:{mat:'musica',ab:'Ma',nom:'Escales majors',
 teoria:['Totes les escales majors segueixen el mateix esquema de tons i semitons: <b>T T S T T T S</b>.','Per construir l\'escala de re major: re, mi, fa, sol, la, si, do, re i, amb l\'esquema, cal pujar el fa i el do: <b>re, mi, fa♯, sol, la, si, do♯, re</b>.','Les alteracions de l\'escala són les mateixes que les de l\'<b>armadura</b> de la tonalitat.','Els graus s\'escriuen amb nombres romans: I, II, III, IV, V, VI, VII.'],
 gen(lv){const n=lmNRange(lv),t=lmMajor(n),sc=lmScale(t,'maj'),ty=pick(lv?['grau','completa','alt']:['grau','completa']);
  if(ty==='grau'){const g=rnd(2,7),z=sc[g-1];
   return{text:`Quina nota és el <b>grau ${MU_ROM[g-1]}</b> de l'escala de <b>${lmKey(t,'major')}</b>?`,fields:[lmNF(z)],
    hints:[`Escriu les notes a partir de ${lmNom(t)} i compta fins al grau ${MU_ROM[g-1]}.`,`No t'oblidis de les alteracions de l'armadura (${n?lmAltTxt(n):'cap'}).`],
    steps:[`Escala de ${lmKey(t,'major')}: ${sc.map(lmNom).join(', ')}.`,`Grau ${MU_ROM[g-1]}: <b>${lmNom(z)}</b>.`],err:v=>lmLetterOnly(v[0],z)?'mu_alteracio_oblida':(lmIn(v[0],lmNoteTxt(sc[g-2]))||g<7&&lmIn(v[0],lmNoteTxt(sc[g])))?'mu_compta':null}}
  if(ty==='alt')return{text:`Quantes alteracions té l'escala de <b>${lmKey(t,'major')}</b>?`+(n?' I són sostinguts o bemolls?':''),fields:[{label:'Alteracions',ans:R(Math.abs(n))},...(n?[lmF([n>0?'sostinguts':'bemolls',n>0?'sostingut':'bemoll'],'Sostinguts o bemolls',false)]:[])],
   hints:['Construeix l\'escala amb l\'esquema T T S T T T S.','O recorda l\'armadura de la tonalitat (cercle de quintes).'],steps:[`${muCap(lmKey(t,'major'))}: ${sc.map(lmNom).join(', ')}.`,`Té <b>${n?lmAltTxt(n):'cap alteració'}</b>.`],
   err:v=>n&&lmIn(v[1],[n>0?'bemolls':'sostinguts',n>0?'bemoll':'sostingut'])?'lm_ordre_alt':null};
  const k=lv?3:2,miss=[];while(miss.length<k){const i=rnd(1,6);if(!miss.includes(i))miss.push(i)}miss.sort((a,b)=>a-b);const full=[...sc,{l:t.l+7,a:t.a}];
  return{text:`Completa l'escala de <b>${lmKey(t,'major')}</b>:<br><span style="letter-spacing:.5px">${full.map((z,i)=>miss.includes(i)?'<b style="color:#E8590C">___</b>':lmNom(z)).join(' – ')}</span>`,fields:miss.map((i,j)=>lmNF(sc[i],`Nota ${j+1}`)),
   hints:['Esquema: T T S T T T S.','Els semitons són entre els graus III-IV i VII-I.'],steps:[`Escala de ${lmKey(t,'major')}: ${full.map(lmNom).join(' – ')}.`,`Falten: <b>${miss.map(i=>lmNom(sc[i])).join('</b>, <b>')}</b>.`],
   err:v=>miss.some((i,j)=>lmLetterOnly(v[j],sc[i]))?'mu_alteracio_oblida':null}}},

/* ---------- 9. Relatius i cercle de quintes ---------- */
lm_relatiu:{mat:'musica',ab:'Rl',nom:'Tonalitats relatives',
 teoria:['Cada tonalitat major té una <b>relativa menor</b> amb la <b>mateixa armadura</b>: do major i la menor (cap alteració), sol major i mi menor (1♯), fa major i re menor (1♭).','La relativa menor és una <b>3a menor per davall</b> de la tònica major (o el seu grau VI): do → <b>la</b>.','Al revés, la relativa major és una <b>3a menor per damunt</b> de la tònica menor: la → <b>do</b>.','Compte: la tonalitat <b>homònima</b> (do major i do menor) té la mateixa tònica però una armadura diferent.'],
 gen(lv){const n=lmNRange(lv),M=lmMajor(n),m=lmMinor(n),ty=pick(lv?['rm','rM','arm']:['rm','rM']);
  if(ty==='rm')return{text:`Quina és la tonalitat <b>relativa menor</b> de <b>${lmKey(M,'major')}</b>?`,fields:[lmF(lmKeyTxt(m,'menor',true),'Tonalitat')],
   hints:['Baixa una 3a menor (3 semitons) des de la tònica.','També és el grau VI de l\'escala major.'],steps:[`3a menor per davall de ${lmNom(M)}: <b>${lmNom(m)}</b>.`,`${muCap(lmKey(M,'major'))} i <b>${lmKey(m,'menor')}</b> tenen la mateixa armadura (${n?lmAltTxt(n):'cap alteració'}).`],
   err:v=>lmIn(v[0],lmKeyTxt(M,'menor',true))?'lm_homonima':lmIn(v[0],[-1,0,1].flatMap(a=>lmKeyTxt({l:M.l+2,a},'menor',true)))?'lm_relativa_dir':null};
  if(ty==='rM')return{text:`Quina és la tonalitat <b>relativa major</b> de <b>${lmKey(m,'menor')}</b>?`,fields:[lmF(lmKeyTxt(M,'major',true),'Tonalitat')],
   hints:['Puja una 3a menor (3 semitons) des de la tònica menor.','Les dues tenen la mateixa armadura.'],steps:[`3a menor per damunt de ${lmNom(m)}: <b>${lmNom(M)}</b>.`,`Les dues tenen ${n?lmAltTxt(n):'cap alteració'}.`],
   err:v=>lmIn(v[0],lmKeyTxt(m,'major',true))?'lm_homonima':lmIn(v[0],[-1,0,1].flatMap(a=>lmKeyTxt({l:m.l-2,a},'major',true)))?'lm_relativa_dir':null};
  return{text:`Quantes alteracions té l'armadura de <b>${lmKey(m,'menor')}</b>?`+(n?' Són sostinguts o bemolls?':''),fields:[{label:'Alteracions',ans:R(Math.abs(n))},...(n?[lmF([n>0?'sostinguts':'bemolls',n>0?'sostingut':'bemoll'],'Sostinguts o bemolls',false)]:[])],
   hints:['Busca primer la relativa major (3a menor amunt).','La menor té la mateixa armadura que la seva relativa major.'],steps:[`Relativa major: ${lmKey(M,'major')}.`,`Armadura: <b>${n?lmAltTxt(n):'cap alteració'}</b>.`],
   err:v=>{const h=lmNOf(m,'major');return h!=null&&h!==n&&req(v[0],R(Math.abs(h)))?'lm_homonima':null}}}},

lm_cercle:{mat:'musica',ab:'C5',nom:'El cercle de quintes',
 teoria:['El <b>cercle de quintes</b> ordena les tonalitats: cada pas cap a la dreta puja una <b>5a justa</b> i afegeix un sostingut; cada pas cap a l\'esquerra baixa una 5a justa (o puja una 4a) i afegeix un bemoll.','Sostinguts: do (0) → sol (1♯) → re (2♯) → la (3♯) → mi (4♯) → si (5♯) → fa♯ (6♯) → do♯ (7♯).','Bemolls: do (0) → fa (1♭) → si♭ (2♭) → mi♭ (3♭) → la♭ (4♭) → re♭ (5♭) → sol♭ (6♭) → do♭ (7♭).','A la part de baix del cercle hi ha tonalitats <b>enharmòniques</b>: si major = do♭ major, fa♯ major = sol♭ major, do♯ major = re♭ major. Les menors relatives segueixen el mateix ordre: la, mi, si, fa♯... i re, sol, do, fa...'],
 gen(lv){const ty=pick(lv>1?['n2k','k2n','next','enh','n2km']:lv?['n2k','k2n','next']:['n2k','k2n']);let n=lmNRange(lv);
  if(ty==='enh'){const pr=pick([[5,-7],[6,-6],[7,-5]]),i=rnd(0,1),a=lmMajor(pr[i]),b=lmMajor(pr[1-i]);
   return{text:`Quina tonalitat major és <b>enharmònica</b> de <b>${lmKey(a,'major')}</b> (sona igual)?`,fields:[lmF(lmKeyTxt(b,'major',true),'Tonalitat')],
    hints:['Busca la tecla del piano de la tònica i dona-li un altre nom.','Si una té sostinguts, l\'altra té bemolls.'],steps:[`${muCap(lmNom(a))} = ${lmNom(b)}.`,`${muCap(lmKey(a,'major'))} (${lmAltTxt(pr[i])}) = <b>${lmKey(b,'major')}</b> (${lmAltTxt(pr[1-i])}).`],err:null}}
  if(ty==='next'){if(Math.abs(n)>6)n=Math.sign(n)*6;const up=Math.random()<.5,t=lmMajor(n),t2=lmMajor(n+(up?1:-1));
   return{text:`Al cercle de quintes, quina tonalitat major hi ha una <b>5a justa ${up?'per damunt':'per davall'}</b> de <b>${lmKey(t,'major')}</b>?`,fields:[lmF(lmKeyTxt(t2,'major',true),'Tonalitat')],
    hints:[up?'Puja 5 notes (7 semitons) des de la tònica.':'Baixa 5 notes (7 semitons) des de la tònica.',up?'Tindrà un sostingut més (o un bemoll menys).':'Tindrà un bemoll més (o un sostingut menys).'],
    steps:[`5a justa ${up?'per damunt':'per davall'} de ${lmNom(t)}: <b>${lmNom(t2)}</b>.`,`${muCap(lmKey(t2,'major'))}: ${n+(up?1:-1)?lmAltTxt(n+(up?1:-1)):'cap alteració'}.`],
    err:v=>lmIn(v[0],lmKeyTxt(lmMajor(n+(up?-1:1)),'major',true))?'lm_cercle_dir':null}}
  const mode=ty==='n2km'?'menor':'major',t=mode==='menor'?lmMinor(n):lmMajor(n);
  if(ty==='k2n')return{text:`Quantes alteracions té <b>${lmKey(t,'major')}</b>?`+(n?' Són sostinguts o bemolls?':''),fields:[{label:'Alteracions',ans:R(Math.abs(n))},...(n?[lmF([n>0?'sostinguts':'bemolls',n>0?'sostingut':'bemoll'],'Sostinguts o bemolls',false)]:[])],
   hints:['Al cercle de quintes, cada 5a amunt des de do afegeix un sostingut i cada 5a avall, un bemoll.',`Compta quantes 5es hi ha entre do i ${lmNom(t)}, i en quin sentit.`],steps:[`Al cercle de quintes, ${lmKey(t,'major')} és a ${Math.abs(n)} pas${Math.abs(n)===1?'':'sos'} de do.`,`Té <b>${n?lmAltTxt(n):'cap alteració'}</b>.`],err:null};
  if(n===0)n=pick([2,-2,3,-3]);const t3=mode==='menor'?lmMinor(n):lmMajor(n);
  return{text:`Quina tonalitat <b>${mode}</b> té <b>${lmAltTxt(n)}</b>?`,fields:[lmF(lmKeyTxt(t3,mode,true),'Tonalitat')],
   hints:[n>0?'Sostinguts: un semitò per damunt del darrer sostingut.':n===-1?'Amb un sol bemoll no hi ha penúltim: és el cas especial, una 5a per davall de do.':'Bemolls: la tonalitat té el nom del penúltim bemoll.',mode==='menor'?'Troba la major i baixa una 3a menor.':'O recorre el cercle de quintes.'],
   steps:[`Armadura: ${lmKsAcc(n).map(lmNom).join(', ')}.`,`Major: ${lmKey(lmMajor(n),'major')}${mode==='menor'?` → relativa menor: <b>${lmKey(t3,'menor')}</b>`:''}.`,`Resposta: <b>${lmKey(t3,mode)}</b>.`],
   err:v=>mode==='menor'&&lmIn(v[0],lmKeyTxt(lmMajor(n),'menor',true))?'lm_relativa':mode==='major'&&lmIn(v[0],lmKeyTxt(lmKsAcc(n).slice(-1)[0],'major',true))?'lm_armadura_regla':null}}},

/* ---------- 10. Escales menors ---------- */
lm_menors:{mat:'musica',ab:'Mn',nom:'Escales menors: natural, harmònica i melòdica',
 teoria:['L\'escala <b>menor natural</b> té les notes de la seva relativa major, començant pel grau VI: la menor = la, si, do, re, mi, fa, sol, la. Esquema: T S T T S T T.','L\'escala <b>menor harmònica</b> puja el <b>grau VII</b> un semitò (així té sensible): la, si, do, re, mi, fa, <b>sol♯</b>, la. Entre el VI i el VII hi ha una 2a augmentada.','L\'escala <b>menor melòdica</b> puja els graus <b>VI i VII</b> quan <b>puja</b>: la, si, do, re, mi, <b>fa♯</b>, <b>sol♯</b>, la. Quan <b>baixa</b>, és com la natural.','Aquestes alteracions no van a l\'armadura: s\'escriuen com a alteracions accidentals.'],
 fig:()=>lmStaff([5,6,7,8,9,10,11,12].map((l,i)=>({n:l,d:'r',acc:i===6?1:null,hi:i===6,lab:MU_ROM[i]||'I',w:38})),{aria:'Escala de la menor harmònica'}),
 gen(lv){const n=lmNRange(lv>1?1:0),t=lmMinor(n),ty=pick(lv?['grau','quin','canvi']:['grau','grau','canvi']);
  if(ty==='grau'){const tp=pick(lv?['nat','har','mel']:['har','har','nat']),g=pick(tp==='nat'?[3,6,7]:[6,7]),z=lmScale(t,tp)[g-1];
   return{text:`A l'escala de <b>${lmKey(t,'menor')} ${LM_SCN[tp]}</b>${tp==='mel'?' (pujant)':''}, quina nota és el <b>grau ${MU_ROM[g-1]}</b>?`,fields:[lmNF(z)],
    hints:[g===3?`L'armadura té ${n?lmAltTxt(n):'cap alteració'}. Escriu l'escala a partir de ${lmNom(t)}.`:`La relativa major és ${lmKey(lmMajor(n),'major')}: l'armadura té ${n?lmAltTxt(n):'cap alteració'}.`,'Harmònica: puja el VII. Melòdica pujant: puja el VI i el VII.'],
    steps:[`${muCap(lmKey(t,'menor'))} natural: ${lmScale(t,'nat').map(lmNom).join(', ')}.`,tp==='nat'?'A la natural no es canvia res.':tp==='har'?'A l\'harmònica es puja el grau VII.':'A la melòdica pujant es pugen els graus VI i VII.',`Grau ${MU_ROM[g-1]}: <b>${lmNom(z)}</b>.`],
    err:v=>{for(const o of ['nat','har','mel'])if(o!==tp){const w=lmScale(t,o)[g-1];if(!lmSame(w,z)&&lmIn(v[0],lmNoteTxt(w)))return'lm_menor_tipus'}return null}}}
  if(ty==='quin'){const tp=pick(['nat','har','mel']),sc=[...lmScale(t,tp),{l:t.l+7,a:t.a}];
   return{text:`Quin tipus d'escala menor és aquesta (pujant)?<br><b style="letter-spacing:.5px">${sc.map(lmNom).join(' – ')}</b>`,fields:[lmF([LM_SCN[tp],`menor ${LM_SCN[tp]}`,`escala menor ${LM_SCN[tp]}`])],
    hints:[`Compara-la amb l'escala de ${lmKey(t,'menor')} que només porta les alteracions de l'armadura (${n?lmAltTxt(n):'cap'}).`,'Mira els graus VI i VII: n\'hi ha cap de pujat? Quants?'],
    steps:[`Natural: ${lmScale(t,'nat').map(lmNom).join(', ')}.`,tp==='nat'?'Cap grau pujat → <b>natural</b>.':tp==='har'?'Només el VII pujat → <b>harmònica</b>.':'VI i VII pujats → <b>melòdica</b>.'],
    err:v=>['natural','harmònica','melòdica','harmonica','melodica'].some(x=>lmIn(v[0],[x])&&lmStrip(x)!==lmStrip(LM_SCN[tp]))?'lm_menor_tipus':null}}
  const sc=lmScale(t,'mel');
  return{text:`A l'escala de <b>${lmKey(t,'menor')} melòdica</b> (pujant), quines són les notes dels graus <b>VI</b> i <b>VII</b>?`,fields:[lmNF(sc[5],'Grau VI'),lmNF(sc[6],'Grau VII')],
   hints:[`Natural: ${lmScale(t,'nat').map(lmNom).join(', ')}.`,'A la melòdica pujant, els graus VI i VII pugen un semitò.'],
   steps:[`Natural: VI = ${lmNom(lmScale(t,'nat')[5])}, VII = ${lmNom(lmScale(t,'nat')[6])}.`,`Pujats un semitò: <b>${lmNom(sc[5])}</b> i <b>${lmNom(sc[6])}</b>.`],
   err:v=>lmIn(v[0],lmNoteTxt(lmScale(t,'nat')[5]))?'lm_menor_tipus':null}}},

/* ---------- 11. Graus i acords ---------- */
lm_graus:{mat:'musica',ab:'Gr',nom:'Els graus de l\'escala',
 teoria:['Cada grau té un nom: I <b>tònica</b> · II <b>supertònica</b> · III <b>mediant</b> · IV <b>subdominant</b> · V <b>dominant</b> · VI <b>superdominant</b> (o submediant) · VII <b>sensible</b>.','La <b>sensible</b> és a un <b>semitò</b> de la tònica i «vol» anar-hi. Si el VII és a un to (com a la menor natural), s\'anomena <b>subtònica</b>.','Els <b>graus tonals</b> són el <b>I, IV i V</b>: són els més importants i defineixen la tonalitat.','Els <b>graus modals</b> són el <b>III i el VI</b>: canvien entre major i menor (defineixen el mode).'],
 noms:[['tònica','tonica'],['supertònica','supertonica'],['mediant'],['subdominant'],['dominant'],['superdominant','submediant'],['sensible']],
 gen(lv){const ty=pick(lv?['nom','num','nota','tonal']:['nom','num','tonal']),g=rnd(1,7),nm=this.noms[g-1];
  if(ty==='nom')return{text:`Com s'anomena el <b>grau ${MU_ROM[g-1]}</b> de l'escala?`,fields:[lmF(nm,'Nom del grau')],
   hints:[(j=>`El grau ${MU_ROM[j-1]} és la ${this.noms[j-1][0]}.`)(g===5?1:g>1?g-1:2),'«Super-» vol dir per damunt; «sub-», per davall.'],steps:['I tònica · II supertònica · III mediant · IV subdominant · V dominant · VI superdominant · VII sensible.',`El grau ${MU_ROM[g-1]} és la <b>${nm[0]}</b>.`],
   err:v=>this.noms.some((x,i)=>i!==g-1&&lmIn(v[0],x))?'lm_grau':null};
  if(ty==='num')return{text:`Quin grau de l'escala és la <b>${nm[0]}</b>? (Escriu-lo en nombre romà o en xifra.)`,fields:[lmF(lmRomTxt(g),'Grau',false)],
   hints:[(j=>`La ${this.noms[j-1][0]} és el grau ${MU_ROM[j-1]}.`)(g<7?g+1:6),'«Super-» vol dir per damunt; «sub-», per davall.'],steps:['I tònica · II supertònica · III mediant · IV subdominant · V dominant · VI superdominant · VII sensible.',`La ${nm[0]} és el grau <b>${MU_ROM[g-1]}</b>.`],
   err:v=>[g-1,g+1].some(x=>x>=1&&x<=7&&lmIn(v[0],lmRomTxt(x)))?'lm_grau':null};
  if(ty==='nota'){const n=lmNRange(1),t=lmMajor(n),z=lmScale(t,'maj')[g-1];
   return{text:`Quina nota és la <b>${nm[0]}</b> de <b>${lmKey(t,'major')}</b>?`,fields:[lmNF(z)],
    hints:[`La ${nm[0]} és el grau ${MU_ROM[g-1]}.`,`Escala de ${lmKey(t,'major')}: compta a partir de ${lmNom(t)} i recorda l'armadura.`],
    steps:[`${muCap(nm[0])} = grau ${MU_ROM[g-1]}.`,`Escala: ${lmScale(t,'maj').map(lmNom).join(', ')} → <b>${lmNom(z)}</b>.`],err:v=>lmLetterOnly(v[0],z)?'mu_alteracio_oblida':null}}
  const gg=pick([1,4,5,3,6]),tn=[1,4,5].includes(gg)?'tonal':'modal';
  return{text:`El <b>grau ${MU_ROM[gg-1]}</b>, és un grau <b>tonal</b> o <b>modal</b>?`,fields:[lmF([tn,`grau ${tn}`])],
   hints:['Uns graus són els pilars de la peça; els altres decideixen si sona major o menor.','Els pilars són els graus dels tres acords principals: tònica, subdominant i dominant. Quin número té cadascun?'],steps:[`Tonals: I, IV, V · modals: III, VI. El ${MU_ROM[gg-1]} és <b>${tn}</b>.`],err:v=>lmIn(v[0],[tn==='tonal'?'modal':'tonal'])?'lm_grau':null}}},

lm_acords:{mat:'musica',ab:'Ac',nom:'Acords tríada',
 teoria:['Un <b>acord tríada</b> són tres notes superposades per <b>terceres</b>: la <b>fonamental</b>, la <b>3a</b> i la <b>5a</b>. Exemple: do – mi – sol.','<b>Major</b>: 3a M + 5a J (do – mi – sol). <b>Menor</b>: 3a m + 5a J (la – do – mi). <b>Disminuït</b>: 3a m + 5a d (si – re – fa). <b>Augmentat</b>: 3a M + 5a A (do – mi – sol♯).','A l\'escala major, els acords dels graus <b>I, IV i V</b> són majors; els del <b>II, III i VI</b>, menors; el del <b>VII</b>, disminuït.','Per saber de quin tipus és, mira la 3a des de la fonamental (major o menor) i després la 5a (justa, disminuïda o augmentada).'],
 fig:()=>lmStaff([{ch:[{n:0},{n:2},{n:4}],lab:'major'},{ch:[{n:5},{n:7},{n:9}],lab:'menor'},{ch:[{n:6},{n:8},{n:10}],lab:'disminuït'},{ch:[{n:0},{n:2},{n:4,acc:1}],lab:'augmentat'}].map(x=>({...x,w:62})),{aria:'Tipus d\'acords tríada'}),
 Q:{M:['M','J','major'],m:['m','J','menor'],d:['m','d','disminuït'],A:['M','A','augmentat']},
 gen(lv){const ty=pick(lv?['tipus','tipus','notes','grau']:['tipus','tipus','grau']);let r,q,ns,g=0;
  do{if(lv===0){const k=rnd(0,6);r={l:k,a:0};const sc=lmScale({l:0,a:0},'maj');ns=[0,2,4].map(i=>({l:k+i,a:sc[lmMod(k+i,7)].a}));const i3=lmIntOf(ns[0],ns[1]),i5=lmIntOf(ns[0],ns[2]);q=Object.keys(this.Q).find(x=>this.Q[x][0]===i3.q&&this.Q[x][1]===i5.q)}
   else{r={l:rnd(0,6),a:pick([0,0,0,1,-1])};q=pick(lv>1?['M','m','d','A']:['M','m','M','m','d']);const Z=this.Q[q];ns=[r,lmUp(r,3,Z[0]),lmUp(r,5,Z[1])]}}while(ns.some(z=>Math.abs(z.a)>1)&&g++<60);
  const nm=this.Q[q][2],i3=lmIntName(3,this.Q[q][0]),i5=lmIntName(5,this.Q[q][1]);
  if(ty==='tipus')return{text:'De quin tipus és aquest acord tríada? (major, menor, disminuït o augmentat)',fig:lmStaff([{ch:ns.map(z=>({n:z.l,acc:z.a})),w:60}],{minW:150})+muSndBtn(lmEv(ns,{harm:true})),
   fields:[lmF([nm,`acord ${nm}`,`tríada ${nm}`,`perfecte ${nm}`,nm.replace('ït','ida'),'acord '+nm.replace('ït','it')])],
   hints:['Compta els semitons de la nota de baix a la del mig: en són 4 o 3?','Compta ara els semitons de la nota de baix a la de dalt: 7, 6 o 8? Amb les dues dades, mira la teoria.'],
   steps:[`Notes: ${ns.map(lmNom).join(' – ')}.`,`De ${lmNom(ns[0])} a ${lmNom(ns[1])}: ${i3}. De ${lmNom(ns[0])} a ${lmNom(ns[2])}: ${i5}.`,`És un acord <b>${nm}</b>.`],
   err:v=>lmIn(v[0],[q==='M'?'menor':q==='m'?'major':'___'])?'lm_acord':null};
  if(ty==='notes')return{text:`Escriu les notes de l'acord de <b>${lmNom(r)} ${nm}</b> (fonamental, 3a i 5a).`,fields:[lmNF(ns[0],'Fonamental'),lmNF(ns[1],'3a'),lmNF(ns[2],'5a')],
   hints:[`Un acord ${nm} té una ${i3} i una ${i5}.`,'Escriu tres notes saltant-ne una (per terceres) i ajusta les alteracions.'],
   steps:[`Per terceres: ${ns.map(z=>LM_L[lmMod(z.l,7)]).join(' – ')}.`,`${i3} i ${i5} → <b>${ns.map(lmNom).join(' – ')}</b>.`],
   err:v=>v.some((x,i)=>lmLetterOnly(x,ns[i]))?'lm_acord':null};
  const n=lmNRange(lv>1?1:0),t=lmMajor(n),sc=lmScale(t,'maj'),gg=rnd(1,7),ch=[0,2,4].map(i=>sc[lmMod(gg-1+i,7)]);
  return{text:`A <b>${lmKey(t,'major')}</b>, sobre quin grau es forma l'acord <b>${ch.map(lmNom).join(' – ')}</b>?`,fields:[lmF(lmRomTxt(gg),'Grau',false)],
   hints:['La nota de baix de l\'acord (la fonamental) diu el grau.',`Escala de ${lmKey(t,'major')}: ${sc.map(lmNom).join(', ')}.`],
   steps:[`La fonamental és ${lmNom(ch[0])}.`,`${muCap(lmNom(ch[0]))} és el grau <b>${MU_ROM[gg-1]}</b> de ${lmKey(t,'major')}.`],err:null}}},

/* ---------- 12. Clau de do, inversió i transport ---------- */
lm_int_inversio:{mat:'musica',ab:'Iv',nom:'Inversió d\'intervals',
 teoria:['<b>Invertir</b> un interval és passar la nota de baix una octava amunt (o la de dalt una octava avall): do-mi (3a) → mi-do (6a).','El <b>nombre</b> de l\'interval i el de la seva inversió sumen sempre <b>9</b>: 2a ↔ 7a, 3a ↔ 6a, 4a ↔ 5a.','La <b>classe</b> canvia així: major ↔ menor, augmentada ↔ disminuïda, i la <b>justa continua justa</b>.','Els semitons de l\'interval i de la inversió sumen <b>12</b> (una octava): 3a M (4) + 6a m (8) = 12.'],
 gen(lv){if(Math.random()<.2){const k=rnd(2,7),q=pick(lmQs(k,true)),s=lmSemisOf(k,q);
   return{text:`Una <b>${lmIntName(k,q)}</b> té ${s} semitons. Quants semitons té la seva <b>inversió</b>?`,fields:[{label:'Semitons',ans:R(12-s)}],hints:['Interval + inversió = una octava.','Una octava té 12 semitons.'],steps:[`12 − ${s} = <b>${12-s}</b> semitons.`],err:null}}
  const k=rnd(2,7),q=pick(lmQs(k,lv>0)),ik=9-k,iq={M:'m',m:'M',J:'J',A:'d',d:'A'}[q];
  return{text:`Quina és la <b>inversió</b> d'una <b>${lmIntName(k,q)}</b>?`,fields:[lmF(lmIntTxt(ik,iq),'Interval')],
   hints:['El nombre: 9 menys el nombre de l\'interval.','La classe: major ↔ menor, augmentada ↔ disminuïda; la justa es queda justa.'],
   steps:[`Nombre: 9 − ${k} = ${ik}.`,`Classe: ${LM_QN[q]} → ${LM_QN[iq]}.`,`La inversió és una <b>${lmIntName(ik,iq)}</b>.`],
   err:v=>{const p=lmParseInt(v[0]);return p&&(p.k!==ik||p.q!==iq)?'lm_inversio':null}}}},

lm_transport:{mat:'musica',ab:'Tp',nom:'El transport',
 teoria:['<b>Transportar</b> és escriure (o tocar) una melodia més aguda o més greu, <b>sense canviar-ne els intervals</b>. Es fa per adaptar-la a una veu o a un instrument.','Si transportam una peça de <b>do major</b> una <b>2a major amunt</b>, quedarà en <b>re major</b>: cada nota puja una 2a major (do → re, mi → fa♯, fa → sol...).','Truc: primer troba la <b>tonalitat nova</b> i la seva armadura; després puja totes les notes el mateix nombre de notes i aplica l\'armadura.','Hi ha instruments <b>transpositors</b>: el clarinet en si♭ i la trompeta en si♭ sonen una 2a major més greu del que està escrit.'],
 gen(lv){const ivs=lv?[[2,'M'],[5,'J'],[4,'J'],[3,'M'],[2,'m'],[3,'m']]:[[2,'M'],[5,'J'],[4,'J']],[k,q]=pick(ivs),down=lv>1&&Math.random()<.3;
  const fromN=lv>1?pick([0,0,1,-1]):0,t0=lmMajor(fromN),t1=down?lmDown(t0,k,q):lmUp(t0,k,q),t1n=lmNOf(t1,'major');
  if(t1n==null||Math.abs(t1n)>6)return this.gen(lv);
  if(Math.random()<.4)return{text:`Una peça en <b>${lmKey(t0,'major')}</b> es transporta una <b>${lmIntName(k,q)} ${down?'avall':'amunt'}</b>. En quina tonalitat queda?`,fields:[lmF(lmKeyTxt(t1,'major',true),'Tonalitat')],
   hints:[`Calcula la nota que fa una ${lmIntName(k,q)} ${down?'per davall':'per damunt'} de ${lmNom(t0)}.`,`Una ${lmIntName(k,q)} té ${lmSemisOf(k,q)} semitons.`],
   steps:[`${lmIntName(k,q)} ${down?'per davall':'per damunt'} de ${lmNom(t0)} → <b>${lmNom(t1)}</b>.`,`Queda en <b>${lmKey(t1,'major')}</b> (${t1n?lmAltTxt(t1n):'cap alteració'}).`],
   err:v=>lmLetterOnly(v[0],t1)||[-1,0,1].some(a=>lmIn(v[0],lmKeyTxt({l:t1.l,a},'major',true)))&&!lmIn(v[0],lmKeyTxt(t1,'major',true))?'lm_int_classe':null};
  const sc=lmScale(t0,'maj'),L=rnd(3,lv?4:3),mel=[];let i=rnd(0,4);for(let j=0;j<L;j++){mel.push({...sc[lmMod(i,7)],l:sc[0].l+i});i=Math.max(0,Math.min(7,i+pick([-2,-1,1,1,2])))}
  const out=mel.map(z=>down?lmDown(z,k,q):lmUp(z,k,q));
  return{text:`Transporta aquesta melodia de <b>${lmKey(t0,'major')}</b> una <b>${lmIntName(k,q)} ${down?'avall':'amunt'}</b> (a ${lmKey(t1,'major')}). Escriu les notes noves.`,
   fig:lmStaff(mel.map((z,j)=>({n:z.l,acc:fromN?null:z.a,d:'n',lab:j+1})),{ks:fromN})+muSndBtn(lmEv(mel)),fields:out.map((z,j)=>lmNF(z,`Nota ${j+1}`)),
   hints:[`Tonalitat nova: ${lmKey(t1,'major')}, amb ${t1n?lmAltTxt(t1n)+'. Quins són?':'cap alteració.'}`,`${down?'Baixa':'Puja'} cada nota ${k-1} ${k===2?'nota':'notes'} i aplica l'armadura nova.`],
   steps:[`Melodia: ${mel.map(lmNom).join(', ')}.`,`Armadura de ${lmKey(t1,'major')}: ${t1n?lmKsAcc(t1n).map(lmNom).join(', '):'cap'}.`,`Transportada: <b>${out.map(lmNom).join(', ')}</b>.`],
   err:v=>v.some((x,j)=>lmLetterOnly(x,out[j]))?'mu_alteracio_oblida':null}}},

/* ---------- 13. Formes musicals i història ---------- */
lm_formes:{mat:'musica',ab:'Hi',nom:'Formes musicals i història de la música',
 teoria:['<b>Estructura</b>: el <b>motiu</b> és una idea breu; unes quantes formen una <b>semifrase</b>, i dues semifrases, una <b>frase</b> (pregunta – resposta). La <b>cadència</b> és el final d\'una frase: <b>perfecta</b> (V → I, sensació de final) o <b>semicadència</b> (acaba al V, sensació de pregunta).','<b>Formes</b>: binària (A B), ternària (A B A), rondó (A B A C A), tema amb variacions, cànon, <b>fuga</b> (un tema que entra successivament a totes les veus), <b>suite</b> (sèrie de danses), <b>minuet</b> (dansa en 3/4 amb trio), <b>forma sonata</b> (exposició, desenvolupament, reexposició), <b>simfonia</b>, <b>concert</b>, <b>lied</b>.','<b>Història</b>: Edat Mitjana (cant gregorià, trobadors) · Renaixement (polifonia vocal) · <b>Barroc</b> (1600-1750: Bach, Vivaldi, Händel) · <b>Classicisme</b> (1750-1820: Haydn, Mozart, Beethoven) · <b>Romanticisme</b> (segle XIX: Schubert, Chopin, Schumann) · segles XX-XXI (Debussy, Stravinsky...).','Compositors i intèrprets del nostre entorn: Isaac Albéniz, Enric Granados, Pau Casals, Antoni Torrandell...'],
 bank:muMk([
  ['Com es diu el període de Bach i Vivaldi (aproximadament de 1600 a 1750)?','barroc|el barroc|període barroc','És el període anterior al Classicisme.','És el <b>Barroc</b>.','classicisme|romanticisme|renaixement'],
  ['Com es diu el període de Haydn i Mozart (aproximadament de 1750 a 1820)?','classicisme|clàssic|període clàssic','És el període que va just després del Barroc.','És el <b>Classicisme</b>.','barroc|romanticisme'],
  ['Com es diu el període musical del segle XIX, el de Chopin i Schumann?','romanticisme|romàntic|període romàntic','Les emocions i la llibertat hi són molt importants.','És el <b>Romanticisme</b>.','classicisme|barroc'],
  ['Quin compositor italià va escriure «Les quatre estacions»?','vivaldi|antonio vivaldi','Era un capellà de Venècia amb els cabells rojos.','És <b>Antonio Vivaldi</b> (Barroc).','bach|mozart'],
  ['Quin compositor austríac, nin prodigi, va escriure l\'òpera «La flauta màgica»?','mozart|wolfgang amadeus mozart','Va néixer a Salzburg el 1756.','És <b>Wolfgang Amadeus Mozart</b> (Classicisme).','beethoven|haydn'],
  ['Quin compositor va escriure nou simfonies i va continuar component quan es va quedar sord?','beethoven|ludwig van beethoven','La seva 9a simfonia té l\'«Oda a l\'alegria».','És <b>Ludwig van Beethoven</b>.','mozart|bach'],
  ['Com es diu una obra per a orquestra, normalment en quatre moviments?','simfonia|una simfonia','Beethoven en va escriure nou.','És una <b>simfonia</b>.','concert|sonata'],
  ['Com es diu una obra per a un instrument solista i orquestra?','concert|un concert','El solista dialoga amb l\'orquestra.','És un <b>concert</b>.','simfonia|sonata'],
  ['Com es diu una idea musical molt breu, de poques notes, que es repeteix i es transforma?','motiu|motiu musical','És la peça més petita de l\'estructura.','És un <b>motiu</b>.','frase|semifrase',1],
  ['Quin compositor alemany del Barroc va escriure «L\'art de la fuga» i els Concerts de Brandenburg?','bach|johann sebastian bach|j s bach','Es diu Johann Sebastian.','És <b>Johann Sebastian Bach</b>.','vivaldi|händel|handel',1],
  ['Com es diu la forma en què un tema entra successivament a totes les veus, molt típica de Bach?','fuga|una fuga','Les veus semblen «fugir» les unes de les altres.','És la <b>fuga</b>.','cànon|canon|rondó',1],
  ['Com es diu una sèrie de danses (allemanda, courante, sarabanda, giga...) típica del Barroc?','suite|una suite','És una paraula francesa.','És una <b>suite</b>.','sonata|simfonia',1],
  ['Com es diu la dansa elegant en 3/4 del Classicisme que sovint porta un trio enmig?','minuet|minuetto','Té forma ternària, amb un trio al mig.','És el <b>minuet</b>.','vals',1],
  ['Quin compositor polonès del Romanticisme és famós per les seves peces per a piano (nocturns, valsos, polonesas)?','chopin|frédéric chopin|frederic chopin','Va passar un hivern a Valldemossa, a Mallorca.','És <b>Frédéric Chopin</b>, que va estar a la Cartoixa de Valldemossa (1838-1839).','liszt|schumann',1],
  ['Quin violoncel·lista català va fer famosa arreu del món la cançó «El cant dels ocells»?','pau casals|casals','Va néixer al Vendrell.','És <b>Pau Casals</b>.','',1],
  ['Com es diu el cant religiós a una sola veu i sense acompanyament de l\'Edat Mitjana?','cant gregorià|gregorià|cant gregoria','Porta el nom d\'un papa.','És el <b>cant gregorià</b>.','',1],
  ['Com es diu la forma del primer moviment de moltes sonates i simfonies, amb exposició, desenvolupament i reexposició?','forma sonata|sonata','Té el nom d\'un tipus d\'obra per a un o dos instruments.','És la <b>forma sonata</b>.','rondó|fuga',2],
  ['Com es diu la cadència que va del grau V al I i dona sensació de final?','cadència perfecta|cadencia perfecta|cadència autèntica','És la cadència més conclusiva.','És la <b>cadència perfecta</b> (V → I).','semicadència',2],
  ['Com es diu la cadència que acaba al grau V i dona sensació de pregunta?','semicadència|semicadencia|cadència suspensiva','«Semi-» vol dir mig.','És la <b>semicadència</b>.','cadència perfecta',2],
  ['Com es diu una cançó per a veu i piano del Romanticisme alemany, com les de Schubert?','lied|lieder','És una paraula alemanya que vol dir «cançó».','És un <b>lied</b> (en plural, <i>lieder</i>).','',2],
  ['Quin compositor català va escriure la suite per a piano «Iberia»?','albéniz|isaac albéniz|albeniz','Es deia Isaac.','És <b>Isaac Albéniz</b>.','granados',2],
  ['Com es diu el període de la polifonia vocal (segles XV i XVI), anterior al Barroc?','renaixement|el renaixement','És el moment en què «reneixen» les arts.','És el <b>Renaixement</b>.','barroc|edat mitjana',2]]),
 gen(lv){return muFromBank(this.bank,'lm_historia',lv)}},

/* ---------- 14. Audició ---------- */
lm_audicio:{mat:'musica',ab:'Au',nom:'Audició: intervals, acords i compassos',
 teoria:['Aquest tema és per entrenar l\'<b>orella</b>: cal escoltar. Pitja <b>▶ Escolta</b> tantes vegades com vulguis.','<b>3a major</b>: sona alegre i lluminosa (do-mi). <b>3a menor</b>: més trista o fosca (la-do). El mateix passa amb els <b>acords</b> majors i menors.','<b>Compàs binari</b>: el pols fort torna cada 2 (fort-feble). <b>Ternari</b>: cada 3 (fort-feble-feble), com un vals.','Per reconèixer intervals, ajuda recordar el començament de cançons conegudes.'],
 gen(lv){const ty=pick(lv>1?['int3','acord','compas','escala','num','num']:lv?['int3','acord','compas','escala','num']:['int3','compas','num']);const r={l:rnd(0,4),a:0};
  if(ty==='int3'||ty==='acord'){const q=pick(['M','m']),ns=ty==='int3'?[r,lmUp(r,3,q)]:[r,lmUp(r,3,q),lmUp(r,5,'J')],ans=q==='M'?'major':'menor';
   return{text:`Escolta ${ty==='int3'?'l\'<b>interval</b>':'l\'<b>acord</b>'}. És <b>major</b> o <b>menor</b>?<br>${muSndBtn(lmEv(ns,{harm:true}))}`,fields:[lmF([ans,ty==='int3'?`3a ${ans}`:`acord ${ans}`])],
    hints:['Un dels dos sona alegre i lluminós; l\'altre, més trist o fosc. Quina sensació et fa?',ty==='int3'?'Canta la nota de baix i després la de dalt. Com més separades estan, més lluminós sona.':'Escolta-ho uns quants cops i fixa\'t en la nota del mig.'],steps:[`Era ${ty==='int3'?'una 3a':'un acord'} <b>${ans}</b> (${ns.map(lmNom).join(' – ')}). Torna-ho a escoltar fixant-t'hi.`],err:null}}
  if(ty==='escala'){const tp=pick(['maj','nat']),sc=[...lmScale(r,tp),{l:r.l+7,a:0}],ans=tp==='maj'?'major':'menor';
   return{text:`Escolta l'<b>escala</b>. És <b>major</b> o <b>menor</b>?<br>${muSndBtn(lmEv(sc,{gap:.42,dur:.4}))}`,fields:[lmF([ans,`escala ${ans}`])],hints:['Fixa\'t en la 3a nota: queda lluny o a prop de la primera?','Un tipus d\'escala sona alegre; l\'altre, més trist.'],steps:[`Era una escala <b>${ans}</b>: ${sc.map(lmNom).join(', ')}.`],err:null}}
  if(ty==='compas'){const b=pick(lv?[2,3,4]:[2,3]),ev=[],beat=.5;for(let i=0;i<b*4;i++)ev.push({at:i*beat,click:true,strong:i%b===0},{at:i*beat,f:i%b===0?392:262,dur:.22,vol:i%b===0?.32:.12});
   const ans=LM_CLS[b],opts=lv?'<b>binari</b>, <b>ternari</b> o <b>quaternari</b>':'<b>binari</b> o <b>ternari</b>';return{text:`Escolta el pols. El compàs és ${opts}?<br>${muSndBtn(ev)}`,fields:[lmF([ans,`compàs ${ans}`])],
    hints:['Compta a partir de cada so fort: quants sons hi ha fins al fort següent?','Bi- vol dir dos; ter-, tres; quater-, quatre.'],steps:[`Els sons forts tornaven cada ${b}: compàs <b>${ans}</b>.`],err:null}}
  const root=lv?pick([0,3,4]):0,R0={l:root,a:0},k=rnd(2,lv?8:5),q=lmPerf(k)?'J':'M',n2=lmUp(R0,k,q),rn=lmNom(R0);
  return{text:`Escolta: la primera nota és <b>${rn}</b>. Quin <b>interval</b> forma amb la segona (és major o just)? Escriu-ne el nombre.<br>${muSndBtn(lmEv([R0,n2]))}`,fields:[{label:`Nombre (2 a ${lv?8:5})`,ans:R(k)}],
   hints:[`Canta l'escala major que comença a ${rn}, des de baix, fins que arribis a la segona nota.`,'Compta les notes que has cantat, incloent-hi la primera i la darrera.'],steps:[`La segona nota era <b>${lmNom(n2)}</b>: de ${rn} a ${lmNom(n2)} hi ha una <b>${k}a</b>.`],err:null}}}
});

/* ---------- 4t EE: compassos d'amalgama i tonalitats veïnes ---------- */
const LM_AMG={'5/8':[[2,3],[3,2]],'7/8':[[2,2,3],[2,3,2],[3,2,2]],'8/8':[[3,3,2],[3,2,3],[2,3,3]],'5/4':[[2,3],[3,2]]};
Object.assign(SK,{
lm_amalgama:{mat:'musica',ab:'Am',nom:'Compassos d\'amalgama (5/8, 7/8...)',
 teoria:['Els <b>compassos d\'amalgama</b> (o irregulars) barregen temps de <b>2</b> i de <b>3</b> parts dins el mateix compàs: per això els temps no duren tots igual.','<b>5/8</b> = 2 + 3 o 3 + 2 corxeres (2 temps, un de curt i un de llarg). El <b>zortziko</b> basc és en 5/8.','<b>7/8</b> = 2 + 2 + 3, 2 + 3 + 2 o 3 + 2 + 2 (3 temps). <b>8/8</b> agrupat 3 + 3 + 2 (3 temps). Són molt típics de la música dels Balcans.','Per comptar-los, digues les corxeres agrupades: «<b>u</b>-i <b>u</b>-i-i» (2 + 3). L\'agrupació sovint s\'indica amb les barres que uneixen les corxeres o escrivint-la damunt (2+3/8).'],
 gen(lv){const ts=pick(lv?Object.keys(LM_AMG):['5/8','7/8']),G=pick(LM_AMG[ts]),[a,b]=ts.split('/').map(Number),gs=G.join(' + '),ty=pick(lv?['temps','parts','llargs','agrupa','classe']:['temps','parts','agrupa']);
  const un=b===8?'corxeres':'negres';
  if(ty==='temps')return{text:`Un compàs de <b>${ts}</b> agrupat <b>${gs}</b>: quants <b>temps</b> (pulsacions) té?`,fields:[{label:'Temps',ans:R(G.length)}],
   hints:['Cada grup (de 2 o de 3) és un temps.','Compta els grups, no les '+un+'.'],steps:[`${gs}: ${G.length} grups → <b>${G.length}</b> temps.`],err:x=>req(x[0],R(a))?'lm_compost':null};
  if(ty==='parts')return{text:`Quantes <b>${un}</b> té un compàs de <b>${ts}</b>?`,fields:[{label:muCap(un),ans:R(a)}],hints:['Mira el número de dalt.',`El número de baix (${b}) diu quina figura es compta.`],steps:[`El ${ts} té <b>${a}</b> ${un}.`],err:null};
  if(ty==='llargs'){const k=G.filter(x=>x===3).length;return{text:`En un compàs de <b>${ts}</b> agrupat <b>${gs}</b>, quants temps són <b>llargs</b> (de 3 ${un})?`,fields:[{label:'Temps llargs',ans:R(k)}],
   hints:['Els temps de 3 són llargs; els de 2, curts.','Compta els 3 de l\'agrupació.'],steps:[`${gs}: hi ha <b>${k}</b> grup${k===1?'':'s'} de 3.`],err:null}}
  if(ty==='classe'){const CL={'5/8':'2 + 3','7/8':'2 + 2 + 3','11/8':'3 + 3 + 3 + 2','5/4':'2 + 3','6/8':'3 + 3','9/8':'3 + 3 + 3','12/8':'3 + 3 + 3 + 3'},c=pick(Object.keys(CL)),am=['5/8','7/8','11/8','5/4'].includes(c);return{text:`El compàs de <b>${c}</b>, és d'amalgama o compost?`,fields:[lmF([am?'amalgama':'compost',am?'d\'amalgama':'compàs compost',am?'irregular':'compost'])],
   hints:['Prova de repartir el número de dalt en grups de 3.','Si tots els grups surten iguals, de 3, cada temps té 3 parts; si cal barrejar grups de 2 i de 3, els temps són desiguals.'],steps:[am?`${c.split('/')[0]} = ${CL[c]}: temps desiguals → <b>d'amalgama</b>.`:`${c.split('/')[0]} = ${CL[c]}: temps iguals de 3 → <b>compost</b>.`],err:v=>lmIn(v[0],[am?'compost':'amalgama'])?'lm_compost':null}}
  const all=LM_AMG[ts].map(g=>g.join('+'));return{text:`Escriu una agrupació possible d'un compàs de <b>${ts}</b> amb grups de 2 i de 3 (p. ex. 2+3).`,fields:[{label:'Agrupació',txt:lmV(all.flatMap(s=>[s,s.replace(/\+/g,' + '),s.replace(/\+/g,' ')])),wide:false}],
   hints:[`Els grups han de sumar ${a}.`,'Només pots usar grups de 2 i de 3.'],steps:[`Possibles: <b>${all.join('</b>, <b>')}</b>.`],err:null}}},

lm_veines:{mat:'musica',ab:'Vn',nom:'Tonalitats veïnes i modulació',
 teoria:['<b>Modular</b> és canviar de tonalitat dins una peça. Les modulacions més habituals són a les <b>tonalitats veïnes</b>: les que tenen una armadura igual o amb <b>una alteració de diferència</b>.','Les veïnes d\'una tonalitat major són: la seva <b>relativa menor</b>, la tonalitat de la <b>dominant</b> (grau V, un sostingut més o un bemoll menys), la de la <b>subdominant</b> (grau IV, un sostingut menys o un bemoll més) i les relatives d\'aquestes dues.','Exemple: <b>do major</b> → la menor, sol major, mi menor, fa major, re menor.','Una modulació sovint s\'anuncia amb una <b>alteració nova</b> que es repeteix: a do major, si apareix sovint el fa♯, la música passa a sol major (o mi menor).'],
 gen(lv){let n=lmNRange(lv);if(Math.abs(n)>5)n=Math.sign(n)*5;const M=lmMajor(n),ty=pick(lv?['dom','sub','alt','rel']:['dom','sub']);
  if(ty==='dom'||ty==='sub'){const d=ty==='dom'?1:-1,T=lmMajor(n+d),g=ty==='dom'?'V':'IV';
   return{text:`Quina és la tonalitat veïna de <b>${lmKey(M,'major')}</b> que es forma sobre el seu grau <b>${g}</b> (${ty==='dom'?'dominant':'subdominant'})?`,fields:[lmF(lmKeyTxt(T,'major',true),'Tonalitat')],
    hints:[`Busca el grau ${g} de l'escala de ${lmKey(M,'major')}.`,ty==='dom'?'Tindrà un sostingut més (o un bemoll menys).':'Tindrà un sostingut menys (o un bemoll més).'],
    steps:[`Grau ${g} de ${lmKey(M,'major')}: ${lmNom(T)}.`,`Tonalitat veïna: <b>${lmKey(T,'major')}</b> (${n+d?lmAltTxt(n+d):'cap alteració'}).`],err:v=>lmIn(v[0],lmKeyTxt(lmMajor(n-d),'major',true))?'lm_cercle_dir':null}}
  if(ty==='alt'){const d=pick([1,-1]),T=lmMajor(n+d),nw=n+d>n?(n+d>0?{l:LM_SH[n+d-1],a:1}:{l:LM_FL[-n-1],a:0}):(n>0?{l:LM_SH[n-1],a:0}:{l:LM_FL[-(n+d)-1],a:-1});
   return{text:`Una peça en <b>${lmKey(M,'major')}</b> comença a fer servir sovint la nota <b>${lmNom(nw)}${nw.a?'':' becaire (♮)'}</b>. A quina tonalitat major veïna modula?`,fields:[lmF(lmKeyTxt(T,'major',true),'Tonalitat')],
    hints:[`Mira l'armadura de ${lmKey(M,'major')} (${n?lmAltTxt(n):'cap alteració'}): aquesta nota l'afegeix o la treu?`,'Busca la tonalitat major amb aquesta armadura nova.'],
    steps:[`Armadura nova: ${n+d?lmAltTxt(n+d):'cap alteració'}.`,`És <b>${lmKey(T,'major')}</b>.`],err:null}}
  const m=lmMinor(n);return{text:`Quina tonalitat menor és veïna de <b>${lmKey(M,'major')}</b> i té la <b>mateixa armadura</b>?`,fields:[lmF(lmKeyTxt(m,'menor',true),'Tonalitat')],
   hints:['És la relativa menor.','3a menor per davall de la tònica.'],steps:[`La relativa menor de ${lmKey(M,'major')} és <b>${lmKey(m,'menor')}</b>.`],err:v=>lmIn(v[0],lmKeyTxt(M,'menor',true))?'lm_homonima':null}}}
});

/* ===================== unitats d'elementals (ordre progressiu) ===================== */
// [nom, temes, curs d'elementals on se sol treballar]
const LM_UNITS=[
 ['Claus de sol i de fa',['lm_clau_sol','lm_clau_fa'],1],
 ['Ritme: figures, puntets i lligadures',['lm_ritme'],1],
 ['Signes de repetició i termes',['lm_repeticio','lm_termes'],1],
 ['Compassos simples i compostos',['lm_compassos','lm_equivalencies'],2],
 ['Síncopes, contratemps i grups irregulars',['lm_sincopa','lm_grups'],2],
 ['Alteracions i enharmonia',['lm_enharmonia'],2],
 ['Intervals',['lm_int_classe','lm_int_construir'],2],
 ['Escales majors i armadures',['lm_armadura','lm_escala_major'],2],
 ['Tonalitats relatives i cercle de quintes',['lm_relatiu','lm_cercle'],3],
 ['Escales menors',['lm_menors'],3],
 ['Graus i acords',['lm_graus','lm_acords'],3],
 ['Formes musicals i història',['lm_formes'],3],
 ['Clau de do, inversió i transport',['lm_clau_do','lm_int_inversio','lm_transport'],4],
 ['Compassos d\'amalgama i tonalitats veïnes',['lm_amalgama','lm_veines'],4],
 ['Audició',['lm_audicio'],1]];
const LM_EEN=['','1r','2n','3r','4t'];
// UNITS.musica es calcula cada vegada segons el nivell triat. Les unitats amagades hi són amb el curs [0]
// (no es mostren), perquè els seus temes no surtin a «Altres temes».
{const PRI=UNITS.musica||[];
 Object.defineProperty(UNITS,'musica',{configurable:true,enumerable:true,set(v){},get(){const c=lmCfg(),showP=c.nivell!=='lm',showL=c.nivell!=='pri';
  return[...PRI.map(u=>showP?u:[u[0],u[1],[0]]),...LM_UNITS.map(([n,ks,ee])=>showL&&ee<=c.ee?[`${n} · ${LM_EEN[ee]} EE`,ks]:[n,ks,[0]]),...LM_EXTRA.flatMap(f=>f(c))]}})}

/* ===================== errors típics ===================== */
Object.assign(ERR,{
 lm_clau:{kid:'Compte amb la clau! Has llegit com si fos clau de sol. Mira quina nota marca la clau i compta a partir d\'ella.',par:'Llegeix en clau de fa o de do com si fos clau de sol'},
 lm_lligadura:{kid:'Has comptat només la primera nota. Amb la lligadura, la nota dura la suma de totes les figures lligades.',par:'No suma el valor de les notes lligades'},
 lm_repeticio:{kid:'Has llegit els compassos seguits, sense fer cas dels signes de repetició. Torna enrere on indiquen!',par:'No aplica els signes de repetició (barres, caselles, D.C.)'},
 lm_termes:{kid:'Aquest és un altre terme. Repassa: agògica (velocitat), dinàmica (intensitat) i articulació (com s\'ataca la nota).',par:'Confon termes d\'agògica, dinàmica o articulació'},
 lm_compost:{kid:'Compte: en els compassos compostos el número de dalt són parts, no temps. Divideix entre 3 i el temps és una figura amb puntet.',par:'Confon les parts i els temps dels compassos compostos'},
 lm_equiv:{kid:'Aquest compàs no té els mateixos temps. Recorda: 2/4 ↔ 6/8, 3/4 ↔ 9/8, 4/4 ↔ 12/8.',par:'No troba el compàs equivalent simple/compost'},
 lm_sincopa:{kid:'Ho has girat! Síncope: la nota continua sonant per damunt del temps fort. Contratemps: al temps fort hi ha un silenci.',par:'Confon la síncope i el contratemps'},
 lm_treset:{kid:'El treset no dura més: són 3 notes en el temps de 2. Un treset de corxeres dura 1 temps.',par:'Calcula malament la durada dels grups irregulars (treset)'},
 lm_enharm:{kid:'Una nota enharmònica ha de tenir un altre nom (una altra lletra), però sonar igual. Pensa en la tecla del piano.',par:'No troba les notes enharmòniques'},
 lm_semito_tipus:{kid:'Al revés: mateix nom (do-do♯) = cromàtic; nom diferent (do♯-re) = diatònic.',par:'Confon el semitò cromàtic i el diatònic'},
 lm_int_classe:{kid:'El nombre és bo, però no la classe. Compta els semitons amb calma i mira la taula (3a M = 4, 3a m = 3, 5a J = 7...).',par:'Encerta el nombre dels intervals però no la classe (major, menor, justa...)'},
 lm_inversio:{kid:'Per invertir: el nombre fa 9 (3a ↔ 6a) i la classe canvia (major ↔ menor, aug ↔ dim; la justa es queda justa).',par:'Inverteix malament els intervals'},
 lm_relativa:{kid:'Aquesta és la relativa! Et demanam la tonalitat de l\'altre mode (major o menor).',par:'Confon una tonalitat amb la seva relativa'},
 lm_armadura_regla:{kid:'Compte amb la regla: amb sostinguts, puja un semitò des del darrer; amb bemolls, és el penúltim bemoll.',par:'Diu el nom de la darrera alteració en lloc de la tonalitat'},
 lm_ordre_alt:{kid:'Repassa l\'ordre: sostinguts fa, do, sol, re, la, mi, si · bemolls si, mi, la, re, sol, do, fa.',par:'No sap l\'ordre de les alteracions de l\'armadura'},
 lm_homonima:{kid:'Aquesta és la homònima (mateixa tònica), no la relativa. La relativa té la mateixa armadura i és a una 3a menor.',par:'Confon la tonalitat relativa amb la homònima'},
 lm_relativa_dir:{kid:'Has anat cap al costat equivocat: la relativa menor és una 3a menor per DAVALL; la major, una 3a menor per DAMUNT.',par:'Calcula la relativa en la direcció equivocada'},
 lm_cercle_dir:{kid:'Has girat al revés pel cercle: una 5a amunt afegeix un sostingut; una 5a avall afegeix un bemoll.',par:'Recorre el cercle de quintes en sentit contrari'},
 lm_menor_tipus:{kid:'Compte amb el tipus d\'escala menor: harmònica = VII pujat; melòdica pujant = VI i VII pujats; natural = sense canvis.',par:'Confon les escales menors natural, harmònica i melòdica'},
 lm_grau:{kid:'Repassa els noms: I tònica, II supertònica, III mediant, IV subdominant, V dominant, VI superdominant, VII sensible.',par:'Confon els noms dels graus de l\'escala'},
 lm_acord:{kid:'Mira la 3a des de la nota de baix: 4 semitons = major; 3 semitons = menor.',par:'Confon els acords majors i menors'},
 lm_historia:{kid:'No és ben bé això. Llegeix la teoria del tema i fixa\'t en les dates i els noms.',par:'Confon períodes, compositors o formes musicals'}
});

/* ===================== material: nivell de Música i taules ===================== */
function lmNivell(){endSession();const c=lmCfg();
 const opt=(v,t,d)=>`<button class="${c.nivell===v?'':'sec'}" data-nv="${v}" style="display:block;width:100%;text-align:left;margin:0 0 10px;padding:14px 16px"><b style="font-size:18px">${t}</b><br><small style="font-weight:500">${d}</small></button>`;
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-musica)">Música</div><h2>Quin temari de música vols?</h2><p class="muted">Ho pots canviar sempre que vulguis. Només afecta aquest aparell.</p></div><button class="ghost" onclick="subject('musica')">← Tornar</button></div>
 <div class="card">${opt('pri','Música de Primària','El temari de Música de l\'escola (6è): el so, les notes, el ritme, els instruments...')}
 ${opt('tots','Primària + Llenguatge musical d\'elementals','Per a qui va al conservatori o a una escola de música integrada.')}
 ${opt('lm','Només Llenguatge musical d\'elementals','Claus, ritme, intervals, tonalitats, acords... fins a 4t d\'elementals.')}</div>
 <div class="card" id="eeBox" ${c.nivell==='pri'?'hidden':''}><h3 style="margin-top:0">Fins a quin curs d'elementals?</h3><p class="muted" style="margin-top:0">Es mostraran les unitats fins al curs triat (EE = ensenyaments elementals).</p>
 <div class="row">${[1,2,3,4].map(n=>`<button class="${c.ee===n?'':'sec'}" data-ee="${n}">${LM_EEN[n]} EE</button>`).join('')}</div></div>
 ${typeof IM_LIST!=='undefined'?`<div class="card" ${c.nivell==='pri'?'hidden':''}><h3 style="margin-top:0">El meu instrument</h3><p class="muted" style="margin-top:0">Tria el teu instrument per veure'n la làmina i els exercicis.</p>
 <div class="row">${[['','Tots / encara no en toc cap'],...IM_LIST].map(([k,v])=>`<button class="${c.ins===k?'':'sec'}" data-ins="${k}">${v}</button>`).join('')}</div></div>`:''}
 <div class="row"><button id="lmOk">Fet</button></div>`);
 document.querySelectorAll('[data-nv]').forEach(b=>b.onclick=()=>{lmSetCfg({nivell:b.dataset.nv});lmNivell()});
 document.querySelectorAll('[data-ee]').forEach(b=>b.onclick=()=>{lmSetCfg({ee:+b.dataset.ee});lmNivell()});
 document.querySelectorAll('[data-ins]').forEach(b=>b.onclick=()=>{lmSetCfg({ins:b.dataset.ins});lmNivell()});
 $('#lmOk').onclick=()=>subject('musica')}

function lmTaules(tab='cercle'){endSession();
 const T={cercle:'Cercle de quintes',int:'Intervals',fig:'Figures i compassos'};let body='';
 if(tab==='cercle')body=`<p class="muted" style="margin-top:0">Cada fila puja una 5a justa i afegeix un sostingut (o treu un bemoll).</p><div class="tablewrap"><table class="mini" style="width:100%"><tr><th>Alteracions</th><th>Major</th><th>Relativa menor</th><th>Armadura</th></tr>${[...Array(15).keys()].map(i=>i-7).map(n=>`<tr><td>${n?lmAltTxt(n):'cap'}</td><td><b>${lmKey(lmMajor(n),'major')}</b></td><td>${lmKey(lmMinor(n),'menor')}</td><td>${lmKsAcc(n).map(lmNomC).join(' ')||'—'}</td></tr>`).join('')}</table></div>
  <p style="margin-bottom:0"><b>Sostinguts</b>: fa, do, sol, re, la, mi, si · <b>Bemolls</b>: si, mi, la, re, sol, do, fa.<br>Major amb sostinguts: un semitò per damunt del darrer · amb bemolls: el penúltim.</p>`;
 if(tab==='int'){const ivs=[[2,'m'],[2,'M'],[3,'m'],[3,'M'],[4,'J'],[4,'A'],[5,'d'],[5,'J'],[6,'m'],[6,'M'],[7,'m'],[7,'M'],[8,'J']];
  body=`<div class="tablewrap"><table class="mini" style="width:100%"><tr><th>Interval</th><th>Semitons</th><th>Exemple des de do</th><th>Inversió</th></tr>${ivs.map(([k,q])=>`<tr><td><b>${lmIntName(k,q)}</b></td><td>${lmSemisOf(k,q)}</td><td>do – ${lmNomC(lmUp({l:0,a:0},k,q))}</td><td>${k<8?lmIntName(9-k,{M:'m',m:'M',J:'J',A:'d',d:'A'}[q]):'uníson'}</td></tr>`).join('')}</table></div>
  <p style="margin-bottom:0">Majors o menors: 2a, 3a, 6a, 7a · Justes: 4a, 5a, 8a · Un semitò més: augmentada · un menys que la menor o la justa: disminuïda.</p>`}
 if(tab==='fig')body=`<div class="tablewrap"><table class="mini" style="width:100%"><tr><th>Figura</th><th>Temps (negra = 1)</th><th>Amb puntet</th><th>En 6/8 (temps)</th></tr>${['r','b','n','c','s'].map(d=>`<tr><td><b>${MU_F[d].nom}</b></td><td>${muFmt(MU_F[d].v)}</td><td>${muFmt(muV(d,true))}</td><td>${fmtR(R(MU_F[d].v.n*2,MU_F[d].v.d*3))}</td></tr>`).join('')}</table></div>
  <div class="tablewrap" style="margin-top:12px"><table class="mini" style="width:100%"><tr><th>Simple</th><th>Temps</th><th>Unitat de temps</th><th>Compost equivalent</th><th>Unitat de temps</th></tr>${Object.entries(LM_EQ).map(([s,c])=>`<tr><td><b>${s}</b></td><td>${LM_TS[s].p}</td><td>${LM_TS[s].u[0]}</td><td><b>${c}</b></td><td>${LM_TS[c].u[0]}</td></tr>`).join('')}</table></div>
  <p style="margin-bottom:0">Treset: 3 notes en el temps de 2 · doset: 2 en el temps de 3 · cinquet: 5 en el temps de 4.</p>`;
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-musica)">Material · Llenguatge musical</div><h2>Taules de llenguatge musical</h2></div><button class="ghost" onclick="subject('musica')">← Tornar</button></div>
 <div class="tabs" style="margin:0 0 12px">${Object.entries(T).map(([k,v])=>`<button class="${k===tab?'on':''}" onclick="lmTaules('${k}')">${v}</button>`).join('')}</div><div class="card">${body}</div>`)}

// Les làmines d'elementals (lm:true) i les taules només surten si el nivell inclou elementals.
{let LB=LAMINES.musica||[];Object.defineProperty(LAMINES,'musica',{configurable:true,enumerable:true,get(){const c=lmCfg();return LB.filter(x=>(!x.lm||lmOn())&&!(x.ins&&c.ins&&x.ins!==c.ins))},set(v){LB=v}});
 window.lmAddLamina=x=>LB.push(x);
 const MB=MATERIAL.musica||[];Object.defineProperty(MATERIAL,'musica',{configurable:true,enumerable:true,set(v){},get(){const c=lmCfg();
  return[{obre:'lmNivell()',nom:'Nivell de Música: '+(c.nivell==='pri'?'Primària':c.nivell==='tots'?'Primària + elementals':'Llenguatge musical d\'elementals'),desc:c.nivell==='pri'?'Vas al conservatori? Toca aquí per afegir el Llenguatge musical d\'elementals':`Fins a ${LM_EEN[c.ee]} d'elementals · toca per canviar-ho`,ic:'music'},
   ...MB,...(c.nivell!=='pri'?[{obre:'lmTaules()',nom:'Taules de llenguatge musical',desc:'Cercle de quintes, intervals, figures i compassos',ic:'book'}]:[])]}})}
