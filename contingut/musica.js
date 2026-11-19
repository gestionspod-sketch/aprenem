/* Aprenem - contingut de MÚSICA (llenguatge musical) · temari de 6è de Primària
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.

   Fonts del temari:
   - Decret 31/2022, d'1 d'agost, currículum de l'educació primària a les Illes Balears (BOIB), àrea d'Educació
     Artística, 3r cicle (modificat pel Decret 18/2025). Sabers bàsics de música: el so i les seves qualitats;
     la veu i els instruments (classificació, agrupacions); llenguatge musical (pentagrama, clau de sol, notes,
     figures i silencis, compassos simples, alteracions, escala, intervals); tempo i dinàmica; forma musical;
     patrimoni musical propi de les Illes Balears.
   - Reial decret 157/2022 (ensenyaments mínims de Primària), annex II, Educació Artística, 3r cicle.
   - Estructura habitual dels llibres de Música de 6è (unitats de llenguatge musical + audició + instruments +
     cultura musical) de les editorials més usades a les Balears (Santillana, Vicens Vives, Anaya, Cruïlla).
   Temes amb mat:'musica' i curs:[6]. Unitats a UNITS.musica. Material: teclat i pentagrama (muTeclat).
   La làmina de l'orquestra és a contingut/lamines/orquestra.js. */

/* ===================== utilitats de música ===================== */
const MU_N=['do','re','mi','fa','sol','la','si'];
// p = posició a la pauta: 0 = do central (davall el pentagrama), 2 = mi (1a línia) ... 10 = fa (5a línia)
const muNom=p=>MU_N[((p%7)+7)%7];
const muY=p=>78-(p-2)*6;
const MU_ORDF=['','primera','segona','tercera','quarta','cinquena'],MU_ORDM=['','primer','segon','tercer','quart','cinquè'];
const MU_COL='#1F2A44',MU_HI='#E8590C';
// respostes acceptades per a un nom de nota (amb o sense alteració)
function muNoteTxt(b,acc){if(!acc)return[b];
 if(acc===1)return[`${b} sostingut`,`${b}#`,`${b} #`,`${b}sostingut`];
 if(acc===-1)return[`${b} bemoll`,`${b}b`,`${b} b`,`${b}bemoll`];
 return[`${b} becaire`,`${b} natural`,b]}
const muIs=(v,list)=>list.map(fold).includes(fold(v));
const muA=(arr,lab='Resposta')=>({label:lab,txt:arr,loose:true,wide:true});
const muCap=s=>s[0].toUpperCase()+s.slice(1);

/* ---------- dibuix del pentagrama (SVG) ---------- */
const MU_CLEF=`<g transform="translate(-6 6) scale(1.2)" fill="none" stroke="${MU_COL}" stroke-width="2.3" stroke-linecap="round"><path d="M30 50 C26 50 25 45 29 44 C34 43 37 48 35 53 C33 58 26 60 22 56 C17 51 19 43 25 38 L33 31 C38 26 39 18 37 12 C36 8 33 8 31 11 C28 16 28 22 29 30 L33 66 C34 72 30 75 27 74"/><circle cx="26.5" cy="71.5" r="3" fill="${MU_COL}" stroke="none"/></g>`;
function muAcc(x,y,a,c){
 if(a===1)return`<g stroke="${c}" stroke-linecap="round"><path d="M${x-20} ${y-12}V${y+11}M${x-14} ${y-13}V${y+10}" stroke-width="1.6"/><path d="M${x-24} ${y-2}L${x-10} ${y-6}M${x-24} ${y+6}L${x-10} ${y+2}" stroke-width="3"/></g>`;
 if(a===-1)return`<path d="M${x-19} ${y-17}V${y+5}C${x-10} ${y-1} ${x-11} ${y-8} ${x-19} ${y-3}" fill="none" stroke="${c}" stroke-width="2"/>`;
 return`<path d="M${x-21} ${y-13}V${y+5}L${x-14} ${y+3}M${x-14} ${y+13}V${y-5}L${x-21} ${y-3}" fill="none" stroke="${c}" stroke-width="2"/>`}
function muNoteSVG(x,o){const p=o.n,y=muY(p),c=o.hi?MU_HI:MU_COL,d=o.d||'n',fill=d!=='r'&&d!=='b',up=p<6;let s='';
 for(let q=0;q>=p;q-=2)s+=`<path d="M${x-12} ${muY(q)}h24" stroke="${MU_COL}" stroke-width="1.5"/>`;
 for(let q=12;q<=p;q+=2)s+=`<path d="M${x-12} ${muY(q)}h24" stroke="${MU_COL}" stroke-width="1.5"/>`;
 s+=`<ellipse cx="${x}" cy="${y}" rx="7.2" ry="5.2" transform="rotate(-20 ${x} ${y})" fill="${fill?c:'#fff'}" stroke="${c}" stroke-width="2.2"/>`;
 if(d!=='r'){const sx=up?x+6.4:x-6.4,sy=up?y-38:y+38;s+=`<path d="M${sx} ${up?y-1:y+1}V${sy}" stroke="${c}" stroke-width="2"/>`;
  const fl=k=>{const yy=up?sy+k*9:sy-k*9;return up?`<path d="M${sx} ${yy}C${sx+2} ${yy+10} ${sx+15} ${yy+12} ${sx+10} ${yy+27}C${sx+11} ${yy+17} ${sx+5} ${yy+13} ${sx} ${yy+11}Z" fill="${c}"/>`:`<path d="M${sx} ${yy}C${sx+2} ${yy-10} ${sx+15} ${yy-12} ${sx+10} ${yy-27}C${sx+11} ${yy-17} ${sx+5} ${yy-13} ${sx} ${yy-11}Z" fill="${c}"/>`};
  if(d==='c'||d==='s')s+=fl(0);if(d==='s')s+=fl(1)}
 if(o.dot)s+=`<circle cx="${x+13}" cy="${p%2===0?y-5:y}" r="2.6" fill="${c}"/>`;
 if(o.acc)s+=muAcc(x,y,o.acc,c);
 return s}
function muRestSVG(x,d,c){c=c||MU_COL;
 if(d==='r')return`<rect x="${x-7}" y="42" width="14" height="6" fill="${c}"/>`;
 if(d==='b')return`<rect x="${x-7}" y="48" width="14" height="6" fill="${c}"/>`;
 if(d==='n')return`<path d="M${x-3} 36l7 9-6 7 7 9c-6-3-10 0-5 7" fill="none" stroke="${c}" stroke-width="3.2" stroke-linejoin="round"/>`;
 const dot=(cx,cy)=>`<circle cx="${cx}" cy="${cy}" r="3.2" fill="${c}"/>`;
 if(d==='c')return dot(x-3,50)+`<path d="M${x-3} 52Q${x+2} 53 ${x+6} 47L${x-1} 68" fill="none" stroke="${c}" stroke-width="2"/>`;
 return dot(x-1,48)+dot(x-4,59)+`<path d="M${x-1} 50Q${x+4} 51 ${x+8} 45L${x-3} 76M${x-4} 61Q${x+1} 62 ${x+5} 56" fill="none" stroke="${c}" stroke-width="2"/>`}
// items: {n:p,d,dot,acc,hi,lab} nota · {r:d,dot,hi,lab} silenci · {bar:1} · {end:1} · {gap:px}
function muStaff(items,o={}){const clef=o.clef!==false;let x=clef?50:14,body='',labs='';
 if(o.ts){const[a,b]=o.ts.split('/');body+=`<g font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="27" fill="${MU_COL}" text-anchor="middle"><text x="${x+8}" y="52">${a}</text><text x="${x+8}" y="76">${b}</text></g>`;x+=34}
 else x+=8;
 for(const it of items){
  if(it.gap){x+=it.gap;continue}
  if(it.bar){x+=4;body+=`<path d="M${x} 30V78" stroke="${MU_COL}" stroke-width="1.6"/>`;x+=20;continue}
  if(it.end){x+=4;body+=`<path d="M${x} 30V78" stroke="${MU_COL}" stroke-width="1.6"/><path d="M${x+6} 30V78" stroke="${MU_COL}" stroke-width="4.5"/>`;x+=12;continue}
  if(it.acc)x+=14;
  if(it.r)body+=muRestSVG(x+4,it.r,it.hi?MU_HI:null)+(it.dot?`<circle cx="${x+17}" cy="48" r="2.6" fill="${it.hi?MU_HI:MU_COL}"/>`:'');
  else if(it.q)body+=`<text x="${x}" y="${muY(it.n)+9}" text-anchor="middle" font-size="26" font-weight="800" fill="${MU_HI}">?</text>`;
  else body+=muNoteSVG(x,it);
  if(it.lab!=null)labs+=`<text x="${x}" y="124" text-anchor="middle" font-size="13" font-weight="700" fill="${it.hi?MU_HI:'#475569'}">${it.lab}</text>`;
  x+=(it.w||40)+(it.dot?6:0)}
 const W=Math.max(x+10,o.minW||0),H=labs?132:116;
 const lines=[2,4,6,8,10].map(p=>`<path d="M6 ${muY(p)}H${W-4}" stroke="${MU_COL}" stroke-width="1.3"/>`).join('');
 return`<svg class="mu-st" viewBox="0 -4 ${W} ${H}" width="${Math.round(W*1.7)}" style="max-width:100%;height:auto;display:block;margin:0 auto" role="img" aria-label="${o.aria||'Pentagrama'}">${lines}${clef?MU_CLEF:''}${body}${labs}</svg>`}
// una figura o silenci sol, sense pentagrama
function muFigSVG(d,{rest=false,dot=false}={}){return muStaff([rest?{r:d,dot}:{n:d==='r'||d==='b'?5:4,d,dot}],{clef:false,minW:90})}

/* ---------- so (Web Audio) ---------- */
let MU_AC=null;
function muAC(){try{MU_AC=MU_AC||new(window.AudioContext||window.webkitAudioContext)();if(MU_AC.state==='suspended')MU_AC.resume()}catch(e){MU_AC=null}return MU_AC}
const MU_SEMI=[0,2,4,5,7,9,11];
const muFreq=(p,acc=0)=>{const o=Math.floor(p/7),s=MU_SEMI[((p%7)+7)%7]+12*o+acc;return 261.63*2**(s/12)};
function muTone(ac,t,f,dur,vol=.28){const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=f;
 g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.02);g.gain.setValueAtTime(vol,t+Math.max(.03,dur-.08));g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
 o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+dur+.05)}
function muClick(ac,t,strong){const o=ac.createOscillator(),g=ac.createGain();o.type='square';o.frequency.value=strong?1600:1100;
 g.gain.setValueAtTime(strong?.18:.11,t);g.gain.exponentialRampToValueAtTime(0.0001,t+.05);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+.06)}
const MU_SND={};let MU_SID=0;
// ev: [{at:segons, f:Hz, dur, vol} | {at, click:true, strong}]
const muSndBtn=(ev,label='Escolta')=>{const id=++MU_SID;MU_SND[id]=ev;return`<button type="button" class="sec" style="font-size:18px;margin-top:8px" onclick="muPlay(${id})">▶ ${label}</button>`};
function muPlay(id){const ac=muAC(),ev=MU_SND[id];if(!ac||!ev)return;const t0=ac.currentTime+.08;
 for(const e of ev){if(e.click)muClick(ac,t0+e.at,e.strong);else muTone(ac,t0+e.at,e.f,e.dur,e.vol)}}

