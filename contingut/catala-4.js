/* Aprenem - LLENGUA CATALANA I LITERATURA de 4t de Primària
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Es carrega després de catala.js ... catala-unitats.js (fa servir caEx, caConj, CA_ORA, CA_ACC, CA_SIN, CA_ANT...)
   i afegeix les 11 unitats de 4t al final d'UNITS.catala (amb el tercer element [4]).
   Tots els temes d'aquest arxiu són de 4t (curs:[4]); els temes i les unitats de 5è-6è porten curs:[5,6].

   FONTS
   - Llibre de text que segueix l'escola: «Practica Llengua. Llengua catalana i literatura 4.1», projecte Comunitat Zoom,
     Vicens Vives (1a edició, 2023; ISBN 978-84-682-9264-9). Se'n segueix l'ordre i els continguts de l'índex (12 unitats,
     amb quatre apartats: «Com es diu?» vocabulari, «Com s'escriu? Com sona?» ortografia, «Fem frases» gramàtica i
     «Creo i escric» tipus de text). No se'n copia cap text ni cap exercici: tot el contingut d'aquest arxiu és original.
       1 Un aniversari diferent: diccionari, polisèmia; ordre alfabètic; subjecte i predicat, tipus de frases; text narratiu.
       2 Descobrim el parc: vocabulari del parc; majúscula, dígrafs; gènere i nombre, noms comuns i propis; text expositiu.
       3 Va de còmics: elements del còmic, sinònims; masculins i femenins, plurals; noms individuals i col·lectius, adjectiu.
       4 Mengem-nos el món!: cuina i aliments, primitives i derivades; h i l·l, essa sorda i sonora; article determinat;
         text instructiu.
       5 Llegendes del món: indumentària, sinonímia i antonímia; apòstrof (article i «de»); demostratius i possessius.
       6 Grans dones!: invents i descripció d'objectes; la coma i el punt; numerals cardinals i ordinals; text autobiogràfic.
       7 Recitem: arbres i flors, la metàfora; síl·laba tònica i àtona, agudes, planes i esdrúixoles; concordança; el poema.
       8 De la pedra al xip: vocabulari de l'escriptura; l'accentuació; els temps verbals; text expositiu.
       9 Anem d'estrena!: vocabulari del teatre, grau de formalitat; verbs en -ava, b i v; persona i nombre del verb.
      10 Animals bestials: paraules compostes; x, ix, tx, ig; pronoms personals forts i febles; text descriptiu.
      11 Fem esport: esports aquàtics, formació de verbs; la coma explicativa; els adverbis; la notícia.
      12 Pessigolles: projecte de revista escolar. NO s'hi fan exercicis (és un projecte de grup); els tipus de text del
         llibre es practiquen als temes «Tipus de textos» (U4), «El conte» (U1), «El poema» (U7) i «La notícia» (U11).
     El 4.1 cobreix tot el curs (12 unitats). Si l'escola fa servir també un 4.2 o un quadern d'ortografia, no hi és.
   - Decret 32/2022, d'1 d'agost, currículum d'Educació Primària de les Illes Balears (BOIB extr. núm. 101, 2-8-2022),
     àrea de Llengua Catalana i Literatura, sabers bàsics del 2n cicle (3r i 4t): ús del diccionari i ordre alfabètic;
     sinonímia, antonímia i polisèmia; derivació i composició; nom, adjectiu, determinants, pronoms personals, verb
     (persona, nombre, temps) i adverbi; concordança; subjecte i predicat; modalitats de l'oració; majúscules, dígrafs,
     accentuació, apòstrof, punt i coma; textos narratius, descriptius, expositius, instructius, teatrals, poètics i
     periodístics; registre formal i informal. Concreció de la Conselleria: https://www.caib.es/sites/lomloe/
   - Institut d'Estudis Catalans: Ortografia catalana (2016; guionet en compostos com gira-sol i para-sol, numerals),
     Gramàtica essencial (formes balears: jo cant, nosaltres cantam, vàrem, desset, devuit, denou...).
   Es respecta la variant balear correcta (cant / canto, cantam / cantem, desset / disset, engronsadora...). */

/* ---------- utilitats pròpies ---------- */
const c4Ini=a=>`La resposta comença per «${String(a)[0].toUpperCase()}».`;
const c4Alts=s=>s.split('|');
const c4Steps=a=>a.filter(Boolean);
const c4Shuf=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
const c4Sample=(a,n)=>c4Shuf(a).slice(0,n);
const c4Lc=s=>s.toLowerCase().replace(/[.,!?;:«»¿¡]/g,'').replace(/\s+/g,' ').trim();
const c4Art=(g,n,w)=>n==='p'?(g==='m'?'els':'les'):(/^h?[aeiouàèéíòóú]/i.test(w)?"l'":(g==='m'?'el':'la'));
const c4ArtW=(g,n,w)=>{const a=c4Art(g,n,w);return a==="l'"?a+w:a+' '+w};

/* ---------- vocabulari (definicions: «Com es diu?») ---------- */
// [definició, respostes acceptades separades per |]
function c4Vocab(bank,pista){return function(){const[d,a]=pick(bank),A=c4Alts(a);
 return caEx(`Com es diu?<br><i>${d}</i>`,A,{label:'Paraula',loose:true,hints:[pista,c4Ini(A[0])],
  steps:c4Steps([`${d}: <b>${A[0]}</b>.`,A.length>1?`També es pot dir: ${A.slice(1).join(', ')}.`:''])})}}
const C4_V_PARC=[['Seient llarg del parc on ens podem asseure','banc'],['Ocell petit i marronós que viu a les ciutats i als parcs','pardal|teuladí'],
 ['Animal petit de cua peluda que puja als arbres i menja pinyons','esquirol'],['Part de la planta que és davall terra i xucla l\'aigua','arrel|arrels'],
 ['Part verda i prima de la planta que capta la llum del sol','fulla|fulles'],['Font on l\'aigua surt cap amunt i torna a caure','sortidor|brollador'],
 ['Persona que cuida les plantes d\'un parc o d\'un jardí','jardiner|jardinera'],['Herba curta i verda que cobreix el terra d\'un jardí','gespa'],
 ['Insecte de colors que vola de flor en flor','papallona'],['Insecte que fa la mel','abella'],['Flor que regalam per Sant Jordi, amb espines a la tija','rosa'],
 ['Flor grossa i groga que gira cap al sol','gira-sol|girasol'],['Animal lent que porta la closca a l\'esquena','caragol'],
 ['Seient penjat amb cordes que va endavant i endarrere','gronxador|gronxadora|engronsadora|engronsador'],
 ['Cada una de les fulles de colors que formen una flor','pètal|pètals'],['Bassa gran d\'aigua del parc on neden els ànecs','estany|llac|bassa']];
const C4_V_COMIC=[['Cada un dels quadres on es dibuixa una escena d\'un còmic','vinyeta|vinyetes'],['Globus on s\'escriu el que diuen els personatges','bafarada|globus'],
 ['Requadre on el narrador explica on o quan passa l\'acció','cartutx|cartel·la'],['Paraula que imita un so, com «crac» o «patapum»','onomatopeia|onomatopeies'],
 ['Ratlles que es dibuixen per mostrar que un personatge es mou','línies cinètiques|línies de moviment'],['Persona que dibuixa còmics','dibuixant|il·lustrador|il·lustradora'],
 ['Personatge principal d\'una història','protagonista'],['Bafarada en forma de núvol que mostra el que pensa un personatge','bafarada de pensament|globus de pensament|pensament'],
 ['Còmic llarg, amb una història completa, que s\'edita com un llibre','novel·la gràfica|àlbum']];
const C4_V_CUINA=[['Aparell que conserva fred el menjar','nevera|frigorífic'],['Aparell que escalfa el menjar molt de pressa','microones'],
 ['Estri rodó amb mànec llarg per fregir ous','paella|sartana'],['Text que explica com es prepara un plat','recepta'],['Persona que cuina en un restaurant','cuiner|cuinera|xef'],
 ['Fruita groga i llarga que s\'ha de pelar','plàtan|banana'],['Aliment blanc que donen les vaques','llet'],['Aliment que ponen les gallines','ou|ous'],
 ['Embotit vermell de Mallorca que es pot untar al pa','sobrassada'],['Pasta dolça en forma d\'espiral, típica de Mallorca','ensaïmada'],
 ['Cuinar un aliment dins oli molt calent','fregir'],['Tallar un aliment a trossos molt petits','picar|trinxar'],['Estri amb puntes per agafar el menjar','forquilla|forqueta'],
 ['Recipient fondo on es fa bullir la sopa','olla|cassola']];
const C4_V_ROBA=[['Peça de roba que es posa al coll quan fa fred','bufanda'],['Calçat obert que es duu a l\'estiu','sandàlies|sandàlia|espardenyes|espardenya'],
 ['Peça que cobreix el cap i té visera','gorra'],['Roba que ens posam per dormir','pijama'],['Peces que es posen a les mans quan fa fred','guants|guant'],
 ['Peça d\'abric que no deixa passar l\'aigua de la pluja','impermeable|gavardina'],['Part d\'una peça de roba que cobreix el braç','màniga|mànigues'],
 ['Peça de roba que penja de la cintura i no té camals','faldilla|falda'],['Peça que ens posam per no tacar la roba quan cuinam','davantal'],
 ['Tira de cuir que aguanta els pantalons','cinturó|corretja'],['Calçat alt que cobreix el turmell','botes|bota'],
 ['Peça sense mànigues que es posa damunt les espatlles, com la dels superherois','capa'],['Peça de roba amb botons, coll i mànigues','camisa']];
const C4_V_INVENTS=[['Aparell per parlar amb una persona que és lluny','telèfon|mòbil'],['Vehicle de dues rodes que es mou pedalant','bicicleta'],
 ['Objecte de vidre que fa llum quan hi passa el corrent','bombeta'],['Aparell per veure les estrelles i els planetes de prop','telescopi'],
 ['Aparell que fa veure grosses les coses molt petites','microscopi'],['Aparell que fa fotografies','càmera|càmera de fotos'],
 ['Vehicle amb ales i motors que vola','avió'],['Objecte amb una agulla que sempre assenyala el nord','brúixola'],['Persona que inventa coses noves','inventor|inventora'],
 ['Màquina que renta la roba','rentadora'],['Objecte que marca les hores','rellotge'],['Aparell amb pantalla i teclat per escriure, buscar informació i jugar','ordinador']];
const C4_V_ARBRES=[['Arbre que fa ametles','ametller|ametler'],['Arbre que fa olives','olivera|oliver'],['Arbre que fa garroves','garrover|garrofer'],
 ['Arbre que fa taronges','taronger'],['Arbre que fa figues','figuera'],['Arbre de fulla sempre verda que fa pinyes','pi'],['Arbre que fa aglans','alzina|roure'],
 ['Arbre que fa castanyes','castanyer'],['Flor de pètals blancs i centre groc','margarida'],['Planta de flors morades i molt bona olor','lavanda|espígol'],
 ['Flor vermella que surt als sembrats a la primavera','rosella|gallaret'],['Part dura de l\'arbre que surt de terra i aguanta les branques','tronc'],
 ['Arbre que fa pomes','pomera'],['Conjunt de flors lligades','ram|pom|pomell']];
const C4_V_ESCRIURE=[['Instrument per escriure que s\'esborra amb goma','llapis'],['Instrument per escriure amb tinta','bolígraf|ploma'],
 ['Material fet amb una planta del riu Nil, on escrivien els egipcis','papir'],['Escriptura antiga dels egipcis, feta amb dibuixos','jeroglífics|jeroglífic'],
 ['Màquina que va servir per imprimir molts de llibres iguals','impremta'],['Conjunt de totes les lletres d\'una llengua, en ordre','alfabet|abecedari'],
 ['Pell d\'animal preparada per escriure-hi a l\'edat mitjana','pergamí'],['Líquid de color que fan servir les plomes','tinta'],
 ['Persona que escriu llibres','escriptor|escriptora|autor|autora'],['Lloc on hi ha molts de llibres per llegir o endur-se\'n en préstec','biblioteca'],
 ['Persona que a l\'edat mitjana copiava els llibres a mà','copista|monjo copista|escrivà'],['Aparell amb tecles i pantalla que fem servir per escriure','ordinador']];
const C4_V_TEATRE=[['Lloc elevat on actuen els actors','escenari'],['Tela gran que s\'obre i es tanca davant l\'escenari','teló'],
 ['Persona que fa un paper en una obra de teatre','actor|actriu'],['Notes entre parèntesis que expliquen què fan els personatges','acotacions|acotació'],
 ['Persones que miren l\'obra','públic|espectadors'],['Roba especial que porten els actors','vestuari|disfressa|disfresses'],
 ['Persona que dirigeix els actors','director|directora'],['Cada una de les parts en què es divideix una obra de teatre','acte|actes|escena|escenes'],
 ['Picar de mans per dir que una cosa ens ha agradat','aplaudir'],['Pintures i objectes que hi ha al fons de l\'escenari','decorat|decorats'],
 ['Conversa entre dos o més personatges','diàleg']];
const C4_V_ESPORT=[['Esport que es fa damunt una taula, aprofitant les ones','surf'],['Esport de pilota que es juga dins una piscina','waterpolo'],
 ['Persona que vigila la platja i ajuda els banyistes','socorrista'],['Barca estreta que es mou amb un rem','caiac|piragua'],['Pal pla per moure una barca','rem'],
 ['Calçat de goma per nedar més de pressa','aletes|aleta'],['Esport de baixar al fons de la mar amb bombona','submarinisme|busseig'],
 ['Barca que es mou gràcies al vent','veler|vela'],['Estil de natació boca avall, movent els braços un darrere l\'altre','crol'],['Lloc amb aigua per nedar','piscina'],
 ['Peça de roba per banyar-se','banyador|vestit de bany'],['Cursa de barques de vela','regata']];

/* ---------- dades ---------- */
// ordre alfabètic
const C4_ALF0=['abella','barca','cadira','dofí','escola','formiga','gat','hora','illa','jardí','lluna','mar','nina','ocell','pera','quadern','rosa','sol','taula','ull','vaca','xai','zebra'];
const C4_ALF1=[['casa','cel','cine','cotxe','cuina','clau','crispeta'],['pa','peix','pi','pont','pluja','prat','puma'],['mare','mel','mico','moto','mussol'],['taronja','tela','tigre','tomàquet','tren','tub'],['balena','bé','bicicleta','bosc','bruixa','bufanda']];
const C4_ALF2=[['cabra','cadira','cafè','calaix','camí','canya','capsa','carro','casa','cavall'],['pala','paper','paraigua','pastís','patata','pallasso'],['mag','mans','mapa','mar','mató'],['bala','barca','bastó','bateria','bany']];
// diccionari: [forma, entrada, explicació]
const C4_DIC=[['cases','casa','nom: es busca en singular'],['cantava','cantar','verb: es busca en infinitiu'],['petites','petit','adjectiu: es busca en masculí i singular'],
 ['gossos','gos','nom: es busca en singular'],['menjarem','menjar','verb: es busca en infinitiu'],['blanques','blanc','adjectiu: es busca en masculí i singular'],
 ['llibres','llibre','nom: es busca en singular'],['dormien','dormir','verb: es busca en infinitiu'],['bonica','bonic','adjectiu: es busca en masculí i singular'],
 ['flors','flor','nom: es busca en singular'],['escriu','escriure','verb: es busca en infinitiu'],['vermelles','vermell','adjectiu: es busca en masculí i singular'],
 ['llegíem','llegir','verb: es busca en infinitiu'],['altes','alt','adjectiu: es busca en masculí i singular'],['peixos','peix','nom: es busca en singular'],
 ['cantaré','cantar','verb: es busca en infinitiu'],['ballaven','ballar','verb: es busca en infinitiu'],['grogues','groc','adjectiu: es busca en masculí i singular']];
// polisèmia: [paraula, frase 1, frase 2]
const C4_POLI=[['fulla','La ___ de l\'arbre ha caigut.','Escriu el teu nom a la ___ de paper.'],['pota','El gos s\'ha fet mal a una ___.','Una ___ de la taula està trencada.'],
 ['banc','Ens vam asseure en un ___ del parc.','La mare ha anat al ___ a treure doblers.'],['ratolí','El moix empaita un ___.','Mou el ___ per fer clic a la pantalla.'],
 ['llengua','El metge em va mirar la ___.','El català és la nostra ___.'],['planta','He regat la ___ del balcó.','Visc a la tercera ___ de l\'edifici.'],
 ['clau','No trob la ___ de casa.','Al pentagrama hi ha la ___ de sol.'],['estrella','Al cel brilla una ___.','A la platja hem vist una ___ de mar.'],
 ['botó','S\'ha descosit un ___ de la camisa.','Pitja el ___ de l\'ascensor.'],['cua','El cavall mou la ___.','Hi havia una ___ molt llarga per entrar al cinema.'],
 ['bateria','El mòbil s\'ha quedat sense ___.','En Jordi toca la ___ en un grup de música.'],['ull','Tinc una pestanya dins un ___.','Passa el fil per l\'___ de l\'agulla.']];
// subjecte: [oració, subjecte, verb, invertida]
const C4_SUBJ=[['La Marta llegeix un conte.','la marta','llegeix'],['El gos borda molt fort.','el gos','borda'],['Els nens juguen al pati.','els nens','juguen'],
 ['La meva mare cuina una paella.','la meva mare','cuina'],['Els ocells canten a l\'arbre.','els ocells','canten'],['En Biel menja una poma.','en biel','menja'],
 ['El tren arriba a les deu.','el tren','arriba'],['Les flors del jardí són precioses.','les flors del jardí','són'],['La mestra explica un problema.','la mestra','explica'],
 ['El meu germà petit dorm.','el meu germà petit','dorm'],['Els padrins viuen a Manacor.','els padrins','viuen'],['La gata beu llet.','la gata','beu'],
 ['Nosaltres anam d\'excursió.','nosaltres','anam'],['Tu escrius molt bé.','tu','escrius'],['El sol escalfa la terra.','el sol','escalfa'],
 ['Les cabres pugen a la muntanya.','les cabres','pugen'],['La pluja mulla els carrers.','la pluja','mulla'],
 ['Al bosc viuen molts animals.','molts animals','viuen',1],['Demà vindran els cosins.','els cosins','vindran',1],['A la plaça juguen uns infants.','uns infants','juguen',1],
 ['Per la finestra entra el sol.','el sol','entra',1],['A l\'estiu arriben molts turistes.','molts turistes','arriben',1]];
// narració: protagonistes, llocs, temps, nus i desenllaç
const C4_PROTA=[['la Laia','f'],['en Biel','m'],['la Maria','f'],['en Toni','m'],['l\'Aina','f'],['en Pau','m'],['la Xisca','f'],['en Jaume','m']];
const C4_LLOC=[['a la platja','la platja|platja'],['al bosc','el bosc|bosc'],['a la plaça del poble','la plaça del poble|plaça del poble|la plaça|plaça'],['al parc','el parc|parc'],
 ['a casa de la padrina','casa de la padrina|a casa de la seva padrina|la casa de la padrina'],['al museu','el museu|museu'],['al port','el port|port'],['a la fira','la fira|fira']];
const C4_QUAN=[['un dissabte al matí','dissabte al matí|dissabte|un dissabte'],['el dia del seu aniversari','dia del seu aniversari|el seu aniversari|aniversari|el dia de l\'aniversari'],
 ['una tarda de pluja','tarda de pluja|una tarda'],['la nit de Sant Joan','nit de sant joan|sant joan'],['un diumenge d\'estiu','diumenge d\'estiu|diumenge|un diumenge']];
