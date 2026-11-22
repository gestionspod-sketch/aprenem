/* Aprenem - contingut de LLENGUA CATALANA I LITERATURA (6è de Primària)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   El temari de Català està repartit en aquests arxius (s'han de carregar en aquest ordre):
     catala.js             base: dades i temes inicials (accentuació, apòstrof, dièresi, consonants, categories,
                           verbs regulars, oració, sinònims, prefixos, recursos literaris, rima, lectura) i utilitats
     catala-ortografia.js  diftongs i hiats, accent diacrític, parelles (perquè / per què...), puntuació i majúscules,
                           x / ix / tx / ig, m / n, consonants finals, vocals àtones en els verbs, guionet
     catala-gramatica.js   gènere i nombre, determinants i pronoms, sintagma nominal, subjecte el·líptic, tipus de
                           verbs, veu passiva, verbs irregulars, temps compostos, modes, perífrasis, CD, CI, CC,
                           atribut, oracions simples i compostes, pronoms febles; taula de verbs irregulars
     catala-lexic.js       camps semàntics, homònims, manlleus, barbarismes, derivació, compostos i famílies,
                           frases fetes i refranys, varietats dialectals (el balear)
     catala-unitats.js     les 13 unitats, en l'ordre del llibre de text
   FONTS
   - Decret 31/2022, d'1 d'agost, currículum d'Educació Primària de les Illes Balears (BOIB extr. núm. 101, 2-8-2022),
     àrea de Llengua Catalana i Literatura, sabers bàsics del 3r cicle: A. Les llengües i els seus parlants (llengua i
     dialecte, varietats dialectals, registres); B. Comunicació; C. Educació literària (tradició popular de les Illes:
     rondalles, llegendes, gloses, refranys, endevinalles; tema, personatges, recursos); D. Reflexió sobre la llengua
     (temps, mode, persona, nombre i conjugació dels verbs; constituents de l'oració; categories gramaticals; famílies
     lèxiques; prefixos i sufixos; modalitats oracionals; substitucions pronominals; normes d'accentuació; apòstrof,
     contraccions, punt, punt i coma, coma, dos punts, punts suspensius, guionet i dièresi; diftongs i hiats; diccionari).
     Concreció per cursos de la Conselleria: https://www.caib.es/sites/lomloe/f/522779
   - Llibre de text: Llengua catalana 6, Primària, projecte «Saber Fer», Illes Balears (Santillana / Grup Promotor,
     ISBN 978-84-9130-369-5), índex de les 12 unitats: camps semàntics, hiperònims i hipònims, tipus d'oracions,
     aleshores / a les hores, sinó / si no, perquè / per què (U1); homònims, propietats textuals, parèntesis, cometes i
     dos punts (U2); manlleus, el subjecte, subjecte el·líptic i verbs impersonals, accent diacrític (U3); neologismes,
     sintagma nominal i complement del nom, x / ix / tx / ig (U4); mots incorrectes d'ús freqüent, verbs predicatius i
     atributius, transitius i intransitius, veu passiva, j / g (U5); prefixos de negació, d'oposició i cultes, verbs
     regulars i irregulars, vocals a / e i o / u àtones en els verbs (U6); formació de noms i adjectius, perífrasis
     verbals, ela geminada (U7); formació de verbs, complement directe, m i n (U8); comparació i metàfora, complement
     indirecte, b / v (U9); anàfora i personificació, complement circumstancial, c / g a final de mot (U10);
     al·literació i inversió, l'atribut, el guionet (U11); pronoms febles i apòstrof en els pronoms febles (U12).
     Contrastat amb els títols de Vicens Vives (Pràctica llengua 6, Zoom) i Cruïlla.
   - Institut d'Estudis Catalans: Ortografia catalana (2016, accent diacrític i guionet), Gramàtica de la llengua
     catalana (2016) i Gramàtica essencial (formes balears: jo cant, nosaltres cantam, vosaltres cantau, vàrem,
     servesc, tenc...). Diccionari normatiu (DIEC2) per a les formes correctes dels barbarismes.
   Es respecta sempre la variant balear correcta (cant / canto, cantam / cantem, vàrem / vam, servesc / serveixo). */

const CA_STRIP=s=>s.normalize('NFD').replace(/[̀́]/g,'').normalize('NFC');      // treu accents (deixa ç, ·, ü, ï)
const CA_STRIP_UML=s=>s.normalize('NFD').replace(/̈/g,'').normalize('NFC');         // treu dièresis
const CA_TIPUS={a:'aguda',p:'plana',e:'esdrúixola'};

/* ---------- dades ---------- */
// [paraula ben escrita, tipus (a = aguda, p = plana, e = esdrúixola), nivell]
const CA_ACC=[['cafè','a'],['sofà','a'],['camió','a'],['també','a'],['francès','a'],['anglès','a'],['matí','a'],['pastís','a'],['després','a'],['avió','a'],['xampú','a'],['ningú','a'],['pagès','a'],['interès','a',1],
 ['ciutat','a'],['animal','a'],['color','a'],['cantar','a'],['mirall','a'],['sabater','a',1],
 ['fàcil','p'],['difícil','p'],['telèfon','p'],['àlbum','p',1],['còmic','p'],['núvol','p'],['inútil','p',1],['ràpid','p'],['àngel','p',1],['mòbil','p'],
 ['casa','p'],['taula','p'],['llibre','p'],['finestra','p'],['cadira','p'],['escola','p'],['platja','p'],['germanes','p',1],['examen','p',1],['joves','p',1],
 ['música','e'],['màquina','e'],['pàgina','e'],['làmpada','e'],['química','e',1],['física','e'],['àrbitre','e',1],['cèl·lula','e',1],['matemàtiques','e']];
// [nom, gènere, plural, (1 = femení que comença per i/u àtones: no s'apostrofa)]
const CA_NOMS=[['pare','m','pares'],['gat','m','gats'],['llibre','m','llibres'],['arbre','m','arbres'],['home','m','homes'],['avi','m','avis'],['estiu','m','estius'],['ocell','m','ocells'],['amic','m','amics'],['hospital','m','hospitals'],
 ['mare','f','mares'],['casa','f','cases'],['platja','f','platges'],['àvia','f','àvies'],['escola','f','escoles'],['hora','f','hores'],['illa','f','illes'],['amiga','f','amigues'],
 ['universitat','f','universitats',1],['idea','f','idees',1],['història','f','històries',1],['infermera','f','infermeres',1]];
// [sense dièresi, ben escrita, nivell]
const CA_UML=[['aigues','aigües'],['llengues','llengües'],['veina','veïna'],['raim','raïm'],['paisos','països'],['oida','oïda'],['pinguins','pingüins'],['ambiguitat','ambigüitat',1],['heroina','heroïna',1],['reunio','reunió'],
 ['aigua','aigua'],['llengua','llengua'],['guerra','guerra'],['quinze','quinze'],['cuina','cuina'],['egoista','egoista',1],['diumenge','diumenge']];
