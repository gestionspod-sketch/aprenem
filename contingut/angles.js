/* Aprenem - contingut d ANGLES (vocabulari, gramatica, verbs, temari)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */
/* ===================== ANGLÈS ===================== */
const norm=s=>String(s||'').toLowerCase().replace(/[’`´]/g,"'").replace(/[.,!?;:"«»¿¡]/g,'').replace(/\s+/g,' ').trim();
function lev(a,b){const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;
 for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]}
const VOCAB=`cat;gat;🐱|dog;gos;🐶|horse;cavall;🐴|cow;vaca;🐮|pig;porc;🐷|sheep;ovella;🐑|rabbit;conill;🐰|bird;ocell;🐦|fish;peix;🐟|mouse;ratolí;🐭|elephant;elefant;🐘|monkey;mona;🐒|lion;lleó;🦁|bear;ós;🐻|frog;granota;🐸|snake;serp;🐍|butterfly;papallona;🦋;1|giraffe;girafa;🦒;1|dolphin;dofí;🐬;1|apple;poma;🍎|banana;plàtan;🍌|bread;pa;🍞|cheese;formatge;🧀|egg;ou;🥚|milk;llet;🥛|orange;taronja;🍊|strawberry;maduixa;🍓;1|carrot;pastanaga;🥕;1|water;aigua;💧|cake;pastís;🍰|tomato;tomàquet;🍅|potato;patata;🥔|book;llibre;|pencil;llapis;|ruler;regle;;1|scissors;tisores;✂️;1|backpack/rucksack/schoolbag;motxilla;🎒;1|computer;ordinador;💻;1|clock;rellotge;🕐|sun;sol;☀️|rain;pluja;🌧️|snow;neu;❄️|cloud;núvol;☁️;1|tree;arbre;🌳|flower;flor;🌸|beach;platja;🏖️|mountain;muntanya;⛰️;1|moon;lluna;🌙|t-shirt/tshirt;camiseta;👕|dress;vestit;👗|socks;calcetins;🧦;1|trousers/pants;pantalons;👖;1|glasses;ulleres;👓;1|umbrella;paraigua;☂️;1|house;casa;🏠|bed;llit;🛏️|chair;cadira;🪑|door;porta;🚪|key;clau;🔑|car;cotxe;🚗|bus;autobús;🚌|train;tren;🚆|plane/aeroplane/airplane;avió;✈️|bike/bicycle;bicicleta;🚲|boat;vaixell;⛵`
 .split('|').map(s=>{const[en,ca,em,h]=s.split(';'),alts=en.split('/');return{en:alts[0],alts,ca,em,h:+(h||0)}});
function pickVocab(lv){const sv=(S.sessio.vocab||[]).filter(w=>w.en&&w.ca);
 if(sv.length>=3){const w=pick(sv);return{en:w.en,alts:[w.en],ca:w.ca,em:w.em||''}}return pick(VOCAB.filter(w=>lv>0||!w.h))}
const EN_SENT=[['I like apples','M\'agraden les pomes'],['She has got a cat','Ella té un gat'],['We go to school by bus','Anem a l\'escola amb autobús'],['The dog is very big','El gos és molt gros'],['It is sunny today','Avui fa sol'],['My brother plays football','El meu germà juga a futbol'],['They are in the park','Són al parc'],['Can you help me','Em pots ajudar?'],['I have got two sisters','Tinc dues germanes'],['What is your name','Com et dius?']];
const PRES=[['play','plays','football every Saturday'],['watch','watches','TV after dinner'],['go','goes','to school by bus'],['study','studies','English on Mondays'],['have','has','breakfast at eight o\'clock'],['wash','washes','the dishes after lunch'],['fly','flies','a kite in the park'],['read','reads','comics at night'],['eat','eats','fruit every day'],['swim','swims','in the sea in summer'],['like','likes','chocolate ice cream'],['ride','rides','a bike to school'],['live','lives','in Palma'],['do','does','homework in the afternoon'],['catch','catches','the bus at eight']];
const BE_S=[['I',0],['You',2],['He',1],['She',1],['We',2],['They',2],['My parents',2],['Anna',1],['My cat',1]];
const BE_R=[['be','eleven years old'],['be','in the classroom'],['be','very happy today'],['be','from Mallorca'],['be','at the beach'],['have','got a new bike'],['have','got blue eyes'],['have','got two brothers']];
const PAST=[['play','played','tennis',0],['watch','watched','a film',0],['visit','visited','my cousins',0],['cook','cooked','dinner',0],['walk','walked','to school',0],['study','studied','for the exam',0],['go','went','to the beach',1],['eat','ate','a big pizza',1],['see','saw','a dolphin',1],['have','had','a party',1],['buy','bought','a new book',1],['swim','swam','in the pool',1],['write','wrote','a letter to my grandma',1],['drink','drank','orange juice',1],['make','made','a cake',1],['come','came','home late',1],['take','took','a lot of photos',1],['run','ran','in the park',1]];
const PLUR=[['cat','cats','🐱'],['dog','dogs','🐶'],['box','boxes','📦'],['bus','buses','🚌'],['watch','watches','⌚'],['baby','babies','👶'],['strawberry','strawberries','🍓'],['dress','dresses','👗'],['toy','toys','🧸'],['key','keys','🔑'],['potato','potatoes','🥔'],['child','children','',1],['man','men','👨',1],['woman','women','👩',1],['mouse','mice','🐭',1],['tooth','teeth','🦷',1],['foot','feet','🦶',1],['sheep','sheep','🐑',1],['fish','fish','🐟',1],['knife','knives','🔪',1],['leaf','leaves','🍃',1]];
const COMP=[['tall','taller','My dad is ___ than me'],['small','smaller','A mouse is ___ than a cat'],['fast','faster','A car is ___ than a bike'],['old','older','My grandma is ___ than my mum'],['big','bigger','An elephant is ___ than a dog'],['hot','hotter','Summer is ___ than winter'],['happy','happier','Today I am ___ than yesterday'],['funny','funnier','This film is ___ than the book'],['easy','easier','This exercise is ___ than the last one'],['beautiful','more beautiful','This beach is ___ than the other one'],['expensive','more expensive','A car is ___ than a bike'],['interesting','more interesting','This book is ___ than that one'],['dangerous','more dangerous','A lion is ___ than a cat'],['good','better','My new bike is ___ than my old one'],['bad','worse','The weather today is ___ than yesterday']];
Object.assign(SK,{
 en_vocab:{mat:'angles',nom:'Vocabulari',ic:'🔤',
  teoria:['Aprendre vocabulari és com omplir una motxilla de paraules: com més en tens, més coses pots dir.','Truc: <b>mira el dibuix, digues la paraula en veu alta i escriu-la</b>. Fixa\'t en les lletres que no sonen com en català.','Exemple: 🐱 gat → <b>cat</b>. 🍎 poma → <b>apple</b> (amb dues p!).'],
  gen(lv){const w=pickVocab(lv),en=w.en;
   return{text:`<div style="font-size:64px;line-height:1.2">${w.em}</div>Com es diu en anglès «<b>${esc(w.ca)}</b>»?`,fields:[{label:'En anglès',txt:w.alts.map(norm)}],vis:null,pron:en,
    hints:[`Comença per «${en[0]}» i té ${en.length} lletres.`,`${en[0]} ${'_ '.repeat(Math.max(0,en.length-2))}${en.length>1?en.slice(-1):''}`],
    steps:[`«${esc(w.ca)}» en anglès és <b>${esc(en)}</b>.`,`S'escriu així: ${esc(en.toUpperCase().split('').join(' - '))}.`,'Digues-la en veu alta tres vegades i escriu-la una vegada al quadern.'],
    err:v=>{const d=lev(v[0],norm(en));return d>0&&d<=2?'en_lletrejat':null}};
  }},
 en_listen:{mat:'angles',nom:'Comprensió oral (listening)',ic:'',
  teoria:['Per entendre l\'anglès parlat cal <b>escoltar molt</b>. Al principi sembla molt ràpid, però l\'orella s\'hi acostuma.','Truc: escolta-ho una vegada sencer, després paraula per paraula, i escriu el que sents.','Recorda que en anglès moltes paraules no s\'escriuen com sonen: «<b>two</b>» sona «tu».'],
  gen(lv){let t,ca;if(lv>0&&Math.random()<.7)[t,ca]=pick(EN_SENT);else{const w=pickVocab(lv);t=w.en;ca=w.ca}
   const words=t.split(' ').length;
   return{text:`Escolta i escriu ${words>1?'la frase':'la paraula'} en anglès.<br><span class="muted" style="font-size:18px">Pitja <svg class="ic" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg> per escoltar-ho tantes vegades com vulguis.</span>`,fields:[{label:'Escriu el que sents',txt:[norm(t)],wide:words>1}],vis:null,listen:t,
    hints:[`Comença per «${t[0]}»${words>1?` i té ${words} paraules`:''}.`,`Vol dir «${esc(ca)}» en català.`],
    steps:[`Has sentit: <b>${esc(t)}</b>.`,`Vol dir: «${esc(ca)}».`,'Escolta-ho una altra vegada mentre ho llegeixes.'],
    err:v=>{const d=lev(v[0],norm(t));return d>0&&d<=Math.max(2,Math.floor(t.length/8))?'en_lletrejat':null}};
  }},
 en_present:{mat:'angles',nom:'Present simple (he/she/it + -s)',ic:'',
  teoria:['El <b>present simple</b> serveix per parlar de coses que fem habitualment: <i>I play football every Saturday</i>.','Amb <b>he, she, it</b> (o un nom com <i>Tom</i> o <i>my sister</i>) el verb porta <b>-s</b>: <i>She play<b>s</b></i>.','Compte amb les terminacions: -o, -sh, -ch, -ss, -x → <b>-es</b> (goes, watches); consonant + y → <b>-ies</b> (studies). <i>Have</i> → <b>has</b>.'],
  gen(lv){const[b,s3,rest]=pick(lv?PRES:PRES.slice(0,10)),third=Math.random()<.65,subj=pick(third?['He','She','My sister','Tom','Our teacher']:['I','You','We','They','My friends']),ans=third?s3:b;
   const rule=b==='have'?'«Have» és irregular: amb he/she/it és <b>has</b>.':s3.endsWith('ies')?'Acaba en consonant + y: canviem la y per <b>-ies</b>.':s3.endsWith('es')?'Acaba en -o, -sh, -ch, -ss o -x: afegim <b>-es</b>.':'Afegim <b>-s</b>.';
   return{text:`Completa amb el verb en present:<br><b>${subj} ___ ${rest}.</b> <span class="muted">(${b})</span>`,fields:[{label:'Verb',txt:[ans]}],vis:null,
    hints:[`Qui és el subjecte? «${subj}» és com ${third?'he, she o it':'I, you, we o they'}.`,third?`Amb he/she/it el verb porta -s. Com acaba «${b}»?`:'Amb I, you, we i they el verb no canvia.'],
    steps:[`El subjecte és «${subj}» → ${third?'tercera persona del singular (he/she/it)':'no és he, she ni it'}.`,third?rule:`El verb es queda igual: <b>${b}</b>.`,`Resposta: ${subj} <b>${ans}</b> ${rest}.`],
    err:v=>(third&&v[0]===b)||(!third&&v[0]===s3)?'en_tercera_persona':(third&&v[0]===b+'s'&&s3!==b+'s'?'en_terminacio':null)};
  }},
 en_be:{mat:'angles',nom:'To be i have got',ic:'🙋',
  teoria:['<b>To be</b> (ser / estar): I <b>am</b> · he, she, it <b>is</b> · we, you, they <b>are</b>.','<b>Have got</b> (tenir): I, you, we, they <b>have got</b> · he, she, it <b>has got</b>.','Exemple: <i>She <b>is</b> my friend. She <b>has</b> got a dog.</i>'],
  gen(){const[verb,rest]=pick(BE_R),[subj,pers]=pick(BE_S),ans=verb==='be'?['am','is','are'][pers]:(pers===1?'has':'have'),pr=['I','he/she/it','we/you/they'][pers];
   return{text:`Completa amb ${verb==='be'?'<b>am</b>, <b>is</b> o <b>are</b>':'<b>have</b> o <b>has</b>'}:<br><b>${subj} ___ ${rest}.</b>`,fields:[{label:'Forma',txt:[ans]}],vis:null,
    hints:[`Quin pronom correspon a «${subj}»? (I, he/she/it, we/you/they)`,verb==='be'?'I → am · he/she/it → is · we/you/they → are':'he/she/it → has · la resta → have'],
    steps:[`«${subj}» és ${pr}.`,`Amb ${pr} fem servir <b>${ans}</b>.`,`Resposta: ${subj} <b>${ans}</b> ${rest}.`],
    err:v=>v[0]!==ans&&['am','is','are','have','has'].includes(v[0])?'en_be':null};
  }},
 en_past:{mat:'angles',nom:'Past simple',ic:'⌛',
  teoria:['El <b>past simple</b> serveix per parlar del passat: <i>Yesterday I play<b>ed</b> tennis</i>.','Els verbs <b>regulars</b> afegeixen <b>-ed</b>: play → played, study → stud<b>ied</b>.','Els verbs <b>irregulars</b> s\'han d\'aprendre de memòria: go → <b>went</b>, eat → <b>ate</b>, see → <b>saw</b>, have → <b>had</b>. Mai «goed»!','El passat és igual per a totes les persones: I went, she went, they went.'],
  gen(lv){const pool=lv?PAST:PAST.slice(0,12),[b,pa,rest,irr]=pick(pool),time=pick(['Yesterday','Last weekend','Last summer','Two days ago']),subj=pick(['I','we','my brother','they','she']),reg=b.endsWith('e')?b+'d':b+'ed';
   return{text:`Completa amb el verb en passat:<br><b>${time} ${subj} ___ ${rest}.</b> <span class="muted">(${b})</span>`,fields:[{label:'Verb en passat',txt:[pa]}],vis:null,
    hints:[`Mira «${time}»: l'acció ja ha passat.`,irr?`«${b}» és un verb irregular: no acaba en -ed. Te'n recordes?`:`«${b}» és regular: afegeix -ed${b.endsWith('y')?' (compte: consonant + y → -ied)':''}.`],
    steps:[`«${time}» indica passat.`,irr?`«${b}» és irregular: el passat és <b>${pa}</b>.`:`«${b}» és regular: ${b} + ed → <b>${pa}</b>.`,`Resposta: ${time} ${subj} <b>${pa}</b> ${rest}.`],
    err:v=>[b,b+'s',b+'es'].includes(v[0])?'en_passat_no':(irr&&(v[0]===reg||v[0]===b+'ed')?'en_irregular':null)};
  }},
 en_plural:{mat:'angles',nom:'Plurals',ic:'👯',
  teoria:['La majoria de paraules fan el plural amb <b>-s</b>: cat → cats.','-s, -sh, -ch, -x, -o → <b>-es</b> (box → boxes) · consonant + y → <b>-ies</b> (baby → babies) · -f/-fe → <b>-ves</b> (knife → knives).','Alguns plurals són <b>irregulars</b>: child → children, man → men, mouse → mice, tooth → teeth, foot → feet, sheep → sheep.'],
  gen(lv){const pool=lv?PLUR:PLUR.filter(x=>!x[3]||['child','man','woman'].includes(x[0])),[s,pl,em,irr]=pick(pool);
   const rule=irr?'és un plural irregular':pl.endsWith('ies')?'consonant + y → -ies':pl.endsWith('es')?'afegim -es':'afegim -s';
   return{text:`Escriu el plural:<br>${em} one <b>${s}</b> → ${em}${em} two ___`,fields:[{label:'Plural',txt:[pl]}],vis:null,
    hints:[`Com acaba «${s}»? Recorda les regles de la teoria.`,irr?'És un plural irregular: no segueix la regla de la -s.':`Regla: ${rule}.`],
    steps:[`«${s}»: ${rule}.`,`one ${s} → two <b>${pl}</b>.`,'Escriu-ne tres frases al quadern: «I have got two ...».'],
    err:v=>v[0]===s+'s'&&pl!==s+'s'?'en_plural_regla':null};
  }},
 en_compar:{mat:'angles',nom:'Comparatius',ic:'⚖️',
  teoria:['Per comparar dues coses fem servir el <b>comparatiu + than</b>: <i>A dog is bigger <b>than</b> a cat</i>.','Adjectius curts → <b>-er</b>: tall → taller. Si acaben en vocal + consonant, la doblam: big → bi<b>gg</b>er. Si acaben en y → <b>-ier</b>: happy → happier.','Adjectius llargs → <b>more</b> + adjectiu: more beautiful. Irregulars: good → <b>better</b>, bad → <b>worse</b>.'],
  gen(lv){const[a,c,sent]=pick(lv?COMP:COMP.slice(0,10));
   const why=a==='good'||a==='bad'?'és irregular':c.startsWith('more')?'és un adjectiu llarg → more + adjectiu':c.endsWith('ier')?'acaba en y → -ier':(/(.)\1er$/.test(c)&&!/(.)\1$/.test(a))?'acaba en vocal + consonant → doblam la consonant i afegim -er':'és curt → afegim -er';
   return{text:`Completa amb el comparatiu:<br><b>${sent}.</b> <span class="muted">(${a})</span>`,fields:[{label:'Comparatiu',txt:[c],wide:c.includes(' ')}],vis:null,
    hints:[`«${a}» és un adjectiu curt o llarg? És irregular?`,`«${a}» ${why}.`],
    steps:[`«${a}» ${why}.`,`${a} → <b>${c}</b>.`,`Resposta: ${sent.replace('___','<b>'+c+'</b>')}.`],
    err:v=>v[0]!==c&&[`more ${a}`,a+'er',a+'r',`more ${c}`].includes(v[0])?'en_comparatiu':null};
  }}
});
/* ===================== ANGLÈS: VERBS I TEMPS VERBALS ===================== */
// infinitiu;passat;participi;significat;nivell (0 = bàsic 5è, 1 = ampliació 6è)
const IRR=`be;was/were;been;ser/estar;0|become;became;become;convertir-se/tornar-se;1|begin;began;begun;començar;1|bite;bit;bitten;mossegar;1|blow;blew;blown;bufar;1|break;broke;broken;trencar;0|bring;brought;brought;portar/dur;0|build;built;built;construir;1|buy;bought;bought;comprar;0|catch;caught;caught;agafar/atrapar;1|choose;chose;chosen;triar/escollir;1|come;came;come;venir;0|cost;cost;cost;costar;1|cut;cut;cut;tallar;0|do;did;done;fer;0|draw;drew;drawn;dibuixar;0|drink;drank;drunk;beure;0|drive;drove;driven;conduir;1|eat;ate;eaten;menjar;0|fall;fell;fallen;caure;0|feel;felt;felt;sentir-se/sentir;1|fight;fought;fought;lluitar/barallar-se;1|find;found;found;trobar;0|fly;flew;flown;volar;0|forget;forgot;forgotten;oblidar;1|get;got;got;aconseguir/obtenir/rebre;0|give;gave;given;donar;0|go;went;gone;anar;0|grow;grew;grown;créixer;1|have;had;had;tenir;0|hear;heard;heard;sentir/escoltar;1|hide;hid;hidden;amagar/amagar-se;1|hit;hit;hit;colpejar/pegar;1|hold;held;held;aguantar/sostenir;1|hurt;hurt;hurt;fer mal;1|keep;kept;kept;guardar/mantenir;1|know;knew;known;saber/conèixer;0|learn;learnt/learned;learnt/learned;aprendre;1|leave;left;left;marxar/deixar/sortir;1|lend;lent;lent;deixar/prestar;1|lose;lost;lost;perdre;0|make;made;made;fer/fabricar;0|meet;met;met;conèixer/trobar-se;1|pay;paid;paid;pagar;1|put;put;put;posar;0|read;read;read;llegir;0|ride;rode;ridden;muntar/anar en;0|ring;rang;rung;sonar/trucar;1|run;ran;run;córrer;0|say;said;said;dir;0|see;saw;seen;veure;0|sell;sold;sold;vendre;1|send;sent;sent;enviar;1|sing;sang;sung;cantar;0|sit;sat;sat;seure/asseure's;0|sleep;slept;slept;dormir;0|speak;spoke;spoken;parlar;1|spend;spent;spent;gastar/passar;1|stand;stood;stood;estar dret/aixecar-se;1|steal;stole;stolen;robar;1|swim;swam;swum;nedar;0|take;took;taken;agafar/prendre/dur;0|teach;taught;taught;ensenyar;1|tell;told;told;dir/explicar/contar;0|think;thought;thought;pensar/creure;0|throw;threw;thrown;tirar/llançar;1|understand;understood;understood;entendre;1|wake;woke;woken;despertar-se/despertar;1|wear;wore;worn;portar/dur;1|win;won;won;guanyar;0|write;wrote;written;escriure;0`
 .split('|').map(s=>{const[b,p,pp,ca,h]=s.split(';');return{b,p:p.split('/'),pp:pp.split('/'),ca:ca.split('/'),h:+h,irr:1}});