const C4_NUS=[['va perdre el seu ca, en Floc, entre la gent','al cap d\'una estona el va trobar adormit davall un banc'],
 ['va veure que el pastís havia caigut a terra','entre tots en varen fer un de nou amb maduixes'],['se li va trencar el fil de l\'estel','un senyor molt amable l\'ajudà a lligar-lo de nou'],
 ['va trobar una capsa tancada amb un cadenat','va descobrir que la clau era amagada dins una sabata vella'],['es va adonar que havia perdut la clau de casa','la va trobar dins la butxaca de la jaqueta'],
 ['va veure un moixet que no podia baixar d\'un arbre','li va parar els braços i el moixet hi va saltar']];
// noms comuns i propis: [oració, propis, comuns]
const C4_CP=[['La Marta passeja el gos pel parc.',['marta'],['gos','parc']],['En Joan viu a Sóller amb els seus padrins.',['joan','sóller'],['padrins']],
 ['La gata Mixa dorm damunt el sofà.',['mixa'],['gata','sofà']],['A Menorca hi ha moltes platges boniques.',['menorca'],['platges']],
 ['La meva cosina Aina toca la guitarra.',['aina'],['cosina','guitarra']],['El vaixell va sortir del port d\'Alcúdia.',['alcúdia'],['vaixell','port']],
 ['En Pep ha comprat pa i formatge.',['pep'],['pa','formatge']],['La mestra Rosa ens llegeix un conte.',['rosa'],['mestra','conte']],
 ['El ca d\'en Toni es diu Floc.',['toni','floc'],['ca']],['A Eivissa vam veure un far molt alt.',['eivissa'],['far']],
 ['La Laura i el seu germà juguen a la plaça.',['laura'],['germà','plaça']],['El riu Ebre passa per Tortosa.',['ebre','tortosa'],['riu']]];
// majúscules
const C4_MAJ_LLOC=['palma','sóller','manacor','eivissa','menorca','alcúdia','inca','ciutadella','barcelona','maó'];
const C4_MAJ_NOM=['marta','biel','joan','aina','toni','neus','xisca','pere'];
const C4_DIES=['dilluns','dimarts','dimecres','dijous','divendres','dissabte','diumenge'];
const C4_MESOS=['gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre'];
// dígrafs: [paraula, dígrafs]
const C4_DIG=[['cavall','ll'],['muntanya','ny'],['carro','rr'],['massa','ss'],['maig','ig'],['cotxe','tx'],['quilo','qu'],['guitarra','gu rr'],['caixa','ix'],
 ['metge','tg'],['platja','tj'],['pallasso','ll ss'],['canya','ny'],['formiga',''],['paraigua',''],['aquest','qu'],['guerra','gu rr'],['ninot',''],
 ['rellotge','ll tg'],['peix','ix'],['boig','ig'],['quatre',''],['cigonya','ny'],['terra','rr'],['passeig','ss ig'],['xocolata',''],['pilota',''],['gallina','ll']];
// gènere i nombre: [paraula, gènere, nombre]
const C4_GN=[['taules','f','p'],['gat','m','s'],['flors','f','p'],['llibre','m','s'],['cadira','f','s'],['arbres','m','p'],['nenes','f','p'],['ocell','m','s'],
 ['mans','f','p'],['ulls','m','p'],['platja','f','s'],['cotxes','m','p'],['finestra','f','s'],['pilotes','f','p'],['peix','m','s'],['dits','m','p'],
 ['cançó','f','s'],['braços','m','p'],['nit','f','s'],['dent','f','s'],['dents','f','p'],['llet','f','s'],['camions','m','p'],['muntanya','f','s']];
const C4_GN_FORM=[['gat','gata','f'],['nen','nena','f'],['mestre','mestra','f'],['alt','alta','f'],['petit','petita','f'],['veí','veïna','f',1],['cosí','cosina','f',1],
 ['flor','flors','p'],['casa','cases','p'],['cadira','cadires','p'],['cotxe','cotxes','p'],['arbre','arbres','p'],['taula','taules','p'],['pilota','pilotes','p'],
 ['mà','mans','p',1],['camió','camions','p',1],['avió','avions','p',1],['pi','pins','p',1],['cançó','cançons','p',1]];
// plurals i femenins amb canvis d'ortografia
const C4_PL=[['vaca','vaques'],['amiga','amigues'],['plaça','places'],['platja','platges'],['llengua','llengües'],['pas','passos'],['nas','nassos'],['gos','gossos'],
 ['mes','mesos'],['francès','francesos'],['peix','peixos'],['calaix','calaixos'],['lluç','lluços'],['braç','braços'],['boca','boques'],['formiga','formigues'],
 ['pluja','pluges'],['taronja','taronges'],['peça','peces'],['aigua','aigües'],['llapis','llapis'],['dimarts','dimarts'],['raig','raigs'],['passeig','passeigs|passejos']];
const C4_FEM=[['amic','amiga'],['boig','boja'],['lleig','lletja'],['nebot','neboda'],['llop','lloba'],['cuiner','cuinera'],['actor','actriu'],['rei','reina'],
 ['gall','gallina'],['alumne','alumna'],['blau','blava'],['nou','nova'],['groc','groga'],['antic','antiga'],['fluix','fluixa'],['metge','metgessa'],
 ['poeta','poetessa'],['mut','muda'],['pagès','pagesa'],['francès','francesa'],['cavall','euga',1],['home','dona',1],['boc','cabra',1],['gendre','nora',1]];
// individuals i col·lectius: [individual (plural), col·lectiu]
const C4_COL=[['ovelles','ramat'],['arbres','bosc'],['abelles','eixam'],['peixos','banc'],['músics','orquestra|banda'],['jugadors','equip'],['estrelles','constel·lació'],
 ['soldats','exèrcit'],['illes','arxipèlag'],['llops','llopada'],['vaixells','flota'],['cantants','cor|coral'],['muntanyes','serralada'],['lletres','alfabet|abecedari'],
 ['persones','gent|multitud'],['alumnes','classe|alumnat'],['ocells','esbart|bandada'],['cabres','ramat'],['raïms','raïmada']];
// adjectius: [oració amb *adjectiu*]
const C4_ADJ=['El gos *petit* borda.','La mar està *tranquil·la*.','Duc una motxilla *nova*.','Les maduixes són *dolces*.','Tenc un moix *gris*.','Aquell edifici és molt *alt*.',
 'La sopa està *calenta*.','Els meus padrins són molt *simpàtics*.','Vull la pilota *vermella*.','Hem vist una pel·lícula *divertida*.','El riu és *llarg*.',
 'La pell de l\'elefant és *rugosa*.','Avui fa un dia *assolellat*.','Aquesta cadira és *còmoda*.','El llibre és *interessant*.','Els carrers estan *bruts*.',
 'La meva germana és *valenta*.','Hi ha un núvol *negre*.','Aquell pa és *dur*.','Les flors *grogues* fan bona olor.'];
// primitives i derivades: [primitiva, derivades]
const C4_DER=[['pastís','pastisseria|pastisser|pastissera|pastisset'],['sabata','sabater|sabatera|sabateria|sabateta'],['fruita','fruiteria|fruiter|fruitera'],
 ['peix','peixater|peixatera|peixateria|peixet'],['llibre','llibreria|llibreter|llibreta'],['pa','panet|panera|paneret|panificadora'],['forn','forner|fornera|fornet'],
 ['carn','carnisseria|carnisser|carnissera'],['llet','lleter|lletera|lleteria|lletós'],['gelat','gelateria|gelater|gelatera'],['taronja','taronger|taronjada|taronjat'],
 ['poma','pomera|pometa'],['sal','salat|salar|saler|salera'],['sucre','sucrera|sucrós|ensucrar'],['cuina','cuiner|cuinera|cuinar|cuineta'],['flor','floristeria|florista|floreta|florir|floret']];
// paraules amb buit: [paraula, amb buit, opcions, clau de la norma]
const C4_HL=[['hivern','_ivern','h o res','h'],['hora','_ora','h o res','h'],['home','_ome','h o res','h'],['herba','_erba','h o res','h'],['hort','_ort','h o res','h'],
 ['ahir','a_ir','h o res','h'],['història','_istòria','h o res','h'],['humit','_umit','h o res','h'],['hospital','_ospital','h o res','h'],['ou','_ou','h o res','h0'],
 ['orella','_orella','h o res','h0'],['ull','_ull','h o res','h0'],['ombra','_ombra','h o res','h0'],['ametla','_ametla','h o res','h0'],['ase','_ase','h o res','h0'],
 ['col·legi','co_egi','l / ll / l·l','lg'],['il·lusió','i_usió','l / ll / l·l','lg'],['pel·lícula','pe_ícula','l / ll / l·l','lg'],['novel·la','nove_a','l / ll / l·l','lg'],
 ['tranquil·la','tranqui_a','l / ll / l·l','lg'],['col·lecció','co_ecció','l / ll / l·l','lg'],['il·lustració','i_ustració','l / ll / l·l','lg'],
 ['cavall','cava_','l / ll / l·l','ll'],['ballar','ba_ar','l / ll / l·l','ll'],['pell','pe_','l / ll / l·l','ll'],['calor','ca_or','l / ll / l·l','l'],['pala','pa_a','l / ll / l·l','l']];
const C4_HL_N={h:'Aquesta paraula porta una <b>h</b> que no sona. No hi ha cap truc per sentir-la: cal recordar-la (i les paraules de la mateixa família també la porten: hivern, hivernal).',
 h0:'Aquesta paraula <b>no</b> porta h. Recorda que la h no sona mai: s\'ha d\'aprendre quines paraules la duen.',
 lg:'Quan sentim dues eles separades (col-legi), s\'escriu <b>l·l</b>, amb punt volat: col·legi, il·lusió.',ll:'Sona com la <b>ll</b> de «lluna»: s\'escriu <b>ll</b>.',l:'Sona una sola ela suau: s\'escriu <b>l</b>.'};
const C4_ESSA=[['casa','ca_a','s / ss','s'],['rosa','ro_a','s / ss','s'],['massa','ma_a','s / ss','ss'],['tassa','ta_a','s / ss','ss'],['cosí','co_í','s / ss','s'],
 ['cassola','ca_ola','s / ss','ss'],['pèsol','pè_ol','s / ss','s'],['gossa','go_a','s / ss','ss'],['camisa','cami_a','s / ss','s'],['passeig','pa_eig','s / ss','ss'],
 ['mussol','mu_ol','s / ss','ss'],['música','mú_ica','s / ss','s'],['zero','_ero','s / z','z'],['onze','on_e','s / z','z'],['dotze','dot_e','s / z','z'],['zebra','_ebra','s / z','z'],
 ['plaça','pla_a','c / ç / s','ç'],['cançó','can_ó','c / ç / s','ç'],['braç','bra_','c / ç / s','ç'],['cel','_el','c / s','c'],['cinema','_inema','c / s','c'],['peça','pe_a','c / ç / ss','ç']];
const C4_ESSA_N={s:'Entre dues vocals, una sola <b>s</b> sona suau, com una abella que brunzeix (essa sonora): casa, rosa.',ss:'Entre dues vocals, si sona forta (essa sorda), s\'escriu <b>ss</b>: massa, tassa.',
 z:'A principi de paraula o darrere consonant, el so suau (sonor) s\'escriu <b>z</b>: zero, onze.',ç:'El so fort davant a, o, u, o a final de paraula, s\'escriu sovint <b>ç</b>: plaça, cançó, braç.',
 c:'Davant e i i, el so fort s\'escriu <b>c</b>: cel, cinema.'};
const C4_XIX=[['caixa','ca_a','x / ix / tx','ix'],['peix','pe_','x / ix / ig','ix'],['cotxe','co_e','x / ix / tx','tx'],['xocolata','_ocolata','x / ix / tx','x0'],
 ['maig','ma_','ix / tx / ig','ig'],['roig','ro_','ix / tx / ig','ig'],['guix','gu_','x / ix','xi'],['bruixa','bru_a','x / ix / tx','ix'],['despatx','despa_','ix / tx / ig','tx'],
 ['faig','fa_','ix / tx / ig','ig'],['punxa','pun_a','x / ix','xc'],['panxa','pan_a','x / ix','xc'],['xai','_ai','x / ix','x0'],['calaix','cala_','x / ix / ig','ix'],
 ['fletxa','fle_a','x / ix / tx','tx'],['butxaca','bu_aca','x / ix / tx','tx'],['raig','ra_','ix / tx / ig','ig'],['coixí','co_í','x / ix / tx','ix'],['xiulet','_iulet','x / ix','x0'],
 ['marxar','mar_ar','x / ix','xc']];
const C4_XIX_N={ix:'Darrere les vocals a, e, o, u, el so «x» s\'escriu <b>ix</b>: caixa, peix.',x0:'A principi de paraula s\'escriu <b>x</b>: xocolata, xai.',
 xc:'Darrere consonant s\'escriu <b>x</b>: punxa, marxar.',xi:'Darrere la vocal i s\'escriu <b>x</b> (la i ja hi és): guix.',
 tx:'El so «txa» enmig o a final de paraula s\'escriu sovint <b>tx</b>: cotxe, despatx.',ig:'A final de paraula, darrere vocal, el so «txa» s\'escriu sovint <b>ig</b>: maig, roig.'};
const C4_BV=[['cavall','ca_all'],['llibre','lli_re'],['saber','sa_er'],['viure','_iure'],['bufanda','_ufanda'],['vaixell','_aixell'],['rebre','re_re'],['nevera','ne_era'],
 ['bolígraf','_olígraf'],['vaca','_aca'],['avi','a_i'],['bombolla','_ombolla'],['verd','_erd'],['blau','_lau'],['moviment','mo_iment'],['govern','go_ern'],['treball','tre_all'],
 ['avió','a_ió'],['bressol','_ressol'],['canviar','can_iar'],['convidar','con_idar'],['ambulància','am_ulància'],['bufar','_ufar'],['vent','_ent']];
// article: [nom, gènere, nombre]
const C4_ART=[['plat','m','s'],['forquilla','f','s'],['gots','m','p'],['culleres','f','p'],['forn','m','s'],['nevera','f','s'],['pebrots','m','p'],['taronja','f','s'],
 ['sucre','m','s'],['farina','f','s'],['tomàquets','m','p'],['pomes','f','p'],['ametles','f','p'],['ous','m','p'],
 ['olla','f','s',1],['oli','m','s',1],['ou','m','s',1],['herba','f','s',1],['aigua','f','s',1],['arròs','m','s',1],['enciam','m','s',1],['hamburguesa','f','s',1],['ensaïmada','f','s',1]];
// apòstrof: [nom, gènere, 1 = femení amb i/u àtones (no s'apostrofa)]
const C4_APO=[['arbre','m'],['home','m'],['avi','m'],['ocell','m'],['estiu','m'],['amic','m'],['hospital','m'],['àvia','f'],['escola','f'],['hora','f'],['illa','f'],['amiga','f'],['ombra','f'],
 ['pare','m'],['gat','m'],['mare','f'],['casa','f'],['platja','f'],['universitat','f',1],['idea','f',1],['història','f',1],['unitat','f',1],['humitat','f',1]];
const C4_APO_DE=[['aigua',1],['oli',1],['Anna',1],['Eivissa',1],['hivern',1],['or',1],['estiu',1],['pa',0],['Marta',0],['llet',0],['formatge',0],['Menorca',0],['xocolata',0]];
// noms per a demostratius, possessius i concordança: [nom, gènere, nombre]
const C4_NOMS=[['llibre','m','s'],['cadira','f','s'],['sabates','f','p'],['ocells','m','p'],['motxilla','f','s'],['quadern','m','s'],['flors','f','p'],['llapis','m','p'],
 ['casa','f','s'],['cotxe','m','s'],['pilotes','f','p'],['gats','m','p'],['bicicleta','f','s'],['jaquetes','f','p'],['dibuixos','m','p'],['jardí','m','s']];
const C4_DEM={a:{ms:'aquest',fs:'aquesta',mp:'aquests',fp:'aquestes'},l:{ms:'aquell',fs:'aquella',mp:'aquells',fp:'aquelles'}};
const C4_POSS=[['jo',{ms:'meu',fs:'meva|meua',mp:'meus',fp:'meves|meues'}],['tu',{ms:'teu',fs:'teva|teua',mp:'teus',fp:'teves|teues'}],['ell',{ms:'seu',fs:'seva|seua',mp:'seus',fp:'seves|seues'}],
 ['ella',{ms:'seu',fs:'seva|seua',mp:'seus',fp:'seves|seues'}],['nosaltres',{ms:'nostre',fs:'nostra',mp:'nostres',fp:'nostres'}],['vosaltres',{ms:'vostre',fs:'vostra',mp:'vostres',fp:'vostres'}]];
const C4_DE_PRON={jo:'de mi',tu:'de tu',ell:'d\'ell',ella:'d\'ella',nosaltres:'de nosaltres',vosaltres:'de vosaltres'};
// adjectius: [m s, f s, m p, f p]
const C4_ADJF=[['vermell','vermella','vermells','vermelles'],['blanc','blanca','blancs','blanques'],['groc','groga','grocs','grogues'],['alt','alta','alts','altes'],
 ['bonic','bonica','bonics','boniques'],['petit','petita','petits','petites'],['gros','grossa','grossos','grosses'],['verd','verda','verds','verdes'],['blau','blava','blaus','blaves'],
 ['nou','nova','nous','noves'],['llarg','llarga','llargs','llargues'],['feliç','feliç','feliços','feliços'],['gran','gran','grans','grans'],['dolç','dolça','dolços','dolces'],['antic','antiga','antics','antigues']];
const C4_CONC_N=[['rosa','f','s'],['roses','f','p'],['arbre','m','s'],['arbres','m','p'],['fulla','f','s'],['fulles','f','p'],['pi','m','s'],['pins','m','p'],['flor','f','s'],['flors','f','p'],
 ['jardí','m','s'],['jardins','m','p'],['taronja','f','s'],['taronges','f','p'],['gerro','m','s'],['gerros','m','p']];
// numerals
const C4_U=['zero','u','dos','tres','quatre','cinc','sis','set','vuit','nou','deu','onze','dotze','tretze','catorze','quinze','setze','disset','divuit','dinou','vint'];
const C4_UALT={1:['u','un'],2:['dos','dues'],17:['disset','desset'],18:['divuit','devuit'],19:['dinou','denou']};
const C4_DES=['','','vint','trenta','quaranta','cinquanta','seixanta','setanta','vuitanta','noranta'];
// Escriu un nombre en lletres: torna totes les formes acceptades (la primera és la de referència)
function c4Lletres(n){const uv=k=>C4_UALT[k]||[C4_U[k]];
 if(n<=20)return uv(n);
 if(n<100){const d=Math.floor(n/10),u=n%10;if(!u)return[C4_DES[d]];return uv(u).map(x=>C4_DES[d]+(d===2?'-i-':'-')+x)}
 const c=Math.floor(n/100),r=n%100,h=c===1?'cent':C4_U[c]+'-cents';if(!r)return[h];return c4Lletres(r).map(x=>h+' '+x)}