// [paraula, tros amagat, opcions, norma]
const CA_CONS=[['cavall','v','b / v','b-v'],['llibre','b','b / v','b-v'],['saber','b','b / v','b-v'],['govern','v','b / v','b-v'],['rebre','b','b / v','b-v'],['viure','v','b / v','b-v'],['vaixell','v','b / v','b-v'],['bufanda','b','b / v','b-v'],
 ['jardí','j','g / j','g-j'],['gendre','g','g / j','g-j'],['pujar','j','g / j','g-j'],['girafa','g','g / j','g-j'],['jove','j','g / j','g-j'],['rellotge','tg','tg / tj / g','tg-tj'],['platja','tj','tg / tj / j','tg-tj'],['viatge','tg','tg / tj / g','tg-tj'],['mitjó','tj','tg / tj / j','tg-tj'],
 ['massa','ss','s / ss','s-ss'],['cosa','s','s / ss','s-ss'],['cassola','ss','s / ss','s-ss'],['rosa','s','s / ss','s-ss'],['plaça','ç','c / ç / s','c-ç'],['caçar','ç','c / ç / s','c-ç'],['dotze','z','s / z','s-z'],['zero','z','s / z','s-z'],
 ['col·legi','l·l','l / ll / l·l','l·l'],['il·lusió','l·l','l / ll / l·l','l·l'],['pel·lícula','l·l','l / ll / l·l','l·l'],['tranquil·litat','l·l','ll / l·l','l·l'],['intel·ligent','l·l','ll / l·l','l·l'],['cavaller','ll','l / ll / l·l','l·l'],
 ['carro','rr','r / rr','r-rr'],['terra','rr','r / rr','r-rr'],['cara','r','r / rr','r-rr'],['honrat','r','r / rr','r-rr']];
const CA_NORMA={'b-v':'Pensa en paraules de la mateixa família: cavall → cavaller, llibre → llibreria. En català, la b i la v sonen diferent en moltes zones (també a Mallorca).',
 'g-j':'Davant e i i escrivim g (gendre, girafa); davant a, o, u, j (jardí, jove, pujar).',
 'tg-tj':'Davant e i i: tg (rellotge, viatge); davant a, o, u: tj (platja, mitjó).',
 's-ss':'Entre vocals, s sona com a «z» (casa, rosa) i ss sona com a «s» forta (massa, cassola).',
 'c-ç':'Davant a, o, u el so «s» s\'escriu ç (plaça, caçar); davant e, i, c (cel, cinc).',
 's-z':'La z sona com la s de «casa», però a principi de paraula o darrere consonant s\'escriu z (zero, dotze).',
 'l·l':'La ela geminada (l·l) sona com dues eles: col·legi, il·lusió. Si sona «ll», com a cavall, és ll.',
 'r-rr':'Entre vocals, so fort: rr (carro, terra); so suau: r (cara). Darrere n o s s\'escriu r sola (honrat).'};
// La mateixa norma amb altres exemples: la pista la fa servir quan la paraula de l'exercici surt a CA_NORMA (la pista no dona la resposta)
const CA_NORMA_ALT={'b-v':'Pensa en paraules de la mateixa família: beure → beguda, nou → novena. En català, la b i la v sonen diferent en moltes zones (també a Mallorca).',
 'g-j':'Davant e i i escrivim g (gelat, gimnàs); davant a, o, u, j (joc, juny, menjar).',
 'tg-tj':'Davant e i i: tg (metge, formatge); davant a, o, u: tj (mitja, pitjor).',
 's-ss':'Entre vocals, s sona com a «z» (camisa, mesura) i ss sona com a «s» forta (tassa, pressa).',
 'c-ç':'Davant a, o, u el so «s» s\'escriu ç (força, cançó); davant e, i, c (cel, cinc).',
 's-z':'La z sona com la s de «casa», però a principi de paraula o darrere consonant s\'escriu z (zebra, onze).',
 'l·l':'La ela geminada (l·l) sona com dues eles: novel·la, cel·la. Si sona «ll», com a castell, és ll.',
 'r-rr':'Entre vocals, so fort: rr (gerro, barra); so suau: r (pera). Darrere n o s s\'escriu r sola (Enric).'};
const caNormaSense=(nr,w)=>CA_NORMA[nr].includes(w)?CA_NORMA_ALT[nr]:CA_NORMA[nr];
const CA_CAT=[['El *gat* dorm al sofà.','nom'],['La casa *vermella* és gran.','adjectiu'],['Els nens *juguen* al pati.','verb'],['Arribarem *demà* al matí.','adverbi'],['*Aquest* llibre és meu.','determinant|demostratiu'],
 ['*Ella* canta molt bé.','pronom|pronom personal'],['Vaig a l\'escola *amb* bicicleta.','preposició'],['Vull pa *i* formatge.','conjunció'],['Corre molt *ràpidament*.','adverbi'],['He llegit *tres* contes.','determinant|numeral'],
 ['*Nosaltres* anirem a la platja.','pronom|pronom personal'],['El mar és *blau*.','adjectiu'],['La *música* em fa feliç.','nom'],['El sopar és *a* les nou.','preposició'],['Vindré, *però* tard.','conjunció'],
 ['*Els* ocells volen.','determinant|article'],['Ells *escriuen* una carta.','verb'],['El pastís és *boníssim*.','adjectiu'],['*Mai* menjo bròquil.','adverbi'],['La *llibertat* és important.','nom'],
 ['*Les* teves sabates són noves.','determinant|article'],['La gata *dormia* al sol.','verb'],['Ho he deixat *aquí*.','adverbi'],['La platja és *de* sorra fina.','preposició'],['Vols aigua *o* suc?','conjunció']];
const CA_CAT_DEF={nom:'anomena persones, animals, coses o idees (gat, llibertat)',adjectiu:'diu com és un nom (vermella, blau)',verb:'expressa una acció o un estat i es conjuga (juguen, dormia)',adverbi:'diu com, quan, on o quant (demà, aquí, ràpidament)',
 determinant:'acompanya el nom i el precisa: articles, demostratius, possessius, numerals (els, aquest, tres)',pronom:'substitueix un nom (ella, nosaltres)',preposició:'uneix paraules i no varia (a, amb, de, per)',conjunció:'uneix paraules o oracions (i, o, però)'};
const CA_PERS=['jo','tu','ell / ella','nosaltres','vosaltres','ells / elles'];
const CA_TEMPS={pres:'present',imp:'imperfet',perif:'passat perifràstic',fut:'futur',cond:'condicional'};
const CA_TEMPS_ALT={pres:['present','present d\'indicatiu'],imp:['imperfet','pretèrit imperfet','imperfet d\'indicatiu'],perif:['passat perifràstic','perifràstic','pretèrit perfet perifràstic','passat'],fut:['futur','futur simple'],cond:['condicional','condicional simple']};
// [infinitiu, model, significat]
const CA_VERBS=[['cantar','1'],['parlar','1'],['saltar','1'],['mirar','1'],['ballar','1'],['nedar','1'],['pintar','1'],['escoltar','1'],['ajudar','1'],
 ['perdre','2'],['batre','2'],['dormir','3'],['sentir','3'],['servir','3i'],['patir','3i'],['llegir','3i'],['unir','3i']];
const CA_MODEL={1:'1a conjugació (-ar), com cantar',2:'2a conjugació (-re), com perdre',3:'3a conjugació pura (-ir), com dormir','3i':'3a conjugació incoativa (-ir, amb -eix-), com servir'};
// Conjuga un verb regular. Cada forma és una llista d'alternatives (la primera és l'estàndard; després, la balear).
function caConj(inf,mod,t){const st=inf.slice(0,-2),P=x=>x.map(f=>Array.isArray(f)?f:[f]);
 if(t==='perif')return[['vaig'],['vas','vares'],['va'],['vam','vàrem'],['vau','vàreu'],['van','varen']].map(a=>a.map(x=>x+' '+inf));
 if(mod==='1'){if(t==='pres')return P([[st+'o',st],st+'es',st+'a',[st+'em',st+'am'],[st+'eu',st+'au'],st+'en']);
  if(t==='imp')return P(['ava','aves','ava','àvem','àveu','aven'].map(e=>st+e));
  if(t==='fut')return P(['é','às','à','em','eu','an'].map(e=>inf+e));
  return P(['ia','ies','ia','íem','íeu','ien'].map(e=>inf+e))}
 if(mod==='2'){if(t==='pres')return P([[st+'o',st],st+'s',st,st+'em',st+'eu',st+'en']);
  if(t==='imp')return P(['ia','ies','ia','íem','íeu','ien'].map(e=>st+e));
  if(t==='fut')return P(['é','às','à','em','eu','an'].map(e=>st+'r'+e));
  return P(['ia','ies','ia','íem','íeu','ien'].map(e=>st+'r'+e))}
 if(mod==='3'){if(t==='pres')return P([[st+'o',st],st+'s',st,st+'im',st+'iu',st+'en']);}
 else if(t==='pres')return P([[st+'eixo',st+'esc'],st+'eixes',st+'eix',st+'im',st+'iu',st+'eixen']);
 if(t==='imp')return P(['ia','ies','ia','íem','íeu','ien'].map(e=>st+e));
 if(t==='fut')return P(['é','às','à','em','eu','an'].map(e=>inf+e));
 return P(['ia','ies','ia','íem','íeu','ien'].map(e=>inf+e))}
