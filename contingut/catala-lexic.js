/* Aprenem - LLENGUA CATALANA 6è: LÈXIC I VARIETATS
   Camps semàntics (hiperònims i hipònims), homònims i homòfons, manlleus i neologismes, barbarismes,
   formació de paraules (sufixos), mots compostos i famílies de paraules, frases fetes i refranys,
   varietats dialectals (el balear).
   Part de l'app d'estudi. Vegeu CLAUDE.md i la capçalera de contingut/catala.js (fonts). */
(()=>{
const A=s=>s.split('|');

/* ---------- camps semàntics ---------- */
// [hiperònim (formes acceptades), hipònims]
const HIP=[['fruita|fruites|fruits|fruit','poma|pera|plàtan|taronja|maduixa|préssec|cirera|raïm|meló|síndria|kiwi|mandarina|albercoc|figa|pinya|llimona|pruna|nespra|magrana|aranja|gerd|móra|nectarina|codony'],
 ['ocell|ocells|au|aus','pardal|colom|gavina|àguila|oreneta|merla|mussol|òliba|cotorra|canari|gallina|ànec|cigonya|falcó|voltor|puput|perdiu|estornell|pingüí|garsa|flamenc|pit-roig|corb|lloro|paó|tord|gall'],
 ['color|colors','vermell|blau|verd|groc|negre|blanc|gris|rosa|lila|taronja|marró|morat|violeta|beix|roig|turquesa|daurat|platejat'],
 ['instrument|instruments|instrument musical|instruments musicals','guitarra|piano|violí|flauta|bateria|trompeta|saxo|saxòfon|arpa|violoncel|clarinet|tambor|xeremies|acordió|ukulele|contrabaix|oboè|trombó|tuba|flabiol|tamborino|xilòfon|triangle|harmònica|teclat|baix'],
 ['moble|mobles','cadira|taula|armari|llit|sofà|prestatgeria|calaixera|tamboret|butaca|banc|escriptori|tauleta|bufet|aparador|penja-robes|catre|coqueta|llibreria'],
 ['eina|eines','martell|serra|tornavís|alicates|clau anglesa|pala|rascle|aixada|destral|trepant|tisores|llima|lima|tenalles|xerrac|llima|falç|nivell|cinta mètrica|metre'],
 ['verdura|verdures|hortalissa|hortalisses','enciam|tomàquet|tomàtiga|pastanaga|ceba|carbassó|albergínia|pebre|pebrot|mongeta|pèsol|espinac|espinacs|bròquil|col|coliflor|porro|carxofa|api|cogombre|carabassa|all|rave|bleda|bledes|patata'],
 ['transport|transports|mitjà de transport|mitjans de transport|vehicle|vehicles','cotxe|autobús|tren|avió|vaixell|bicicleta|moto|motocicleta|metro|tramvia|camió|helicòpter|patinet|furgoneta|taxi|barca|iot|globus|submarí|ferri|autocar|tractor|ambulància'],
 ['roba|peça de roba|peces de roba','camisa|pantalons|faldilla|jersei|abric|mitjons|mitjó|samarreta|jaqueta|vestit|bufanda|gorra|barret|capell|xandall|calçons|camiseta|brusa|guants|corbata|pijama|banyador|texans|dessuadora'],
 ['esport|esports','futbol|bàsquet|tennis|natació|handbol|ciclisme|atletisme|voleibol|judo|gimnàstica|rugbi|hoquei|esquí|vela|pàdel|karate|surf|bàdminton|escalada|piragüisme|golf|patinatge|beisbol|waterpolo|boxa|taekwondo'],
 ['flor|flors','rosa|margarida|clavell|tulipa|lliri|gessamí|violeta|orquídia|rosella|gerani|gira-sol|dàlia|hortènsia|crisantem|narcís|camèlia|lavanda|espígol|buguenvíl·lea'],
 ['professió|professions|ofici|oficis|feina|feines','metge|metgessa|mestre|mestra|bomber|bombera|pagès|pagesa|cuiner|cuinera|fuster|fustera|pintor|pintora|policia|infermer|infermera|advocat|advocada|pilot|forner|fornera|perruquer|perruquera|mecànic|mecànica|músic|música|pescador|pescadora|arquitecte|arquitecta|dentista|veterinari|veterinària|enginyer|enginyera|periodista|cambrer|cambrera|electricista|lampista|carter|cartera|jardiner|jardinera|actor|actriu|jutge|jutgessa|farmacèutic|farmacèutica|científic|científica'],
 ['arbre|arbres','pi|alzina|olivera|ametller|garrover|figuera|roure|faig|pollancre|xiprer|taronger|llimoner|palmera|savina|castanyer|pomer|avellaner|om|pomera|perera|noguer|pi blanc|ullastre|freixe|salze|eucaliptus|baladre|lledoner|magraner|cirerer|abet|bedoll'],
 ['mamífer|mamífers','gos|ca|gat|moix|cavall|vaca|elefant|lleó|conill|porc|ovella|cabra|dofí|balena|ratolí|ós|tigre|mona|rata pinyada|ratpenat|girafa|zebra|llop|guineu|rabosa|cérvol|esquirol|eriçó|ase|ruc|mul|camell|hipopòtam|rinoceront|foca|ximpanzé|goril·la|cangur|koala|panda|toro|bou|xai|be']];

/* ---------- homònims ---------- */
const HOM=[['Seient llarg per a diverses persones.','Empresa on es guarden els doblers.','banc'],['Part del cos on tenim els ulls i la boca.','Paraula que vol dir «ningú» o «gens» (no ve ___ alumne).','cap'],['Animal que viu als arbres i s\'assembla una mica a les persones.','Pastís típic de Pasqua.','mona'],['Conjunt de muntanyes (la ___ de Tramuntana).','Eina amb dents per tallar fusta.','serra'],
 ['Petit rosegador de cua llarga.','Aparell que mou el cursor de l\'ordinador.','ratolí'],['Òrgan de la boca que serveix per tastar.','Idioma (el català és la nostra ___).','llengua'],['Part verda de les plantes.','Tros de paper per escriure.','fulla|full'],['Instrument amb tambors i plats.','Aparell que dona energia al mòbil.','bateria'],['Munt de coses posades una damunt l\'altra.','Objecte petit que dona energia a una joguina.','pila'],
 ['Recipient de fang per a les plantes.','Examen curt amb preguntes.','test'],['Objecte de metall per obrir un pany.','La solució d\'un misteri (la ___ del problema).','clau'],['Astre que ens dona llum i calor.','Nota musical que va després de fa.','sol'],['Corrent d\'aigua que va cap a la mar.','Forma del verb riure (ell ___ molt).','riu'],['Part de la planta que és davall terra.','Part comuna de les paraules d\'una família.','arrel'],['Animal de quatre potes que fa miau.','Aparell per aixecar el cotxe i canviar una roda.','gat'],['Peça de la cara amb què veim.','Forat de l\'agulla on es posa el fil.','ull']];
// homòfons que s'escriuen diferent: [frase amb ___, resposta, l'altra forma, explicació]
const HOF=[['Ella ___ anat al mercat.','ha','a','ha: verb haver (ha anat)'],['Anem ___ la platja.','a','ha','a: preposició'],['No ___ sé.','ho','o','ho: pronom (això)'],['Vols pa ___ coca?','o','ho','o: conjunció (una cosa o l\'altra)'],['Al pati ___ ha molts d\'infants.','hi','i','hi: pronom (hi ha)'],['Pa ___ formatge.','i','hi','i: conjunció (uneix)'],['Nosaltres ___ arribat tard.','hem','em','hem: verb haver'],['Demà ___ llevaré d\'hora.','em','hem','em: pronom (a mi)'],
 ['Aquest llibre té ___ pàgines.','cent','sent','cent: el nombre 100'],['No ___ res amb aquest soroll.','sent','cent','sent: verb sentir'],['El riu està ___ a l\'estiu.','sec','cec','sec: sense aigua'],['L\'home ___ camina amb un bastó blanc.','cec','sec','cec: que no hi veu']];

/* ---------- manlleus i neologismes ---------- */
// [paraula estrangera, forma catalana, a = adaptada, e = equivalent catalana]
const MAN=[['football','futbol','a'],['basketball','bàsquet','a'],['chat','xat','a'],['yogurt','iogurt','a'],['chef','xef','a'],['garage','garatge','a'],['kayak','caiac','a'],['scanner','escàner','a'],['sandwich','sandvitx|entrepà','a'],['goal','gol','a'],['leader','líder','a'],['stand','estand','a'],['blog','bloc','a'],['ticket','tiquet|entrada|bitllet','a'],['casting','càsting','a'],['penalty','penal','a'],['croissant','croissant|cruasan','a'],['jersey','jersei','a'],['whisky','whisky','a',1],
 ['email','correu electrònic|correu|correu-e','e'],['online','en línia','e'],['parking','aparcament','e'],['hobby','afició|passatemps','e'],['mouse','ratolí','e'],['software','programari','e'],['hardware','maquinari','e'],['password','contrasenya','e'],['link','enllaç','e'],['download','baixada|descàrrega','e'],['jeans','texans','e'],['ok','d\'acord|entesos|bé','e'],['cookie','galeta','e'],['show','espectacle','e'],['match','partit','e'],['souvenir','record','e'],['smartphone','telèfon intel·ligent|mòbil','e'],['selfie','autofoto|selfie','e']];

/* ---------- barbarismes ---------- */
// [frase amb el *barbarisme*, formes correctes, nivell]
const BAR=[['*Bueno*, ja hi som.','bé|bé doncs|doncs|bo'],['Ens veim a les cinc, *vale*?','d\'acord|entesos|val'],['Hi ha un *tenedor* damunt la taula.','forquilla|forqueta'],['*Tinc que* fer els deures.','he de|haig de'],['Em fa mal l\'*espalda*.','esquena'],['Ho he deixat dins el *cajón*.','calaix'],['Hem fet una *apuesta*.','aposta|juguesca'],['El *sello* de la carta és de Menorca.','segell'],['Encén la *bombilla*.','bombeta'],['M\'he menjat un *bocadillo* de formatge.','entrepà|panet'],
 ['El *grifo* no tanca bé.','aixeta'],['Agafa les *tijeres*.','tisores'],['Els meus *abuelos* viuen a Felanitx.','avis|padrins'],['*Desde* la finestra veig la mar.','des de'],['*Igual* plou demà.','potser|tal vegada'],['Demà és el meu *cumpleanys*.','aniversari'],['Aquesta pel·lícula és molt *aburrida*.','avorrida'],['*Ojalà* faci sol!','tant de bo'],['Posa una mica d\'*aceite* a l\'enciam.','oli'],['El *jefe* de la colla és en Toni.','cap|líder'],
 ['Hem *llegat* tard a l\'escola.','arribat'],['Tinc molta *sed*.','set'],['On són les meves *gafes*?','ulleres'],['*A veces* anam al cine.','a vegades|de vegades|qualque vegada|algunes vegades|a voltes'],['*Pues* no ho sé.','doncs|idò'],['Has *disfrutat* de la festa?','gaudit'],['No *em vaig donar compte* de l\'hora.','em vaig adonar','1'],['Agafa la *escoba* i escombra.','granera|escombra'],['Duc la *mochila* plena de llibres.','motxilla'],
 ['El *basurero* és ple.','fems|poal dels fems|cubell de les escombraries|paperera|contenidor',1],['Vull un *vaso* d\'aigua.','tassó|got|vas'],['La *servilleta* és bruta.','tovalló|torcaboques'],['M\'he fet un *chichón* al front.','bony|nyanyo'],['Posa els tassons damunt la *bandeja*.','safata'],['Em vaig *enterar* ahir.','assabentar',1]];
// filtra les frases dubtoses o amb dos barbarismes
const BAR_OK=BAR.filter(x=>x[2]!==2&&(x[0].match(/\*/g)||[]).length===2);

/* ---------- formació de paraules ---------- */
// [frase amb ___, respostes, sufix o explicació, n = nom, a = adjectiu, v = verb, d = diminutiu]
const DER=[['La qualitat de ser feliç és la ___.','felicitat','-itat','n'],['La qualitat de ser trist és la ___.','tristesa','-esa','n'],['La qualitat de ser valent és la ___.','valentia','-ia','n'],['La qualitat de ser bo és la ___.','bondat','-dat','n'],['La qualitat de ser net és la ___.','netedat|netesa','-edat','n'],['La qualitat de ser alt és l\'___.','altura|alçada','-ura','n'],['La qualitat de ser blanc és la ___.','blancor|blancura','-or','n'],
 ['La persona que neda és un ___.','nedador','-dor','n'],['La persona que escriu llibres és un ___.','escriptor','-or','n'],['La persona que canta és un ___.','cantant|cantaire','-ant','n'],['La persona que llegeix és un ___.','lector','-or','n'],['L\'acció d\'explicar és una ___.','explicació','-ció','n'],['L\'acció de construir és una ___.','construcció','-ció','n'],['L\'acció d\'ensenyar és l\'___.','ensenyament|ensenyança','-ment','n'],['La botiga on es venen llibres és una ___.','llibreria','-eria','n'],['La persona que fa sabates és un ___.','sabater','-er','n'],
 ['Un lloc amb molts de perills és un lloc ___.','perillós','-ós','a'],['Una zona amb moltes muntanyes és una zona ___.','muntanyosa|muntanyenca','-ós','a'],['Una persona que té molta por és ___.','poruga|poregosa','-uc','a'],['Una cosa que es pot llegir és ___.','llegible','-ible','a'],['Una cosa que es pot creure és ___.','creïble','-ible','a'],['Una cosa que es pot menjar és ___.','menjable|comestible','-able','a'],['Una persona de Mallorca és ___.','mallorquina|mallorquí','-í','a'],['Una persona de Menorca és ___.','menorquina|menorquí','-í','a'],['Una persona d\'Eivissa és ___.','eivissenca|eivissenc','-enc','a'],['Un plat amb molt de gust és ___.','gustós','-ós','a'],['Un paisatge amb neu és un paisatge ___.','nevat','-at','a'],
 ['Fer més llarg és ___.','allargar','a- ... -ar','v'],['Fer més curt és ___.','escurçar','es- ... -ar','v'],['Fer una cosa més neta és ___.','netejar','-ejar','v'],['Fer una cosa més bruta és ___.','embrutar','em- ... -ar','v'],['Fer més dolç és ___.','endolcir','en- ... -ir','v'],['Fer una cosa rodona és ___.','arrodonir','a- ... -ir','v'],['Posar-se vermell és ___.','envermellir|envermellir-se','en- ... -ir','v'],['Fer més bonic és ___.','embellir','em- ... -ir','v'],['Treure la pols és ___.','espolsar','es- ... -ar','v'],['Posar a prop és ___.','apropar|acostar','a- ... -ar','v'],['Posar lluny és ___.','allunyar','a- ... -ar','v'],
 ['Una casa petita és una ___.','caseta','-eta','d'],['Un llibre petit és un ___.','llibret','-et','d'],['Una taula petita és una ___.','tauleta','-eta','d'],['Un arbre petit és un ___.','arbret|arbrissó','-et','d'],['Una cadira petita és una ___.','cadireta','-eta','d'],['Un moix petit és un ___.','moixet','-et','d']];

/* ---------- compostos i famílies ---------- */
const COMP=[['para','sol','para-sol'],['gira','sol','gira-sol'],['penja','robes','penja-robes'],['escura','xemeneies','escura-xemeneies',1],['grata','cel','gratacel'],['renta','plats','rentaplats'],['para','llamps','parallamps'],['trenca','closques','trencaclosques'],['escura','dents','escuradents'],['obre','llaunes','obrellaunes'],['salva','vides','salvavides'],['lleva','taps','llevataps'],['passa','muntanyes','passamuntanyes'],['terra','trèmol','terratrèmol'],['mig','dia','migdia'],['boca','moll','bocamoll'],['aigua','ardent','aiguardent',1],['roda','món','rodamón',1],['pica','pedrer','picapedrer',1]];
const FAM=[['mar','mariner|marinera|marí|marina|marejol|marejada|submarí|maresme|marítim|amarar|ultramar|marisc'],['pa','panet|panera|paner|paneret|empanada|panada|panificadora|panades'],['flor','florista|floristeria|florir|floració|florit|floreta|florera|floret|florida|floral'],['terra','terrestre|enterrar|aterrar|terrós|terreny|desenterrar|terrissa|terraqüi|soterrani|terratrèmol|enterrament|aterratge'],['llibre','llibreria|llibreter|llibretera|llibreta|llibret|llibrot|llibrer'],['peix','peixater|peixatera|peixateria|peixet|peixera|peixos'],['neu','nevar|nevada|nevera|nevat|nevós|nevisca'],['fruita','fruiter|fruitera|fruiteria|fruitós|fructífer'],['casa','caseta|casolà|casolana|casalot|casal|casota'],['sabata','sabater|sabatera|sabateria|sabatilla|sabateta'],['pedra','pedrer|pedrera|pedregós|pedrís|empedrat|apedregar|pedregada|picapedrer|pedreta'],['vent','ventada|ventar|ventall|ventilador|ventós|ventijol|ventilar']];
const PRIM=[['llibreria','llibre'],['fusteria','fusta'],['forner','forn'],['sabater','sabata'],['florista','flor'],['jardiner','jardí'],['rellotger','rellotge'],['peixateria','peix'],['terrestre','terra'],['nevada','neu'],['mariner','mar'],['caseta','casa'],['pomera','poma'],['taronger','taronja'],['ametller','ametla|ametlla'],['gelateria','gelat'],['pedregós','pedra'],['ventall','vent']];

/* ---------- frases fetes i refranys ---------- */
// [frase amb ___, paraula, significat]
const FF=[['Ploure a bots i ___.','barrals','ploure molt fort'],['Ser més llest que una ___.','fura','ser molt espavilat'],['Estar com un ___ dins l\'aigua.','peix','estar molt a gust'],['Fer l\'___.','orni','fer veure que no t\'adones de res'],['Costar un ull de la ___.','cara','costar molts de doblers'],['Bufar i fer ___.','ampolles','ser molt fàcil'],['Posar fil a l\'___.','agulla','començar una feina'],['Quedar-se de ___.','pedra','quedar-se molt sorprès'],['Cercar una agulla dins un ___.','paller','cercar una cosa molt difícil de trobar'],['Fer el ___.','préssec','fer el ridícul'],['Ser un ___ de mar.','llop','ser un mariner amb molta experiència'],['Estar a la ___.','lluna','estar distret'],['Anar amb peus de ___.','plom','anar amb molt de compte'],['Ficar ___.','cullerada','opinar sense que t\'ho demanin'],['Tenir mala ___.','llet','tenir mal geni'],['Fer ___.','campana','no anar a classe sense permís'],['Fer-ne cinc ___.','cèntims','explicar una cosa breument'],['Tocar el ___.','dos','anar-se\'n']];
const REF=[['Qui dia passa, any ___.','empeny','si anam fent cada dia, arribam lluny'],['Qui no plora no ___.','mama','qui no demana les coses no les aconsegueix'],['Més val un ocell en mà que cent ___.','volant','és millor una cosa segura que moltes de dubtoses'],['A poc a poc s\'hi va ___.','lluny','amb paciència s\'arriba a la meta'],['Qui matina, fa ___.','farina','qui comença d\'hora aprofita el temps'],['Qui sembra vents recull ___.','tempestes','qui fa mal acaba rebent mal'],['Gat escaldat, d\'aigua tèbia ___.','fuig','qui ha tingut una mala experiència va amb compte'],['De mica en mica s\'omple la ___.','pica','les coses petites, sumades, fan coses grans'],['Qui té un amic té un ___.','tresor','l\'amistat val molt'],['Cada ovella amb la seva ___.','parella','cadascú va amb qui s\'hi assembla'],['Al juny, la falç al ___.','puny','al juny es fa la sega'],['Abril, cada gota val per ___.','mil','la pluja d\'abril és molt bona per al camp']];

/* ---------- varietats: el balear ---------- */
// [paraula balear, equivalents en català central / general]
const BAL=[['moix','gat'],['ca','gos'],['al·lot','noi|nen|xicot'],['al·lota','noia|nena|xicota'],['idò','doncs'],['davall','sota'],['granera','escombra'],['tassó','got|vas'],['torcaboques','tovalló'],['padrí','avi'],['padrina','àvia'],['aferrar','enganxar|agafar'],['horabaixa','tarda|capvespre'],['capell','barret'],['juguesca','aposta'],['tomàtiga','tomàquet'],['besada','petó'],['dematí','matí'],['calçons','pantalons'],['cercar','buscar'],['xerrar','parlar'],['nin','nen'],['nina','nena'],['ca nostra','casa nostra'],['qualque','algun|alguna']];
// article salat: [article literari + nom, article salat + nom]
const SAL=[['la platja','sa platja'],['el cotxe','es cotxe'],['les cases','ses cases'],['els nins','es nins'],['l\'arbre','s\'arbre'],['l\'illa','s\'illa'],['l\'escola','s\'escola'],['la mar','sa mar'],['el moix','es moix'],['les al·lotes','ses al·lotes'],['el pa','es pa'],['la padrina','sa padrina']];
// verbs regulars: present balear
const BALV=['cantar','parlar','ballar','nedar','mirar','pintar','saltar','escoltar','ajudar','jugar','menjar'];

Object.assign(SK,{
 ca_hiperonims:{mat:'catala',ab:'Hp',curs:[6],nom:'Camps semàntics: hiperònims i hipònims',
  teoria:['Un <b>camp semàntic</b> és un grup de paraules que tenen relació pel significat: <i>platja, sorra, ones, tovallola, para-sol</i> (camp semàntic de la platja).',
   'Un <b>hiperònim</b> és una paraula general que inclou altres paraules més concretes, els <b>hipònims</b>:',
   `<table class="mini"><tr><th>Hiperònim</th><th>Hipònims</th></tr><tr><td>fruita</td><td>poma, pera, plàtan, cirera...</td></tr><tr><td>ocell</td><td>pardal, gavina, mussol...</td></tr><tr><td>moble</td><td>cadira, taula, armari...</td></tr></table>`,
   'Fer servir hiperònims ens ajuda a no repetir paraules dins un text.'],
  gen(lv){const[h,hs]=pick(HIP),list=A(hs),show=[];while(show.length<3){const x=pick(list);if(!show.includes(x))show.push(x)}
   if(lv===0||Math.random()<.5)return caEx(`Escriu l'<b>hiperònim</b> (la paraula general) d'aquestes paraules:<br><b>${show.join(', ')}</b>`,A(h),{label:'Hiperònim',loose:true,
    hints:['Quina paraula general inclou totes aquestes?','Pensa: «la poma, la pera i el plàtan són… »'],steps:[`${caCap(show.join(', '))} són <b>${A(h)[0]}</b>.`]});
   return caEx(`Escriu un altre <b>hipònim</b> de «<b>${A(h)[0]}</b>», diferent de: ${show.join(', ')}.`,list.filter(x=>!show.includes(x)),{label:'Hipònim',loose:true,
    hints:[`Pensa en altres tipus de ${A(h)[0]}.`,`Per exemple, una paraula que comenci per «${list.filter(x=>!show.includes(x))[0][0].toUpperCase()}».`],
    steps:[`Altres hipònims de «${A(h)[0]}»: <b>${list.filter(x=>!show.includes(x)).slice(0,6).join(', ')}</b>...`],
    err:v=>show.some(x=>caSame(x,v[0]))?'ca_hiponim_repetit':null})}},

 ca_homonims:{mat:'catala',ab:'Hm',curs:[6],nom:'Homònims i polisèmia',
  teoria:['Les paraules <b>homònimes</b> s\'escriuen i es pronuncien igual però tenen significats diferents: <i>banc</i> (seient) i <i>banc</i> (dels doblers).',
   'Una paraula <b>polisèmica</b> té diversos significats relacionats: <i>ratolí</i> (l\'animal i l\'aparell de l\'ordinador, que s\'hi assembla).',
   'Les paraules <b>homòfones</b> sonen igual però s\'escriuen diferent: <b>ha</b> (verb) / <b>a</b> (preposició), <b>ho</b> (pronom) / <b>o</b> (conjunció), <b>hi</b> / <b>i</b>, <b>hem</b> / <b>em</b>, <b>cent</b> / <b>sent</b>.',
   'Truc per a la <b>h</b>: si ho pots posar en plural (ha → han, hi ha) o és «això» (ho sé), porta h.'],
  gen(lv){if(lv===0||Math.random()<.5){const[d1,d2,w]=pick(HOM);
    return caEx(`Quina paraula té aquests dos significats?<br>1. ${d1}<br>2. ${d2}`,A(w),{label:'Paraula',loose:true,
     hints:['És una sola paraula que serveix per a les dues coses.',`Comença per «${A(w)[0][0].toUpperCase()}».`],steps:[`La paraula és <b>${A(w)[0]}</b>: és un homònim (o una paraula polisèmica).`]})}
   const[f,a,b,ex]=pick(HOF);
   return caEx(`Completa amb <b>${[a,b].sort().join('</b> o <b>')}</b>:<br><i>${f}</i>`,[a],{label:'Paraula',
    hints:['Sonen igual, però una porta h (o s\'escriu amb c / s).','Ha, hem, hi i ho són verbs o pronoms; a, em, i, o són preposicions, conjuncions o pronoms.'],
    steps:[ex+'.',`La frase queda: <b>${caCap(f.replace('___',a))}</b>`],
    err:v=>v[0]===b?'ca_homofon':null})}},

 ca_manlleus:{mat:'catala',ab:'Ml',curs:[6],nom:'Manlleus i neologismes',
  teoria:['Els <b>manlleus</b> són paraules que agafam d\'altres llengües. Moltes s\'adapten a l\'ortografia catalana: <i>football → <b>futbol</b>, yogurt → <b>iogurt</b>, chat → <b>xat</b></i>.',
   'Si el català ja té una paraula per dir-ho, és millor fer-la servir: <i>email → <b>correu electrònic</b>, online → <b>en línia</b>, password → <b>contrasenya</b>, mouse → <b>ratolí</b></i>.',
   'Els <b>neologismes</b> són paraules noves que neixen per anomenar coses noves: <i>programari, tauleta (tàctil), xatejar, tuitejar, emoji</i>.'],
  gen(lv){const[w,c,t]=pick(MAN.filter(x=>lv>0||!x[3]));
   return caEx(t==='a'?`Escriu en català el manlleu «<b>${w}</b>», adaptat a la nostra ortografia.`:`Quina paraula catalana podem fer servir en lloc de «<b>${w}</b>»?`,A(c),{label:'En català',loose:true,
    hints:[t==='a'?'Escriu-la com sona, amb les lletres del català (x, tx, ix, i...).':'Pensa com ho diries en català.',`Comença per «${A(c)[0][0].toUpperCase()}».`],
    steps:[`«${w}» en català: <b>${A(c).join(' / ')}</b>.`],
    err:v=>v[0]===w&&!A(c).includes(w)?'ca_manlleu':null})}},

 ca_barbarismes:{mat:'catala',ab:'Bb',curs:[6],nom:'Barbarismes: paraules incorrectes',
  teoria:['Un <b>barbarisme</b> és una paraula o una expressió d\'una altra llengua (sovint del castellà) que fem servir en català quan no és correcta. En català tenim la nostra paraula!',
   `<table class="mini"><tr><th>Incorrecte</th><th>Correcte</th></tr><tr><td>bueno</td><td>bé, bo, doncs</td></tr><tr><td>vale</td><td>d'acord, entesos</td></tr><tr><td>tenedor</td><td>forquilla, forqueta</td></tr><tr><td>tinc que fer</td><td>he de fer</td></tr><tr><td>abuelos</td><td>avis, padrins</td></tr><tr><td>desde</td><td>des de</td></tr><tr><td>igual (plou)</td><td>potser</td></tr><tr><td>ojalà</td><td>tant de bo</td></tr><tr><td>pues</td><td>doncs, idò</td></tr><tr><td>enterar-se</td><td>assabentar-se</td></tr><tr><td>donar-se compte</td><td>adonar-se</td></tr></table>`,
   'A Mallorca diem <b>padrins</b>, <b>idò</b>, <b>granera</b>, <b>tassó</b>, <b>torcaboques</b>, <b>juguesca</b>: són paraules catalanes correctes!'],
  gen(lv){const[f,ok]=pick(BAR_OK.filter(x=>lv>0||!x[2])),w=caStar(f);
   return caEx(`La paraula destacada és un <b>barbarisme</b>. Escriu la forma correcta en català:<br><i>${caMark(f)}</i>`,A(ok),{label:'Forma correcta',loose:true,
    hints:['Pensa com ho diuen els teus padrins o com ho diu la mestra.','Mira la taula de barbarismes de la teoria.'],
    steps:[`«${w}» no és català.`,`Hem de dir: <b>${A(ok).join(' / ')}</b>.`,`<i>${f.replace(/\*(.+?)\*/,'<b>'+A(ok)[0]+'</b>')}</i>`],
    err:v=>caSame(v[0],w)?'ca_barbarisme':null})}},

 ca_derivacio:{mat:'catala',ab:'Dr',curs:[6],nom:'Formació de paraules: els sufixos',
  teoria:['Els <b>sufixos</b> s\'afegeixen al final d\'una paraula per formar-ne una de nova (una <b>paraula derivada</b>):',
   `<table class="mini"><tr><td><b>Noms</b></td><td>-itat, -esa, -ia, -dat, -or, -ció, -ment (qualitats i accions); -dor, -or, -ant, -er (persones); -eria (botigues)</td><td>felicitat, tristesa, explicació, nedador, llibreria</td></tr><tr><td><b>Adjectius</b></td><td>-ós, -ible, -able, -í, -enc, -at</td><td>perillós, llegible, mallorquí, eivissenc</td></tr><tr><td><b>Verbs</b></td><td>a-, en-, em-, es- + ... + -ar, -ir, -ejar</td><td>allargar, endolcir, embellir, netejar</td></tr><tr><td><b>Diminutius</b></td><td>-et, -eta, -ó</td><td>caseta, llibret</td></tr></table>`,
   'Compte amb l\'ortografia quan s\'afegeix el sufix: cree + ible → cre<b>ï</b>ble; curt → es<b>c</b>urçar.'],
  gen(lv){const typ=lv>0?['n','a','v','d']:['n','a','d'],k=pick(typ),[f,ok,suf]=pick(DER.filter(x=>x[3]===k)),ans=A(ok);
   return caEx(`Completa amb una paraula derivada:<br><i>${f}</i>`,ans,{label:'Paraula derivada',loose:true,
    hints:[`Fes servir el sufix «${suf}».`,`Comença per «${ans[0].slice(0,2)}».`],steps:[`Amb el sufix «${suf}»: <b>${ans.join(' / ')}</b>.`]})}},

 ca_compostos:{mat:'catala',ab:'Cm',curs:[6],nom:'Mots compostos i famílies de paraules',
  teoria:['Un <b>mot compost</b> està format per dues paraules: <i>renta + plats = <b>rentaplats</b></i>, <i>grata + cel = <b>gratacel</b></i>.',
   'Normalment s\'escriuen junts, però porten <b>guionet</b> quan la primera paraula acaba en vocal i la segona comença per <b>r, s</b> o <b>x</b>: <i><b>para-sol</b>, <b>gira-sol</b>, <b>penja-robes</b>, <b>escura-xemeneies</b></i>.',
   'Una <b>família de paraules</b> són totes les paraules que tenen la mateixa arrel: <i>mar → mariner, marí, marejol, submarí</i>. La paraula de la qual surten les altres és el <b>mot primitiu</b> (mar); les altres són <b>derivades</b>.'],
  gen(lv){const r=Math.random();
   if(r<.4){const[a,b,c]=pick(COMP.filter(x=>lv>0||!x[3]));
    return caEx(`Uneix les dues paraules i escriu el mot compost:<br><b>${a} + ${b}</b>`,[c],{label:'Mot compost',
     hints:['Normalment s\'escriuen junts.','Porta guionet si la primera acaba en vocal i la segona comença per r, s o x.'],
     steps:[c.includes('-')?`«${b}» comença per ${b[0]}: posam guionet perquè no canviï el so.`:c.includes(' ')?'«Bon dia» no és un mot compost: s\'escriu separat.':'S\'escriuen junts.',`Resultat: <b>${c}</b>.`],
     err:v=>v[0]!==c&&v[0].replace(/[- ]/g,'')===c.replace(/[- ]/g,'')?'ca_compost_guionet':null})}
   if(r<.7){const[root,fam]=pick(FAM),list=A(fam);
    return caEx(`Escriu una paraula de la <b>família</b> de «<b>${root}</b>».`,list,{label:'Paraula de la família',loose:true,
     hints:['Ha de tenir la mateixa arrel i un significat relacionat.',`Per exemple, una paraula que comenci per «${list[0].slice(0,3)}».`],
     steps:[`Paraules de la família de «${root}»: <b>${list.slice(0,6).join(', ')}</b>...`],
     err:v=>caSame(v[0],root)?'ca_familia_mateixa':null})}
   const[d,p]=pick(PRIM);
   return caEx(`Quin és el <b>mot primitiu</b> de «<b>${d}</b>»?`,A(p),{label:'Mot primitiu',loose:true,
    hints:['Treu-li el sufix (-eria, -er, -ista, -ada...).','És la paraula més senzilla de la família.'],steps:[`${d} ← <b>${A(p)[0]}</b>.`]})}},

 ca_frases_fetes:{mat:'catala',ab:'Ff',curs:[6],nom:'Frases fetes i refranys',
  teoria:['Les <b>frases fetes</b> són expressions que tenen un significat diferent del que diuen les paraules: <i>ploure a bots i barrals</i> vol dir «ploure molt».',
   'Els <b>refranys</b> són frases populars que donen un consell o un ensenyament: <i>Qui matina, fa farina</i>.',
   'Són part de la nostra cultura popular: els padrins en saben molts! Fer-los servir fa que parlem un català més ric.'],
  gen(lv){const ref=lv>0&&Math.random()<.5,[f,w,m]=pick(ref?REF:FF);
   return caEx(`Completa ${ref?'el refrany':'la frase feta'}:<br><b>${f}</b><br><span class="muted">Vol dir: ${m}.</span>`,[w],{label:'Paraula que hi falta',loose:true,
    hints:[ref?'Molts refranys rimen: busca una paraula que soni semblant.':'Pensa en com ho diuen els grans.',`Comença per «${w[0].toUpperCase()}».`],
    steps:[`<b>${f.replace('___',w)}</b>`,`Vol dir: ${m}.`]})}},

 ca_dialectes:{mat:'catala',ab:'Bl',curs:[6],nom:'Les varietats del català: el balear',
  teoria:['El català té diverses <b>varietats</b> o <b>dialectes</b>: el bloc <b>oriental</b> (central, <b>balear</b>, rossellonès i alguerès) i el bloc <b>occidental</b> (nord-occidental i valencià). Totes són la mateixa llengua i totes són correctes.',
   'El <b>balear</b> (mallorquí, menorquí i eivissenc) té trets propis: l\'<b>article salat</b> (<b>es</b> cotxe, <b>sa</b> platja, <b>ses</b> cases), l\'article personal (<b>en</b> Miquel, <b>na</b> Joana), el present <b>jo cant</b>, <b>nosaltres cantam</b>, <b>vosaltres cantau</b>, i paraules com <i>moix, ca, al·lot, idò, davall, granera, tassó, padrí</i>.',
   'Quan parlam, l\'article salat és molt nostre. Als textos formals (un examen, una redacció) feim servir l\'<b>article literari</b>: el, la, els, les.'],
  gen(lv){const r=Math.random();
   if(r<.4){const[b,c]=pick(BAL),rev=lv>0&&Math.random()<.5;
    return rev?caEx(`Com es diu en <b>balear</b> la paraula «<b>${A(c)[0]}</b>»?`,[b],{label:'En balear',loose:true,hints:['Pensa com ho diuen a Mallorca.',`Comença per «${b[0].toUpperCase()}».`],steps:[`«${A(c)[0]}» en balear és <b>${b}</b>.`]})
     :caEx(`La paraula «<b>${b}</b>» és balear. Com es diu en altres parlars (en català central)?`,A(c),{label:'En català central',loose:true,hints:['Pensa en una paraula que hagis sentit a la televisió o als llibres.',`Comença per «${A(c)[0][0].toUpperCase()}».`],steps:[`«${b}» = <b>${A(c).join(' / ')}</b>.`]})}
   if(r<.7){const[l,s]=pick(SAL);
    return caEx(`Escriu-ho amb l'<b>article salat</b> (com es diu a Mallorca):<br><b>${l}</b>`,[s],{label:'Amb article salat',
     hints:['El → es, la → sa, els → es, les → ses.','Davant vocal: s\'.'],steps:['Article salat: es, sa, es, ses (s\' davant vocal).',`<b>${s}</b>`],
     err:v=>s.startsWith("s'")&&[s.replace("s'",'sa '),s.replace("s'",'es ')].includes(v[0])?'ca_article_salat':null})}
   const vb=pick(BALV),st=vb.slice(0,-2),pi=pick([0,3,4]),std=[st+'o',,,(vb==='jugar'?'juguem':vb==='menjar'?'mengem':st+'em'),(vb==='jugar'?'jugueu':vb==='menjar'?'mengeu':st+'eu')][pi],bal=[st,,,st+'am',st+'au'][pi];
   return caEx(`Escriu la forma <b>balear</b> del present:<br><b>${['jo',,,'nosaltres','vosaltres'][pi]} ${std}</b>`,[bal],{label:'Forma balear',
    hints:['En balear, la primera persona del present no porta -o: jo cant.','Nosaltres i vosaltres: -am, -au (cantam, cantau).'],steps:[`${['jo',,,'nosaltres','vosaltres'][pi]} ${std} → <b>${bal}</b> (en balear).`]})}}
});

Object.assign(ERR,{
 ca_hiponim_repetit:{kid:'Aquesta paraula ja hi era! Pensa en una altra.',par:'Repeteix un dels exemples donats'},
 ca_homofon:{kid:'Sonen igual, però s\'escriuen diferent. Ha, hem, hi i ho porten h; a, em, i, o no.',par:'Confon homòfons (ha / a, ho / o, hi / i...)'},
 ca_manlleu:{kid:'Has escrit la paraula estrangera. Ara escriu-la en català!',par:'No adapta els manlleus al català'},
 ca_barbarisme:{kid:'Aquesta és precisament la paraula incorrecta. Com es diu en català?',par:'Fa servir barbarismes (paraules castellanes)'},
 ca_compost_guionet:{kid:'Les lletres són bones! Revisa el guionet: només si la segona paraula comença per r, s o x (i la primera acaba en vocal).',par:'Errors amb el guionet dels mots compostos'},
 ca_familia_mateixa:{kid:'Aquesta és la mateixa paraula. Busca\'n una altra de la família.',par:'Confon família de paraules'},
 ca_article_salat:{kid:'Gairebé! Davant vocal, l\'article salat s\'apostrofa: s\'arbre, s\'illa.',par:'Errors amb l\'article salat'}
});
})();