/* ---------- banc de preguntes de resposta curta ---------- */
// [pregunta, 'resposta|sinònim', pista, explicació, 'confusió|típica', nivell]
const muMk=a=>a.map(([q,ans,h,ex,c,lv])=>({q,a:ans.split('|'),h,ex,c:(c||'').split('|').filter(Boolean),lv:lv||0}));
function muBankP(it,errT){const a=it.a[0],w=a.split(' ').length;
 return{text:it.q,fields:[muA(it.a)],
  hints:[it.h,/^\d/.test(a)?'És un nombre.':`Comença per «${a[0].toUpperCase()}»${w>1?` i té ${w} paraules`:` i té ${[...a.replace(/[·' ]/g,'')].length} lletres`}.`],
  steps:[it.ex,`Resposta: <b>${a}</b>.`],err:v=>errT&&it.c.length&&muIs(v[0],it.c)?errT:null}}
const muFromBank=(bank,errT,lv)=>muBankP(pick(bank.filter(q=>q.lv<=lv)),errT);

/* ---------- figures, durades i compassos ---------- */
const MU_F={r:{nom:'rodona',v:R(4)},b:{nom:'blanca',v:R(2)},n:{nom:'negra',v:R(1)},c:{nom:'corxera',v:R(1,2)},s:{nom:'semicorxera',v:R(1,4)}};
const muV=(d,dot)=>dot?R(MU_F[d].v.n*3,MU_F[d].v.d*2):MU_F[d].v;
const muAdd=(a,b)=>R(a.n*b.d+b.n*a.d,a.d*b.d);
const muSub=(a,b)=>R(a.n*b.d-b.n*a.d,a.d*b.d);
const muLt=(a,b)=>a.n*b.d<b.n*a.d;
const muFmt=r=>r.d===1?`${r.n}`:r.n===1&&r.d===2?'½':r.n===1&&r.d===4?'¼':r.n===3&&r.d===2?'1 i ½':r.n===3&&r.d===4?'¾':fmtR(r);
const muFigName=(d,dot)=>MU_F[d].nom+(dot?' amb puntet':'');
// figures (o silencis) que valen exactament r
function muFigFor(r,rest){const out=[];for(const d in MU_F)for(const dot of[false,true]){if(req(muV(d,dot),r)){const n=muFigName(d,dot);out.push(rest?`silenci de ${n}`:n);if(!rest&&dot)out.push(MU_F[d].nom+' amb punt')}}return out}
// omple 'total' temps amb figures triades a l'atzar
function muFill(total,opts){const out=[];let rem=total,g=0;
 while(rem.n>0&&g++<40){const ok=opts.filter(o=>!muLt(rem,muV(o.d,o.dot)));if(!ok.length)break;const o=pick(ok);out.push({...o});rem=muSub(rem,muV(o.d,o.dot))}
 return rem.n===0?out:muFill(total,opts)}
const muNotesOf=(fs,base)=>fs.map(f=>f.rest?{r:f.d,dot:f.dot}:{n:base??rnd(3,9),d:f.d,dot:f.dot});
const muSum=fs=>fs.reduce((a,f)=>muAdd(a,muV(f.d,f.dot)),R(0));
const muOpts=(lv,rest)=>{const o=[{d:'b'},{d:'n'},{d:'n'}];if(lv>=1)o.push({d:'c'},{d:'c'});if(lv>=2)o.push({d:'n',dot:true},{d:'b',dot:true});
 if(rest){o.push({d:'n',rest:true});if(lv>=1)o.push({d:'b',rest:true})}return o};
const muTs=['2/4','3/4','4/4'];
const muTsTxt=t=>{const[a]=t.split('/');return[t,`${a} per 4`,`${['','','dos','tres','quatre'][a]} per quatre`,`${a}x4`,`${a} 4`]};

/* ---------- intervals, escala i alteracions ---------- */
const MU_INT=['','uníson','segona','tercera','quarta','quinta','sexta','sèptima','octava'];
const muIntTxt=k=>[MU_INT[k],`${k}a`,`${k}`,`${k}ª`,`una ${MU_INT[k]}`,`${k} a`].concat(k===6?['sisena']:k===7?['setena','septima']:[]);
const MU_CHROM=[['do'],['do#','reb'],['re'],['re#','mib'],['mi'],['fa'],['fa#','solb'],['sol'],['sol#','lab'],['la'],['la#','sib'],['si']];
const muChromTxt=i=>MU_CHROM[((i%12)+12)%12].flatMap(n=>/#$/.test(n)?muNoteTxt(n.slice(0,-1),1):/b$/.test(n)&&n.length>2?muNoteTxt(n.slice(0,-1),-1):[n]);
const MU_SEMIS_DO=[2,2,1,2,2,2,1]; // T T S T T T S
const muSemis=(i,j)=>{let s=0;for(let k=i;k<j;k++)s+=MU_SEMIS_DO[k%7];return s};
const MU_ROM=['I','II','III','IV','V','VI','VII','VIII'];

/* ---------- tempo i dinàmica ---------- */
const MU_TEMPO=[ // [terme, què vol dir (respostes acceptades), pregunta, nivell]
 ['Largo','molt lent|molt a poc a poc|molt lento|molt lenta','molt lent, solemne',1],
 ['Lento','lent|a poc a poc|lenta|poc a poc','lent'],
 ['Adagio','lent|a poc a poc|lenta|poc a poc|tranquil|amb calma|calmat','a poc a poc, amb calma',1],
 ['Andante','caminant|al pas|al pas d\'una persona|tranquil|pas tranquil|anant|com caminant','al pas d\'una persona que camina'],
 ['Moderato','moderat|ni rapid ni lent|ni lent ni rapid|moderada|normal','moderat, ni ràpid ni lent'],
 ['Allegro','rapid|alegre|viu|de pressa|rapida|deprisa','ràpid i alegre'],
 ['Presto','molt rapid|molt de pressa|molt rapida|rapidissim','molt ràpid'],
 ['Accelerando','accelerant|cada vegada mes rapid|accelerar|mes rapid cada vegada|cada cop mes rapid','cada vegada més ràpid',1],
 ['Ritardando','retardant|cada vegada mes lent|frenant|alentint|mes lent cada vegada|cada cop mes lent|alentir','cada vegada més lent',1]];
const MU_DIN=[ // [signe, nom, significats, nivell, contrari]
 ['pp','pianissimo','molt fluix|molt suau|molt piano|fluixissim',0,'ff'],
 ['p','piano','fluix|suau|fluixet',0,'f'],
 ['mp','mezzopiano','mig fluix|mitjanament fluix|una mica fluix|mezzo piano|mig piano',1,'mf'],
 ['mf','mezzoforte','mig fort|mitjanament fort|una mica fort|mezzo forte|mig forte',1,'mp'],
 ['f','forte','fort',0,'p'],
 ['ff','fortissimo','molt fort|fortissim',0,'pp'],
 ['cresc.','crescendo','cada vegada mes fort|augmentant|creixent|augmentar la intensitat|mes fort cada vegada|cada cop mes fort|crescendo',1,'dim.'],
 ['dim.','diminuendo','cada vegada mes fluix|disminuint|minvant|mes fluix cada vegada|cada cop mes fluix|decrescendo|diminuendo',1,'cresc.']];
const muDinRow=r=>({s:r[0],n:r[1],m:r[2].split('|'),lv:r[3],c:r[4]});
function muDinSVG(s){if(s==='cresc.')return`<svg viewBox="0 0 160 60" width="160" style="max-width:100%;height:auto;display:block;margin:0 auto"><path d="M150 12L12 30L150 48" fill="none" stroke="${MU_COL}" stroke-width="3"/></svg>`;
 if(s==='dim.')return`<svg viewBox="0 0 160 60" width="160" style="max-width:100%;height:auto;display:block;margin:0 auto"><path d="M10 12L148 30L10 48" fill="none" stroke="${MU_COL}" stroke-width="3"/></svg>`;
 return`<svg viewBox="0 0 160 70" width="160" style="max-width:100%;height:auto;display:block;margin:0 auto"><text x="80" y="52" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-style="italic" font-weight="700" font-size="50" fill="${MU_COL}">${s}</text></svg>`}

/* ---------- instruments ---------- */
const MU_FAM={corda:'corda',vent:'vent',percussio:'percussió'};
const MU_SUB={fregada:['corda','fregada'],pincada:['corda','pinçada'],percudida:['corda','percudida'],fusta:['vent','fusta'],metall:['vent','metall'],afinada:['percussio','afinada'],noafinada:['percussio','no afinada']};
const muSubTxt=s=>{const[f,n]=MU_SUB[s],F=MU_FAM[f];
 if(f==='corda')return[`corda ${n}`,`de corda ${n}`,`instrument de corda ${n}`];
 if(f==='vent')return[`vent ${n}`,`vent de ${n}`,`de vent ${n}`,`vent-${n}`];
 return s==='afinada'?['percussió afinada','percussió de so determinat','de percussió afinada','percussió determinada','afinada']:['percussió no afinada','percussió de so indeterminat','de percussió no afinada','percussió indeterminada','no afinada']};
const muFamTxt=s=>{const f=MU_SUB[s][0];return[MU_FAM[f],`de ${MU_FAM[f]}`,`instruments de ${MU_FAM[f]}`,`instrument de ${MU_FAM[f]}`,...muSubTxt(s)]};
const MU_INS=[ // [nom (amb article), subfamília, nivell, com sona]
 ['el violí','fregada',0,'les cordes vibren quan les fregues amb l\'arc'],['la viola','fregada',1,'és una mica més gran i greu que el violí; es toca amb arc'],['el violoncel','fregada',0,'es toca assegut, amb l\'arc, i recolzat a terra'],['el contrabaix','fregada',0,'és el més gran i greu de la corda fregada'],
 ['la guitarra','pincada',0,'les cordes es pincen amb els dits'],['l\'arpa','pincada',0,'té moltes cordes que es pincen amb els dits'],['la bandúrria','pincada',2,'les cordes es pincen amb una pua'],['el llaüt','pincada',2,'les cordes es pincen amb una pua'],
 ['el piano','percudida',1,'en tocar una tecla, un martellet colpeja les cordes'],
 ['la flauta dolça','fusta',0,'bufam per un bisell'],['la flauta travessera','fusta',1,'tot i ser de metall, el so es produeix bufant per un bisell, com les flautes de fusta'],['el clarinet','fusta',0,'té una canya simple'],['l\'oboè','fusta',1,'té una canya doble'],['el fagot','fusta',1,'té una canya doble i és el més greu de la fusta'],['el saxòfon','fusta',2,'tot i ser de metall, té una canya com el clarinet'],
 ['la trompeta','metall',0,'els llavis vibren dins una boquilla'],['el trombó','metall',0,'té una vara que s\'allarga i s\'escurça'],['la trompa','metall',1,'té el tub enrotllat en espiral'],['la tuba','metall',1,'és la més greu del metall'],
 ['el xilòfon','afinada',0,'té làmines de fusta que fan notes diferents'],['el metal·lòfon','afinada',1,'té làmines de metall que fan notes diferents'],['els timbals','afinada',2,'són tambors grans que es poden afinar en una nota'],
 ['el bombo','noafinada',0,'és un tambor gran que no fa una nota concreta'],['la caixa','noafinada',0,'és un tambor petit amb bordons'],['els plats','noafinada',0,'són dos discs de metall que es piquen'],['el triangle','noafinada',0,'és una barra de metall doblegada'],['les castanyoles','noafinada',0,'són dues peces de fusta que es piquen'],['la pandereta','noafinada',0,'té pell i sonalls'],['les maraques','noafinada',1,'se sacsegen']];
const muInsNom=n=>n.replace(/^(el|la|els|les) /,'').replace(/^l'/,'');

/* ===================== temes ===================== */
Object.assign(SK,{

/* ---------- 1. El so ---------- */
mu_qualitats:{mat:'musica',curs:[6],ab:'Qs',nom:'Les qualitats del so',
 teoria:['El <b>so</b> és una vibració que viatja per l\'aire fins a les nostres orelles. El <b>silenci</b> és l\'absència de so, i també forma part de la música.','El so té quatre <b>qualitats</b>: l\'<b>altura</b> (agut o greu), la <b>durada</b> (llarg o curt), la <b>intensitat</b> (fort o fluix) i el <b>timbre</b> (el «color» que ens permet saber qui o què sona).','A la partitura, l\'altura s\'escriu amb les <b>notes</b>, la durada amb les <b>figures</b>, la intensitat amb els signes de <b>dinàmica</b> (p, f...) i el timbre amb el nom de l\'<b>instrument</b> o la veu.'],
 bank:muMk([
  ['Quina qualitat del so ens diu si un so és agut o greu?','altura|l\'altura|to','Pensa en una escala que puja i baixa.','L\'<b>altura</b> diu si un so és agut (com un xiulet) o greu (com un tro).','intensitat|durada|timbre'],
  ['Quina qualitat del so ens diu si un so és fort o fluix?','intensitat|volum','Té a veure amb el volum.','La <b>intensitat</b> diu si un so és fort o fluix.','altura|durada|timbre'],
  ['Quina qualitat del so ens diu si un so és llarg o curt?','durada|temps','Pensa en el temps que sona.','La <b>durada</b> és el temps que dura un so.','altura|intensitat|timbre'],
  ['Quina qualitat del so ens permet distingir una flauta d\'un violí que toquen la mateixa nota?','timbre|el timbre','És com el «color» del so.','El <b>timbre</b> ens permet reconèixer l\'instrument o la persona que sona.','altura|intensitat|durada'],
  ['Com diem d\'un so que té molta altura, com el d\'un xiulet?','agut|aguda','És el contrari de greu.','Un so amb molta altura és <b>agut</b>.','greu'],
  ['Com diem d\'un so de poca altura, com el d\'un tro o un contrabaix?','greu','És el contrari d\'agut.','Un so de poca altura és <b>greu</b>.','agut|aguda'],
  ['Com es diu l\'absència de so?','silenci','A la partitura també s\'escriu amb uns signes especials.','El <b>silenci</b> és l\'absència de so. A la partitura s\'escriu amb els signes de silenci.'],
  ['Amb quina figura s\'escriu la durada a la partitura: amb notes o amb figures?','figures|amb figures|figura','Les notes indiquen una altra qualitat.','La durada s\'escriu amb les <b>figures</b> (rodona, blanca, negra...). Les <b>notes</b> (do, re, mi...) indiquen l\'altura.','notes|nota'],
  ['Què es posa a vibrar perquè el so arribi a les nostres orelles?','aire|l\'aire','Ho respiram.','El so és una vibració que viatja per l\'<b>aire</b>.','',1],
  ['En quina unitat es mesura la intensitat del so?','decibels|decibel|db','Comença per «deci...».','La intensitat es mesura en <b>decibels</b> (dB). Els sons de més de 85 dB poden fer mal a les orelles.','',1],
  ['Com es diu el soroll molest que hi ha en alguns llocs, com una ciutat amb molt de trànsit?','contaminació acústica|contaminacio acustica','És una mena de contaminació.','La <b>contaminació acústica</b> és l\'excés de soroll; és dolenta per a la salut.','',2]]),
 gen(lv){return muFromBank(this.bank,'mu_qualitats',lv)}},

mu_escolta:{mat:'musica',curs:[6],ab:'Es',nom:'Escoltar: altura, durada i intensitat',
 teoria:['Ara entrenarem l\'<b>orella</b>. Pitja <b>▶ Escolta</b> tantes vegades com vulguis abans de respondre.','Per saber quin so és més <b>agut</b>, pensa en una escala: els sons aguts són «a dalt» i els greus «a baix».','Per saber quant <b>dura</b> un so, compta els clics del <b>pols</b> (com el rellotge) mentre sona: 1 temps = negra, 2 temps = blanca, 3 temps = blanca amb puntet, 4 temps = rodona.'],
 gen(lv){const t=pick(lv?['agut','agut','compta','durada','durada','fort']:['agut','agut','compta','durada']);
  const gap=lv>1?.75:1.05,len=.7;
  if(t==='agut'){const n=lv?4:3,minD=[4,2,1][lv];let s;
   for(let g=0;g<50;g++){s=Array.from({length:n},()=>rnd(0,14));const so=[...s].sort((a,b)=>b-a);if(so[0]-so[1]>=minD)break}
   const hi=s.indexOf(Math.max(...s))+1,ev=s.map((x,i)=>({at:i*gap,f:261.63*2**(x/12),dur:len}));
   return{text:`Escoltaràs <b>${n} sons</b>, un darrere l'altre. Quin és el <b>més agut</b>? Escriu-ne el número (de l'1 al ${n}).<br>${muSndBtn(ev)}`,fields:[{label:'Número del so',ans:R(hi)}],
    hints:['Escolta-ho una altra vegada i compta en veu baixa: 1, 2, 3...','El so més agut és el que sona més «prim» i «a dalt», com un ocell.'],
    steps:['Compta els sons mentre sonen: 1, 2, 3...',`El més agut era el <b>${hi}</b>. Torna-ho a escoltar fixant-t'hi.`]}}
  if(t==='compta'){const n=rnd(3,lv>1?9:lv?8:6),d=lv>1?.32:lv?.45:.6;let ev=[],p=rnd(0,7);
   for(let i=0;i<n;i++){ev.push({at:i*d*1.15,f:muFreq(p),dur:d});if(!(lv>1&&Math.random()<.35))p=Math.max(0,Math.min(12,p+pick([-2,-1,1,2])))}
   return{text:`Quants <b>sons</b> has sentit?${lv>1?' Compte: alguns sons es repeteixen.':''}<br>${muSndBtn(ev)}`,fields:[{label:'Nombre de sons',ans:R(n)}],
    hints:['Escolta-ho una altra vegada i aixeca un dit per cada so.','Si dos sons seguits són iguals, també compten com a dos.'],
    steps:['Compta amb els dits mentre sona.',`N'hi havia <b>${n}</b>.`]}}
  if(t==='durada'){const d=rnd(1,4),beat=lv>1?.5:.6,ev=[];for(let i=0;i<6;i++)ev.push({at:i*beat,click:true,strong:i===0});
   ev.push({at:beat,f:muFreq(rnd(2,8)),dur:d*beat-.04});
   const fig=['','negra','blanca','blanca amb puntet','rodona'][d],fields=[{label:'Temps',ans:R(d)}];
   if(lv)fields.push({label:'Quina figura és?',txt:muFigFor(R(d)),loose:true});
   return{text:`Escolta el pols (clics) i el so llarg. Quants <b>temps</b> dura el so?${lv?' I quina <b>figura</b> el representa?':''}<br>${muSndBtn(ev)}`,fields,
    hints:['El so comença al segon clic. Compta els clics mentre sona: 1, 2...','1 temps = negra · 2 temps = blanca · 3 temps = blanca amb puntet · 4 temps = rodona.'],
    steps:['El so comença al segon clic del pols.',`Mentre sona passen <b>${d}</b> clics: dura ${d} ${d===1?'temps':'temps'}.`,lv?`Una figura de ${d} temps és la <b>${fig}</b>.`:'Escolta-ho una altra vegada comptant.']}}
  const vols=[.05,.14,.32,.6].slice(0,3).sort(()=>Math.random()-.5),hi=vols.indexOf(Math.max(...vols))+1,f=muFreq(rnd(2,7));
  return{text:'Escoltaràs <b>3 sons</b> amb la mateixa nota. Quin és el <b>més fort</b>? Escriu-ne el número.<br>'+muSndBtn(vols.map((v,i)=>({at:i*1.05,f,dur:.7,vol:v}))),fields:[{label:'Número del so',ans:R(hi)}],
   hints:['Puja una mica el volum de l\'aparell i torna-ho a escoltar.','La intensitat és la qualitat que diu si un so és fort o fluix.'],steps:['Compara la força de cada so.',`El més fort era el <b>${hi}</b>.`]}}},

/* ---------- 2. El pentagrama i les notes ---------- */
mu_notes:{mat:'musica',curs:[6],ab:'Nt',nom:'Les notes al pentagrama',
 teoria:['La música s\'escriu al <b>pentagrama</b>: cinc línies i quatre espais. Es compten <b>de baix a dalt</b>.','La <b>clau de sol</b> comença a la segona línia i ens diu que en aquesta línia hi ha la nota <b>sol</b>. Les set notes són: <b>do, re, mi, fa, sol, la, si</b>.','Línies (de baix a dalt): <b>mi, sol, si, re, fa</b>. Espais: <b>fa, la, do, mi</b>.','Les notes més greus o més agudes s\'escriuen amb <b>línies addicionals</b>: el <b>do</b> greu té una línia addicional per davall, i el <b>la</b> agut, una per damunt.'],
 fig:()=>muStaff([0,1,2,3,4,5,6,7,8,9,10,11,12].map(p=>({n:p,d:'r',lab:muNom(p),w:34})),{aria:'Notes al pentagrama en clau de sol'}),
 where(p){if(p>=2&&p<=10)return p%2===0?`És a la <b>${MU_ORDF[(p-2)/2+1]} línia</b> (comptant des de baix).`:`És al <b>${MU_ORDM[(p-1)/2]} espai</b> (comptant des de baix).`;
  return({'-2':'És a la segona línia addicional de davall.','-1':'Penja de la línia addicional de davall.','0':'Està travessada per una línia addicional de davall del pentagrama.','1':'Està just davall la primera línia.','11':'Està just damunt la cinquena línia.','12':'Està travessada per una línia addicional de damunt.','13':'Està damunt la línia addicional de dalt.','14':'És a la segona línia addicional de damunt.'})[p]},
 gen(lv){const lo=[1,0,-2][lv],hi=[11,12,14][lv],n=lv===0?(Math.random()<.7?1:2):lv===1?3:4,ps=[];
  while(ps.length<n){const p=rnd(lo,hi);if(ps[ps.length-1]!==p)ps.push(p)}
  const near=(p,x)=>muIs(x,[muNom(p-1),muNom(p+1)])&&!muIs(x,[muNom(p)]);
  return{text:n===1?'Quina nota és?':`Escriu el nom de cada nota, d'esquerra a dreta.`,fig:muStaff(ps.map((p,i)=>({n:p,d:'n',hi:n===1,lab:n>1?i+1:null}))),
   fields:ps.map((p,i)=>({label:n>1?`Nota ${i+1}`:'Nota',txt:[muNom(p)]})),
   hints:['Línies (de baix a dalt): mi, sol, si, re, fa. Espais: fa, la, do, mi.',n===1?this.where(ps[0]).replace(/<\/?b>/g,''):'Troba primer la nota de la segona línia (sol, la clau la marca) i compta a partir d\'ella.'],
   steps:[...ps.map((p,i)=>`${n>1?`Nota ${i+1}: `:''}${this.where(p)} → <b>${muNom(p)}</b>.`),'Truc: la clau de sol marca on és el <b>sol</b> (segona línia). A partir d\'aquí, puja o baixa nota a nota.'],
   err:v=>ps.some((p,i)=>near(p,v[i]))?'mu_nota_veina':null}}},

mu_ordre:{mat:'musica',curs:[6],ab:'On',nom:'L\'ordre de les notes',
 teoria:['Les notes van sempre en el mateix ordre. <b>Pujant</b> (cap a l\'agut): do, re, mi, fa, sol, la, si, do... <b>Baixant</b> (cap al greu): do, si, la, sol, fa, mi, re, do...','Al pentagrama, cada nota nova va <b>alternant línia i espai</b>: si una nota és en una línia, la següent és a l\'espai de damunt.','Després de <b>si</b> torna a començar <b>do</b>, però més agut.'],
 gen(lv){const t=pick(lv?['salt','salt','lloc','entre']:['salt','lloc','lloc']);
  if(t==='lloc'){const line=Math.random()<.6,k=line?rnd(1,5):rnd(1,4),p=line?2*k:2*k-1;
   return{text:`Quina nota s'escriu ${line?`a la <b>${MU_ORDF[k]} línia</b>`:`al <b>${MU_ORDM[k]} espai</b>`} del pentagrama (clau de sol)?`,fields:[muA([muNom(p)],'Nota')],
    hints:['Les línies i els espais es compten de baix a dalt.','La clau de sol marca el sol a la segona línia.'],
    steps:['Línies (de baix a dalt): mi, sol, si, re, fa. Espais: fa, la, do, mi.',`${line?`La ${MU_ORDF[k]} línia`:`El ${MU_ORDM[k]} espai`} és <b>${muNom(p)}</b>.`],
    err:v=>muIs(v[0],[muNom(p-1),muNom(p+1),muNom(p-2),muNom(p+2)])?'mu_linia_espai':null}}
  if(t==='entre'){const s=rnd(0,9);return{text:`Quina nota hi ha entre <b>${muNom(s)}</b> i <b>${muNom(s+2)}</b>?`,fields:[muA([muNom(s+1)],'Nota')],
   hints:['Digues les notes en ordre: do, re, mi, fa, sol, la, si.','Busca la que queda just al mig.'],steps:[`${muNom(s)} → <b>${muNom(s+1)}</b> → ${muNom(s+2)}.`],err:null}}
  const s=rnd(0,10),k=rnd(2,lv?6:4),down=lv>0&&Math.random()<.5,e=down?s-k:s+k,ch=Array.from({length:k+1},(_,i)=>muNom(down?s-i:s+i));
  return{text:`Comença a <b>${muNom(s)}</b> i ${down?'baixa':'puja'} <b>${k} notes</b>, d'una en una. A quina nota arribes?`,fields:[muA([muNom(e)],'Nota')],
   hints:[`Recita les notes ${down?'cap enrere':'en ordre'} a partir de ${muNom(s)}.`,'No comptis la nota de sortida: el primer pas ja és la nota següent.'],
   steps:[`Comença a ${muNom(s)} (no compta) i fes ${k} passos: ${ch.join(' → ')}.`,`Arribes a <b>${muNom(e)}</b>.`],
   err:v=>muIs(v[0],[muNom(down?e+1:e-1),muNom(down?e-1:e+1)])?'mu_compta':null}}},

/* ---------- 3. Figures i silencis ---------- */
mu_figures:{mat:'musica',curs:[6],ab:'Fg',nom:'Les figures musicals',
 teoria:['Les <b>figures</b> indiquen quant <b>dura</b> cada so. Es fixen en tres coses: el <b>cap</b> (blanc o negre), la <b>plica</b> (el pal) i els <b>corxets</b> (les banderetes).','<b>Rodona</b>: cap blanc sense plica · <b>blanca</b>: cap blanc amb plica · <b>negra</b>: cap negre amb plica · <b>corxera</b>: com la negra amb un corxet · <b>semicorxera</b>: dos corxets.','Quan hi ha dues corxeres o més seguides, sovint els corxets s\'uneixen amb una <b>barra</b>.'],
 fig:()=>muStaff(['r','b','n','c','s'].map(d=>({n:4,d,lab:MU_F[d].nom,w:84})),{clef:false,aria:'Les figures'}),
 gen(lv){const ds=lv?['r','b','n','c','s']:['r','b','n','c'],d=pick(ds),nom=MU_F[d].nom;
  const desc={r:'té el cap blanc i no té plica',b:'té el cap blanc i plica',n:'té el cap negre i plica, sense corxets',c:'té el cap negre, plica i un corxet',s:'té el cap negre, plica i dos corxets'};
  const err=v=>muIs(v[0],Object.values(MU_F).map(f=>f.nom).filter(n=>n!==nom))?'mu_figura':null;
  if(lv&&Math.random()<.45)return{text:`Com es diu la figura que ${desc[d]}?`,fields:[muA([nom],'Figura')],
   hints:['Fixa\'t en el cap, la plica i els corxets.','Cada corxet que afegim fa la figura més curta.'],steps:[`La figura que ${desc[d]} és la <b>${nom}</b>.`],err};
  const p=rnd(3,9);
  return{text:'Com es diu aquesta figura?',fig:muStaff([{n:p,d,hi:1}]),fields:[muA([nom],'Figura')],
   hints:['Mira de quin color és el cap: blanc o negre?','Té plica? Té corxets? Quants?'],
   steps:[`Aquesta figura ${desc[d]}.`,`És una <b>${nom}</b>.`],err}}},

mu_durades:{mat:'musica',curs:[6],ab:'Du',nom:'Quant dura cada figura',
 teoria:['Si la <b>negra</b> val <b>1 temps</b>: rodona = <b>4</b> temps · blanca = <b>2</b> · negra = <b>1</b> · corxera = <b>½</b> · semicorxera = <b>¼</b>.','Cada figura val el <b>doble</b> que la següent: 1 rodona = 2 blanques = 4 negres = 8 corxeres = 16 semicorxeres.','El <b>puntet</b> (un punt a la dreta de la figura) li afegeix <b>la meitat</b> del seu valor: blanca amb puntet = 2 + 1 = <b>3 temps</b>; negra amb puntet = 1 + ½ = <b>1 i ½</b>.','Pots escriure ½ com <b>1/2</b> o <b>0,5</b>.'],
 fig:()=>muStaff([{n:4,d:'r',lab:'4'},{n:4,d:'b',lab:'2'},{n:4,d:'n',lab:'1'},{n:4,d:'c',lab:'½'},{n:4,d:'s',lab:'¼'},{n:4,d:'b',dot:1,lab:'3'}].map(x=>({...x,w:56})),{clef:false,aria:'Durada de les figures'}),
 gen(lv){const t=pick(lv?['dura','equiv','puntet','suma']:['dura','dura','suma']);
  if(t==='dura'){const d=pick(lv>1?['r','b','n','c','s']:lv?['r','b','n','c']:['r','b','n']),v=MU_F[d].v,inv=R(v.d,v.n);
   return{text:`Si la negra val 1 temps, quants temps dura una <b>${MU_F[d].nom}</b>?`,fig:muFigSVG(d),fields:[{label:'Temps',ans:v}],
    hints:['Pensa en la negra: val 1 temps. Aquesta figura és més llarga o més curta?','Cada figura val el doble que la següent: rodona, blanca, negra, corxera, semicorxera.'],
    steps:['Rodona 4 · blanca 2 · negra 1 · corxera ½ · semicorxera ¼.',`La ${MU_F[d].nom} dura <b>${muFmt(v)}</b> ${'temps'}.`],
    err:x=>!req(v,inv)&&req(x[0],inv)?'mu_durada':null}}
  if(t==='equiv'){const ord=['r','b','n','c','s'],i=rnd(0,2),j=rnd(i+1,Math.min(4,i+(lv>1?3:2))),a=ord[i],b=ord[j],k=R(MU_F[a].v.n*MU_F[b].v.d,MU_F[a].v.d*MU_F[b].v.n);
   return{text:`Quantes <b>${MU_F[b].nom}s</b> valen el mateix que una <b>${MU_F[a].nom}</b>?`,fields:[{label:'Quantes',ans:k}],
    hints:['Escriu el valor de les dues figures en temps.',`Quantes vegades cap el valor de la ${MU_F[b].nom} dins el de la ${MU_F[a].nom}?`],
    steps:[`${MU_F[a].nom} = ${muFmt(MU_F[a].v)} temps · ${MU_F[b].nom} = ${muFmt(MU_F[b].v)} temps.`,`${muFmt(MU_F[a].v)} : ${muFmt(MU_F[b].v)} = <b>${fmtR(k)}</b>. Una ${MU_F[a].nom} val ${fmtR(k)} ${MU_F[b].nom}s.`],
    err:x=>req(x[0],R(k.d,k.n))?'mu_durada':null}}
  if(t==='puntet'){const d=pick(lv>1?['r','b','n','c']:['b','n']),v=MU_F[d].v,ans=muV(d,true),w1=muAdd(v,R(1)),w2=R(v.n*2,v.d);
   return{text:`Quants temps dura una <b>${MU_F[d].nom} amb puntet</b>?`,fig:muFigSVG(d,{dot:true}),fields:[{label:'Temps',ans}],
    hints:[`Primer: quant val una ${MU_F[d].nom} sola?`,'El puntet afegeix la meitat del valor de la figura (no sempre 1 temps!).'],
    steps:[`Una ${MU_F[d].nom} val ${muFmt(v)} temps.`,`La meitat de ${muFmt(v)} és ${muFmt(R(v.n,v.d*2))}.`,`${muFmt(v)} + ${muFmt(R(v.n,v.d*2))} = <b>${muFmt(ans)}</b> temps.`],
    err:x=>(!req(w1,ans)&&req(x[0],w1))||(!req(w2,ans)&&req(x[0],w2))?'mu_puntet':null}}
  const fs=Array.from({length:rnd(2,lv?4:3)},()=>pick(muOpts(lv))),s=muSum(fs);
  return{text:'Quants temps sumen aquestes figures?',fig:muStaff(muNotesOf(fs)),fields:[{label:'Temps',ans:s}],
   hints:['Escriu davall de cada figura quants temps val.','Rodona 4 · blanca 2 · negra 1 · corxera ½. El puntet afegeix la meitat.'],
   steps:[fs.map(f=>`${muFigName(f.d,f.dot)} = ${muFmt(muV(f.d,f.dot))}`).join(' · '),`Total: ${fs.map(f=>muFmt(muV(f.d,f.dot))).join(' + ')} = <b>${muFmt(s)}</b> temps.`],err:null}}},

mu_silencis:{mat:'musica',curs:[6],ab:'Si',nom:'Els silencis',
 teoria:['Els <b>silencis</b> indiquen quant de temps <b>no sona</b> res. Cada figura té el seu silenci, que dura el mateix.','<b>Silenci de rodona</b> (4 temps): un rectangle que <b>penja</b> de la quarta línia. <b>Silenci de blanca</b> (2 temps): un rectangle <b>assegut</b> damunt la tercera línia.','Truc: la rodona «pesa» més, per això el seu silenci penja de la línia.','<b>Silenci de negra</b> (1 temps): una línia en ziga-zaga. <b>Silenci de corxera</b> (½): una línia amb un punt. <b>Silenci de semicorxera</b> (¼): dos punts.'],
 fig:()=>muStaff(['r','b','n','c','s'].map(d=>({r:d,lab:MU_F[d].nom,w:84})),{clef:false,aria:'Els silencis'}),
 gen(lv){const t=pick(lv?['nom','nom','dura','suma']:['nom','nom','dura']);
  if(t==='suma'){let fs;do fs=muFill(R(rnd(3,4)),muOpts(lv,true));while(!fs.some(f=>f.rest)||fs.every(f=>f.rest));const s=muSum(fs),sn=muSum(fs.filter(f=>!f.rest));
   return{text:'Quants temps dura aquest fragment? (Els silencis també compten!)',fig:muStaff(muNotesOf(fs)),fields:[{label:'Temps',ans:s}],
    hints:['Suma el valor de totes les figures i de tots els silencis.','Un silenci dura el mateix que la seva figura.'],
    steps:[fs.map(f=>`${f.rest?'silenci de ':''}${muFigName(f.d,f.dot)} = ${muFmt(muV(f.d,f.dot))}`).join(' · '),`Total: <b>${muFmt(s)}</b> temps.`],
    err:x=>!req(s,sn)&&req(x[0],sn)?'mu_silenci_compta':null}}
  const d=pick(lv>1?['r','b','n','c','s']:lv?['r','b','n','c']:['r','b','n']),nom=MU_F[d].nom;
  if(t==='dura')return{text:'Quants temps dura aquest silenci?',fig:muStaff([{r:d,hi:1}]),fields:[{label:'Temps',ans:MU_F[d].v}],
   hints:['Primer esbrina de quina figura és aquest silenci.','Un silenci dura el mateix que la seva figura.'],steps:[`És el silenci de ${nom}.`,`Dura el mateix que una ${nom}: <b>${muFmt(MU_F[d].v)}</b> temps.`],
   err:x=>(d==='r'&&req(x[0],R(2)))||(d==='b'&&req(x[0],R(4)))?'mu_silenci_rb':null};
  const others=Object.values(MU_F).map(f=>f.nom).filter(n=>n!==nom);
  return{text:'Com es diu aquest silenci?',fig:muStaff([{r:d,hi:1}]),fields:[muA([`silenci de ${nom}`,`de ${nom}`,nom],'Silenci')],
   hints:[d==='r'||d==='b'?'Mira si el rectangle penja de la línia o hi està assegut.':'Fixa\'t en la forma: ziga-zaga, un punt o dos punts?','Silenci de rodona: penja · de blanca: assegut · de negra: ziga-zaga · de corxera: 1 punt · de semicorxera: 2 punts.'],
   steps:[{r:'El rectangle <b>penja</b> de la quarta línia.',b:'El rectangle està <b>assegut</b> damunt la tercera línia.',n:'És una línia en ziga-zaga.',c:'Té un punt i una línia.',s:'Té dos punts.'}[d],`És el <b>silenci de ${nom}</b>.`],
   err:v=>{const x=fold(v[0]).replace(/^(silenci )?de /,'');return(d==='r'&&x==='blanca')||(d==='b'&&x==='rodona')?'mu_silenci_rb':others.includes(x)?'mu_figura':null}}}},

/* ---------- 4. El compàs ---------- */
mu_compas:{mat:'musica',curs:[6],ab:'Cp',nom:'El compàs: 2/4, 3/4 i 4/4',
 teoria:['La música es divideix en <b>compassos</b>, separats per <b>línies divisòries</b>. Tots els compassos d\'una peça tenen els mateixos temps. Al final hi ha una <b>doble barra</b>.','La xifra del principi és el <b>compàs</b>. El número de <b>dalt</b> diu quants temps té cada compàs; el <b>4</b> de baix vol dir que cada temps és una <b>negra</b>.','<b>2/4</b>: 2 temps (binari, com una marxa) · <b>3/4</b>: 3 temps (ternari, com un vals) · <b>4/4</b>: 4 temps (quaternari).','El <b>primer temps</b> de cada compàs és el temps <b>fort</b> (s\'accentua).'],
 fig:()=>muStaff([{n:4,d:'n',lab:'1'},{n:5,d:'n',lab:'2'},{n:6,d:'n',lab:'3'},{bar:1},{n:7,d:'b',lab:'1 - 2'},{n:5,d:'n',lab:'3'},{end:1}],{ts:'3/4',aria:'Exemple de compàs de 3/4'}),
 gen(lv){const t=pick(lv?['temps','quin','quin','tipus','omple']:['temps','temps','tipus','fort']);
  const ts=pick(muTs),a=+ts[0];
  if(t==='temps')return{text:`Quants temps té cada compàs de <b>${ts}</b>?`,fields:[{label:'Temps',ans:R(a)}],
   hints:['Mira els dos números del compàs: quin diu quants temps hi ha?','El número de baix (4) diu quina figura és un temps.'],steps:[`El número de dalt indica els temps: <b>${a}</b>.`,'El 4 de baix vol dir que cada temps és una negra.'],
   err:x=>a!==4&&req(x[0],R(4))?'mu_compas_num':null};
  if(t==='tipus'){const nm=['','','binari','ternari','quaternari'][a];return{text:`Com s'anomena un compàs de <b>${a} temps</b>, com el ${ts}?`,fields:[muA([nm,`compas ${nm}`])],
   hints:['Bi- vol dir dos, tri- vol dir tres, quatri- vol dir quatre.',`Comença per «${nm[0].toUpperCase()}».`],steps:['2 temps → binari · 3 temps → ternari · 4 temps → quaternari.',`El ${ts} és <b>${nm}</b>.`],
   err:v=>muIs(v[0],['binari','ternari','quaternari'].filter(x=>x!==nm))?'mu_compas_num':null}}
  if(t==='fort')return{text:'Quin temps del compàs és el temps fort (el que s\'accentua)? Escriu-ne el número.',fields:[{label:'Temps',ans:R(1)}],
   hints:['És el que va just després de la línia divisòria.','Quan comptam «1, 2, 3», quin número deim més fort?'],steps:['El temps fort és sempre el <b>primer</b> temps del compàs.'],err:null};
  if(t==='omple'){const f={2:['blanca'],3:['blanca amb puntet','blanca amb punt'],4:['rodona']}[a];
   return{text:`Quina figura <b>sola</b> omple tot un compàs de <b>${ts}</b>?`,fields:[muA(f,'Figura')],
    hints:[`Un compàs de ${ts} té ${a} temps.`,'Rodona 4 · blanca 2 · negra 1. El puntet afegeix la meitat.'],steps:[`Necessitam una figura de ${a} temps.`,`És la <b>${f[0]}</b>.`],
    err:v=>muIs(v[0],['rodona','blanca','negra','corxera','blanca amb puntet'].filter(x=>!f.includes(x)))?'mu_compas_omple':null}}
  const fs1=muFill(R(a),muOpts(lv)),fs2=muFill(R(a),muOpts(lv));
  return{text:'Aquesta partitura no té escrit el compàs. Quin compàs és: 2/4, 3/4 o 4/4?',fig:muStaff([...muNotesOf(fs1),{bar:1},...muNotesOf(fs2),{end:1}]),fields:[{label:'Compàs',txt:muTsTxt(ts),loose:true}],
   hints:['Suma els temps de les figures que hi ha entre dues línies divisòries.','Tots els compassos han de sumar el mateix.'],
   steps:[`Primer compàs: ${fs1.map(f=>muFmt(muV(f.d,f.dot))).join(' + ')} = ${a} temps.`,`Segon compàs: ${fs2.map(f=>muFmt(muV(f.d,f.dot))).join(' + ')} = ${a} temps.`,`${a} temps per compàs → <b>${ts}</b>.`],
   err:v=>muTs.filter(x=>x!==ts).some(x=>muIs(v[0],muTsTxt(x)))?'mu_compas_quin':null}}},

mu_completar:{mat:'musica',curs:[6],ab:'Cc',nom:'Completar compassos',
 teoria:['Cada compàs ha de tenir <b>exactament</b> els temps que indica la xifra del principi: ni més ni menys.','Per completar un compàs: <b>1)</b> suma els temps que ja hi ha · <b>2)</b> resta-ho dels temps del compàs · <b>3)</b> tria una figura (o un silenci) que valgui el que falta.','Exemple: en 4/4 hi ha una blanca i una negra (2 + 1 = 3). Falta <b>1 temps</b>: una negra o un silenci de negra.'],
 gen(lv){const ts=pick(lv?muTs:['3/4','4/4']),a=+ts[0];
  const ms=[R(1),R(2)];if(lv)ms.push(R(1,2));if(lv>1&&a>=3)ms.push(R(3));if(lv>1)ms.push(R(3,2));
  const m=pick(ms.filter(x=>muLt(x,R(a)))),fs=muFill(muSub(R(a),m),muOpts(lv,lv>0)),had=muSum(fs);
  const fig=muStaff([...muNotesOf(fs),{n:6,q:1},{end:1}],{ts});
  const sumTxt=`${fs.map(f=>muFmt(muV(f.d,f.dot))).join(' + ')} = ${muFmt(had)}`;
  if(lv&&Math.random()<.5){const ok=[...muFigFor(m),...muFigFor(m,true)];
   return{text:'Escriu <b>una sola figura</b> (o un silenci) que completi el compàs.',fig,fields:[muA(ok,'Figura')],
    hints:['Suma els temps que ja hi ha al compàs.',`El compàs és de ${ts}: té ${a} temps. Quant falta?`],
    steps:[`Ja hi ha: ${sumTxt} temps.`,`Falten ${a} − ${muFmt(had)} = ${muFmt(m)} temps.`,`Una figura de ${muFmt(m)} temps: <b>${ok[0]}</b>.`],
    err:v=>{for(const d in MU_F)for(const dot of[false,true])if(muIs(v[0].replace(/^silenci de /,''),[muFigName(d,dot)])&&!req(muV(d,dot),m))return'mu_completar';return null}}}
  return{text:'Quants temps falten per completar el compàs?',fig,fields:[{label:'Temps que falten',ans:m}],
   hints:[`El compàs és de ${ts}: quants temps ha de tenir?`,'Suma les figures (i silencis) que ja hi ha i resta.'],
   steps:[`El compàs de ${ts} té ${a} temps.`,`Ja hi ha: ${sumTxt} temps.`,`Falten ${a} − ${muFmt(had)} = <b>${muFmt(m)}</b> temps.`],
   err:x=>!req(x[0],m)&&(req(x[0],had)||req(x[0],R(a)))?'mu_compas_falta':null}}},

/* ---------- 5. Intervals i alteracions ---------- */
mu_intervals:{mat:'musica',curs:[6],ab:'In',nom:'Els intervals',
 teoria:['Un <b>interval</b> és la distància entre dues notes. Es compta incloent-hi <b>la primera i la darrera</b> nota.','Exemple: de <b>do</b> a <b>mi</b>: do (1), re (2), mi (3) → és una <b>tercera</b>.','Noms: 2a <b>segona</b>, 3a <b>tercera</b>, 4a <b>quarta</b>, 5a <b>quinta</b>, 6a <b>sexta</b>, 7a <b>sèptima</b>, 8a <b>octava</b> (la mateixa nota, més aguda).','Si la segona nota és més aguda, l\'interval és <b>ascendent</b>; si és més greu, <b>descendent</b>.'],
 fig:()=>muStaff([{n:0,d:'r',lab:'do'},{n:2,d:'r',lab:'mi'},{gap:20},{n:4,d:'r',lab:'sol'},{n:8,d:'r',lab:'re'},{gap:20},{n:2,d:'r',lab:'mi'},{n:9,d:'r',lab:'mi'}],{aria:'Exemples d\'intervals: tercera, quinta i octava'}),
 gen(lv){const k=rnd(2,lv?8:5),t=lv>1?pick(['dib','nom','nota']):lv?pick(['dib','dib','nom']):'dib',down=lv>0&&Math.random()<.4;
  const bad=v=>{const xs=[k-1,k+1].filter(j=>j>=2&&j<=8);return xs.some(j=>muIs(v[0],muIntTxt(j)))?'mu_interval':null};
  const lo=lv?0:1,hi=lv?12:11;let p1,p2;do{p1=rnd(lo,hi);p2=down?p1-(k-1):p1+(k-1)}while(p2<lo||p2>hi);
  const chain=Array.from({length:k},(_,i)=>muNom(down?p1-i:p1+i));
  const st=[`Compta les notes, incloent-hi la primera i la darrera: ${chain.map((n,i)=>`${n} (${i+1})`).join(', ')}.`,`Són ${k} notes: és una <b>${MU_INT[k]}</b>${lv?` ${down?'descendent':'ascendent'}`:''}.`];
  if(t==='nota'){const s=rnd(0,7);const e=s+(k-1);return{text:`Quina nota és una <b>${MU_INT[k]}</b> per damunt de <b>${muNom(s)}</b>?`,fields:[muA([muNom(e)],'Nota')],
   hints:['Compta les notes incloent-hi la de sortida, que és la número 1.',`Has de comptar fins a ${k}.`],
   steps:[`${Array.from({length:k},(_,i)=>`${muNom(s+i)} (${i+1})`).join(', ')}.`,`Una ${MU_INT[k]} per damunt de ${muNom(s)} és <b>${muNom(e)}</b>.`],
   err:v=>muIs(v[0],[muNom(e-1),muNom(e+1)])?'mu_interval':null}}
  if(t==='nom')return{text:`Quin interval hi ha de <b>${muNom(p1)}</b> a <b>${muNom(p2)}</b>, ${down?'baixant':'pujant'}?`,fields:[muA(muIntTxt(k),'Interval')],
   hints:[`Digues les notes ${down?'cap enrere':'en ordre'} des de ${muNom(p1)} fins a ${muNom(p2)}.`,'Compta-les totes, també la primera i la darrera.'],steps:st,err:bad};
  return{text:'Quin interval formen aquestes dues notes? (Pots escriure el nom o el número, p. ex. «tercera» o «3a».)',fig:muStaff([{n:p1,d:'r'},{n:p2,d:'r'}]),fields:[muA(muIntTxt(k),'Interval')],
   hints:['Esbrina primer quines notes són.','Compta les notes que hi ha de la primera a la segona, incloent-hi les dues.'],steps:st,err:bad}}},

mu_alteracions:{mat:'musica',curs:[6],ab:'Al',nom:'Les alteracions',
 teoria:['Les <b>alteracions</b> són signes que es posen <b>davant</b> d\'una nota per canviar-ne l\'altura.','<b>Sostingut</b> (♯): <b>puja</b> la nota mig to (un semitò). <b>Bemoll</b> (♭): la <b>baixa</b> mig to. <b>Becaire</b> (♮): <b>anul·la</b> l\'alteració i la nota torna a ser natural.','Un <b>to</b> té <b>dos semitons</b>. Al piano, les tecles negres són les notes alterades: do♯ i re♭ són la mateixa tecla.','Compte: entre <b>mi i fa</b> i entre <b>si i do</b> només hi ha un semitò; per això no hi ha tecla negra entre elles.'],
 fig:()=>muStaff([{n:3,d:'r',acc:1,lab:'fa ♯',w:52},{n:6,d:'r',acc:-1,lab:'si ♭',w:52},{n:6,d:'r',acc:2,lab:'si ♮',w:52}],{aria:'Sostingut, bemoll i becaire'}),
 gen(lv){const t=pick(lv>1?['dib','dib','signe','semi','semi']:lv?['dib','dib','signe','tons']:['dib','signe','signe']);
  if(t==='signe'){const a=pick([1,-1,2]),nm={1:'sostingut',[-1]:'bemoll',2:'becaire'}[a],what={1:'<b>puja</b> una nota mig to',[-1]:'<b>baixa</b> una nota mig to',2:'<b>anul·la</b> una alteració'}[a];
   const fig=lv?null:muStaff([{n:5,d:'r',acc:a,hi:1}],{clef:false,minW:100});
   return{text:lv?`Com es diu l'alteració que ${what}?`:`Com es diu aquesta alteració? (Pista per recordar: ${what.replace(/<\/?b>/g,'')}.)`,fig,fields:[muA([nm],'Alteració')],
    hints:['Les tres alteracions són sostingut, bemoll i becaire.','Sostingut ♯ (com un coixinet) · bemoll ♭ (com una b) · becaire ♮.'],steps:[`L'alteració que ${what} és el <b>${nm}</b> (${{1:'♯',[-1]:'♭',2:'♮'}[a]}).`],
    err:v=>muIs(v[0],['sostingut','bemoll','becaire'].filter(x=>x!==nm))?'mu_alteracio':null}}
  if(t==='tons')return{text:'Quants <b>semitons</b> té un to?',fields:[{label:'Semitons',ans:R(2)}],hints:['Semi- vol dir «mig».','Si un semitò és mig to, quants en necessites per fer-ne un de sencer?'],steps:['Un semitò és mig to.','Un to = <b>2</b> semitons.'],err:null};
  if(t==='semi'){const up=Math.random()<.5,b=pick([0,2,4,5,7,9,11]),idx=b+(up?1:-1),name=MU_CHROM[b][0],ok=muChromTxt(idx);if(!up&&ok.length>4)ok.push(...ok.splice(0,4));
   const nat=[4,11].includes(b)&&up||[5,0].includes(b)&&!up;
   return{text:`Si ${up?'<b>puges</b>':'<b>baixes</b>'} la nota <b>${name}</b> un semitò, quina nota obtens?`,fields:[muA(ok,'Nota')],
    hints:['Pensa en el teclat del piano: les tecles negres són les notes alterades.','Recorda: entre mi i fa, i entre si i do, només hi ha un semitò.'],
    steps:[nat?`Entre ${name} i ${ok[0]} només hi ha un semitò (no hi ha tecla negra entre elles).`:`${up?'Pujar':'Baixar'} mig to és posar un ${up?'sostingut':'bemoll'}.`,`Obtens <b>${ok[0]}</b>${ok.length>1&&!nat?` (que sona igual que ${ok.find(o=>/(sostingut|bemoll)$/.test(o)&&o!==ok[0])||ok[0]})`:''}.`],
    err:v=>nat&&muIs(v[0],muNoteTxt(name,up?1:-1))?'mu_semito_natural':null}}
  const a=pick([1,-1,1,-1,2]),p=a===2?pick([6,3]):rnd(1,11),b=muNom(p),ok=muNoteTxt(b,a);
  return{text:'Quina nota és? Digues també l\'alteració.',fig:muStaff([{n:p,d:'n',acc:a,hi:1}]),fields:[muA(ok,'Nota')],
   hints:['Primer llegeix la nota sense l\'alteració.','Després mira el signe: ♯ sostingut, ♭ bemoll, ♮ becaire.'],
   steps:[`La nota és <b>${b}</b>.`,`L'alteració és un ${{1:'sostingut',[-1]:'bemoll',2:'becaire'}[a]}: és <b>${ok[0]}</b>.`],
   err:v=>a!==2&&muIs(v[0],muNoteTxt(b,-a))?'mu_alteracio':a!==2&&muIs(v[0],[b])?'mu_alteracio_oblida':null}}},

/* ---------- 6. L'escala ---------- */
mu_escala:{mat:'musica',curs:[6],ab:'Ec',nom:'L\'escala de do',
 teoria:['Una <b>escala</b> és una sèrie de notes seguides, pujant o baixant. L\'<b>escala de do major</b> és: do, re, mi, fa, sol, la, si, do.','Cada nota de l\'escala és un <b>grau</b> i s\'escriu amb números romans: do = I, re = II, mi = III, fa = IV, sol = V, la = VI, si = VII.','Entre les notes hi ha <b>tons</b> (T) i <b>semitons</b> (S): <b>T T S T T T S</b>. Els semitons són entre <b>mi-fa</b> i entre <b>si-do</b>.','En total, l\'escala major té <b>5 tons i 2 semitons</b>.'],
 fig:()=>muStaff([0,1,2,3,4,5,6,7].map((p,i)=>({n:p,d:'r',lab:i<7?['T','T','S','T','T','T','S'][i]:'',w:40})),{aria:'Escala de do amb tons i semitons'})+'<p style="text-align:center;margin:4px 0 0;font-weight:700">do – re – mi – fa – sol – la – si – do</p>',
 gen(lv){const t=pick(lv>1?['falta','grau','semis','semis','tonsemi']:lv?['falta','grau','semis','semito']:['falta','falta','semito','tons']);
  if(t==='falta'){const down=lv>1,sc=[0,1,2,3,4,5,6,7].map(muNom);if(down)sc.reverse();const n=lv?2:1,miss=[];
   while(miss.length<n){const i=rnd(1,6);if(!miss.includes(i)&&!miss.some(j=>Math.abs(j-i)<2))miss.push(i)}miss.sort((a,b)=>a-b);
   return{text:`Completa l'escala de do ${down?'<b>baixant</b>':'pujant'}:<br><span style="letter-spacing:.5px">${sc.map((x,i)=>miss.includes(i)?'<b style="color:#E8590C">___</b>':x).join(' – ')}</span>`,
    fields:miss.map((i,j)=>({label:n>1?`Nota ${j+1}`:'Nota',txt:[sc[i]]})),hints:['Recita l\'escala en veu alta: do, re, mi, fa, sol, la, si, do.',down?'Baixant, l\'ordre va al revés.':'Mira la nota d\'abans i la de després del buit.'],
    steps:[`L'escala ${down?'baixant':'pujant'} és: ${sc.join(' – ')}.`,`Falten: <b>${miss.map(i=>sc[i]).join('</b> i <b>')}</b>.`],
    err:v=>miss.some((i,j)=>muIs(v[j],[sc[i-1],sc[i+1]]))?'mu_nota_veina':null}}
  if(t==='grau'){const g=rnd(1,7);return{text:`Quina nota és el <b>grau ${MU_ROM[g-1]}</b> de l'escala de do?`,fields:[muA([muNom(g-1)],'Nota')],
   hints:['El grau I és do.','Compta les notes de l\'escala: I do, II re, III mi...'],steps:['I do · II re · III mi · IV fa · V sol · VI la · VII si.',`El grau ${MU_ROM[g-1]} és <b>${muNom(g-1)}</b>.`],
   err:v=>muIs(v[0],[muNom(g),muNom(g-2)])?'mu_compta':null}}
  if(t==='semito'){const mi=Math.random()<.5;return{text:`L'escala de do té dos semitons. Un és entre <b>${mi?'mi':'si'}</b> i quina nota (pujant)?`,fields:[muA([mi?'fa':'do'],'Nota')],
   hints:['Els semitons són entre dues notes seguides de l\'escala.','Al piano, entre aquestes dues notes no hi ha tecla negra.'],steps:['T T S T T T S: els semitons són entre mi-fa i si-do.',`Resposta: <b>${mi?'fa':'do'}</b>.`],err:null}}
  if(t==='tons'||t==='tonsemi')return{text:'Quants <b>tons</b> i quants <b>semitons</b> té l\'escala major?',fields:[{label:'Tons',ans:R(5)},{label:'Semitons',ans:R(2)}],
   hints:['Recorda l\'esquema T T S T T T S.','Compta les T i les S.'],steps:['T T S T T T S.','Hi ha <b>5 tons</b> i <b>2 semitons</b>.'],err:x=>req(x[0],R(2))&&req(x[1],R(5))?'mu_tons_semitons':null};
  const i=rnd(0,5),j=rnd(i+1,Math.min(7,i+(lv>1?5:3))),s=muSemis(i,j);
  return{text:`Quants <b>semitons</b> hi ha de <b>${muNom(i)}</b> a <b>${muNom(j)}</b> (pujant per l'escala de do)?`,fields:[{label:'Semitons',ans:R(s)}],
   hints:['Escriu les notes i, entre cada parella, posa T (to = 2 semitons) o S (semitò = 1).','Recorda: T T S T T T S. Els semitons són mi-fa i si-do.'],
   steps:[Array.from({length:j-i},(_,k)=>`${muNom(i+k)}-${muNom(i+k+1)}: ${MU_SEMIS_DO[(i+k)%7]===1?'S (1)':'T (2)'}`).join(' · '),`Total: <b>${s}</b> semitons.`],
   err:x=>j-i!==s&&req(x[0],R(j-i))?'mu_semitons':null}}},

/* ---------- 7. Tempo i dinàmica ---------- */
mu_tempo:{mat:'musica',curs:[6],ab:'Tm',nom:'El tempo (termes italians)',
 teoria:['El <b>tempo</b> és la <b>velocitat</b> d\'una peça. S\'indica al principi de la partitura amb paraules italianes.','De més lent a més ràpid: <b>Largo</b> (molt lent) · <b>Lento / Adagio</b> (lent) · <b>Andante</b> (al pas d\'una persona que camina) · <b>Moderato</b> (moderat) · <b>Allegro</b> (ràpid i alegre) · <b>Presto</b> (molt ràpid).','Canvis de tempo: <b>accelerando</b> (cada vegada més ràpid) i <b>ritardando</b> (cada vegada més lent).','El <b>metrònom</b> marca la velocitat en pulsacions per minut: negra = 60 vol dir un temps cada segon.'],
 gen(lv){const rows=MU_TEMPO.filter(r=>(r[3]||0)<=lv),r=pick(rows),term=r[0],ms=r[1].split('|');
  const allT=MU_TEMPO.map(x=>x[0]),dinT=MU_DIN.flatMap(d=>[d[0],d[1]]);
  if(lv&&Math.random()<.25){const bpm=pick([60,120,90]),sec=pick([30,60]),ans=bpm*sec/60;
   return{text:`El metrònom marca <b>negra = ${bpm}</b> (${bpm} temps per minut). Quants temps sonen en <b>${sec} segons</b>?`,fields:[{label:'Temps',ans:R(ans)}],
    hints:['Un minut té 60 segons.',sec===60?'Quantes pulsacions hi ha en un minut?':'30 segons és la meitat d\'un minut.'],steps:[`${bpm} temps en 60 segons.`,sec===60?`En 60 segons: <b>${ans}</b> temps.`:`En 30 segons, la meitat: ${bpm} : 2 = <b>${ans}</b> temps.`],err:null}}
  const toMean=Math.random()<.5;
  if(toMean)return{text:`Què vol dir el terme <b><i>${term}</i></b> a una partitura?`,fields:[muA(ms,'Significat')],
   hints:['Aquest terme indica la velocitat (el tempo).','Recorda l\'ordre: Largo, Lento/Adagio, Andante, Moderato, Allegro, Presto.'],steps:[`<i>${term}</i> vol dir <b>${r[2]}</b>.`],err:null};
  const ok=MU_TEMPO.filter(x=>fold(x[1].split('|')[0])===fold(ms[0])).map(x=>x[0]);
  return{text:`Quin terme italià indica un tempo <b>${r[2]}</b>?`,fields:[muA(ok,'Terme')],
   hints:['És una paraula italiana que s\'escriu al principi de la partitura.',`Comença per «${term[0]}».`],steps:[`Un tempo ${r[2]} és <b><i>${term}</i></b>.`],
   err:v=>muIs(v[0],dinT)?'mu_tempo_din':muIs(v[0],allT.filter(x=>!ok.includes(x)))?'mu_tempo':null}}},

mu_dinamica:{mat:'musica',curs:[6],ab:'Dn',nom:'La dinàmica (fort i fluix)',
 teoria:['La <b>dinàmica</b> indica la <b>intensitat</b>: si hem de tocar o cantar fort o fluix. També es fa amb paraules italianes i s\'abreuja.','De més fluix a més fort: <b>pp</b> pianissimo (molt fluix) · <b>p</b> piano (fluix) · <b>mp</b> mezzopiano (mig fluix) · <b>mf</b> mezzoforte (mig fort) · <b>f</b> forte (fort) · <b>ff</b> fortissimo (molt fort).','<b>Crescendo</b> (<b>&lt;</b>, cada vegada més fort) i <b>diminuendo</b> (<b>&gt;</b>, cada vegada més fluix). Aquests signes s\'anomenen <b>reguladors</b>.','Compte: en música, <i>piano</i> vol dir <b>fluix</b> i <i>forte</i> vol dir <b>fort</b>.'],
 fig:()=>`<svg viewBox="0 0 560 70" style="width:100%;max-width:560px;height:auto;display:block;margin:0 auto" role="img" aria-label="Signes de dinàmica"><g font-family="Georgia,'Times New Roman',serif" font-style="italic" font-weight="700" font-size="30" fill="${MU_COL}" text-anchor="middle">${['pp','p','mp','mf','f','ff'].map((s,i)=>`<text x="${40+i*68}" y="42">${s}</text>`).join('')}</g><path d="M530 22L450 36L530 50" fill="none" stroke="${MU_COL}" stroke-width="2.5"/><text x="280" y="66" text-anchor="middle" font-size="12" fill="#475569">més fluix → més fort · regulador de crescendo</text></svg>`,
 gen(lv){const rows=MU_DIN.map(muDinRow),r=pick(rows.filter(x=>x.lv<=lv)),ok=[r.s.replace('.',''),r.n,...r.m],c=rows.find(x=>x.s===r.c);
  const cOk=[c.s.replace('.',''),c.n,...c.m],tempT=MU_TEMPO.map(x=>x[0]);
  const err=v=>muIs(v[0],cOk)?'mu_dinamica':muIs(v[0],tempT)?'mu_din_tempo':null;
  if(lv&&Math.random()<.3){const L=['pp','p','mp','mf','f','ff'],i=rnd(0,3),mid=rows.find(x=>x.s===L[i+1]);
   return{text:`Quina dinàmica va entre <b><i>${L[i]}</i></b> i <b><i>${L[i+2]}</i></b>?`,fields:[muA([mid.s,mid.n,...mid.m],'Dinàmica')],
    hints:['Ordena-les de més fluix a més fort.','pp, p, mp, mf, f, ff.'],steps:[`L'ordre és pp · p · mp · mf · f · ff.`,`Entre ${L[i]} i ${L[i+2]} hi ha <b>${mid.s} (${mid.n})</b>.`],err:null}}
  if(Math.random()<.55)return{text:'Què indica aquest signe de dinàmica? Escriu-ne el nom o el significat.',fig:muDinSVG(r.s),fields:[muA(ok,'Resposta')],
   hints:['La p ve de <i>piano</i> i la f de <i>forte</i>. Recorda què vol dir cadascun en música.','La m (mezzo) vol dir «mig».'],steps:[`<i>${r.s}</i> és <b>${r.n}</b>: ${r.m[0]}.`],err};
  return{text:`Quin signe o terme italià indica que s'ha de tocar <b>${r.m[0]}</b>?`,fields:[muA(ok,'Signe o terme')],
   hints:['Pensa en piano (fluix) i forte (fort).','Les lletres que es repeteixen (pp, ff) volen dir «molt».'],steps:[`Tocar ${r.m[0]} és <b>${r.s} (${r.n})</b>.`],err}}},

/* ---------- 8. Instruments ---------- */
mu_families:{mat:'musica',curs:[6],ab:'Fi',nom:'Les famílies d\'instruments',
 teoria:['Els instruments es classifiquen en famílies segons <b>com produeixen el so</b> (no segons el material).','<b>Corda</b>: el so surt de cordes que vibren. <b>Fregada</b> (amb arc: violí, viola, violoncel, contrabaix), <b>pinçada</b> (amb els dits o una pua: guitarra, arpa) i <b>percudida</b> (amb martellets: piano).','<b>Vent</b>: el so surt de l\'aire que hi bufam. <b>Fusta</b> (flautes, clarinet, oboè, fagot, saxòfon) i <b>metall</b> (trompeta, trombó, trompa, tuba). La flauta travessera i el saxòfon són de metall, però són de la família de vent fusta!','<b>Percussió</b>: el so surt de picar, sacsejar o fregar. <b>Afinada</b> (fa notes: xilòfon, metal·lòfon, timbals) i <b>no afinada</b> (no fa notes concretes: bombo, caixa, plats, triangle...).'],
 gen(lv){const t=pick(lv?['sub','sub','escriu','fam']:['fam']);const ins=MU_INS.filter(x=>x[2]<=lv);
  const famOf=s=>MU_SUB[s][0];
  if(t==='escriu'){const subs=Object.keys(MU_SUB),s=pick(subs),list=MU_INS.filter(x=>x[1]===s).map(x=>muInsNom(x[0])),[f,n]=MU_SUB[s];if(s==='fusta')list.push('flauta');
   return{text:`Escriu el nom d'un instrument de <b>${MU_FAM[f]} ${n}</b>.`,fields:[muA(list,'Instrument')],
    hints:[{fregada:'Es toquen amb un arc.',pincada:'Les cordes es pincen amb els dits o una pua.',percudida:'Un martellet colpeja les cordes quan toques una tecla.',fusta:'Pensa en instruments amb canya o amb bisell.',metall:'Els llavis vibren dins una boquilla.',afinada:'Fan notes diferents, com una escala.',noafinada:'Fan ritme, però no notes concretes.'}[s],`Un exemple comença per «${list[0][0].toUpperCase()}».`],
    steps:[`Instruments de ${MU_FAM[f]} ${n}: <b>${list.join(', ')}</b>.`],
    err:v=>MU_INS.some(x=>x[1]!==s&&muIs(v[0],[muInsNom(x[0])]))?'mu_familia':null}}
  const [nom,s,,how]=pick(ins),[f,n]=MU_SUB[s],sp=s==='fusta'&&/travessera|saxòfon/.test(nom);
  const errF=v=>{if(sp&&muIs(v[0],muSubTxt('metall').concat(['metall'])))return'mu_flauta';
   const fam=Object.keys(MU_FAM).find(k=>muIs(v[0],[MU_FAM[k],`de ${MU_FAM[k]}`]));if(fam&&fam!==f)return'mu_familia';
   const sb=Object.keys(MU_SUB).find(k=>muIs(v[0],muSubTxt(k)));if(sb&&sb!==s)return MU_SUB[sb][0]===f?'mu_subfamilia':'mu_familia';return null};
  if(t==='fam')return{text:`A quina família d'instruments pertany <b>${nom}</b>: corda, vent o percussió?`,fields:[muA(muFamTxt(s),'Família')],
   hints:['Pensa com es produeix el so: vibra una corda, bufam, o el picam?',`Pista: ${how}.`],steps:[`${muCap(nom)}: ${how}.`,`És de la família de <b>${MU_FAM[f]}</b> (${MU_FAM[f]} ${n}).`],err:errF};
  return{text:`A quina família i subfamília pertany <b>${nom}</b>? (Per exemple: «corda pinçada», «vent metall», «percussió afinada».)`,fields:[muA(muSubTxt(s),'Família i subfamília')],
   hints:['Primer pensa la família: corda, vent o percussió.',`Pista: ${how}.`],steps:[`${muCap(nom)}: ${how}.`,`És de <b>${MU_FAM[f]} ${n}</b>.`],err:errF}}},

/* ---------- 9. La veu ---------- */
mu_veus:{mat:'musica',curs:[6],ab:'Ve',nom:'La veu i les agrupacions vocals',
 teoria:['La veu es produeix a la <b>laringe</b>, quan l\'aire fa vibrar les <b>cordes vocals</b>.','Veus de <b>dona</b>, de més aguda a més greu: <b>soprano</b>, <b>mezzosoprano</b> i <b>contralt</b>. Veus d\'<b>home</b>: <b>tenor</b>, <b>baríton</b> i <b>baix</b>.','Els infants tenen la <b>veu blanca</b>. A l\'adolescència, la veu canvia: és la <b>muda de la veu</b>.','Una persona que canta sola és un/a <b>solista</b>. Si són dues, un <b>duo</b>; tres, un <b>trio</b>; quatre, un <b>quartet</b>; cinc, un <b>quintet</b>. Un grup gran és un <b>cor</b> (o coral). Cantar sense instruments és cantar <b>a cappella</b>.'],
 bank:muMk([
  ['Quina és la veu de dona més aguda?','soprano','És la primera de la llista, de més aguda a més greu.','La veu femenina més aguda és la <b>soprano</b>.','contralt|tenor|mezzosoprano|baix'],
  ['Quina és la veu de dona més greu?','contralt','És la darrera de la llista de veus de dona.','La veu femenina més greu és la <b>contralt</b>.','soprano|baix|tenor|mezzosoprano'],
  ['Quina és la veu d\'home més aguda?','tenor','És la primera de la llista de veus d\'home.','La veu masculina més aguda és el <b>tenor</b>.','baix|baríton|soprano|contralt'],
  ['Quina és la veu d\'home més greu?','baix','És la darrera de la llista de veus d\'home.','La veu masculina més greu és el <b>baix</b>.','tenor|baríton|contralt|soprano'],
  ['Com es diu la veu dels infants, abans que canviï?','veu blanca|blanca','Té el nom d\'un color.','Els infants tenen la <b>veu blanca</b>.'],
  ['Com es diu el canvi de la veu a l\'adolescència?','muda|muda de la veu|la muda','Els ocells també muden les plomes.','És la <b>muda de la veu</b>.'],
  ['Com es diu un grup gran de persones que canten juntes?','cor|coral|una coral','Té tres o cinc lletres.','És un <b>cor</b> o una <b>coral</b>.'],
  ['Com es diu la persona que canta sola, davant del cor o de l\'orquestra?','solista','Ve de «sol».','És el o la <b>solista</b>.'],
  ['Quines són les dues membranes de la laringe que vibren quan parlam o cantam?','cordes vocals|les cordes vocals','Tenen el mateix nom que una part d\'alguns instruments.','Són les <b>cordes vocals</b>.','',1],
  ['Quina veu d\'home està entre el tenor i el baix?','baríton|bariton','Comença per «B», però no és el baix.','Entre el tenor i el baix hi ha el <b>baríton</b>.','tenor|baix|mezzosoprano',1],
  ['Quina veu de dona està entre la soprano i la contralt?','mezzosoprano|mezzo','Vol dir «mig soprano».','És la <b>mezzosoprano</b>.','soprano|contralt|baríton',1],
  ['Com es diu cantar sense cap instrument que acompanyi?','a cappella|a capella|acappella','Són dues paraules italianes.','Cantar sense instruments és cantar <b>a cappella</b>.','',2]]),
 gen(lv){if(Math.random()<.3){const n=rnd(2,5),nm=['','','duo','trio','quartet','quintet'][n],alt=n===2?['duo','duet']:[nm];
   return{text:`Com s'anomena un grup de <b>${n}</b> cantants?`,fields:[muA(alt,'Agrupació')],hints:['El nom recorda el número: dos, tres, quatre, cinc...',`Comença per «${nm[0].toUpperCase()}».`],steps:['2 duo · 3 trio · 4 quartet · 5 quintet.',`${n} cantants formen un <b>${nm}</b>.`],
    err:v=>muIs(v[0],['duo','trio','quartet','quintet'].filter(x=>x!==nm))?'mu_agrupacio':null}}
  return muFromBank(this.bank,'mu_veus',lv)}},

/* ---------- 10. La forma musical ---------- */
mu_forma:{mat:'musica',curs:[6],ab:'Fm',nom:'La forma musical',
 teoria:['La <b>forma</b> és com està organitzada una peça. Cada part s\'anomena amb una <b>lletra</b>: si es repeteix, la mateixa lletra; si és nova, una lletra nova.','<b>Binària</b> (A B): dues parts diferents. <b>Ternària</b> (A B A): torna la primera part.','<b>Rondó</b> (A B A C A...): una part, la <b>tornada</b> (A), es repeteix entre parts diferents (les <b>estrofes</b> o episodis).','<b>Cànon</b>: totes les veus canten la mateixa melodia però comencen en moments diferents. <b>Tema amb variacions</b> (A A\' A\'\'...): el tema es repeteix amb canvis. <b>Ostinato</b>: un ritme o melodia curta que es repeteix sense parar.'],
 bank:muMk([
  ['Com es diu la forma musical amb estructura A B A C A?','rondó|rondo','La part A torna una vegada i una altra.','A B A C A és un <b>rondó</b>: la tornada A torna entre parts noves.','ternària|binària|cànon'],
  ['Com es diu la forma musical amb estructura A B (dues parts diferents)?','binària|forma binària','«Bi-» vol dir dos.','A B és la forma <b>binària</b>.','ternària|rondó'],
  ['Com es diu la forma musical amb estructura A B A?','ternària|forma ternària|lied','«Ter-» vol dir tres.','A B A és la forma <b>ternària</b>.','binària|rondó'],
  ['Com es diu la forma en què totes les veus canten la mateixa melodia, però començant en moments diferents?','cànon|canon','«Frère Jacques» se sol cantar així.','És un <b>cànon</b>.','rondó|ostinato|ostinat'],
  ['Com es diu un ritme o una melodia curta que es repeteix sense parar durant una peça?','ostinato|ostinat','És una paraula italiana que vol dir «obstinat».','És un <b>ostinato</b>.','cànon|rondó'],
  ['Com es diu la forma A A\' A\'\' A\'\'\', en què el tema es repeteix amb canvis?','tema amb variacions|variacions|tema i variacions','Cada vegada el tema «varia» una mica.','És un <b>tema amb variacions</b>.','rondó|cànon',1],
  ['En un rondó, com es diu la part A, que es repeteix?','tornada|estribillo|refrany','En una cançó, és la part que tothom canta i torna.','La part A del rondó és la <b>tornada</b>.','estrofa|estrofes',1],
  ['Com es diuen les parts d\'una cançó que tenen la mateixa música però lletra diferent?','estrofes|estrofa','Alternen amb la tornada.','Són les <b>estrofes</b>.','tornada',1]]),
 gen(lv){const t=pick(lv?['bank','vegades','lloc','lletres']:['bank','bank','vegades']);
  const L='BCDEF',k=rnd(2,lv>1?5:3),rondo=['A'];for(let i=0;i<k;i++)rondo.push(L[i],'A');
  if(t==='vegades')return{text:`Una peça té aquesta forma: <b>${rondo.join(' ')}</b>. Quantes vegades sona la part A?`,fields:[{label:'Vegades',ans:R(k+1)}],
   hints:['Compta les A una per una.','La primera i la darrera també compten.'],steps:[`${rondo.map(x=>x==='A'?'<b>A</b>':x).join(' ')}.`,`La A sona <b>${k+1}</b> vegades. És un rondó.`],err:x=>req(x[0],R(k))?'mu_forma_compta':null};
  if(t==='lloc'){const i=rnd(2,rondo.length),ans=rondo[i-1];return{text:`En un rondó amb forma <b>${rondo.join(' ')}</b>, quina part sona en el lloc número <b>${i}</b>?`,fields:[{label:'Part (lletra)',txt:[ans.toLowerCase()]}],
   hints:['Compta les parts d\'esquerra a dreta.','En un rondó, la A sona en els llocs senars (1, 3, 5...).'],steps:[rondo.map((x,j)=>`${j+1}:${x}`).join(' · '),`Al lloc ${i} hi ha la part <b>${ans}</b>.`],err:null}}
  if(t==='lletres'){const ty=pick(['bin','ter','ron']),d={bin:['A B','dues parts diferents'],ter:['A B A','una part, després una part diferent i torna la primera'],ron:['A B A C A','una tornada que torna tres vegades, amb dues estrofes diferents enmig']}[ty],ans=d[0],vs=[ans.toLowerCase(),ans.replace(/ /g,'').toLowerCase(),ans.replace(/ /g,'-').toLowerCase(),ans.replace(/ /g,', ').toLowerCase(),ans.replace(/ /g,' - ').toLowerCase()];
   return{text:`Escriu amb lletres l'estructura d'una peça que té ${d[1]}. (Exemple: A B A.)`,fields:[{label:'Estructura',txt:vs,wide:true}],
    hints:['Cada part nova és una lletra nova (A, B, C...).','Si una part torna, repeteix-ne la lletra.'],steps:[`${muCap(d[1])} → <b>${ans}</b>.`],err:null}}
  return muFromBank(this.bank,'mu_forma',lv)}},

/* ---------- 11. Música tradicional de les Illes Balears ---------- */
mu_tradicio:{mat:'musica',curs:[6],ab:'Tr',nom:'Música tradicional de les Illes Balears',
 teoria:['Les Illes Balears tenen una música tradicional molt rica, que es toca a les festes populars: Sant Antoni, Sant Joan, les festes patronals...','El <b>ball de bot</b> és el ball tradicional de Mallorca (i també es balla a Menorca). Es balla en parelles: <b>mateixes</b>, <b>jotes</b>, <b>fandangos</b> i <b>boleros</b>. A <b>Eivissa i Formentera</b> hi ha el <b>ball pagès</b>, i a Menorca, el <b>jaleo</b> de les festes de Sant Joan de Ciutadella.','Instruments: les <b>xeremies</b> (un sac de pell amb diversos tubs) acompanyades del <b>flabiol</b> i el <b>tamborí</b>; la <b>ximbomba</b> (de Nadal i Sant Antoni), les <b>castanyetes</b>... A Eivissa, la <b>flaüta</b> i el <b>tambor</b>, les <b>castanyoles</b> grosses i l\'<b>espasí</b>.','El <b>Cant de la Sibil·la</b>, que se canta la nit de Nadal a les esglésies de Mallorca, és Patrimoni Cultural Immaterial de la Humanitat (UNESCO, 2010). Les <b>gloses</b> són versos improvisats pels glosadors.'],
 bank:muMk([
  ['Com es diu el ball tradicional de Mallorca que es balla en parelles (mateixes, jotes, boleros...)?','ball de bot','Té tres paraules i la darrera vol dir «salt».','És el <b>ball de bot</b>.','ball pagès|jaleo'],
  ['Quin instrument tradicional mallorquí està fet d\'un sac de pell amb diversos tubs?','xeremies|xeremia|sac de gemecs','Se sol tocar amb el flabiol i el tamborí.','Són les <b>xeremies</b> (també anomenades sac de gemecs).','ximbomba|flabiol'],
  ['Quina flauta petita de tres forats acompanya les xeremies?','flabiol','Comença per «F».','És el <b>flabiol</b>, que el xeremier toca amb una mà mentre amb l\'altra toca el tamborí.','flauta dolça'],
  ['Quin tambor petit es toca amb una mà mentre l\'altra toca el flabiol?','tamborí|tamboril','És un tambor «petit».','És el <b>tamborí</b>.','ximbomba'],
  ['Quin instrument de fricció, fet amb una pell i una canya, sona a les festes de Nadal i Sant Antoni?','ximbomba|simbomba','Per tocar-lo es frega una canya amb la mà mullada.','És la <b>ximbomba</b>.','xeremies|tamborí'],
  ['Quin cant es fa la nit de Nadal a les esglésies de Mallorca i és Patrimoni de la Humanitat?','cant de la sibil·la|la sibil·la|sibil·la|sibilla|cant de la sibilla','És una dona que profetitza el Judici Final.','És el <b>Cant de la Sibil·la</b>, Patrimoni Cultural Immaterial de la Humanitat des del 2010.'],
  ['Com es diu el ball tradicional d\'Eivissa i Formentera?','ball pagès|ball pages','La segona paraula vol dir «de pagès», del camp.','És el <b>ball pagès</b>.','ball de bot'],
  ['Com es diuen els versos improvisats que canten els glosadors?','gloses|glosa','Comença per «G».','Són les <b>gloses</b>.','',1],
  ['Com es diu el ball de bot més lent i elegant, que sovint obre la ballada?','mateixes|mateixa|les mateixes','Comença per «M».','Són les <b>mateixes</b>.','jota|bolero|jotes',1],
  ['Quin és el ball de les festes de Sant Joan de Ciutadella, a Menorca?','jaleo','És una paraula de cinc lletres.','És el <b>jaleo</b>, que es balla amb els cavalls a la plaça.','ball de bot|ball pagès',1],
  ['A Eivissa, quins dos instruments toca alhora un mateix músic al ball pagès?','flaüta i tambor|flauta i tambor|tambor i flaüta|tambor i flauta','Un és de vent i l\'altre de percussió.','El músic toca la <b>flaüta</b> amb una mà i el <b>tambor</b> amb l\'altra.','',1],
  ['Com es diu l\'instrument eivissenc de metall en forma d\'espasa?','espasí|espasi','Recorda la paraula «espasa».','És l\'<b>espasí</b>, que es pica amb una vareta de metall.','',2],
  ['Com es diuen els balladors de Mallorca que fan danses antigues amb una dama i un dimoni, com a Algaida o Montuïri?','cossiers|cossier','Comença per «C».','Són els <b>cossiers</b>.','',2],
  ['En quin any la UNESCO va declarar el Cant de la Sibil·la Patrimoni de la Humanitat?','2010','És un any del segle XXI.','Va ser l\'any <b>2010</b>.','',2]]),
 gen(lv){return muFromBank(this.bank,'mu_tradicio',lv)}}
});

/* ===================== unitats (ordre del llibre) ===================== */
UNITS.musica=[
 ['El so i les seves qualitats',['mu_qualitats','mu_escolta'],[6]],
 ['El pentagrama i les notes',['mu_notes','mu_ordre'],[6]],
 ['Figures i silencis',['mu_figures','mu_durades','mu_silencis'],[6]],
 ['El compàs',['mu_compas','mu_completar'],[6]],
 ['Intervals i alteracions',['mu_intervals','mu_alteracions'],[6]],
 ['L\'escala',['mu_escala'],[6]],
 ['Tempo i dinàmica',['mu_tempo','mu_dinamica'],[6]],
 ['Els instruments i l\'orquestra',['mu_families','mu_orquestra'],[6]],
 ['La veu',['mu_veus'],[6]],
 ['La forma musical',['mu_forma'],[6]],
 ['Música tradicional de les Illes Balears',['mu_tradicio'],[6]]];

/* ===================== errors típics ===================== */
Object.assign(ERR,{
 mu_nota_veina:{kid:'Gairebé! Has dit la nota del costat. Compta les línies i els espais un per un, de baix a dalt.',par:'Llegeix una nota per una altra de veïna al pentagrama (s\'equivoca d\'una línia o un espai)'},
 mu_linia_espai:{kid:'Compte: les línies i els espais són llocs diferents. Línies: mi, sol, si, re, fa. Espais: fa, la, do, mi.',par:'Confon les línies i els espais del pentagrama'},
 mu_compta:{kid:'Revisa com comptes: la nota de sortida no compta com a pas.',par:'S\'equivoca d\'un en comptar notes seguides (inclou o oblida la nota de sortida)'},
 mu_figura:{kid:'Fixa\'t bé: el cap és blanc o negre? Té plica? Quants corxets?',par:'Confon els noms de les figures musicals'},
 mu_durada:{kid:'Ho has girat! Les figures amb cap blanc són més llargues; com més corxets, més curta és la figura.',par:'Inverteix el valor de les figures (pensa que la rodona és curta o la corxera llarga)'},
 mu_puntet:{kid:'El puntet no suma sempre 1 temps ni dobla la figura: hi afegeix la meitat del seu valor.',par:'Calcula malament el valor del puntet'},
 mu_silenci_rb:{kid:'Compte! El silenci de rodona penja de la línia (4 temps) i el de blanca hi està assegut (2 temps).',par:'Confon el silenci de rodona amb el de blanca'},
 mu_silenci_compta:{kid:'Has oblidat els silencis! Els silencis també duren i s\'han de comptar.',par:'No compta la durada dels silencis'},
 mu_compas_num:{kid:'Mira el número de dalt: és el que diu quants temps té el compàs. El 4 de baix vol dir que el temps és una negra.',par:'Confon el numerador i el denominador del compàs'},
 mu_compas_omple:{kid:'Aquesta figura no dura exactament el que té el compàs. Compta quants temps té i busca la figura que val el mateix.',par:'No sap quina figura omple un compàs sencer'},
 mu_compas_quin:{kid:'Suma els temps de les figures que hi ha entre dues línies divisòries: aquest és el número de dalt del compàs.',par:'No identifica el compàs a partir de les figures'},
 mu_compas_falta:{kid:'Has trobat el que hi ha, o el total, però et demanam el que falta: resta!',par:'En completar compassos, dona el total o el que ja hi ha en lloc del que falta'},
 mu_completar:{kid:'Aquesta figura no omple exactament el que falta. Suma els temps que hi ha, resta-ho del total i busca una figura que valgui això.',par:'Tria una figura que no completa el compàs exactament'},
 mu_interval:{kid:'Compte: en els intervals es compten la primera i la darrera nota. De do a mi: do, re, mi → tercera.',par:'Compta malament els intervals (no inclou una de les dues notes)'},
 mu_alteracio:{kid:'Has confós les alteracions: el sostingut (♯) puja mig to i el bemoll (♭) el baixa.',par:'Confon el sostingut i el bemoll'},
 mu_alteracio_oblida:{kid:'Has llegit bé la nota, però no has dit l\'alteració que té davant!',par:'Oblida les alteracions en llegir notes'},
 mu_semito_natural:{kid:'Entre mi i fa, i entre si i do, només hi ha mig to: no cal cap alteració!',par:'No sap que mi-fa i si-do estan a un semitò'},
 mu_semitons:{kid:'Has comptat notes, no semitons. Recorda: cada to són 2 semitons (T T S T T T S).',par:'Confon el nombre de notes amb el nombre de semitons'},
 mu_tons_semitons:{kid:'Ho has girat: l\'escala major té 5 tons i només 2 semitons.',par:'Inverteix el nombre de tons i semitons de l\'escala'},
 mu_tempo:{kid:'Aquest terme indica una altra velocitat. Recorda l\'ordre: Largo, Lento, Adagio, Andante, Moderato, Allegro, Presto.',par:'Confon els termes de tempo'},
 mu_tempo_din:{kid:'Aquest terme és de dinàmica (fort o fluix), no de velocitat.',par:'Confon els termes de tempo amb els de dinàmica'},
 mu_din_tempo:{kid:'Aquest terme és de tempo (velocitat), no de dinàmica (fort o fluix).',par:'Confon els termes de dinàmica amb els de tempo'},
 mu_dinamica:{kid:'Ho has dit al revés! En música, piano (p) vol dir fluix i forte (f) vol dir fort.',par:'Confon piano i forte (fluix i fort)'},
 mu_qualitats:{kid:'Has confós les qualitats del so: altura (agut/greu), durada (llarg/curt), intensitat (fort/fluix), timbre (qui sona).',par:'Confon les qualitats del so'},
 mu_familia:{kid:'Pensa com es produeix el so: vibra una corda, hi bufam, o el picam?',par:'Classifica malament els instruments per famílies'},
 mu_subfamilia:{kid:'La família és bona, però no la subfamília. Com es fa sonar exactament?',par:'Encerta la família però no la subfamília dels instruments'},
 mu_flauta:{kid:'És de metall, però es classifica com a vent fusta! Les famílies depenen de com es produeix el so, no del material.',par:'Classifica la flauta travessera o el saxòfon com a vent metall pel material'},
 mu_veus:{kid:'Repassa l\'ordre de les veus. Dona: soprano, mezzosoprano, contralt. Home: tenor, baríton, baix (de més aguda a més greu).',par:'Confon les veus (soprano, contralt, tenor, baix)'},
 mu_agrupacio:{kid:'Pensa en el número: duo 2, trio 3, quartet 4, quintet 5.',par:'Confon els noms de les agrupacions (duo, trio, quartet...)'},
 mu_forma:{kid:'Mira les lletres: quantes parts diferents hi ha i quina part es repeteix?',par:'Confon les formes musicals (binària, ternària, rondó...)'},
 mu_forma_compta:{kid:'Compta-les una altra vegada: la primera i la darrera A també compten.',par:'Compta malament les repeticions d\'una forma musical'}
});

/* ===================== material: teclat i pentagrama ===================== */
function muTeclat(){endSession();
 const W=[0,1,2,3,4,5,6,7,8,9,10,11,12,13],B=[[0,1],[1,1],[3,1],[4,1],[5,1],[7,1],[8,1],[10,1],[11,1],[12,1]];let sel={p:0,acc:0};
 const kb=()=>`<svg viewBox="0 0 ${W.length*40+2} 170" style="width:100%;height:auto;display:block;touch-action:manipulation" role="img" aria-label="Teclat de piano">${W.map((p,i)=>`<g data-k="${p}" data-a="0" style="cursor:pointer"><rect x="${i*40+1}" y="1" width="39" height="166" fill="${sel.p===p&&!sel.acc?'#FDE2CF':'#fff'}" stroke="#1F2A44" stroke-width="1.5"/><text x="${i*40+20}" y="155" text-anchor="middle" font-size="13" font-weight="700" fill="#475569">${muNom(p)}</text></g>`).join('')}
  ${B.map(([p])=>`<g data-k="${p}" data-a="1" style="cursor:pointer"><rect x="${p*40+28}" y="1" width="25" height="100" fill="${sel.p===p&&sel.acc?MU_HI:'#1F2A44'}"/></g>`).join('')}</svg>`;
 const nm=()=>sel.acc?`${muNom(sel.p)} sostingut (= ${muNom(sel.p+1)} bemoll)`:muNom(sel.p);
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-musica)">Material · Música</div><h2>Teclat i pentagrama</h2><p class="muted">Toca una tecla: escoltaràs la nota i veuràs on s'escriu.</p></div><button class="ghost" onclick="subject('musica')">← Tornar</button></div>
  <div class="card"><div id="kst"></div><p id="knm" style="text-align:center;font-size:24px;font-weight:800;margin:6px 0 14px"></p><div id="kkb"></div>
  <p class="muted" style="margin-bottom:0">Les tecles negres són les notes alterades: el <b>sostingut</b> (♯) puja mig to i el <b>bemoll</b> (♭) baixa mig to. Entre <b>mi-fa</b> i <b>si-do</b> no hi ha tecla negra: hi ha només mig to.</p></div>
  <div class="card"><h3 style="margin-top:0">Figures i silencis</h3>${muStaff(['r','b','n','c','s'].map(d=>({n:4,d,lab:MU_F[d].nom,w:84})),{clef:false})}${muStaff(['r','b','n','c','s'].map(d=>({r:d,lab:'silenci',w:84})),{clef:false})}
  <table class="mini" style="width:100%;margin-top:8px"><tr><th>Figura</th><th>Temps</th><th>Equival a</th></tr><tr><td>Rodona</td><td>4</td><td>2 blanques</td></tr><tr><td>Blanca</td><td>2</td><td>2 negres</td></tr><tr><td>Negra</td><td>1</td><td>2 corxeres</td></tr><tr><td>Corxera</td><td>½</td><td>2 semicorxeres</td></tr><tr><td>Semicorxera</td><td>¼</td><td>—</td></tr></table></div>`);
 const draw=()=>{$('#kst').innerHTML=muStaff([{n:sel.p,d:'r',acc:sel.acc,hi:1,w:60}],{minW:180});$('#knm').textContent=nm();$('#kkb').innerHTML=kb();
  $('#kkb').querySelectorAll('[data-k]').forEach(g=>g.onclick=e=>{e.stopPropagation();sel={p:+g.dataset.k,acc:+g.dataset.a};const ac=muAC();if(ac)muTone(ac,ac.currentTime+.02,muFreq(sel.p,sel.acc),.9);draw()})};
 draw()}
MATERIAL.musica=[{obre:'muTeclat()',nom:'Teclat i pentagrama',desc:'Toca una tecla, escolta-la i mira on s\'escriu',ic:'music'}];