const DOUBLE=['stop','plan','travel','drop','chat','jog','clap'];
const regPast=b=>DOUBLE.includes(b)?b+b.slice(-1)+'ed':/e$/.test(b)?b+'d':/[^aeiou]y$/.test(b)?b.slice(0,-1)+'ied':b+'ed';
const regRule=b=>DOUBLE.includes(b)?'vocal curta + consonant → doblam la consonant i + -ed':/e$/.test(b)?'acaba en -e → només + -d':/[^aeiou]y$/.test(b)?'consonant + y → canviem la y per -ied':'afegim -ed';
const REG=`play;jugar|watch;mirar/veure|visit;visitar|cook;cuinar|walk;caminar|talk;parlar|listen;escoltar|help;ajudar|clean;netejar|open;obrir|close;tancar|jump;botar/saltar|dance;ballar|like;agradar|love;estimar/encantar|live;viure|arrive;arribar|use;fer servir/usar/utilitzar|study;estudiar|try;provar/intentar|cry;plorar|carry;dur/portar;1|stop;aturar/aturar-se/parar|plan;planificar/planejar;1|travel;viatjar;1|want;voler|need;necessitar|start;començar|finish;acabar|paint;pintar|climb;escalar/enfilar-se;1|wash;rentar|brush;raspallar|enjoy;gaudir;1|stay;quedar-se|drop;deixar caure;1|chat;xerrar;1|jog;córrer/fer fúting;1|clap;aplaudir;1|tidy;ordenar;1|hurry;afanyar-se;1`
 .split('|').map(s=>{const[b,ca,h]=s.split(';'),p=regPast(b);return{b,p:b==='travel'?[p,'traveled']:[p],pp:[p],ca:ca.split('/'),h:+(h||0),irr:0}});
