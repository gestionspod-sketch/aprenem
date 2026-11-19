/* Aprenem - LLENGUA CATALANA 6è: GRAMÀTICA
   Gènere i nombre, determinants i pronoms personals, sintagma nominal, subjecte el·líptic i verbs impersonals,
   verbs copulatius / transitius / intransitius, veu passiva, verbs irregulars (amb taula), temps compostos,
   modes i formes no personals, perífrasis verbals, complement directe, indirecte i circumstancial, atribut,
   oracions simples i compostes, pronoms febles.
   Part de l'app d'estudi. Vegeu CLAUDE.md i la capçalera de contingut/catala.js (fonts). */
(()=>{
const PERS=['jo','tu','ell / ella','nosaltres','vosaltres','ells / elles'];
const PRON=[['jo'],['tu'],['ell','ella','vostè'],['nosaltres'],['vosaltres'],['ells','elles','vostès']];
const A=s=>s.split('|');

/* ---------- gènere i nombre ---------- */
const FEM=[['actor','actriu'],['lleó','lleona'],['gall','gallina'],['cavall','euga'],['home','dona'],['rei','reina'],['alcalde','alcaldessa'],['metge','metgessa'],['nebot','neboda'],['oncle','tia'],['gendre','nora'],['boc','cabra'],['cosí','cosina'],['francès','francesa'],['poeta','poetessa|poeta'],
 ['feliç','feliç'],['alt','alta'],['blanc','blanca'],['boig','boja'],['lleig','lletja'],['roig','roja'],['groc','groga'],['nou','nova'],['blau','blava'],['mut','muda'],['amic','amiga'],['jove','jove'],['dolç','dolça']];
const PLU=[['llapis','llapis'],['peix','peixos|peixs'],['braç','braços'],['gos','gossos'],['mes','mesos'],['francès','francesos'],['mà','mans'],['camió','camions'],['raó','raons'],['platja','platges'],['figa','figues'],['pluja','pluges'],['oca','oques'],['aigua','aigües'],['llengua','llengües'],
 ['boig','bojos|boigs'],['passeig','passejos|passeigs'],['roig','rojos|roigs'],['joc','jocs'],['test','tests|testos'],['bosc','boscos|boscs'],['examen','exàmens'],['jove','joves'],['cafè','cafès'],['sofà','sofàs'],['desig','desitjos|desigs'],['ou','ous'],['dit','dits']];

/* ---------- determinants i pronoms ---------- */
const DET=[['*Aquella* casa és molt antiga.','demostratiu'],['*Els* nins juguen al pati.','article'],['La *meva* bicicleta és vermella.','possessiu'],['He comprat *tres* pomes.','numeral'],['*Alguns* alumnes han arribat tard.','indefinit'],['*Quin* llibre vols?','interrogatiu'],['*Quina* sorpresa!','exclamatiu'],
 ['*Aquests* pantalons són nous.','demostratiu'],['El *seu* germà és molt alt.','possessiu'],['Som el *primer* equip de la lliga.','numeral'],['*Molts* ocells emigren a l\'hivern.','indefinit'],['*Quants* anys tens?','interrogatiu'],['*Cada* dia vaig a l\'escola a peu.','indefinit'],['*Na* Joana viu a Manacor.','article|article personal'],['*En* Miquel toca la guitarra.','article|article personal'],['Les *nostres* vacances seran a Menorca.','possessiu'],['*La* platja és plena de gent.','article'],['*Quina* hora és?','interrogatiu']];
const DET_DEF={article:'acompanya el nom i diu si ja el coneixem (el, la, els, les, l\', un, una; i els personals en, na)',demostratiu:'indica si una cosa és a prop o lluny (aquest, aquell, aqueix)',possessiu:'diu de qui és una cosa (meu, teu, seu, nostre, vostre)',numeral:'diu quants n\'hi ha o en quin ordre (tres, primer)',indefinit:'indica una quantitat sense precisar-la (alguns, molts, cada, cap, tot)',interrogatiu:'serveix per preguntar (quin, quants)',exclamatiu:'expressa emoció (quina sorpresa!)'};
const PP=[['*Na Maria i jo* anirem al cine.','nosaltres'],['*En Pau* juga a bàsquet.','ell'],['*Les meves cosines* viuen a Inca.','elles'],['*Tu i en Joan* sou germans.','vosaltres'],['*Els padrins* arriben demà.','ells'],['*La mestra* explica la lliçó.','ella'],['*Tu i jo* som amics.','nosaltres'],['*En Pere i na Laia* ballen molt bé.','ells'],['*Les nines i tu* heu guanyat.','vosaltres'],['*El meu ca* dorm a la terrassa.','ell']];

/* ---------- sintagma nominal ---------- */
const SN=[['el llibre de contes','llibre','de contes'],['una samarreta blava','samarreta','blava'],['els moixos negres','moixos','negres'],['la porta de fusta','porta','de fusta'],['aquell ca petit','ca','petit'],['el pastís de xocolata','pastís','de xocolata'],['les sabates noves','sabates','noves'],['un vaixell de vela','vaixell','de vela'],['la ciutat de Palma','ciutat','de palma'],['unes vacances fantàstiques','vacances','fantàstiques'],['el cotxe del meu pare','cotxe','del meu pare'],['la meva motxilla vermella','motxilla','vermella'],['tres gots d\'aigua','gots','d\'aigua'],['aquesta cançó tan bonica','cançó','tan bonica']];

/* ---------- subjecte el·líptic ---------- */
const SE_V=[['cantar','1','una cançó'],['parlar','1','amb la mestra'],['ballar','1','a la festa'],['nedar','1','a la piscina'],['pintar','1','un quadre'],['escoltar','1','música'],['mirar','1','la televisió'],['ajudar','1','els padrins'],['dormir','3','a casa'],['llegir','3i','un conte'],['perdre','2','les claus'],['servir','3i','el sopar']];
const IMP=[['Plou a bots i barrals.','plou'],['Neva a la muntanya.','neva'],['Fa molt de fred.','fa'],['Hi ha tres moixos al pati.','hi ha'],['Avui trona molt.','trona'],['Fa sol i calor.','fa'],['Ahir va calabruixar.','va calabruixar'],['Hi havia molta gent a la plaça.','hi havia']];
const NOSUBJ=['no en té','cap','no té subjecte','impersonal','sense subjecte','cap subjecte','no','no hi ha subjecte','no te','ningú','és impersonal'];

/* ---------- tipus de verbs ---------- */
// [oració, verb, c = copulatiu, t = transitiu, i = intransitiu, atribut o CD]
const VT=[['La sopa és calenta.','és','c','calenta'],['Els meus cosins són simpàtics.','són','c','simpàtics'],['En Marc està molt content.','està','c','molt content'],['Aquest moix sembla cansat.','sembla','c','cansat'],['La pel·lícula era molt divertida.','era','c','molt divertida'],['Les flors estaven pansides.','estaven','c','pansides'],['La meva germana és metgessa.','és','c','metgessa'],
 ['La Marta menja una poma.','menja','t','una poma'],['Els alumnes llegeixen un conte.','llegeixen','t','un conte'],['El pagès cull les olives.','cull','t','les olives'],['El meu germà toca la guitarra.','toca','t','la guitarra'],['Vaig veure una pel·lícula.','vaig veure','t','una pel·lícula'],['La mestra explica la lliçó.','explica','t','la lliçó'],
 ['El nadó dorm.','dorm','i'],['Els ocells volen molt alt.','volen','i'],['La padrina camina pel parc.','camina','i'],['Demà arribaran els cosins.','arribaran','i'],['La nina plora.','plora','i'],['El sol surt per l\'est.','surt','i']];
const VT_ANS={c:['copulatiu','atributiu'],t:['transitiu','predicatiu transitiu'],i:['intransitiu','predicatiu intransitiu']};

/* ---------- veu passiva ---------- */
const PAS=[['El moix persegueix el ratolí.','El ratolí ___ pel moix.','és perseguit'],['La mestra corregeix els exàmens.','Els exàmens ___ per la mestra.','són corregits'],['Els bombers van apagar el foc.','El foc ___ pels bombers.','va ser apagat|fou apagat'],['L\'Anna escriurà la carta.','La carta ___ per l\'Anna.','serà escrita'],
 ['Els pagesos cullen les ametles.','Les ametles ___ pels pagesos.','són collides'],['Picasso va pintar aquest quadre.','Aquest quadre ___ per Picasso.','va ser pintat|fou pintat'],['L\'arquitecta dissenya l\'edifici.','L\'edifici ___ per l\'arquitecta.','és dissenyat'],['Els alumnes decoraran la classe.','La classe ___ pels alumnes.','serà decorada'],['El cuiner prepara el sopar.','El sopar ___ pel cuiner.','és preparat'],['La policia va detenir els lladres.','Els lladres ___ per la policia.','van ser detinguts|foren detinguts']];
const AGENT=[['La cançó va ser cantada per tot el públic.','per tot el públic'],['El pastís va ser fet per la meva padrina.','per la meva padrina'],['Les cartes són repartides pel carter.','pel carter'],['La notícia serà llegida per la presentadora.','per la presentadora'],['El partit va ser guanyat pel nostre equip.','pel nostre equip']];

/* ---------- verbs irregulars ---------- */
// Cada forma: 'estàndard|alternativa balear o també correcta'
const IRR={
 ser:{pres:['soc','ets','és','som','sou','són'],imp:['era','eres','era','érem','éreu','eren'],fut:'ser',cond:'ser',part:'estat|sigut',ger:'sent|essent'},
 estar:{pres:['estic','estàs','està','estem|estam','esteu|estau','estan'],imp:'estav',fut:'estar',cond:'estar',part:'estat',ger:'estant'},
 haver:{pres:['he|haig','has','ha','hem|havem','heu|haveu','han'],imp:'havi',fut:'haur',cond:'haur',part:'hagut',ger:'havent'},
 fer:{pres:['faig','fas','fa','fem','feu|feis','fan'],imp:['feia','feies','feia','fèiem','fèieu','feien'],fut:'far',cond:'far',part:'fet',ger:'fent'},
 anar:{pres:['vaig','vas','va','anem|anam','aneu|anau','van'],imp:'anav',fut:'anir',cond:'anir',part:'anat',ger:'anant'},
 dir:{pres:['dic','dius','diu','diem|deim','dieu|deis','diuen'],imp:['deia','deies','deia','dèiem','dèieu','deien'],fut:'dir',cond:'dir',part:'dit',ger:'dient'},
 veure:{pres:['veig','veus','veu','veiem|veim','veieu|veis','veuen'],imp:['veia','veies','veia','vèiem','vèieu','veien'],fut:'veur',cond:'veur',part:'vist',ger:'veient'},
 venir:{pres:['vinc|venc','véns|vens','ve','venim','veniu','vénen|venen'],imp:'veni',fut:'vindr',cond:'vindr',part:'vingut',ger:'venint'},
 tenir:{pres:['tinc|tenc','tens','té','tenim','teniu','tenen'],imp:'teni',fut:'tindr',cond:'tindr',part:'tingut',ger:'tenint'},
 poder:{pres:['puc','pots','pot','podem','podeu','poden'],imp:'podi',fut:'podr',cond:'podr',part:'pogut',ger:'podent'},
 voler:{pres:['vull','vols','vol','volem','voleu','volen'],imp:'voli',fut:'voldr',cond:'voldr',part:'volgut',ger:'volent'},
 saber:{pres:['sé','saps','sap','sabem','sabeu','saben'],imp:'sabi',fut:'sabr',cond:'sabr',part:'sabut',ger:'sabent'},
 conèixer:{pres:['conec','coneixes','coneix','coneixem','coneixeu','coneixen'],imp:'coneixi',fut:'coneixer',cond:'coneixer',part:'conegut',ger:'coneixent'},
 viure:{pres:['visc','vius','viu','vivim','viviu','viuen'],imp:'vivi',fut:'viur',cond:'viur',part:'viscut',ger:'vivint'},
 escriure:{pres:['escric','escrius','escriu','escrivim','escriviu','escriuen'],imp:'escrivi',fut:'escriur',cond:'escriur',part:'escrit',ger:'escrivint'},
 beure:{pres:['bec','beus','beu','bevem','beveu','beuen'],imp:'bevi',fut:'beur',cond:'beur',part:'begut',ger:'bevent'},
 prendre:{pres:['prenc','prens','pren','prenem','preneu','prenen'],imp:'preni',fut:'prendr',cond:'prendr',part:'pres',ger:'prenent'}};
const IRR_T={pres:'present',imp:'imperfet',fut:'futur',cond:'condicional',part:'participi',ger:'gerundi'};
// Retorna les 6 formes (cada una, llista d'alternatives) d'un temps personal
function irr(v,t){const d=IRR[v][t];if(Array.isArray(d))return d.map(A);
 if(t==='imp')return/av$/.test(d)?['ava','aves','ava','àvem','àveu','aven'].map(e=>[d.slice(0,-2)+e]):['ia','ies','ia','íem','íeu','ien'].map(e=>[d.slice(0,-1)+e]);
 return(t==='fut'?['é','às','à','em','eu','an']:['ia','ies','ia','íem','íeu','ien']).map(e=>[d+e])}
const irrNF=(v,t)=>A(IRR[v][t]);
// forma «regular» que faria un infant que no sap que el verb és irregular (per detectar l'error)
function irrReg(v,t,pi){const inf=v.normalize('NFD').replace(/[̀-ͯ]/g,'').normalize('NFC');
 const mod=/ar$/.test(inf)?'1':/ir$/.test(inf)?'3':'2';
 if(t==='part')return[inf.replace(/(ar|ir|re|er)$/,{1:'at',2:'ut',3:'it'}[mod])];
 if(t==='ger')return[inf.replace(/(ar|ir|re|er)$/,{1:'ant',2:'ent',3:'int'}[mod])];
 if(t==='fut'||t==='cond'){const b=/re$/.test(inf)?inf.slice(0,-1):inf;return[b+(t==='fut'?['é','às','à','em','eu','an']:['ia','ies','ia','íem','íeu','ien'])[pi]]}
 if(t==='pres'){const st=inf.replace(/(ar|ir|re|er)$/,'');return[[st+'o',st+'es',st+'a',st+'em',st+'eu',st+'en'],[st+'o',st+'s',st,st+'em',st+'eu',st+'en']][mod==='1'?0:1].slice(pi,pi+1)}
 return[]}

/* ---------- temps compostos ---------- */
const AUX={perf:['he|haig','has','ha','hem|havem','heu|haveu','han'],plusq:['havia','havies','havia','havíem','havíeu','havien'],futp:['hauré','hauràs','haurà','haurem','haureu','hauran'],condp:['hauria','hauries','hauria','hauríem','hauríeu','haurien']};
const AUX_T={perf:'perfet',plusq:'plusquamperfet',futp:'futur perfet',condp:'condicional perfet'};
const AUX_ALT={perf:['perfet','pretèrit perfet','perfet d\'indicatiu','pretèrit perfet d\'indicatiu'],plusq:['plusquamperfet','pretèrit plusquamperfet','plusquamperfet d\'indicatiu'],futp:['futur perfet','futur compost'],condp:['condicional perfet','condicional compost']};
const PART=[['cantar','cantat'],['menjar','menjat'],['jugar','jugat'],['acabar','acabat'],['arribar','arribat'],['perdre','perdut'],['dormir','dormit'],['llegir','llegit'],['servir','servit'],['fer','fet'],['dir','dit'],['veure','vist'],['escriure','escrit'],['prendre','pres'],['viure','viscut'],['beure','begut'],['tenir','tingut'],['venir','vingut'],['conèixer','conegut'],['poder','pogut'],['saber','sabut'],['obrir','obert'],['morir','mort'],['néixer','nascut']];

/* ---------- modes i formes no personals ---------- */
const MODE=[['Demà *anirem* a la platja.','indicatiu'],['Vull que *vinguis* a la festa.','subjuntiu'],['*Tanca* la finestra, per favor.','imperatiu'],['Espero que *faci* bon temps.','subjuntiu'],['La Marta *llegeix* un llibre.','indicatiu'],['*Escoltau* bé la mestra.','imperatiu'],['Si *tingués* temps, et visitaria.','subjuntiu'],
 ['M\'agrada *nedar*.','infinitiu'],['Va arribar *corrent*.','gerundi'],['He *acabat* els deures.','participi'],['Ahir *jugàvem* al parc.','indicatiu'],['Quan *siguis* gran, ho entendràs.','subjuntiu'],['*Vine* aquí de seguida!','imperatiu'],['Els nins estan *dormint*.','gerundi'],['La porta està *tancada*.','participi'],['Abans de *sortir*, apaga el llum.','infinitiu'],['Tant de bo no *plogui* demà.','subjuntiu'],['Jo *cantava* al cor de l\'escola.','indicatiu']];
const MODE_DEF={indicatiu:'expressa fets reals o segurs',subjuntiu:'expressa desitjos, dubtes o possibilitats (sovint darrere «que»)',imperatiu:'dona ordres o consells',infinitiu:'és el nom del verb (-ar, -er, -re, -ir)',gerundi:'acaba en -ant, -ent, -int',participi:'acaba en -at, -ut, -it (o és irregular: fet, dit, vist)'};
const GER=[['cantar','cantant'],['menjar','menjant'],['córrer','corrent'],['perdre','perdent'],['dormir','dormint'],['llegir','llegint'],['fer','fent'],['dir','dient'],['veure','veient'],['viure','vivint'],['escriure','escrivint'],['beure','bevent'],['riure','rient'],['venir','venint']];

/* ---------- perífrasis ---------- */
const PF=[['Hem de fer els deures abans de sopar.','hem de fer','ob'],['Deuen ser les cinc.','deuen ser','pr'],['Els nins estan jugant al pati.','estan jugant','cu'],['Comença a ploure.','comença a ploure','in'],['Acab de dinar.','acab de dinar','ac'],['Torna a sonar el telèfon.','torna a sonar','re'],['Has d\'estudiar més.','has d\'estudiar','ob'],['Deu fer fred a la muntanya.','deu fer','pr'],['Estic llegint un llibre.','estic llegint','cu'],['La Marta acaba d\'arribar.','acaba d\'arribar','ac'],['Tornarem a jugar demà.','tornarem a jugar','re'],['Comencen a riure.','comencen a riure','in']];
const PF_ANS={ob:['obligació','necessitat'],pr:['probabilitat','suposició','possibilitat'],cu:['acció en curs','durada','continuïtat','acció que dura','acció en desenvolupament'],in:['inici','començament','acció que comença'],ac:['acabament','acció acabada','final','acció acabada de fer'],re:['repetició','acció repetida']};
const PF_FORM={ob:'haver de + infinitiu',pr:'deure + infinitiu',cu:'estar + gerundi',in:'començar a + infinitiu',ac:'acabar de + infinitiu',re:'tornar a + infinitiu'};

/* ---------- complements ---------- */
const CD=[['La Marta menja la poma.','la poma','la'],['En Joan llegeix el diari.','el diari','el'],['Els nins pinten les parets.','les parets','les'],['La padrina rega els tomàquets.','els tomàquets','els'],['Vull aquest llibre.','aquest llibre','el'],['No sé això.','això','ho'],['El pagès cull les ametles.','les ametles','les'],['Mon pare renta el cotxe.','el cotxe','el'],['La mestra explica la lliçó.','la lliçó','la'],['Ajudarem els padrins.','els padrins','els'],['Veig la meva cosina cada dia.','la meva cosina','la'],
 ['Compram pa al forn.','pa','en',1],['Beu aigua fresca.','aigua fresca','en',1],['Tinc tres germans.','tres germans','en',1],['Ella ha dit això.','això','ho',1]];
const CI=[['He donat un regal a la meva germana.','a la meva germana','li'],['La mestra explica un conte als alumnes.','als alumnes','els'],['Escric una carta a la padrina.','a la padrina','li'],['Vaig regalar flors a la mare.','a la mare','li'],['Torna el llibre al teu germà.','al teu germà','li'],['Demanarem ajuda als bombers.','als bombers','els'],['El metge va donar un xarop al nin.','al nin','li'],['Hem enviat un missatge als cosins.','als cosins','els'],['Llegeix un conte a les nines.','a les nines','els'],['Diré la veritat a les mestres.','a les mestres','els']];
const CC=[['Els nins juguen al pati.','al pati','lloc'],['Arribarem demà.','demà','temps'],['La nina canta molt bé.','molt bé','manera'],['Ballo amb la meva cosina.','amb la meva cosina','companyia'],['Escriu amb el llapis.','amb el llapis','instrument'],['El tren surt a les nou.','a les nou','temps'],['Camina a poc a poc.','a poc a poc','manera'],['Menja massa.','massa','quantitat'],['No va venir per la pluja.','per la pluja','causa'],['Estudia per aprovar.','per aprovar','finalitat'],['Talla el pa amb un ganivet.','amb un ganivet','instrument'],['Ens veurem dissabte.','dissabte','temps'],['Viuen a Ciutadella.','a ciutadella','lloc'],['Dorm a la seva habitació.','a la seva habitació','lloc'],['Va de vacances amb els seus amics.','amb els seus amics','companyia']];
const CC_ANS={lloc:['lloc'],temps:['temps'],manera:['manera','mode'],companyia:['companyia'],instrument:['instrument','mitjà'],quantitat:['quantitat'],causa:['causa'],finalitat:['finalitat']};
const CC_Q={lloc:'on?',temps:'quan?',manera:'com?',companyia:'amb qui?',instrument:'amb què?',quantitat:'quant?',causa:'per què?',finalitat:'per a què?'};

/* ---------- oracions simples i compostes ---------- */
// [oració, nombre de verbs conjugats, nexe (si és composta)]
const OC=[['La Laia llegeix un llibre.',1],['La Laia llegeix i el seu germà dibuixa.',2,'i'],['Vam anar a la platja, però plovia.',2,'però'],['Els ocells canten al matí.',1],['Vull que vinguis a la festa.',2,'que'],['Quan arribis, telefona\'m.',2,'quan'],['Ahir vaig veure una pel·lícula molt divertida.',1],['Estudia molt perquè vol ser metgessa.',2,'perquè'],['El meu ca dorm sempre davall la taula.',1],['M\'agrada la música, però no sé tocar cap instrument.',2,'però'],['Menja, calla i escolta.',3,'i'],['Si fa bo, anirem d\'excursió.',2,'si'],['Les flors del jardí són precioses.',1],['Sortirem quan acabi la pluja.',2,'quan']];

/* ---------- pronoms febles ---------- */
// [oració amb el complement entre *asteriscs*, resultat (pronom + verb), resta de l'oració]
const PF2=[['Veu *na Maria* cada dia.','la veu',' cada dia.'],['Compra *el pa* al forn.','el compra',' al forn.'],['Espera *l\'autobús* a la parada.','l\'espera',' a la parada.'],['Renta *els plats* després de sopar.','els renta',' després de sopar.'],['Dona un regal *a l\'Anna*.','li dona',' un regal.'],['Expliquen un conte *als nins*.','els expliquen',' un conte.'],['Sap *això* de memòria.','ho sap',' de memòria.'],['Va *a Palma* demà.','hi va',' demà.'],
 ['Menja *pomes* cada dia.','en menja',' cada dia.'],['Agafa *aigua* de la font.','n\'agafa',' de la font.'],['Obren *la porta* a les nou.','l\'obren',' a les nou.'],['Envia un missatge *a les seves amigues*.','els envia',' un missatge.'],['Estima molt *els seus padrins*.','els estima',' molt.'],['Escriu *la carta* amb bolígraf.','l\'escriu',' amb bolígraf.'],['Viu *a Inca*.','hi viu','.'],['Parla *de futbol* tot el dia.','en parla',' tot el dia.']];

Object.assign(SK,{
 ca_genere_nombre:{mat:'catala',ab:'Gn',curs:[6],nom:'El gènere i el nombre',
  teoria:['Els noms i els adjectius tenen <b>gènere</b> (masculí o femení) i <b>nombre</b> (singular o plural).',
   '<b>Femení:</b> normalment s\'afegeix <b>-a</b> (amic → amiga, alt → alta). Alguns fan canvis: groc → groga, blau → blava, boig → boja, lleig → lletja. Uns quants tenen terminacions especials (actor → actriu, metge → metgessa) o una paraula diferent (cavall → euga, home → dona). Alguns no canvien: feliç, jove.',
   '<b>Plural:</b> normalment s\'afegeix <b>-s</b>. Les paraules acabades en <b>-s, -ç, -x, -ix</b> agudes fan <b>-os</b> (gos → gossos, braç → braços, peix → peixos). Les acabades en <b>-a</b> fan <b>-es</b> i poden canviar la lletra d\'abans: platja → platges, figa → figues, pluja → pluges, aigua → aigües. Les agudes acabades en vocal accentuada afegeixen <b>-ns</b>: camió → camions, mà → mans.'],
  gen(lv){if(Math.random()<.45){const[m,f]=pick(FEM);
    return caEx(`Escriu el <b>femení</b> de «<b>${m}</b>».`,A(f),{label:'Femení',
     hints:['Normalment s\'afegeix -a, però mira si canvia alguna lletra (c → g, u → v...).','Hi ha paraules que tenen una forma diferent per al femení.'],
     steps:[A(f)[0]===m?`«${m}» no canvia: és igual en masculí i en femení.`:`El femení de «${m}» és <b>${A(f)[0]}</b>.`]})}
   const[s,p]=pick(PLU.filter(x=>lv>0||!/\|/.test(x[1])||x[0]==='peix')),ok=A(p);
   return caEx(`Escriu el <b>plural</b> de «<b>${s}</b>».`,ok,{label:'Plural',
    hints:['Acaba en -s, -ç, -x? En -a? En vocal accentuada?','Pensa en «un… / uns…».'],
    steps:[/[sçx]$/.test(s)&&ok[0].endsWith('os')?'Les paraules agudes acabades en -s, -ç, -x fan el plural en -os.':/a$/.test(s)?'Les paraules acabades en -a fan -es (i poden canviar la consonant d\'abans per mantenir el so).':/[àéíóú]$/.test(s)&&ok[0].endsWith('ns')?'Les agudes acabades en vocal accentuada solen fer -ns.':s===ok[0]?`«${s}» és plana acabada en -s: no canvia.`:'Normalment s\'afegeix -s.',`Plural: <b>${ok.join(' / ')}</b>.`],
    err:v=>ok.includes(v[0])?null:(v[0]===s+'s'||v[0]===s.replace(/a$/,'es'))&&s!==v[0]?'ca_plural':null})}},

 ca_determinants:{mat:'catala',ab:'Dt',curs:[6],nom:'Determinants i pronoms personals',
  teoria:['Els <b>determinants</b> acompanyen el nom i en precisen el significat:',`<table class="mini">${Object.entries(DET_DEF).map(([k,d])=>`<tr><td><b>${k}</b></td><td>${d}</td></tr>`).join('')}</table>`,
   'A les Illes, davant noms de persona feim servir l\'<b>article personal</b>: <b>en</b> Miquel, <b>na</b> Joana (davant vocal: <b>n\'</b>Antoni, <b>n\'</b>Aina).',
   'Els <b>pronoms personals forts</b> substitueixen el nom d\'una persona: <b>jo, tu, ell / ella, vostè, nosaltres, vosaltres, ells / elles, vostès</b>.'],
  gen(){if(Math.random()<.6){const[f,t]=pick(DET),w=caStar(f),k=A(t)[0];
    return caEx(`De quin tipus és el determinant destacat?<br><i>${caMark(f)}</i>`,A(t),{label:'Tipus de determinant',loose:true,
     hints:['Diu de qui és? Si és a prop o lluny? Quants? Pregunta? Exclama?',`Comença per «${k[0].toUpperCase()}».`],
     steps:[`«${w}» ${DET_DEF[k]}.`,`És un determinant <b>${k}</b>.`],
     err:v=>Object.keys(DET_DEF).some(x=>caSame(x,v[0]))&&!A(t).some(x=>caSame(x,v[0]))?'ca_determinant':null})}
   const[f,p]=pick(PP);
   return caEx(`Substitueix les paraules destacades per un <b>pronom personal</b>:<br><i>${caMark(f)}</i>`,[p],{label:'Pronom',
    hints:['Quantes persones són? Hi ha «jo» o «tu» entre elles?','Si hi ha «jo», és nosaltres; si hi ha «tu» (sense jo), vosaltres.'],
    steps:[/(^|\s)jo(\s|$)/.test(caLow(caStar(f)))?'Hi ha «jo» dins el grup: nosaltres.':/(^|\s)tu(\s|$)/.test(caLow(caStar(f)))?'Hi ha «tu» dins el grup: vosaltres.':`«${caStar(f)}» és tercera persona.`,`Pronom: <b>${p}</b>.`]})}},

 ca_sintagma_nominal:{mat:'catala',ab:'Sn',curs:[6],nom:'El sintagma nominal',
  teoria:['Un <b>sintagma nominal</b> és un grup de paraules que té com a paraula principal (<b>nucli</b>) un <b>nom</b>: <i>la casa vella</i>.',
   'El nucli pot anar acompanyat de <b>determinants</b> (la, aquell, tres) i de <b>complements del nom</b>, que el precisen: un <b>adjectiu</b> (<i>vella</i>) o un grup que comença per <b>preposició</b> (<i>de fusta</i>, <i>del meu pare</i>).',
   `<table class="mini"><tr><th>Determinant</th><th>Nucli</th><th>Complement del nom</th></tr><tr><td>el</td><td>llibre</td><td>de contes</td></tr><tr><td>unes</td><td>vacances</td><td>fantàstiques</td></tr></table>`],
  gen(){const[sn,n,c]=pick(SN);
   return{text:`Analitza el sintagma nominal «<b>${sn}</b>».`,fields:[{label:'Nucli (el nom)',txt:[caLow(n)],wide:true},{label:'Complement del nom',txt:[c],loose:true,wide:true}],vis:null,
    hints:['El nucli és el nom: la paraula més important.','El complement del nom és l\'adjectiu o el grup amb preposició que ens diu com és o de què és.'],
    steps:[`El nom més important és «<b>${n}</b>»: és el nucli.`,`«${c}» ens diu més coses del nucli: és el <b>complement del nom</b>.`],
    err:v=>v[1]&&caSame(v[0],c)?'ca_nucli':null}}},

 ca_subj_eliptic:{mat:'catala',ab:'Se',curs:[6],nom:'Subjecte el·líptic i verbs impersonals',
  teoria:['De vegades el <b>subjecte no s\'escriu</b> perquè ja el sabem per la forma del verb: <i>Demà <b>anirem</b> a la platja</i> → (nosaltres). És un <b>subjecte el·líptic</b> (amagat o sobreentès).',
   'Per trobar-lo, mira la <b>persona</b> del verb: canto → jo; cantes → tu; canta → ell / ella; cantam / cantem → nosaltres; cantau / canteu → vosaltres; canten → ells / elles.',
   'Hi ha verbs que <b>no tenen subjecte</b>: són els <b>verbs impersonals</b>. Són els verbs de fenòmens de la natura (<i>plou, neva, trona, calabruixa</i>), <i>fer</i> amb el temps (<i>fa fred, fa sol</i>) i <i>haver-hi</i> (<i>hi ha, hi havia</i>).'],
  gen(lv){if(lv>0&&Math.random()<.35){const[o,vb]=pick(IMP);
    return caEx(`Quin és el subjecte d'aquesta oració?<br><i>${o}</i>`,NOSUBJ,{label:'Subjecte',loose:true,
     hints:['Busca el verb i pregunta: qui ho fa?','Qui plou? Qui neva? Hi ha verbs que no tenen subjecte.'],
     steps:[`El verb és «${vb}».`,`És un <b>verb impersonal</b>: no té subjecte (escriu «no en té»).`]})}
   const[inf,mod,rest]=pick(SE_V),T=lv>0?['pres','imp','fut','perif','cond']:['pres','fut','perif'],t=pick(T),pi=rnd(0,5),forms=caConj(inf,mod,t),f=forms[pi][0];
   const ok=[...new Set(forms.flatMap((x,i)=>x.includes(f)?PRON[i]:[]))];
   return caEx(`Aquesta oració té el <b>subjecte el·líptic</b>. Quin pronom personal s'hi amaga?<br><i>${caCap(f)} ${rest}.</i>`,ok,{label:'Subjecte (pronom)',
    hints:['Mira la terminació del verb: de quina persona és?','Prova de posar-hi davant jo, tu, ell, nosaltres, vosaltres o ells. Quin encaixa?'],
    steps:[`El verb és «${f}» (${inf}, ${CA_TEMPS[t]}).`,`Correspon a: <b>${ok.filter(x=>!/vost/.test(x)).join(' / ')}</b>.`],
    err:v=>PRON.flat().includes(v[0])&&!ok.includes(v[0])?'ca_subj_persona':null})}},

 ca_verb_tipus:{mat:'catala',ab:'Vt',curs:[6],nom:'Verbs copulatius, transitius i intransitius',
  teoria:['Els verbs <b>copulatius</b> (o atributius) són <b>ser</b>, <b>estar</b> i <b>semblar</b> quan uneixen el subjecte amb una qualitat (l\'<b>atribut</b>): <i>La sopa <b>és</b> calenta.</i>',
   'Tots els altres verbs són <b>predicatius</b>: expressen una acció. N\'hi ha de dos tipus:',
   `<table class="mini"><tr><td><b>Transitius</b></td><td>porten complement directe (què?)</td><td>La Marta <b>menja</b> <u>una poma</u>.</td></tr><tr><td><b>Intransitius</b></td><td>no porten complement directe</td><td>El nadó <b>dorm</b>.</td></tr></table>`],
  gen(){const[o,vb,t]=pick(VT);
   return{text:`Fixa't en aquesta oració:<br><i>${o}</i>`,fields:[{label:'Escriu el verb',txt:[vb],wide:true},{label:'Copulatiu, transitiu o intransitiu?',txt:VT_ANS[t],loose:true,wide:true}],vis:null,
    hints:['El verb és ser, estar o semblar seguit d\'una qualitat? Llavors és copulatiu.','Si no, pregunta al verb «què?». Si hi ha resposta, és transitiu.'],
    steps:[`El verb és «${vb}».`,t==='c'?'És ser, estar o semblar i va seguit d\'un atribut: és <b>copulatiu</b>.':t==='t'?`Expressa una acció i porta complement directe («${VT.find(x=>x[0]===o)[3]}»): és <b>transitiu</b>.`:'Expressa una acció i no porta complement directe: és <b>intransitiu</b>.'],
    err:v=>caSame(v[1]||'','predicatiu')?'ca_predicatiu_mes':null}}},

 ca_passiva:{mat:'catala',ab:'Vp',curs:[6],nom:'La veu activa i la veu passiva',
  teoria:['En la <b>veu activa</b>, el subjecte fa l\'acció: <i><u>El moix</u> persegueix el ratolí.</i>',
   'En la <b>veu passiva</b>, el subjecte rep l\'acció: <i><u>El ratolí</u> és perseguit pel moix.</i> Qui fa l\'acció és el <b>complement agent</b> (comença per <b>per</b>: pel moix).',
   'La passiva es fa amb el verb <b>ser</b> en el mateix temps que el verb actiu + el <b>participi</b>, que concorda amb el subjecte: <i>és perseguit, són corregits, serà escrita, va ser apagat</i>.'],
  gen(lv){if(lv>0&&Math.random()<.35){const[o,a]=pick(AGENT);
    return caEx(`Aquesta oració és passiva. Escriu el <b>complement agent</b> (qui fa l'acció):<br><i>${o}</i>`,[a],{label:'Complement agent',loose:true,
     hints:['Qui fa l\'acció?','El complement agent comença per «per» (o «pel», «per la»...).'],steps:[`Qui fa l'acció: <b>${a}</b>.`]})}
   const[act,pas,ans]=pick(PAS),ok=A(ans);
   return caEx(`Passa l'oració a <b>veu passiva</b>:<br><i>${act}</i><br>${pas}`,ok,{label:'Verb en passiva',
    hints:['Fes servir el verb ser en el mateix temps i el participi.','El participi concorda amb el nou subjecte (masculí o femení, singular o plural).'],
    steps:[`El nou subjecte és «${pas.split(' ___')[0]}».`,`Verb ser en el mateix temps + participi: <b>${ok[0]}</b>.`,`<i>${pas.replace('___',ok[0])}</i>`],
    err:v=>{const w=v[0].split(' '),c=ok[0].split(' ');return w.length===c.length&&w.slice(0,-1).join(' ')===c.slice(0,-1).join(' ')&&w.at(-1).replace(/(a|es|s|os)$/,'')===c.at(-1).replace(/(a|es|s|os)$/,'')&&!ok.includes(v[0])?'ca_passiva_concord':null}})}},

 ca_irregulars:{mat:'catala',ab:'Vi',curs:[6],nom:'Verbs irregulars',
  teoria:['Els <b>verbs irregulars</b> no segueixen el model de la seva conjugació en alguns temps. Els més freqüents: <b>ser, estar, haver, fer, anar, dir, veure, venir, tenir, poder, voler, saber, conèixer, viure, escriure, beure, prendre</b>.',
   'Sovint canvien en el <b>present</b> (jo <b>faig</b>, <b>puc</b>, <b>vull</b>, <b>sé</b>, <b>visc</b>), en el <b>futur</b> i el <b>condicional</b> (<b>faré</b>, <b>vindré</b>, <b>tindria</b>) i en el <b>participi</b> (<b>fet</b>, <b>dit</b>, <b>vist</b>, <b>pres</b>, <b>escrit</b>, <b>viscut</b>).',
   'Formes balears correctes: <b>tenc</b> (tinc), <b>venc</b> (vinc), <b>anam / anau</b> (anem / aneu), <b>feis</b> (feu), <b>deim / deis</b> (diem / dieu), <b>veim / veis</b> (veiem / veieu). Mira la <b>Taula de verbs irregulars</b> al material.'],
  gen(lv){const v=pick(Object.keys(IRR)),T=lv>0?['pres','pres','imp','fut','cond','part','ger']:['pres','pres','fut','part'],t=pick(T);
   if(t==='part'||t==='ger'){const ok=irrNF(v,t);
    return caEx(`Escriu el <b>${IRR_T[t]}</b> del verb <b>${v}</b>.`,ok,{label:IRR_T[t][0].toUpperCase()+IRR_T[t].slice(1),
     hints:[t==='part'?'El participi és la forma que va darrere «he...»: he cantat, he ___.':'El gerundi acaba en -ant, -ent o -int: estic ___.','És un verb irregular: pensa com ho diries en una frase («Ja ho he...», «Estic...»).'],
     steps:[`${t==='part'?'He':'Estic'} <b>${ok[0]}</b>.`,`El ${IRR_T[t]} de «${v}» és <b>${ok.join(' / ')}</b>.`],
     err:v2=>ok.includes(v2[0])?null:irrReg(v,t,0).includes(v2[0])?'ca_irreg_regularitza':null})}
   const pi=rnd(0,5),forms=irr(v,t),ok=forms[pi];
   return caEx(`Conjuga el verb irregular <b>${v}</b> en <b>${IRR_T[t]}</b>:<br><b>${PERS[pi]}</b> ___`,ok,{label:'Forma verbal',
    hints:[`Pensa en una frase: «${PERS[pi].split(' ')[0]} ... cada dia».`,`Mira com és en una altra persona: ${PERS[pi===0?1:0]} ${forms[pi===0?1:0][0]}.`],
    steps:[`${caCap(IRR_T[t])} de «${v}»: ${forms.map((f,i)=>PERS[i]+' '+f[0]).join(', ')}.`,`Resposta: <b>${PERS[pi]} ${ok.join(' / ')}</b>.`],
    err:v2=>ok.includes(v2[0])?null:forms.some((f,i)=>i!==pi&&f.includes(v2[0]))?'ca_conj_persona':irrReg(v,t,pi).includes(v2[0])?'ca_irreg_regularitza':null})}},

 ca_temps_compostos:{mat:'catala',ab:'Tc',curs:[6],nom:'Temps simples i compostos',
  teoria:['Els <b>temps simples</b> tenen una sola paraula: <i>canto, cantava, cantaré</i>. Els <b>temps compostos</b> es formen amb el verb <b>haver</b> + el <b>participi</b>: <i>he cantat</i>.',
   `<table class="mini"><tr><th>Temps compost</th><th>Exemple</th></tr><tr><td>Perfet</td><td><b>he</b> cantat, <b>has</b> cantat...</td></tr><tr><td>Plusquamperfet</td><td><b>havia</b> cantat, <b>havies</b> cantat...</td></tr><tr><td>Futur perfet</td><td><b>hauré</b> cantat...</td></tr><tr><td>Condicional perfet</td><td><b>hauria</b> cantat...</td></tr></table>`,
   'Compte amb els participis irregulars: <b>fet, dit, vist, escrit, pres, viscut, begut, tingut, vingut, conegut, pogut, obert, mort, nascut</b>.'],
  gen(lv){const ts=lv>0?Object.keys(AUX):['perf','plusq'],t=pick(ts),pi=rnd(0,5);
   if(Math.random()<.4){const[inf,p]=pick(PART),f=A(AUX[t][pi])[0]+' '+p;
    return caEx(`En quin temps verbal està la forma «<b>${f}</b>»?`,AUX_ALT[t],{label:'Temps verbal',loose:true,
     hints:['Mira el verb haver: he, havia, hauré o hauria?','Perfet: he; plusquamperfet: havia; futur perfet: hauré; condicional perfet: hauria.'],
     steps:[`L'auxiliar és «${f.split(' ')[0]}».`,`És un temps compost: <b>${AUX_T[t]}</b>.`]})}
   const[inf,p]=pick(PART.filter((x,i)=>lv>0||i<14)),ok=A(AUX[t][pi]).map(a=>a+' '+p);
   return caEx(`Conjuga el verb <b>${inf}</b> en <b>${AUX_T[t]}</b>:<br><b>${PERS[pi]}</b> ___`,ok,{label:'Forma verbal (dues paraules)',
    hints:[`Fes servir el verb haver (${A(AUX[t][2])[0]}...) + el participi.`,`El participi de «${inf}» és «${p}».`],
    steps:[`Auxiliar haver en ${AUX_T[t]==='perfet'?'present':AUX_T[t]==='plusquamperfet'?'imperfet':AUX_T[t]==='futur perfet'?'futur':'condicional'}: ${PERS[pi]} ${A(AUX[t][pi])[0]}.`,`Participi: ${p}.`,`Resposta: <b>${PERS[pi]} ${ok[0]}</b>.`],
    err:v=>ok.includes(v[0])?null:AUX[t].some((a,i)=>i!==pi&&A(a).some(x=>x+' '+p===v[0]))?'ca_conj_persona':v[0].split(' ').length===1?'ca_compost_simple':null})}},

 ca_modes:{mat:'catala',ab:'Md',curs:[6],nom:'Modes verbals i formes no personals',
  teoria:['Els verbs tenen tres <b>modes</b>:',`<table class="mini"><tr><td><b>Indicatiu</b></td><td>${MODE_DEF.indicatiu}</td><td>Demà <b>anirem</b> a la platja.</td></tr><tr><td><b>Subjuntiu</b></td><td>${MODE_DEF.subjuntiu}</td><td>Vull que <b>vinguis</b>.</td></tr><tr><td><b>Imperatiu</b></td><td>${MODE_DEF.imperatiu}</td><td><b>Tanca</b> la porta.</td></tr></table>`,
   'Les <b>formes no personals</b> no indiquen persona: <b>infinitiu</b> (cantar, perdre, dormir), <b>gerundi</b> (cantant, perdent, dormint) i <b>participi</b> (cantat, perdut, dormit).'],
  gen(lv){if(Math.random()<.35){const[inf,g]=pick(GER);
    return caEx(`Escriu el <b>gerundi</b> del verb <b>${inf}</b>.`,[g],{label:'Gerundi',
     hints:['El gerundi acaba en -ant, -ent o -int.','Pensa: «estic ___».'],steps:[`Estic <b>${g}</b>.`],
     err:v=>v[0]!==g&&/(ant|ent|int)$/.test(v[0])&&v[0].slice(0,3)===g.slice(0,3)?'ca_gerundi':null})}
   const[f,m]=pick(MODE.filter((x,i)=>lv>0||!['subjuntiu'].includes(x[1])||i<4));
   return caEx(`En quin <b>mode</b> o <b>forma no personal</b> està el verb destacat?<br><i>${caMark(f)}</i>`,[m],{label:'Mode o forma',loose:true,
    hints:['És un fet real, un desig o una ordre? O és una forma sense persona (infinitiu, gerundi, participi)?','Si va darrere «que» i expressa un desig o un dubte, sol ser subjuntiu.'],
    steps:[`«${caStar(f)}» ${MODE_DEF[m]}.`,`És <b>${m}</b>.`],
    err:v=>Object.keys(MODE_DEF).some(x=>caSame(x,v[0]))&&!caSame(m,v[0])?'ca_mode':null})}},

 ca_perifrasis:{mat:'catala',ab:'Pf',curs:[6],nom:'Les perífrasis verbals',
  teoria:['Una <b>perífrasi verbal</b> és un grup de dos verbs (de vegades amb una preposició enmig) que funcionen junts com un de sol: <i><b>he de fer</b>, <b>estic llegint</b></i>.',
   `<table class="mini">${Object.entries(PF_FORM).map(([k,f])=>`<tr><td><b>${f}</b></td><td>${PF_ANS[k][0]}</td></tr>`).join('')}</table>`,
   'Compte: «tenir que + infinitiu» és incorrecte. Hem de dir <b>haver de</b>: <i>He de fer els deures</i> (no «tinc que fer»).'],
  gen(){const[o,p,k]=pick(PF);
   return{text:`Escriu la <b>perífrasi verbal</b> d'aquesta oració i digues què expressa:<br><i>${o}</i>`,fields:[{label:'Perífrasi',txt:[caLow(p)],wide:true},{label:'Què expressa?',txt:PF_ANS[k],loose:true,wide:true}],vis:null,
    hints:['Busca dos verbs seguits que funcionen junts (pot haver-hi «de» o «a» enmig).','Expressa obligació, probabilitat, una acció que dura, que comença, que s\'acaba de fer o que es repeteix?'],
    steps:[`La perífrasi és «<b>${p}</b>» (${PF_FORM[k]}).`,`Expressa <b>${PF_ANS[k][0]}</b>.`]}}},

 ca_cd:{mat:'catala',ab:'Cd',curs:[6],nom:'El complement directe',
  teoria:['El <b>complement directe</b> (CD) és la persona, l\'animal o la cosa que rep directament l\'acció del verb. El trobam preguntant al verb <b>què?</b> (o <b>qui?</b>): <i>La Marta menja <u>la poma</u></i>.',
   'Es pot substituir per un <b>pronom feble</b>: <b>el, la, els, les</b> (la poma → <b>la</b> menja), <b>ho</b> (això → <b>ho</b> sé) o <b>en</b> si no porta article o porta un numeral o un, molts... (pa → <b>en</b> compram; tres germans → <b>en</b> tinc tres).',
   'En català, el CD de persona va <b>sense «a»</b>: <i>Veig na Maria</i> (no «a na Maria»).'],
  gen(lv){const[o,c,p]=pick(CD.filter(x=>lv>0||!x[3]));
   return{text:`Troba el <b>complement directe</b> i el pronom feble que el substitueix:<br><i>${o}</i>`,fields:[{label:'Complement directe',txt:[c],loose:true,wide:true},{label:'Pronom feble',txt:[p]}],vis:null,
    hints:['Pregunta al verb: què...? (o qui...?)','Masculí: el / els. Femení: la / les. Això: ho. Sense article o amb un numeral: en.'],
    steps:[`Què? → <b>${c}</b>.`,p==='en'?'No porta article determinat: el substitueix <b>en</b>.':p==='ho'?'«Això» se substitueix per <b>ho</b>.':`Se substitueix per <b>${p}</b>.`],
    err:v=>['li','els'].includes(v[1])&&v[1]!==p&&caSame(v[0],c)?'ca_cd_li':null}}},

 ca_ci:{mat:'catala',ab:'Ci',curs:[6],nom:'El complement indirecte',
  teoria:['El <b>complement indirecte</b> (CI) és la persona o l\'animal que rep el benefici o el perjudici de l\'acció. El trobam preguntant <b>a qui?</b> o <b>per a qui?</b>, i comença per <b>a</b> (o <b>al, als</b>): <i>He donat un regal <u>a la meva germana</u></i>.',
   'Es substitueix pel pronom <b>li</b> (singular) i <b>els</b> (plural): <i><b>li</b> he donat un regal</i>, <i><b>els</b> explica un conte</i>.',
   'Compte! En plural sempre és <b>els</b>, també si són noies: <i>Llegeix un conte a les nines → <b>els</b> llegeix un conte</i> (no «les»).'],
  gen(){const[o,c,p]=pick(CI);
   return{text:`Troba el <b>complement indirecte</b> i el pronom feble que el substitueix:<br><i>${o}</i>`,fields:[{label:'Complement indirecte',txt:[c],loose:true,wide:true},{label:'Pronom feble',txt:[p]}],vis:null,
    hints:['Pregunta al verb: a qui...?','Singular: li. Plural: els (també en femení).'],
    steps:[`A qui? → <b>${c}</b>.`,`Es substitueix per <b>${p}</b>.`],
    err:v=>v[1]==='les'?'ca_ci_les':['el','la','lo'].includes(v[1])?'ca_cd_li':null}}},

 ca_cc:{mat:'catala',ab:'Cc',curs:[6],nom:'Els complements circumstancials',
  teoria:['Els <b>complements circumstancials</b> (CC) expliquen les circumstàncies de l\'acció. Els trobam fent preguntes al verb:',
   `<table class="mini">${Object.entries(CC_Q).map(([k,q])=>`<tr><td><b>${k}</b></td><td>${q}</td><td>${CC.find(x=>x[2]===k)[0]}</td></tr>`).join('')}</table>`],
  gen(){const[o,c,k]=pick(CC);
   return{text:`Escriu el <b>complement circumstancial</b> i digues de quin tipus és:<br><i>${o}</i>`,fields:[{label:'Complement circumstancial',txt:[c],loose:true,wide:true},{label:'Tipus (lloc, temps, manera...)',txt:CC_ANS[k],loose:true,wide:true}],vis:null,
    hints:['Fes preguntes al verb: on? quan? com? amb qui? amb què? quant? per què? per a què?','El tipus és el nom de la pregunta que respon.'],
    steps:[`${caCap(CC_Q[k])} → <b>${c}</b>.`,`És un CC de <b>${k}</b>.`],
    err:v=>caSame(v[0],c)&&!CC_ANS[k].some(x=>caSame(x,v[1]))&&Object.keys(CC_ANS).some(x=>caSame(x,v[1]))?'ca_cc_tipus':null}}},

 ca_atribut:{mat:'catala',ab:'At',curs:[6],nom:'Predicat nominal i verbal. L\'atribut',
  teoria:['El predicat pot ser de dos tipus:',
   `<table class="mini"><tr><td><b>Predicat nominal</b></td><td>verb copulatiu (ser, estar, semblar) + <b>atribut</b> (una qualitat del subjecte)</td><td>La sopa és <u>calenta</u>.</td></tr><tr><td><b>Predicat verbal</b></td><td>verb predicatiu (expressa una acció)</td><td>La Marta menja una poma.</td></tr></table>`,
   'L\'<b>atribut</b> concorda amb el subjecte (la sopa és calent<b>a</b>; els cosins són simpàtic<b>s</b>) i es pot substituir pel pronom <b>ho</b>: <i>La sopa <b>ho</b> és.</i>'],
  gen(){const r=Math.random();
   if(r<.5){const[o,vb,,at]=pick(VT.filter(x=>x[2]==='c'));
    return{text:`Escriu l'<b>atribut</b> i el pronom que el substitueix:<br><i>${o}</i>`,fields:[{label:'Atribut',txt:[at,at.replace(/^molt /,'')],loose:true,wide:true},{label:'Pronom feble',txt:['ho']}],vis:null,
     hints:['L\'atribut va darrere ser, estar o semblar i diu com és el subjecte.','L\'atribut se substitueix sempre per «ho».'],
     steps:[`Verb copulatiu: «${vb}». Com és? → <b>${at}</b>.`,`Pronom: <b>ho</b> (${o.split(' '+vb)[0]} ho ${vb}).`],
     err:v=>['la','el','les','els'].includes(v[1])?'ca_atribut_ho':null}}
   const[o,vb,t]=pick(VT),ans=t==='c'?['nominal','predicat nominal']:['verbal','predicat verbal'];
   return{text:`El predicat d'aquesta oració és nominal o verbal?<br><i>${o}</i>`,fields:[{label:'Escriu el verb',txt:[vb],wide:true},{label:'Nominal o verbal',txt:ans,loose:true}],vis:null,
    hints:['El verb és ser, estar o semblar seguit d\'una qualitat?','Si és així, el predicat és nominal; si expressa una acció, és verbal.'],
    steps:[`El verb és «${vb}».`,t==='c'?'És un verb copulatiu amb atribut: predicat <b>nominal</b>.':'És un verb que expressa una acció: predicat <b>verbal</b>.']}}},

 ca_simples_compostes:{mat:'catala',ab:'Oc',curs:[6],nom:'Oracions simples i compostes',
  teoria:['Una <b>oració simple</b> té <b>un sol verb conjugat</b>: <i>La Laia <b>llegeix</b> un llibre.</i>',
   'Una <b>oració composta</b> té <b>dos verbs conjugats o més</b>, units per un <b>nexe</b> (i, però, perquè, que, quan, si...) o per una coma: <i>La Laia <b>llegeix</b> <u>i</u> el seu germà <b>dibuixa</b>.</i>',
   'Compte: les perífrasis (<i>vaig veure</i>, <i>he de fer</i>) compten com un sol verb, i els infinitius (<i>vol <u>ser</u></i>) no són verbs conjugats.'],
  gen(lv){const[o,n,nx]=pick(OC);
   if(lv>0&&nx&&Math.random()<.4)return caEx(`Aquesta oració és composta. Quin <b>nexe</b> uneix les dues oracions?<br><i>${o}</i>`,[nx],{label:'Nexe',
    hints:['Busca la paraula que hi ha entre els dos verbs i els uneix.','Pot ser i, però, perquè, que, quan, si...'],steps:[`El nexe és «<b>${nx}</b>».`]});
   return{text:`Compta els verbs conjugats d'aquesta oració i digues si és simple o composta:<br><i>${o}</i>`,fields:[{label:'Nombre de verbs conjugats',ans:R(n,1)},{label:'Simple o composta',txt:[n>1?'composta':'simple'],loose:true}],vis:null,
    hints:['Subratlla mentalment els verbs que tenen persona (jo, tu, ell...). Els infinitius no compten.','Un verb: simple. Dos o més: composta.'],
    steps:[`Té <b>${n}</b> verb${n>1?'s':''} conjugat${n>1?'s':''}.`,`És una oració <b>${n>1?'composta':'simple'}</b>.`]}}},

 ca_febles:{mat:'catala',ab:'Pr',curs:[6],nom:'Els pronoms febles',
  teoria:['Els <b>pronoms febles</b> són paraules curtes que substitueixen un complement i van enganxades al verb:',
   `<table class="mini"><tr><th>Substitueixen</th><th>Pronom</th><th>Exemple</th></tr><tr><td>CD masculí / femení</td><td>el, la, els, les</td><td>compra el pa → <b>el</b> compra</td></tr><tr><td>CD «això»</td><td>ho</td><td>sap això → <b>ho</b> sap</td></tr><tr><td>CD sense article / «de» + ...</td><td>en</td><td>menja pomes → <b>en</b> menja</td></tr><tr><td>CI (a qui?)</td><td>li, els</td><td>dona un regal a l'Anna → <b>li</b> dona</td></tr><tr><td>lloc (a, en...)</td><td>hi</td><td>va a Palma → <b>hi</b> va</td></tr></table>`,
   '<b>Apòstrof:</b> davant un verb que comença per vocal o h, <b>el, la</b> i <b>en</b> s\'apostrofen: <b>l\'</b>espera, <b>l\'</b>obren, <b>n\'</b>agafa. Darrere el verb van amb guionet o apòstrof: compra-<b>lo</b>, mira\'<b>ls</b>.'],
  gen(){const[o,a,rest]=pick(PF2),[pr]=a.split(/['\s]/);
   return caEx(`Substitueix el complement destacat per un <b>pronom feble</b> i escriu el pronom amb el verb:<br><i>${caMark(o)}</i><br>___${rest}`,[a],{label:'Pronom + verb',
    hints:['Què substitueixes: un CD (què?), un CI (a qui?), un lloc (on?) o «això»?','Si el verb comença per vocal, el pronom s\'apostrofa (l\', n\').'],
    steps:[`«${caStar(o)}» se substitueix per <b>${a.includes("'")?a.split("'")[0]+"'":pr}</b>.`,`Queda: <b>${caCap(a)}${rest}</b>`],
    err:v=>{if(v[0]===a)return null;if([a.replace(/^l'/,'la '),a.replace(/^l'/,'el '),a.replace(/^n'/,'en ')].includes(v[0])&&a.includes("'"))return'ca_apostrof_feble';
     if(/^les /.test(v[0])&&/^els /.test(a))return'ca_ci_les';if(/^li /.test(v[0])&&/^(el|la|l')/.test(a))return'ca_cd_li';return null}})}}
});

/* ---------- errors típics ---------- */
Object.assign(ERR,{
 ca_plural:{kid:'Compte amb el plural! Mira la terminació: -s, -ç, -x fan -os; -ga fa -gues, -ja fa -ges...',par:'Errors en la formació del plural'},
 ca_determinant:{kid:'És un determinant, però d\'un altre tipus. Repassa la taula: de qui és? quants? a prop o lluny?',par:'Confon els tipus de determinants'},
 ca_nucli:{kid:'Has escrit el complement en lloc del nucli. El nucli és el nom principal.',par:'Confon el nucli i el complement del nom'},
 ca_subj_persona:{kid:'Mira bé la terminació del verb: correspon a una altra persona.',par:'No reconeix la persona del subjecte el·líptic'},
 ca_predicatiu_mes:{kid:'Molt bé, és predicatiu! Ara digues si és transitiu (porta complement directe) o intransitiu.',par:'No distingeix transitiu i intransitiu'},
 ca_passiva_concord:{kid:'El participi ha de concordar amb el nou subjecte: masculí o femení, singular o plural.',par:'No fa la concordança del participi en la passiva'},
 ca_irreg_regularitza:{kid:'Aquest verb és irregular: no segueix la regla. Mira la taula de verbs irregulars.',par:'Conjuga verbs irregulars com si fossin regulars (poderé, fet → «fat»)'},
 ca_compost_simple:{kid:'És un temps compost: necessita dues paraules, el verb haver + el participi.',par:'No forma els temps compostos'},
 ca_gerundi:{kid:'Revisa la terminació del gerundi: -ant (1a conjugació), -ent (2a) o -int (3a).',par:'Errors en el gerundi'},
 ca_mode:{kid:'Pensa si és un fet real (indicatiu), un desig o dubte (subjuntiu) o una ordre (imperatiu).',par:'Confon els modes verbals'},
 ca_cd_li:{kid:'Compte: li i els (a qui?) substitueixen el complement indirecte. El complement directe és el, la, els, les, ho, en.',par:'Confon els pronoms de CD i de CI'},
 ca_ci_les:{kid:'El complement indirecte plural és sempre «els», també en femení.',par:'Fa servir «les» per al CI plural femení'},
 ca_cc_tipus:{kid:'Has trobat bé el complement! Revisa la pregunta que respon: on, quan, com, amb qui...',par:'Confon els tipus de complement circumstancial'},
 ca_atribut_ho:{kid:'L\'atribut se substitueix sempre per «ho».',par:'No substitueix l\'atribut per «ho»'},
 ca_apostrof_feble:{kid:'Davant vocal, el pronom s\'apostrofa: l\'espera, n\'agafa.',par:'No apostrofa els pronoms febles'}
});

/* ---------- material: taula de verbs irregulars ---------- */
(MATERIAL.catala=MATERIAL.catala||[]).push({obre:'irregTable()',ic:'list',nom:'Taula de verbs irregulars',desc:'Ser, estar, fer, anar, tenir, venir... amb les formes balears'});
window.irregTable=function(v='ser'){endSession();const T=['pres','imp','fut','cond'];
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-catala)">Material · Català</div><h2>Verbs irregulars</h2><p class="muted">Entre parèntesis, la forma balear o una altra forma correcta.</p></div><button class="ghost" onclick="subject('catala')">← Tornar</button></div>
 <div class="tabs" style="flex-wrap:wrap">${Object.keys(IRR).map(x=>`<button data-v="${x}" class="${x===v?'on':''}">${x}</button>`).join('')}</div>
 <div class="card"><p style="margin-top:0"><b>${v}</b> · participi: <b>${irrNF(v,'part').join(' / ')}</b> · gerundi: <b>${irrNF(v,'ger').join(' / ')}</b> · passat: <b>vaig ${v}</b></p><div class="tablewrap"><table class="vt"><tr><th>Persona</th>${T.map(t=>`<th>${IRR_T[t]}</th>`).join('')}</tr>
 ${PERS.map((p,i)=>`<tr><td><b>${p}</b></td>${T.map(t=>{const f=irr(v,t)[i];return`<td>${f[0]}${f[1]?` <span class="muted">(${f.slice(1).join(', ')})</span>`:''}</td>`}).join('')}</tr>`).join('')}</table></div></div>
 <div class="card"><h3>Practica</h3><div class="row"><button data-p="ca_irregulars">Verbs irregulars</button><button class="sec" data-p="ca_temps_compostos">Temps compostos</button></div></div>`);
 document.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>irregTable(b.dataset.v));
 document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>start('exercicis',[b.dataset.p],15))};
})();
