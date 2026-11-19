/* Aprenem - ANGLÈS: temari complet de 6è de Primària
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.

   Fonts:
   - Decret 31/2022, d'1 d'agost, pel qual s'estableix el currículum de l'educació primària a les
     Illes Balears (BOIB), àrea de Llengua estrangera, sabers bàsics del 3r cicle. (El Decret 32/2022
     és el de l'ESO.) Desenvolupa el Reial decret 157/2022 (LOMLOE), annex II, Lengua Extranjera,
     tercer ciclo: funcions comunicatives (descriure persones, objectes i llocs; situar fets en el
     temps i l'espai; expressar gustos, habilitat, obligació i consell; narrar fets passats; parlar
     de plans i prediccions; demanar i donar informació), unitats lingüístiques (expressió de
     l'entitat, la quantitat, l'espai, el temps, l'afirmació, la negació i la interrogació), lèxic
     d'ús comú (vida quotidiana, oci, salut, educació, feines, ciutat, entorn natural, tecnologia),
     comprensió de textos breus i convencions ortogràfiques.
   - Estructura habitual dels llibres d'anglès de 6è de Primària (8-9 unitats temàtiques de
     vocabulari + gramàtica): present simple i continuous, adverbis de freqüència, preguntes amb wh-,
     possessius, there is/are/was/were, some/any, much/many, comparatius i superlatius,
     can/must/should, past simple (regular, irregular, was/were, didn't, did...?), going to, will,
     present perfect (ever/never) i preposicions de lloc i de temps.

   Aquest arxiu només afegeix temes (curs:[6]) i les unitats de 6è. Es carrega després d'angles.js
   i fa servir les seves dades (IRR, REG, regPast, PRES, CONT, COMP, norm, lev). */
