/* Aprenem - ANGLÈS 6è: unitats en l'ordre del llibre de referència
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.

   Llibre de referència: «Guess What! 6» (Cambridge University Press), Special Edition for Spain
   Updated (Activity Book ISBN 978-84-1322-104-5 · Pupil's Book ISBN 978-84-1322-101-4).

   Fonts consultades per a l'estructura (només els títols, el vocabulari clau i la gramàtica de cada
   unitat; tots els textos, frases i exercicis d'aquest arxiu són propis):
   - Cambridge University Press, «Guess What! Level 6 Pupil's Book British English» (S. Reed i
     K. Bentley, 2015, ISBN 978-1-107-54550-2): pàgina de continguts de la mostra de l'editorial
     (unitats, vocabulari, gramàtica, CLIL i valors).
   - Índex de l'Activity Book 6 (Seasons and weather; 1 Camping; 2 Talent show; 3 International food;
     4 Music; 5 Now and then; 6 The environment; 7 Space; 8 Celebrations; repàs cada dues unitats).
   - Cambridge España, catàleg de «Guess What! Updated Edition» (cambridge.es) i el «Booklet 6» de
     l'edició actualitzada, apartat «Get it right!» (errors típics dels hispanoparlants: ordre dels
     adjectius, enough, very much, ortografia dels passats).

   Unitats del llibre i gramàtica:
     Welcome  Seasons and weather — estacions, fenòmens del temps; past simple, was/were, there was/were
     1 Camping — material d'acampada; verb + to + infinitiu (want to, try to); ask/tell someone to
     2 Talent show — talents; good/better/the best, bad/worse/the worst; better at + -ing
     3 International food — plats del món; want someone to; to + verb per dir la finalitat
     4 Music — instruments; adverbis de manera (slowly, well) i la seva comparació
     5 Now and then — mitjans de comunicació; could / couldn't (habilitat en el passat)
     6 The environment — materials i energia; should / shouldn't
     7 Space — l'espai; going to
     8 Celebrations — festes i desfilades; relatius who / which / where

   Aquest arxiu es carrega després d'angles.js i angles-6e.js: hi afegeix els temes que faltaven
   (curs:[6]) i defineix l'ordre dels temes, les unitats de 6è i el temari de 6è. Els temes de 6è
   que el llibre no treballa es conserven a les unitats de repàs del final. */