const C4_ORDB=[null,['primer','primera','r','a'],['segon','segona','n','a'],['tercer','tercera','r','a'],['quart','quarta','t','a']];
const C4_ORDR={5:'cinqu',6:'sis',7:'set',8:'vuit',9:'nov',10:'des',11:'onz',12:'dotz',13:'tretz',14:'catorz',15:'quinz',16:'setz',17:'disset|desset',18:'divuit|devuit',19:'dinov|denov',20:'vint'};
// ordinal: {m:[formes], f:[formes], am, af (abreviatures)}
function c4Ord(n){if(n<=4){const[m,f,am]=C4_ORDB[n];return{m:[m],f:[f],am:n+am,af:n+'a'}}
 const r=C4_ORDR[n].split('|');return{m:r.map(x=>x+'è'),f:r.map(x=>x+'ena'),am:n+'è',af:n+'a'}}
const C4_ORD_N=[['pis','m'],['premi','m'],['curs','m'],['capítol','m'],['lloc','m'],['planta','f'],['fila','f'],['pàgina','f'],['classificada','f'],['porta','f']];
// coma i punt
const C4_ENUM=[['A la cistella hi ha',['pomes','peres','plàtans','maduixes','prunes','cireres']],['A la motxilla duc',['un llapis','una goma','un regle','un quadern','unes tisores','una carpeta']],
 ['Al zoo hem vist',['lleons','girafes','elefants','zebres','micos','pingüins']],['Per fer el pastís necessitam',['ous','farina','sucre','llet','mantega','llimona']],
 ['A la platja duim',['la tovallola','el para-sol','la pala','el poal','la crema','les ulleres']]];
const C4_PUNT=[['avui fa molt de vent','no anirem a la platja'],['en Pere té un ca','es diu Floc'],['la biblioteca obre a les nou','tanca a les dues'],
 ['ahir va ploure tot el dia','els carrers eren plens de bassals'],['la meva germana té set anys','fa primer'],['hem plantat tomàqueres a l\'hort','les regam cada dia'],
 ['el tren surt a les deu','hem d\'arribar a l\'estació abans'],['la padrina fa unes coques boníssimes','totes les berenam']];
// síl·laba tònica: [síl·labes, posició de la tònica (des del principi)]
const C4_SIL=[['ca-sa',0],['pi-lo-ta',1],['ma-ri-po-sa',2],['so-fà',1],['ca-fè',1],['ca-mi-ó',2],['mú-si-ca',0],['pà-gi-na',0],['lla-pis',0],['mi-rall',1],['ciu-tat',1],
 ['ca-di-ra',1],['es-co-la',1],['ma-tí',1],['pas-tís',1],['fà-cil',0],['te-lè-fon',1],['ar-bre',0],['a-vi-ó',2],['ger-ma-na',1],['pa-pa-llo-na',2],['ta-ron-ja',1],
 ['cai-xa',0],['mà-qui-na',0],['re-llot-ge',1],['xo-co-la-ta',2],['pa-ra-sol',2],['ju-gar',1],['co-lor',1],['ca-mí',1],['ú-nic',0],['àn-gel',0],['cò-mic',0],
 ['mò-bil',0],['plà-tan',0],['làm-pa-da',0],['ca-ra-gol',2],['ma-dui-xa',1],['es-tel',1],['pe-ti-ta',1]];
// metàfores i comparacions: [frase, tipus, què es compara, amb què (alternatives)]
const C4_MET=[['Els teus ulls són com dues estrelles.','comparació','els teus ulls','dues estrelles|estrelles'],['Corria com un llamp.','comparació','qui corria','un llamp|llamp'],
 ['La neu era blanca com el sucre.','comparació','la neu','el sucre|sucre'],['En Pau és valent com un lleó.','comparació','en pau','un lleó|lleó'],
 ['Aquest coixí és tou com un núvol.','comparació','aquest coixí','un núvol|núvol'],['Les fulles queien com papallones grogues.','comparació','les fulles','papallones grogues|papallones'],
 ['La mar brillava com un mirall.','comparació','la mar','un mirall|mirall'],['Dorm com un tronc.','comparació','qui dorm','un tronc|tronc'],
 ['La lluna és un plat de plata.','metàfora','la lluna','un plat de plata|plat de plata|plat'],['Els teus cabells són or.','metàfora','els teus cabells','or'],
 ['Les estrelles són llumetes del cel.','metàfora','les estrelles','llumetes del cel|llumetes|llums'],['El sol és una taronja calenta.','metàfora','el sol','una taronja calenta|taronja calenta|taronja'],
 ['Les teves dents són perles.','metàfora','les teves dents','perles'],['El riu és una serp blava.','metàfora','el riu','una serp blava|serp blava|serp'],
 ['Aquell pi és un gegant verd.','metàfora','aquell pi','un gegant verd|gegant verd|gegant'],['La mar és un llençol blau.','metàfora','la mar','un llençol blau|llençol blau|llençol']];
// poemes originals: estrofes i parelles de rima
const C4_POEMES=[
 {t:'Nit a la plaça',e:[['Quan el sol se\'n va a dormir,','la plaça es queda callada;','la lluna surt pel camí','amb la cara ben rentada.'],
   ['Els moixos miren del teulat,','les estrelles fan rotllana,','i el vent, tot cansat,','s\'adorm dins una campana.']],r:[['callada','rentada'],['rotllana','campana'],['teulat','cansat']]},
 {t:'L\'ametller',e:[['L\'ametller s\'ha despertat','amb un vestit blanc de festa;','el gener li ha regalat','una flor per cada branca.'],
   ['Les abelles, de bon matí,','li canten una cançó,','i ell, content, les deixa venir','a beure de cada flor.']],r:[['despertat','regalat'],['matí','venir'],['cançó','flor']]},
 {t:'La barca',e:[['Una barca petitona','surt del port de bon matí,','duu una vela que és ben bona','i un mariner que sap el camí.']],r:[['petitona','bona'],['matí','camí']]},
 {t:'Pluja',e:[['Plou damunt les teulades,','plou damunt el meu jardí;','les flors estan mullades','i els caragols surten a dir:'],
   ['«Quina pluja més bonica,','quin bon dia per passejar!»','I la terra, que és tan rica,','beu i beu sense parar.'],
   ['Quan el sol torna a sortir,','surt l\'arc de Sant Martí.']],r:[['teulades','mullades'],['bonica','rica'],['passejar','parar'],['sortir','martí']]}];
// tipus de textos: [fragment, respostes]
const C4_TT=[['Fa molts d\'anys, en un poble vora la mar, vivia un pescador que tenia una barca vermella. Un matí, quan va estirar la xarxa, hi va trobar una ampolla amb un missatge.','narratiu|text narratiu|narració|conte'],
 ['La Neus va obrir la capsa a poc a poc. A dins hi havia una clau petita i un paper que deia: «Busca davall el taronger».','narratiu|text narratiu|narració|conte'],
 ['Les abelles viuen en colònies. Cada colònia té una reina, moltes obreres i alguns abellots. Les obreres recullen el nèctar de les flors i fan la mel.','expositiu|text expositiu|informatiu|text informatiu|explicatiu'],
 ['El cor és un múscul que bomba la sang per tot el cos. Batega unes setanta vegades cada minut.','expositiu|text expositiu|informatiu|text informatiu|explicatiu'],
 ['Primer, renta les maduixes. Després, talla-les a trossets. A continuació, posa-les dins un bol amb iogurt. Finalment, remena-ho bé.','instructiu|text instructiu|recepta|instruccions'],
 ['Com plantar una llavor: 1. Omple un test de terra. 2. Fes un forat petit amb el dit. 3. Posa-hi la llavor i tapa-la. 4. Rega-la cada dos dies.','instructiu|text instructiu|instruccions'],
 ['La meva padrina és baixeta i té els cabells blancs i arrissats. Té els ulls petits i alegres, i sempre duu un davantal de quadres blaus.','descriptiu|text descriptiu|descripció'],
 ['El meu moix és gros i pelut. Té el pèl gris amb ratlles negres, les orelles punxegudes i una coa llarga que mou quan està content.','descriptiu|text descriptiu|descripció'],
 ['MARIA. (Entra corrent.) Has vist la meva motxilla?<br>PERE. (Sense mirar-la.) Era damunt la cadira.<br>MARIA. Idò ara no hi és!','teatral|text teatral|teatre|dramàtic|text dramàtic|obra de teatre'],
 ['El vent passa per la vila<br>i fa ballar les cortines;<br>les fulles, com papallones,<br>volen damunt les esquines.','poema|poètic|poesia|text poètic|poema|lírica'],
 ['INCA. L\'escola del poble ha inaugurat aquest dilluns un hort nou. Els alumnes de quart hi han plantat tomàqueres, enciams i maduixeres.','notícia|una notícia|periodístic|text periodístic|informatiu'],
 ['Vaig néixer a Maó un dia de molta tramuntana. De petita, m\'agradava pujar a la barca del meu padrí i mirar els peixos. Ara tenc deu anys i vull ser biòloga marina.','autobiogràfic|text autobiogràfic|autobiografia|narratiu']];
// formalitat
const C4_FORM=[['Ei, què tal? Véns a jugar?','informal'],['Bon dia, senyora directora. Puc passar?','formal'],['Benvolgudes famílies: us convidam a la festa de fi de curs.','formal'],
 ['Hola, guapa! Ens veim demà?','informal'],['Disculpi, senyor, sap on és l\'estació?','formal'],['Ostres, això és genial!','informal'],['Li agraeixo molt la seva ajuda.','formal'],
 ['Va, passa\'m la pilota!','informal'],['Atentament, la direcció de l\'escola.','formal'],['Escolta, em deixes el teu llapis?','informal'],['Perdoni, em podria dir quina hora és?','formal'],['Au, fins després!','informal']];
const C4_VOSTE=[['tens','té'],['vols','vol'],['pots','pot'],['saps','sap'],['ets','és'],['estàs','està'],['parles','parla'],['menges','menja'],['véns','ve'],['fas','fa'],
 ['vas','va'],['dius','diu'],['escrius','escriu'],['beus','beu'],['tanques','tanca'],['vius','viu']];
// pronoms
const C4_PERS=[['la Marta','f'],['en Pere','m'],['la meva germana','f'],['el meu cosí','m'],['la mestra','f'],['el padrí','m'],['l\'Aina','f'],['en Toni','m']];
const C4_FEB=[['Compro','el pa','m','s'],['Tanco','la porta','f','s'],['Llegeixo','els contes','m','p'],['Rento','les sabates','f','p'],['Porto','la motxilla','f','s'],
 ['Miro','els ocells','m','p'],['Pinto','el dibuix','m','s'],['Busco','les claus','f','p'],['Menjo','la poma','f','s'],['Rego','les plantes','f','p'],['Vull','el gelat','m','s'],
 ['Obro','la finestra','f','s',1],['Escolto','la cançó','f','s',1],['Agafo','el llapis','m','s',1],['Ordeno','els llibres','m','p',1],['Omplo','el got','m','s',1]];
// compostes: [paraula 1, paraula 2, composta, definició]
const C4_COMP=[['rentar','plats','rentaplats','Màquina que renta els plats'],['gratar','cel','gratacel','Edifici altíssim'],['para','caigudes','paracaigudes','Tela que frena la caiguda de qui salta d\'un avió'],
 ['para','aigua','paraigua','Objecte que ens protegeix de la pluja'],['escurar','dents','escuradents','Pal petit per netejar-se entre les dents'],['obrir','llaunes','obrellaunes','Estri per obrir llaunes'],
 ['trencar','closques','trencaclosques','Joc de peces que s\'han d\'encaixar'],['salvar','vides','salvavides','Flotador que es llança a qui s\'ofega'],['passar','muntanyes','passamuntanyes','Peça que tapa el cap i la cara i només deixa veure els ulls'],
 ['rata','penat','ratpenat','Mamífer que vola de nit'],['mig','dia','migdia','Les dotze del dia'],['pit','roig','pit-roig','Ocell petit amb el pit vermell',1],
 ['gira','sol','gira-sol','Flor grossa que es gira cap al sol',1],['para','sol','para-sol','Objecte que ens fa ombra a la platja',1],['porta','avions','portaavions','Vaixell enorme on aterren avions'],
 ['tallar','ungles','tallaungles','Estri per tallar les ungles'],['guarda','roba','guarda-roba','Armari o lloc per penjar la roba',1]];
// formació de verbs: [paraula, verbs acceptats]
const C4_FV=[['rem','remar'],['net','netejar'],['dibuix','dibuixar'],['salt','saltar'],['cuina','cuinar'],['brut','embrutar'],['llarg','allargar'],['pesca','pescar'],['neu','nevar'],
 ['gel','gelar|glaçar'],['bany','banyar|banyar-se'],['planxa','planxar'],['flor','florir'],['fosc','enfosquir|enfosquir-se'],['vermell','envermellir|envermellir-se'],['trist','entristir|entristir-se'],
 ['nedador','nedar'],['jugador','jugar'],['patinatge','patinar'],['bussejador','bussejar'],['entrenador','entrenar|entrenar-se'],['corredor','córrer'],['rem','remar'],['dolç','endolcir']];
// coma explicativa: [oració sense comes, part entre comes]
const C4_CEX=[['En Marc el capità de l\'equip va marcar un gol.','el capità de l\'equip'],['La Joana la meva veïna neda cada matí.','la meva veïna'],
 ['Palma la capital de Mallorca té un port molt gran.','la capital de mallorca'],['El waterpolo un esport d\'equip es juga dins la piscina.','un esport d\'equip'],
 ['En Lluc el meu cosí fa surf a Cala Millor.','el meu cosí'],['L\'entrenadora una antiga campiona ens ensenya a nedar.','una antiga campiona'],
 ['El caiac una barca estreta es mou amb un rem.','una barca estreta'],['La Mar la més petita de la colla ja sap nedar a crol.','la més petita de la colla'],
 ['En Pere el socorrista vigila la platja.','el socorrista'],['Menorca l\'illa del vent té platges precioses.','l\'illa del vent'],
 ['La regata una cursa de velers començarà a les deu.','una cursa de velers'],['El dofí un mamífer marí salta entre les ones.','un mamífer marí']];
// adverbis: [oració, adverbi, tipus acceptats]
const C4_ADV=[['Demà anirem a la piscina.','demà','temps'],['Ahir va ploure tota la tarda.','ahir','temps'],['Sempre esmorzo pa amb oli.','sempre','temps'],['Avui fa sol.','avui','temps'],
 ['El moix dorm aquí.','aquí','lloc'],['Les claus són allà.','allà','lloc'],['La pilota és lluny.','lluny','lloc'],['Els ocells volen amunt.','amunt','lloc'],
 ['El nedador neda ràpidament.','ràpidament','manera'],['La tortuga camina lentament.','lentament','manera'],['Ho has fet bé.','bé','manera'],['Ho ha fet malament.','malament','manera'],
 ['Ha plogut molt.','molt','quantitat'],['He menjat poc.','poc','quantitat'],['Aquest pastís és massa dolç.','massa','quantitat'],['Estic bastant cansat.','bastant','quantitat'],
 ['No m\'agrada la sopa.','no','negació'],['Mai he vist la neu.','mai','negació|temps'],['Sí, vindré a la festa.','sí','afirmació'],['També vull jugar.','també','afirmació']];
const C4_ADV_DEF={temps:'diu <b>quan</b>',lloc:'diu <b>on</b>',manera:'diu <b>com</b>',quantitat:'diu <b>quant</b>',afirmació:'diu que <b>sí</b>',negació:'diu que <b>no</b>'};
// notícia
const C4_NQUI=[['L\'equip de waterpolo de l\'escola','s','equip de waterpolo|l\'equip de waterpolo|equip de waterpolo de l\'escola|l\'equip de waterpolo de l\'escola|l\'equip|equip'],
 ['Una nedadora de deu anys','s','una nedadora|nedadora|una nedadora de deu anys|nedadora de deu anys'],['Els alumnes de quart','p','alumnes de quart|els alumnes de quart|els alumnes|alumnes'],
 ['Un grup de submarinistes','s','grup de submarinistes|un grup de submarinistes|submarinistes|els submarinistes'],['Les regatistes del club nàutic','p','regatistes|les regatistes|les regatistes del club nàutic|regatistes del club nàutic']];
const C4_NQUE=['guanyat una medalla d\'or','fet una exhibició de salts','creuat la badia nedant','participat en una cursa solidària','netejat el fons de la mar'];
const C4_NON=[['a la piscina municipal d\'Inca','piscina municipal d\'inca|la piscina municipal d\'inca|piscina municipal|la piscina municipal|inca|la piscina|piscina'],
 ['al port de Pollença','port de pollença|el port de pollença|pollença|el port|port'],['a la platja de Ciutadella','platja de ciutadella|la platja de ciutadella|ciutadella|la platja|platja'],
 ['a la badia de Palma','badia de palma|la badia de palma|palma|la badia|badia']];
const C4_NQUAN=[['aquest dissabte','dissabte|aquest dissabte|el dissabte'],['el diumenge passat','diumenge passat|el diumenge passat|diumenge|el diumenge'],
 ['ahir al matí','ahir|ahir al matí'],['aquest dilluns','dilluns|aquest dilluns|el dilluns']];
const C4_NTIT=['Gran jornada a l\'aigua','Una festa a la mar','Èxit esportiu a l\'illa','Un dia per recordar'];

