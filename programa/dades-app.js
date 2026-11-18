/* Aprenem - assignatures, modes d estudi, errors tipics, aventura i dictats
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */
// Assignatures. La clau interna de Medi continua sent 'ciencies' perquè no es perdi el progrés guardat.
const SUBJ={mates:{nom:'Matemàtiques',ic:'📐'},angles:{nom:'Anglès',ic:'🗣️'},ciencies:{nom:'Medi',llarg:'Coneixement del medi natural, social i cultural',ic:'🔬'},musica:{nom:'Música',llarg:'Llenguatge musical',ic:'🎵'}};
// Registres que omple cada arxiu de contingut (així cada assignatura és independent):
//   UNITS[assignatura]    = [[nom de la unitat, [ids de temes], (opcional) [cursos]], ...]
//   LAMINES[assignatura]  = [{obre:'funcio()', nom, desc, ic}]  (làmines interactives)
//   MATERIAL[assignatura] = [{obre:'funcio()', nom, desc, ic}]  (taules, temaris...)
//   ERR                   = errors típics: Object.assign(ERR,{codi:{kid:'...',par:'...'}})
const UNITS={},LAMINES={},MATERIAL={};
// SK = tots els temes; cada arxiu de contingut hi afegeix els seus amb Object.assign(SK,{...})
const SK={};
const matOf=k=>SK[k].mat||'mates';
const ansStr=f=>f.txt?f.txt[0]:fmtR(f.ans);
const ERR={
 en_pp_passat:{kid:'Aquesta és la forma del passat. El participi és la tercera forma (go – went – gone).',par:'Confon el participi amb el passat'},
 en_reg_regla:{kid:'Gairebé! És un verb regular, però revisa la regla d\'ortografia de l\'-ed (e final, y, consonant doble...).',par:'Aplica malament les regles d\'ortografia del passat regular (-ed / -ied / doble consonant)'},
 en_did_inf:{kid:'Compte! Després de did / didn\'t el verb va en infinitiu, no en passat.',par:'Posa el verb en passat després de did / didn\'t («didn\'t went»)'},
 en_did_temps:{kid:'La frase és en passat: l\'auxiliar ha d\'estar en passat (did / didn\'t).',par:'Fa servir do / does / don\'t en lloc de did / didn\'t'},
 en_was:{kid:'Revisa el subjecte: I, he, she, it → was · you, we, they → were.',par:'Confon was i were'},
 en_cont_ing:{kid:'Falta l\'-ing! El present continuous és am/is/are + verb acabat en -ing.',par:'Oblida l\'-ing del present continuous'},
 en_cont_spell:{kid:'L\'estructura és bona, però revisa com s\'escriu l\'-ing (treure la e o doblar la consonant).',par:'Errors d\'ortografia en la forma -ing'},
 ci_organs:{kid:'Compte! Aquest òrgan o aparell té una altra funció. Pensa què fa cadascun.',par:'Confon òrgans i aparells del cos humà'},
 ci_plantes:{kid:'Compte: has confós dues coses de la planta. Repassa què entra i què surt a la fotosíntesi, i què fa cada part.',par:'Confon les parts de la planta o els gasos de la fotosíntesi'},
 ci_cadena:{kid:'Recorda: la fletxa vol dir «és menjat per». El primer de la cadena és el productor.',par:'Confon els papers d\'una cadena tròfica'},
 ci_canvis:{kid:'Has dit el canvi contrari! Mira bé de quin estat surt i a quin estat arriba.',par:'Confon un canvi d\'estat amb el seu contrari'},
 ci_classificacio:{kid:'Pensa en les característiques: té pèl, plomes, escates o pell nua? Quantes potes té? Com respira?',par:'Classifica malament els animals'},
 ci_energia:{kid:'Pensa d\'on surt l\'energia: del sol, del vent, de l\'aigua...?',par:'Confon els tipus i les fonts d\'energia'},
 ci_moviments:{kid:'Compte: un moviment és girar sobre si mateixa i l\'altre és fer la volta al Sol. Quin és quin?',par:'Confon conceptes del Sistema Solar (rotació / translació...)'},
 en_lletrejat:{kid:'Gairebé! Revisa com s\'escriu: hi ha alguna lletra que no és correcta.',par:'Errors d\'ortografia en paraules angleses'},
 en_tercera_persona:{kid:'Mira bé el subjecte: en present, només he, she i it porten -s.',par:'Confon la tercera persona del present simple (-s)'},
 en_terminacio:{kid:'La -s hi va, però compte com s\'escriu: alguns verbs fan -es o -ies.',par:'No aplica bé les terminacions -es / -ies'},
 en_be:{kid:'Revisa el subjecte: I → am / have · he, she, it → is / has · we, you, they → are / have.',par:'Confon les formes de to be / have got'},
 en_irregular:{kid:'Aquest verb és irregular: el passat no acaba en -ed.',par:'Regularitza verbs irregulars en passat (goed, eated...)'},
 en_passat_no:{kid:'La frase passa en el passat: el verb ha de canviar.',par:'No posa el verb en passat'},
 en_plural_regla:{kid:'Compte! Aquesta paraula no fa el plural només amb -s.',par:'Aplica la -s a plurals irregulars o especials'},
 en_comparatiu:{kid:'Revisa el comparatiu: curts → -er; llargs → more + adjectiu; good i bad són irregulars.',par:'Forma malament els comparatius'},
 suma_no_multiplica:{kid:'Compte! Per fer fraccions equivalents no sumem: <b>multipliquem</b> numerador i denominador pel mateix nombre.',par:'Suma en lloc de multiplicar per trobar fraccions equivalents'},
 suma_denominadors:{kid:'Has sumat també els denominadors? El denominador indica la mida de les parts i no se suma.',par:'Suma els denominadors quan suma fraccions'},
 nomes_divideix:{kid:'Has trobat quant val una part, però quantes parts t\'has de quedar? Mira el numerador.',par:'Divideix pel denominador però oblida multiplicar pel numerador'},
 nomes_multiplica:{kid:'Has multiplicat pel numerador, però també has de repartir entre el denominador.',par:'Multiplica pel numerador però no divideix pel denominador'},
 comes_no_alineades:{kid:'Revisa on és la coma: has d\'alinear dècimes amb dècimes i centèsimes amb centèsimes.',par:'No alinea les comes en sumar o restar decimals'},
 residu_gran:{kid:'El residu ha de ser més petit que el divisor. Encara hi cap una vegada més!',par:'Deixa un residu més gran que el divisor'},
 divideix_percent:{kid:'El percentatge no és un divisor. Recorda: p% vol dir p de cada 100.',par:'Confon el percentatge amb una divisió'},
 massa_rapid:{kid:'',par:'Respon massa de pressa, sense pensar (possibles respostes a l\'atzar)'}
};
const MODES={
 combinada:{ic:'',nom:'Sessió combinada',desc:'Explicació, aventura, exercicis i comprovació'},
 professor:{ic:'',nom:'Professor particular',desc:'Explicacions, exemples i dubtes'},
 aventura:{ic:'🗺️',nom:'Aventura',desc:'L\'Illa dels Nombres Perduts'},
 exercicis:{ic:'🧪',nom:'Exercicis interactius',desc:'Barres, grups i reptes visuals'},
 escriptura:{ic:'',nom:'Escriptura a mà',desc:'Dictat o còpia al quadern i foto'},
 comprovacio:{ic:'',nom:'Comprovació',desc:'Està preparat? Exercicis nous sense pistes'}
};
const STAGES=[
 {ic:'🌉',nom:'El pont trencat',txt:'Per creuar el riu has de reparar el pont. Cada tauló necessita una resposta exacta.'},
 {ic:'🚪',nom:'La cambra del codi',txt:'Una porta de pedra amaga un codi secret. Només s\'obre amb la resposta exacta.'},
 {ic:'🔬',nom:'El laboratori',txt:'Les màquines del laboratori s\'han espatllat. Respon bé per tornar-les a engegar.'},
 {ic:'🗝️',nom:'El cofre dels nombres',txt:'Un cofre antic està tancat amb un cadenat numèric.'},
 {ic:'🏰',nom:'La torre del vent',txt:'Per pujar a la torre has de col·locar els contrapesos amb precisió.'},
 {ic:'⛵',nom:'El vaixell de tornada',txt:'Darrer repte: prepara el vaixell per tornar a casa!'}
];
const DICTATS={5:"La Maria va anar a la platja amb els seus cosins. L'aigua estava freda, però es varen banyar igualment. Després varen menjar un gelat de xocolata.",
 6:"Aquell matí d'hivern, el vent bufava amb força entre els pins. En Joan va agafar la bicicleta i va pedalar fins al port. Allà, els pescadors ja descarregaven les caixes de peix."};
const LV=['En procés','Comprèn','Domina'];