(()=>{
const EV='Verbs i temps verbals',GR='Gramàtica',VC='Vocabulari i comprensió';
// Variants acceptades: contraccions (shouldn't / should not / shouldnt...)
const A=(...a)=>[...new Set(a.flat().flatMap(s=>{const f=s.replace(/can't/g,'cannot').replace(/won't/g,'will not').replace(/n't/g,' not').replace(/'m /g,' am ');
 return[s,f,s.replace(/'/g,''),f.replace(/'/g,'')]}).map(norm))];
const cap=s=>s[0].toUpperCase()+s.slice(1);
const mut=s=>`<span class="muted">(${s})</span>`;
const tbl=(h,rows)=>`<table class="mini"><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table>`;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const s3=b=>b==='have'?'has':b==='do'?'does':b==='go'?'goes':/(s|sh|ch|x|o|z)$/.test(b)?b+'es':/[^aeiou]y$/.test(b)?b.slice(0,-1)+'ies':b+'s';
const ing=b=>({swim:'swimming',run:'running',put:'putting',sit:'sitting',get:'getting'})[b]||(/[^e]e$/.test(b)?b.slice(0,-1)+'ing':b+'ing');
const pastF=b=>{const i=IRR.find(v=>v.b===b);return i?i.p:[regPast(b)]};

Object.assign(ERR,{
 en_verb_to:{kid:'Després de want, try, decide, need, ask, tell... el segon verb va amb <b>to</b> + infinitiu: wanted <b>to go</b>. En negativa: told us <b>not to</b> run.',par:'Oblida «to» o conjuga el segon verb (want go, wanted went, to not run)'},
 en_at_ing:{kid:'Després de <b>good at, better at, bad at</b> el verb porta <b>-ing</b>: good at <b>juggling</b>.',par:'No posa -ing després de «good at / better at»'},
 en_obj_pron:{kid:'Després de want, ask o tell va el pronom <b>complement</b>: me, you, him, her, it, us, them (no I, he, she, we, they).',par:'Fa servir el pronom subjecte en lloc del complement (want I to → want me to)'},
 en_for_to:{kid:'Per dir «per + verb» (per a què ho fem) en anglès fem servir <b>to</b> + verb: I went to the shop <b>to buy</b> bread. Mai «for buy».',par:'Tradueix «per a + verb» amb «for» (for buy) en lloc de «to»'},
 en_adv_adj:{kid:'Aquí cal un <b>adverbi</b> (com fa l\'acció), no un adjectiu: she sings <b>beautifully</b>, he plays <b>well</b>.',par:'Fa servir l\'adjectiu en lloc de l\'adverbi (sings beautiful, plays good)'},
 en_adv_irr:{kid:'Compte! És irregular: good → <b>well</b>, fast → <b>fast</b>, hard → <b>hard</b>. («Hardly» vol dir «gairebé no».)',par:'Forma malament els adverbis irregulars (goodly, fastly)'},
 en_could_temps:{kid:'Mira quan passa: ara → <b>can / can\'t</b> · en el passat → <b>could / couldn\'t</b>.',par:'Confon can i could (present i passat)'},
 en_relatiu:{kid:'Pensa de què parla: una persona → <b>who</b> · una cosa o un animal → <b>which</b> · un lloc → <b>where</b>.',par:'Confon els relatius who, which i where'},
 en_adj_ordre:{kid:'Les paraules són bones, però l\'ordre dels adjectius no: opinió → mida → edat → forma → color → origen → material → nom.',par:'Col·loca malament els adjectius (a red small umbrella)'},
 en_enough:{kid:'<b>Enough</b> va <b>darrere</b> l\'adjectiu: big <b>enough</b> (no «enough big»).',par:'Posa «enough» davant l\'adjectiu'},
 en_very_much:{kid:'<b>Very much</b> va al final, darrere la cosa que t\'agrada: I like football <b>very much</b>.',par:'Posa «very much» entre el verb i el complement (I like very much football)'}
});

/* ---------- vocabulari de les unitats del llibre ---------- */
// 'anglès/alternativa;català/alternativa;emoticona;1 = nivell més alt'
const vocList=s=>s.split('|').map(x=>{const[en,ca,em,h]=x.split(';'),alts=en.split('/');return{en:alts[0],alts,ca:ca.split('/'),em:em||'',h:+(h||0)}});
const VG={
 en_voc_seasons:{ab:'Ws',nom:'Vocabulari: les estacions i el temps',intro:'Per parlar de les estacions i del temps que fa (o que va fer): <i>Last winter there was a big storm. In autumn it\'s often windy.</i>',
  w:`spring;primavera;🌷|summer;estiu;☀️|autumn/fall;tardor;🍂|winter;hivern;⛄|storm;tempesta;⛈️|thunder;tro/trons;🌩️|lightning;llamp/llamps/llampec;⚡|rainbow;arc de Sant Martí/arc iris;🌈|cloudy;ennuvolat/nuvolat;☁️|sunny;assolellat/fa sol;🌞|windy;fa vent/ventós;💨|foggy;fa boira/boirós;🌫️;1|monsoon;monsó/estació de les pluges;🌧️;1|drought;sequera;🏜️;1|flood;inundació/riuada;🌊;1|hail;calabruix/pedra;🧊;1|heatwave/heat wave;onada de calor;🥵;1|hurricane;huracà;🌀;1|freezing;glaçat/fa molt de fred;🥶;1|snowman;ninot de neu;☃️`},
 en_voc_camping:{ab:'Kp',nom:'Vocabulari: d\'acampada',intro:'Per preparar una acampada: <i>Don\'t forget your sleeping bag and a torch!</i>',
  w:`tent;tenda de campanya/tenda;⛺|sleeping bag;sac de dormir;|rucksack/backpack;motxilla;🎒|torch/flashlight;llanterna;🔦|map;mapa;🗺️|blanket;manta/flassada;|bowl;bol/escudella;🥣|cup;tassa;☕|plate;plat;🍽️|water bottle;cantimplora/botella d'aigua/ampolla d'aigua;|campfire;foguera/foc de campament;🔥;1|compass;brúixola;🧭;1|matches;llumins/mistos;;1|penknife/pocket knife;navalla;;1|insect repellent;repel·lent d'insectes/antimosquits;🦟;1|first aid kit;farmaciola;;1|sun cream/sunscreen;crema solar;;1|campsite;càmping;🏕️;1`},
 en_voc_talent:{ab:'Tl',nom:'Vocabulari: talents i espectacles',intro:'Per dir què sap fer cadascú en un espectacle de talents: <i>My cousin can juggle and tell jokes.</i>',
  w:`juggle;fer malabars/fer malabarismes;🤹|do cartwheels;fer la roda/fer rodes;🤸|do acrobatics;fer acrobàcies;|do tricks;fer trucs/fer jocs de mans;🎩|make sculptures;fer escultures;🗿|paint portraits;pintar retrats;🖼️|play instruments;tocar instruments;🎻|street dance;ball urbà/street dance;🕺|read poetry;llegir poesia/recitar poesia;📜|tell jokes;contar acudits/explicar acudits;😂|sing;cantar;🎤|act;actuar/fer teatre;🎭;1|audience;públic;👏;1|competition/contest;concurs/competició;🏆;1|prize;premi;🥇;1|stage;escenari;;1|winner;guanyador/guanyadora;;1|practise/practice;practicar/assajar;;1`},
 en_voc_dishes:{ab:'Wf',nom:'Vocabulari: menjar del món',intro:'Per parlar de plats de diferents països i de com són: <i>Noodles are from China. This curry is very spicy!</i> Algunes paraules es diuen igual en català: <b>paella, sushi, tacos</b>.',
  w:`curry;curri;🍛|dumplings;bunyols farcits/raviolis xinesos/gyozes;🥟;1|fish and chips;peix amb patates fregides/peix i patates;🐟|kebabs/kebab;kebab/broquetes;🍢|noodles;fideus;🍜|rice and beans;arròs amb mongetes/arròs amb fesols;🍚|stew;estofat/guisat/cuinat;🍲|spicy/hot;picant;🌶️|sweet;dolç;🍬|salty;salat;🧂|sour;agre/àcid;🍋;1|delicious/tasty;deliciós/bo/boníssim;😋|disgusting;fastigós/repugnant;🤢;1|fork;forquilla;🍴|knife;ganivet;🔪|spoon;cullera;🥄|chopsticks;bastonets;🥢;1|recipe;recepta;📖;1|cook;cuinar;🧑‍🍳|taste;tastar/provar;👅;1`},
 en_voc_instruments:{ab:'Mi',nom:'Vocabulari: instruments i música',intro:'Per parlar dels instruments i de com sonen: <i>My brother plays the drums very loudly.</i> Amb els instruments diem <b>play the</b> + instrument. El <b>clarinet</b> i el <b>piano</b> es diuen igual en català.',
  w:`drums;bateria/tambors;🥁|electric guitar;guitarra elèctrica;🎸|guitar;guitarra;🎸|flute;flauta travessera/flauta;|recorder;flauta dolça;|keyboard;teclat;🎹|saxophone/sax;saxòfon/saxo;🎷|trombone;trombó;|trumpet;trompeta;🎺|violin;violí;🎻|cymbals;plats/címbals;;1|harp;arpa;;1|cello;violoncel;;1|tambourine;pandereta;;1|orchestra;orquestra;;1|band;grup de música/banda;;1|composer;compositor/compositora;;1|loud;fort/sorollós;🔊;1|quiet;fluix/silenciós;🔈;1|string;corda;;1`},
 en_voc_media:{ab:'Nw',nom:'Vocabulari: comunicació, abans i ara',intro:'Per comparar com ens comunicàvem abans i com ho feim ara: <i>My grandparents wrote letters. Now we send text messages.</i>',
  w:`letter;carta;✉️|newspaper;diari;📰|magazine;revista;|dictionary;diccionari;📖|encyclopedia/encyclopaedia;enciclopèdia;📚|e-book/ebook;llibre electrònic/llibre digital;📱|email/e-mail;correu electrònic;📧|text message/text;missatge de text/missatge;💬|website;pàgina web/lloc web/web;🌐|online game;joc en línia/videojoc en línia;🎮|radio;ràdio;📻|television/TV;televisió/tele;📺|phone call;telefonada/trucada;📞;1|video call;videotrucada;;1|stamp;segell;;1|envelope;sobre;;1|typewriter;màquina d'escriure;;1|search;cercar/buscar;🔍;1`},
 en_voc_energy:{ab:'Ev',nom:'Vocabulari: materials i energia',intro:'Per parlar de què estan fetes les coses i de com estalviar energia: <i>This bottle is made of glass. We should use solar power.</i> El <b>gas</b> i el <b>paper</b> es diuen igual.',
  w:`glass;vidre;🍾|plastic;plàstic;|cardboard;cartró;📦|aluminium/aluminum;alumini;🥫|electricity;electricitat;⚡|water;aigua;💧|solar power/solar energy;energia solar;☀️|wind power/wind energy;energia eòlica;🌬️|recycle;reciclar;♻️|bin;paperera/contenidor;🗑️|turn off/switch off;apagar;💡|reduce;reduir;;1|reuse;reutilitzar;;1|waste;residus/deixalles;;1|save energy;estalviar energia;;1|pollution;contaminació;🏭;1|wood;fusta;;1|metal;metall;;1`},
 en_voc_space:{ab:'Sx',nom:'Vocabulari: l\'espai',intro:'Per parlar de l\'espai i dels viatges espacials: <i>Astronauts live on the space station.</i>',
  w:`astronaut;astronauta;🧑‍🚀|Earth/the Earth;la Terra/Terra;🌍|Mars;Mart;🔴|planets/planet;planetes/planeta;🪐|stars/star;estrelles/estrella;⭐|the moon/moon;la Lluna/lluna;🌙|the sun/sun;el Sol/sol;☀️|rocket;coet;🚀|space;espai;🌌|alien;extraterrestre;👽|spacecraft/spaceship;nau espacial;🛸|space station;estació espacial;🛰️;1|spacesuit;vestit espacial;;1|space laboratory/space lab;laboratori espacial;🔬;1|gravity;gravetat;;1|orbit;òrbita;;1|Jupiter;Júpiter;;1|land;aterrar/aterrar a la Lluna;🛬;1`},
 en_voc_parade:{ab:'Ce',nom:'Vocabulari: festes i celebracions',intro:'Per parlar de festes, carnavals i desfilades: <i>The children who wore dragon costumes danced in the parade.</i>',
  w:`costume;disfressa;|mask;màscara/careta;🎭|clown;pallasso/pallassa;🤡|pirate;pirata;🏴‍☠️|dragon;drac;🐉|dancer;ballarí/ballarina;💃|musician;músic/música;🎶|fireworks;focs artificials;🎆|funfair/fair;fira/atraccions;🎡|carnival;carnaval;🎊|celebrate;celebrar;🎉|balloon;globus;🎈|present/gift;regal;🎁|candles;espelmes/candeles;🕯️|witch;bruixa;🧙‍♀️|ghost;fantasma;👻|float;carrossa;;1|parade;desfilada/rua;;1|decorations;decoració/decoracions/adorns;;1|wizard;mag/bruixot;🧙;1`}
};
for(const[id,d]of Object.entries(VG)){const W=vocList(d.w);
 SK[id]={mat:'angles',ab:d.ab,curs:[6],bloc:VC,nom:d.nom,
  teoria:[`${d.intro}`,'Truc: <b>llegeix la paraula en veu alta, tapa-la i escriu-la</b>. Fixa\'t bé en les lletres que no sonen com en català.',
   tbl(['Anglès','Català'],W.map(w=>[`${w.em?w.em+' ':''}<b>${esc(w.alts.join(' / '))}</b>`,esc(w.ca.join(' / '))]))],
  gen(lv){const w=pick(W.filter(x=>lv>0||!x.h)),toEn=lv===0||Math.random()<.7,en=w.en,ca=w.ca.join(' / '),nw=en.split(' ').length,big=w.em?`<div style="font-size:56px;line-height:1.2">${w.em}</div>`:'';
   if(toEn)return{text:`${big}Com es diu «<b>${esc(ca)}</b>» en anglès?`,fields:[{label:'En anglès',txt:A(w.alts),wide:nw>1}],vis:null,pron:en,
    hints:[`Comença per «${en[0]}»${nw>1?` i són ${nw} paraules`:` i té ${en.length} lletres`}.`,en.split(' ').map(x=>x[0]+' _'.repeat(Math.max(0,x.length-1))).join('   ')],
    steps:[`«${esc(ca)}» en anglès és <b>${esc(w.alts.join(' / '))}</b>.`,`S'escriu així: ${esc(en.toUpperCase().split('').join(' '))}.`,'Digues-la en veu alta tres vegades i escriu-la una vegada al quadern.'],
    err:v=>{if(A(w.alts).includes(v[0]))return null;const d=Math.min(...w.alts.map(a=>lev(v[0],norm(a))));return d>0&&d<=2?'en_lletrejat':null}};
   return{text:`${big}Què vol dir «<b>${esc(en)}</b>»?`,fields:[{label:'En català',txt:w.ca.map(norm),loose:true,wide:true}],vis:null,pron:en,
    hints:[`Comença per «${w.ca[0][0].toUpperCase()}».`,`Té ${[...w.ca[0]].length} lletres${w.ca.length>1?' (hi ha més d\'una resposta bona)':''}.`],
    steps:[`«${esc(en)}» vol dir <b>${esc(ca)}</b>.`,'Digues-la en veu alta i fes-ne una frase curta en anglès.']}}};
}

/* ---------- dades per a la gramàtica ---------- */
// Unitat 1: [subjecte, verb conjugat, verb que va amb to, resta, en català, nivell]
const VTO=[['We','wanted','go','camping in the mountains','Volíem anar d\'acampada a la muntanya',0],['I','want','learn','how to use a compass','Vull aprendre a fer servir una brúixola',0],
 ['They','tried','put up','the tent before dark','Varen intentar muntar la tenda abans que es fes fosc',0],['She','needs','buy','a new torch','Ha de comprar una llanterna nova',0],
 ['He','decided','take','a warm blanket','Va decidir agafar una manta calenta',0],['We','hope','see','lots of stars tonight','Esperam veure moltes estrelles aquesta nit',0],
 ['You','need','fill','your water bottle','Has d\'omplir la cantimplora',0],['My dad','forgot','bring','the plates','El meu pare es va oblidar de dur els plats',1],
 ['I','learnt','light','a campfire safely','Vaig aprendre a encendre un foc amb seguretat',1],['They','promised','clean','the campsite','Varen prometre netejar el càmping',1],
 ['My sister','would like','sleep','in a hammock','A la meva germana li agradaria dormir en una hamaca',1],['We','planned','walk','up the hill at six o\'clock','Teníem previst pujar el turó a les sis',1]];
// ask / tell + persona + (not) to: [subjecte, verb, persona, verb, resta, en català, negativa]
const ASK=[['Mum','asked','me','pack','my rucksack','La mare em va demanar que fes la motxilla',0],['The guide','told','us','stay','near the tents','El guia ens va dir que ens quedàssim prop de les tendes',0],
 ['I','asked','my friend','pass','me the map','Vaig demanar al meu amic que em passàs el mapa',0],['Dad','told','my brother','wash','the cups and bowls','El pare va dir al meu germà que rentàs les tasses i els bols',0],
 ['The teacher','told','us','touch','the wild plants','La mestra ens va dir que no toquéssim les plantes salvatges',1],['Mum','asked','me','leave','rubbish in the forest','La mare em va demanar que no deixàs fems al bosc',1],
 ['The guide','told','them','swim','in the river at night','El guia els va dir que no nedassin al riu de nit',1]];
// Unitat 2: [verb, forma -ing, complement]
const TAL=[['juggle','juggling',''],['tell','telling',' jokes'],['make','making',' sculptures'],['paint','painting',' portraits'],['do','doing',' cartwheels'],['play','playing',' the violin'],
 ['read','reading',' poetry'],['dance','dancing',''],['sing','singing',''],['swim','swimming',''],['draw','drawing',' comics'],['do','doing',' magic tricks'],['run','running','']];
const PPL=[['Laura','her brother'],['My cousin','me'],['Marc','his friends'],['My grandpa','my grandma'],['Our teacher','the other teachers'],['Anna','Pau']];
const GROUP=['in the class','in my family','in the school','in the talent show','of all my friends'];
// Unitat 3: [frase abans, verb, resta, en català, nivell, pregunta amb Why]
const PURP=[['I went to the market','buy','some fresh fish','Vaig anar al mercat a comprar peix fresc',0,'Why did you go to the market?'],
 ['She went to the kitchen','make','a sandwich','Va anar a la cuina a fer-se un entrepà',0,'Why did she go to the kitchen?'],
 ['We went to a Chinese restaurant','celebrate','my birthday','Vàrem anar a un restaurant xinès a celebrar el meu aniversari',0,'Why did you go to a Chinese restaurant?'],
 ['He turned on the oven','bake','a cake','Va encendre el forn per fer un pastís',0,'Why did he turn on the oven?'],
 ['They used chopsticks','eat','the noodles','Varen fer servir bastonets per menjar els fideus',0,'Why did they use chopsticks?'],
 ['I opened the fridge','get','some orange juice','Vaig obrir la nevera per agafar suc de taronja',0,'Why did you open the fridge?'],
 ['My dad went to the baker\'s','buy','some bread','El meu pare va anar al forn a comprar pa',0,'Why did your dad go to the baker\'s?'],
 ['You need a sharp knife','cut','the onions','Necessites un ganivet esmolat per tallar les cebes',1,'Why do I need a sharp knife?'],
 ['I phoned my grandma','ask','for her stew recipe','Vaig telefonar a la meva padrina per demanar-li la recepta de l\'estofat',1,'Why did you phone your grandma?'],
 ['She saved her money','buy','a cookbook','Va estalviar per comprar un llibre de receptes',1,'Why did she save her money?'],
 ['We went to Mexico','learn','about Mexican food','Vàrem anar a Mèxic per aprendre coses del menjar mexicà',1,'Why did you go to Mexico?'],
 ['He washed his hands','help','with the dumplings','Es va rentar les mans per ajudar amb els bunyols farcits',1,'Why did he wash his hands?']];
// want / ask / tell + pronom complement + to: [qui vol, frase, en català (amb {p} = pronom català)]
const WOBJ=[['My mum wants','make the salad'],['The chef wants','taste the curry'],['My friends want','try the dumplings'],['Our teacher wants','bring some food from home'],
 ['Dad asked','set the table'],['The waiter asked','wait outside'],['Grandma told','wash the vegetables'],['My parents want','help in the kitchen'],['The cook told','put on an apron']];
const PRON=[['I','me'],['he','him'],['she','her'],['we','us'],['they','them'],['you','you'],['it','it']];
// Unitat 4: [adjectiu, adverbi, nivell, comparatiu de l'adverbi]
const ADV=[['slow','slowly',0,['more slowly','slower']],['quick','quickly',0,['more quickly','quicker']],['quiet','quietly',0,['more quietly','quieter']],['loud','loudly',0,['more loudly','louder']],
 ['beautiful','beautifully',0,['more beautifully']],['careful','carefully',0,['more carefully']],['bad','badly',0,['worse']],['perfect','perfectly',1,['more perfectly']],
 ['happy','happily',1,['more happily']],['easy','easily',1,['more easily']],['good','well',1,['better']],['fast','fast',1,['faster']],['hard','hard',1,['harder']],
 ['terrible','terribly',1,['more terribly']],['gentle','gently',1,['more gently']],['noisy','noisily',1,['more noisily']],['nice','nicely',1,['more nicely']]];
const MUS=[['My sister','plays the violin','plays'],['Tom','sings','sings'],['The band','plays','plays'],['Our music teacher','speaks','speaks'],['The drummer','plays the drums','plays'],
 ['My grandpa','dances','dances'],['Júlia','plays the keyboard','plays'],['My brother','practises the trumpet','practises'],['The choir','sings','sings']];
// Unitat 5: activitats per a could / can
const ABIL=['swim','ride a bike','read','write my name','tie my shoelaces','use a computer','play the recorder','speak English','count to a hundred','do a cartwheel'];
const PAST_T=[['When I was four,','I','my'],['When she was five,','she','her'],['When he was six,','he','his'],['When we were three,','we','our'],['When they were seven,','they','their'],['Last year','I','my'],['Two years ago','my brother','his']];
const HIST=[['In 1950, people','send text messages',0],['A hundred years ago, people','read newspapers',1],['In 1980, people','write letters',1],['Fifty years ago, children','play online games',0],
 ['In 1900, people','watch television',0],['In 1990, people','listen to the radio',1],['A hundred years ago, people','send emails',0],['In 1970, people','make phone calls',1],['In 1960, children','look up words in a dictionary',1],['In 1985, people','download e-books',0]];
// Unitat 6: [acció, bona idea?]
const ENV=[['turn off the lights when we leave a room',1],['leave the TV on all night',0],['recycle glass bottles',1],['throw plastic into the sea',0],['walk or cycle to school',1],
 ['use lots of plastic bags',0],['have short showers',1],['waste paper',0],['reuse cardboard boxes',1],['leave the tap running',0],['plant trees',1],['drop litter in the park',0],
 ['use solar panels',1],['buy things we don\'t need',0],['take our own bags to the supermarket',1]];
// Unitat 8: [frase, relatiu]
const REL=[['A clown is a person ___ makes people laugh.','who'],['A float is a decorated lorry ___ moves slowly in a parade.','which'],['A funfair is a place ___ you can ride on a big wheel.','where'],
 ['This is the mask ___ I made for carnival.','which'],['That\'s the girl ___ won the dance competition.','who'],['This is the square ___ we watched the fireworks.','where'],
 ['Fireworks are rockets ___ explode in the sky.','which'],['A musician is someone ___ plays an instrument.','who'],['That\'s the street ___ the parade starts.','where'],
 ['I\'ve got a cousin ___ lives in Scotland.','who'],['These are the costumes ___ we wore last year.','which'],['Is that the town ___ your grandparents live?','where'],
 ['A pirate is a person ___ steals from ships.','who'],['The dragon ___ we saw at the festival was enormous.','which'],['The kitchen is the room ___ we cook.','where'],
 ['The boy ___ sits next to me plays the drums.','who'],['I like stories ___ have happy endings.','which'],['The beach ___ we had our picnic was beautiful.','where']];
const RELA={who:['who','that'],which:['which','that'],where:['where']};
const RELW={who:'una persona',which:'una cosa o un animal',where:'un lloc'};
// Get it right!: ordre dels adjectius [article, [adjectius en ordre], nom, [categories]]
const ORD=[['a',['small','red'],'umbrella',['mida','color']],['an',['old','black'],'car',['edat','color']],['a',['big','round'],'table',['mida','forma']],['a',['beautiful','long'],'dress',['opinió','mida']],
 ['a',['funny','green'],'mask',['opinió','color']],['a',['new','Italian'],'restaurant',['edat','origen']],['a',['big','plastic'],'bag',['mida','material']],['a',['nice','cotton'],'T-shirt',['opinió','material']],
 ['a',['lovely','little'],'dog',['opinió','mida']],['an',['old','wooden'],'box',['edat','material']],['a',['beautiful','old','Spanish'],'guitar',['opinió','edat','origen']],
 ['a',['small','blue','glass'],'bottle',['mida','color','material']],['a',['big','new','red'],'tent',['mida','edat','color']],['a',['tall','young','French'],'chef',['mida','edat','origen']]];
const ENO=[['My jacket',"isn't",'warm'],['The water','is','warm'],['This box',"isn't",'big'],['The tent','is','big'],['My brother',"isn't",'old'],['These shoes',"aren't",'comfortable'],['The soup','is','hot'],['I',"'m not",'tall']];
const VMU=[['I','like','rock music'],['My brother','likes','football'],['We','enjoyed','the concert'],['She','loves','her violin'],['They','liked','the paella'],['I','enjoyed','the parade'],['My grandma','loves','fish and chips']];

/* ---------- temes de gramàtica ---------- */
Object.assign(SK,{
 en_verb_to:{mat:'angles',ab:'Tv',curs:[6],bloc:EV,nom:'Verb + to + verb (want to, try to...)',
  teoria:['Quan un verb en porta un altre darrere, molts cops el segon va amb <b>to</b> + infinitiu: <i>I <b>want to go</b> camping. We <b>tried to light</b> a fire.</i>',
   'Verbs que funcionen així: <b>want, need, try, decide, hope, learn, forget, promise, would like</b>. Només el primer verb canvia (wanted, tries...); el segon queda sempre igual: <b>to</b> + verb.',
   'Per demanar o manar a algú: <b>ask / tell + persona + to</b>: <i>Mum <b>asked me to tidy</b> my room.</i> En negativa, <b>not to</b>: <i>The guide <b>told us not to run</b>.</i>'],
  gen(lv){if(lv>=1&&Math.random()<.45){const[su,vb,ob,b,rest,ca,neg]=pick(ASK.filter(x=>lv>1||!x[6])),good=(neg?'not to ':'to ')+b,ans=[norm(good)];
    return{text:`Completa:<br><span class="muted">${ca}</span><br><b>${su} ${vb} ${ob} ___ ${rest}.</b> ${mut(neg?'not / '+b:b)}`,fields:[{label:neg?'not + to + verb':'to + verb',txt:ans,wide:true}],vis:null,pron:`${su} ${vb} ${ob} ${good} ${rest}.`,
     hints:[`Després de «${vb} ${ob}» va to + verb.`,neg?'En negativa, «not» va davant de «to».':`El verb «${b}» no canvia.`],
     steps:[`${vb} + persona + <b>${neg?'not to':'to'}</b> + verb.`,`«${b}» queda en infinitiu.`,`${su} ${vb} ${ob} <b>${good}</b> ${rest}.`],
     err:v=>ans.includes(v[0])?null:[b,ing(b),...pastF(b),`to ${ing(b)}`,`to not ${b}`,`not ${b}`,`don't ${b}`,`dont ${b}`,`didn't ${b}`,`didnt ${b}`,`to ${pastF(b)[0]}`,`for ${b}`].map(norm).includes(v[0])?'en_verb_to':null}}
   const[su,vb,b,rest,ca]=pick(VTO.filter(x=>x[5]<=lv)),good=`to ${b}`,ans=[norm(good)];
   return{text:`Completa amb <b>to</b> + verb:<br><span class="muted">${ca}</span><br><b>${su} ${vb} ___ ${rest}.</b> ${mut(b)}`,fields:[{label:'to + verb',txt:ans,wide:true}],vis:null,pron:`${su} ${vb} ${good} ${rest}.`,
    hints:[`Davant hi ha el verb «${vb}». El segon verb com va?`,'Després de want, try, need, decide... va to + verb sense canviar.'],
    steps:[`«${vb}» porta darrere <b>to</b> + verb.`,`El segon verb queda en infinitiu: <b>${b}</b>.`,`${su} ${vb} <b>${good}</b> ${rest}.`],
    err:v=>ans.includes(v[0])?null:[b,s3(b.split(' ')[0])+b.slice(b.split(' ')[0].length),ing(b.split(' ')[0])+b.slice(b.split(' ')[0].length),...pastF(b),`to ${pastF(b)[0]}`,`to ${ing(b)}`,`for ${b}`,`for to ${b}`].map(norm).includes(v[0])?'en_verb_to':null}}},
 en_better_at:{mat:'angles',ab:'Ba',curs:[6],bloc:GR,nom:'Good at, better at, the best at (+ -ing)',
  teoria:['<b>Good</b> i <b>bad</b> són irregulars: '+tbl(['Adjectiu','Comparatiu (+ than)','Superlatiu'],[['good','<b>better</b>','<b>the best</b>'],['bad','<b>worse</b>','<b>the worst</b>']]),
   'Per dir que algú fa bé una cosa: <b>good at + verb -ing</b>: <i>I\'m good at <b>drawing</b>. My cousin is <b>better at</b> juggling <b>than</b> me. Who is <b>the best at</b> telling jokes?</i>',
   'Recorda: comparam <b>dues</b> persones → better / worse + than · el número u d\'un <b>grup</b> → the best / the worst.'],
  gen(lv){const[b,ig,obj]=pick(TAL),act=ig+obj,r=Math.random();
   if(lv>=1&&r<.4){const[su]=pick(PPL),good=ig,ans=[good],sent=`${su} is ${pick(['good','very good','better than me','really bad'])} at ___${obj}.`;
    return{text:`Completa amb el verb en la forma correcta:<br><b>${sent}</b> ${mut(b)}`,fields:[{label:'Verb',txt:ans}],vis:null,pron:sent.replace('___',ig),
     hints:['Mira la paraula que hi ha just davant: «at».',`Després de «at», el verb porta -ing.`],
     steps:['Després de good / bad / better at, el verb porta <b>-ing</b>.',`${b} → <b>${ig}</b>.`,`… at <b>${ig}</b>${obj}.`],
     err:v=>ans.includes(v[0])?null:[b,`to ${b}`,s3(b),...pastF(b)].includes(v[0])?'en_at_ing':(lev(v[0],ig)<=2?'en_lletrejat':null)}}
   const g=Math.random()<.6?'good':'bad',sup=Math.random()<.5,[a,c]=pick(PPL),good=sup?(g==='good'?'the best':'the worst'):(g==='good'?'better':'worse'),ans=[good];
   const sent=sup?`${a} is ___ at ${act} ${pick(GROUP)}.`:`${a} is ___ at ${act} than ${c}.`;
   return{text:`Completa amb la forma de <b>${g}</b>:<br><b>${sent}</b>`,fields:[{label:'Forma',txt:ans,wide:sup}],vis:null,pron:sent.replace('___',good),
    hints:[sup?'Parla del número u d\'un grup: és un superlatiu.':'Compara dues persones (hi ha «than»): és un comparatiu.',`«${g}» és irregular.`],
    steps:[sup?'Número u d\'un grup → superlatiu (amb <b>the</b>).':'Dues persones + than → comparatiu.',`${g} → <b>${good}</b>.`,`<b>${sent.replace('___',good)}</b>`],
    err:v=>{if(ans.includes(v[0]))return null;const all={better:1,worse:1,'the best':1,'the worst':1,best:1,worst:1};
     if(sup&&v[0]===good.slice(4))return'en_super_the';if(all[v[0]])return'en_comp_sup';
     if(['gooder','more good','badder','more bad','goodest','the goodest','the most good','baddest','the baddest','the most bad','more better','more worse'].includes(v[0]))return sup?'en_superlatiu':'en_comparatiu';return null}}}},
 en_want_obj:{mat:'angles',ab:'Ob',curs:[6],bloc:GR,nom:'Want / ask / tell + me, him, us... + to',
  teoria:['Per dir que volem que <b>una altra persona</b> faci una cosa: <b>want + persona + to + verb</b>: <i>My mum <b>wants me to help</b> in the kitchen.</i> (En català: «vol que l\'ajudi».)',
   'La persona va amb el pronom <b>complement</b>: '+tbl(['Subjecte','I','you','he','she','it','we','they'],[['Complement','<b>me</b>','<b>you</b>','<b>him</b>','<b>her</b>','<b>it</b>','<b>us</b>','<b>them</b>']]),
   'Igual amb <b>ask</b> i <b>tell</b>: <i>The waiter <b>asked us to wait</b>.</i> Mai «want I to» ni «want that I».'],
  gen(lv){const[q,rest]=pick(WOBJ),[sp,op]=pick(PRON.filter(p=>p[0]!=='it'&&(lv>0||p[0]!=='you')));
   if(lv>=1&&Math.random()<.5){const b=rest.split(' ')[0],tail=rest.slice(b.length),good=`${op} to ${b}`,ans=[norm(good)];
    return{text:`Completa amb el pronom i <b>to</b> + verb:<br><b>${q} ___${tail}.</b> ${mut(sp+' / '+b)}`,fields:[{label:'pronom + to + verb',txt:ans,wide:true}],vis:null,pron:`${q} ${good}${tail}.`,
     hints:[`«${sp}» darrere de ${q.split(' ').pop()} es converteix en pronom complement.`,'Després: to + verb sense canviar.'],
     steps:[`${sp} → <b>${op}</b>.`,`Després, <b>to ${b}</b>.`,`${q} <b>${good}</b>${tail}.`],
     err:v=>ans.includes(v[0])?null:(sp!==op&&v[0].startsWith(sp.toLowerCase()+' ')||v[0].startsWith('that '))?'en_obj_pron':[`${op} ${b}`,`${op} ${ing(b)}`,`${op} ${s3(b)}`,`${op} for ${b}`,`${op} to ${s3(b)}`].includes(v[0])?'en_verb_to':null}}
   const ans=[op];
   return{text:`Escriu el pronom que hi falta:<br><b>${q} ___ to ${rest}.</b> ${mut(sp)}`,fields:[{label:'Pronom',txt:ans}],vis:null,pron:`${q} ${op} to ${rest}.`,
    hints:['Després de want, ask o tell no va el pronom subjecte (I, he, she...).',`Quin és el pronom complement de «${sp}»?`],
    steps:[`«${sp}» és un pronom subjecte.`,`Darrere de want / ask / tell va el complement: ${sp} → <b>${op}</b>.`,`${q} <b>${op}</b> to ${rest}.`],
    err:v=>ans.includes(v[0])?null:PRON.some(p=>p[0].toLowerCase()===v[0]&&p[0]!==p[1])?'en_obj_pron':null}}},
 en_purpose:{mat:'angles',ab:'Pu',curs:[6],bloc:GR,nom:'Per a què? To + verb (I went out to buy...)',
  teoria:['Per explicar <b>per a què</b> fem una cosa, en anglès posam <b>to + verb</b>: <i>I went to the shop <b>to buy</b> some rice.</i> (= per comprar)',
   'És un error molt típic dir «<s>for buy</s>» o «<s>for to buy</s>». Recorda: «per + verb» → <b>to</b> + verb.',
   'També serveix per respondre una pregunta amb <b>Why?</b>: <i>Why did you go to the kitchen? — <b>To make</b> a sandwich.</i>'],
  gen(lv){const[pre,b,rest,ca,,wq]=pick(PURP.filter(x=>x[4]<=lv)),good=`to ${b}`,ans=[norm(good)],q=lv>=1&&Math.random()<.4;
   const sent=q?`${wq} — ___ ${rest}.`:`${pre} ___ ${rest}.`;
   return{text:`Completa per dir <b>per a què</b>:<br>${q?'':`<span class="muted">${ca}</span><br>`}<b>${sent}</b> ${mut(b)}`,fields:[{label:'to + verb',txt:ans,wide:true}],vis:null,pron:sent.replace('___',q?cap(good):good),
    hints:['Explica per a què ho fa. En català diríem «per...».','En anglès, «per + verb» és to + verb (no for).'],
    steps:['Finalitat (per a què) → <b>to</b> + verb.',`<b>${good}</b> (mai «for ${b}»).`,`<b>${sent.replace('___',q?cap(good):good)}</b>`],
    err:v=>ans.includes(v[0])?null:/^for /.test(v[0])||[b,ing(b),`to ${ing(b)}`].includes(v[0])?'en_for_to':null}}},
 en_adverbs:{mat:'angles',ab:'Av',curs:[6],bloc:GR,nom:'Adverbis de manera (slowly, well...)',
  teoria:['Els <b>adjectius</b> diuen com és una cosa (<i>a beautiful song</i>). Els <b>adverbis</b> diuen com es fa una acció (<i>she sings <b>beautifully</b></i>). Van darrere el verb (o darrere el complement).',
   tbl(['Regla','Exemple'],[['adjectiu + <b>-ly</b>','slow → slowly · loud → loudly'],['acaba en <b>-l</b> → -lly','beautiful → beautifully · careful → carefully'],['consonant + <b>y</b> → -ily','happy → happily · easy → easily'],['acaba en <b>-le</b> → -ly','terrible → terribly · gentle → gently'],['<b>irregulars</b>','good → <b>well</b> · fast → <b>fast</b> · hard → <b>hard</b>']]),
   'Per comparar com fan una cosa dues persones: <b>more + adverbi + than</b>: <i>Laia plays <b>more carefully than</b> Pere.</i> Irregulars: well → <b>better</b>, badly → <b>worse</b>, fast → <b>faster</b>, hard → <b>harder</b>.'],
  gen(lv){const[adj,adv,,cmp]=pick(ADV.filter(x=>x[2]<=lv)),[su,vp]=pick(MUS);
   if(lv>=2&&Math.random()<.45){const o=pick(['Laura','my cousin','Marc','my grandpa','Anna','Pau','the other children']),ans=A(cmp),sent=`${su} ${vp} ___ than ${o}.`;
    return{text:`Completa amb l'adverbi en <b>comparatiu</b>:<br><b>${sent}</b> ${mut(adj)}`,fields:[{label:'Comparatiu',txt:ans,wide:true}],vis:null,pron:sent.replace('___',cmp[0]),
     hints:[`Primer: quin és l'adverbi de «${adj}»?`,adv==='well'||adj==='bad'||adv===adj?'És irregular.':'Adverbi llarg → more + adverbi.'],
     steps:[`${adj} → ${adv}.`,`Comparatiu: <b>${cmp.join(' / ')}</b>.`,`<b>${sent.replace('___',cmp[0])}</b>`],
     err:v=>ans.includes(v[0])?null:[`more ${adj}`,`${adj}er`,`more ${adv}er`,'more well','more good','gooder','more bad','badder'].includes(v[0])||(v[0]===adj+'er'&&!cmp.includes(v[0]))?'en_adv_adj':null}}
   const sent=`${su} ${vp} ___.`,ans=[adv];
   return{text:`Completa amb l'<b>adverbi</b>:<br><b>${sent}</b> ${mut(adj)}`,fields:[{label:'Adverbi',txt:ans}],vis:null,pron:sent.replace('___',adv),
    hints:['Diu com fa l\'acció: cal un adverbi.',adv===adj||adv==='well'?'Compte, és un dels irregulars.':/ily$/.test(adv)?'Acaba en y: canvia la y per i i afegeix -ly.':/lly$/.test(adv)?'Acaba en -l: afegeix -ly (queden dues l).':/le$/.test(adj)?'Acaba en -le: canvia la e per y.':'Afegeix -ly a l\'adjectiu.'],
    steps:[`L'adjectiu és «${adj}»; per dir com es fa l'acció cal l'adverbi.`,`${adj} → <b>${adv}</b>.`,`<b>${sent.replace('___',adv)}</b>`],
    err:v=>ans.includes(v[0])?null:v[0]===adj?'en_adv_adj':['goodly','fastly','hardly','goodlly'].includes(v[0])?'en_adv_irr':(adj==='good'&&v[0]==='good')?'en_adv_adj':(lev(v[0],adv)<=2?'en_lletrejat':null)}}},
 en_could:{mat:'angles',ab:'Cu',curs:[6],bloc:EV,nom:'Could / couldn\'t: el que sabíem fer abans',
  teoria:['<b>Could / couldn\'t</b> és el passat de <b>can / can\'t</b>: el que <b>sabíem</b> o <b>podíem</b> fer abans.',
   tbl(['','Ara (present)','Abans (passat)'],[['Sí','I <b>can</b> swim.','When I was five, I <b>could</b> swim.'],['No','I <b>can\'t</b> drive.','In 1950, people <b>couldn\'t</b> send emails.'],['Pregunta','<b>Can</b> you swim?','<b>Could</b> you swim when you were five?'],['Resposta curta','Yes, I can. / No, I can\'t.','Yes, I <b>could</b>. / No, I <b>couldn\'t</b>.']]),
   'Igual per a totes les persones, i el verb va en infinitiu sense to: <i>she could read</i> (no «could reads», no «could to read»).'],
  gen(lv){const r=Math.random(),kind=lv===0?(r<.5?0:1):lv===1?(r<.35?0:r<.65?1:2):(r<.25?1:r<.5?2:3);
   if(kind===3){const[tm,su]=pick(PAST_T.filter(p=>p[1]!=='I'&&p[0].startsWith('When'))),act=pick(ABIL).replace(/\bmy\b/,{he:'his',she:'her',we:'your',they:'their'}[su]),yes=Math.random()<.5,pr={he:'he',she:'she',we:'you',they:'they'}[su]||su,rp={he:'he',she:'she',we:'we',they:'they'}[su];
    const good=yes?`yes, ${rp} could`:`no, ${rp} couldn't`,ans=A(good,good.replace(', ',' '));
    const tq=tm.replace(/^When (\w+) (was|were)/,(m,s,v)=>`when ${pr} ${pr==='you'?'were':v}`).replace(/,$/,'');
    return{text:`Respon amb una <b>resposta curta</b> ${yes?'✅':'❌'}:<br><b>Could ${pr} ${act} ${tq}?</b>`,fields:[{label:'Resposta curta',txt:ans,wide:true}],vis:null,pron:`${cap(good)}.`,
     hints:[`${yes?'✅ vol dir que sí':'❌ vol dir que no'}.`,'Resposta curta: Yes / No + pronom + could / couldn\'t (sense repetir el verb).'],
     steps:['La pregunta és en passat (could).',`Resposta curta: <b>${cap(good)}</b>.`,'No repetim el verb a la resposta curta.'],
     err:v=>ans.includes(v[0])?null:/\bcan('?t| not)?$/.test(v[0])?'en_could_temps':(v[0].startsWith(good.replace(/'/g,'').split(',')[0])&&v[0].split(' ').length>3)?'en_resposta_curta':null}}
   if(kind===2){const now=Math.random()<.5,[tm,su]=now?pick([['Now','I'],['Today','my brother'],['Now','we'],['This year','she']]):pick(PAST_T),act=pick(ABIL).replace(/\bmy\b/,su==='I'?'my':su==='we'?'our':su==='she'?'her':su==='they'?'their':'his'),yes=Math.random()<.5;
    const good=now?(yes?'can':"can't"):(yes?'could':"couldn't"),ans=A(good),sent=`${tm} ${su} ___ ${act}.`;
    return{text:`Completa amb <b>can, can't, could</b> o <b>couldn't</b> ${yes?'✅':'❌'}:<br><b>${sent}</b>`,fields:[{label:'Modal',txt:ans}],vis:null,pron:sent.replace('___',good),
     hints:[`«${tm}»: és ara o en el passat?`,`${yes?'✅ → afirmativa':'❌ → negativa'}.`],
     steps:[`«${tm}» → ${now?'present → can / can\'t':'passat → could / couldn\'t'}.`,`${yes?'Afirmativa':'Negativa'} → <b>${good}</b>.`,`<b>${sent.replace('___',good)}</b>`],
     err:v=>ans.includes(v[0])?null:A(now?['could',"couldn't"]:['can',"can't"]).includes(v[0])?'en_could_temps':/^(could|can)(n't| not)? to\b/.test(v[0])?'en_modal_to':null}}
   let sent,good;if(kind===1){const[tm,act,y]=pick(HIST);good=y?'could':"couldn't";sent=`${tm} ___ ${act}.`;var cue=y}
   else{const[tm,su,po]=pick(PAST_T),act=pick(ABIL).replace(/\bmy\b/,po);cue=Math.random()<.5;good=cue?'could':"couldn't";sent=`${tm} ${su} ___ ${act}.`}
   const ans=A(good);
   return{text:`Completa amb <b>could</b> o <b>couldn't</b> ${cue?'✅':'❌'}:<br><b>${sent}</b>`,fields:[{label:'could / couldn\'t',txt:ans}],vis:null,pron:sent.replace('___',good),
    hints:[kind===1?'Pensa: ja existia aquella cosa en aquell any?':`${cue?'✅ vol dir que sí que en sabia':'❌ vol dir que no en sabia'}.`,'Passat de can → could · de can\'t → couldn\'t.'],
    steps:['És en el passat → could / couldn\'t.',kind===1?`${cue?'Sí que es podia':'Encara no es podia'} → <b>${good}</b>.`:`${cue?'✅ → <b>could</b>':'❌ → <b>couldn\'t</b>'}.`,`<b>${sent.replace('___',good)}</b>`],
    err:v=>ans.includes(v[0])?null:A(['can',"can't"]).includes(v[0])?'en_could_temps':/^(could|can)(n't| not)? to\b/.test(v[0])?'en_modal_to':null}}},
 en_should:{mat:'angles',ab:'Sh',curs:[6],bloc:EV,nom:'Should / shouldn\'t: consells per al planeta',
  teoria:['Per donar <b>consells</b> fem servir <b>should</b> (hauríem de) i <b>shouldn\'t</b> (no hauríem de) + verb: <i>We <b>should recycle</b> paper. We <b>shouldn\'t waste</b> water.</i>',
   'Preguntes: <i><b>What should</b> we do to save energy? — We <b>should</b> turn off the lights.</i> · <i><b>Should</b> we use plastic bags? — No, we <b>shouldn\'t</b>.</i>',
   'Com tots els modals, és igual per a totes les persones i el verb va en infinitiu: <i>she should <b>walk</b></i> (no «should walks», no «should to walk»).'],
  gen(lv){const[act,g]=pick(ENV),r=Math.random(),kind=lv===0?0:lv===1?(r<.5?0:1):(r<.3?0:r<.6?1:2),su=pick(['We','You','People','Everybody','My family','Children']),b=act.split(' ')[0],tail=act.slice(b.length);
   if(kind===2){const good=g?'yes, we should':"no, we shouldn't",ans=A(good,good.replace(', ',' '));
    return{text:`Respon amb una <b>resposta curta</b> ${g?'👍':'👎'}:<br><b>Should we ${act}?</b>`,fields:[{label:'Resposta curta',txt:ans,wide:true}],vis:null,pron:`${cap(good)}.`,
     hints:[`${g?'👍 és una bona idea':'👎 és una mala idea'}.`,'Resposta curta: Yes, we should. / No, we shouldn\'t.'],
     steps:[`${g?'És una bona idea':'No és una bona idea'}.`,`<b>${cap(good)}</b>.`],
     err:v=>ans.includes(v[0])?null:/\b(must|can|do|does)(n't| not)?$/.test(v[0])?'en_modal':null}}
   if(kind===1){const good=(g?'should ':"shouldn't ")+b,ans=A(good);
    return{text:`Completa amb <b>should</b> o <b>shouldn't</b> i el verb ${g?'👍':'👎'}:<br><b>${su} ___${tail}.</b> ${mut(b)}`,fields:[{label:'should / shouldn\'t + verb',txt:ans,wide:true}],vis:null,pron:`${su} ${good}${tail}.`,
     hints:[`${g?'👍 → consell positiu':'👎 → consell negatiu'}.`,`Després de should el verb «${b}» no canvia.`],
     steps:[`${g?'Bona idea → <b>should</b>':'Mala idea → <b>shouldn\'t</b>'}.`,`Verb en infinitiu: <b>${b}</b>.`,`${su} <b>${good}</b>${tail}.`],
     err:v=>ans.includes(v[0])?null:A(`${g?'should':"shouldn't"} to ${b}`).includes(v[0])?'en_modal_to':A(`${g?'should':"shouldn't"} ${s3(b)}`).includes(v[0])?'en_modal_inf':null}}
   const good=g?'should':"shouldn't",ans=A(good),sent=`${su} ___ ${act}.`;
   return{text:`Completa amb <b>should</b> o <b>shouldn't</b> ${g?'👍':'👎'}:<br><b>${sent}</b>`,fields:[{label:'should / shouldn\'t',txt:ans}],vis:null,pron:sent.replace('___',good),
    hints:['👍 vol dir que és bo per al planeta; 👎, que no ho és.',`${g?'👍':'👎'} → ${g?'should':'shouldn\'t'}.`],
    steps:[`${g?'És bo per al planeta':'No és bo per al planeta'}.`,`→ <b>${good}</b>.`,`<b>${sent.replace('___',good)}</b>`],
    err:v=>ans.includes(v[0])?null:/^(should|shouldn't|should not|shouldnt) to$/.test(v[0])?'en_modal_to':null}}},
 en_relative:{mat:'angles',ab:'Rw',curs:[6],bloc:GR,nom:'Who, which, where (relatius)',
  teoria:['Els <b>relatius</b> uneixen dues idees i serveixen per explicar de qui o de què parlam:',
   tbl(['Relatiu','Per a...','Exemple'],[['<b>who</b>','persones','A clown is a person <b>who</b> makes people laugh.'],['<b>which</b>','coses i animals','This is the costume <b>which</b> I wore.'],['<b>where</b>','llocs','That\'s the square <b>where</b> the parade starts.']]),
   'Per a persones i coses també es pot dir <b>that</b>: <i>the girl that won · the mask that I made</i>. Per als llocs, <b>where</b>.'],
  gen(lv){const pool=lv===0?REL.slice(0,12):REL,[s,r]=pick(pool),ans=RELA[r];
   return{text:`Completa amb <b>who, which</b> o <b>where</b>:<br><b>${s}</b>`,fields:[{label:'Relatiu',txt:ans}],vis:null,pron:s.replace('___',r),
    hints:['De què parla la paraula que hi ha just davant del buit?',`Parla d'${RELW[r]}.`],
    steps:[`La paraula de davant és ${RELW[r]}.`,`${RELW[r]} → <b>${r}</b>${ans.length>1?' (o that)':''}.`,`<b>${s.replace('___',r)}</b>`],
    err:v=>ans.includes(v[0])?null:['who','which','where','that','what','whose','when'].includes(v[0])?'en_relatiu':null}}},
 en_word_order:{mat:'angles',ab:'Wo',curs:[6],bloc:GR,nom:'Get it right! Ordre: adjectius, enough, very much',
  teoria:['En anglès, els adjectius van <b>davant</b> del nom i no porten plural: <i>a <b>red</b> umbrella, two <b>red</b> umbrellas</i>.',
   'Si n\'hi ha més d\'un, segueixen aquest ordre: <b>opinió → mida → edat → forma → color → origen → material</b> + nom. <i>A <b>beautiful old Spanish</b> guitar. A <b>small red</b> umbrella.</i>',
   '<b>Enough</b> va darrere l\'adjectiu: <i>big <b>enough</b></i>. <b>Very much</b> va al final: <i>I like rock music <b>very much</b></i> (no «I like very much rock music»).'],
  gen(lv){const r=Math.random(),kind=lv===0?0:lv===1?(r<.5?0:1):(r<.4?0:r<.7?1:2);let words,good,bad,code,why;
   if(kind===0){const[art,adjs,n,cats]=pick(ORD.filter(o=>lv>0||o[1].length===2));good=`${art} ${adjs.join(' ')} ${n}`;words=[art,...adjs,n];code='en_adj_ordre';
    why=`${adjs.map((a,i)=>`${a} (${cats[i]})`).join(' → ')} → ${n}`;bad=v=>v!==norm(good)&&v.split(' ').sort().join(' ')===norm(good).split(' ').sort().join(' ')}
   else if(kind===1){const[s,vb,adj]=pick(ENO);good=`${s}${vb.startsWith("'")?vb:' '+vb} ${adj} enough`;words=[s+(vb.startsWith("'")?vb:''),...(vb.startsWith("'")?[]:[vb]),adj,'enough'];code='en_enough';
    why=`<b>enough</b> va darrere de «${adj}»`;bad=v=>A(`${s}${vb.startsWith("'")?vb:' '+vb} enough ${adj}`).includes(v)}
   else{const[s,vb,o]=pick(VMU);good=`${s} ${vb} ${o} very much`;words=[s,vb,o,'very much'];code='en_very_much';why='<b>very much</b> va al final';bad=v=>v===norm(`${s} ${vb} very much ${o}`)}
   const sh=shuf(words);if(sh.join()===words.join())sh.reverse();const ans=A(good);
   return{text:`Ordena les paraules i escriu ${kind===0?'el grup de paraules':'la frase'}:<br><b>${sh.map(esc).join(' &nbsp;/&nbsp; ')}</b>`,fields:[{label:'Ordenat',txt:ans,wide:true}],vis:null,pron:good,
    hints:[kind===0?'Recorda l\'ordre: opinió → mida → edat → forma → color → origen → material → nom.':kind===1?'On va «enough»: davant o darrere de l\'adjectiu?':'On va «very much»: al mig o al final?',kind===0?'L\'article (a / an) va primer i el nom, al final.':'Comença pel subjecte.'],
    steps:[why+'.',`<b>${esc(cap(good))}</b>.`],
    err:v=>ans.includes(v[0])?null:bad(v[0])?code:null}}}
});

/* ---------- ordre dels temes, unitats i temari de 6è ---------- */
SK_ORDER.splice(0,SK_ORDER.length,
 'en_voc_seasons','en_was','en_there','en_reg_past','en_irr_past','en_past','en_past_neg',
 'en_voc_camping','en_verb_to','en_irr_inf',
 'en_voc_talent','en_compar','en_super','en_better_at',
 'en_voc_dishes','en_want_obj','en_purpose','en_voc_food','en_quant',
 'en_voc_instruments','en_adverbs',
 'en_voc_media','en_could','en_voc_tech',
 'en_voc_energy','en_should','en_modal','en_voc_nature',
 'en_voc_space','en_going','en_will',
 'en_voc_parade','en_relative','en_word_order',
 'en_functions','en_time','en_dates','en_imperative','en_voc_daily','en_voc_family','en_voc_countries','en_like_ing','en_connect',
 'en_lam_house','en_lam_town','en_lam_body','en_lam_clothes','en_lam_weather',
 'en_present','en_pres_neg','en_freq','en_cont','en_simple_cont','en_be','en_wh','en_poss','en_plural','en_prep','en_prep_t',
 'en_pperf','en_irr_pp','en_verb_sig',
 'en_vocab','en_voc_feel','en_voc_jobs','en_voc_town','en_voc_sport','en_voc_health','en_listen','en_read');
// [nom «anglès · català», temes, què s'hi aprèn]
const U6=[
 ['Welcome: Seasons and weather · Les estacions i el temps',['en_voc_seasons','en_was','en_there','en_reg_past','en_irr_past','en_past','en_past_neg'],'Was / were, there was / were, past simple (regular, irregular, didn\'t, did...?)'],
 ['Unit 1: Camping · D\'acampada',['en_voc_camping','en_verb_to','en_irr_inf'],'Verb + to + verb (want to, try to); ask / tell someone to'],
 ['Unit 2: Talent show · Espectacle de talents',['en_voc_talent','en_better_at','en_compar','en_super'],'Good / better / the best, bad / worse / the worst; better at + -ing'],
 ['Unit 3: International food · Menjar del món',['en_voc_dishes','en_want_obj','en_purpose','en_voc_food','en_quant'],'Want someone to; to + verb per dir la finalitat; some / any, much / many'],
 ['Unit 4: Music · Música',['en_voc_instruments','en_adverbs'],'Adverbis de manera (slowly, well) i comparació (more beautifully than)'],
 ['Unit 5: Now and then · Abans i ara',['en_voc_media','en_could','en_voc_tech'],'Could / couldn\'t: habilitat en el passat; preguntes i respostes curtes'],
 ['Unit 6: The environment · El medi ambient',['en_voc_energy','en_should','en_modal','en_voc_nature'],'Should / shouldn\'t: consells; can, must, should'],
 ['Unit 7: Space · L\'espai',['en_voc_space','en_going','en_will'],'Going to: plans; will: prediccions'],
 ['Unit 8: Celebrations · Les festes',['en_voc_parade','en_relative'],'Relatius who, which, where'],
 ['Get it right! · Evita els errors típics',['en_word_order','en_reg_past'],'Ordre dels adjectius, enough, very much; ortografia dels passats'],
 // Unitats que completen el llibre amb els sabers bàsics del currículum estatal (RD 157/2022) i el nivell A1-A2 (angles-a2.js, angles-lamines.js)
 ['Everyday English · L\'anglès de cada dia',['en_functions','en_time','en_dates','en_imperative','en_voc_daily'],'Saludar i presentar-se, frases de classe, l\'hora, dates i ordinals, instruccions i indicacions, la rutina'],
 ['Me and the world · Jo, la família i el món',['en_voc_family','en_voc_countries','en_like_ing','en_connect'],'La família, països i nacionalitats, gustos (like + -ing), connectors (and, but, or, because, so)'],
 ['Picture dictionary · Diccionari il·lustrat',['en_lam_house','en_lam_town','en_lam_body','en_lam_clothes','en_lam_weather'],'Làmines: la casa, la ciutat, el cos, la roba i el temps'],
 ['Review: the present · Repàs: el present',['en_be','en_present','en_pres_neg','en_freq','en_cont','en_simple_cont','en_voc_feel','en_voc_jobs'],'Present simple i continuous, adverbis de freqüència (repàs de 5è i ampliació)'],
 ['Review: questions, places and time · Repàs: preguntes, llocs i temps',['en_wh','en_poss','en_plural','en_prep','en_prep_t','en_voc_town','en_voc_sport','en_voc_health'],'Preguntes amb wh-, possessius, plurals, preposicions de lloc i de temps'],
 ['Review: experiences · Repàs: experiències',['en_pperf','en_irr_pp','en_verb_sig'],'Present perfect amb ever / never; participis (avançament de 1r d\'ESO)'],
 ['Reading and listening · Llegir i escoltar',['en_read','en_listen','en_vocab'],'Comprensió lectora i oral']];
UNITS.angles=UNITS.angles.filter(u=>!(u[2]&&u[2].includes(6))).map(u=>u[2]?u:[u[0],u[1],[5]]).concat(U6.map(([n,ks])=>[n,ks,[6]]));
TEMARI.angles[6]=U6.map(([n,ks,g])=>[`${n.split(' · ')[1]} (${n.split(' · ')[0]}): ${g}`,ks]);
})();