(()=>{
const EV='Verbs i temps verbals',GR='Gramàtica',VC='Vocabulari i comprensió';
// Variants acceptades d'una resposta: contraccions (doesn't / does not / doesnt, can't / cannot...)
const A=(...a)=>[...new Set(a.flat().flatMap(s=>{const f=s.replace(/can't/g,'cannot').replace(/won't/g,'will not').replace(/n't/g,' not');
 return[s,f,s.replace(/can't/g,'can not'),s.replace(/'/g,''),f.replace(/'/g,'')]}).map(norm))];
const s3=b=>b==='be'?'is':b==='have'?'has':b==='do'?'does':b==='go'?'goes':/(s|sh|ch|x|o|z)$/.test(b)?b+'es':/[^aeiou]y$/.test(b)?b.slice(0,-1)+'ies':b+'s';
const pastOf=b=>{const i=IRR.find(v=>v.b===b);return i?i.p:[regPast(b)]};
const ppOf=b=>{const i=IRR.find(v=>v.b===b);return i?i.pp:[regPast(b)]};
const cap=s=>s[0].toUpperCase()+s.slice(1);
const mut=s=>`<span class="muted">(${s})</span>`;
// Subjectes: [com s'escriu a l'inici, a dins una pregunta, persona: 0 = I, 1 = he/she/it, 2 = we/you/they]
const SUBJ6=[['I','I',0],['He','he',1],['She','she',1],['Tom','Tom',1],['My sister','my sister',1],['Our teacher','our teacher',1],['We','we',2],['They','they',2],['You','you',2],['My friends','my friends',2]];
const BE=['am','is','are'];
const tbl=(h,rows)=>`<table class="mini"><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table>`;

Object.assign(ERR,{
 en_do_does:{kid:'Mira el subjecte: amb he, she, it fem servir <b>does / doesn\'t</b>; amb I, you, we, they, <b>do / don\'t</b>.',par:'Confon do i does (don\'t / doesn\'t)'},
 en_does_s:{kid:'Compte! Després de do, does, don\'t o doesn\'t el verb va en infinitiu, sense -s.',par:'Posa la -s al verb després de does / doesn\'t («doesn\'t plays»)'},
 en_resposta_curta:{kid:'A la resposta curta no repetim el verb: només l\'auxiliar (Yes, I do. / No, she doesn\'t.).',par:'No sap formar les respostes curtes (Yes, I do / No, she doesn\'t)'},
 en_freq_pos:{kid:'Les paraules són bones, però l\'adverbi no és al seu lloc: va <b>davant</b> del verb, però <b>darrere</b> de am / is / are.',par:'Col·loca malament els adverbis de freqüència'},
 en_simple_cont:{kid:'Mira l\'expressió de temps: «every day, usually, on Mondays...» → present simple · «now, Look!, at the moment» → present continuous.',par:'Confon el present simple i el present continuous'},
 en_wh:{kid:'Mira la resposta: parla d\'un lloc, d\'una persona, d\'un moment, d\'una quantitat...? Tria la paraula interrogativa que hi correspon.',par:'Confon les paraules interrogatives (what, where, when, who...)'},
 en_his_her:{kid:'Compte! <b>his</b> és d\'un noi o d\'un home; <b>her</b>, d\'una noia o d\'una dona.',par:'Confon his i her'},
 en_its:{kid:'<b>it\'s</b> vol dir «it is». El possessiu és <b>its</b>, sense apòstrof.',par:'Confon its i it\'s'},
 en_poss:{kid:'Revisa de qui és: I → my · you → your · he → his · she → her · it → its · we → our · they → their.',par:'Confon els adjectius possessius'},
 en_poss_pron:{kid:'Quan darrere no hi ha cap nom, fem servir el pronom: my → <b>mine</b>, your → <b>yours</b>, her → <b>hers</b>...',par:'Confon adjectius i pronoms possessius (my / mine)'},
 en_poss_apos:{kid:'Els pronoms possessius no porten apòstrof: <b>hers, yours, ours, theirs</b>.',par:'Posa apòstrof als pronoms possessius («her\'s»)'},
 en_genitiu:{kid:'En anglès, per dir de qui és una cosa, posam primer el propietari amb <b>\'s</b> i després la cosa: Laura\'s bike.',par:'No fa servir bé el genitiu saxó (\'s)'},
 en_genitiu_pl:{kid:'Si el propietari és un plural acabat en -s, només hi posam l\'apòstrof: my parents<b>\'</b> house.',par:'Errors amb el genitiu saxó en plural'},
 en_super_the:{kid:'Gairebé! El superlatiu sempre porta <b>the</b> davant: the tallest, the most beautiful.',par:'Oblida «the» davant el superlatiu'},
 en_comp_sup:{kid:'Compte! Si comparam dues coses (than) → comparatiu. Si és el número u d\'un grup (in the world, in the class) → superlatiu.',par:'Confon comparatiu i superlatiu'},
 en_superlatiu:{kid:'Revisa el superlatiu: curts → the + -est; llargs → the most + adjectiu; good → the best; bad → the worst.',par:'Forma malament els superlatius'},
 en_modal:{kid:'Fixa\'t en la frase en català: és saber fer una cosa (can), demanar permís (can), una obligació (must), una prohibició (mustn\'t) o un consell (should)?',par:'Confon els verbs modals (can, must, should)'},
 en_modal_to:{kid:'Després de can, must i should no hi va <b>to</b>: must go (no «must to go»).',par:'Posa «to» després d\'un verb modal'},
 en_modal_inf:{kid:'Després de can, must i should el verb va en infinitiu, sense -s: she can swim.',par:'Posa -s al verb després d\'un modal («can swims»)'},
 en_there:{kid:'Mira si és singular o plural: una cosa → there is / was · més d\'una → there are / were.',par:'Confon there is / there are (singular i plural)'},
 en_there_temps:{kid:'Mira quan passa: ara → is / are · en el passat → was / were.',par:'Confon there is / are amb there was / were'},
 en_some_any:{kid:'Recorda: <b>some</b> en frases afirmatives · <b>any</b> en frases negatives i preguntes.',par:'Confon some i any'},
 en_much_many:{kid:'Ho pots comptar? Sí → <b>many</b> (many apples) · No → <b>much</b> (much water).',par:'Confon much i many (comptables i incomptables)'},
 en_going_be:{kid:'Falta el verb to be! Going to va amb am / is / are: I <b>am</b> going to...',par:'Oblida el verb to be en el futur amb going to'},
 en_going:{kid:'Després de «going to» el verb va en infinitiu: going to <b>play</b> (no playing, plays ni played).',par:'Errors en l\'estructura de going to'},
 en_will_inf:{kid:'Després de will / won\'t el verb va en infinitiu, sense to ni -s: will <b>live</b>.',par:'Forma malament el futur amb will («will lives», «will to live»)'},
 en_have_has:{kid:'Revisa el subjecte: he, she, it → <b>has</b> · I, you, we, they → <b>have</b>.',par:'Confon have i has al present perfect'},
 en_pperf_have:{kid:'Al present perfect hi falta <b>have / has</b> davant del participi: I have seen.',par:'Oblida l\'auxiliar have / has al present perfect'},
 en_pperf_pp:{kid:'Després de have / has el verb va en <b>participi</b> (la tercera forma): have seen, has eaten.',par:'No posa el participi al present perfect'},
 en_prep_lloc:{kid:'Mira bé el dibuix: el gat és dins, damunt, davall, davant, darrere, al costat o entre dues coses?',par:'Confon les preposicions de lloc'},
 en_prep_temps:{kid:'Recorda: <b>at</b> + hores · <b>on</b> + dies i dates · <b>in</b> + mesos, estacions, anys i parts del dia.',par:'Confon in / on / at en expressions de temps'}
});

/* ---------- vocabulari temàtic de 6è ---------- */
// 'anglès/alternativa;català/alternativa;emoticona;1 = nivell més alt'
const vocList=s=>s.split('|').map(x=>{const[en,ca,em,h]=x.split(';'),alts=en.split('/');return{en:alts[0],alts,ca:ca.split('/'),em:em||'',h:+(h||0)}});
const V6={
 en_voc_feel:{ab:'Fl',nom:'Vocabulari: emocions i personalitat',intro:'Per descriure com se sent algú (<i>I\'m tired</i>) i com és (<i>She\'s very kind</i>).',
  w:`happy;content/feliç;😀|sad;trist;😢|angry;enfadat/enrabiat;😠|scared/afraid/frightened;espantat/tenir por;😨|bored;avorrit;🥱|tired;cansat;😴|excited;emocionat/il·lusionat;🤩|worried;preocupat;😟|nervous;nerviós;😬|surprised;sorprès;😮|hungry;afamat/tenir fam;🍽️|thirsty;tenir set;🥤|proud;orgullós;;1|friendly;simpàtic;;1|kind;amable;;1|shy;tímid;;1|lazy;mandrós/gandul;🦥;1|clever/smart;llest/intel·ligent;🧠;1|funny;divertit;🤣|brave;valent;🦸;1|polite;educat;;1|rude;maleducat;;1|generous;generós;🎁;1|hard-working/hardworking;treballador;;1`},
 en_voc_jobs:{ab:'Jb',nom:'Vocabulari: les feines',intro:'Per dir què fa cadascú: <i>She\'s a vet. He works in a hospital.</i>',
  w:`doctor;metge/metgessa;🩺|nurse;infermer/infermera;|teacher;mestre/mestra/professor/professora;🧑‍🏫|firefighter/fireman/firewoman;bomber/bombera;🚒|police officer/policeman/policewoman;policia;👮|farmer;pagès/pagesa/granger/grangera;🚜|vet;veterinari/veterinària;🐾|cook/chef;cuiner/cuinera;🧑‍🍳|pilot;pilot;✈️|mechanic;mecànic/mecànica;🔧|dentist;dentista;🦷|waiter/waitress;cambrer/cambrera;|shop assistant;dependent/dependenta;;1|builder;paleta/obrer;🧱;1|scientist;científic/científica;🔬|artist;artista;🎨|journalist;periodista;📰;1|singer;cantant;🎤|engineer;enginyer/enginyera;;1|hairdresser;perruquer/perruquera;💇;1|postman/postwoman/mail carrier/postal worker;carter/cartera;📮;1|lawyer;advocat/advocada;⚖️;1|fisherman/fisher;pescador/pescadora;🎣;1`},
 en_voc_town:{ab:'Tw',nom:'Vocabulari: la ciutat i les direccions',intro:'Per dir on són les coses del poble o la ciutat i com s\'hi arriba: <i>The library is opposite the park. Turn left.</i>',
  w:`library;biblioteca;📚|supermarket;supermercat;🛒|bakery/baker's;forn/fleca;🥖|butcher's/butcher;carnisseria;🥩;1|post office;oficina de correus/correus;📮|museum;museu;🏛️|park;parc;🌳|swimming pool;piscina;🏊|police station;comissaria;🚓;1|train station/railway station;estació de tren;🚉|chemist's/pharmacy/chemist;farmàcia;💊;1|square;plaça;|bridge;pont;🌉|church;església;⛪|sports centre/sports center;poliesportiu/centre esportiu;🏟️;1|shopping centre/shopping center/mall;centre comercial;🛍️;1|street;carrer;|traffic lights;semàfor;🚦;1|zebra crossing/pedestrian crossing;pas de vianants;🚸;1|town hall;ajuntament;;1|turn left;gira a l'esquerra/tomba a l'esquerra;⬅️|turn right;gira a la dreta/tomba a la dreta;➡️|go straight on/go straight ahead;continua recte/ves tot recte;⬆️|corner;cantonada;;1`},
 en_voc_food:{ab:'Fd',nom:'Vocabulari: menjar i envasos',intro:'Per anar a comprar i parlar de quantitats: <i>a bottle of water, a slice of bread</i>.',
  w:`rice;arròs;🍚|meat;carn;🥩|chicken;pollastre;🍗|vegetables;verdures/verdura;🥦|salt;sal;🧂|sugar;sucre;|honey;mel;🍯|butter;mantega;🧈|flour;farina;|oil;oli;🫒|juice;suc;🧃|soup;sopa;🍲|sandwich;entrepà;🥪|biscuits/cookies;galetes;🍪|onion;ceba;🧅|lettuce;enciam;🥬|grapes;raïm;🍇|peach;préssec;🍑|pear;pera;🍐|lemon;llimona/llimó;🍋|pineapple;pinya;🍍|watermelon;síndria;🍉|a bottle of;una botella de/una ampolla de;🍾;1|a glass of;un tassó de/un got de;🥛;1|a piece of;un tros de;;1|a slice of;una llesca de/una tallada de;🍞;1|a bowl of;un bol de/una escudella de;🥣;1|a packet of;un paquet de;;1|a can of/a tin of;una llauna de;🥫;1`},
 en_voc_sport:{ab:'Ft',nom:'Vocabulari: esports i temps lliure',intro:'Per parlar del que fas en el temps lliure: <i>I go swimming. I play chess. I do karate.</i>',
  w:`basketball;bàsquet/basquetbol;🏀|volleyball;voleibol/vòlei;🏐|swimming;natació;🏊|cycling;ciclisme;🚴|sailing;vela;⛵|skating;patinatge;⛸️|climbing;escalada;🧗|horse riding;hípica/equitació;🏇;1|athletics;atletisme;🏃;1|gymnastics;gimnàstica;🤸|chess;escacs;♟️|skiing;esquí;⛷️|hiking;senderisme/excursionisme;🥾;1|fishing;pesca;🎣|helmet;casc;⛑️|racket;raqueta;🎾|team;equip;|match;partit;|player;jugador/jugadora;|referee;àrbitre/àrbitra;;1|goal;gol/porteria;🥅|win;guanyar;🏆|lose;perdre;|score;marcar;;1`},
 en_voc_health:{ab:'Hl',nom:'Vocabulari: el cos i la salut',intro:'Per dir què et fa mal i com et trobes: <i>I\'ve got a headache. My knee hurts.</i>',
  w:`headache;mal de cap;🤕|stomachache/stomach ache;mal de panxa/mal de ventre/mal d'estómac;|toothache;mal de queixal/mal de dents;🦷|earache;mal d'orella;👂|sore throat;mal de coll;;1|cold;refredat/constipat;🤧|cough;tos;|temperature/fever;febre;🤒|shoulder;espatlla;|knee;genoll;🦵|elbow;colze;💪;1|neck;coll;|back;esquena;|ankle;turmell;;1|wrist;canell;;1|finger;dit;☝️|toe;dit del peu;🦶;1|chest;pit;;1|medicine;medicament/medicina;💊|plaster;tireta;🩹;1|healthy;sa/saludable;🥗|exercise;exercici;🏋️|rest;descansar;;1`},
 en_voc_tech:{ab:'Tc',nom:'Vocabulari: tecnologia i invents',intro:'Per parlar dels aparells i dels invents: <i>Alexander Graham Bell invented the telephone.</i>',
  w:`mobile phone/mobile/phone/smartphone/cell phone;telèfon mòbil/mòbil;📱|tablet;tauleta;|laptop;ordinador portàtil/portàtil;💻|screen;pantalla;🖥️|keyboard;teclat;⌨️|website/web page/webpage;pàgina web/web;🌐;1|email/e-mail;correu electrònic;📧|password;contrasenya;🔑|download;baixar/descarregar;⬇️;1|print;imprimir;🖨️|printer;impressora;🖨️|camera;càmera;📷|battery;bateria/pila;🔋|charger;carregador;🔌;1|headphones;auriculars;🎧|video game/videogame;videojoc;🎮|light bulb/bulb;bombeta;💡;1|wheel;roda;🛞|invent;inventar;;1|invention;invent/invenció;;1|inventor;inventor/inventora;;1|telescope;telescopi;🔭;1`},
 en_voc_nature:{ab:'Nt',nom:'Vocabulari: la natura i el medi ambient',intro:'Per parlar de paisatges, del temps que fa i de com cuidar el planeta: <i>We must recycle plastic.</i>',
  w:`forest;bosc;🌲|desert;desert;🏜️|river;riu;|lake;llac;|island;illa;🏝️|cave;cova;;1|volcano;volcà;🌋|waterfall;cascada/salt d'aigua;;1|ocean;oceà;🌊|coast;costa;;1|hill;turó/puig;;1|valley;vall;;1|storm;tempesta;⛈️|wind;vent;💨|fog;boira;🌫️;1|thunder;tro;;1|lightning;llamp;⚡;1|rubbish/litter/trash/garbage;fems/brossa/escombraries;🗑️|recycle;reciclar;♻️|pollution;contaminació;🏭|save;estalviar;;1|protect;protegir;;1|glass;vidre;;1|plastic bag;bossa de plàstic;🛍️;1|endangered animals/endangered species;animals en perill d'extinció;🐼;1`}
};
for(const[id,d]of Object.entries(V6)){const W=vocList(d.w);
 SK[id]={mat:'angles',ab:d.ab,curs:[6],bloc:VC,nom:d.nom,
  teoria:[`${d.intro}`,'Truc: <b>llegeix la paraula en veu alta, tapa-la i escriu-la</b>. Fixa\'t bé en les lletres que no sonen com en català.',
   tbl(['Anglès','Català'],W.map(w=>[`${w.em?w.em+' ':''}<b>${esc(w.alts.join(' / '))}</b>`,esc(w.ca.join(' / '))]))],
  gen(lv){const w=pick(W.filter(x=>lv>0||!x.h)),toEn=lv===0||Math.random()<.7,en=w.en,ca=w.ca.join(' / '),nw=en.split(' ').length;
   if(toEn)return{text:`${w.em?`<div style="font-size:56px;line-height:1.2">${w.em}</div>`:''}Com es diu «<b>${esc(ca)}</b>» en anglès?`,fields:[{label:'En anglès',txt:A(w.alts),wide:nw>1}],vis:null,pron:en,
    hints:[`Comença per «${en[0]}»${nw>1?` i són ${nw} paraules`:` i té ${en.length} lletres`}.`,en.split(' ').map(x=>x[0]+' _'.repeat(Math.max(0,x.length-1))).join('   ')],
    steps:[`«${esc(ca)}» en anglès és <b>${esc(w.alts.join(' / '))}</b>.`,`S'escriu així: ${esc(en.toUpperCase().split('').join(' '))}.`,'Digues-la en veu alta tres vegades i escriu-la una vegada al quadern.'],
    err:v=>{if(A(w.alts).includes(v[0]))return null;const d=Math.min(...w.alts.map(a=>lev(v[0],norm(a))));return d>0&&d<=2?'en_lletrejat':null}};
   return{text:`${w.em?`<div style="font-size:56px;line-height:1.2">${w.em}</div>`:''}Què vol dir «<b>${esc(en)}</b>»?`,fields:[{label:'En català',txt:w.ca.map(norm),loose:true,wide:true}],vis:null,pron:en,
    hints:[`Comença per «${w.ca[0][0].toUpperCase()}».`,`Té ${[...w.ca[0]].length} lletres${w.ca.length>1?' (hi ha més d\'una resposta bona)':''}.`],
    steps:[`«${esc(en)}» vol dir <b>${esc(ca)}</b>.`,'Digues-la en veu alta i fes-ne una frase curta en anglès.']}}};
}

/* ---------- dades per a la gramàtica ---------- */
const FREQ=[['always','sempre','100 %'],['usually','normalment','90 %'],['often','sovint','70 %'],['sometimes','de vegades / a vegades','50 %'],['hardly ever','gairebé mai','10 %'],['never','mai','0 %']];
const FRQS=[['I','play','tennis after school',0],['My brother','gets up','at seven o\'clock',0],['We','have','pizza on Fridays',0],['She','is','late for school',1],['They','are','tired after PE',1],['Tom','watches','TV in the evening',0],['I','am','happy on Saturdays',1],['My parents','drink','coffee in the morning',0],['Our teacher','is','angry',1],['You','eat','vegetables for dinner',0],['My cat','sleeps','on my bed',0],['We','are','at the beach in August',1],['Anna','walks','to school',0]];
const WH=[// [pregunta, resposta, paraules bones, de què parla, nivell]
 ['___ is your name?','My name is Laura.',['what'],'el nom (una cosa)',0],
 ['___ do you live?','I live in Palma.',['where'],'un lloc',0],
 ['___ is your birthday?','It\'s in May.',['when'],'un moment (una data)',0],
 ['___ is your teacher?','Mrs Smith.',['who'],'una persona',0],
 ['___ are you?','I\'m twelve years old.',['how old'],'l\'edat',0],
 ['___ brothers have you got?','I\'ve got two brothers.',['how many'],'una quantitat que es pot comptar',0],
 ['___ do you get up?','At half past seven.',['what time','when'],'l\'hora',0],
 ['___ is your favourite colour?','Blue.',['what','which'],'una cosa',0],
 ['___ are you doing?','I\'m reading a book.',['what'],'una acció (una cosa)',0],
 ['___ is the cinema?','It\'s next to the bank.',['where'],'un lloc',0],
 ['___ is your best friend?','Marc. He\'s very funny.',['who'],'una persona',0],
 ['___ is this T-shirt?','It\'s fifteen euros.',['how much'],'un preu',1],
 ['___ do you go swimming?','Twice a week.',['how often'],'quantes vegades (la freqüència)',1],
 ['___ are you sad?','Because I lost my dog.',['why'],'la causa (because...)',1],
 ['___ bag is this?','It\'s Peter\'s bag.',['whose'],'de qui és',1],
 ['___ do you go to school?','By bike.',['how'],'la manera (com)',1],
 ['___ did you go last summer?','We went to Ibiza.',['where'],'un lloc',1],
 ['___ did you see at the party?','I saw my cousins.',['who'],'una persona',1],
 ['___ water do you drink every day?','About one litre.',['how much'],'una quantitat que no es pot comptar',1],
 ['___ did you finish your homework?','Yesterday.',['when'],'un moment',1],
 ['___ do you like, cats or dogs?','Dogs!',['which'],'una tria entre unes quantes opcions',2],
 ['___ is the Eiffel Tower?','It\'s 330 metres tall.',['how tall','how high'],'l\'altura',2],
 ['___ is Palma from Barcelona?','About 200 kilometres.',['how far'],'la distància',2],
 ['___ does the film start?','At six o\'clock.',['what time','when'],'l\'hora',1],
 ['___ is your favourite subject?','Science.',['what','which'],'una cosa',1]];
const WH_ALL=['what','where','when','who','whose','which','why','how','how old','how many','how much','how often','what time','how tall','how high','how far','how long'];
const MOD=[// [frase, en català, respostes, nivell]
 ['Fish ___ swim.','Els peixos saben nedar.',['can'],0],
 ['Penguins ___ fly.','Els pingüins no poden volar.',["can't"],0],
 ['My little brother is two. He ___ read.','El meu germà petit té dos anys. No sap llegir.',["can't"],0],
 ['___ I open the window, please?','Puc obrir la finestra, si us plau? (demanes permís)',['can','could','may'],0],
 ['___ you speak French?','Saps parlar francès?',['can'],0],
 ['You ___ wear a helmet when you ride a motorbike.','Has de portar casc quan vas en moto. (és obligatori)',['must','have to'],0],
 ['You ___ run in the corridor.','No pots córrer pel passadís. (està prohibit)',["mustn't","can't"],0],
 ['You ___ stop at a red light.','T\'has d\'aturar quan el semàfor és vermell. (és obligatori)',['must','have to'],0],
 ['We ___ use mobile phones in class.','No podem fer servir el mòbil a classe. (està prohibit)',["mustn't","can't"],0],
 ['You look tired. You ___ go to bed early.','Fas cara de cansat. Hauries d\'anar a dormir d\'hora. (és un consell)',['should'],1],
 ['You ___ eat so many sweets.','No hauries de menjar tantes llepolies. (és un consell)',["shouldn't"],1],
 ['It\'s cold. You ___ wear a coat.','Fa fred. Hauries de posar-te un abric. (és un consell)',['should'],1],
 ['You\'ve got a headache. You ___ watch TV all day.','Tens mal de cap. No hauries de mirar la tele tot el dia. (és un consell)',["shouldn't"],1],
 ['Students ___ be quiet in the library.','Els alumnes han d\'estar en silenci a la biblioteca. (és una norma)',['must','have to'],1],
 ['You ___ feed the animals at the zoo.','No es pot donar menjar als animals del zoo. (està prohibit)',["mustn't","can't"],1],
 ['You ___ drink some water. It\'s very hot today.','Hauries de beure aigua. Avui fa molta calor. (és un consell)',['should'],1],
 ['You ___ touch the paintings in the museum.','No es poden tocar els quadres del museu. (està prohibit)',["mustn't","can't"],1],
 ['I ___ ride a bike when I was five.','Ja sabia anar en bicicleta quan tenia cinc anys.',['could'],2],
 ['My grandma ___ swim when she was young.','La meva padrina no sabia nedar quan era jove.',["couldn't"],2]];
const MODV=[// [subjecte, verb, resta, modal, en català]
 ['My sister','swim','very fast','can','La meva germana sap nedar molt ràpid.'],['Tom','play','the guitar','can','En Tom sap tocar la guitarra.'],
 ['She','go','to the doctor','should','Ella hauria d\'anar al metge.'],['He','wear','a uniform at school','must','Ha de portar uniforme a l\'escola. (és obligatori)'],
 ['Anna','eat','more fruit','should','L\'Anna hauria de menjar més fruita.'],['My dad','speak','English','can','El meu pare sap parlar anglès.'],
 ['Everybody','wear','a seat belt in the car','must','Tothom ha de dur el cinturó al cotxe. (és obligatori)'],['He','drink','so much cola','shouldn\'t','No hauria de beure tanta cola.']];
const MOD_ALL=['can',"can't",'cannot','could',"couldn't",'must',"mustn't",'should',"shouldn't",'may','have to','has to'].flatMap(x=>A(x));
const THERE=[// [singular, nombre, plural, lloc, (1 = no serveix en passat)]
 ['a cat','three','cats','in the garden'],['a library','two','libraries','in my town'],['a fountain','two','fountains','in the square'],
 ['a bench','four','benches','in the park'],['a computer','twenty','computers','in our classroom',1],['an apple','six','apples','on the table'],
 ['a bus stop','two','bus stops','near my house'],['a castle','three','castles','on the island'],['a boat','five','boats','in the harbour'],['a horse','two','horses','on the farm']];
const thereF=(past,pl,neg,q)=>{const v=past?(pl?'were':'was'):(pl?'are':'is'),vn=v+"n't";return q?(neg?`${vn} there`:`${v} there`):(neg?`there ${vn}`:`there ${v}`)};
const CNT=['apples','books','friends','eggs','pencils','biscuits','tomatoes','sandwiches'],UNC=['milk','water','bread','cheese','juice','sugar','rice','money'];
const GOING=[['visit','my grandparents'],['play','basketball'],['watch','a film'],['buy','a new bike'],['travel','to London'],['study','for the test'],['make','a cake'],['go','to the beach'],['have','a party'],['learn','to swim'],['clean','my room'],['see','a concert'],['eat','pizza'],['ride','a horse']];
const WHEN_F=['tomorrow','next weekend','next summer','tonight','on Saturday','after school'];
const WILL=[// [subjecte, verb, resta, subjecte dins una pregunta]
 ['In 2050, people','live','on Mars',''],['Robots','do','our homework','robots'],['Cars','fly','in the sky','cars'],['I think it','rain','tomorrow',''],
 ['My team','win','the match','your team'],['Children','study','at home with computers','children'],['We','travel','to the Moon on holiday','we'],
 ['I think you','pass','the exam',''],['The weather','be','sunny at the weekend','the weather'],['Doctors','use','robots in hospitals','doctors'],['People','speak','lots of languages','people']];
const EXP=[['visit','London'],['see','a whale'],['eat','sushi'],['ride','a camel'],['fly','in a plane'],['swim','in a lake'],['be','to Menorca'],['climb','a mountain'],['write','a poem'],['meet','a famous person'],['break','a bone'],['win','a prize'],['read','a book in English'],['travel','by train'],['drink','coconut milk'],['play','golf']];
const PT=[// [frase, preposició, per què, nivell]
 ['I get up ___ seven o\'clock.','at','davant les hores',0],['We have lunch ___ half past one.','at','davant les hores',0],['The film starts ___ midnight.','at','davant les hores (midnight = les dotze de la nit)',1],
 ['Owls hunt ___ night.','at','expressió fixa: <i>at night</i>',1],['I play football ___ the weekend.','at','expressió fixa: <i>at the weekend</i>',1],
 ['We have Music ___ Monday.','on','davant els dies de la setmana',0],['My birthday is ___ 5th May.','on','davant les dates (un dia concret)',0],['We open presents ___ Christmas Day.','on','davant un dia concret',1],
 ['I go swimming ___ Saturdays.','on','davant els dies de la setmana',0],['We had a party ___ my birthday.','on','davant un dia concret',1],['I visit my grandma ___ Sunday morning.','on','davant un dia concret (encara que digui morning)',1],
 ['My birthday is ___ May.','in','davant els mesos',0],['It\'s very hot ___ summer.','in','davant les estacions',0],['I do my homework ___ the afternoon.','in','davant les parts del dia',0],
 ['I was born ___ 2014.','in','davant els anys',0],['It snows ___ winter.','in','davant les estacions',0],['I read a book ___ the evening.','in','davant les parts del dia',0],['School starts ___ September.','in','davant els mesos',0],['I have a shower ___ the morning.','in','davant les parts del dia',0]];

/* ---------- dibuix de les preposicions de lloc ---------- */
const CAT=(x,y,s=40)=>`<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle">🐱</text>`;
const BOX=(x,y,w=80,h=60,op=1)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#C98B4B" fill-opacity="${op}" stroke="#7A4E22" stroke-width="3"/><path d="M${x} ${y+12}h${w}" stroke="#7A4E22" stroke-width="2" opacity=".5"/>`;
const TABLE=`<rect x="70" y="70" width="120" height="12" fill="#8D5A2B"/><rect x="78" y="82" width="10" height="68" fill="#8D5A2B"/><rect x="172" y="82" width="10" height="68" fill="#8D5A2B"/>`;
const PLACE={// preposició: [objecte, dibuix, explicació en català, nivell]
 'in':['box',()=>`${CAT(130,138)}${BOX(90,90,80,60,.45)}`,'el gat és <b>dins</b> la capsa',0],
 'on':['box',()=>`${BOX(90,90)}${CAT(130,88)}`,'el gat és <b>damunt</b> la capsa',0],
 'under':['table',()=>`${TABLE}${CAT(130,145)}`,'el gat és <b>davall</b> la taula',0],
 'next to':['box',()=>`${BOX(70,90)}${CAT(200,148)}`,'el gat és <b>al costat</b> de la capsa',0],
 'behind':['box',()=>`${CAT(150,97,40)}${BOX(90,90)}`,'el gat és <b>darrere</b> la capsa (només se li veu el cap)',1],
 'in front of':['box',()=>`${BOX(85,70,90,80)}${CAT(130,166,50)}`,'el gat és <b>davant</b> la capsa (tapa una part de la capsa)',1],
 'between':['boxes',()=>`${BOX(20,90,70)}${BOX(170,90,70)}${CAT(130,148)}`,'el gat és <b>entre</b> les dues capses',2]};
const placeFig=p=>`<svg viewBox="0 0 260 170" width="260" height="170" role="img" aria-label="Dibuix d'un gat"><rect x="0" y="0" width="260" height="170" fill="#EEF6FF"/><path d="M0 150h260" stroke="#9BB3C9" stroke-width="2"/>${PLACE[p][1]()}</svg>`;

/* ---------- textos de comprensió lectora ---------- */
const READ=[// [títol, text, nivell, [[pregunta, respostes, frase del text], ...]]
 ['Lucy',`My name is Lucy. I'm twelve years old and I live in Sóller, a small town in Mallorca. I've got one brother, Sam. He's nine. Every morning I get up at half past seven and I go to school by bike. My favourite subject is Science. After school I usually play volleyball with my friends. I never watch TV on weekdays.`,0,
  [['How old is Lucy?',['twelve','12','twelve years old','12 years old',"she's twelve",'she is twelve'],"I'm twelve years old"],['Where does Lucy live?',['in soller','soller','in sóller','sóller','in mallorca','mallorca'],'I live in Sóller, a small town in Mallorca'],
   ['How does she go to school?',['by bike','by bicycle','bike','bicycle'],'I go to school by bike'],['What is her favourite subject?',['science'],'My favourite subject is Science'],
   ['What is her brother\'s name?',['sam'],"I've got one brother, Sam"],['What does she play after school?',['volleyball'],'After school I usually play volleyball with my friends']]],
 ['Saturday morning',`It's Saturday morning at the Garcia family's house. Mum is reading the newspaper in the garden. Dad is cooking paella in the kitchen. The twins, Pau and Joana, are playing chess in the living room. Grandpa is sleeping on the sofa and the dog, Rex, is sleeping next to him. It's sunny and hot.`,0,
  [['What is Dad cooking?',['paella'],'Dad is cooking paella in the kitchen'],['Where is Mum?',['in the garden','the garden','garden'],'Mum is reading the newspaper in the garden'],
   ['What are the twins playing?',['chess'],'The twins, Pau and Joana, are playing chess'],['Who is sleeping on the sofa?',['grandpa','the grandpa','grandpa and rex','grandpa and the dog'],'Grandpa is sleeping on the sofa'],
   ['What is the dog\'s name?',['rex'],'the dog, Rex'],['What\'s the weather like?',['sunny and hot','sunny','hot',"it's sunny and hot",'it is sunny and hot'],"It's sunny and hot"]]],
 ['A trip to London',`Last summer Marc went to London with his parents. They travelled by plane and stayed in a small hotel near the river. On the first day they visited the British Museum and saw Egyptian mummies. On the second day it rained, so they went to the cinema. Marc's favourite thing was the London Eye. He bought a red bus for his sister.`,1,
  [['How did they travel to London?',['by plane','by air','plane','by aeroplane'],'They travelled by plane'],['What did they see at the British Museum?',['egyptian mummies','mummies','some egyptian mummies'],'they visited the British Museum and saw Egyptian mummies'],
   ['Where did they go on the second day?',['to the cinema','the cinema','cinema'],'On the second day it rained, so they went to the cinema'],['What did Marc buy for his sister?',['a red bus','a bus','red bus','bus','a toy bus'],'He bought a red bus for his sister'],
   ['What was Marc\'s favourite thing?',['the london eye','london eye'],"Marc's favourite thing was the London Eye"],['Who did Marc go to London with?',['his parents','with his parents','parents','his mum and dad'],'Marc went to London with his parents']]],
 ['The telephone',`The first telephone call was in 1876. Alexander Graham Bell invented the telephone. He was born in Scotland in 1847, but he lived in Canada and the USA. His mother and his wife were deaf, so he was very interested in sound. In his first call he said: "Mr Watson, come here!" Watson was his assistant.`,1,
  [['When was the first telephone call?',['1876','in 1876'],'The first telephone call was in 1876'],['Where was Bell born?',['scotland','in scotland'],'He was born in Scotland in 1847'],
   ['Who was Watson?',['his assistant','bell\'s assistant','assistant','an assistant','bells assistant'],'Watson was his assistant'],['When was Bell born?',['1847','in 1847'],'He was born in Scotland in 1847'],
   ['What did Bell invent?',['the telephone','telephone','phone','the phone','a telephone'],'Alexander Graham Bell invented the telephone']]],
 ['A school trip',`Next week our class is going to visit the Serra de Tramuntana. We're going to walk for three hours and we're going to have lunch near a lake. Our teacher says it will be cold in the mountains, so we must take a warm jacket. We mustn't leave any rubbish. I think it will be the best trip of the year!`,2,
  [['Where is the class going to go?',['the serra de tramuntana','serra de tramuntana','to the serra de tramuntana','tramuntana','the tramuntana','the mountains'],'our class is going to visit the Serra de Tramuntana'],
   ['How long are they going to walk?',['three hours','3 hours','for three hours','for 3 hours'],"We're going to walk for three hours"],['Where are they going to have lunch?',['near a lake','near the lake','by a lake','next to a lake'],"we're going to have lunch near a lake"],
   ['What must they take?',['a warm jacket','warm jacket','a jacket','jacket'],'we must take a warm jacket'],['What mustn\'t they leave?',['rubbish','any rubbish','litter'],"We mustn't leave any rubbish"],
   ['What will the weather be like in the mountains?',['cold','it will be cold',"it'll be cold"],'it will be cold in the mountains']]],
 ['Ben and Ona',`Ben and his cousin Ona are very different. Ben is thirteen and Ona is eleven, so Ben is older. But Ona is taller than Ben! Ben likes reading and he is quieter than Ona. Ona loves sport: she is the fastest runner in her school. Their favourite food is the same: pizza.`,2,
  [['Who is older?',['ben'],'Ben is thirteen and Ona is eleven, so Ben is older'],['Who is taller?',['ona'],'Ona is taller than Ben'],['How old is Ona?',['eleven','11','eleven years old','she is eleven',"she's eleven"],'Ona is eleven'],
   ['What does Ben like?',['reading'],'Ben likes reading'],['What is their favourite food?',['pizza'],'Their favourite food is the same: pizza'],['Who is quieter?',['ben'],'he is quieter than Ona']]]];
const qWord=q=>{const m=[['How old','quants anys'],['How long','quant de temps'],['How','com'],['What','què'],['Where','on'],['Who','qui'],['When','quan']].find(([w])=>q.startsWith(w));return m?`«${m[0]}» vol dir «${m[1]}»`:''};

Object.assign(SK,{
 en_pres_neg:{mat:'angles',ab:'Dn',curs:[6],bloc:EV,nom:'Present simple: negatives, preguntes i respostes curtes',
  teoria:['Per fer la <b>negativa</b> del present simple fem servir <b>don\'t</b> o <b>doesn\'t</b> + verb en <b>infinitiu</b>: <i>I <b>don\'t like</b> fish. She <b>doesn\'t like</b> fish.</i>',
   'Amb <b>he, she, it</b> l\'auxiliar és <b>does / doesn\'t</b>, i la -s ja la porta l\'auxiliar: <i>She doesn\'t play<s>s</s></i> → <i>She <b>doesn\'t play</b></i>.',
   'Per fer <b>preguntes</b>: <b>Do / Does</b> + subjecte + verb en infinitiu: <i><b>Do</b> you <b>like</b> pizza? <b>Does</b> Tom <b>play</b> tennis?</i>',
   tbl(['Pregunta','Sí','No'],[['Do you like cats?','Yes, I do.','No, I don\'t.'],['Does she play tennis?','Yes, she does.','No, she doesn\'t.'],['Do they live here?','Yes, they do.','No, they don\'t.']])],
  gen(lv){const[b,t3,rest]=pick(PRES),r=Math.random(),kind=lv===0?0:lv===1?(r<.5?0:1):(r<.3?0:r<.65?1:2);
   if(kind===0){const[su,,pers]=pick(SUBJ6),third=pers===1,neg=third?"doesn't":"don't",other=third?"don't":"doesn't",ans=A(`${neg} ${b}`);
    return{text:`Transforma en <b>negativa</b>:<br><i>${su} ${third?t3:b} ${rest}.</i><br><b>${su} ___ ${rest}.</b>`,fields:[{label:'Negativa (2 paraules)',txt:ans,wide:true}],vis:null,
     hints:[`«${su}» és ${third?'he, she o it':'I, you, we o they'}: quin auxiliar li toca, don't o doesn't?`,'Després de l\'auxiliar, el verb va en infinitiu (sense -s).'],
     steps:[`«${su}» → ${third?'he/she/it → <b>doesn\'t</b>':'I/you/we/they → <b>don\'t</b>'}.`,`El verb queda en infinitiu: <b>${b}</b>${third?` (no «${t3}»)`:''}.`,`${su} <b>${neg} ${b}</b> ${rest}.`],
     err:v=>ans.includes(v[0])?null:A(`doesn't ${t3}`,`don't ${t3}`).includes(v[0])?'en_does_s':A(`${other} ${b}`,`${other} ${t3}`).includes(v[0])?'en_do_does':null}}
   const[,sl,pers]=pick(SUBJ6.filter(s=>s[2])),third=pers===1,aux=third?'does':'do';
   if(kind===1)return{text:`Completa la <b>pregunta</b>:<br><b>___ ${sl} ___ ${rest}?</b> ${mut(b)}`,fields:[{label:'1a paraula',txt:[aux]},{label:'2a paraula',txt:[b]}],vis:null,pron:`${cap(aux)} ${sl} ${b} ${rest}?`,
    hints:['Les preguntes del present simple comencen amb un auxiliar: do o does.',`«${sl}» és ${third?'he, she o it':'you, we o they'}. I recorda: després de l'auxiliar, el verb va en infinitiu.`],
    steps:[`«${sl}» → ${third?'<b>Does</b>':'<b>Do</b>'}.`,`El verb va en infinitiu: <b>${b}</b>${third?` (la -s ja la porta «does»)`:''}.`,`<b>${cap(aux)}</b> ${sl} <b>${b}</b> ${rest}?`],
    err:v=>v[0]===aux&&v[1]===b?null:(third&&v[1]===t3)?'en_does_s':(['do','does'].includes(v[0])&&v[0]!==aux)?'en_do_does':null};
   const yes=Math.random()<.5,pr={you:'I',he:'he',she:'she',Tom:'he','my sister':'she','our teacher':'he','we':'we','they':'they','my friends':'they'}[sl],a2=third?'does':'do',ans=A(yes?a2:a2+"n't");
   const prAns=sl==='our teacher'?['he','she']:[pr];
   return{text:`<b>${cap(aux)} ${sl} ${b} ${rest}?</b><br>Completa la resposta curta ${yes?'<b>afirmativa</b>':'<b>negativa</b>'}:<br><b>${yes?'Yes':'No'}, ${prAns.join(' / ')} ___.</b>`,fields:[{label:'Resposta curta',txt:ans}],vis:null,
    hints:['A la resposta curta només repetim l\'auxiliar de la pregunta.',yes?'Afirmativa: do o does.':'Negativa: don\'t o doesn\'t.'],
    steps:[`La pregunta comença amb <b>${cap(aux)}</b>.`,`La resposta curta repeteix l'auxiliar${yes?'':' en negativa'}: <b>${yes?a2:a2+"n't"}</b>.`,`${yes?'Yes':'No'}, ${prAns[0]} <b>${yes?a2:a2+"n't"}</b>.`],
    err:v=>ans.includes(v[0])?null:[b,t3,...A(`don't ${b}`,`doesn't ${b}`)].includes(v[0])?'en_resposta_curta':A(third?['do',"don't"]:['does',"doesn't"]).includes(v[0])?'en_do_does':null}}},
 en_freq:{mat:'angles',ab:'Af',curs:[6],bloc:EV,nom:'Adverbis de freqüència (always, never...)',
  teoria:['Els <b>adverbis de freqüència</b> diuen <b>quantes vegades</b> fem una cosa. Van molt bé amb el present simple.',
   tbl(['Adverbi','Català',''],FREQ.map(f=>[`<b>${f[0]}</b>`,f[1],f[2]])),
   'On van? <b>Davant</b> del verb: <i>I <b>often</b> play tennis.</i> Però <b>darrere</b> de am / is / are: <i>She is <b>never</b> late.</i>',
   'Per preguntar-ho: <i><b>How often</b> do you go swimming? — Twice a week.</i>'],
  gen(lv){if(Math.random()<(lv===0?.4:.25)){const f=pick(FREQ.filter(x=>lv>0||x[0]!=='hardly ever'));
    return{text:`Escriu l'adverbi de freqüència en anglès:<br><b>${f[1]}</b> <span class="muted">(${f[2]} de les vegades)</span>`,fields:[{label:'Adverbi',txt:[f[0]],wide:f[0].includes(' ')}],vis:null,pron:f[0],
     hints:[`Comença per «${f[0][0]}».`,`Té ${f[0].replace(' ','').length} lletres.`],
     steps:[`«${f[1]}» (${f[2]}) en anglès és <b>${f[0]}</b>.`,`Exemple: I ${f[0]} have breakfast at home.`],
     err:v=>{const d=lev(v[0],f[0]);return d>0&&d<=2?'en_lletrejat':null}}}
   const[su,vb,rest,be]=pick(FRQS),f=pick(FREQ.filter(x=>lv>0||x[0]!=='hardly ever')),adv=f[0];
   const good=be?`${su} ${vb} ${adv} ${rest}`:`${su} ${adv} ${vb} ${rest}`,alt=[good];
   if(['sometimes','usually'].includes(adv))alt.push(`${adv} ${su[0]==='I'&&su.length===1?su:su.toLowerCase()} ${vb} ${rest}`);
   if(adv==='sometimes')alt.push(`${su} ${vb} ${rest} sometimes`);
   const ans=A(alt),key=s=>norm(s).split(' ').sort().join(' ');
   return{text:`Escriu la frase amb l'adverbi <b>${adv}</b> al lloc correcte:<br><i>${su} ${vb} ${rest}.</i>`,fields:[{label:'Frase',txt:ans,wide:true}],vis:null,pron:good+'.',
    hints:[be?`El verb de la frase és «${vb}», una forma de to be.`:`El verb de la frase és «${vb}». No és am, is ni are.`,be?'Amb am / is / are, l\'adverbi va darrere.':'Amb els altres verbs, l\'adverbi va davant.'],
    steps:[be?`El verb és «${vb}» (to be) → l'adverbi va <b>darrere</b>.`:`El verb és «${vb}» → l'adverbi va <b>davant</b>.`,`<b>${good}.</b>`],
    err:v=>ans.includes(v[0])?null:key(v[0])===key(good)?'en_freq_pos':null}}},
 en_simple_cont:{mat:'angles',ab:'Sc',curs:[6],bloc:EV,nom:'Present simple o present continuous?',
  teoria:['<b>Present simple</b>: coses que fem <b>habitualment</b>. Paraules pista: <i>every day, usually, always, on Mondays, twice a week</i>. → <i>She <b>plays</b> tennis every Saturday.</i>',
   '<b>Present continuous</b>: el que passa <b>ara mateix</b>. Paraules pista: <i>now, right now, at the moment, Look!, Listen!</i> → <i>Look! She <b>is playing</b> tennis.</i>',
   tbl(['','Present simple','Present continuous'],[['I','I play','I am playing'],['he / she / it','she plays','she is playing'],['we / you / they','they play','they are playing']])],
  gen(lv){const[b,ing,rest]=pick(CONT),[su,sl,pers]=pick(SUBJ6),cont=Math.random()<.5,be=BE[pers],simple=pers===1?s3(b):b,goodC=`${be} ${ing}`;
   let sent;if(cont){const m=pick(['Look!','Listen!','Now','Right now','At the moment']);sent=`${m} ${m.endsWith('!')?su:sl} ___ ${rest}.`}
   else{const m=pick(['every day','every Saturday','usually','always','on Mondays','twice a week','after school']);sent=['usually','always'].includes(m)?`${su} ${m} ___ ${rest}.`:`${su} ___ ${rest} ${m}.`}
   const ans=A(cont?goodC:simple);
   return{text:`Present simple o continuous? Completa amb el verb:<br><b>${sent}</b> ${mut(b)}`,fields:[{label:'Verb',txt:ans,wide:true}],vis:null,pron:sent.replace('___',cont?goodC:simple),
    hints:['Busca la paraula pista: diu que passa <b>ara</b> o que passa <b>habitualment</b>?',cont?'Passa ara: am / is / are + -ing.':`És un hàbit: present simple${pers===1?' (amb he/she/it, compte amb la -s)':''}.`],
    steps:[cont?'La pista diu que passa <b>ara mateix</b> → present continuous.':'La pista diu que és un <b>hàbit</b> → present simple.',cont?`«${su}» → ${be} + ${ing} = <b>${goodC}</b>.`:`«${su}» → <b>${simple}</b>.`,`<b>${sent.replace('___',cont?goodC:simple)}</b>`],
    err:v=>{if(ans.includes(v[0]))return null;if(A(cont?simple:goodC).includes(v[0])||(cont&&[b,s3(b)].includes(v[0]))||(!cont&&BE.some(x=>v[0]===`${x} ${ing}`)))return'en_simple_cont';
     if(cont&&v[0]===`${be} ${b}`)return'en_cont_ing';if(cont&&ing!==b+'ing'&&v[0]===`${be} ${b}ing`)return'en_cont_spell';if(cont&&BE.some(x=>x!==be&&v[0]===`${x} ${ing}`))return'en_be';return null}}}},
 en_wh:{mat:'angles',ab:'Wh',curs:[6],bloc:GR,nom:'Preguntes amb wh- (what, where, when...)',
  teoria:['Les <b>paraules interrogatives</b> van al principi de la pregunta i diuen què volem saber.',
   tbl(['Paraula','Pregunta per...','Exemple'],[['<b>what</b>','una cosa','What is your name?'],['<b>where</b>','un lloc','Where do you live?'],['<b>when</b>','un moment','When is your birthday?'],['<b>who</b>','una persona','Who is your teacher?'],['<b>whose</b>','de qui és','Whose bag is this?'],['<b>which</b>','una tria','Which do you like, cats or dogs?'],['<b>why</b>','la causa','Why are you sad? — Because...'],['<b>how</b>','la manera','How do you go to school?']]),
   'Amb <b>how</b> en fem moltes més: <b>how old</b> (edat), <b>how many</b> (quantitat que es pot comptar), <b>how much</b> (quantitat que no es pot comptar o preu), <b>how often</b> (freqüència). I <b>what time</b> pregunta l\'hora.'],
  gen(lv){const[q,a,ok,what]=pick(WH.filter(x=>x[4]<=lv)),A0=ok.map(norm);
   return{text:`Escriu la paraula interrogativa (pot ser més d'una paraula):<br><b>${q}</b><br><span class="muted">— ${a}</span>`,fields:[{label:'Paraula interrogativa',txt:A0,wide:true}],vis:null,pron:`${cap(ok[0])} ${q.slice(4)} ${a}`,
    hints:[`Llegeix la resposta: «${a}». De què parla?`,`Parla de ${what}.`],
    steps:[`La resposta («${a}») parla de ${what}.`,`Per preguntar per ${what} fem servir <b>${ok.join(' / ')}</b>.`,`<b>${cap(ok[0])}</b> ${q.slice(4)}`],
    err:v=>!A0.includes(v[0])&&WH_ALL.includes(v[0])?'en_wh':null}}},
 en_poss:{mat:'angles',ab:'Po',curs:[6],bloc:GR,nom:'Possessius (my, his... mine... Laura\'s)',
  teoria:['Els <b>adjectius possessius</b> van davant d\'un nom: <i><b>my</b> bike, <b>her</b> dog</i>.',
   tbl(['Persona','Adjectiu','Pronom'],[['I','my','mine'],['you','your','yours'],['he','his','his'],['she','her','hers'],['it','its','—'],['we','our','ours'],['they','their','theirs']]),
   'Els <b>pronoms possessius</b> van sols, sense nom: <i>This bike is <b>mine</b>.</i> No porten mai apòstrof: <i>hers, yours</i>.',
   'Per dir de qui és una cosa: propietari + <b>\'s</b> + cosa: <i>Laura<b>\'s</b> bike</i> (la bicicleta de la Laura). Si el propietari és un plural acabat en -s, només apòstrof: <i>my parents<b>\'</b> house</i>.'],
  gen(lv){const r=Math.random(),kind=lv===0?0:r<.4?0:r<.7?1:2;
   if(kind===0){const OW=[['I','have','my'],['You','have','your'],['Tom','has','his'],['My dad','has','his'],['Anna','has','her'],['My sister','has','her'],['The cat','has','its'],['We','have','our'],['My parents','have','their'],['They','have','their']];
    const[su,h,ans]=pick(OW),[n,adj]=su==='The cat'?pick([['bed','soft'],['ball','red']]):pick([['bike','red'],['house','big'],['schoolbag','blue'],['computer','new'],['bedroom','tidy'],['dog','very friendly']]);
    return{text:`Completa amb el possessiu:<br><b>${su} ${h} got a ${n}. ___ ${n} is ${adj}.</b>`,fields:[{label:'Possessiu',txt:[ans]}],vis:null,pron:`${su} ${h} got a ${n}. ${cap(ans)} ${n} is ${adj}.`,
     hints:[`De qui és el ${n}? De «${su}».`,'I → my · you → your · he → his · she → her · it → its · we → our · they → their'],
     steps:[`El ${n} és de «${su}».`,`«${su}» → <b>${ans}</b>.`,`${cap(ans)} ${n} is ${adj}.`],
     err:v=>v[0]===ans?null:(['his','her'].includes(ans)&&['his','her'].includes(v[0]))?'en_his_her':(ans==='its'&&v[0]==="it's")?'en_its':['my','your','his','her','its','our','their',"it's"].includes(v[0])?'en_poss':null}}
   if(kind===1){const[a,p]=pick([['my','mine'],['your','yours'],['his','his'],['her','hers'],['our','ours'],['their','theirs']]),n=pick(['pencil','ball','book','jacket','umbrella']);
    return{text:`Completa amb el <b>pronom</b> possessiu:<br><i>This is ${a} ${n}.</i> → <b>This ${n} is ___.</b>`,fields:[{label:'Pronom',txt:[p]}],vis:null,pron:`This ${n} is ${p}.`,
     hints:['Darrere de l\'espai no hi ha cap nom: fem servir el pronom.','my → mine · your → yours · his → his · her → hers · our → ours · their → theirs'],
     steps:[`«${a}» va davant d'un nom; sense nom, fem servir el pronom.`,`${a} → <b>${p}</b>.`,`This ${n} is <b>${p}</b>.`],
     err:v=>v[0]===p?null:(v[0]===a?'en_poss_pron':/'s$/.test(v[0])?'en_poss_apos':null)}}
   const G=[['Laura','bike','la bicicleta de la Laura',0],['Pere','dog','el ca d\'en Pere',0],['my mum','car','el cotxe de la meva mare',0],['Tom','room','l\'habitació d\'en Tom',0],['the teacher','book','el llibre del mestre',0],['my brother','skateboard','el monopatí del meu germà',0],['my parents','house','la casa dels meus pares',1],['the girls','bags','les motxilles de les nenes',1],['my cousins','dog','el ca dels meus cosins',1]];
   const[o,n,ca,pl]=pick(G.filter(g=>lv>1||!g[3])),good=pl?`${o}' ${n}`:`${o}'s ${n}`,ans=[good,good.replace(/^(the|my) /,'')].map(norm);
   return{text:`Escriu-ho en anglès amb <b>'s</b>:<br><b>${ca}</b>`,fields:[{label:'En anglès',txt:[...new Set(ans)],wide:true}],vis:null,pron:good,
    hints:['En anglès primer va el propietari, després la cosa.',pl?'El propietari és un plural acabat en -s: només hi posam l\'apòstrof.':'Al propietari hi afegim \'s.'],
    steps:[`El propietari és «${o}» i la cosa, «${n}».`,pl?`Plural acabat en -s → ${o}<b>'</b>.`:`${o} + <b>'s</b>.`,`<b>${good}</b>`],
    err:v=>{const lo=norm(o),lb=lo.replace(/^(the|my) /,'');return ans.includes(v[0])?null:v[0].includes(` of ${lb}`)?'en_genitiu':pl&&v[0].includes(`${lb}'s`)?'en_genitiu_pl':v[0].replace(/'/g,'')===norm(good).replace(/'/g,'')?'en_genitiu':null}}}},
 en_super:{mat:'angles',ab:'Su',curs:[6],bloc:GR,nom:'Superlatius (the tallest, the most...)',
  teoria:['El <b>superlatiu</b> diu quin és el número u d\'un grup: <i>The cheetah is <b>the fastest</b> animal in the world.</i> Sempre porta <b>the</b>.',
   tbl(['Adjectiu','Regla','Superlatiu'],[['tall','curt: + -est','the tallest'],['big','vocal + consonant: doble','the biggest'],['happy','acaba en y: -iest','the happiest'],['beautiful','llarg: the most','the most beautiful'],['good / bad','irregulars','the best / the worst']]),
   'Compara: <i>A dog is <b>bigger than</b> a cat</i> (comparatiu: dues coses) · <i>The whale is <b>the biggest</b> animal</i> (superlatiu: tot el grup).'],
  gen(lv){const SUP=[['fast',['the fastest'],'The cheetah is ___ animal in the world'],['tall',['the tallest'],'The giraffe is ___ animal in the zoo'],['big',['the biggest'],'The blue whale is ___ animal on Earth'],['hot',['the hottest'],'August is ___ month of the year in Mallorca'],['small',['the smallest'],'The hummingbird is ___ bird in the world'],['cold',['the coldest'],'Antarctica is ___ place on Earth'],['happy',['the happiest'],'My birthday is ___ day of the year'],['funny',['the funniest'],'Marc is ___ boy in our class'],['heavy',['the heaviest'],'The elephant is ___ land animal'],['easy',['the easiest'],'This is ___ exercise in the book'],['long',['the longest'],'The Nile is one of ___ rivers in the world'],
    ['beautiful',['the most beautiful'],'I think Menorca is ___ island in the world'],['expensive',['the most expensive'],'This is ___ car in the shop'],['interesting',['the most interesting'],'This is ___ book in the library'],['popular',['the most popular'],'Football is ___ sport in Spain'],['dangerous',['the most dangerous'],'The shark is one of ___ fish in the sea'],['good',['the best'],'For me, pizza is ___ food in the world'],['bad',['the worst'],'This is ___ film I have ever seen'],['far',['the farthest','the furthest'],'Neptune is ___ planet from the Sun']];
   if(lv>=2&&Math.random()<.35){const[a,c,sent]=pick(COMP);
    return{text:`Comparatiu o superlatiu? Completa:<br><b>${sent.replace('___','___')}.</b> ${mut(a)}`,fields:[{label:'Adjectiu',txt:[norm(c)],wide:true}],vis:null,pron:sent.replace('___',c),
     hints:['Hi ha «than» a la frase? Llavors comparam dues coses.',`Comparatiu de «${a}».`],steps:['La frase té <b>than</b> → comparam dues coses → comparatiu.',`${a} → <b>${c}</b>.`,`${sent.replace('___','<b>'+c+'</b>')}.`],
     err:v=>v[0]===norm(c)?null:(v[0].startsWith('the ')||/est$/.test(v[0]))?'en_comp_sup':[`more ${a}`,a+'er',a+'r',`more ${c}`].includes(v[0])?'en_comparatiu':null}}
   const[a,sup,sent]=pick(lv?SUP:SUP.slice(0,10)),ans=sup.map(norm),long=sup[0].startsWith('the most');
   const why=['good','bad','far'].includes(a)?'és irregular':long?'és un adjectiu llarg → the most + adjectiu':/iest$/.test(sup[0])?'acaba en y → the + -iest':/(.)\1est$/.test(sup[0])?'acaba en vocal + consonant → doblam la consonant i afegim -est':'és curt → the + -est';
   return{text:`Completa amb el <b>superlatiu</b>:<br><b>${sent}.</b> ${mut(a)}`,fields:[{label:'Superlatiu (amb the)',txt:ans,wide:true}],vis:null,pron:sent.replace('___',sup[0]),
    hints:[`«${a}» és un adjectiu curt o llarg? És irregular?`,`«${a}» ${why}. No t'oblidis de «the».`],
    steps:[`«${a}» ${why}.`,`${a} → <b>${sup[0]}</b>.`,`${sent.replace('___','<b>'+sup[0]+'</b>')}.`],
    err:v=>{if(ans.includes(v[0]))return null;if(ans.some(x=>x.slice(4)===v[0]))return'en_super_the';
     const cmp=COMP.find(x=>x[0]===a);if([`more ${a}`,a+'er',`the more ${a}`,cmp&&norm(cmp[1])].includes(v[0])||/ than$/.test(v[0]))return'en_comp_sup';
     if(v[0].startsWith('the ')||v[0].startsWith('most ')||/est$/.test(v[0]))return'en_superlatiu';return null}}}},
 en_modal:{mat:'angles',ab:'Md',curs:[6],bloc:EV,nom:'Can, must i should',
  teoria:[tbl(['Modal','Serveix per...','Exemple'],[['<b>can / can\'t</b>','saber fer (habilitat) o demanar permís','I can swim. Can I go out?'],['<b>could / couldn\'t</b>','saber fer, en el passat','I could read when I was five.'],['<b>must</b>','obligació','You must wear a helmet.'],['<b>mustn\'t</b>','prohibició','You mustn\'t run in the corridor.'],['<b>should / shouldn\'t</b>','consell','You should drink water.']]),
   'Després d\'un modal, el verb va en <b>infinitiu sense to</b> i sense -s: <i>She <b>can swim</b></i> (no «can swims», no «can to swim»).',
   'Són iguals per a totes les persones: I can, he can, they can.'],
  gen(lv){if(lv>=1&&Math.random()<.35){const[su,vb,rest,m,ca]=pick(MODV),good=`${m} ${vb}`,ans=A(good);
    return{text:`Completa amb el modal i el verb:<br><span class="muted">${ca}</span><br><b>${su} ___ ${rest}.</b> ${mut(vb)}`,fields:[{label:'Modal + verb',txt:ans,wide:true}],vis:null,pron:`${su} ${good} ${rest}.`,
     hints:['Mira la frase en català: és habilitat, obligació o consell?',`Després del modal, el verb «${vb}» va en infinitiu, sense -s.`],
     steps:[`En català: «${ca}» → <b>${m}</b>.`,`El verb queda en infinitiu: <b>${vb}</b>.`,`${su} <b>${good}</b> ${rest}.`],
     err:v=>ans.includes(v[0])?null:A(`${m} ${s3(vb)}`).includes(v[0])?'en_modal_inf':A(`${m} to ${vb}`).includes(v[0])?'en_modal_to':MOD_ALL.some(x=>v[0]===`${x} ${vb}`)?'en_modal':null}}
   const[q,ca,ok]=pick(MOD.filter(x=>x[3]<=lv)),ans=A(ok);
   return{text:`Completa amb un modal (can, can't, must, mustn't, should...):<br><span class="muted">${ca}</span><br><b>${q}</b>`,fields:[{label:'Modal',txt:ans,wide:true}],vis:null,pron:q.replace('___',ok[0]),
    hints:['Llegeix la frase en català: és saber fer, permís, obligació, prohibició o consell?','saber fer / permís → can · obligació → must · prohibició → mustn\'t · consell → should'],
    steps:[`En català: «${ca}».`,`Per això fem servir <b>${ok.join(' / ')}</b>.`,`<b>${q.replace('___',ok[0])}</b>`],
    err:v=>ans.includes(v[0])?null:/^(can|must|should|could|have|has) to/.test(v[0])&&!v[0].startsWith('have to')&&!v[0].startsWith('has to')?'en_modal_to':MOD_ALL.includes(v[0])?'en_modal':null}}},
 en_there:{mat:'angles',ab:'Th',curs:[6],bloc:GR,nom:'There is / are · there was / were',
  teoria:['Per dir què <b>hi ha</b>: <b>there is</b> (una cosa) · <b>there are</b> (més d\'una). Per dir què <b>hi havia</b>: <b>there was</b> · <b>there were</b>.',
   tbl(['','Present','Passat'],[['Singular','There is a cat.','There was a cat.'],['Plural','There are two cats.','There were two cats.'],['Negativa','There isn\'t / aren\'t any...','There wasn\'t / weren\'t any...'],['Pregunta','Is there...? / Are there any...?','Was there...? / Were there any...?']]),
   'Exemple: <i>A hundred years ago there <b>were</b> no cars on the island. Now there <b>are</b> lots of cars.</i>'],
  gen(lv){const[sg,num,pl,place,nopast]=pick(THERE),past=lv>0&&!nopast&&Math.random()<.5,many=Math.random()<.5,r=Math.random(),type=lv===0?0:lv===1?(r<.65?0:1):(r<.4?0:r<.7?1:2),neg=type===1,q=type===2;
   const tm=past?pick(['Last year','A hundred years ago','In 1990','When my grandma was young']):'',good=thereF(past,many,neg,q),ans=A(good,good.replace('there is',"there's"));
   const noun=many?(neg||q?`any ${pl}`:`${num} ${pl}`):sg,sent=q?`___ ${noun} ${place}${tm?' '+tm.toLowerCase():''}?`:`${tm?tm+' ':''}___ ${noun} ${place}.`;
   return{text:`Completa amb <b>there is / are / was / were</b>${neg?' en <b>negativa</b>':q?' en <b>pregunta</b>':''}:<br><b>${sent}</b>`,fields:[{label:q?'Dues paraules':'There + verb',txt:ans,wide:true}],vis:null,pron:sent.replace('___',q?cap(good):good),
    hints:[`És una cosa o més d'una? («${noun}»)`,past?`«${tm}» → és passat: was / were.`:'No hi ha cap paraula de passat: present, is / are.'],
    steps:[`«${noun}» → ${many?'plural':'singular'}.`,`${past?'Passat':'Present'}${neg?', negativa':q?', pregunta':''} → <b>${good}</b>.`,`<b>${sent.replace('___',q?cap(good):good)}</b>`],
    err:v=>{if(ans.includes(v[0]))return null;const f=(p,m)=>A(thereF(p,m,neg,q)).includes(v[0])||(!q&&A(thereF(p,m,!neg,q)).includes(v[0]));
     if(f(past,!many))return'en_there';if(f(!past,many)||f(!past,!many))return'en_there_temps';return null}}}},
 en_quant:{mat:'angles',ab:'Qn',curs:[6],bloc:GR,nom:'Some / any · much / many',
  teoria:['Hi ha noms que es poden <b>comptar</b> (<i>apples, books</i>: one, two, three...) i noms que <b>no</b> es poden comptar (<i>milk, water, bread, rice, money</i>).',
   '<b>some</b> en frases afirmatives: <i>There are <b>some</b> apples.</i> · <b>any</b> en negatives i preguntes: <i>There isn\'t <b>any</b> milk. Have you got <b>any</b> eggs?</i>',
   '<b>many</b> amb noms comptables: <i>How <b>many</b> books?</i> · <b>much</b> amb incomptables: <i>How <b>much</b> water?</i> En afirmatives solem dir <b>a lot of</b>: <i>a lot of friends, a lot of money</i>.'],
  gen(lv){const c=Math.random()<.5,n=pick(c?CNT:UNC),mm=lv>0&&Math.random()<.5;let sent,ans,typ;
   if(!mm){typ=pick(['aff','neg','q']);ans=typ==='aff'?'some':'any';
    sent=pick({aff:[`There ${c?'are':'is'} ___ ${n} on the table.`,`I've got ___ ${n} in my bag.`,`We need ___ ${n} for the party.`],neg:[`There ${c?"aren't":"isn't"} ___ ${n} in the kitchen.`,`I haven't got ___ ${n}.`,`We didn't buy ___ ${n}.`],q:[`${c?'Are':'Is'} there ___ ${n} in the fridge?`,`Have you got ___ ${n}?`,`Did you buy ___ ${n}?`]}[typ])}
   else{ans=c?'many':'much';sent=pick([`How ___ ${n} ${c?'are':'is'} there?`,`There ${c?"aren't":"isn't"} ___ ${n} left.`,`We haven't got ___ ${n}.`,`How ___ ${n} do you need?`])}
   const cn=c?'es pot comptar (comptable)':'no es pot comptar (incomptable)';
   return{text:`Completa amb <b>${mm?'much o many':'some o any'}</b>:<br><b>${sent}</b>`,fields:[{label:'Paraula',txt:[ans]}],vis:null,pron:sent.replace('___',ans),
    hints:mm?[`«${n}» es pot comptar?`,`«${n}» ${cn}.`]:['La frase és afirmativa, negativa o una pregunta?',typ==='aff'?'És afirmativa.':typ==='neg'?'És negativa.':'És una pregunta.'],
    steps:mm?[`«${n}» ${cn}.`,`${c?'Comptable → <b>many</b>':'Incomptable → <b>much</b>'}.`,`<b>${sent.replace('___',ans)}</b>`]:[`La frase és ${typ==='aff'?'afirmativa':typ==='neg'?'negativa':'una pregunta'}.`,`${typ==='aff'?'Afirmativa → <b>some</b>':'Negativa o pregunta → <b>any</b>'}.`,`<b>${sent.replace('___',ans)}</b>`],
    err:v=>v[0]===ans?null:(!mm&&['some','any'].includes(v[0]))?'en_some_any':(mm&&['much','many'].includes(v[0]))?'en_much_many':null}}},
 en_going:{mat:'angles',ab:'Gt',curs:[6],bloc:EV,nom:'Going to: plans de futur',
  teoria:['Per parlar de <b>plans</b> que ja hem decidit fem servir <b>am / is / are + going to + verb</b>: <i>Next summer I <b>am going to visit</b> London.</i>',
   tbl(['','Afirmativa','Negativa'],[['I','I am going to play','I\'m not going to play'],['he / she / it','she is going to play','she isn\'t going to play'],['we / you / they','they are going to play','they aren\'t going to play']]),
   'Pregunta: <i><b>Are</b> you <b>going to</b> play? — Yes, I am. / No, I\'m not.</i> Paraules pista: <i>tomorrow, next week, next summer, tonight</i>.'],
  gen(lv){const[b,rest]=pick(GOING),[su,sl,pers]=pick(SUBJ6),be=BE[pers],w=pick(WHEN_F),r=Math.random(),kind=lv===0?0:lv===1?(r<.6?0:1):(r<.35?0:r<.65?1:2);
   const bad=v=>v===`going to ${b}`||v===`${be} going ${b}`||new RegExp(`^(${BE.join('|')}|am not|isn't|aren't|is not|are not|isnt|arent) going to (${[s3(b),...pastOf(b)].join('|')}|\\w+ing)$`).test(v)||v===`${be} go to ${b}`;
   if(kind===2&&pers>0){const ans2=`going to ${b}`;
    return{text:`Completa la <b>pregunta</b>:<br><b>___ ${sl} ___ ${rest} ${w}?</b> ${mut(b)}`,fields:[{label:'1a paraula',txt:[be]},{label:'going to + verb',txt:[norm(ans2)],wide:true}],vis:null,pron:`${cap(be)} ${sl} going to ${b} ${rest} ${w}?`,
     hints:[`La pregunta comença amb el verb to be que va amb «${sl}».`,'Després: going to + verb en infinitiu.'],
     steps:[`«${sl}» → <b>${cap(be)}</b>.`,`Després: <b>going to ${b}</b>.`,`<b>${cap(be)}</b> ${sl} <b>going to ${b}</b> ${rest} ${w}?`],
     err:v=>v[0]===be&&v[1]===norm(ans2)?null:(BE.includes(v[0])&&v[0]!==be)?'en_be':(v[1]&&v[1]!==norm(ans2)&&v[1].startsWith('going'))?'en_going':null}}
   const neg=kind>=1,good=neg?(pers===0?`am not going to ${b}`:`${be}n't going to ${b}`):`${be} going to ${b}`,ans=A(good);
   return{text:`Completa amb <b>going to</b>${neg?' en <b>negativa</b>':''}:<br><b>${cap(w)} ${sl} ___ ${rest}.</b> ${mut(neg?'not / '+b:b)}`,fields:[{label:'am / is / are + going to + verb',txt:ans,wide:true}],vis:null,pron:`${cap(w)} ${sl} ${good} ${rest}.`,
    hints:[`Quina forma de to be va amb «${su}»? (am, is, are)`,`Després: ${neg?'not + ':''}going to + verb en infinitiu.`],
    steps:[`«${su}» → <b>${be}</b>${neg?' + not':''}.`,`${be}${neg?' not':''} + going to + ${b}.`,`${cap(w)} ${sl} <b>${good}</b> ${rest}.`],
    err:v=>{if(ans.includes(v[0]))return null;if(v[0]===`going to ${b}`||v[0]===`not going to ${b}`)return'en_going_be';if(bad(v[0]))return'en_going';
     if(BE.some(x=>x!==be&&A(neg?`${x}n't going to ${b}`:`${x} going to ${b}`).includes(v[0])))return'en_be';return null}}}},
 en_will:{mat:'angles',ab:'Wl',curs:[6],bloc:EV,nom:'Will / won\'t: prediccions',
  teoria:['Per fer <b>prediccions</b> (el que pensam que passarà) fem servir <b>will + verb</b>: <i>In 2050 people <b>will live</b> on Mars.</i>',
   'Negativa: <b>won\'t</b> (= will not) + verb: <i>Robots <b>won\'t do</b> our homework.</i> Pregunta: <i><b>Will</b> it <b>rain</b> tomorrow? — Yes, it will. / No, it won\'t.</i>',
   'Will és igual per a totes les persones i el verb va en infinitiu, sense to ni -s: <i>She <b>will be</b></i> (no «will is», no «will to be»).'],
  gen(lv){const it=pick(WILL),[su,b,rest,qs]=it,r=Math.random(),kind=lv===0?0:lv===1?(r<.6?0:1):(r<.35?0:r<.65?1:2);
   const badW=v=>new RegExp(`^(will|won't|will not|wont) (to ${b}|${s3(b)}|${pastOf(b).join('|')}|\\w+ing)$`).test(v)&&!A(`will ${b}`,`won't ${b}`).includes(v);
   if(kind===2&&qs)return{text:`Completa la <b>pregunta</b>:<br><b>___ ${qs} ___ ${rest}?</b> ${mut(b)}`,fields:[{label:'1a paraula',txt:['will']},{label:'2a paraula',txt:[b]}],vis:null,pron:`Will ${qs} ${b} ${rest}?`,
    hints:['Les preguntes de futur comencen amb will.','Després del subjecte, el verb en infinitiu.'],
    steps:['Pregunta → <b>Will</b> + subjecte + verb.',`El verb queda en infinitiu: <b>${b}</b>.`,`<b>Will</b> ${qs} <b>${b}</b> ${rest}?`],
    err:v=>v[0]==='will'&&v[1]===b?null:(v[0]==='will'&&[s3(b),...pastOf(b)].includes(v[1]))||v[1]===`to ${b}`?'en_will_inf':null};
   const neg=kind>=1,good=neg?`won't ${b}`:`will ${b}`,ans=A(good);
   return{text:`Completa amb <b>${neg?'won\'t':'will'}</b> i el verb:<br><b>${su} ___ ${rest}.</b> ${mut(neg?'not / '+b:b)}`,fields:[{label:neg?'won\'t + verb':'will + verb',txt:ans,wide:true}],vis:null,pron:`${su} ${good} ${rest}.`,
    hints:[`És una predicció: ${neg?'won\'t':'will'} + verb.`,`El verb «${b}» va en infinitiu, sense to ni -s.`],
    steps:[`Predicció${neg?' negativa':''} → <b>${neg?'won\'t':'will'}</b>.`,`Verb en infinitiu: <b>${b}</b>.`,`${su} <b>${good}</b> ${rest}.`],
    err:v=>ans.includes(v[0])?null:badW(v[0])?'en_will_inf':null}}},
 en_pperf:{mat:'angles',ab:'Pf',curs:[6],bloc:EV,nom:'Present perfect: experiències (ever, never)',
  teoria:['El <b>present perfect</b> serveix per parlar d\'<b>experiències</b>, coses que hem fet alguna vegada a la vida (sense dir quan): <i>I <b>have visited</b> London.</i>',
   'Es forma amb <b>have / has + participi</b> (la tercera forma del verb): <i>I <b>have seen</b> a whale. She <b>has eaten</b> sushi.</i> Els participis són a la <b>Taula de verbs</b>.',
   tbl(['','Exemple'],[['Afirmativa','I have been to Menorca.'],['Negativa','She hasn\'t ridden a camel.'],['Amb never','We have never seen snow.'],['Pregunta','Have you ever flown in a plane? — Yes, I have. / No, I haven\'t.']])],
  gen(lv){const[b,rest]=pick(EXP),[su,sl,pers]=pick(SUBJ6),hv=pers===1?'has':'have',other=pers===1?'have':'has',pp=ppOf(b),pa=pastOf(b),r=Math.random(),kind=lv===0?0:lv===1?(r<.5?0:1):(r<.3?0:r<.6?1:2);
   const er=(v,neg)=>{const h=neg?hv+"n't":hv,o=neg?other+"n't":other;
    if(pa.some(p=>!pp.includes(p)&&A(`${h} ${p}`).includes(v)))return'en_pp_passat';if(pp.some(p=>A(`${o} ${p}`).includes(v)))return'en_have_has';
    if([...pp,...pa].includes(v))return'en_pperf_have';if(A(`${h} ${b}`).includes(v)&&!pp.includes(b))return'en_pperf_pp';return null};
   if(kind===2&&pers>0){const Hv=cap(hv);
    return{text:`Completa la <b>pregunta</b>:<br><b>___ ${sl} ever ___ ${rest}?</b> ${mut(b)}`,fields:[{label:'1a paraula',txt:[hv]},{label:'Participi',txt:pp.map(norm)}],vis:null,pron:`${Hv} ${sl} ever ${pp[0]} ${rest}?`,
     hints:[`La pregunta comença amb have o has. «${sl}» és ${pers===1?'he, she o it':'you, we o they'}.`,`Quina és la tercera forma de «${b}»?`],
     steps:[`«${sl}» → <b>${Hv}</b>.`,`Participi de ${b}: ${b} – ${pa[0]} – <b>${pp[0]}</b>.`,`<b>${Hv}</b> ${sl} ever <b>${pp[0]}</b> ${rest}?`],
     err:v=>v[0]===hv&&pp.includes(v[1])?null:(v[0]===other)?'en_have_has':(pa.includes(v[1])&&!pp.includes(v[1]))?'en_pp_passat':null}}
   const neg=kind===1&&Math.random()<.5,never=kind===1&&!neg,good=neg?`${hv}n't ${pp[0]}`:never?`${hv} never ${pp[0]}`:`${hv} ${pp[0]}`;
   const ans=A(pp.flatMap(p=>neg?[`${hv}n't ${p}`]:never?[`${hv} never ${p}`]:[`${hv} ${p}`]));
   return{text:`Completa amb el <b>present perfect</b>${neg?' en <b>negativa</b>':never?' i <b>never</b>':''}:<br><b>${su} ___ ${rest}.</b> ${mut(neg?'not / '+b:never?'never / '+b:b)}`,fields:[{label:'have / has + participi',txt:ans,wide:true}],vis:null,pron:`${su} ${good} ${rest}.`,
    hints:[`«${su}» va amb have o amb has?`,`Quina és la tercera forma (participi) de «${b}»?${never?' «Never» va entre have/has i el participi.':''}`],
    steps:[`«${su}» → <b>${hv}</b>${neg?' + n\'t':''}.`,`Participi de ${b}: ${b} – ${pa[0]} – <b>${pp[0]}</b>.`,`${su} <b>${good}</b> ${rest}.`],
    err:v=>ans.includes(v[0])?null:er(never?v[0].replace(' never ',' '):v[0],neg)}}},
 en_prep:{mat:'angles',ab:'Lc',curs:[6],bloc:GR,nom:'Preposicions de lloc (in, on, under...)',
  teoria:['Les <b>preposicions de lloc</b> diuen on és una cosa.',
   tbl(['Anglès','Català'],[['<b>in</b>','dins'],['<b>on</b>','damunt / sobre'],['<b>under</b>','davall / sota'],['<b>next to</b>','al costat de'],['<b>behind</b>','darrere'],['<b>in front of</b>','davant'],['<b>between</b>','entre'],['<b>opposite</b>','enfront de (a l\'altra banda)']]),
   'Exemple: <i>The cat is <b>under</b> the table. The bank is <b>opposite</b> the park. The school is <b>between</b> the library and the church.</i>'],
  gen(lv){const p=pick(Object.keys(PLACE).filter(k=>PLACE[k][3]<=lv)),[obj,,ca]=PLACE[p],ans=p==='next to'?['next to','beside']:[p],the=obj==='boxes'?'the two boxes':`the ${obj}`;
   return{text:`Mira el dibuix. <b>Where is the cat?</b><br><b>The cat is ___ ${the}.</b>`,fig:placeFig(p),fields:[{label:'Preposició',txt:ans,wide:true}],vis:null,pron:`The cat is ${p} ${the}.`,
    hints:[`Mira on és el gat respecte de ${obj==='table'?'la taula':obj==='boxes'?'les capses':'la capsa'}.`,`En català diríem que ${ca}.`],
    steps:[`Al dibuix, ${ca}.`,`En anglès: <b>${p}</b>.`,`The cat is <b>${p}</b> ${the}.`],
    err:v=>ans.includes(v[0])?null:[...Object.keys(PLACE),'opposite','beside','near','above','below','inside','over'].includes(v[0])?'en_prep_lloc':null}}},
 en_prep_t:{mat:'angles',ab:'At',curs:[6],bloc:GR,nom:'Preposicions de temps (in, on, at)',
  teoria:[tbl(['Preposició','Quan la fem servir','Exemples'],[['<b>at</b>','hores i algunes expressions','at 7 o\'clock, at night, at the weekend'],['<b>on</b>','dies de la setmana i dates','on Monday, on 5th May, on my birthday'],['<b>in</b>','mesos, estacions, anys i parts del dia','in July, in summer, in 2014, in the morning']]),
   'Compte: <i><b>in</b> the morning</i>, però <i><b>on</b> Sunday morning</i> (perquè és un dia concret) i <i><b>at</b> night</i>.'],
  gen(lv){const[s,p,why]=pick(PT.filter(x=>x[3]<=lv));
   return{text:`Completa amb <b>in</b>, <b>on</b> o <b>at</b>:<br><b>${s}</b>`,fields:[{label:'Preposició',txt:[p]}],vis:null,pron:s.replace('___',p),
    hints:['És una hora, un dia, una data, un mes, una estació, un any o una part del dia?',`Fem servir la preposició ${why}.`],
    steps:[`La paraula que segueix és ${why.replace(/^davant /,'')}.`,`Per això: <b>${p}</b>.`,`<b>${s.replace('___',p)}</b>`],
    err:v=>v[0]!==p&&['in','on','at'].includes(v[0])?'en_prep_temps':null}}},
 en_read:{mat:'angles',ab:'Rd',curs:[6],bloc:VC,nom:'Comprensió lectora (reading)',
  teoria:['Per entendre un text en anglès no cal saber totes les paraules. Truc en tres passes:',
   '1. <b>Llegeix la pregunta</b> i mira la paraula interrogativa: <i>Who</i> (qui), <i>Where</i> (on), <i>When</i> (quan), <i>What</i> (què), <i>How</i> (com).',
   '2. <b>Busca al text</b> les paraules de la pregunta. 3. <b>Respon curt</b>, amb una o dues paraules: <i>Where does Lucy live? — In Sóller.</i>'],
  gen(lv){const[tit,txt,,qs]=pick(READ.filter(x=>x[2]<=lv)),[q,a,ev]=pick(qs);
   return{text:`<div style="text-align:left;font-size:17px;line-height:1.5;background:#F4F8FF;border-left:4px solid var(--s-angles);padding:10px 14px;margin-bottom:10px"><b>${tit}</b><br>${esc(txt)}</div>Llegeix el text i respon en anglès, curt:<br><b>${esc(q)}</b>`,fields:[{label:'Resposta (una o dues paraules)',txt:[...new Set(a.map(norm))],loose:true,wide:true}],vis:null,pron:q,
    hints:[`${qWord(q)}. Busca al text les paraules de la pregunta.`,`La resposta és en aquesta part del text: «${esc(ev)}».`],
    steps:[`La pregunta: «${esc(q)}». ${qWord(q)}.`,`Al text diu: «${esc(ev)}».`,`Resposta: <b>${esc(a[0][0].toUpperCase()+a[0].slice(1))}</b>.`]}}}
});

/* ---------- ordre dels temes, unitats i temari de 6è ---------- */
SK_ORDER.splice(0,SK_ORDER.length,'en_present','en_pres_neg','en_freq','en_cont','en_simple_cont','en_be','en_was','en_reg_past','en_irr_past','en_irr_pp','en_irr_inf','en_verb_sig','en_past','en_past_neg','en_going','en_will','en_pperf','en_modal',
 'en_plural','en_compar','en_super','en_wh','en_poss','en_there','en_quant','en_prep','en_prep_t',
 'en_vocab','en_voc_feel','en_voc_jobs','en_voc_town','en_voc_food','en_voc_sport','en_voc_health','en_voc_tech','en_voc_nature','en_listen','en_read');
const U6=[
 ['Feelings and routines · Emocions i rutines',['en_voc_feel','en_be','en_present','en_pres_neg','en_freq','en_prep_t'],'Present simple: negatives, preguntes i adverbis de freqüència; in / on / at'],
 ['Jobs · Les feines',['en_voc_jobs','en_cont','en_simple_cont','en_wh'],'Present continuous; present simple o continuous; preguntes amb wh-'],
 ['In town · A la ciutat',['en_voc_town','en_there','en_prep'],'There is / are / was / were; preposicions de lloc; direccions'],
 ['Food and shopping · Menjar i compres',['en_voc_food','en_quant','en_plural'],'Some / any, much / many; plurals'],
 ['Sports and records · Esports i rècords',['en_voc_sport','en_compar','en_super'],'Comparatius i superlatius'],
 ['Health · La salut',['en_voc_health','en_modal','en_poss'],'Can, must, should; possessius'],
 ['Inventions and the past · Invents i el passat',['en_voc_tech','en_was','en_reg_past','en_irr_past','en_irr_inf','en_past','en_past_neg'],'Was / were; past simple regular i irregular; did / didn\'t'],
 ['Our planet and the future · El planeta i el futur',['en_voc_nature','en_going','en_will'],'Going to (plans) i will (prediccions)'],
 ['Experiences · Experiències',['en_pperf','en_irr_pp','en_verb_sig'],'Present perfect amb ever / never; participis'],
 ['Reading and listening · Llegir i escoltar',['en_read','en_listen','en_vocab'],'Comprensió lectora i oral']];
UNITS.angles=UNITS.angles.map(u=>u[2]?u:[u[0],u[1],[5]]).concat(U6.map(([n,ks])=>[n,ks,[6]]));
TEMARI.angles[6]=U6.map(([n,ks,g])=>[`${n.split(' · ')[1]} (${n.split(' · ')[0]}): ${g}`,ks]);
})();
