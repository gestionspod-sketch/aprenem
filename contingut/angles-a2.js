/* Aprenem - ANGLÈS 6è: temes del currículum estatal i del nivell A1-A2
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.

   Fonts (contrast del temari amb el currículum, perquè serveixi a l'alumnat de tot l'Estat):
   - Real Decret 157/2022, d'1 de març (BOE-A-2022-3296), annex II, Lengua Extranjera, sabers bàsics
     del 3r cicle. Bloc A, Comunicació: saludar, acomiadar-se, presentar-se i presentar altres persones;
     descriure persones, objectes i llocs; situar fets en el temps i objectes, persones i llocs en
     l'espai; demanar i intercanviar informació quotidiana; descriure rutines; donar indicacions i
     instruccions; expressar la pertinença i la quantitat; unitats lingüístiques (entitat, quantitat i
     nombre, espai, temps, afirmació, negació, interrogació i exclamació, relacions lògiques
     elementals); lèxic d'identificació personal, relacions properes, llocs i entorns propers, oci i
     vida quotidiana; estratègies conversacionals (començar i acabar, demanar aclariments...).
     Bloc C, Interculturalitat: països on es parla la llengua, costums i cortesia lingüística.
   - Marc europeu comú de referència (MECR), nivells A1 i A2: dir l'hora, dates i nombres ordinals,
     gustos (like / love / hate + -ing), connectors bàsics (and, but, or, because, so), instruccions,
     família, països i nacionalitats, rutines diàries.

   Temes d'aquest arxiu (tots curs:[6]): en_time, en_dates, en_connect, en_like_ing, en_imperative,
   en_functions, en_voc_family, en_voc_countries, en_voc_daily. Les unitats on surten les defineix
   angles-guess-what-6.js. Tots els textos i exercicis són originals. */