const ALLV=[...IRR,...REG];
const caList=v=>v.ca.join(' / ');
const enFor=ca=>ALLV.filter(v=>v.ca.some(c=>fold(c)===fold(ca))).map(v=>v.b);
const vpool=(a,lv)=>a.filter(v=>lv>0||!v.h);
const FAM=[{n:'acaben en -ought / -aught',v:['bring','buy','fight','think','catch','teach']},{n:'canvien la i per a',v:['begin','drink','ring','sing','swim']},{n:'acaben en -ew',v:['blow','draw','fly','grow','know','throw']},{n:'les tres formes iguals',v:['cost','cut','hit','hurt','put','read']},{n:'acaben en -t',v:['feel','keep','leave','lend','sleep','spend','send','build','lose','meet']}];
const famHint=b=>{const f=FAM.find(f=>f.v.includes(b));if(!f)return'';return` És de la família dels verbs que ${f.n}, com ${f.v.filter(x=>x!==b).slice(0,2).map(x=>`${x} → ${IRR.find(i=>i.b===x).p[0]}`).join(' i ')}.`};
const EV='Verbs i temps verbals';
const SUBJ_PRON=[['I',0],['He',1],['She',1],['My sister',1],['We',2],['They',2],['You',2],['My friends',2]];
const CONT=[['play','playing','football in the park'],['read','reading','a comic'],['watch','watching','a film'],['eat','eating','a sandwich'],['run','running','in the park'],['swim','swimming','in the pool'],['make','making','a cake'],['write','writing','an email'],['dance','dancing','in the living room'],['sit','sitting','on the sofa'],['ride','riding','a bike'],['sleep','sleeping','on the bed'],['drink','drinking','orange juice'],['paint','painting','a picture'],['cook','cooking','dinner'],['study','studying','for the exam']];
const WAS_R=['at home yesterday','very tired last night','in Menorca last summer','at the cinema on Saturday','happy at the party','late for school this morning','in the garden two hours ago'];
Object.assign(SK,{
 en_cont:{mat:'angles',bloc:EV,nom:'Present continuous (-ing)',ic:'▶️',
  teoria:['El <b>present continuous</b> serveix per dir el que està passant <b>ara mateix</b>: <i>Look! It is raining.</i>','Es forma amb <b>am / is / are</b> + verb acabat en <b>-ing</b>: I <b>am</b> read<b>ing</b> · she <b>is</b> play<b>ing</b> · they <b>are</b> swimm<b>ing</b>.',`<table class="mini"><tr><th>Regla</th><th>Exemple</th></tr><tr><td>Normalment: + <b>-ing</b></td><td>play → playing</td></tr><tr><td>Acaba en -e: treim la e</td><td>make → making</td></tr><tr><td>Vocal curta + consonant: doble</td><td>run → running, swim → swimming</td></tr></table>`],
  gen(){const[b,ing,rest]=pick(CONT),[subj,pers]=pick(SUBJ_PRON),be=['am','is','are'][pers],ans=`${be} ${ing}`,wrongIng=b+'ing';
   return{text:`${pick(['Look!','Now','At the moment','Listen!'])} ${subj} ___ ${rest}. <span class="muted">(${b})</span>`,fields:[{label:'am / is / are + -ing',txt:[ans],wide:true}],vis:null,
    hints:[`Primer: quina forma de <b>to be</b> va amb «${subj}»? (am, is, are)`,ing===wrongIng?'Després afegeix -ing al verb.':`Compte amb l'ortografia de l'-ing: ${b.endsWith('e')?'treu la e final':'dobla la consonant final'}.`],
    steps:[`«${subj}» → <b>${be}</b>.`,`${b} + ing → <b>${ing}</b>${ing!==wrongIng?` (${b.endsWith('e')?'treim la e':'doblam la consonant'})`:''}.`,`Resposta: ${subj} <b>${ans}</b> ${rest}.`],
    err:v=>v[0]===`${be} ${b}`?'en_cont_ing':(ing!==wrongIng&&v[0]===`${be} ${wrongIng}`?'en_cont_spell':(['am','is','are'].some(x=>x!==be&&v[0]===`${x} ${ing}`)?'en_be':null))}}},
 en_was:{mat:'angles',bloc:EV,nom:'Was / were (passat de to be)',ic:'🕰️',
  teoria:['El passat de <b>to be</b> té dues formes: <b>was</b> i <b>were</b>.','I, he, she, it → <b>was</b> · you, we, they → <b>were</b>. Exemple: <i>I <b>was</b> at home. They <b>were</b> at school.</i>','Negativa: <b>wasn\'t</b> / <b>weren\'t</b>. Pregunta: <i><b>Were</b> you happy?</i>'],
  gen(lv){const[subj,pers]=pick([['I',0],['He',0],['She',0],['It',0],['My dog',0],['You',1],['We',1],['They',1],['My parents',1]]),rest=pick(WAS_R),neg=lv>0&&Math.random()<.4,
   ans=neg?(pers?["weren't",'were not']:["wasn't",'was not']):[pers?'were':'was'];
   return{text:`Completa amb <b>${neg?'wasn\'t o weren\'t':'was o were'}</b>:<br><b>${subj} ___ ${rest}.</b>`,fields:[{label:'Forma',txt:ans,wide:neg}],vis:null,
    hints:[`«${subj}» és com ${pers?'you, we o they':'I, he, she o it'}.`,pers?'you / we / they → were':'I / he / she / it → was'],
    steps:[`«${subj}» → ${pers?'you/we/they':'I/he/she/it'}.`,`Per tant: <b>${ans[0]}</b>.`,`${subj} <b>${ans[0]}</b> ${rest}.`],
    err:v=>['was','were',"wasn't","weren't",'was not','were not'].includes(v[0])&&!ans.includes(v[0])?'en_was':null}}},
 en_reg_past:{mat:'angles',bloc:EV,nom:'Passat dels verbs regulars (-ed)',ic:'',
  teoria:['Els verbs <b>regulars</b> fan el passat afegint <b>-ed</b>: play → play<b>ed</b>, watch → watch<b>ed</b>.',`<table class="mini"><tr><th>Regla</th><th>Exemple</th></tr><tr><td>Normalment: + <b>-ed</b></td><td>walk → walked</td></tr><tr><td>Acaba en -e: només + <b>-d</b></td><td>dance → danced</td></tr><tr><td>Consonant + y: <b>-ied</b></td><td>study → studied</td></tr><tr><td>Vocal + y: + -ed</td><td>play → played</td></tr><tr><td>Vocal curta + consonant: <b>doble</b></td><td>stop → stopped</td></tr></table>`,'El passat és igual per a totes les persones: I played, she played, they played.'],
  gen(lv){const x=pick(vpool(REG,lv));
   return{text:`Escriu el <b>passat simple</b> de «<b>${x.b}</b>»<br><span class="muted" style="font-size:18px">(${caList(x)})</span>`,fields:[{label:'Passat',txt:x.p}],vis:null,pron:`${x.b}, ${x.p[0]}`,
    hints:[`És un verb regular. Com acaba «${x.b}»? Repassa les regles de la taula.`,`Regla: ${regRule(x.b)}.`],
    steps:[`«${x.b}» és regular: ${regRule(x.b)}.`,`${x.b} → <b>${x.p[0]}</b>.`],
    err:v=>!x.p.includes(v[0])&&[x.b+'ed',x.b+'d',x.b+x.b.slice(-1)+'ed',x.b.slice(0,-1)+'ied',x.b+'eed'].includes(v[0])?'en_reg_regla':(v[0]===x.b?'en_passat_no':null)}}},
 en_irr_past:{mat:'angles',bloc:EV,nom:'Passat dels verbs irregulars',ic:'🔀',
  teoria:['Els verbs <b>irregulars</b> no fan el passat amb -ed: cada un té una forma pròpia que cal aprendre.',`<table class="mini"><tr><th>Infinitiu</th><th>Passat</th><th>Significat</th></tr><tr><td>go</td><td><b>went</b></td><td>anar</td></tr><tr><td>eat</td><td><b>ate</b></td><td>menjar</td></tr><tr><td>see</td><td><b>saw</b></td><td>veure</td></tr><tr><td>have</td><td><b>had</b></td><td>tenir</td></tr><tr><td>buy</td><td><b>bought</b></td><td>comprar</td></tr></table>`,'Truc: aprèn-los per <b>famílies</b>: bought, brought, thought (acaben en -ought); sang, drank, swam (canvien la i per a). Els tens tots a la <b>Taula de verbs</b>.'],
  gen(lv){const x=pick(vpool(IRR,lv));
   return{text:`Quin és el <b>passat simple</b> de «<b>${x.b}</b>»?<br><span class="muted" style="font-size:18px">(${caList(x)})</span>`,fields:[{label:'Passat',txt:x.b==='be'?['was','were','was/were','was were','was or were']:x.p}],vis:null,pron:`${x.b}, ${x.p.join(', ')}`,
    hints:[`És un verb irregular: no acaba en -ed.${famHint(x.b)}`,`Comença per «${x.p[0][0]}» i té ${x.p[0].length} lletres.`],
    steps:[`«${x.b}» (${caList(x)}) és un verb irregular.`,`El seu passat és <b>${x.p.join(' / ')}</b>.`,`Repeteix-ho en veu alta: ${x.b} – ${x.p[0]} – ${x.pp[0]}.`],
    err:v=>x.p.includes(v[0])?null:(v[0]===x.b+'ed'||v[0]===regPast(x.b)?'en_irregular':(v[0]===x.b?'en_passat_no':null))}}},
 en_irr_pp:{mat:'angles',bloc:EV,nom:'Participi dels verbs irregulars',ic:'',
  teoria:['Cada verb té <b>tres formes</b>: infinitiu, passat simple i <b>participi</b>: <i>go – went – <b>gone</b></i>, <i>eat – ate – <b>eaten</b></i>.','El participi es fa servir en temps com el <b>present perfect</b> (<i>I have <b>eaten</b></i>), que treballareu més a l\'ESO. Per això convé aprendre\'l ja ara, juntament amb el passat.','En els verbs regulars, el participi és igual que el passat: <i>play – played – played</i>. En molts irregulars també: <i>buy – bought – bought</i>.'],
  gen(lv){const x=pick(vpool(IRR,lv));
   return{text:`Quin és el <b>participi</b> de «<b>${x.b}</b>»?<br><span class="muted" style="font-size:18px">(${caList(x)} · passat: ${x.p.join(' / ')})</span>`,fields:[{label:'Participi',txt:x.pp}],vis:null,pron:`${x.b}, ${x.p[0]}, ${x.pp[0]}`,
    hints:[x.pp[0]===x.p[0]?'En aquest verb, el participi i el passat s\'assemblen molt.':'En aquest verb, el participi és diferent del passat.',`Comença per «${x.pp[0][0]}» i té ${x.pp[0].length} lletres.`],
    steps:[`Les tres formes de «${x.b}» són: ${x.b} – ${x.p[0]} – <b>${x.pp[0]}</b>.`,`Exemple: I have <b>${x.pp[0]}</b>... (present perfect).`],
    err:v=>x.pp.includes(v[0])?null:(x.p.includes(v[0])?'en_pp_passat':(v[0]===x.b+'ed'?'en_irregular':null))}}},
 en_irr_inf:{mat:'angles',bloc:EV,nom:'De quin verb ve? (passat → infinitiu)',ic:'↩️',
  teoria:['Quan llegim un text en passat, hem de saber <b>de quin verb ve</b> cada forma per entendre\'l i per trobar-lo al diccionari.','Exemple: «Yesterday I <b>bought</b> a book» → <i>bought</i> ve de <b>buy</b> (comprar).','Al diccionari i a la taula de verbs, els verbs sempre apareixen en <b>infinitiu</b>.'],
  gen(lv){const x=pick(vpool(IRR,lv).filter(v=>v.b!=='be'&&v.p[0]!==v.b)),p=pick(x.p);
   return{text:`«<b>${p}</b>» és el passat de quin verb?<br><span class="muted" style="font-size:18px">Escriu l'infinitiu</span>`,fields:[{label:'Infinitiu',txt:IRR.filter(v=>v.p.includes(p)).map(v=>v.b)}],vis:null,pron:`${x.b}, ${p}`,
    hints:[`Vol dir «${x.ca[0]}».`,`Comença per «${x.b[0]}» i té ${x.b.length} lletres.`],
    steps:[`«${p}» és el passat de <b>${x.b}</b>.`,`«${x.b}» vol dir «${caList(x)}».`,`${x.b} – ${p} – ${x.pp[0]}.`]}}},
 en_verb_sig:{mat:'angles',bloc:EV,nom:'Significat dels verbs',ic:'',
  teoria:['Per parlar i escriure en anglès necessites conèixer el <b>significat</b> dels verbs més freqüents.','Alguns verbs anglesos tenen <b>més d\'un significat</b>: <i>get</i> = aconseguir, rebre...; <i>take</i> = agafar, prendre, dur.','I alguns verbs catalans es diuen de dues maneres en anglès: <b>parlar</b> = speak / talk; <b>dir</b> = say / tell.'],
  gen(lv){const x=pick(vpool(ALLV,lv)),toCa=Math.random()<.55;
   if(toCa)return{text:`Què vol dir el verb «<b>${x.b}</b>»?`,fields:[{label:'En català',txt:x.ca,loose:true,wide:true}],vis:null,pron:x.b,
    hints:[`Comença per «${x.ca[0][0].toUpperCase()}».`,`Té ${[...x.ca[0]].length} lletres${x.ca.length>1?' (hi ha més d\'una resposta correcta)':''}.`],
    steps:[`«${x.b}» vol dir <b>${caList(x)}</b>.`,`El seu passat és «${x.p[0]}» (${x.irr?'irregular':'regular'}).`]};
   const c=x.ca[0],en=enFor(c);
   return{text:`Com es diu «<b>${c}</b>» en anglès?<br><span class="muted" style="font-size:18px">Escriu l'infinitiu</span>`,fields:[{label:'En anglès',txt:en}],vis:null,pron:x.b,
    hints:[`El seu passat és «${x.p[0]}».`,`Comença per «${x.b[0]}» i té ${x.b.length} lletres.`],
    steps:[`«${c}» en anglès és <b>${en.join(' / ')}</b>.`,`Passat: ${x.p[0]} (${x.irr?'irregular':'regular'}).`],
    err:v=>{const d=lev(v[0],x.b);return d>0&&d<=1?'en_lletrejat':null}}}},
 en_past_neg:{mat:'angles',bloc:EV,nom:'Past simple: negatives i preguntes',ic:'❓',
  teoria:['En <b>negativa</b>, el past simple fa servir <b>didn\'t</b> + verb en <b>infinitiu</b>: <i>I <b>didn\'t go</b> to school.</i> (mai «didn\'t went»!)','A les <b>preguntes</b>, posam <b>Did</b> al principi i el verb en <b>infinitiu</b>: <i><b>Did</b> you <b>see</b> the film?</i>','Respostes curtes: <i>Yes, I did. / No, I didn\'t.</i> Compte: <b>did</b> ja indica el passat, per això el verb queda en infinitiu.'],
  gen(lv){const[b,pa,rest]=pick(lv?PAST:PAST.slice(0,12)),time=pick(['yesterday','last weekend','last summer','two days ago']);
   if(lv>0&&Math.random()<.5){const qs=pick(['you','she','they','your brother']);
    return{text:`Completa la <b>pregunta</b> en passat:<br><b>___ ${qs} ___ ${rest} ${time}?</b> <span class="muted">(${b})</span>`,fields:[{label:'1a paraula',txt:['did']},{label:'2a paraula',txt:[b]}],vis:null,
     hints:['Les preguntes en passat comencen amb un verb auxiliar de tres lletres.','Després de «Did» el verb va en infinitiu.'],
     steps:['Pregunta en passat: <b>Did</b> + subjecte + verb en <b>infinitiu</b>.',`El verb queda en infinitiu: <b>${b}</b> (no «${pa}»).`,`<b>Did</b> ${qs} <b>${b}</b> ${rest} ${time}?`],
     err:v=>v[1]===pa&&pa!==b?'en_did_inf':(['do','does'].includes(v[0])?'en_did_temps':null)}}
   const subj=pick(['I','You','We','They','She','He','My brother']);
   return{text:`Transforma en <b>negativa</b>:<br><i>${subj} ${pa} ${rest} ${time}.</i><br><b>${subj} ___ ${rest} ${time}.</b>`,fields:[{label:'Verb en negativa (2 paraules)',txt:[`didn't ${b}`,`did not ${b}`,`didnt ${b}`],wide:true}],vis:null,
    hints:['En negativa, el past simple fa servir un auxiliar: didn\'t.',`Després de didn't, el verb va en infinitiu. Quin és l'infinitiu de «${pa}»?`],
    steps:['Negativa del past simple: subjecte + <b>didn\'t</b> + verb en <b>infinitiu</b>.',`L'infinitiu de «${pa}» és <b>${b}</b>.`,`${subj} <b>didn't ${b}</b> ${rest} ${time}.`],
    err:v=>pa!==b&&[`didn't ${pa}`,`did not ${pa}`,`didnt ${pa}`].includes(v[0])?'en_did_inf':([`don't ${b}`,`doesn't ${b}`].includes(v[0])?'en_did_temps':null)}}}
});
['en_present','en_be','en_past'].forEach(k=>SK[k].bloc=EV);
['en_plural','en_compar'].forEach(k=>SK[k].bloc='Gramàtica');
['en_vocab','en_listen'].forEach(k=>SK[k].bloc='Vocabulari i comprensió');
SK.en_past.nom='Past simple en frases';
const SK_ORDER=['en_present','en_cont','en_be','en_was','en_reg_past','en_irr_past','en_irr_pp','en_irr_inf','en_verb_sig','en_past','en_past_neg','en_plural','en_compar','en_vocab','en_listen'];
const skillsOf=m=>Object.keys(SK).filter(k=>matOf(k)===m).sort((a,b)=>{const ia=SK_ORDER.indexOf(a),ib=SK_ORDER.indexOf(b);return(ia<0?99:ia)-(ib<0?99:ib)});
const TEMARI={angles:{5:[
  ['Vocabulari: família, escola, roba, menjar, animals, casa, temps',['en_vocab','en_listen']],
  ['To be i have got',['en_be']],
  ['Present simple: rutines i hàbits (he/she/it + -s)',['en_present']],
  ['Present continuous: el que passa ara (am/is/are + -ing)',['en_cont']],
  ['Was / were: el passat de to be',['en_was']],
  ['Past simple dels verbs regulars (-ed)',['en_reg_past']],
  ['Primers verbs irregulars: go, eat, have, see, buy...',['en_irr_past','en_verb_sig']],
  ['Plurals regulars i irregulars',['en_plural']],
  ['Can / can\'t: habilitats',[]],['There is / there are',[]],['Preposicions de lloc (in, on, under, next to...)',[]]],
 6:[
  ['Past simple: verbs regulars i irregulars',['en_reg_past','en_irr_past','en_irr_inf']],
  ['Significat dels verbs més freqüents',['en_verb_sig']],
  ['Les tres formes dels irregulars: infinitiu, passat i participi',['en_irr_pp']],
  ['Past simple en frases',['en_past']],
  ['Past simple: frases negatives i preguntes (did / didn\'t)',['en_past_neg']],
  ['Present simple i present continuous',['en_present','en_cont']],
  ['Comparatius',['en_compar']],
  ['Vocabulari i comprensió oral',['en_vocab','en_listen']],
  ['Going to: plans de futur',[]],['Will: prediccions',[]],['Must / mustn\'t: normes',[]],['Some / any: comptables i incomptables',[]],['Preguntes amb wh- (what, where, when, who...)',[]]]}};

/* Unitats d'ANGLÈS: [nom, [temes], (opcional) [cursos]] */
UNITS.angles=[
 ['Verbs i temps verbals',['en_present','en_cont','en_be','en_was','en_reg_past','en_irr_past','en_irr_pp','en_irr_inf','en_verb_sig','en_past','en_past_neg']],
 ['Gramàtica',['en_plural','en_compar']],
 ['Vocabulari i comprensió',['en_vocab','en_listen']]];
// Material propi d'Anglès (es mostra a la pàgina de l'assignatura)
MATERIAL.angles=[{obre:"verbTable('irr','angles')",ic:'book',nom:'Taula de verbs',desc:'Infinitiu, passat, participi i traducció'},{obre:'temariAngles()',ic:'list',nom:'Temari de 5è i 6è',desc:'Què s\'aprèn a cada curs'}];