const CA_SUBJ=[['El meu germà juga a futbol cada dissabte.','el meu germà'],['Les flors del jardí són precioses.','les flors del jardí'],['Demà vindran els avis.','els avis'],['Els alumnes de sisè preparen una obra de teatre.','els alumnes de sisè'],
 ['El sol escalfa la terra.','el sol'],['Al bosc viuen molts animals.','molts animals'],['Tu i jo farem el treball.','tu i jo'],['La mestra ens explica un conte.','la mestra'],['Els ocells canten al matí.','els ocells'],['Aquest estiu ha arribat la meva cosina.','la meva cosina'],
 ['La pluja ha mullat tota la roba.','la pluja'],['A la plaça juguen uns nins petits.','uns nins petits'],['El tren de Sóller passa per un túnel.','el tren de Sóller'],['Les cigonyes construeixen nius alts.','les cigonyes'],
 ['La meva àvia fa unes coques boníssimes.','la meva àvia'],['Aquests llibres són de la biblioteca.','aquests llibres'],['Cada matí em desperta el cant del gall.','el cant del gall'],['Nosaltres anirem al museu dijous.','nosaltres'],
 ['El director de l\'escola ha parlat amb les famílies.','el director de l\'escola'],['Al cel brillen milers d\'estrelles.','milers d\'estrelles'],['Els dofins salten entre les ones.','els dofins'],['La gata i els seus moixets dormen al sofà.','la gata i els seus moixets'],
 ['Aquella muntanya tan alta és el Puig Major.','aquella muntanya tan alta'],['Em fa mal la panxa.','la panxa'],['Ens agraden molt les maduixes.','les maduixes'],['Per la finestra entrava un raig de sol.','un raig de sol'],
 ['El meu cosí petit ja sap llegir.','el meu cosí petit'],['Les classes acaben a les dues.','les classes'],['Vosaltres heu guanyat el partit.','vosaltres'],['Al port han arribat tres vaixells grans.','tres vaixells grans']];
const CA_ORA=[['Quina hora és?','interrogativa'],['Quin dia tan bonic!','exclamativa'],['Tanca la porta, per favor.','imperativa'],['Demà és dimarts.','enunciativa'],['On has posat les claus?','interrogativa'],['Que bé que ho hem passat!','exclamativa'],
 ['Renta\'t les mans abans de dinar.','imperativa'],['La biblioteca obre a les nou.','enunciativa'],['Vindràs a la festa?','interrogativa'],['Escolta bé les instruccions.','imperativa'],
 ['Com et dius?','interrogativa'],['Quina por que vaig passar!','exclamativa'],['Apaga el llum quan surtis.','imperativa'],['El museu tanca els dilluns.','enunciativa'],['Quants anys té la teva germana?','interrogativa'],
 ['Que alt que és aquest arbre!','exclamativa'],['Porta\'m el llibre de mates, per favor.','imperativa'],['Les balenes són mamífers.','enunciativa'],['Per què plores?','interrogativa'],['Quina sorpresa tan agradable!','exclamativa'],
 ['No corris pel passadís.','imperativa'],['Ahir va nevar a la serra.','enunciativa'],['Has acabat els deures?','interrogativa'],['Quin gol tan espectacular!','exclamativa'],['Seu bé a la cadira.','imperativa'],
 ['La meva escola té un hort.','enunciativa'],['On viu el teu cosí?','interrogativa'],['Que contents que estam!','exclamativa'],['Escriu el teu nom a la part de dalt.','imperativa'],['El sol surt per l\'est.','enunciativa']];
const CA_SIN=[['content','feliç|alegre'],['començar','iniciar|encetar'],['bonic','formós|bell|preciós|polit'],['parlar','xerrar|conversar|enraonar'],['ràpid','veloç|lleuger'],['casa','habitatge|llar'],['mirar','observar|contemplar|guaitar'],['gran','enorme|immens'],['acabar','finalitzar|enllestir'],['por','temor|basarda'],['caminar','passejar|anar a peu'],['enfadat','enutjat|empipat|irritat']];
const CA_ANT=[['alt','baix'],['obrir','tancar'],['ric','pobre'],['entrar','sortir'],['ample','estret'],['calent','fred'],['ple','buit'],['guanyar','perdre'],['net','brut'],['valent','covard|poruc'],['aprovar','suspendre'],['dur','tou|bla']];
const CA_PREF=[['feliç','infeliç','in-'],['possible','impossible','im-'],['ordenat','desordenat','des-'],['legal','il·legal','il-'],['responsable','irresponsable','ir-'],['fer','desfer','des-'],['cobrir','descobrir','des-'],['útil','inútil','in-'],['correcte','incorrecte','in-'],['agradable','desagradable','des-'],['paciència','impaciència','im-'],['regular','irregular','ir-'],
 ['fidel','infidel','in-'],['visible','invisible','in-'],['just','injust','in-'],['capaç','incapaç','in-'],['comprensible','incomprensible','in-'],
 ['perfecte','imperfecte','im-'],['puntual','impuntual','im-'],['prudent','imprudent','im-'],['parell','imparell','im-'],['batible','imbatible','im-'],
 ['lògic','il·lògic','il-'],['limitat','il·limitat','il-'],['legible','il·legible','il-'],['real','irreal','ir-'],['rellevant','irrellevant','ir-'],['reconeixible','irreconeixible','ir-'],
 ['lligar','deslligar','des-'],['connectar','desconnectar','des-'],['conegut','desconegut','des-'],['honest','deshonest','des-'],['aparèixer','desaparèixer','des-'],['obeir','desobeir','des-'],['tapar','destapar','des-']];
const CA_REC=[['Els teus ulls són com dues estrelles.','comparació|símil'],['La lluna és un plat de plata.','metàfora'],['El vent xiuxiuejava cançons a les fulles.','personificació'],['T\'ho he dit un milió de vegades!','hipèrbole'],['El rellotge fa tic-tac.','onomatopeia'],
 ['Les flors somreien al sol.','personificació'],['Corria com un llamp.','comparació|símil'],['Els teus cabells són or.','metàfora'],['Tinc tanta gana que em menjaria un elefant.','hipèrbole'],['El gos feia bub-bub tota la nit.','onomatopeia'],
 ['Cada dia, cada hora, cada minut penso en tu.','anàfora',1],['Vull la mar, vull el cel, vull la llum del matí.','anàfora',1],['Mira els núvols, mira els ocells, mira el teu jardí.','anàfora',1],
 ['El vent venia volant per les valls verdes.','al·literació|aliteració',1],['Les serps sinuoses s\'esmunyen per la sorra.','al·literació|aliteració',1],['Rodolen les rodes del carro rovellat.','al·literació|aliteració',1],
 ['Blanca és la neu de la muntanya.','inversió|hipèrbaton',1],['Verd és el prat i blau és el cel.','inversió|hipèrbaton',1],['D\'aquell jardí, les roses vaig collir.','inversió|hipèrbaton',1]];