// Fàbrica de temes de vocabulari (també la fa servir angles-lamines.js)
function enVocTema(id,d){const A=enAlt,W=d.w.split('|').map(x=>{const[en,ca,em,h]=x.split(';'),alts=en.split('/');return{en:alts[0],alts,ca:ca.split('/'),em:em||'',h:+(h||0)}});
 SK[id]={mat:'angles',ab:d.ab,curs:[6],bloc:'Vocabulari i comprensió',nom:d.nom,
  teoria:[d.intro,'Truc: <b>llegeix la paraula en veu alta, tapa-la i escriu-la</b>. Fixa\'t bé en les lletres que no sonen com en català.',
   `<table class="mini"><tr><th>Anglès</th><th>Català</th></tr>${W.map(w=>`<tr><td>${w.em?w.em+' ':''}<b>${esc(w.alts.join(' / '))}</b></td><td>${esc(w.ca.join(' / '))}</td></tr>`).join('')}</table>`],
  gen(lv){const w=pick(W.filter(x=>lv>0||!x.h)),toEn=lv===0||Math.random()<.7,en=w.en,ca=w.ca.join(' / '),nw=en.split(' ').length,big=w.em?`<div style="font-size:56px;line-height:1.2">${w.em}</div>`:'';
   if(toEn)return{text:`${big}Com es diu «<b>${esc(ca)}</b>» en anglès?`,fields:[{label:'En anglès',txt:A(w.alts),wide:nw>1}],vis:null,pron:en,
    hints:[`Comença per «${en[0]}»${nw>1?` i són ${nw} paraules`:` i té ${en.length} lletres`}.`,en.split(' ').map(x=>x[0]+' _'.repeat(Math.max(0,x.length-1))).join('   ')],
    steps:[`«${esc(ca)}» en anglès és <b>${esc(w.alts.join(' / '))}</b>.`,`S'escriu així: ${esc(en.toUpperCase().split('').join(' '))}.`,'Digues-la en veu alta tres vegades i escriu-la una vegada al quadern.'],
    err:v=>{if(A(w.alts).includes(v[0]))return null;const dd=Math.min(...w.alts.map(a=>lev(v[0],norm(a))));return dd>0&&dd<=2?'en_lletrejat':null}};
   return{text:`${big}Què vol dir «<b>${esc(en)}</b>»?`,fields:[{label:'En català',txt:w.ca.map(norm),loose:true,wide:true}],vis:null,pron:en,
    hints:[`Comença per «${w.ca[0][0].toUpperCase()}».`,`Té ${[...w.ca[0]].length} lletres${w.ca.length>1?' (hi ha més d\'una resposta bona)':''}.`],
    steps:[`«${esc(en)}» vol dir <b>${esc(ca)}</b>.`,'Digues-la en veu alta i fes-ne una frase curta en anglès.']}}};
}
// Variants acceptades: contraccions i sense apòstrof (it's / it is / its...)
function enAlt(...a){return[...new Set(a.flat().flatMap(s=>{const f=s.replace(/can't/g,'cannot').replace(/won't/g,'will not').replace(/n't/g,' not').replace(/'m\b/g,' am').replace(/'s\b/g,' is').replace(/'re\b/g,' are').replace(/'d like/g,' would like');
 return[s,f,s.replace(/'/g,''),f.replace(/'/g,'')]}).map(norm))]}
// Rellotge (SVG) per a l'hora
function enClock(h,m,sz=200){const a=(m*6-90)*Math.PI/180,b=(((h%12)+m/60)*30-90)*Math.PI/180,c=100;
 const nums=[...Array(12)].map((_,i)=>{const n=i+1,t=(n*30-90)*Math.PI/180;return`<text x="${(c+74*Math.cos(t)).toFixed(1)}" y="${(c+74*Math.sin(t)+7).toFixed(1)}" text-anchor="middle" font-size="19" font-weight="700" fill="#121C4D">${n}</text>`}).join('');
 const ticks=[...Array(60)].map((_,i)=>{const t=i*6*Math.PI/180,r1=i%5?88:84;return`<line x1="${(c+r1*Math.cos(t)).toFixed(1)}" y1="${(c+r1*Math.sin(t)).toFixed(1)}" x2="${(c+92*Math.cos(t)).toFixed(1)}" y2="${(c+92*Math.sin(t)).toFixed(1)}" stroke="#94A3B8" stroke-width="${i%5?1:2.5}"/>`}).join('');
 return`<svg viewBox="0 0 200 200" width="${sz}" height="${sz}" role="img" aria-label="Rellotge"><circle cx="100" cy="100" r="96" fill="#fff" stroke="#E25563" stroke-width="7"/>${ticks}${nums}
 <line x1="100" y1="100" x2="${(c+50*Math.cos(b)).toFixed(1)}" y2="${(c+50*Math.sin(b)).toFixed(1)}" stroke="#121C4D" stroke-width="8" stroke-linecap="round"/>
 <line x1="100" y1="100" x2="${(c+76*Math.cos(a)).toFixed(1)}" y2="${(c+76*Math.sin(a)).toFixed(1)}" stroke="#E25563" stroke-width="5" stroke-linecap="round"/><circle cx="100" cy="100" r="6" fill="#121C4D"/></svg>`}
const EN_NUM=['twelve','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
const EN_MIN={5:['five'],10:['ten'],15:['quarter','a quarter'],20:['twenty'],25:['twenty-five','twenty five'],30:['half']};
const enH=h=>EN_NUM[((h-1)%12+12)%12+1];
// Totes les maneres bones de dir una hora (britànic: past / to; també «three fifteen»)
function enTimeSay(h,m){const out=[];
 if(m===0)out.push(`${enH(h)} o'clock`,enH(h));else if(m<=30)EN_MIN[m].forEach(w=>out.push(`${w} past ${enH(h)}`));else EN_MIN[60-m].forEach(w=>out.push(`${w} to ${enH(h+1)}`));
 const dm={5:'oh five',10:'ten',15:'fifteen',20:'twenty',25:'twenty-five',30:'thirty',35:'thirty-five',40:'forty',45:'forty-five',50:'fifty',55:'fifty-five'}[m];
 if(m)out.push(`${enH(h)} ${dm}`,`${enH(h)} ${dm.replace('-',' ')}`);
 return enAlt(out.flatMap(s=>[s,`it's ${s}`,`it is ${s}`]))}
const enTimeMain=(h,m)=>m===0?`${enH(h)} o'clock`:m<=30?`${EN_MIN[m][0]} past ${enH(h)}`:`${EN_MIN[60-m][0]} to ${enH(h+1)}`;
const EN_ORD=['','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth','nineteenth','twentieth',
 'twenty-first','twenty-second','twenty-third','twenty-fourth','twenty-fifth','twenty-sixth','twenty-seventh','twenty-eighth','twenty-ninth','thirtieth','thirty-first'];
const enSuf=n=>n%100>=11&&n%100<=13?'th':['th','st','nd','rd'][n%10]||'th';
const EN_MONTHS=[['January','gener'],['February','febrer'],['March','març'],['April','abril'],['May','maig'],['June','juny'],['July','juliol'],['August','agost'],['September','setembre'],['October','octubre'],['November','novembre'],['December','desembre']];
const EN_DAYS=[['Monday','dilluns'],['Tuesday','dimarts'],['Wednesday','dimecres'],['Thursday','dijous'],['Friday','divendres'],['Saturday','dissabte'],['Sunday','diumenge']];
(()=>{
const A=enAlt,cap=s=>s[0].toUpperCase()+s.slice(1),disp=s=>cap(s.replace(/\bi\b/g,'I')),mut=s=>`<span class="muted">(${s})</span>`;
Object.assign(ERR,{
 en_hora_past_to:{kid:'Mira on és la busca llarga: a la dreta (de 0 a 30 minuts) → <b>past</b>; a l\'esquerra (de 31 a 59) → <b>to</b> i l\'hora següent.',par:'Confon past i to en dir l\'hora'},
 en_hora_seg:{kid:'Gairebé! Amb <b>to</b> diem l\'hora que <b>ve</b>: 8:40 → twenty to <b>nine</b>.',par:'Amb «to» diu l\'hora que ja ha passat (8:40 → twenty to eight)'},
 en_ordinal:{kid:'Revisa la terminació: 1 → <b>1st</b>, 2 → <b>2nd</b>, 3 → <b>3rd</b>, la resta → <b>th</b> (però 21st, 22nd, 23rd, 31st; i 11th, 12th, 13th).',par:'Errors en les terminacions dels ordinals (1th, 2th, 22th)'},
 en_connector:{kid:'Pensa què uneix: afegir → <b>and</b> · contrari → <b>but</b> · triar → <b>or</b> · la causa → <b>because</b> · la conseqüència → <b>so</b>.',par:'Confon els connectors (and, but, or, because, so)'},
 en_like_ing:{kid:'Després de <b>like, love, enjoy, hate</b> i <b>don\'t mind</b>, el verb porta <b>-ing</b>: I love <b>swimming</b>.',par:'No posa -ing després de like / love / enjoy (I like swim)'},
 en_imperatiu:{kid:'Per donar una instrucció comencem directament amb el verb, sense subjecte: <b>Open</b> your book. En negativa: <b>Don\'t</b> + verb.',par:'No sap formar l\'imperatiu (you open, no run, not touch)'},
 en_nacionalitat:{kid:'Compte! El país i la nacionalitat són paraules diferents: I\'m from <b>France</b> → I\'m <b>French</b>.',par:'Confon el nom del país i la nacionalitat'}
});
const tbl=(h,rows)=>`<table class="mini"><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table>`;

/* ---------- dades ---------- */
const CONN=[// [frase, connector, nivell]
 ['I like pizza ___ I don\'t like burgers.','but',0],['I was hungry, ___ I made a sandwich.','so',0],['We stayed at home ___ it was raining.','because',0],['Do you want orange juice ___ water?','or',0],
 ['I\'ve got a dog ___ a cat.','and',0],['My brother is tall ___ my sister is short.','but',0],['She was tired, ___ she went to bed early.','so',0],['He is happy ___ he won the match.','because',0],
 ['Is your bag red ___ blue?','or',0],['We played football ___ then we had lunch.','and',0],['It was cold, ___ I put on my coat.','so',1],['I can swim, ___ I can\'t dive.','but',1],
 ['I didn\'t go to school ___ I had a temperature.','because',1],['You can go by bus ___ by train.','or',1],['My grandma makes cakes ___ biscuits every Sunday.','and',1],
 ['The museum was closed, ___ we went to the park.','so',1],['I love music, ___ I\'m not very good at singing.','but',1],['We wear helmets ___ they protect our heads.','because',1]];
const CONN_W=['and','but','or','because','so'];
const LIKE=[// [verb, -ing, resta, admet «to»]
 ['swim','swimming','in the sea'],['ride','riding','my bike'],['read','reading','comics'],['play','playing','video games'],['dance','dancing','at parties'],['run','running','in the park'],
 ['cook','cooking','with my dad'],['draw','drawing','animals'],['watch','watching','films'],['skate','skating','with my friends'],['write','writing','stories'],['get','getting','up early'],
 ['tidy','tidying','my room'],['go','going','to the beach'],['listen','listening','to music'],['make','making','cakes'],['sing','singing','in the shower'],['do','doing','homework']];
const LIKEV=[['like','likes','m\'agrada'],['love','loves','m\'encanta'],['enjoy','enjoys','gaudeixo'],['hate','hates','odio / no suporto'],["don't mind","doesn't mind",'no em fa res']];
const IMP=[// [verb, resta, en català, positiva?]
 ['open','your books at page 20','Obriu els llibres a la pàgina 20',1],['close','the door, please','Tanca la porta, per favor',1],['listen','carefully','Escoltau amb atenció',1],['sit','down, please','Seu, per favor',1],
 ['put','your hand up','Aixeca la mà',1],['wash','your hands before lunch','Renta\'t les mans abans de dinar',1],['run','in the corridor','No correu pel passadís',0],['shout','in the library','No crideu a la biblioteca',0],
 ['touch','the animals','No toqueu els animals',0],['forget','your homework','No t\'oblidis dels deures',0],['eat','in the classroom','No mengeu a la classe',0],['look','at the board','Mirau la pissarra',1],['be','late','No arribis tard',0],['work','in pairs','Treballau per parelles',1]];
const DIR=[// [en català, resposta, variants]
 ['Gira a l\'esquerra.',['turn left']],['Gira a la dreta.',['turn right']],['Ves tot recte.',['go straight on','go straight ahead','go straight']],['Travessa el carrer.',['cross the street','cross the road']],
 ['Agafa el primer carrer a la dreta.',['take the first street on the right','take the first on the right','take the first right']],['Agafa el segon carrer a l\'esquerra.',['take the second street on the left','take the second on the left','take the second left']],
 ['Para als semàfors.',['stop at the traffic lights']],['Puja per les escales.',['go up the stairs']]];
const FUN=[// [situació, respostes, nivell]
 ['Saludes la mestra a les 9 del matí.',['good morning'],0],['Preguntes a un nin nou com es diu.',["what's your name"],0],['Preguntes a algú quants anys té.',['how old are you'],0],
 ['Preguntes a algú d\'on és.',['where are you from'],0],['Preguntes a un amic com està.',['how are you',"how are you today"],0],['Respons que estàs bé, gràcies.',["i'm fine thanks","i'm fine thank you",'fine thanks','fine thank you',"i'm very well thank you","i'm well thanks"],0],
 ['T\'acomiades d\'un amic fins demà.',['see you tomorrow','bye see you tomorrow','goodbye see you tomorrow'],0],['Felicites l\'aniversari a la teva cosina.',['happy birthday'],0],
 ['Algú et diu «Thank you». Què li respons?',["you're welcome",'no problem','not at all'],0],['Algú parla massa de pressa. Li demanes que ho repeteixi.',['can you repeat that please','could you repeat that please','can you say that again please','could you say that again please','pardon','sorry can you repeat that please'],1],
 ['Vols saber com s\'escriu una paraula. Ho preguntes.',['how do you spell it','how do you spell that','how do you spell that word'],1],['Preguntes què vol dir la paraula «shy».',['what does shy mean','what is shy','what does the word shy mean'],1],
 ['Demanes permís per anar al lavabo.',['can i go to the toilet please','may i go to the toilet please','can i go to the bathroom please','may i go to the bathroom please','can i go to the toilet','may i go to the toilet'],1],
 ['Arribes tard a classe i et disculpes.',["sorry i'm late","i'm sorry i'm late"],1],['No entens l\'explicació. Ho dius.',["i don't understand","sorry i don't understand","i'm sorry i don't understand"],1],
 ['Demanes ajuda al mestre.',['can you help me please','could you help me please','can you help me','could you help me'],1],['Preguntes quina hora és.',['what time is it',"what's the time"],0],
 ['En una botiga, demanes una ampolla d\'aigua.',["i'd like a bottle of water please","can i have a bottle of water please","could i have a bottle of water please","a bottle of water please","i'd like a bottle of water"],2],
 ['Preguntes quant costa una camiseta.',['how much is it','how much is this t-shirt','how much is the t-shirt','how much does it cost','how much is this','how much does this t-shirt cost'],2],
 ['Desitges bon cap de setmana a la classe.',['have a nice weekend','have a good weekend','have a great weekend','enjoy your weekend'],1],
 ['Presentes la teva amiga Marta a la mestra.',['this is Marta','this is my friend Marta'],1],['Algú et presenta una persona nova. Li respons amablement.',['nice to meet you','pleased to meet you','nice to meet you too'],1],
 ['Vols que el teu amic jugui amb tu. Li proposes.',["let's play together",'do you want to play','do you want to play with me',"let's play",'shall we play','would you like to play'],2],
 ['T\'ofereixen més pastís i no en vols. Respons amb educació.',['no thank you','no thanks',"no thank you i'm full"],2]];
const COUNTRY=[// [país en anglès, nacionalitat, en català (país), nivell]
 ['Spain','Spanish','Espanya',0],['England','English','Anglaterra',0],['France','French','França',0],['Italy','Italian','Itàlia',0],['Germany','German','Alemanya',0],['Portugal','Portuguese','Portugal',1],
 ['the USA/the United States/USA/America/the United States of America','American','els Estats Units',0],['Ireland','Irish','Irlanda',1],['Scotland','Scottish','Escòcia',1],['Wales','Welsh','Gal·les',1],
 ['China','Chinese','la Xina',0],['Japan','Japanese','el Japó',0],['Mexico','Mexican','Mèxic',0],['Brazil','Brazilian','el Brasil',1],['Australia','Australian','Austràlia',1],['Canada','Canadian','el Canadà',1],
 ['Morocco','Moroccan','el Marroc',1],['Greece','Greek','Grècia',1],['India','Indian','l\'Índia',1],['the UK/the United Kingdom/UK/Britain/Great Britain','British','el Regne Unit',1]];
const PEOPLE=['Sophie','Marco','Hannah','Liam','Yuki','Pedro','Amira','Chen','Lucas','Emma'];

/* ---------- temes ---------- */
Object.assign(SK,{
 en_time:{mat:'angles',ab:'Ti',curs:[6],bloc:'Gramàtica',nom:'L\'hora: What time is it?',fig:()=>enClock(3,15,170),
  teoria:['Per preguntar l\'hora: <i>What time is it?</i> o <i>What\'s the time?</i> Responem: <i>It\'s ...</i>',
   tbl(['Hora','Es diu','Truc'],[['3:00','It\'s three <b>o\'clock</b>','hora en punt'],['3:15','It\'s (a) <b>quarter past</b> three','i quart'],['3:30','It\'s <b>half past</b> three','i mitja'],['3:45','It\'s (a) <b>quarter to</b> four','quarts per a les 4: l\'hora que <b>ve</b>'],['3:10','It\'s ten <b>past</b> three','de 0 a 30 minuts: past'],['3:40','It\'s twenty <b>to</b> four','de 31 a 59 minuts: to + l\'hora següent']]),
   'També es pot dir com al rellotge digital: <i>three fifteen, three forty</i>. I per dir <b>a</b> quina hora: <i>at</i> half past eight.'],
  gen(lv){const h=1+Math.floor(Math.random()*12),ms=lv===0?[0,30]:lv===1?[0,15,30,45]:[5,10,20,25,35,40,50,55,15,45],m=pick(ms),ok=enTimeSay(h,m),main=enTimeMain(h,m);
   if(lv>=1&&Math.random()<.3){const hh=m>30?h:h,dig=[`${h}:${String(m).padStart(2,'0')}`,`${h}.${String(m).padStart(2,'0')}`,`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`,`${h+12}:${String(m).padStart(2,'0')}`].map(norm);
    return{text:`Escriu l'hora en números (com un rellotge digital):<br><b>It's ${main}.</b>`,fields:[{label:'Hora (p. ex. 7:20)',txt:dig}],vis:null,pron:`It's ${main}.`,
     hints:[m>30?'«to» vol dir que falten minuts per a l\'hora que diu.':'«past» vol dir que han passat minuts de l\'hora que diu.','quarter = 15 minuts · half = 30 minuts'],
     steps:[m===0?'«o\'clock» → en punt.':m<=30?`${EN_MIN[m][0]} past ${enH(h)} → ${m} minuts després de les ${hh}.`:`${EN_MIN[60-m][0]} to ${enH(h+1)} → falten ${60-m} minuts per a les ${h%12+1}.`,`Resposta: <b>${h}:${String(m).padStart(2,'0')}</b>.`],
     err:v=>{if(dig.includes(v[0]))return null;if(m>30&&[`${h%12+1}:${String(60-m).padStart(2,'0')}`].includes(v[0]))return'en_hora_past_to';return null}}}
   const wrongPT=m&&m!==30?(m<30?enAlt([`${EN_MIN[m][0]} to ${enH(h)}`,`${EN_MIN[m][0]} to ${enH(h+1)}`].flatMap(s=>[s,`it's ${s}`])):enAlt([`${EN_MIN[60-m][0]} past ${enH(h)}`,`${EN_MIN[60-m][0]} past ${enH(h+1)}`].flatMap(s=>[s,`it's ${s}`]))):[];
   const wrongH=m>30?enAlt([`${EN_MIN[60-m][0]} to ${enH(h)}`].flatMap(s=>[s,`it's ${s}`])):[];
   return{text:'Mira el rellotge. <b>What time is it?</b> Escriu-ho en paraules.',fig:enClock(h,m),fields:[{label:'It\'s ...',txt:ok,wide:true}],vis:null,pron:`It's ${main}.`,
    hints:['La busca curta marca l\'hora i la llarga, els minuts.',m===0?'La busca llarga és a dalt de tot, al 12.':m<=30?'La busca llarga és a la dreta: fem servir «past».':'La busca llarga és a l\'esquerra: fem servir «to» i l\'hora següent.'],
    steps:[`Són les ${h}:${String(m).padStart(2,'0')}.`,m===0?'Hora en punt → o\'clock.':m<=30?`${m} minuts després → <b>${EN_MIN[m][0]} past</b> ${enH(h)}.`:`Falten ${60-m} minuts per a les ${h%12+1} → <b>${EN_MIN[60-m][0]} to</b> ${enH(h+1)}.`,`<b>It's ${main}.</b>`],
    err:v=>ok.includes(v[0])?null:wrongH.includes(v[0])?'en_hora_seg':wrongPT.includes(v[0])?'en_hora_past_to':null}}},
 en_dates:{mat:'angles',ab:'Dt',curs:[6],bloc:'Gramàtica',nom:'Dies, mesos, ordinals i dates',
  teoria:[tbl(['Dies de la setmana','Mesos'],[[EN_DAYS.map(d=>d[0]).join(', '),EN_MONTHS.map(m=>m[0]).join(', ')]]),
   'En anglès, els dies i els mesos s\'escriuen sempre amb <b>majúscula</b>: <i>on Monday, in May</i>.',
   'Per a les dates fem servir els <b>ordinals</b>: 1st <b>first</b>, 2nd <b>second</b>, 3rd <b>third</b>, 4th fourth, 5th fifth... 21st twenty-first, 22nd twenty-second, 31st thirty-first.',
   'Escrivim <i>12th May</i> o <i>May 12th</i> i ho llegim <i>the twelfth of May</i>. La data de naixement: <i>My birthday is <b>on</b> the 3rd of June</i>.'],
  gen(lv){const r=Math.random(),kind=lv===0?(r<.5?0:1):lv===1?(r<.3?1:r<.65?2:3):(r<.3?2:r<.6?3:4);
   if(kind===0){const[en,ca]=pick(Math.random()<.5?EN_DAYS:EN_MONTHS),ans=[norm(en)];
    return{text:`Com es diu «<b>${ca}</b>» en anglès?`,fields:[{label:'En anglès',txt:ans}],vis:null,pron:en,
     hints:[`Comença per «${en[0]}» (amb majúscula!).`,`Té ${en.length} lletres.`],steps:[`«${ca}» → <b>${en}</b>.`,'Recorda: dies i mesos sempre amb majúscula.'],err:v=>ans.includes(v[0])?null:lev(v[0],ans[0])<=2?'en_lletrejat':null}}
   if(kind===1){const L=Math.random()<.5?EN_DAYS:EN_MONTHS,i=Math.floor(Math.random()*L.length),aft=Math.random()<.6,j=(i+(aft?1:-1)+L.length)%L.length,ans=[norm(L[j][0])];
    const q=L===EN_DAYS?(aft?`What day comes after <b>${L[i][0]}</b>?`:`What day comes before <b>${L[i][0]}</b>?`):(aft?`What month comes after <b>${L[i][0]}</b>?`:`What month comes before <b>${L[i][0]}</b>?`);
    return{text:q,fields:[{label:'Resposta',txt:ans}],vis:null,pron:L[j][0],hints:[aft?'«after» vol dir «després de».':'«before» vol dir «abans de».',`En català és ${L[j][1]}.`],
     steps:[`${aft?'Després':'Abans'} de ${L[i][1]} ve ${L[j][1]}.`,`En anglès: <b>${L[j][0]}</b>.`],err:v=>ans.includes(v[0])?null:lev(v[0],ans[0])<=2?'en_lletrejat':null}}
   if(kind===2){const n=pick([1,2,3,4,5,8,9,11,12,13,20,21,22,23,25,30,31]),ans=[`${n}${enSuf(n)}`];
    return{text:`Escriu el número com a <b>ordinal abreujat</b> (com a les dates):<br><b>${n}</b> → ___ <span class="muted">(p. ex. 7 → 7th)</span>`,fields:[{label:'Ordinal',txt:ans}],vis:null,pron:EN_ORD[n],
     hints:['Mira l\'última xifra: 1 → st, 2 → nd, 3 → rd, la resta → th.','Compte: 11, 12 i 13 acaben en th.'],steps:[`${n} es diu <i>${EN_ORD[n]}</i>.`,`S'escriu <b>${n}${enSuf(n)}</b>.`],
     err:v=>ans.includes(v[0])?null:/^\d+(st|nd|rd|th)$/.test(v[0])&&parseInt(v[0])===n?'en_ordinal':null}}
   if(kind===3){const n=pick([1,2,3,4,5,8,9,12,15,20,21,22,23,30,31]),ans=A([EN_ORD[n],EN_ORD[n].replace('-',' ')]);
    return{text:`Escriu l'ordinal en <b>lletres</b>:<br><b>${n}${enSuf(n)}</b>`,fields:[{label:'En lletres',txt:ans,wide:true}],vis:null,pron:EN_ORD[n],
     hints:[n<4||n%10&&n%10<4&&n>20?'1, 2 i 3 tenen ordinals especials: first, second, third.':'La majoria afegeixen -th al número.',`Comença per «${EN_ORD[n][0]}».`],
     steps:[`${n}${enSuf(n)} → <b>${EN_ORD[n]}</b>.`,'Compte amb fifth, eighth, ninth, twelfth i twentieth: canvien una mica.'],err:v=>ans.includes(v[0])?null:lev(v[0],EN_ORD[n])<=2?'en_lletrejat':null}}
   const d=1+Math.floor(Math.random()*28),[mn,mc]=pick(EN_MONTHS),o=EN_ORD[d],o2=o.replace('-',' '),m=norm(mn);
   const ans=A([o,o2].flatMap(x=>[`the ${x} of ${m}`,`${x} of ${m}`,`${m} the ${x}`,`${m} ${x}`]));
   return{text:`Com llegeixes aquesta data en anglès? Escriu-la en lletres:<br><b>${d}${enSuf(d)} ${mn}</b> <span class="muted">(${d} de ${mc})</span>`,fields:[{label:'Es llegeix...',txt:ans,wide:true}],vis:null,pron:`the ${o} of ${mn}`,
    hints:['Fem servir l\'ordinal: the ... of ...',`${d}${enSuf(d)} → ${o[0]}...`],steps:[`${d}${enSuf(d)} → ${o}.`,`Es llegeix: <b>the ${o} of ${mn}</b>.`],
    err:v=>ans.includes(v[0])?null:v[0].includes(`the ${d} of`)||v[0].includes(`${['','one','two','three','four','five','six','seven','eight','nine','ten'][d]||'@@'} of`)?'en_ordinal':null}}},
 en_connect:{mat:'angles',ab:'Cn',curs:[6],bloc:'Gramàtica',nom:'Connectors: and, but, or, because, so',
  teoria:['Els <b>connectors</b> uneixen dues idees i fan que les frases quedin més ben fetes.',
   tbl(['Connector','Per a...','Exemple'],[['<b>and</b> (i)','afegir','I\'ve got a brother <b>and</b> a sister.'],['<b>but</b> (però)','dir una cosa contrària','I like cats <b>but</b> I don\'t like dogs.'],['<b>or</b> (o)','triar','Tea <b>or</b> coffee?'],['<b>because</b> (perquè)','dir la causa','I\'m happy <b>because</b> it\'s Friday.'],['<b>so</b> (per això)','dir la conseqüència','It was late, <b>so</b> I went to bed.']]),
   'Truc: <b>because</b> respon «per què?»; <b>so</b> diu «què va passar després, per culpa d\'això».'],
  gen(lv){const[s,c]=pick(CONN.filter(x=>x[2]<=lv)),ans=[c];
   return{text:`Completa amb <b>and, but, or, because</b> o <b>so</b>:<br><b>${s}</b>`,fields:[{label:'Connector',txt:ans}],vis:null,pron:s.replace('___',c),
    hints:['Llegeix les dues parts de la frase. Com estan relacionades?','afegir → and · contrari → but · triar → or · causa → because · conseqüència → so'],
    steps:[`La relació és: ${({and:'afegir',but:'una cosa contrària',or:'triar',because:'la causa',so:'la conseqüència'})[c]}.`,`→ <b>${c}</b>.`,`<b>${s.replace('___',c)}</b>`],
    err:v=>ans.includes(v[0])?null:CONN_W.includes(v[0])?'en_connector':null}}},
 en_like_ing:{mat:'angles',ab:'Lk',curs:[6],bloc:'Verbs i temps verbals',nom:'Like, love, hate + -ing (gustos)',
  teoria:['Per parlar de gustos: <b>like, love, enjoy, hate, don\'t mind</b> + verb amb <b>-ing</b>: <i>I love <b>dancing</b>. She hates <b>getting up</b> early.</i>',
   tbl(['Frase','Vol dir'],[['I love ...','M\'encanta'],['I like / I enjoy ...','M\'agrada / gaudeixo'],['I don\'t mind ...','No em fa res'],['I don\'t like ...','No m\'agrada'],['I hate ...','Odio, no suporto']]),
   'Ortografia de -ing: dance → danc<b>ing</b> (perd la e) · swim → swi<b>mm</b>ing, run → ru<b>nn</b>ing, get → ge<b>tt</b>ing (doblen) · play → playing.',
   'Amb he / she / it: <i>She <b>likes</b> reading. He <b>doesn\'t like</b> cooking.</i> (Amb like, love i hate també es pot dir «to + verb».)'],
  gen(lv){const[b,ig,rest]=pick(LIKE),[v1,v3,ca]=pick(LIKEV.filter((x,i)=>lv>0||i<4)),third=lv>=2&&Math.random()<.5,su=third?pick(['My sister','Tom','My best friend','She','He']):pick(['I','We','My friends','They','You']);
   const toOK=['like','love','hate'].includes(v1);
   if(third){const good=`${v3} ${ig}`,ans=A([good,...(toOK?[`${v3} to ${b}`]:[])]);
    return{text:`Completa amb el verb de gust i el verb en la forma correcta:<br><b>${su} ___ ${rest}.</b> ${mut(v1+' / '+b)}`,fields:[{label:'Dues paraules o més',txt:ans,wide:true}],vis:null,pron:`${su} ${good} ${rest}.`,
     hints:[`«${su}» és he / she / it: el primer verb porta -s (o doesn't).`,`Després, el verb «${b}» amb -ing.`],
     steps:[`${su} → <b>${v3}</b>.`,`${b} → <b>${ig}</b>.`,`${su} <b>${good}</b> ${rest}.`],
     err:v=>ans.includes(v[0])?null:A([`${v3} ${b}`,`${v3} ${s3x(b)}`]).includes(v[0])?'en_like_ing':A([`${v1} ${ig}`]).includes(v[0])&&v1!==v3?'en_tercera_persona':null}}
   const ans=A([ig,...(toOK?[`to ${b}`]:[])]);
   return{text:`Completa amb el verb en la forma correcta:<br><span class="muted">${ca}</span><br><b>${su} ${v1} ___ ${rest}.</b> ${mut(b)}`,fields:[{label:'Verb',txt:ans,wide:false}],vis:null,pron:`${su} ${v1} ${ig} ${rest}.`,
    hints:[`Després de «${v1}» el verb porta -ing.`,ig.endsWith(b.slice(-1)+b.slice(-1)+'ing')?'Compte: aquest verb dobla l\'última consonant.':/e$/.test(b)&&!ig.includes(b)?'Compte: aquest verb perd la e.':'Només cal afegir -ing.'],
    steps:[`${v1} + verb amb <b>-ing</b>.`,`${b} → <b>${ig}</b>.`,`${su} ${v1} <b>${ig}</b> ${rest}.`],
    err:v=>ans.includes(v[0])?null:[b,s3x(b),`to ${b}`].includes(v[0])?'en_like_ing':lev(v[0],ig)<=2?'en_lletrejat':null}}},
 en_imperative:{mat:'angles',ab:'Im',curs:[6],bloc:'Verbs i temps verbals',nom:'Instruccions i indicacions (imperatiu)',
  teoria:['Per donar <b>instruccions</b>, normes o indicacions comencem amb el <b>verb</b>, sense subjecte: <i><b>Open</b> your books. <b>Turn</b> left.</i>',
   'En negativa: <b>Don\'t</b> + verb: <i><b>Don\'t run</b> in the corridor.</i> Per ser amable, hi afegim <b>please</b>.',
   tbl(['Per anar a un lloc','En català'],[['Go straight on','Ves tot recte'],['Turn left / right','Gira a l\'esquerra / dreta'],['Take the first street on the right','Agafa el primer carrer a la dreta'],['Cross the street','Travessa el carrer'],['Stop at the traffic lights','Para als semàfors']])],
  gen(lv){if(lv>=1&&Math.random()<.45){const[ca,ok]=pick(DIR.filter((x,i)=>lv>1||i<5)),ans=A(ok);
    return{text:`Com ho dius en anglès? (indicacions)<br><b>${ca}</b>`,fields:[{label:'En anglès',txt:ans,wide:true}],vis:null,pron:ok[0],
     hints:['Comença directament amb el verb (sense «you»).',`Comença per «${ok[0].split(' ')[0]}».`],steps:[`«${ca}» → <b>${cap(ok[0])}</b>${ok.length>1?` (també: ${ok.slice(1).join(', ')})`:''}.`],
     err:v=>ans.includes(v[0])?null:/^(you|please you) /.test(v[0])||/^to /.test(v[0])?'en_imperatiu':null}}
   const[b,rest,ca,pos]=pick(IMP),good=pos?b:`don't ${b}`,ans=A(good,pos?[]:[`do not ${b}`]);
   return{text:`Completa la instrucció ${pos?'✅':'❌'}:<br><span class="muted">${ca}</span><br><b>___ ${rest}.</b> ${mut(b)}`,fields:[{label:pos?'Verb':'Don\'t + verb',txt:ans,wide:!pos}],vis:null,pron:`${cap(good)} ${rest}.`,
    hints:[pos?'És una instrucció: comença amb el verb, sense subjecte.':'És una prohibició: Don\'t + verb.',`El verb és «${b}».`],
    steps:[pos?'Instrucció → verb sense subjecte.':'Prohibició → <b>Don\'t</b> + verb.',`<b>${cap(good)}</b> ${rest}.`],
    err:v=>ans.includes(v[0])?null:[`you ${b}`,`to ${b}`,`no ${b}`,`not ${b}`,`doesn't ${b}`,`doesnt ${b}`,`you don't ${b}`,`dont ${b}s`,`don't ${b}ing`,`${s3x(b)}`].map(norm).includes(v[0])&&v[0]!==b?'en_imperatiu':null}}},
 en_functions:{mat:'angles',ab:'Fr',curs:[6],bloc:'Vocabulari i comprensió',nom:'Frases útils: saludar, presentar-se, demanar ajuda',
  teoria:['Hi ha frases que es fan servir cada dia. Aprèn-les senceres, com si fossin una sola paraula.',
   tbl(['Situació','En anglès'],[['Saludar / acomiadar-se','Good morning! · Hello! · See you tomorrow! · Bye!'],['Presentar-se','What\'s your name? — I\'m Laia. · Nice to meet you. · This is my friend Pau.'],['Preguntar','How old are you? · Where are you from? · How are you? — I\'m fine, thanks.'],['A classe','Can you repeat that, please? · How do you spell it? · What does «shy» mean? · Can I go to the toilet, please? · Sorry, I\'m late. · I don\'t understand.'],['A una botiga','I\'d like a bottle of water, please. · How much is it?'],['Ser amable','Thank you! — You\'re welcome. · Happy birthday! · Have a nice weekend! · No, thank you.']]),
   'Recorda la cortesia anglesa: diem molt sovint <b>please</b> (per favor) i <b>thank you</b> (gràcies).'],
  gen(lv){const[sit,ok]=pick(FUN.filter(x=>x[2]<=lv)),all=ok.flatMap(s=>[s,s.replace(/ please$/,''),s+' please']),ans=A(all);
   return{text:`Què dius en anglès?<br><b>${sit}</b>`,fields:[{label:'En anglès',txt:ans,wide:true}],vis:null,pron:ok[0],
    hints:[`Comença per «${ok[0].split(' ')[0]}».`,`Són ${ok[0].split(' ').length} paraules: ${ok[0].split(' ').map(w=>w[0]+'…').join(' ')}`],
    steps:[`Es diu: <b>${disp(ok[0])}${/^(what|how|where|can|could|may|do|shall|would)/.test(ok[0])?'?':'!'}</b>`,ok.length>1?`També es pot dir: ${ok.slice(1,3).map(disp).join(' · ')}.`:'Digues-la en veu alta tres vegades.'],
    err:v=>{if(ans.includes(v[0]))return null;return Math.min(...ans.map(a=>lev(v[0],a)))<=2?'en_lletrejat':null}}}},
 en_voc_countries:{mat:'angles',ab:'Na',curs:[6],bloc:'Vocabulari i comprensió',nom:'Vocabulari: països i nacionalitats',
  teoria:['Per dir d\'on és algú: <i>I\'m <b>from</b> Spain. I\'m <b>Spanish</b>.</i> El país i la nacionalitat són paraules diferents, i totes dues van amb <b>majúscula</b>.',
   tbl(['País','Nacionalitat','En català'],COUNTRY.map(c=>[c[0].split('/')[0],`<b>${c[1]}</b>`,c[2]])),
   'Es parla anglès al Regne Unit (Anglaterra, Escòcia, Gal·les i Irlanda del Nord), Irlanda, els Estats Units, el Canadà, Austràlia, Nova Zelanda i molts altres països.'],
  gen(lv){const[cs,nat,ca]=pick(COUNTRY.filter(x=>x[3]<=lv)),cl=cs.split('/'),c0=cl[0].replace(/^the /,''),who=pick(PEOPLE),r=Math.random();
   if(lv===0&&r<.4||r<.25){const ans=A(cl.flatMap(c=>[c,c.replace(/^the /,'')]));
    return{text:`Com es diu <b>${ca}</b> en anglès?`,fields:[{label:'País',txt:ans,wide:true}],vis:null,pron:cl[0],hints:[`Comença per «${c0[0]}».`,`Té ${c0.length} lletres.`],
     steps:[`${ca} → <b>${cl[0]}</b>.`,`Nacionalitat: ${nat}.`],err:v=>ans.includes(v[0])?null:norm(v[0])===norm(nat)?'en_nacionalitat':lev(v[0],norm(c0))<=2?'en_lletrejat':null}}
   if(r<.75){const ans=[norm(nat)];
    return{text:`Completa amb la <b>nacionalitat</b>:<br><b>${who} is from ${cl[0]}. ${['Sophie','Hannah','Yuki','Amira','Emma'].includes(who)?'She':'He'}'s ___.</b>`,fields:[{label:'Nacionalitat',txt:ans}],vis:null,pron:`${who} is from ${cl[0]}. ${nat}.`,
     hints:['No repeteixis el país: cal la nacionalitat.',`Comença per «${nat[0]}».`],steps:[`${cl[0]} → <b>${nat}</b>.`,'Les nacionalitats van amb majúscula.'],
     err:v=>ans.includes(v[0])?null:A(cl.flatMap(c=>[c,c.replace(/^the /,'')])).includes(v[0])?'en_nacionalitat':lev(v[0],ans[0])<=2?'en_lletrejat':null}}
   const ans=A(cl.flatMap(c=>[c,c.replace(/^the /,'')]));
   return{text:`Completa amb el <b>país</b>:<br><b>${who} is ${nat}. ${['Sophie','Hannah','Yuki','Amira','Emma'].includes(who)?'She':'He'}'s from ___.</b>`,fields:[{label:'País',txt:ans,wide:true}],vis:null,pron:`${who} is ${nat}, from ${cl[0]}.`,
    hints:['Després de «from» va el nom del país.',`Comença per «${c0[0]}».`],steps:[`${nat} → <b>${cl[0]}</b>.`],
    err:v=>ans.includes(v[0])?null:norm(v[0])===norm(nat)?'en_nacionalitat':lev(v[0],norm(c0))<=2?'en_lletrejat':null}}}
});
function s3x(b){return b==='do'?'does':b==='go'?'goes':/(s|sh|ch|x|o)$/.test(b)?b+'es':/[^aeiou]y$/.test(b)?b.slice(0,-1)+'ies':b+'s'}

enVocTema('en_voc_family',{ab:'Fm',nom:'Vocabulari: la família',intro:'Per parlar de la família: <i>My mum\'s sister is my aunt. My aunt\'s children are my cousins.</i> Per dir de qui és: <i>my brother<b>\'s</b> bike</i>.',
 w:`mother/mum/mom;mare;👩|father/dad;pare;👨|parents;pares;👪|brother;germà;👦|sister;germana;👧|grandmother/grandma/granny;padrina/àvia;👵|grandfather/grandpa/granddad;padrí/avi;👴|grandparents;padrins/avis;|uncle;oncle/tio;|aunt;tia;|cousin;cosí/cosina;|baby;nadó/bebè;👶|son;fill;|daughter;filla;|children;fills/nins/infants;|husband;marit;;1|wife;dona/esposa;;1|twins;bessons/bessones;👯;1|nephew;nebot;;1|niece;neboda;;1|grandson;nét;;1|granddaughter;néta;;1|only child;fill únic/filla única;;1|stepmother;madrastra;;1`});
enVocTema('en_voc_daily',{ab:'Dr',nom:'Vocabulari: la rutina diària',intro:'Per explicar què fas cada dia: <i>I get up at seven, I have a shower and I have breakfast.</i> Amb he / she: <i>She gets up, she has a shower...</i>',
 w:`wake up;despertar-se;⏰|get up;aixecar-se;🛏️|have a shower;dutxar-se;🚿|get dressed;vestir-se;👕|brush my teeth/brush your teeth/clean my teeth;rentar-se les dents;|have breakfast;berenar/esmorzar;🥣|go to school;anar a l'escola;🏫|have lunch;dinar;🥪|do homework/do my homework;fer els deures;📝|go home;anar a casa/tornar a casa;🏠|have dinner;sopar;🍽️|go to bed;anar a dormir/anar al llit/colgar-se;😴|watch TV;mirar la tele/veure la televisió;📺|walk the dog;passejar el ca/passejar el gos;🐕|tidy my room/tidy your room;endreçar l'habitació/ordenar l'habitació;;1|make my bed/make your bed;fer el llit;;1|set the table/lay the table;parar la taula;🍴;1|wash the dishes/do the washing-up;rentar els plats/fregar els plats;;1|have a bath;banyar-se/prendre un bany;🛁;1|catch the bus;agafar l'autobús;🚌;1`});
})();