/* ---------- temes ---------- */
Object.assign(SK,{
/* ===== U1 Un aniversari diferent ===== */
 c4_alfabetic:{mat:'catala',ab:'Oa',curs:[4],nom:'L\'ordre alfabètic',
  teoria:['L\'<b>abecedari</b> té les lletres en un ordre fix: a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z.',
   'Per ordenar paraules alfabèticament, miram la <b>primera lletra</b>. Si és la mateixa, miram la <b>segona</b>; si també és igual, la <b>tercera</b>, i així fins que siguin diferents.',
   'Exemple: <b>cadira</b>, <b>casa</b>, <b>cel</b>. «Cadira» i «casa» comencen per <b>ca</b>; després, la d va abans que la s.','Els diccionaris tenen les paraules en ordre alfabètic: així les trobam de pressa.'],
  gen(lv){const pool=lv===0?C4_ALF0:pick(lv===1?C4_ALF1:C4_ALF2),pos=lv===0?0:lv===1?1:2,n=lv===0?3:4;let ws=[];
   for(const w of c4Shuf(pool)){if(ws.length<n&&!ws.some(x=>x[pos]===w[pos]))ws.push(w)}
   const ord=ws.slice().sort((a,b)=>a.localeCompare(b,'ca')),ans=ord.join(' ');
   return caEx(`Escriu aquestes paraules en <b>ordre alfabètic</b> (separades per comes o espais):<br><b>${ws.join(', ')}</b>`,[ans],{label:'Paraules en ordre',
    hints:[pos===0?'Mira la primera lletra de cada paraula i pensa en l\'ordre de l\'abecedari.':`Totes comencen igual. Mira la ${pos===1?'segona':'tercera'} lletra de cada paraula.`,`La primera paraula de la llista ordenada és la que té ${pos===0?'la primera lletra':pos===1?'la segona lletra':'la tercera lletra'} més a prop de la «a».`],
    steps:[pos===0?`Miram la primera lletra: ${ws.map(w=>w[0]).join(', ')}.`:`Comencen igual; miram la ${pos===1?'segona':'tercera'} lletra: ${ws.map(w=>w[pos]).join(', ')}.`,`Ordenades: <b>${ord.join(', ')}</b>.`],
    err:v=>{const a=v[0].split(' ');return a.join(' ')!==ans&&a.length===ord.length&&a.slice().sort().join(' ')===ord.slice().sort().join(' ')?'ct4_alfabet':null}})}},
 c4_diccionari:{mat:'catala',ab:'Dc',curs:[4],nom:'El diccionari i la polisèmia',
  teoria:['Al <b>diccionari</b>, les paraules estan en ordre alfabètic i cada una té una <b>entrada</b> amb el seu significat.',
   'Per buscar una paraula, l\'hem de posar en la forma de l\'entrada: els <b>noms</b> en singular (cases → <b>casa</b>), els <b>adjectius</b> en masculí singular (blanques → <b>blanc</b>) i els <b>verbs</b> en infinitiu (cantava → <b>cantar</b>).',
   'Algunes paraules tenen <b>més d\'un significat</b>: són paraules <b>polisèmiques</b>. Per exemple, <b>fulla</b> pot ser la d\'un arbre o la d\'un llibre. El diccionari les numera: 1, 2, 3...'],
  gen(lv){if(Math.random()<.5){const[f,e,x]=pick(C4_DIC);
    return caEx(`Vols buscar «<b>${f}</b>» al diccionari. Quina paraula hi has de buscar?`,[e],{label:'Entrada del diccionari',
     hints:['Pensa si és un nom, un adjectiu o un verb.',x.includes('verb')?'Els verbs es busquen en infinitiu (acaben en -ar, -er, -re, -ir).':x.includes('adjectiu')?'Els adjectius es busquen en masculí i singular.':'Els noms es busquen en singular.'],
     steps:[`«${f}» és un ${x}.`,`Has de buscar: <b>${e}</b>.`],err:v=>v[0]===f?'ct4_dicc_forma':null})}
   const[w,a,b]=pick(C4_POLI);
   return caEx(`Quina paraula serveix per a les dues frases?<br>1. ${a}<br>2. ${b}`,[w],{label:'Paraula',loose:true,
    hints:['És una sola paraula que té dos significats diferents (una paraula polisèmica).',c4Ini(w)],steps:[`La paraula és <b>${w}</b>: a cada frase té un significat diferent.`]})}},
 c4_subjecte:{mat:'catala',ab:'Sp',curs:[4],nom:'El subjecte i el predicat',
  teoria:['Una <b>oració</b> té dues parts: el <b>subjecte</b>, que diu <b>qui</b> fa l\'acció o de qui es parla, i el <b>predicat</b>, que diu <b>què</b> fa o com és. El predicat sempre té un <b>verb</b>.',
   'Exemple: <b>Els nens</b> | <b>juguen al pati</b>. Subjecte: els nens. Predicat: juguen al pati. Verb: juguen.',
   'Truc: busca primer el verb i pregunta-li <b>qui?</b>: qui juga? Els nens. Si canvies el subjecte a singular, el verb també canvia: el nen <b>juga</b>.',
   'El subjecte no sempre va al principi: «Al bosc viuen <b>molts animals</b>».'],
  gen(lv){const L=C4_SUBJ.filter(x=>lv>0||!x[3]),[o,s,vb,inv]=pick(L),mode=lv===0?pick(['s','v']):lv===1?pick(['s','v','s']):pick(inv?['s','v']:['s','p']);
   if(mode==='v')return caEx(`Escriu el <b>verb</b> d'aquesta oració:<br><i>${o}</i>`,[vb],{label:'Verb',hints:['El verb és la paraula que diu l\'acció o l\'estat. Canvia si dius «ahir» o «demà».','És dins el predicat, no al subjecte.'],
    steps:[`L'acció de l'oració la diu «<b>${vb}</b>».`,`El verb és <b>${vb}</b>.`],err:v=>c4Lc(v[0])===s?'ct4_subj_verb':null});
   if(mode==='p'){const p=c4Lc(o).replace(s+' ','');
    return caEx(`Escriu el <b>predicat</b> d'aquesta oració:<br><i>${o}</i>`,[p],{label:'Predicat',hints:['Primer troba el subjecte (qui?). El predicat és tota la resta.','El predicat comença pel verb.'],
     steps:[`Subjecte: <b>${s}</b>.`,`Predicat (la resta): <b>${p}</b>.`],err:v=>c4Lc(v[0])===s?'ct4_subj_pred':null})}
   return caEx(`Escriu el <b>subjecte</b> d'aquesta oració:<br><i>${o}</i>`,[s],{label:'Subjecte',loose:true,hints:['Busca el verb i pregunta-li: qui...?',inv?'Compte: aquí el subjecte no va al principi.':'El subjecte inclou l\'article i les paraules que acompanyen el nom.'],
    steps:[`El verb és «${vb}». Qui ${vb}?`,`El subjecte és <b>${s}</b>.`],err:v=>c4Lc(v[0])===vb?'ct4_subj_verb':null})}},
 c4_tipus_frases:{mat:'catala',ab:'Tf',curs:[4],nom:'Tipus de frases',
  teoria:['Segons el que volem dir, les frases poden ser:',
   `<table class="mini"><tr><td><b>Enunciatives</b></td><td>expliquen o informen</td><td>Demà és dimarts.</td></tr><tr><td><b>Interrogatives</b></td><td>pregunten (¿...?)</td><td>Quina hora és?</td></tr><tr><td><b>Exclamatives</b></td><td>expressen emoció (!)</td><td>Quin dia tan bonic!</td></tr><tr><td><b>Imperatives</b></td><td>donen una ordre o un consell</td><td>Tanca la porta.</td></tr></table>`,
   'A més, una frase pot ser <b>afirmativa</b> (diu que sí: «M\'agrada el peix») o <b>negativa</b> (porta <b>no</b>, <b>mai</b>...: «No m\'agrada el peix»).'],
  gen(lv){const[o,t]=pick(CA_ORA),neg=/(^|\s)(no|mai)\s/i.test(o)?'negativa':'afirmativa',why=t==='interrogativa'?'fa una pregunta':t==='exclamativa'?'expressa una emoció':t==='imperativa'?'dona una ordre o un consell':'dona una informació';
   if(lv>0&&Math.random()<.5)return{text:`Quin tipus de frase és? És afirmativa o negativa?<br><i>${o}</i>`,fields:[{label:'Tipus',txt:[t],loose:true,wide:true},{label:'Afirmativa o negativa',txt:[neg],loose:true,wide:true}],vis:null,
    hints:['Fixa\'t en la intenció i en els signes: informa, pregunta, expressa emoció o dona una ordre?','Si porta «no» o «mai», és negativa.'],steps:[`La frase ${why}: és <b>${t}</b>.`,neg==='negativa'?'Porta una paraula de negació: és <b>negativa</b>.':'No porta cap paraula de negació: és <b>afirmativa</b>.']};
   return caEx(`Quin tipus de frase és?<br><i>${o}</i>`,[t],{label:'Tipus',loose:true,hints:['Fixa\'t en la intenció: informa, pregunta, expressa una emoció o dona una ordre?',t==='imperativa'||t==='enunciativa'?'Les ordres i els consells solen començar pel verb.':'Mira els signes del principi i del final.'],
    steps:[`La frase ${why}.`,`És una frase <b>${t}</b>.`]})}},
 c4_narracio:{mat:'catala',ab:'Cn',curs:[4],nom:'El conte (text narratiu)',
  teoria:['Un <b>text narratiu</b> explica una història. Hi ha un <b>narrador</b> (qui l\'explica), <b>personatges</b> (el principal és el <b>protagonista</b>), un <b>lloc</b> i un <b>temps</b>.',
   'Un conte té tres parts: <b>plantejament</b> (presenta qui, on i quan), <b>nus</b> (apareix un problema) i <b>desenllaç</b> (com s\'acaba).',
   'Per entendre un conte, pregunta\'t: <b>qui</b>?, <b>on</b>?, <b>quan</b>?, <b>què passa</b>? i <b>com acaba</b>?'],
  gen(lv){const[p,g]=pick(C4_PROTA),[ll,lla]=pick(C4_LLOC),[q,qa]=pick(C4_QUAN),[nus,des]=pick(C4_NUS),nm=p.replace(/^(la |en |l')/,''),
   s1=`${caCap(q)}, ${p} va anar ${ll}.`,s2=`Tot anava bé fins que ${nus}.`,s3=`Finalment, ${des}, i ${p} va tornar a casa ben ${g==='f'?'contenta':'content'}.`,
   txt=`<p style="font-size:18px;line-height:1.6;background:var(--bg);padding:14px 16px;margin:10px 0">${s1} ${s2} ${s3}</p>`,
   Q=[['Qui és el protagonista?',[nm,p,p.replace(/^l'/,'')],'Busca el personatge que fa les accions.'],['On passa la història?',[ll,...c4Alts(lla)],'Busca les paraules que diuen el lloc.'],['Quan passa la història?',[q,...c4Alts(qa)],'Busca les paraules que diuen el temps.']];
   if(lv>0&&Math.random()<.45){const[k,fr]=pick([['plantejament|inici|introducció',s1],['nus|desenvolupament',s2],['desenllaç|final',s3]]),A=c4Alts(k);
    return caEx(`${txt}En quina part del conte hi ha aquesta frase: plantejament, nus o desenllaç?<br><i>${fr}</i>`,A,{label:'Part del conte',loose:true,
     hints:['El plantejament presenta; el nus és el problema; el desenllaç és com s\'acaba.','Pensa si la frase presenta el personatge, explica un problema o explica com s\'acaba.'],steps:[`Aquesta frase ${A[0]==='plantejament'?'presenta qui, on i quan':A[0]==='nus'?'explica el problema':'explica com s\'acaba la història'}.`,`És el <b>${A[0]}</b>.`]})}
   const[qq,A,h]=pick(Q);return caEx(`${txt}${qq}`,A,{label:'Resposta',loose:true,hints:[h,'Torna a llegir la primera frase del conte.'],steps:[`La primera frase presenta qui, on i quan: «${s1}»`,`Resposta: <b>${A[0]}</b>.`]})}},
/* ===== U2 Descobrim el parc ===== */
 c4_voc_parc:{mat:'catala',ab:'Vp',curs:[4],nom:'Vocabulari: el parc',teoria:['Al parc hi trobam <b>plantes</b> (arbres, gespa, flors amb els seus pètals), <b>animals</b> (pardals, esquirols, papallones, abelles, caragols) i <b>coses</b> per gaudir-ne (bancs, sortidors, gronxadors).','Conèixer moltes paraules ens ajuda a explicar i a descriure millor el que veim.'],
  gen:c4Vocab(C4_V_PARC,'Pensa en les coses, les plantes i els animals que hi ha en un parc.')},
 c4_majuscula:{mat:'catala',ab:'Mj',curs:[4],nom:'La majúscula',
  teoria:['Escrivim amb <b>majúscula</b>: la primera paraula d\'un text i la que va després d\'un punt; els <b>noms propis</b> de persones, animals, pobles, illes, rius i muntanyes (Marta, Floc, Sóller, Menorca).',
   'Escrivim amb <b>minúscula</b> els dies de la setmana i els mesos: <b>dilluns</b>, <b>gener</b>.','Exemple: <b>El</b> dissabte de juliol, <b>Biel</b> va anar a <b>Palma</b>.'],
  gen(lv){const ll=pick(C4_MAJ_LLOC),nm=pick(C4_MAJ_NOM),d=pick(C4_DIES),m=pick(C4_MESOS),T=[
   [`el ${d} anirem a ${ll} amb l'autocar de l'escola`,ll,d],[`aquest ${m} la meva cosina ${nm} fa deu anys`,nm,m],[`cada ${d} la ${nm} va a nedar a la piscina`,nm,d],
   [`al mes de ${m} vam visitar ${ll} amb els padrins`,ll,m],[`la nostra mestra es diu ${nm} i viu a prop de l'escola`,nm,null],[`el meu ca dorm al sofà i ${nm} li fa carícies`,nm,null]],[f,a,trap]=pick(T.filter(x=>lv>0||x[2]===null||Math.random()<.5));
   return caEx(`Aquesta frase està escrita tota en minúscules:<br><i>${f}</i><br>A part de la primera paraula, quina paraula s'ha d'escriure amb <b>majúscula</b>?`,[a],{label:'Paraula',
    hints:['Busca un nom propi: el nom d\'una persona o d\'un lloc.','Els dies de la setmana i els mesos no porten majúscula.'],steps:[`«${a}» és un nom propi.`,`S'escriu amb majúscula: <b>${caCap(a)}</b>.`],
    err:v=>trap&&v[0]===trap?'ct4_majus_mes':null})}},
 c4_digrafs:{mat:'catala',ab:'Dg',curs:[4],nom:'Els dígrafs',
  teoria:['Un <b>dígraf</b> són <b>dues lletres que fan un sol so</b>.',
   `<table class="mini"><tr><td><b>ll</b> cavall</td><td><b>ny</b> canya</td><td><b>rr</b> carro</td><td><b>ss</b> massa</td></tr><tr><td><b>l·l</b> col·legi</td><td><b>ix</b> caixa</td><td><b>ig</b> maig</td><td><b>tx</b> cotxe</td></tr><tr><td><b>tg</b> metge</td><td><b>tj</b> platja</td><td><b>qu</b> quilo</td><td><b>gu</b> guerra</td></tr></table>`,
   'Compte: <b>qu</b> i <b>gu</b> només són dígrafs davant <b>e</b> i <b>i</b>, quan la u no sona (quilo, guerra). A «quatre» o «paraigua», la u sona: no hi ha dígraf.'],
  gen(lv){const[w,d]=pick(C4_DIG.filter(x=>lv>0||!['paraigua','quatre','passeig','rellotge'].includes(x[0]))),A=d?[d,d.replace(' ',' i ')]:['cap','no en té','cap dígraf','no','no en té cap'];
   return caEx(`Escriu el dígraf (o els dígrafs) de la paraula «<b>${w}</b>». Si no en té cap, escriu «cap».`,A,{label:'Dígrafs',
    hints:['Busca dues lletres seguides que fan un sol so.','Recorda: qu i gu només són dígrafs si la u no sona.'],steps:[d?`A «${w}», ${d.split(' ').map(x=>`<b>${x}</b>`).join(' i ')} ${d.includes(' ')?'són dígrafs: cada parell':'és un dígraf: les dues lletres'} fa${d.includes(' ')?'n':''} un sol so.`:`«${w}» no té cap dígraf.`,`Resposta: <b>${A[0]}</b>.`]})}},
 c4_genere_nombre:{mat:'catala',ab:'Gn',curs:[4],nom:'El gènere i el nombre',
  teoria:['Els noms tenen <b>gènere</b>: <b>masculí</b> (el gat, un llibre) o <b>femení</b> (la gata, una cadira). Truc: prova de posar-hi «el» o «la» davant.',
   'També tenen <b>nombre</b>: <b>singular</b> (una cosa: flor) o <b>plural</b> (més d\'una: flors).',
   'Per fer el femení, sovint afegim <b>-a</b> (gat → gata). Per fer el plural, afegim <b>-s</b> (flor → flors); si acaba en <b>-a</b>, la canviam per <b>-es</b> (casa → cases).','Compte: en català <b>la dent</b> i <b>la llet</b> són femenines.'],
  gen(lv){if(Math.random()<.5){const[w,g,n]=pick(C4_GN),G=g==='m'?'masculí':'femení',N=n==='s'?'singular':'plural';
    return{text:`Escriu el gènere i el nombre de «<b>${w}</b>».`,fields:[{label:'Masculí o femení',txt:[G],loose:true,wide:true},{label:'Singular o plural',txt:[N],loose:true,wide:true}],vis:null,
     hints:['Prova de posar-hi «el», «la», «els» o «les» davant.','Si parla de més d\'una cosa, és plural.'],steps:[`Diem «${c4ArtW(g,n,w)}».`,`És <b>${G}</b> i <b>${N}</b>.`],
     err:v=>{const e=(a,b)=>fold(a)===fold(b);return e(v[0],G)&&!e(v[1],N)?'ct4_nombre':(e(v[1],N)&&!e(v[0],G)?'ct4_genere':null)}}}
   const[b,a,k]=pick(C4_GN_FORM.filter(x=>lv>0||!x[3]));
   return caEx(`Escriu el <b>${k==='f'?'femení':'plural'}</b> de «<b>${b}</b>».`,[a],{label:k==='f'?'Femení':'Plural',hints:[k==='f'?'Sovint el femení es fa afegint -a.':'Sovint el plural es fa afegint -s.',k==='p'&&/a$/.test(b)?'Si acaba en -a, la -a es canvia per -es.':'Mira si la paraula porta accent: a vegades el perd.'],
    steps:[k==='f'?`Femení de «${b}»: <b>${a}</b>.`:`Plural de «${b}»: <b>${a}</b>.`],err:v=>k==='p'&&/a$/.test(b)&&v[0]===b+'s'?'ct4_plural_as':null})}},
 c4_comuns_propis:{mat:'catala',ab:'Np',curs:[4],nom:'Noms comuns i noms propis',
  teoria:['Els <b>noms comuns</b> anomenen qualsevol persona, animal o cosa d\'un grup: <b>nena</b>, <b>gos</b>, <b>ciutat</b>.',
   'Els <b>noms propis</b> anomenen una persona, un animal o un lloc concret, i s\'escriuen amb <b>majúscula</b>: <b>Marta</b>, <b>Floc</b>, <b>Sóller</b>.'],
  gen(lv){const[o,P,C]=pick(C4_CP),m=lv>0?pick(['p','c','n']):pick(['p','c']);
   if(m==='n')return caEx(`Quants <b>noms comuns</b> hi ha en aquesta frase?<br><i>${o}</i>`,[String(C.length)],{label:'Nombre',hints:['Els noms propis porten majúscula; no els comptis.','Els noms comuns sovint porten un article davant (el, la, els, les).'],
    steps:[`Noms comuns: ${C.join(', ')}.`,`N'hi ha <b>${C.length}</b>.`]});
   const A=m==='p'?P:C;return caEx(`Escriu un <b>nom ${m==='p'?'propi':'comú'}</b> d'aquesta frase:<br><i>${o}</i>`,A,{label:'Nom',loose:true,
    hints:[m==='p'?'Els noms propis s\'escriuen amb majúscula.':'Busca un nom que pugui anar darrere «el» o «la» i que no porti majúscula.','Un nom anomena persones, animals, coses o llocs.'],
    steps:[`Noms propis: ${P.join(', ')}. Noms comuns: ${C.join(', ')}.`,`Resposta: <b>${A[0]}</b>.`],err:v=>(m==='p'?C:P).map(caLow).includes(v[0])?'ct4_comu_propi':null})}},
/* ===== U3 Va de còmics ===== */
 c4_voc_comic:{mat:'catala',ab:'Vc',curs:[4],nom:'Vocabulari: el còmic',teoria:['Un <b>còmic</b> explica una història amb dibuixos. Cada quadre és una <b>vinyeta</b>. El que diuen els personatges va dins les <b>bafarades</b>, i el narrador escriu als <b>cartutxos</b>.','Les <b>onomatopeies</b> imiten sons (crac, bum, nyam) i les <b>línies cinètiques</b> mostren el moviment.'],
  gen:c4Vocab(C4_V_COMIC,'Pensa en les parts d\'un còmic i en les persones que el fan.')},
 c4_sinonims:{mat:'catala',ab:'Si',curs:[4],nom:'Les paraules sinònimes',
  teoria:['Les paraules <b>sinònimes</b> volen dir el mateix o gairebé el mateix: <b>content</b> i <b>alegre</b>, <b>començar</b> i <b>iniciar</b>.','Els sinònims ens ajuden a no repetir sempre la mateixa paraula quan escrivim.'],
  gen(){const[w,a]=pick(CA_SIN),A=c4Alts(a),ants=CA_ANT.find(x=>x[0]===w);
   return caEx(`Escriu un <b>sinònim</b> de «<b>${w}</b>».`,A,{label:'Sinònim',loose:true,hints:['Busca una paraula que es pugui posar al seu lloc sense canviar el que vol dir la frase.',c4Ini(A[0])],
    steps:[`Sinònims de «${w}»: <b>${A.join(', ')}</b>.`],err:v=>ants&&c4Alts(ants[1]).map(caLow).includes(v[0])?'ct4_sin_ant':null})}},
 c4_plurals:{mat:'catala',ab:'Pl',curs:[4],nom:'Masculins, femenins i plurals',
  teoria:['En fer el <b>femení</b> o el <b>plural</b>, algunes paraules canvien una lletra per conservar el so:',
   `<table class="mini"><tr><td>-ca → -ques</td><td>vaca → vaques</td></tr><tr><td>-ga → -gues</td><td>amiga → amigues</td></tr><tr><td>-ça → -ces</td><td>plaça → places</td></tr><tr><td>-ja → -ges</td><td>platja → platges</td></tr><tr><td>-gua → -gües</td><td>llengua → llengües</td></tr><tr><td>-s, -ç, -x → -os</td><td>gos → gossos, braç → braços, peix → peixos</td></tr></table>`,
   'Femenins: amic → ami<b>g</b>a, groc → gro<b>g</b>a, llop → llo<b>b</b>a, nebot → nebo<b>d</b>a, blau → bla<b>v</b>a. Alguns canvien de paraula: cavall → <b>euga</b>, home → <b>dona</b>.','Compte: en català el plural femení acaba en <b>-es</b>, mai en -as.'],
  gen(lv){if(Math.random()<.5){const[b,a]=pick(C4_PL),A=c4Alts(a);
    return caEx(`Escriu el <b>plural</b> de «<b>${b}</b>».`,A,{label:'Plural',hints:['Recorda que en català els femenins en -a fan el plural en -es.',/[sçx]$/.test(b)?'Si acaba en -s, -ç o -x, mira si cal afegir -os.':'Compte: la lletra d\'abans de la -es pot canviar per conservar el so.'],
     steps:[`Plural de «${b}»: <b>${A[0]}</b>.`],err:v=>{if(A.includes(v[0]))return null;if(/as$/.test(v[0])&&/es$/.test(A[0]))return'ct4_plural_as';if(v[0]===b+'s'&&/os$/.test(A[0]))return'ct4_plural_os';
      if(/a$/.test(b)&&v[0]===b.slice(0,-1)+'es')return'ct4_plural_canvi';return null}})}
   const[b,a,het]=pick(C4_FEM.filter(x=>lv>0||!x[2]));
   return caEx(`Escriu el <b>femení</b> de «<b>${b}</b>».`,[a],{label:'Femení',hints:['Pensa com ho diries si parlassis d\'una nena o d\'una femella.',het?'Compte: aquest femení és una paraula diferent.':'A vegades, en afegir -a, la darrera consonant canvia.'],
    steps:[`Femení de «${b}»: <b>${a}</b>.`],err:v=>v[0]!==a&&!het&&(v[0]===b+'a'||v[0]===CA_STRIP(b)+'a')?'ct4_fem_canvi':null})}},
 c4_individuals:{mat:'catala',ab:'Ic',curs:[4],nom:'Noms individuals i col·lectius',
  teoria:['Els <b>noms individuals</b> anomenen una sola persona, animal o cosa: <b>ovella</b>, <b>arbre</b>.','Els <b>noms col·lectius</b>, en singular, anomenen un <b>grup</b>: <b>ramat</b> (moltes ovelles), <b>bosc</b> (molts arbres), <b>eixam</b> (moltes abelles).'],
  gen(lv){const[i,c]=pick(C4_COL),C=c4Alts(c);
   if(lv>0&&Math.random()<.4)return caEx(`De què està format un/una <b>${C[0]}</b>?`,[i,...C4_COL.filter(x=>c4Alts(x[1]).includes(C[0])).map(x=>x[0])],{label:'Individuals',loose:true,
    hints:['Un nom col·lectiu anomena un grup. De què és el grup?',c4Ini(i)],steps:[`Un/una ${C[0]} és un grup de <b>${i}</b>.`]});
   return caEx(`Escriu el <b>nom col·lectiu</b>: un grup de <b>${i}</b>.`,C,{label:'Nom col·lectiu',loose:true,hints:['És una sola paraula, en singular, que anomena tot el grup.',c4Ini(C[0])],
    steps:[`Un grup de ${i} és un/una <b>${C[0]}</b>.`],err:v=>v[0]===i?'ct4_col_ind':null})}},
 c4_adjectiu:{mat:'catala',ab:'Aj',curs:[4],nom:'L\'adjectiu',
  teoria:['L\'<b>adjectiu</b> diu <b>com és</b> un nom: una qualitat (petit, vermell, simpàtic).','Acompanya el nom i concorda amb ell en gènere i nombre: gos <b>petit</b>, gossa <b>petita</b>, gossos <b>petits</b>.','Truc: pregunta <b>com és?</b> al nom.'],
  gen(){const o=pick(C4_ADJ),a=caStar(o),fr=o.replace(/\*/g,'');
   return caEx(`Escriu l'<b>adjectiu</b> d'aquesta frase:<br><i>${fr}</i>`,[a],{label:'Adjectiu',hints:['Busca la paraula que diu com és alguna cosa.','Pregunta «com és?» o «com són?» als noms de la frase.'],
    steps:[`La paraula que diu com és el nom és «<b>${a}</b>».`,`L'adjectiu és <b>${a}</b>.`]})}},
/* ===== U4 Mengem-nos el món! ===== */
 c4_voc_cuina:{mat:'catala',ab:'Vk',curs:[4],nom:'Vocabulari: la cuina i els aliments',teoria:['A la <b>cuina</b> hi ha aparells (nevera, forn, microones), estris (olla, paella, forquilla) i aliments (llet, ous, fruita...).','També hi ha verbs per cuinar: <b>fregir</b>, <b>bullir</b>, <b>picar</b>, <b>remenar</b>, <b>enfornar</b>.'],
  gen:c4Vocab(C4_V_CUINA,'Pensa en la cuina: aparells, estris, aliments i maneres de cuinar.')},
 c4_derivades:{mat:'catala',ab:'Pd',curs:[4],nom:'Paraules primitives i derivades',
  teoria:['Una <b>paraula primitiva</b> no ve de cap altra: <b>pa</b>, <b>flor</b>, <b>llibre</b>.','Les <b>paraules derivades</b> es formen a partir d\'una primitiva afegint-hi trossos al final o al principi: pa → <b>panet</b>, <b>panera</b>; llibre → <b>llibreria</b>, <b>llibreta</b>.',
   'Totes juntes formen una <b>família de paraules</b>.'],
  gen(lv){const[p,d]=pick(C4_DER),D=c4Alts(d);
   if(lv===0||Math.random()<.5){const w=pick(D);return caEx(`Quina és la paraula <b>primitiva</b> de «<b>${w}</b>»?`,[p],{label:'Paraula primitiva',
    hints:['Busca la paraula més curta de la família, la que no ve de cap altra.','Treu el tros del final que s\'ha afegit.'],steps:[`«${w}» ve de «<b>${p}</b>».`],err:v=>v[0]===w?'ct4_primitiva':null})}
   return caEx(`Escriu una paraula <b>derivada</b> de «<b>${p}</b>».`,D,{label:'Paraula derivada',loose:true,hints:['Pensa en una botiga, una persona que hi treballa, un recipient o una cosa petita (-et, -eta).',c4Ini(D[0])],
    steps:[`Derivades de «${p}»: <b>${D.join(', ')}</b>.`]})}},
 c4_h_lgem:{mat:'catala',ab:'Hl',curs:[4],nom:'Paraules amb h i amb l·l',
  teoria:['La <b>h</b> no sona mai, però s\'escriu en moltes paraules: <b>hivern</b>, <b>hora</b>, <b>home</b>, <b>ahir</b>. Les paraules de la mateixa família també la porten (herba, herbívor).',
   'La <b>ela geminada</b> (<b>l·l</b>) sona com dues eles separades: col-legi → <b>col·legi</b>. S\'escriu amb un punt volat al mig.','Si sona com a «lluna», és <b>ll</b> (cavall); si sona una ela suau, és <b>l</b> (pala).'],
  gen(lv){const[w,gap,opt,k]=pick(C4_HL.filter(x=>lv>0||!['col·lecció','il·lustració','humit'].includes(x[0])));
   return caEx(`Escriu la paraula completa:<br><b>${gap}</b> <span class="muted">(${opt})</span>`,[w],{label:'Paraula',hints:[k[0]==='h'?'La h no sona: pensa si l\'has vista escrita amb h o en una paraula de la seva família.':'Digues la paraula a poc a poc: sents una ela, dues eles separades o el so de «lluna»?',k==='lg'?'Si sents dues eles separades, porta punt volat.':'Pensa en altres paraules de la mateixa família.'],
    steps:[C4_HL_N[k],`S'escriu: <b>${w}</b>.`],err:v=>v[0]===w?null:(k==='lg'&&(v[0]===w.replace('l·l','ll')||v[0]===w.replace('l·l','l.l')||v[0]===w.replace('l·l','l-l'))?'ct4_l_gem':(k[0]==='h'&&(v[0]===w.replace(/h/,'')||v[0]==='h'+w)?'ct4_h':null))})}},
 c4_essa:{mat:'catala',ab:'Es',curs:[4],nom:'La essa sorda i la essa sonora',
  teoria:['La <b>essa sonora</b> és suau, com el brunzit d\'una abella (zzz): ca<b>s</b>a, <b>z</b>ero, on<b>z</b>e. Entre vocals s\'escriu <b>s</b>; a principi de paraula o darrere consonant, <b>z</b>.',
   'La <b>essa sorda</b> és forta, com quan fem callar (sss): <b>s</b>ol, ma<b>ss</b>a, <b>c</b>el, pla<b>ç</b>a. Entre vocals s\'escriu <b>ss</b>; davant e, i, pot ser <b>c</b>; davant a, o, u, <b>ç</b>.',
   'Compara: <b>cosí</b> (familiar) i <b>coixí</b>; <b>casa</b> i <b>cassola</b>.'],
  gen(lv){const[w,gap,opt,k]=pick(C4_ESSA);
   return caEx(`Escriu la paraula completa:<br><b>${gap}</b> <span class="muted">(${opt})</span>`,[w],{label:'Paraula',hints:['Digues la paraula en veu alta: el so és suau (zzz) o fort (sss)?',k==='s'||k==='ss'?'Entre vocals: so suau → s; so fort → ss.':'Mira quina vocal ve després i on és el so dins la paraula.'],
    steps:[C4_ESSA_N[k],`S'escriu: <b>${w}</b>.`],err:v=>v[0]!==w&&(k==='s'||k==='ss')&&v[0]===(k==='s'?w.replace('s','ss'):w.replace('ss','s'))?'ct4_essa':null})}},
 c4_article:{mat:'catala',ab:'Ad',curs:[4],nom:'L\'article determinat',
  teoria:['L\'<b>article determinat</b> va davant del nom i diu si és masculí o femení, singular o plural:',
   `<table class="mini"><tr><th></th><th>Singular</th><th>Plural</th></tr><tr><td>Masculí</td><td><b>el</b> plat</td><td><b>els</b> plats</td></tr><tr><td>Femení</td><td><b>la</b> taula</td><td><b>les</b> taules</td></tr></table>`,
   'Davant d\'una paraula que comença per vocal o h, <b>el</b> i <b>la</b> es converteixen en <b>l\'</b>: <b>l\'</b>oli, <b>l\'</b>aigua, <b>l\'</b>herba.'],
  gen(lv){const[n,g,nb,voc]=pick(C4_ART.filter(x=>lv>0||!x[3]||Math.random()<.3)),a=c4Art(g,nb,n),full=a==="l'"?a+n:a+' '+n;
   return caEx(`Escriu l'<b>article determinat</b> que va davant d'aquest nom:<br><b>___ ${n}</b>`,[a,full],{label:'Article',hints:['És masculí o femení? Singular o plural?','Si comença per vocal o h i és singular, l\'article s\'apostrofa.'],
    steps:[voc&&nb==='s'?`«${n}» comença per vocal o h: l'article s'apostrofa.`:`«${n}» és ${g==='m'?'masculí':'femení'} ${nb==='s'?'singular':'plural'}.`,`Escrivim: <b>${full}</b>.`],
    err:v=>{const x=v[0].split(' ')[0];if(x===a||v[0]===full)return null;if(a==="l'"&&(x==='el'||x==='la'))return'ct4_article_apos';if(['el','la','els','les',"l'"].includes(x))return'ct4_article';return null}})}},
 c4_tipus_text:{mat:'catala',ab:'Tt',curs:[4],nom:'Tipus de textos',
  teoria:['Segons per a què serveix, un text pot ser:',
   `<table class="mini"><tr><td><b>Narratiu</b></td><td>explica una història (conte, llegenda)</td></tr><tr><td><b>Expositiu</b></td><td>explica o informa sobre un tema</td></tr><tr><td><b>Instructiu</b></td><td>diu com fer una cosa, pas a pas (recepta)</td></tr><tr><td><b>Descriptiu</b></td><td>diu com és una persona, un animal, un lloc o un objecte</td></tr><tr><td><b>Teatral</b></td><td>és per representar-lo: diàlegs i acotacions</td></tr><tr><td><b>Poema</b></td><td>està escrit en versos i sovint té rima</td></tr><tr><td><b>Notícia</b></td><td>explica un fet que acaba de passar</td></tr><tr><td><b>Autobiogràfic</b></td><td>algú explica la seva pròpia vida</td></tr></table>`],
  gen(){const[t,a]=pick(C4_TT),A=c4Alts(a);
   return caEx(`Quin tipus de text és?<p style="font-size:17px;line-height:1.6;background:var(--bg);padding:14px 16px;margin:10px 0">${t}</p>`,A,{label:'Tipus de text',loose:true,
    hints:['Pregunta\'t per a què serveix: explicar una història, informar, donar instruccions, descriure, representar-lo...?','Fixa\'t en la forma: hi ha versos? diàlegs amb noms? passos numerats? un lloc i una data?'],steps:[`Aquest text és <b>${A[0]}</b>.`]})}},
/* ===== U5 Llegendes del món ===== */
 c4_voc_roba:{mat:'catala',ab:'Vr',curs:[4],nom:'Vocabulari: la indumentària',teoria:['La <b>indumentària</b> és la roba i el calçat que duim: camisa, faldilla, bufanda, guants, sandàlies, botes...','Les llegendes de cada país sovint descriuen la roba dels personatges: capes, davantals, cinturons...'],
  gen:c4Vocab(C4_V_ROBA,'Pensa en la roba, el calçat i els complements que ens posam.')},
 c4_antonims:{mat:'catala',ab:'An',curs:[4],nom:'Sinonímia i antonímia',
  teoria:['Les paraules <b>sinònimes</b> volen dir el mateix: <b>gran</b> i <b>enorme</b>.','Les paraules <b>antònimes</b> volen dir el contrari: <b>alt</b> i <b>baix</b>, <b>obrir</b> i <b>tancar</b>.'],
  gen(lv){const sin=lv>0&&Math.random()<.35,[w,a]=pick(sin?CA_SIN:CA_ANT),A=c4Alts(a),oth=sin?CA_ANT.find(x=>x[0]===w):CA_SIN.find(x=>x[0]===w);
   return caEx(`Escriu un <b>${sin?'sinònim':'antònim'}</b> de «<b>${w}</b>».`,A,{label:sin?'Sinònim':'Antònim',loose:true,hints:[sin?'Busca una paraula que vulgui dir el mateix.':'Pensa en el contrari.',c4Ini(A[0])],
    steps:[`${sin?'Sinònims':'Antònims'} de «${w}»: <b>${A.join(', ')}</b>.`],err:v=>oth&&c4Alts(oth[1]).map(caLow).includes(v[0])?'ct4_sin_ant':null})}},
 c4_apostrof:{mat:'catala',ab:'Ao',curs:[4],nom:'L\'apòstrof',
  teoria:['L\'<b>apòstrof</b> (\') substitueix una vocal. Els articles <b>el</b> i <b>la</b> s\'apostrofen davant de paraules que comencen per vocal o h: <b>l\'arbre</b>, <b>l\'home</b>, <b>l\'escola</b>.',
   'Però <b>la</b> no s\'apostrofa davant de <b>i</b> o <b>u</b> sense força (àtones): <b>la idea</b>, <b>la universitat</b>, <b>la història</b>.','La preposició <b>de</b> també s\'apostrofa davant vocal o h: <b>d\'aigua</b>, <b>d\'Anna</b>; però <b>de pa</b>.'],
  gen(lv){if(Math.random()<.4){const[n,ap]=pick(C4_APO_DE),ans=ap?"d'"+n:'de '+n;
    return caEx(`Escriu-ho correctament:<br><b>de + ${n}</b>`,[ans],{label:'Resposta',hints:[`Comença «${n}» per vocal o per h?`,'Davant vocal o h, de s\'apostrofa: d\'.'],
     steps:[ap?`«${n}» comença per vocal o h: de s'apostrofa.`:`«${n}» comença per consonant: de no canvia.`,`Resposta: <b>${ans}</b>.`],err:v=>v[0]!==caLow(ans)&&(v[0]===caLow('de '+n)||v[0]===caLow("d'"+n))?'ct4_apostrof':null})}
   const it=pick(C4_APO.filter(x=>lv>0||!x[2])),[n,g,iu]=it,base=g==='m'?'el':'la',ans=caArticle([n,g,null,iu]);
   return caEx(`Escriu l'article i el nom correctament:<br><b>${base} + ${n}</b>`,[ans],{label:'Article + nom',hints:[`Comença «${n}» per vocal o per h?`,iu?'Compte: la no s\'apostrofa davant i o u sense força.':'Davant vocal o h, el i la s\'apostrofen: l\'.'],
    steps:[iu?`«${n}» comença per i o u àtona: la <b>no</b> s'apostrofa.`:/^h?[aeiouàèéíòóú]/i.test(n)?`«${n}» comença per vocal o h: l'article s'apostrofa.`:`«${n}» comença per consonant: l'article no canvia.`,`Resposta: <b>${ans}</b>.`],
    err:v=>v[0]===ans?null:(iu&&v[0]==="l'"+n?'ct4_apostrof_iu':(v[0]===base+' '+n||v[0]==="l'"+n?'ct4_apostrof':null))})}},
 c4_demostratius:{mat:'catala',ab:'Dm',curs:[4],nom:'Els demostratius',
  teoria:['Els <b>demostratius</b> acompanyen el nom i diuen si una cosa és <b>a prop</b> o <b>lluny</b> de qui parla.',
   `<table class="mini"><tr><th></th><th>masc. sing.</th><th>fem. sing.</th><th>masc. pl.</th><th>fem. pl.</th></tr><tr><td>A prop</td><td>aquest</td><td>aquesta</td><td>aquests</td><td>aquestes</td></tr><tr><td>Lluny</td><td>aquell</td><td>aquella</td><td>aquells</td><td>aquelles</td></tr></table>`,
   'Exemple: <b>aquest</b> llibre (el tenc a la mà), <b>aquelles</b> muntanyes (són lluny).'],
  gen(){const[n,g,nb]=pick(C4_NOMS),d=pick(['a','l']),ans=C4_DEM[d][g+nb];
   return caEx(`Completa amb un demostratiu. La cosa és <b>${d==='a'?'a prop':'lluny'}</b>:<br><b>___ ${n}</b>`,[ans],{label:'Demostratiu',hints:['Mira la taula de la teoria: hi ha una fila per a les coses que són a prop i una altra per a les que són lluny.','Ha de concordar amb el nom: masculí o femení, singular o plural?'],
    steps:[`«${n}» és ${g==='m'?'masculí':'femení'} ${nb==='s'?'singular':'plural'} i és ${d==='a'?'a prop':'lluny'}.`,`Resposta: <b>${ans} ${n}</b>.`],
    err:v=>{const x=v[0].split(' ')[0];if(x===ans)return null;if(Object.values(C4_DEM[d]).includes(x))return'ct4_demo_concord';if(Object.values(C4_DEM[d==='a'?'l':'a']).includes(x))return'ct4_demo_dist';return null}})}},
 c4_possessius:{mat:'catala',ab:'Ps',curs:[4],nom:'Els possessius',
  teoria:['Els <b>possessius</b> diuen de qui és una cosa. Van amb l\'article: <b>el meu</b> llibre, <b>la teva</b> casa.',
   `<table class="mini"><tr><th></th><th>m. s.</th><th>f. s.</th><th>m. pl.</th><th>f. pl.</th></tr><tr><td>jo</td><td>meu</td><td>meva</td><td>meus</td><td>meves</td></tr><tr><td>tu</td><td>teu</td><td>teva</td><td>teus</td><td>teves</td></tr><tr><td>ell, ella</td><td>seu</td><td>seva</td><td>seus</td><td>seves</td></tr><tr><td>nosaltres</td><td>nostre</td><td>nostra</td><td>nostres</td><td>nostres</td></tr><tr><td>vosaltres</td><td>vostre</td><td>vostra</td><td>vostres</td><td>vostres</td></tr></table>`],
  gen(){const[n,g,nb]=pick(C4_NOMS),[pr,F]=pick(C4_POSS),A=c4Alts(F[g+nb]),art=c4Art(g,nb,'x');
   return caEx(`${caCap(nb==='s'?'aquest'+(g==='f'?'a':''):'aquest'+(g==='f'?'es':'s'))} ${n} ${nb==='s'?'és':'són'} <b>${C4_DE_PRON[pr]}</b>. Completa:<br><b>${caCap(nb==='s'?'és':'són')} ${art} ___ ${n}.</b>`,[...A,...A.map(a=>art+' '+a),...A.map(a=>art+' '+a+' '+n)],{label:'Possessiu',
    hints:[`De qui és? De ${pr}. Busca la fila de «${pr}» a la taula de la teoria.`,'Ha de concordar amb el nom: masculí o femení, singular o plural?'],
    steps:[`És ${C4_DE_PRON[pr]} i «${n}» és ${g==='m'?'masculí':'femení'} ${nb==='s'?'singular':'plural'}.`,`Resposta: <b>${art} ${A[0]} ${n}</b>.`],
    err:v=>{const all=C4_POSS.flatMap(([,G])=>Object.values(G).flatMap(c4Alts)),x=v[0].split(' ').find(w=>all.includes(w))||v[0];if(A.includes(x))return null;if(Object.values(F).some(f=>c4Alts(f).includes(x)))return'ct4_poss_concord';if(C4_POSS.some(([,G])=>c4Alts(G[g+nb]).includes(x)))return'ct4_poss_persona';return null}})}},
/* ===== U6 Grans dones! ===== */
 c4_voc_invents:{mat:'catala',ab:'Vi',curs:[4],nom:'Vocabulari: els invents',
  teoria:['Moltes dones i molts homes han fet <b>invents</b> que ens canvien la vida: el telèfon, la bombeta, la rentadora, l\'ordinador...','Per <b>descriure un objecte</b> deim què és, com és (forma, mida, color, material), quines parts té i per a què serveix.'],
  gen:c4Vocab(C4_V_INVENTS,'Pensa en invents i aparells que fem servir: per a què serveixen?')},
 c4_puntuacio:{mat:'catala',ab:'Cp',curs:[4],nom:'La coma i el punt',
  teoria:['El <b>punt</b> (.) marca el final d\'una oració. Després del punt escrivim amb majúscula.',
   'La <b>coma</b> (,) indica una pausa curta. La feim servir per separar les paraules d\'una <b>enumeració</b> (una llista): «Vull pomes<b>,</b> peres<b>,</b> prunes i maduixes».',
   'Compte: davant de la <b>i</b> final de la llista <b>no</b> hi posam coma.'],
  gen(lv){const r=Math.random();
   if(lv>0&&r<.35){const[a,b]=pick(C4_PUNT),last=a.split(' ').pop();
    return caEx(`Aquí hi ha dues oracions, però falta el punt:<br><i>${a} ${b}</i><br>Darrere de quina paraula hi ha d'anar el <b>punt</b>?`,[last],{label:'Paraula',
     hints:['Busca on s\'acaba la primera idea i en comença una altra.','Després del punt, la paraula següent aniria amb majúscula.'],steps:[`Primera oració: «${caCap(a)}.»`,`El punt va darrere de <b>${last}</b>.`]})}
   const[intro,L]=pick(C4_ENUM),k=lv===0?rnd(3,4):rnd(4,5),it=c4Sample(L,k),fr=`${intro} ${it.slice(0,-1).join(' ')} i ${it[k-1]}.`;
   if(lv>0&&r<.7){const ws=it.slice(0,-2).map(x=>x.split(' ').pop()).join(' ');
    return caEx(`Falten les comes en aquesta enumeració:<br><i>${fr}</i><br>Escriu les paraules que van just <b>abans de cada coma</b>.`,[ws],{label:'Paraules',hints:['A cada element de la llista li segueix una coma, menys als dos darrers.','Davant de la i no hi va coma.'],
     steps:[`Amb comes: «${intro} ${it.slice(0,-1).join(', ')} i ${it[k-1]}.»`,`Les comes van darrere de: <b>${ws}</b>.`]})}
   return caEx(`Quantes <b>comes</b> falten en aquesta frase?<br><i>${fr}</i>`,[String(k-2)],{label:'Nombre de comes',hints:['Compta els elements de la llista.','Davant de la i no hi va coma.'],
    steps:[`Hi ha ${k} elements: ${it.join(' / ')}.`,`Amb comes: «${intro} ${it.slice(0,-1).join(', ')} i ${it[k-1]}.»`,`Falten <b>${k-2}</b> comes.`],err:v=>v[0]===String(k-1)?'ct4_coma_i':null})}},
 c4_numerals:{mat:'catala',ab:'Nm',curs:[4],nom:'Els numerals',
  teoria:['Els <b>numerals cardinals</b> diuen quantitat: <b>un</b>, <b>dos</b>, <b>tres</b>... Els <b>ordinals</b> diuen l\'ordre: <b>primer</b>, <b>segon</b>, <b>tercer</b>, <b>quart</b>, <b>cinquè</b>...',
   'En lletres, posam <b>guionet</b> entre les desenes i les unitats (<b>trenta-cinc</b>), i entre les desenes, la <b>i</b> i les unitats de la vintena (<b>vint-i-tres</b>). També entre les unitats i <b>-cents</b> (<b>tres-cents</b>).',
   'Abreviatures dels ordinals: 1r, 2n, 3r, 4t, 5è... (masculí) i 1a, 2a, 3a, 4a, 5a... (femení). Als ordinals de 5è endavant: cinquè / cinquena, sisè / sisena.',
   'A les Illes també es diu <b>desset</b>, <b>devuit</b> i <b>denou</b>.'],
  gen(lv){const r=Math.random();
   if(r<.3){const[nm,g]=pick(C4_ORD_N),n=rnd(1,lv===0?10:20),O=c4Ord(n),A=O[g],ab=g==='m'?O.am:O.af;
    return caEx(`Escriu l'ordinal en lletres:<br><b>${g==='m'?'el':'la'} ${ab} ${nm}</b>`,A,{label:'Ordinal',hints:['Els ordinals diuen l\'ordre, com les posicions d\'una cursa. Llegeix el número i pensa com el diries en una cursa.',`«${nm}» és ${g==='m'?'masculí':'femení'}: l'ordinal també ho ha de ser.`],
     steps:[`${ab} = ${O.m[0]} (masculí) / ${O.f[0]} (femení).`,`Resposta: <b>${g==='m'?'el':'la'} ${A[0]} ${nm}</b>.`],err:v=>O[g==='m'?'f':'m'].includes(v[0])?'ct4_ord_genere':null})}
   const n=lv===0?rnd(11,99):lv===1?rnd(21,199):rnd(100,999),A=c4Lletres(n);
   if(r<.55)return caEx(`Escriu amb xifres:<br><b>${A[0]}</b>`,[String(n)],{label:'Nombre',hints:['Llegeix-lo a poc a poc: primer les centenes, després les desenes i les unitats.','vint = 20, trenta = 30, quaranta = 40, cinquanta = 50...'],steps:[`«${A[0]}» = <b>${n}</b>.`]});
   const e1=n%100===45?'seixanta-set':'quaranta-cinc',e2=n%100===26?'vint-i-vuit':'vint-i-sis';
   return caEx(`Escriu en lletres el nombre <b>${n}</b>.`,A,{label:'En lletres',hints:[`Recorda el guionet entre desenes i unitats (${e1}) i a la vintena (${e2}).`,n>=100?'Les centenes: cent, dos-cents, tres-cents... (amb guionet).':'Primer les desenes i després les unitats.'],
    steps:c4Steps([n>=100?`${Math.floor(n/100)*100} = ${c4Lletres(Math.floor(n/100)*100)[0]}.`:'',n%100?`${n%100} = ${c4Lletres(n%100)[0]}.`:'',`${n} = <b>${A[0]}</b>.`]),
    err:v=>!A.includes(v[0])&&A.some(a=>a.replace(/-/g,' ')===v[0].replace(/-/g,' '))?'ct4_num_guionet':null})}},
/* ===== U7 Recitem ===== */
 c4_voc_arbres:{mat:'catala',ab:'Va',curs:[4],nom:'Vocabulari: arbres i flors',teoria:['Molts arbres prenen el nom del seu fruit: l\'<b>ametller</b> fa ametles, el <b>taronger</b> fa taronges, la <b>figuera</b> fa figues, l\'<b>olivera</b> fa olives.','Les parts de l\'arbre són l\'arrel, el <b>tronc</b>, les branques i les fulles. Les flors tenen pètals de colors.'],
  gen:c4Vocab(C4_V_ARBRES,'Pensa en els arbres i les flors: molts arbres es diuen com el seu fruit.')},
 c4_metafora:{mat:'catala',ab:'Mt',curs:[4],nom:'La comparació i la metàfora',
  teoria:['La <b>comparació</b> diu que una cosa s\'assembla a una altra i fa servir <b>com</b>: «Els teus ulls són <b>com</b> dues estrelles».',
   'La <b>metàfora</b> diu directament que una cosa <b>és</b> una altra, sense «com»: «La lluna <b>és</b> un plat de plata».','Els poetes les fan servir per fer els versos més bonics i expressius.'],
  gen(lv){const[f,t,real,img]=pick(C4_MET),A=c4Alts(img);
   if(lv>0&&Math.random()<.4&&!/^qui /.test(real))return caEx(`Amb què es compara <b>${real}</b> en aquesta frase?<br><i>${f}</i>`,A,{label:'Amb què es compara',loose:true,
    hints:['Busca la imatge: la cosa a la qual s\'assembla.',t==='comparació'?'Mira què hi ha darrere de «com».':'Mira què hi ha darrere del verb «és» o «són».'],steps:[`${caCap(real)} es compara amb <b>${A[0]}</b>.`]});
   return caEx(`Aquesta frase té una comparació o una metàfora?<br><i>${f}</i>`,[t],{label:'Comparació o metàfora',loose:true,hints:['Busca la paraula «com».','Si diu que una cosa «és» una altra, sense «com», és una metàfora.'],
    steps:[t==='comparació'?'Fa servir «com» per comparar.':'Diu que una cosa «és» una altra, sense «com».',`És una <b>${t}</b>.`]})}},
 c4_silaba:{mat:'catala',ab:'St',curs:[4],nom:'La síl·laba tònica',
  teoria:['La <b>síl·laba tònica</b> és la que sona més forta: ca-mi-<b>ó</b>, <b>ca</b>-sa. Les altres són <b>àtones</b>.',
   'Comptant des del final: si la tònica és la <b>darrera</b> síl·laba, la paraula és <b>aguda</b> (so-<b>fà</b>); si és la <b>penúltima</b>, és <b>plana</b> (<b>ca</b>-sa); si és l\'<b>antepenúltima</b>, és <b>esdrúixola</b> (<b>mú</b>-si-ca).',
   'Truc: digues la paraula com si cridassis algú (caaaa-sa!): la síl·laba que allargues és la tònica.'],
  gen(lv){const[s,i]=pick(C4_SIL),S=s.split('-'),w=S.join(''),t=['aguda','plana','esdrúixola'][S.length-1-i];
   return{text:`Observa la paraula «<b>${w}</b>» (${S.join(' - ')}).<br>Quina és la síl·laba tònica? És aguda, plana o esdrúixola?`,fields:[{label:'Síl·laba tònica',txt:[S[i]],loose:true,wide:true},{label:'Aguda, plana o esdrúixola',txt:[t],loose:true,wide:true}],vis:null,
    hints:['Digues la paraula com si cridassis algú: quina síl·laba allargues?','Després compta des del final: darrera → aguda, penúltima → plana, antepenúltima → esdrúixola.'],
    steps:[`Síl·labes: ${S.map((x,j)=>j===i?`<b>${x}</b>`:x).join(' - ')}. La tònica és <b>${S[i]}</b>.`,`És la ${['darrera','penúltima','antepenúltima'][S.length-1-i]} síl·laba: la paraula és <b>${t}</b>.`],
    err:v=>fold(v[0])===fold(S[i])&&v[1]!==t&&['aguda','plana','esdrúixola','esdruixola'].includes(v[1])?'ct4_tipus_accent':null}}},
 c4_concordanca:{mat:'catala',ab:'Cc',curs:[4],nom:'La concordança del nom i l\'adjectiu',
  teoria:['L\'adjectiu ha de <b>concordar</b> amb el nom: si el nom és femení, l\'adjectiu també; si el nom és plural, l\'adjectiu també.',
   'Exemples: arbre <b>alt</b>, flor <b>blanca</b>, arbres <b>alts</b>, flors <b>blanques</b>.','Compte amb l\'ortografia: blanca → blan<b>qu</b>es, groga → gro<b>gu</b>es. Alguns adjectius són iguals en masculí i en femení: gran, feliç.'],
  gen(lv){const[n,g,nb]=pick(C4_CONC_N),F=pick(C4_ADJF.filter(x=>lv>0||!['feliç','gran','dolç','antic','llarg'].includes(x[0]))),i=(g==='m'?0:1)+(nb==='p'?2:0),ans=F[i];
   return caEx(`Escriu l'adjectiu ben concordat:<br><b>${c4ArtW(g,nb,n)} (${F[0]})</b>`,[ans],{label:'Adjectiu',hints:[`«${n}» és ${g==='m'?'masculí':'femení'} i ${nb==='s'?'singular':'plural'}. L'adjectiu també ho ha de ser.`,'Compte amb l\'ortografia en fer el femení plural (-ques, -gues, -ves...).'],
    steps:[`«${n}» és ${g==='m'?'masculí':'femení'} ${nb==='s'?'singular':'plural'}.`,`Resposta: <b>${c4ArtW(g,nb,n)} ${ans}</b>.`],
    err:v=>{if(v[0]===ans)return null;if(/as$/.test(v[0])&&/es$/.test(ans))return'ct4_plural_as';if(F.includes(v[0]))return'ct4_concord';return null}})}},
 c4_poema:{mat:'catala',ab:'Po',curs:[4],nom:'El poema',
  teoria:['Un <b>poema</b> està escrit en <b>versos</b> (cada línia és un vers). Un grup de versos és una <b>estrofa</b>; entre estrofa i estrofa hi ha un espai.',
   'Molts poemes tenen <b>rima</b>: les paraules del final dels versos sonen igual a partir de la darrera vocal forta (call<b>ada</b> / rent<b>ada</b>).','Per recitar un poema, llegeix-lo a poc a poc, fent una petita pausa al final de cada vers.'],
  gen(lv){const P=pick(C4_POEMES),nv=P.e.reduce((s,e)=>s+e.length,0),ne=P.e.length,html=`<b>${P.t}</b><div style="font-size:17px;line-height:1.6;background:var(--bg);padding:14px 16px;margin:10px 0">${P.e.map(e=>e.join('<br>')).join('<br><br>')}</div>`,r=Math.random();
   if(r<.33)return caEx(`${html}Quants <b>versos</b> té aquest poema?`,[String(nv)],{label:'Versos',hints:['Cada línia del poema és un vers.','Compta les línies de totes les estrofes.'],steps:[`Estrofes: ${P.e.map(e=>e.length+' versos').join(' + ')}.`,`En total: <b>${nv}</b> versos.`],err:v=>v[0]===String(ne)?'ct4_vers_estrofa':null});
   if(r<.55)return caEx(`${html}Quantes <b>estrofes</b> té aquest poema?`,[String(ne)],{label:'Estrofes',hints:['Una estrofa és un grup de versos.','Entre una estrofa i l\'altra hi ha un espai en blanc.'],steps:[`Hi ha <b>${ne}</b> grup${ne>1?'s':''} de versos separats per un espai.`],err:v=>v[0]===String(nv)?'ct4_vers_estrofa':null});
   const[a,b]=pick(P.r),sw=Math.random()<.5,[x,y]=sw?[b,a]:[a,b];
   return caEx(`${html}Quina paraula del final d'un vers <b>rima</b> amb «<b>${x}</b>»?`,[y],{label:'Paraula que rima',loose:true,hints:['Mira les paraules del final de cada vers.',`Busca la que sona igual que «${x}» a partir de la darrera vocal forta.`],steps:[`«${x}» i «<b>${y}</b>» rimen.`]})}},
/* ===== U8 De la pedra al xip ===== */
 c4_voc_escriptura:{mat:'catala',ab:'Ve',curs:[4],nom:'Vocabulari: l\'escriptura',teoria:['Fa milers d\'anys es gravava a la pedra; els egipcis escrivien <b>jeroglífics</b> damunt <b>papir</b>; a l\'edat mitjana, els <b>copistes</b> copiaven llibres en <b>pergamí</b>; la <b>impremta</b> va permetre fer molts de llibres; i ara escrivim amb l\'<b>ordinador</b>.'],
  gen:c4Vocab(C4_V_ESCRIURE,'Pensa en com s\'ha escrit al llarg de la història: materials, estris i persones.')},
 c4_accent:{mat:'catala',ab:'Ac',curs:[4],nom:'L\'accentuació',
  teoria:['Algunes paraules porten <b>accent</b> damunt la vocal de la síl·laba tònica. Depèn del tipus de paraula:',
   `<table class="mini"><tr><td><b>Agudes</b></td><td>porten accent si acaben en <b>vocal</b>, <b>-as, -es, -is, -os, -us</b>, <b>-en, -in</b></td><td>sofà, camió, francès, també</td></tr><tr><td><b>Planes</b></td><td>porten accent si <b>no</b> acaben així</td><td>fàcil, telèfon, còmic</td></tr><tr><td><b>Esdrúixoles</b></td><td>porten accent <b>sempre</b></td><td>música, pàgina</td></tr></table>`,
   'L\'accent pot ser <b>obert</b> (à, è, ò) o <b>tancat</b> (é, í, ó, ú). La <b>a</b> sempre el duu obert (à) i la <b>i</b> i la <b>u</b>, sempre tancat (í, ú).'],
  gen(lv){const[w,t]=pick(CA_ACC.filter(x=>lv>0||!x[2])),s=CA_STRIP(w);
   return caEx(`Escriu la paraula ben accentuada (si cal):<br><b>${s}</b>`,[w],{label:'Ben escrita',hints:['Primer troba la síl·laba tònica i digues si és aguda, plana o esdrúixola.',t==='e'?'Les esdrúixoles sempre porten accent.':t==='a'?'Les agudes porten accent si acaben en vocal, -as, -es, -is, -os, -us, -en, -in.':'Les planes porten accent si NO acaben en vocal, -as, -es, -is, -os, -us, -en, -in.'],
    steps:[`«${s}» és <b>${CA_TIPUS[t]}</b>.`,t==='e'?'Les esdrúixoles sempre porten accent.':w===s?`Per la terminació, aquesta ${CA_TIPUS[t]} <b>no</b> porta accent.`:`Per la terminació, aquesta ${CA_TIPUS[t]} <b>sí</b> que porta accent.`,`S'escriu: <b>${w}</b>.`],
    err:v=>{const e=caAccentErr(w,v[0]);return e?e.replace('ca_','ct4_'):null}})}},
 c4_temps:{mat:'catala',ab:'Tm',curs:[4],nom:'Els temps verbals',
  teoria:['El verb ens diu <b>quan</b> passa una acció:','<b>Passat</b>: ja ha passat (ahir <b>vaig jugar</b>, <b>jugava</b>). <b>Present</b>: passa ara (avui <b>jugo</b>). <b>Futur</b>: passarà més endavant (demà <b>jugaré</b>).',
   'Pistes: el passat sovint porta <b>vaig, vas, va...</b> davant o acaba en <b>-ava</b>, <b>-ia</b>; el futur porta l\'infinitiu sencer i <b>-é, -às, -à</b> (cantar<b>é</b>).'],
  gen(lv){const[inf,mod]=pick(CA_VERBS.filter(x=>x[1]!=='3i'||lv>0));
   if(lv>0&&Math.random()<.4){const t=pick(['perif','fut','pres']),pi=rnd(0,5),f=caConj(inf,mod,t)[pi],T={perif:'passat',fut:'futur',pres:'present'}[t],ex={perif:'ahir',fut:'demà',pres:'avui'}[t];
    return caEx(`Escriu el verb <b>${inf}</b> en <b>${T}</b>:<br>${caCap(ex)}, <b>${CA_PERS[pi]}</b> ___`,f,{label:'Forma verbal',hints:[t==='perif'?'Per al passat pots fer servir vaig, vas, va, vam, vau, van + infinitiu.':t==='fut'?'El futur es fa amb l\'infinitiu + é, às, à, em, eu, an.':'El present és el que passa ara.',`Fixa't en la persona: ${CA_PERS[pi]}.`],
     steps:[`${caCap(T)} de «${inf}»: ${caConj(inf,mod,t).map((x,i)=>CA_PERS[i]+' '+x[0]).join(', ')}.`,`Resposta: <b>${CA_PERS[pi]} ${f.join(' / ')}</b>.`]})}
   const t=pick(['pres','imp','perif','fut']),pi=rnd(0,5),f=caConj(inf,mod,t)[pi][0],T={pres:'present',imp:'passat',perif:'passat',fut:'futur'}[t];
   return caEx(`En quin temps està el verb «<b>${f}</b>»: passat, present o futur?`,[T],{label:'Temps',loose:true,hints:['Prova de posar-hi davant «ahir», «avui» o «demà». Quina sona bé?','Pistes: vaig..., -ava, -ia → passat; -é, -às, -à → futur.'],
    steps:[t==='perif'?'Porta vaig, vas, va... davant: és passat.':t==='imp'?'Acaba en -ava o -ia: és passat.':t==='fut'?'Porta l\'infinitiu sencer i una terminació de futur.':'Diu el que passa ara.',`És <b>${T}</b>.`],err:v=>['passat','present','futur'].includes(v[0])&&v[0]!==T?'ct4_temps':null})}},
/* ===== U9 Anem d'estrena! ===== */
 c4_voc_teatre:{mat:'catala',ab:'Vt',curs:[4],nom:'Vocabulari: el teatre',teoria:['Al <b>teatre</b>, els <b>actors</b> i les <b>actrius</b> representen una obra damunt l\'<b>escenari</b>, davant del <b>públic</b>. Quan comença, s\'obre el <b>teló</b>.','El text teatral té els noms dels personatges, els <b>diàlegs</b> i les <b>acotacions</b> (entre parèntesis), que expliquen què fan.'],
  gen:c4Vocab(C4_V_TEATRE,'Pensa en el teatre: el lloc, les persones i les parts d\'una obra.')},
 c4_formalitat:{mat:'catala',ab:'Fr',curs:[4],nom:'El grau de formalitat',
  teoria:['No parlam igual amb un amic que amb el director de l\'escola. Amb la família i els amics feim servir un llenguatge <b>informal</b> («Ei, què tal?»). Amb persones grans que no coneixem o en situacions serioses, un llenguatge <b>formal</b> («Bon dia, com està?»).',
   'En el llenguatge formal sovint tractam la persona de <b>vostè</b>: tu <b>tens</b> → vostè <b>té</b>; tu <b>vols</b> → vostè <b>vol</b>. El verb va com amb «ell / ella».'],
  gen(lv){if(lv>0&&Math.random()<.5){const[t,v]=pick(C4_VOSTE),T=c4Alts(t)[0];
    return caEx(`Passa al tractament de <b>vostè</b>:<br>tu <b>${T}</b> → vostè ___`,[v],{label:'Verb',hints:['Amb vostè, el verb va igual que amb «ell» o «ella».',`Pensa com diries: «ell ___».`],steps:[`Tu ${T} → ell ${v} → vostè <b>${v}</b>.`],err:v2=>v2[0]===caLow(T)?'ct4_formal_tu':null})}
   const[f,t]=pick(C4_FORM);
   return caEx(`Aquesta frase és formal o informal?<br><i>${f}</i>`,[t],{label:'Formal o informal',loose:true,hints:['Pensa a qui ho podries dir: a un amic o a una persona gran que no coneixes?','Fixa\'t si fa servir «vostè», «disculpi», «senyor/a»... o paraules de confiança.'],
    steps:[t==='formal'?'Fa servir paraules de respecte (vostè, disculpi, senyor...).':'Fa servir paraules de confiança, com amb els amics.',`És <b>${t}</b>.`]})}},
 c4_ava_bv:{mat:'catala',ab:'Bv',curs:[4],nom:'Verbs en -ava i paraules amb b i v',
  teoria:['Els verbs acabats en <b>-ar</b> fan el passat (imperfet) en <b>-ava</b>, sempre amb <b>v</b>: jo cant<b>ava</b>, tu cant<b>aves</b>, ell cant<b>ava</b>, nosaltres cant<b>àvem</b>, vosaltres cant<b>àveu</b>, ells cant<b>aven</b>.',
   'Compte amb l\'accent de <b>-àvem</b> i <b>-àveu</b>.','Per a la resta de paraules amb <b>b</b> o <b>v</b>, pensa en paraules de la mateixa família (cavall → cavaller). Darrere <b>m</b> s\'escriu <b>b</b> (bombolla) i darrere <b>n</b>, <b>v</b> (enviar, convidar).'],
  gen(lv){if(Math.random()<.5){const[inf]=pick(CA_VERBS.filter(x=>x[1]==='1')),pi=rnd(0,5),f=caConj(inf,'1','imp')[pi][0];
    return caEx(`Escriu el verb en passat (imperfet):<br>Quan era petit, <b>${CA_PERS[pi]}</b> ___ (<b>${inf}</b>) cada dia.`,[f],{label:'Verb',hints:['Els verbs en -ar fan el passat en -ava, -aves, -ava, -àvem, -àveu, -aven.','Fixa\'t en la persona i recorda l\'accent de nosaltres i vosaltres.'],
     steps:[`${inf}: jo ${inf.slice(0,-2)}ava, tu ${inf.slice(0,-2)}aves, ell ${inf.slice(0,-2)}ava, nosaltres ${inf.slice(0,-2)}àvem, vosaltres ${inf.slice(0,-2)}àveu, ells ${inf.slice(0,-2)}aven.`,`Resposta: <b>${f}</b>.`],
     err:v=>v[0]===f?null:(v[0]===f.replace('v','b')?'ct4_ava_b':(CA_STRIP(v[0])===CA_STRIP(f)?'ct4_ava_accent':null))})}
   const[w,gap]=pick(C4_BV),ok=w[gap.indexOf('_')],bad=w.slice(0,gap.indexOf('_'))+(ok==='b'?'v':'b')+w.slice(gap.indexOf('_')+1);
   return caEx(`Escriu la paraula completa:<br><b>${gap}</b> <span class="muted">(b / v)</span>`,[w],{label:'Paraula',hints:['Pensa en una paraula de la mateixa família.','Darrere m va b; darrere n va v.'],
    steps:[/m_/.test(gap)?'Darrere m s\'escriu b.':/n_/.test(gap)?'Darrere n s\'escriu v.':`No hi ha regla fixa: es recorda (o es pensa en la família de paraules).`,`S'escriu: <b>${w}</b>.`],err:v=>v[0]===bad?'ct4_bv':null})}},
 c4_persona_nombre:{mat:'catala',ab:'Pn',curs:[4],nom:'La persona i el nombre del verb',
  teoria:['El verb canvia segons <b>qui</b> fa l\'acció. Això és la <b>persona</b> i el <b>nombre</b>:',
   `<table class="mini"><tr><th></th><th>Singular</th><th>Plural</th></tr><tr><td>1a persona</td><td>jo canto</td><td>nosaltres cantam / cantem</td></tr><tr><td>2a persona</td><td>tu cantes</td><td>vosaltres cantau / canteu</td></tr><tr><td>3a persona</td><td>ell, ella canta</td><td>ells, elles canten</td></tr></table>`,
   'La 1a persona és qui parla; la 2a, a qui parlam; la 3a, de qui parlam.'],
  gen(lv){let inf,mod,t,pi,forms,f;for(let k=0;k<50;k++){[inf,mod]=pick(CA_VERBS.filter(x=>lv>0||x[1]==='1'));t=pick(lv>0?['pres','imp','fut']:['pres','fut']);pi=rnd(0,5);forms=caConj(inf,mod,t);f=forms[pi][0];
    if(!forms.some((x,j)=>j!==pi&&x.includes(f)))break}
   const P=['primera','segona','tercera'][pi%3],N=pi<3?'singular':'plural',PA=[P,(pi%3+1)+'a',P+' persona',(pi%3+1)+'a persona',String(pi%3+1)];
   return{text:`De quina persona i de quin nombre és el verb «<b>${f}</b>»?`,fields:[{label:'Persona (1a, 2a o 3a)',txt:PA,loose:true,wide:true},{label:'Singular o plural',txt:[N],loose:true,wide:true}],vis:null,
    hints:['Prova de posar-hi davant jo, tu, ell, nosaltres, vosaltres o ells. Quin encaixa?','Jo, tu, ell → singular; nosaltres, vosaltres, ells → plural.'],steps:[`Diem «${CA_PERS[pi]} ${f}».`,`És <b>${P} persona</b> del <b>${N}</b>.`],
    err:v=>PA.some(a=>fold(a)===fold(v[0]))&&v[1]!==N&&['singular','plural'].includes(v[1])?'ct4_pers_nombre':null}}},
/* ===== U10 Animals bestials ===== */
 c4_compostes:{mat:'catala',ab:'Pc',curs:[4],nom:'Les paraules compostes',
  teoria:['Una <b>paraula composta</b> es forma ajuntant <b>dues paraules</b>: <b>para</b> + <b>aigua</b> = <b>paraigua</b>; <b>gratar</b> + <b>cel</b> = <b>gratacel</b>; <b>rentar</b> + <b>plats</b> = <b>rentaplats</b>.',
   'Si la primera paraula és un verb, en perd la -r: rentar → <b>renta</b>plats.','Algunes porten <b>guionet</b>: <b>pit-roig</b>, <b>gira-sol</b>, <b>para-sol</b> (sense guionet, «parasol» es llegiria amb so de «z»).'],
  gen(lv){const[a,b,c,d,g]=pick(C4_COMP.filter(x=>lv>0||!x[4]));
   if(lv>0&&Math.random()<.4)return caEx(`Quina paraula composta vol dir...?<br><i>${d}</i>`,[c],{label:'Paraula composta',loose:true,hints:['Pensa en dues paraules que, juntes, diguin per a què serveix.',c4Ini(c)],steps:[`${a} + ${b} = <b>${c}</b>.`]});
   return caEx(`Ajunta les dues paraules i escriu la paraula composta:<br><b>${a} + ${b}</b>`,[c],{label:'Paraula composta',hints:[/r$/.test(a)?'Si la primera paraula és un verb, perd la -r final.':'Escriu les dues paraules juntes.',g?'Compte: aquesta paraula porta guionet.':'Mira bé com s\'escriu la unió.'],
    steps:[c4Steps([/r$/.test(a)?`«${a}» perd la -r.`:'',g?'Porta guionet.':'',`${a} + ${b} = <b>${c}</b>.`])].flat(),err:v=>v[0]===c?null:(g&&v[0]===c.replace('-','')?'ct4_compost_guionet':(v[0].includes(' ')&&v[0].replace(/ /g,'')===c.replace('-','')?'ct4_compost_separat':null))})}},
 c4_x_ix:{mat:'catala',ab:'Xx',curs:[4],nom:'Paraules amb x, ix, tx, ig',
  teoria:['El so «x» (com a xocolata) s\'escriu:','<b>x</b> a principi de paraula (<b>x</b>ai), darrere consonant (pun<b>x</b>a) i darrere i (gui<b>x</b>); <b>ix</b> darrere les altres vocals (ca<b>ix</b>a, pe<b>ix</b>).',
   'El so «txa» s\'escriu <b>tx</b> enmig de paraula (co<b>tx</b>e) i a vegades al final (despa<b>tx</b>); a final de paraula darrere vocal, sovint <b>ig</b> (ma<b>ig</b>, ro<b>ig</b>).'],
  gen(lv){const[w,gap,opt,k]=pick(C4_XIX.filter(x=>lv>0||!['despatx','marxar','coixí'].includes(x[0])));
   return caEx(`Escriu la paraula completa:<br><b>${gap}</b> <span class="muted">(${opt})</span>`,[w],{label:'Paraula',hints:['Digues-la a poc a poc: sona «x» (com a xerrar) o «txa» (com a escletxa)?','Mira on és el so: a principi, darrere consonant, darrere vocal o a final de paraula?'],
    steps:[C4_XIX_N[k],`S'escriu: <b>${w}</b>.`],err:v=>{if(v[0]===w)return null;const pre=gap.split('_')[0],post=gap.split('_')[1];if(v[0].startsWith(pre)&&v[0].endsWith(post)&&['x','ix','tx','ig','tg','ch'].includes(v[0].slice(pre.length,v[0].length-post.length)))return'ct4_x_ix';return null}})}},
 c4_pronoms:{mat:'catala',ab:'Pf',curs:[4],nom:'Els pronoms personals',
  teoria:['Els <b>pronoms personals forts</b> substitueixen el nom de les persones: <b>jo</b>, <b>tu</b>, <b>ell</b> / <b>ella</b>, <b>nosaltres</b>, <b>vosaltres</b>, <b>ells</b> / <b>elles</b>. «La Marta i jo» → <b>nosaltres</b>.',
   'Els <b>pronoms febles</b> són curts i van enganxats al verb. Substitueixen una cosa que ja hem dit: «Compro <b>el pa</b>» → «<b>El</b> compro». «Tanco <b>la porta</b>» → «<b>La</b> tanco».',
   `<table class="mini"><tr><td>masculí singular</td><td><b>el</b> (l' davant vocal)</td></tr><tr><td>femení singular</td><td><b>la</b> (l' davant vocal)</td></tr><tr><td>masculí plural</td><td><b>els</b></td></tr><tr><td>femení plural</td><td><b>les</b></td></tr></table>`],
  gen(lv){if(Math.random()<.5){let P=c4Sample(C4_PERS,rnd(1,2)).map(([n,g])=>[n,g]);const r=Math.random();if(r<.25)P=[...P.slice(0,1),['jo','x']];else if(r<.45)P=[...P.slice(0,1),['tu','x']];
    const has=x=>P.some(p=>p[0]===x),ans=has('jo')?'nosaltres':has('tu')?'vosaltres':P.length===1?(P[0][1]==='f'?'ella':'ell'):(P.every(p=>p[1]==='f')?'elles':'ells'),txt=P.length===1?P[0][0]:P.map(p=>p[0]).join(' i ');
    return caEx(`Quin pronom personal fort substitueix «<b>${txt}</b>»?`,[ans],{label:'Pronom',hints:['Si hi ets tu qui parla (jo), és nosaltres; si hi és la persona a qui parles (tu), vosaltres.','Si són dues persones o més: ells (si n\'hi ha cap de masculí) o elles (si totes són femenines).'],
     steps:[has('jo')?'Hi ha «jo»: el grup és nosaltres.':has('tu')?'Hi ha «tu» (i no «jo»): el grup és vosaltres.':P.length===1?`És una persona ${P[0][1]==='f'?'femenina':'masculina'}.`:P.every(p=>p[1]==='f')?'Són persones femenines.':'Hi ha alguna persona masculina.',`Resposta: <b>${ans}</b>.`],
     err:v=>{if(v[0]===ans)return null;if((ans==='ells'&&v[0]==='elles')||(ans==='elles'&&v[0]==='ells')||(ans==='ell'&&v[0]==='ella')||(ans==='ella'&&v[0]==='ell'))return'ct4_pronom_genere';if(['nosaltres','vosaltres','ells','elles'].includes(ans)&&['nosaltres','vosaltres','ells','elles'].includes(v[0]))return'ct4_pronom_persona';return null}})}
   const[vb,obj,g,n,voc]=pick(C4_FEB.filter(x=>lv>0||!x[4])),pr=n==='p'?(g==='m'?'els':'les'):(voc?"l'":(g==='m'?'el':'la')),vl=caLow(vb),ans=pr==="l'"?pr+vl:pr+' '+vl;
   return caEx(`Canvia les paraules destacades per un <b>pronom feble</b> i escriu la frase nova:<br><i>${vb} <b><u>${obj}</u></b>.</i>`,[ans],{label:'Frase nova',hints:[`«${obj}» és ${g==='m'?'masculí':'femení'} ${n==='s'?'singular':'plural'}: el, la, els o les?`,'El pronom feble va davant del verb.'+(voc?' Si el verb comença per vocal, el pronom s\'apostrofa.':'')],
    steps:[`«${obj}» → <b>${pr}</b>${voc&&n==='s'?' (el verb comença per vocal: s\'apostrofa)':''}.`,`Frase nova: <b>${caCap(ans)}</b>.`],
    err:v=>{if(v[0]===ans)return null;if(/\b(ell|ella|ells|elles)\b/.test(v[0]))return'ct4_feble_fort';if(voc&&n==='s'&&(v[0]==='el '+vl||v[0]==='la '+vl))return'ct4_feble_apos';if(['el','la','els','les',"l'"].some(x=>x!==pr&&(v[0]===x+' '+vl||v[0]===x+vl)))return'ct4_feble_genere';return null}})}},
/* ===== U11 Fem esport ===== */
 c4_voc_esport:{mat:'catala',ab:'Vs',curs:[4],nom:'Vocabulari: els esports aquàtics',teoria:['A la mar i a la piscina es fan molts d\'esports: natació (crol, esquena, braça), <b>waterpolo</b>, <b>surf</b>, <b>vela</b>, <b>caiac</b>, <b>submarinisme</b>...','Hi trobam objectes com el <b>banyador</b>, les <b>aletes</b> o el <b>rem</b>, i persones com el <b>socorrista</b>.'],
  gen:c4Vocab(C4_V_ESPORT,'Pensa en els esports que es fan a l\'aigua, en les coses que s\'hi fan servir i en les persones.')},
 c4_formar_verbs:{mat:'catala',ab:'Fv',curs:[4],nom:'La formació de verbs',
  teoria:['Podem formar <b>verbs</b> a partir de noms i adjectius, afegint-hi una terminació: <b>rem</b> → <b>remar</b>; <b>net</b> → <b>netejar</b>; <b>flor</b> → <b>florir</b>.',
   'A vegades també s\'hi afegeix un tros davant: <b>brut</b> → <b>em</b>brutar; <b>llarg</b> → <b>a</b>llargar; <b>trist</b> → <b>en</b>tristir.','I al revés: de <b>nedador</b> ve <b>nedar</b>; de <b>jugador</b>, <b>jugar</b>.'],
  gen(){const[w,v]=pick(C4_FV),A=c4Alts(v);
   return caEx(`Escriu el <b>verb</b> que ve de la paraula «<b>${w}</b>».`,A,{label:'Verb (en infinitiu)',loose:true,hints:['Pensa en l\'acció que hi té relació. Escriu-la en infinitiu (-ar, -er, -re, -ir).','Alguns verbs porten en-, em- o a- al davant.'],
    steps:[`«${w}» → <b>${A[0]}</b>.`]})}},
 c4_coma:{mat:'catala',ab:'Ce',curs:[4],nom:'La coma explicativa',
  teoria:['A vegades afegim una <b>explicació</b> enmig de la frase per dir qui és o què és algú o alguna cosa. Aquesta explicació va <b>entre comes</b>.',
   'Exemple: «En Marc<b>,</b> el capità de l\'equip<b>,</b> va marcar un gol.» Si treus l\'explicació, la frase continua tenint sentit: «En Marc va marcar un gol».'],
  gen(){const[o,p]=pick(C4_CEX);
   return caEx(`En aquesta frase falten dues comes:<br><i>${o}</i><br>Quina part de la frase ha d'anar <b>entre comes</b>?`,[p],{label:'Explicació',loose:true,hints:['Busca les paraules que expliquen qui és o què és el primer nom.','Si les treus, la frase continua tenint sentit.'],
    steps:[`L'explicació és «${p}».`,`Amb les comes: «${o.replace(new RegExp(' ('+p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+') ','i'),', $1, ')}»`]})}},
 c4_adverbis:{mat:'catala',ab:'Av',curs:[4],nom:'Els adverbis',
  teoria:['Els <b>adverbis</b> són paraules que no canvien (no tenen masculí ni femení, ni plural) i ens diuen <b>com</b>, <b>quan</b>, <b>on</b> o <b>quant</b> passa una cosa.',
   `<table class="mini"><tr><td><b>Lloc</b> (on?)</td><td>aquí, allà, lluny, amunt</td></tr><tr><td><b>Temps</b> (quan?)</td><td>avui, ahir, demà, sempre</td></tr><tr><td><b>Manera</b> (com?)</td><td>bé, malament, ràpidament</td></tr><tr><td><b>Quantitat</b> (quant?)</td><td>molt, poc, massa, bastant</td></tr><tr><td><b>Afirmació / negació</b></td><td>sí, també / no, mai</td></tr></table>`,
   'Molts adverbis de manera acaben en <b>-ment</b>: ràpida → ràpida<b>ment</b>.'],
  gen(lv){const[o,a,t]=pick(C4_ADV),T=c4Alts(t);
   if(lv===0)return caEx(`Escriu l'<b>adverbi</b> d'aquesta frase:<br><i>${o}</i>`,[a],{label:'Adverbi',hints:['Busca la paraula que diu on, quan, com o quant.','Els adverbis no canvien mai de forma.'],steps:[`«${a}» ${C4_ADV_DEF[T[0]]}.`,`L'adverbi és <b>${a}</b>.`]});
   return{text:`Escriu l'<b>adverbi</b> d'aquesta frase i digues de quin tipus és (lloc, temps, manera, quantitat, afirmació o negació):<br><i>${o}</i>`,fields:[{label:'Adverbi',txt:[a],loose:true,wide:true},{label:'Tipus',txt:T,loose:true,wide:true}],vis:null,
    hints:['Busca la paraula que diu on, quan, com o quant.','Fes-li la pregunta: on? → lloc; quan? → temps; com? → manera; quant? → quantitat.'],steps:[`L'adverbi és «${a}»: ${C4_ADV_DEF[T[0]]}.`,`És un adverbi de <b>${T[0]}</b>.`],
    err:v=>fold(v[0])===fold(a)&&!T.some(x=>fold(x)===fold(v[1]))&&Object.keys(C4_ADV_DEF).some(x=>fold(x)===fold(v[1]))?'ct4_adv_tipus':null}}},
 c4_noticia:{mat:'catala',ab:'Nt',curs:[4],nom:'La notícia',
  teoria:['Una <b>notícia</b> explica un fet real que acaba de passar. Respon les preguntes: <b>què</b> ha passat?, <b>qui</b>?, <b>on</b>?, <b>quan</b>? i, si pot, <b>per què</b>?',
   'Té tres parts: el <b>titular</b> (el títol, curt i cridaner), l\'<b>entradeta</b> (un resum del més important) i el <b>cos</b> (la notícia explicada amb detall).'],
  gen(lv){const[qui,nb,quiA]=pick(C4_NQUI),que=pick(C4_NQUE),[on,onA]=pick(C4_NON),[qn,qnA]=pick(C4_NQUAN),tit=pick(C4_NTIT),
   html=`<div style="background:var(--bg);padding:14px 16px;margin:10px 0"><b style="font-size:19px">${tit}</b><p style="font-size:17px;line-height:1.6;margin:8px 0 0">${qui} ${nb==='p'?'han':'ha'} ${que} ${on} ${qn}. ${pick(['Ha estat una jornada molt especial.','Moltes persones s\'hi han acostat per animar.','Tots han acabat cansats però molt contents.'])}</p></div>`;
   if(lv>0&&Math.random()<.3){const[q,a,h]=pick([['Com es diu el títol d\'una notícia?','titular','És la part de dalt, escrita amb lletra grossa.'],['Com es diu el resum que hi ha just davall el títol?','entradeta','Va entre el titular i el cos de la notícia.'],['Com es diu la part on s\'explica la notícia amb detall?','cos|el cos','És la part més llarga.']]),A=c4Alts(a);
    return caEx(`${html}${q}`,A,{label:'Part de la notícia',loose:true,hints:[h,c4Ini(A[0])],steps:[`És el <b>${A[0]}</b>.`]})}
   const[q,A,h]=pick([['<b>Qui</b> és el protagonista de la notícia?',[qui,...c4Alts(quiA)],'Busca qui ha fet l\'acció.'],['<b>On</b> ha passat?',[on,...c4Alts(onA)],'Busca el lloc.'],['<b>Quan</b> ha passat?',[qn,...c4Alts(qnA)],'Busca les paraules que diuen el temps.']]);
   return caEx(`${html}${q}`,A,{label:'Resposta',loose:true,hints:[h,'La resposta és a la primera frase de la notícia.'],steps:[`La notícia respon qui, què, on i quan a la primera frase.`,`Resposta: <b>${A[0]}</b>.`]})}}
});

/* ---------- errors típics ---------- */
Object.assign(ERR,{
 ct4_alfabet:{kid:'Hi has posat totes les paraules, però l\'ordre no és bo. Si dues paraules comencen igual, mira la lletra següent.',par:'Ordena malament quan les paraules comencen per la mateixa lletra'},
 ct4_dicc_forma:{kid:'Al diccionari no hi trobaràs aquesta forma. Els noms es busquen en singular, els adjectius en masculí singular i els verbs en infinitiu.',par:'No sap quina forma s\'ha de buscar al diccionari'},
 ct4_subj_verb:{kid:'Has confós el subjecte i el verb. El verb diu l\'acció; el subjecte és qui la fa.',par:'Confon el subjecte i el verb'},
 ct4_subj_pred:{kid:'Això és el subjecte. El predicat és la resta de l\'oració i comença pel verb.',par:'Confon el subjecte i el predicat'},
 ct4_majus_mes:{kid:'Els dies de la setmana i els mesos s\'escriuen amb minúscula. Busca un nom propi.',par:'Escriu amb majúscula els dies i els mesos'},
 ct4_nombre:{kid:'El gènere és correcte, però mira el nombre: parla d\'una cosa o de més d\'una?',par:'Confon singular i plural'},
 ct4_genere:{kid:'El nombre és correcte, però mira el gènere: prova de posar-hi «el» o «la» davant.',par:'Confon masculí i femení'},
 ct4_comu_propi:{kid:'Has escrit un nom de l\'altre tipus. Recorda: els noms propis porten majúscula i anomenen una persona, un animal o un lloc concret.',par:'Confon noms comuns i noms propis'},
 ct4_sin_ant:{kid:'Aquesta paraula vol dir el contrari! Et demanen el que vol dir el mateix (o al revés).',par:'Confon sinònims i antònims'},
 ct4_plural_as:{kid:'En català el plural dels femenins acaba en -es, no en -as.',par:'Fa el plural en -as (com en castellà)'},
 ct4_plural_os:{kid:'Les paraules acabades en -s, -ç o -x sovint fan el plural en -os: gos → gossos, braç → braços, peix → peixos.',par:'No afegeix -os als plurals que ho necessiten'},
 ct4_plural_canvi:{kid:'Gairebé! En fer el plural, alguna lletra canvia per conservar el so: vaca → vaques, plaça → places, platja → platges.',par:'No fa els canvis d\'ortografia del plural (c/qu, g/gu, ç/c, j/g)'},
 ct4_fem_canvi:{kid:'En fer el femení, a vegades canvia la darrera consonant: amic → amiga, llop → lloba, nebot → neboda, blau → blava.',par:'No fa el canvi de consonant en el femení'},
 ct4_col_ind:{kid:'Això és el nom de cada un. Et demanen el nom de tot el grup.',par:'Confon nom individual i col·lectiu'},
 ct4_primitiva:{kid:'Aquesta ja és la derivada. Busca la paraula més curta de la família, la que no ve de cap altra.',par:'No distingeix la paraula primitiva de la derivada'},
 ct4_l_gem:{kid:'És una ela geminada: s\'escriu l·l, amb el punt volat entre les dues eles.',par:'Errors amb la ela geminada (l·l)'},
 ct4_h:{kid:'Revisa la h: no sona, però algunes paraules la porten i d\'altres no.',par:'Oblida o afegeix la h'},
 ct4_essa:{kid:'Escolta el so: entre vocals, s suau (casa) i ss forta (massa).',par:'Confon s i ss entre vocals'},
 ct4_article_apos:{kid:'Aquest nom comença per vocal o h: l\'article s\'apostrofa (l\').',par:'No apostrofa l\'article davant vocal'},
 ct4_article:{kid:'Revisa l\'article: ha de concordar amb el nom en gènere (masculí o femení) i nombre (singular o plural).',par:'Errors de concordança de l\'article'},
 ct4_apostrof:{kid:'Revisa l\'apòstrof: davant vocal o h, el, la i de s\'apostrofen; davant consonant, no.',par:'Errors amb l\'apòstrof'},
 ct4_apostrof_iu:{kid:'Compte! La no s\'apostrofa davant i o u sense força: la idea, la universitat.',par:'Apostrofa «la» davant i / u àtones'},
 ct4_demo_concord:{kid:'La distància és bona, però el demostratiu ha de concordar amb el nom (masculí o femení, singular o plural).',par:'No fa concordar el demostratiu amb el nom'},
 ct4_demo_dist:{kid:'Mira la distància: aquest... per al que és a prop; aquell... per al que és lluny.',par:'Confon aquest (a prop) i aquell (lluny)'},
 ct4_poss_concord:{kid:'La persona és bona, però el possessiu ha de concordar amb el nom (masculí o femení, singular o plural).',par:'No fa concordar el possessiu amb el nom'},
 ct4_poss_persona:{kid:'Mira de qui és: meu (de mi), teu (de tu), seu (d\'ell o d\'ella), nostre (de nosaltres), vostre (de vosaltres).',par:'Confon la persona del possessiu'},
 ct4_coma_i:{kid:'Davant de la i final de la llista no hi va coma.',par:'Posa coma davant de la «i» de les enumeracions'},
 ct4_ord_genere:{kid:'L\'ordinal ha de concordar amb el nom: el tercer pis, però la tercera fila.',par:'No fa concordar l\'ordinal amb el nom'},
 ct4_num_guionet:{kid:'Les paraules són bones, però falta el guionet: trenta-cinc, vint-i-tres, dos-cents.',par:'Oblida el guionet dels numerals'},
 ct4_tipus_accent:{kid:'La síl·laba tònica és bona! Ara compta des del final: darrera → aguda, penúltima → plana, antepenúltima → esdrúixola.',par:'Confon agudes, planes i esdrúixoles'},
 ct4_concord:{kid:'L\'adjectiu ha de concordar amb el nom: si el nom és femení o plural, l\'adjectiu també.',par:'Errors de concordança entre el nom i l\'adjectiu'},
 ct4_vers_estrofa:{kid:'Has confós els versos i les estrofes. Un vers és una línia; una estrofa és un grup de versos.',par:'Confon vers i estrofa'},
 ct4_accent_falta:{kid:'Falta l\'accent! Mira si és aguda, plana o esdrúixola i com acaba.',par:'Oblida l\'accent gràfic'},
 ct4_accent_sobra:{kid:'Aquesta paraula no porta accent. Repassa la regla segons com acaba.',par:'Posa accents on no en van'},
 ct4_accent_obert:{kid:'L\'accent és al seu lloc, però va al revés: és obert (à, è, ò) o tancat (é, í, ó, ú)?',par:'Confon l\'accent obert i el tancat'},
 ct4_temps:{kid:'Prova de posar-hi «ahir», «avui» o «demà» davant: quin encaixa?',par:'Confon passat, present i futur'},
 ct4_formal_tu:{kid:'Això és la forma de «tu». Amb vostè, el verb va com amb «ell» o «ella».',par:'No sap passar el verb al tractament de vostè'},
 ct4_ava_b:{kid:'Els verbs en -ar fan el passat en -ava, sempre amb v.',par:'Escriu -aba en lloc d\'-ava'},
 ct4_ava_accent:{kid:'Gairebé! Recorda l\'accent: nosaltres -àvem, vosaltres -àveu.',par:'Oblida l\'accent de -àvem, -àveu'},
 ct4_bv:{kid:'Has canviat la b i la v. Pensa en una paraula de la mateixa família.',par:'Confon b i v'},
 ct4_pers_nombre:{kid:'La persona és bona. Ara mira el nombre: jo, tu, ell → singular; nosaltres, vosaltres, ells → plural.',par:'Confon el nombre del verb'},
 ct4_compost_guionet:{kid:'Aquesta paraula composta porta guionet entre les dues parts.',par:'Oblida el guionet en els compostos que el porten'},
 ct4_compost_separat:{kid:'Les paraules compostes s\'escriuen juntes, sense espai.',par:'Escriu separades les paraules compostes'},
 ct4_x_ix:{kid:'Mira on és el so: x a principi i darrere consonant; ix darrere vocal; tx enmig (cotxe); ig a final darrere vocal (maig).',par:'Confon x, ix, tx i ig'},
 ct4_pronom_genere:{kid:'Mira si són persones masculines o femenines: ell / ella, ells / elles (si n\'hi ha cap de masculí, ells).',par:'Confon el gènere dels pronoms forts'},
 ct4_pronom_persona:{kid:'Si hi ets tu qui parla (jo), és nosaltres; si hi és la persona a qui parles (tu), vosaltres.',par:'Confon nosaltres, vosaltres i ells'},
 ct4_feble_fort:{kid:'Aquí cal un pronom feble (el, la, els, les), no un de fort (ell, ella). Va davant del verb.',par:'Fa servir pronoms forts en lloc de febles'},
 ct4_feble_apos:{kid:'El verb comença per vocal: el pronom s\'apostrofa (l\'obro, l\'escolto).',par:'No apostrofa el pronom feble davant vocal'},
 ct4_feble_genere:{kid:'El pronom ha de concordar amb el que substitueix: el (masc.), la (fem.), els (masc. pl.), les (fem. pl.).',par:'Confon el, la, els, les'},
 ct4_adv_tipus:{kid:'Has trobat l\'adverbi! Ara pregunta-li: on? (lloc), quan? (temps), com? (manera), quant? (quantitat).',par:'Confon els tipus d\'adverbis'}
});

/* ---------- unitats de 4t (ordre del llibre «Practica Llengua 4.1») ---------- */
UNITS.catala.push(
 ['Un aniversari diferent',['c4_alfabetic','c4_diccionari','c4_subjecte','c4_tipus_frases','c4_narracio'],[4]],
 ['Descobrim el parc',['c4_voc_parc','c4_majuscula','c4_digrafs','c4_genere_nombre','c4_comuns_propis'],[4]],
 ['Va de còmics',['c4_voc_comic','c4_sinonims','c4_plurals','c4_individuals','c4_adjectiu'],[4]],
 ['Mengem-nos el món!',['c4_voc_cuina','c4_derivades','c4_h_lgem','c4_essa','c4_article','c4_tipus_text'],[4]],
 ['Llegendes del món',['c4_voc_roba','c4_antonims','c4_apostrof','c4_demostratius','c4_possessius'],[4]],
 ['Grans dones!',['c4_voc_invents','c4_puntuacio','c4_numerals'],[4]],
 ['Recitem',['c4_voc_arbres','c4_metafora','c4_silaba','c4_concordanca','c4_poema'],[4]],
 ['De la pedra al xip',['c4_voc_escriptura','c4_accent','c4_temps'],[4]],
 ['Anem d\'estrena!',['c4_voc_teatre','c4_formalitat','c4_ava_bv','c4_persona_nombre'],[4]],
 ['Animals bestials',['c4_compostes','c4_x_ix','c4_pronoms'],[4]],
 ['Fem esport',['c4_voc_esport','c4_formar_verbs','c4_coma','c4_adverbis','c4_noticia'],[4]]);