const CA_REC_DEF={comparació:'compara dues coses amb «com» o «semblant a»',metàfora:'diu que una cosa «és» una altra, sense «com»',personificació:'dona qualitats humanes a coses o animals',hipèrbole:'exagera molt',onomatopeia:'imita un so',
 anàfora:'repeteix la mateixa paraula al principi de diverses frases o versos','al·literació':'repeteix un mateix so (una consonant) en paraules seguides',inversió:'canvia l\'ordre habitual de les paraules de la frase'};
const CA_RIMA=[['cançó','balcó','consonant'],['casa','plaça','assonant'],['mar','cantar','consonant'],['lluna','bruna','consonant'],['flor','sol','assonant'],['camí','matí','consonant'],['porta','rosa','assonant'],['nit','llit','consonant'],['cadira','camisa','assonant'],['muntanya','castanya','consonant']];
const CA_GEN=[['Un text en vers que expressa sentiments i emocions.','poesia|lírica|gènere líric'],['Una obra escrita per ser representada pels actors damunt un escenari.','teatre|dramàtic|gènere dramàtic'],['Una història en prosa, explicada per un narrador, amb personatges i fets.','narrativa|narració|gènere narratiu|conte|novel·la'],
 ['Un text curt en vers, amb rima, que sovint s\'aprèn de memòria i es canta als infants.','cançó|poesia|poesia popular|lírica'],['Una narració popular de Mallorca, transmesa de boca en boca, com les que va recollir mossèn Alcover.','rondalla|rondalles|narrativa'],
 ['Una narració molt antiga que explica l\'origen del món o de la natura amb déus i herois.','mite|mites|mitologia'],
 ['Una narració popular que barreja fets reals i fantàstics i passa en un lloc concret, com la del Drac de na Coca.','llegenda|llegendes'],
 ['Uns versos improvisats, típics de les Illes, que se solen cantar i que sovint fan riure.','glosa|gloses|glosat'],
 ['Un text breu, sovint en vers, que descriu una cosa sense dir-ne el nom perquè l\'endevinem.','endevinalla|endevinalles'],
 ['Una història explicada amb vinyetes, dibuixos i bafarades.','còmic|novel·la gràfica|historieta'],
 ['Una frase popular i curta que dona un consell o un ensenyament, com «Qui matina, fa farina».','refrany|refranys|dita|dites']];
const CA_LECT=[{t:'El far de Formentor',x:'En Miquel era el faroner de Formentor. Cada vespre, quan el sol s\'amagava darrere la serra, pujava els cent vint-i-tres escalons del far i encenia la llum perquè els vaixells no xoquessin amb les roques. Una nit de tempesta, va veure una barca petita que lluitava contra les ones. Va fer senyals amb la llanterna fins que els pescadors van trobar el camí del port. L\'endemà, li van dur una cistella de peix per donar-li les gràcies.',
  q:[['Com es diu el faroner?','miquel|en miquel'],['Quants escalons té el far?','123|cent vint-i-tres'],['Què va veure la nit de tempesta?','una barca|una barca petita|barca'],['Què li van dur els pescadors l\'endemà?','una cistella de peix|peix|cistella de peix']]},
 {t:'L\'excursió a la Serra',x:'Els alumnes de sisè van anar d\'excursió a la Serra de Tramuntana. Van sortir de l\'escola a les vuit en punt amb autocar i van començar a caminar a Sóller. Durant el camí, la mestra els va explicar que les marjades són parets de pedra en sec que els pagesos construïen per poder conrear a la muntanya. A migdia, van dinar a l\'ombra d\'una alzina i, a la tarda, van tornar cansats però contents.',
  q:[['On van anar d\'excursió?','a la serra de tramuntana|serra de tramuntana|la serra de tramuntana'],['A quina hora van sortir?','a les vuit|les vuit|vuit|8'],['Què són les marjades?','parets de pedra en sec|parets de pedra|parets'],['Sota quin arbre van dinar?','alzina|una alzina|un alzina']]},
 {t:'Sant Antoni a sa Pobla',x:'La nit del 16 de gener, sa Pobla s\'omple de fogueres. Els veïns hi torren sobrassada, botifarrons i llonganisses, i els dimonis ballen pels carrers al so de les xeremies, el flabiol i el tamborino. L\'endemà, el dia de Sant Antoni, els animals desfilen davant l\'església i el capellà els beneeix. La Marta, que té onze anys, hi va dur el seu moix, en Pelut, dins una panera. En Pelut no va miolar ni una vegada: estava ben tranquil.',
  q:[['Quina nit s\'encenen les fogueres?','la nit del 16 de gener|16 de gener|el 16 de gener|setze de gener'],['Quins instruments sonen mentre ballen els dimonis? (digues-ne un)','xeremies|les xeremies|flabiol|el flabiol|tamborino|el tamborino'],['Què fa el capellà amb els animals?','els beneeix|beneir-los|beneeix|beneir|la benedicció'],['Com es diu el moix de la Marta?','pelut|en pelut'],['Per què sabem que en Pelut estava tranquil?','no va miolar|perquè no va miolar|no miolava|no va miolar ni una vegada']]},
 {t:'La rabosa i el corb',x:'Un corb havia robat un tros de formatge i se\'n va anar a menjar-lo dalt d\'un arbre. Una rabosa, que el va veure, va pensar com podia aconseguir aquell formatge. «Quines plomes tan negres i lluents! —li va dir—. Si cantes tan bé com ets de bonic, seràs el rei dels ocells.» El corb, tot cofoi, va obrir el bec per cantar, i el formatge va caure a terra. La rabosa el va agafar i, abans d\'anar-se\'n, li va dir: «Aprèn la lliçó: no et refiïs de qui t\'afalaga.»',
  q:[['Què havia robat el corb?','un tros de formatge|formatge|el formatge'],['Què va fer el corb per cantar?','va obrir el bec|obrir el bec|obre el bec'],['Què li va passar al formatge?','va caure|va caure a terra|caure a terra|cau'],['Quin tipus de text és: un conte de fades o una faula?','faula|una faula'],['Quina és la lliçó de la història? Completa: no et refiïs de qui t\'...','afalaga|t\'afalaga']]},
 {t:'La posidònia',x:'La posidònia no és una alga, sinó una planta amb arrels, tiges, fulles i flors que viu davall la mar de les Illes Balears. Forma grans praderies que fan que l\'aigua sigui transparent i que donen aliment i amagatall a molts de peixos. A la tardor, les fulles velles es desprenen i arriben a la platja, on protegeixen la sorra de les onades. Per això no les hem de llevar. Les àncores de les barques, però, arrabassen la posidònia, que creix molt a poc a poc: només un o dos centímetres cada any.',
  q:[['La posidònia és una alga o una planta?','una planta|planta'],['Què donen les praderies als peixos? (digues una cosa)','aliment|menjar|amagatall|aliment i amagatall'],['Què fan les fulles velles a la platja?','protegeixen la sorra|protegir la sorra|protegeixen la sorra de les onades'],['Què arrabassa la posidònia?','les àncores|àncores|les àncores de les barques'],['Quants centímetres creix cada any?','un o dos|1 o 2|un o dos centímetres|1 o 2 centímetres']]}];

/* ---------- auxiliars ---------- */
const caArticle=([n,g,,iu])=>{const voc=/^h?[aeiouàèéíòóú]/i.test(n);return g==='m'?(voc?"l'"+n:'el '+n):(voc&&!iu?"l'"+n:'la '+n)};
const caPrep=(p,art)=>{if(art.startsWith('el '))return({de:'del',a:'al',per:'pel'})[p]+art.slice(2);if(art.startsWith('els '))return({de:'dels',a:'als',per:'pels'})[p]+art.slice(3);return(p==='de'&&/^[aeiouàèéíòóúh]/i.test(art)&&!/^(la|les|l')/.test(art)?"d'":p+' ')+art};
const caAlts=s=>s.split('|');
const caFirst=s=>s.split('|')[0];
function caAccentErr(correct,v){if(v===correct)return null;if(CA_STRIP(v)!==CA_STRIP(correct))return null;
 if(CA_STRIP(correct)===correct)return'ca_accent_sobra';if(CA_STRIP(v)===v)return'ca_accent_falta';return'ca_accent_obert'}

/* ---------- temes ---------- */
Object.assign(SK,{
 ca_accent:{mat:'catala',ab:'Ac',nom:'L\'accentuació',ic:'á',
  teoria:['Segons on és la síl·laba forta (tònica), les paraules són <b>agudes</b> (la darrera: ca-<b>fè</b>), <b>planes</b> (la penúltima: <b>ca</b>-sa) o <b>esdrúixoles</b> (l\'antepenúltima: <b>mú</b>-si-ca).',
   `<table class="mini"><tr><th>Tipus</th><th>Porten accent si…</th><th>Exemples</th></tr><tr><td>Agudes</td><td>acaben en <b>vocal, -as, -es, -is, -os, -us, -en, -in</b></td><td>cafè, camió, francès, també</td></tr><tr><td>Planes</td><td><b>no</b> acaben en cap d'aquestes terminacions</td><td>fàcil, telèfon, còmic</td></tr><tr><td>Esdrúixoles</td><td><b>sempre</b></td><td>música, pàgina</td></tr></table>`,
   'L\'accent pot ser <b>obert</b> (à, è, ò) o <b>tancat</b> (é, í, ó, ú). La <b>a</b> sempre porta accent obert (à) i la <b>i</b> i la <b>u</b>, sempre tancat (í, ú). La <b>e</b> i la <b>o</b> poden ser obertes o tancades segons com sonen: cafè, però també; còmic, però camió.'],
  gen(lv){const[w,t]=pick(CA_ACC.filter(x=>lv>0||!x[2])),s=CA_STRIP(w);
   return{text:`Observa la paraula «<b>${s}</b>».<br>És aguda, plana o esdrúixola? Escriu-la ben accentuada.`,fields:[{label:'Aguda, plana o esdrúixola',txt:[CA_TIPUS[t]],loose:true},{label:'Ben escrita',txt:[w],wide:true}],vis:null,
    hints:['Digues la paraula en veu alta i pica de mans a cada síl·laba. Quina sona més forta?',t==='e'?'Les esdrúixoles sempre porten accent.':t==='a'?'Les agudes porten accent si acaben en vocal, -as, -es, -is, -os, -us, -en, -in.':'Les planes porten accent si NO acaben en vocal, -as, -es, -is, -os, -us, -en, -in.'],
    steps:[`La síl·laba tònica de «${s}» fa que sigui <b>${CA_TIPUS[t]}</b>.`,t==='e'?'Les esdrúixoles sempre s\'accentuen.':w===s?`Per la seva terminació, aquesta ${CA_TIPUS[t]} <b>no</b> porta accent.`:`Per la seva terminació, aquesta ${CA_TIPUS[t]} <b>sí</b> que porta accent.`,`S'escriu: <b>${w}</b>.`],
    err:v=>caAccentErr(w,v[1])}}},
 ca_apostrof:{mat:'catala',ab:'Ap',nom:'L\'apòstrof i les contraccions',ic:'\'',
  teoria:['Els articles <b>el</b> i <b>la</b> s\'apostrofen davant paraules que comencen per vocal o h: <b>l\'arbre</b>, <b>l\'home</b>, <b>l\'escola</b>. Però <b>la</b> no s\'apostrofa davant <b>i</b> o <b>u</b> àtones: <b>la universitat</b>, <b>la idea</b>.',
   'La preposició <b>de</b> també s\'apostrofa davant vocal: <b>d\'Anna</b>, <b>d\'aigua</b>.',
   `<b>Contraccions:</b> quan <b>a</b>, <b>de</b> o <b>per</b> van davant <b>el</b> o <b>els</b>, s'ajunten: <table class="mini"><tr><td>a + el = <b>al</b></td><td>de + el = <b>del</b></td><td>per + el = <b>pel</b></td></tr><tr><td>a + els = <b>als</b></td><td>de + els = <b>dels</b></td><td>per + els = <b>pels</b></td></tr></table> Però si l'article s'apostrofa, no hi ha contracció: <b>de l'arbre</b>.`],
  gen(lv){const n=pick(CA_NOMS.filter(x=>lv>0||!x[3])),r=Math.random();
   if(r<.45){const base=n[1]==='m'?'el':'la',ans=caArticle(n);
    return{text:`Escriu l'article i el nom correctament:<br><b>${base} + ${n[0]}</b>`,fields:[{label:'Article + nom',txt:[ans],wide:true}],vis:null,
     hints:[`Comença «${n[0]}» per vocal o per h?`,n[3]?'Compte: la no s\'apostrofa davant i o u àtones (sense força).':'Davant vocal o h, el i la s\'apostrofen: l\'.'],
     steps:[n[3]?`«${n[0]}» comença per una i o una u àtona: la <b>no</b> s'apostrofa.`:/^h?[aeiouàèéíòóú]/i.test(n[0])?`«${n[0]}» comença per vocal o h: l'article s'apostrofa.`:`«${n[0]}» comença per consonant: l'article no canvia.`,`Resposta: <b>${ans}</b>.`],
     err:v=>v[0]!==ans&&(v[0]===base+' '+n[0]||v[0]==="l'"+n[0])?'ca_apostrof':null}}
   const pl=lv>0&&Math.random()<.4&&n[1]==='m',p=pick(['de','a','per']),art=pl?'els '+n[2]:caArticle(n),ans=caPrep(p,art),shown=pl?`els + ${n[2]}`:`${n[1]==='m'?'el':'la'} + ${n[0]}`;
   return{text:`Escriu-ho correctament:<br><b>${p} + ${shown}</b>`,fields:[{label:'Resposta',txt:[ans],wide:true}],vis:null,
    hints:['Primer posa bé l\'article (apostrofat o no). Després mira si la preposició s\'ajunta amb l\'article.','a, de i per s\'ajunten només amb el i els: al, del, pel, als, dels, pels.'],
    steps:[`L'article queda: <b>${art}</b>.`,/^els? /.test(art)?`${p} + ${art.split(' ')[0]} fa contracció: <b>${ans.split(' ')[0]}</b>.`:'Amb aquest article no hi ha contracció.',`Resposta: <b>${ans}</b>.`],
    err:v=>v[0]!==ans&&(v[0]===p+' '+art)?'ca_contraccio':null}}},
 ca_dieresi:{mat:'catala',ab:'Di',nom:'La dièresi',ic:'ü',
  teoria:['La <b>dièresi</b> (¨) té dues funcions:','1. Damunt la <b>u</b> de <b>gü, qü</b> davant e o i, perquè la u es pronunciï: aigües, llengües, pingüí, qüestió.','2. Damunt la <b>i</b> o la <b>u</b> per indicar que no fan diftong amb la vocal del costat (es pronuncien separades): ve-<b>ï</b>-na, ra-<b>ï</b>m, pa-<b>ï</b>-sos.','No es posa dièresi si la i o la u ja porten accent (reunió, veí), ni en paraules acabades en -isme, -ista (egoista).'],
  gen(lv){const[s,w]=pick(CA_UML.filter(x=>lv>0||!x[2]));
   return{text:`Escriu correctament (posa dièresi <b>només</b> si cal):<br><b>${s}</b>`,fields:[{label:'Ben escrita',txt:[w],wide:true}],vis:null,
    hints:['Pronuncia-la lentament. Sona la u després de g o q? La i o la u sonen separades de la vocal del costat?','Si la vocal ja porta accent, no hi posis dièresi.'],
    steps:[w===s?`«${s}» no necessita dièresi: ${/gu[ei]|qu[ei]/.test(s)?'la u no sona':/ista$/.test(s)?'les paraules acabades en -ista són una excepció':'les vocals fan diftong'}.`:!/[üï]/.test(w)?`«${w}»: la vocal ja porta accent, i per això no cal dièresi.`:`«${w}»: ${/[gq]ü/.test(w)?'la u de gü/qü sona':'la vocal es pronuncia separada'}, per això porta dièresi.`,`S'escriu: <b>${w}</b>.`],
    err:v=>v[0]===w?null:(CA_STRIP_UML(v[0])===CA_STRIP_UML(w)?(w===CA_STRIP_UML(w)?'ca_dieresi_sobra':'ca_dieresi_falta'):null)}}},
 ca_consonants:{mat:'catala',ab:'Co',nom:'Ortografia de les consonants',ic:'b',
  teoria:['Algunes consonants poden fer dubtar: <b>b / v</b>, <b>g / j</b>, <b>tg / tj</b>, <b>s / ss</b>, <b>c / ç / z</b>, <b>r / rr</b> i <b>ll / l·l</b>.','Trucs: busca paraules de la mateixa <b>família</b> (cavall → cavaller), mira la <b>vocal que ve després</b> (gendre però jardí; rellotge però platja) i escolta si el so és <b>fort o suau</b> (massa / casa; carro / cara).','La <b>ela geminada</b> (l·l) s\'escriu amb punt volat: col·legi, il·lusió, pel·lícula.'],
  gen(lv){const[w,seg,opt,nr]=pick(CA_CONS.filter(x=>lv>0||!['tranquil·litat','intel·ligent','honrat'].includes(x[0]))),i=w.indexOf(seg),gap=w.slice(0,i)+'_'.repeat(seg.length===3?2:seg.length)+w.slice(i+seg.length);
   return{text:`Escriu la paraula completa:<br><b>${gap}</b> <span class="muted">(${opt})</span>`,fields:[{label:'Paraula',txt:[w],wide:true}],vis:null,
    hints:[caNormaSense(nr,w),'Digues la paraula en veu alta i pensa en una altra paraula de la mateixa família.'],steps:[CA_NORMA[nr],`S'escriu: <b>${w}</b>.`],
    err:v=>v[0]!==w&&nr==='l·l'&&v[0].replace(/l\.?l|ll/,'l·l')===w?'ca_l_geminada':null}}},
 ca_categories:{mat:'catala',ab:'Cg',nom:'Les categories gramaticals',ic:'N',
  teoria:['Cada paraula pertany a una <b>categoria gramatical</b>:',`<table class="mini">${Object.entries(CA_CAT_DEF).map(([k,d])=>`<tr><td><b>${k}</b></td><td>${d}</td></tr>`).join('')}</table>`,'Truc: el <b>nom</b> pot anar darrere «el / la»; l\'<b>adjectiu</b> respon «com és?»; el <b>verb</b> es pot conjugar (jo…, tu…).'],
  gen(){const[o,c]=pick(CA_CAT),w=o.match(/\*(.+?)\*/)[1],cat=caFirst(c).split(' ')[0];
   return{text:`De quina categoria gramatical és la paraula destacada?<br>${o.replace(/\*(.+?)\*/,'<b><u>$1</u></b>')}`,fields:[{label:'Categoria',txt:caAlts(c),loose:true,wide:true}],vis:null,
    hints:['Pensa què fa la paraula a la frase: anomena, descriu, expressa una acció, diu com o quan, acompanya el nom, substitueix, uneix…',`Comença per «${cat[0].toUpperCase()}».`],
    steps:[`«${w}» ${CA_CAT_DEF[cat]||''}.`,`Per tant, és ${['preposició','conjunció'].includes(cat)?'una':'un'} <b>${cat}</b>.`]}}},
 ca_conjugar:{mat:'catala',ab:'Vb',nom:'Conjugar verbs regulars',ic:'V',
  teoria:['Els verbs es classifiquen en tres <b>conjugacions</b> segons l\'infinitiu: <b>1a</b> -ar (cantar), <b>2a</b> -re / -er (perdre) i <b>3a</b> -ir (dormir, servir). A la 3a n\'hi ha de <b>purs</b> (dormo) i d\'<b>incoatius</b>, que afegeixen -eix- (serveixo).',
   'Temps que treballam: <b>present</b> (canto), <b>imperfet</b> (cantava), <b>passat perifràstic</b> (vaig cantar), <b>futur</b> (cantaré) i <b>condicional</b> (cantaria).',
   'A les Illes Balears també és correcte: <b>jo cant</b>, <b>jo perd</b>, <b>jo servesc</b> i <b>vàrem / vàreu / varen cantar</b>. Mira la <b>Taula de conjugació</b> per veure-ho tot.'],
  gen(lv){const[inf,mod]=pick(CA_VERBS.filter(x=>lv>0||x[1]!=='3i')),T=lv>0?Object.keys(CA_TEMPS):['pres','imp','fut','perif'],t=pick(T),pi=rnd(0,5),forms=caConj(inf,mod,t),ans=forms[pi];
   return{text:`Conjuga el verb <b>${inf}</b> en <b>${CA_TEMPS[t]}</b>:<br><b>${CA_PERS[pi]}</b> ___`,fields:[{label:'Forma verbal',txt:ans,wide:true}],vis:null,
    hints:[`«${inf}» és de la ${CA_MODEL[mod]}.`,(r=>`Mira com és en la persona «${CA_PERS[r]}»: ${forms[r][0]}.`)([3,4,0,1,2,5].find(i=>i!==pi&&!forms[i].some(f=>ans.some(a=>f.includes(a))))??[3,4,0,1,2,5].find(i=>i!==pi&&!forms[i].some(f=>ans.includes(f))))],
    steps:[`«${inf}» és de la ${CA_MODEL[mod]}.`,`${CA_TEMPS[t][0].toUpperCase()+CA_TEMPS[t].slice(1)}: ${forms.map((f,i)=>CA_PERS[i]+' '+f[0]).join(', ')}.`,`Resposta: <b>${CA_PERS[pi]} ${ans.join(' / ')}</b>.`],
    err:v=>ans.includes(v[0])?null:(forms.some((f,i)=>i!==pi&&f.includes(v[0]))?'ca_conj_persona':(Object.keys(CA_TEMPS).some(o=>o!==t&&caConj(inf,mod,o)[pi].includes(v[0]))?'ca_conj_temps':null))}}},
 ca_temps:{mat:'catala',ab:'Tv',nom:'Reconèixer el temps verbal',ic:'T',
  teoria:['Per saber en quin temps està un verb, fixa\'t en la terminació i en si hi ha un verb auxiliar:',`<table class="mini"><tr><td>Present</td><td>canto, perds, dorm</td></tr><tr><td>Imperfet</td><td>cantava, perdia, dormíem</td></tr><tr><td>Passat perifràstic</td><td><b>vaig</b> cantar, <b>vam</b> perdre</td></tr><tr><td>Futur</td><td>cantaré, perdràs, dormirem</td></tr><tr><td>Condicional</td><td>cantaria, perdries, dormiríem</td></tr></table>`],
  gen(){const[inf,mod]=pick(CA_VERBS),t=pick(Object.keys(CA_TEMPS)),pi=rnd(0,5),f=caConj(inf,mod,t)[pi][0];
   return{text:`En quin temps verbal està la forma «<b>${f}</b>» (verb <b>${inf}</b>)?`,fields:[{label:'Temps verbal',txt:CA_TEMPS_ALT[t],loose:true,wide:true}],vis:null,
    hints:['Té un verb auxiliar davant (vaig, vas, va…)? Acaba en -ava / -ia? Porta la r de l\'infinitiu (cantar-é, cantar-ia)?',`Comença per «${CA_TEMPS[t][0].toUpperCase()}».`],
    steps:[t==='perif'?'Porta l\'auxiliar anar (vaig, vas, va…) + infinitiu.':t==='imp'?'Acaba en -ava (1a conjugació) o -ia (2a i 3a).':t==='fut'?'Infinitiu + é, às, à, em, eu, an.':t==='cond'?'Infinitiu + ia, ies, ia, íem, íeu, ien.':'És el temps de l\'ara: canto, perds, dorm…',`És <b>${CA_TEMPS[t]}</b>.`]}}},
 ca_subjecte:{mat:'catala',ab:'Sj',nom:'Subjecte i predicat',ic:'S',
  teoria:['L\'<b>oració</b> té dues parts: el <b>subjecte</b> (qui fa l\'acció o de qui es diu alguna cosa) i el <b>predicat</b> (el que es diu del subjecte; té el verb).','Truc per trobar el subjecte: busca el <b>verb</b> i pregunta <b>qui?</b> Si canvies el subjecte de singular a plural, el verb també canvia (el gat dorm → els gats dormen).','El subjecte no sempre va al principi: «Demà vindran <b>els avis</b>».'],
  gen(){const[o,s]=pick(CA_SUBJ);
   return{text:`Escriu el <b>subjecte</b> d'aquesta oració:<br><i>${o}</i>`,fields:[{label:'Subjecte',txt:[s],loose:true,wide:true}],vis:null,
    hints:['Busca el verb i pregunta-li: qui…?',s.includes(' ')?`Comença per «${s.split(' ')[0]}».`:'És una sola paraula: mira de quina persona és el verb.'],steps:['Busquem el verb de l\'oració i li preguntam «qui?».',`El subjecte és: <b>${s}</b>. La resta de l'oració és el predicat.`]}}},
 ca_tipus_oracio:{mat:'catala',ab:'To',nom:'Tipus d\'oracions',ic:'?',
  teoria:['Segons la intenció de qui parla, les oracions poden ser:',`<table class="mini"><tr><td><b>Enunciatives</b></td><td>informen</td><td>Demà és dimarts.</td></tr><tr><td><b>Interrogatives</b></td><td>pregunten (?)</td><td>Quina hora és?</td></tr><tr><td><b>Exclamatives</b></td><td>expressen emoció (!)</td><td>Quin dia tan bonic!</td></tr><tr><td><b>Imperatives</b></td><td>donen una ordre o un consell</td><td>Tanca la porta.</td></tr></table>`],
  gen(){const[o,t]=pick(CA_ORA);
   return{text:`Quin tipus d'oració és?<br><i>${o}</i>`,fields:[{label:'Tipus',txt:[t],loose:true,wide:true}],vis:null,
    hints:['Fixa\'t en la intenció: informa, pregunta, expressa emoció o dona una ordre?',`Comença per «${t[0].toUpperCase()}».`],steps:[`«${o}» ${t==='interrogativa'?'fa una pregunta':t==='exclamativa'?'expressa una emoció':t==='imperativa'?'dona una ordre o un consell':'dona una informació'}.`,`És una oració <b>${t}</b>.`]}}},
 ca_sinonims:{mat:'catala',ab:'Sn',nom:'Sinònims i antònims',ic:'≈',
  teoria:['Els <b>sinònims</b> són paraules que volen dir el mateix o gairebé el mateix: content / feliç.','Els <b>antònims</b> volen dir el contrari: alt / baix, obrir / tancar.','Fer servir sinònims fa que els textos siguin més rics i no repetim sempre les mateixes paraules.'],
  gen(){const sin=Math.random()<.5,[w,a]=pick(sin?CA_SIN:CA_ANT);
   return{text:`Escriu un <b>${sin?'sinònim':'antònim'}</b> de «<b>${w}</b>».`,fields:[{label:sin?'Sinònim':'Antònim',txt:caAlts(a),loose:true,wide:true}],vis:null,
    hints:[sin?'Busca una paraula que es pugui posar al seu lloc sense canviar el sentit.':'Pensa en el contrari.',`Una possible resposta comença per «${caFirst(a)[0].toUpperCase()}».`],
    steps:[`${sin?'Sinònims':'Antònims'} de «${w}»: <b>${caAlts(a).join(', ')}</b>.`]}}},
 ca_prefixos:{mat:'catala',ab:'Px',nom:'Prefixos de negació',ic:'-',
  teoria:['Els <b>prefixos</b> s\'afegeixen davant una paraula per formar-ne una de nova.','Per dir el contrari fem servir <b>des-</b> (desfer), <b>in-</b> (inútil), <b>im-</b> davant p i b (impossible), <b>il-</b> davant l (il·legal) i <b>ir-</b> davant r (irregular).','Compte: il + legal = <b>il·legal</b> (amb ela geminada).'],
  gen(){const[b,a,p]=pick(CA_PREF);
   return{text:`Forma l'<b>antònim</b> de «<b>${b}</b>» amb un prefix.`,fields:[{label:'Paraula nova',txt:[a],wide:true}],vis:null,
    hints:['Prova amb des-, in-, im-, il- o ir-.',`Fixa't en com comença «${b}»: davant p i b, davant l i davant r, el prefix in- canvia de forma. Els verbs solen anar amb des-.`],steps:[`${p} + ${b} = <b>${a}</b>.`,p==='im-'?'Davant p o b, in- es converteix en im-.':p==='il-'?'Davant l, in- es converteix en il- i s\'escriu l·l.':p==='ir-'?'Davant r, in- es converteix en ir-.':'']}}},
 ca_recursos:{mat:'catala',ab:'Rl',nom:'Recursos literaris',ic:'✶',
  teoria:['Els escriptors fan servir <b>recursos literaris</b> per fer els textos més bells i expressius:',`<table class="mini">${Object.entries(CA_REC_DEF).map(([k,d])=>`<tr><td><b>${k}</b></td><td>${d}</td></tr>`).join('')}</table>`],
  gen(lv){const[o,r]=pick(CA_REC.filter(x=>lv>0||!x[2])),k=caFirst(r);
   return{text:`Quin recurs literari hi ha en aquesta frase?<br><i>${o}</i>`,fields:[{label:'Recurs',txt:caAlts(r),loose:true,wide:true}],vis:null,
    hints:['Compara? Diu que una cosa «és» una altra? Dona vida a una cosa? Exagera? Imita un so? Repeteix paraules o sons? Canvia l\'ordre?',`Comença per «${k[0].toUpperCase()}».`],steps:[`El recurs «${k}» ${CA_REC_DEF[k]}.`,`En aquesta frase hi ha una <b>${k}</b>.`],
    err:v=>caAlts(r).map(fold).includes(fold(v[0]))?null:(Object.keys(CA_REC_DEF).map(fold).includes(fold(v[0]))?'ca_recurs':null)}}},
 ca_rima:{mat:'catala',ab:'Ri',nom:'La rima i els gèneres literaris',ic:'♪',
  teoria:['La <b>rima</b> és la repetició de sons al final dels versos, a partir de la darrera vocal tònica:','<b>Consonant</b>: es repeteixen les vocals i les consonants (can<b>çó</b> / bal<b>có</b>, <b>nit</b> / l<b>lit</b>). <b>Assonant</b>: només les vocals (c<b>a</b>s<b>a</b> / pl<b>a</b>ç<b>a</b>).',
   'Els <b>gèneres literaris</b> són la <b>narrativa</b> (conte, novel·la, rondalla), la <b>poesia</b> o lírica (en vers) i el <b>teatre</b> (per representar). Les <b>rondalles</b> mallorquines són narracions populars que va recollir mossèn Antoni Maria Alcover.',
   'La literatura popular de les Illes també té <b>llegendes</b> (fets reals i fantàstics lligats a un lloc), <b>mites</b> (l\'origen del món, amb déus i herois), <b>gloses</b> (versos improvisats que es canten), <b>endevinalles</b>, <b>refranys</b> i <b>cançons</b>. Les <b>faules</b> són contes curts d\'animals amb una lliçó final.'],
  gen(lv){if(lv>0&&Math.random()<.5){const[a,b,t]=pick(CA_RIMA);
    return{text:`La rima entre «<b>${a}</b>» i «<b>${b}</b>», és consonant o assonant?`,fields:[{label:'Tipus de rima',txt:[t],loose:true}],vis:null,
     hints:['Mira a partir de la darrera vocal que sona forta.','Si coincideixen també les consonants, és consonant.'],steps:[t==='consonant'?'A partir de la vocal tònica coincideixen vocals i consonants.':'A partir de la vocal tònica només coincideixen les vocals.',`La rima és <b>${t}</b>.`]}}
   const[d,g]=pick(CA_GEN);
   return{text:`A quin gènere literari pertany?<br><i>${d}</i>`,fields:[{label:'Gènere',txt:caAlts(g),loose:true,wide:true}],vis:null,
    hints:['Està en vers o en prosa? Es representa?',`Comença per «${caFirst(g)[0].toUpperCase()}».`],steps:[`És <b>${caFirst(g)}</b>.`]}}},
 ca_lectura:{mat:'catala',ab:'Lc',nom:'Comprensió lectora',ic:'L',
  teoria:['Per entendre bé un text: <b>llegeix-lo sencer</b> una vegada, després <b>torna a llegir</b> la part on hi ha la resposta.','Fixa\'t en el títol, en <b>qui</b> hi surt, <b>on</b> i <b>quan</b> passa, i <b>què</b> passa.','Respon amb poques paraules i amb la informació del text.'],
  gen(){const L=pick(CA_LECT),[q,a]=pick(L.q);
   return{text:`<b>${L.t}</b><p style="font-size:18px;font-weight:500;line-height:1.6;background:var(--bg);padding:14px 16px;margin:10px 0">${L.x}</p>${q}`,fields:[{label:'Resposta',txt:caAlts(a),loose:true,wide:true}],vis:null,
    hints:['Torna a llegir el text a poc a poc.',`La resposta comença per «${caFirst(a)[0].toUpperCase()}».`],steps:['La resposta és al text.',`Resposta: <b>${caFirst(a)}</b>.`]}}}
});

/* ---------- errors típics ---------- */
Object.assign(ERR,{
 ca_accent_falta:{kid:'Falta l\'accent! Mira si és aguda, plana o esdrúixola i la seva terminació.',par:'Oblida posar l\'accent gràfic'},
 ca_accent_sobra:{kid:'Aquesta paraula no porta accent. Repassa la regla segons la terminació.',par:'Posa accents on no en van'},
 ca_accent_obert:{kid:'L\'accent és al lloc bo, però va al revés: és obert (à, è, ò) o tancat (é, í, ó, ú)?',par:'Confon l\'accent obert i el tancat'},
 ca_apostrof:{kid:'Revisa l\'apòstrof: el i la s\'apostrofen davant vocal o h (però la no, davant i / u àtones).',par:'Errors en l\'apostrofació de l\'article'},
 ca_contraccio:{kid:'Aquí la preposició i l\'article s\'ajunten: al, del, pel, als, dels, pels.',par:'No fa les contraccions (de el → del)'},
 ca_dieresi_falta:{kid:'Falta la dièresi: la u de gü/qü sona, o la vocal es pronuncia separada.',par:'Oblida la dièresi'},
 ca_dieresi_sobra:{kid:'Aquesta paraula no porta dièresi.',par:'Posa dièresi on no cal'},
 ca_l_geminada:{kid:'És una ela geminada: s\'escriu l·l, amb punt volat.',par:'Errors amb la ela geminada (l·l)'},
 ca_conj_persona:{kid:'La forma existeix, però és d\'una altra persona. Mira bé el subjecte.',par:'Confon la persona del verb'},
 ca_conj_temps:{kid:'Aquesta forma és d\'un altre temps verbal. Revisa el temps que et demanen.',par:'Confon els temps verbals'},
 ca_recurs:{kid:'És un recurs literari, però no aquest. Repassa la diferència entre comparació, metàfora i personificació.',par:'Confon els recursos literaris'}
});

/* ---------- unitats: a catala-unitats.js ---------- */

/* ---------- utilitats per als altres arxius de Català ---------- */
// Exercici de resposta escrita. ans: llista de respostes acceptades (la primera és la que es mostra).
// o: {label, loose, hints, steps, err, fig}
function caEx(text,ans,o={}){return{text,fields:[{label:o.label||'Resposta',txt:o.loose?ans:ans.map(caLow),loose:!!o.loose,wide:true}],vis:null,fig:o.fig,
 hints:o.hints||[],steps:o.steps||[`Resposta: <b>${ans[0]}</b>.`],err:o.err}}
// Marca la paraula entre asteriscs: «El *gat* dorm» → El <b><u>gat</u></b> dorm
const caMark=s=>s.replace(/\*(.+?)\*/g,'<b><u>$1</u></b>');
const caStar=s=>(s.match(/\*(.+?)\*/)||[])[1]||'';
const caLow=s=>s.toLowerCase();
const caCap=s=>s[0].toUpperCase()+s.slice(1);
// Mateixa resposta sense tenir en compte accents, majúscules ni articles (per detectar errors típics)
const caSame=(a,b)=>fold(a)===fold(b);

/* ---------- material: taula de conjugació ---------- */
MATERIAL.catala=[{obre:'conjTable()',ic:'list',nom:'Taula de conjugació',desc:'Verbs regulars models: cantar, perdre, dormir, servir'}];
function conjTable(model='cantar'){endSession();const M={cantar:'1',perdre:'2',dormir:'3',servir:'3i'};
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-catala)">Material · Català</div><h2>Taula de conjugació</h2><p class="muted">Verbs regulars models. Entre parèntesis, la forma balear.</p></div><button class="ghost" onclick="subject('catala')">← Tornar</button></div>
 <div class="tabs">${Object.keys(M).map(v=>`<button data-v="${v}" class="${v===model?'on':''}">${v}</button>`).join('')}</div>
 <div class="card"><p style="margin-top:0"><b>${model}</b> · ${CA_MODEL[M[model]]}</p><div class="tablewrap"><table class="vt"><tr><th>Persona</th>${Object.values(CA_TEMPS).map(t=>`<th>${t}</th>`).join('')}</tr>
 ${CA_PERS.map((p,i)=>`<tr><td><b>${p}</b></td>${Object.keys(CA_TEMPS).map(t=>{const f=caConj(model,M[model],t)[i];return`<td>${f[0]}${f[1]?` <span class="muted">(${f[1]})</span>`:''}</td>`}).join('')}</tr>`).join('')}</table></div></div>
 <div class="card"><h3>Practica</h3><div class="row"><button data-p="ca_conjugar">Conjugar verbs</button><button class="sec" data-p="ca_temps">Reconèixer el temps</button></div></div>`);
 document.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>conjTable(b.dataset.v));
 document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>start('exercicis',[b.dataset.p],15))}
