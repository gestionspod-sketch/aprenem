/* Aprenem - MATEMÀTIQUES 6è: fraccions (simplificar, comú denominador, operacions), decimals, proporcionalitat, percentatges i escales
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. Fonts: vegeu contingut/matematiques.js. */
(()=>{
const {num,dc,eur,fInt,fDec,val,eq,near,fr,taula}=MT;
const L='Resultat (ex. 3/4)';
// Resposta de fracció: qualsevol forma equivalent és correcta (l'app avisa si es pot simplificar)
const fF=(n,d,label=L)=>({label,ans:R(n,d)});
const comaErr=(y,v)=>[-2,-1,1,2].some(k=>near(y,v*10**k));

Object.assign(ERR,{
 mt_simplifica_mes:{kid:'És equivalent, però encara es pot simplificar més. Busca un nombre que divideixi els dos termes.',par:'No arriba a la fracció irreductible'},
 mt_den_minim:{kid:'És un denominador comú, però no el més petit. Busca el mínim comú múltiple dels denominadors.',par:'No fa servir el mínim comú denominador'},
 mt_num_igual:{kid:'Has canviat el denominador però no el numerador. Si multiplices el denominador per un nombre, el numerador també!',par:'En reduir a comú denominador, no canvia els numeradors'},
 mt_resta_den:{kid:'Has restat també els denominadors? Primer cal posar-los iguals, i el denominador no es resta.',par:'Resta els denominadors quan resta fraccions'},
 mt_enter_fraccio:{kid:'Per restar una fracció d\'un nombre enter, escriu primer l\'enter com a fracció amb el mateix denominador (2 = 8/4).',par:'No sap restar una fracció d\'un nombre enter'},
 mt_frac_mult_ambdos:{kid:'Per multiplicar un nombre per una fracció, només es multiplica el numerador. El denominador no canvia.',par:'Multiplica numerador i denominador per l\'enter (obté una fracció equivalent)'},
 mt_frac_creu:{kid:'Això és el que es fa per dividir. Per multiplicar fraccions: numerador × numerador i denominador × denominador.',par:'Multiplica en creu quan ha de multiplicar fraccions'},
 mt_frac_div_directe:{kid:'Per dividir fraccions no es multiplica en línia: es multiplica per la fracció inversa (girada) o en creu.',par:'Divideix fraccions multiplicant numeradors i denominadors en línia'},
 mt_frac_coma:{kid:'La ratlla de la fracció no és una coma! Una fracció és una divisió: numerador entre denominador.',par:'Converteix fraccions a decimal posant una coma entre numerador i denominador'},
 mt_dec_coma:{kid:'Les xifres són bones, però la coma no és al seu lloc. Compta les xifres decimals.',par:'Col·loca malament la coma en multiplicar o dividir decimals'},
 mt_dec_residu:{kid:'Encara no has acabat! Quan queda residu, posa una coma al quocient i un 0 al residu, i continua dividint.',par:'Atura la divisió sense treure decimals'},
 mt_prop_additiu:{kid:'Compte! En la proporcionalitat no se suma la mateixa quantitat: es multiplica. Calcula primer quant val una unitat.',par:'Raona de manera additiva en problemes de proporcionalitat'},
 mt_preu_final:{kid:'Això és el que es descompta (o s\'afegeix), però et demanen el preu final.',par:'Confon el descompte o l\'augment amb el preu final'},
 mt_percent_euros:{kid:'Un percentatge no són euros. El 20 % de 50 € no és 20 €: és 50 × 20 : 100.',par:'Resta el percentatge directament com si fossin euros'},
 mt_percent_part:{kid:'Aquesta és la quantitat, però et demanen el percentatge: quantes de cada 100?',par:'Confon la part amb el percentatge'},
 mt_escala_unitats:{kid:'Les xifres són bones, però revisa les unitats: 1 m = 100 cm i 1 km = 100.000 cm.',par:'S\'equivoca amb les unitats en els problemes d\'escala'}
});

Object.assign(SK,{
/* ---------- Fraccions ---------- */
mt_simplificar:{mat:'mates',nom:'Simplificar fraccions',ab:'Fs',curs:[6],
 teoria:['<b>Simplificar</b> una fracció és trobar-ne una d\'equivalent amb termes més petits. Dividim el numerador i el denominador pel <b>mateix nombre</b>.',
  `Exemple: ${F(12,18)} → dividim per 2 → ${F(6,9)} → dividim per 3 → ${F(2,3)}.`,
  `Quan ja no es pot dividir més, tenim la <b>fracció irreductible</b>. Per arribar-hi d'un sol cop, divideix pel <b>màxim comú divisor</b>: m.c.d.(12, 18) = 6 → ${F(12,18)} = ${F(2,3)}.`],
 gen(lv){let m,n,k;do{n=rnd(2,lv?12:8);m=rnd(1,lv===2?2*n:n-1);k=rnd(2,lv?9:5)}while(gcd(m,n)!==1||m===n);const a=m*k,b=n*k;
  return{text:`Simplifica fins a la <b>fracció irreductible</b>:<br>${F(a,b)}`,fields:[{label:'Numerador',ans:R(m)},{label:'Denominador',ans:R(n)}],
   hints:[`Busca un nombre que divideixi alhora ${a} i ${b}.`,`El nombre més gran que divideix ${a} i ${b} és el seu m.c.d.`],
   steps:[`Busquem el m.c.d.(${a}, ${b}) = ${k}.`,`Dividim els dos termes per ${k}: ${a} : ${k} = ${m} i ${b} : ${k} = ${n}.`,`${F(a,b)} = <b>${F(m,n)}</b>, que ja no es pot simplificar.`],
   err:x=>{const p=val(x[0]),q=val(x[1]);return q&&eq(p/q,m/n)&&p!==m?'mt_simplifica_mes':null}}}},
mt_comu_den:{mat:'mates',nom:'Reduir a comú denominador',ab:'Fc',curs:[6],
 teoria:['Per comparar, sumar o restar fraccions amb denominadors diferents, primer les <b>reduïm a comú denominador</b>.',
  '1. Calculam el <b>m.c.m.</b> dels denominadors: serà el denominador comú.<br>2. Per a cada fracció, miram per quant s\'ha multiplicat el denominador i multiplicam el <b>numerador</b> pel mateix nombre.',
  `Exemple: ${F(3,4)} i ${F(5,6)} → m.c.m.(4, 6) = 12 → ${F(9,12)} i ${F(10,12)}. Ara és fàcil veure que ${F(5,6)} és més gran.`],
 gen(lv){const pool=lv?[2,3,4,5,6,8,9,10,12,15]:[2,3,4,6,8,10];let b,d;do{b=pick(pool);d=pick(pool)}while(b===d||lcm(b,d)>(lv?60:24));
  const a=rnd(1,b-1),c=rnd(1,d-1),M=lcm(b,d);
  return{text:`Redueix a <b>mínim comú denominador</b>:<br>${F(a,b)} i ${F(c,d)}`,fields:[{label:'Denominador comú',ans:R(M)},{label:'Numerador de la 1a',ans:R(a*M/b)},{label:'Numerador de la 2a',ans:R(c*M/d)}],
   hints:[`El denominador comú és el m.c.m. de ${b} i ${d}.`,`Divideix el denominador comú entre ${b}: el resultat és el nombre pel qual has de multiplicar el numerador ${a}. Fes el mateix amb la 2a fracció.`],
   steps:[`m.c.m.(${b}, ${d}) = ${M}: aquest és el denominador comú.`,`${F(a,b)}: ${M} : ${b} = ${M/b} → ${a} × ${M/b} = ${a*M/b}. Queda ${F(a*M/b,M)}.`,`${F(c,d)}: ${M} : ${d} = ${M/d} → ${c} × ${M/d} = ${c*M/d}. Queda ${F(c*M/d,M)}.`],
   err:x=>{const D=val(x[0]),p=val(x[1]),q=val(x[2]);if(D!==M&&D>0&&D%b===0&&D%d===0)return'mt_den_minim';if(D===M&&p===a&&q===c&&(a!==a*M/b||c!==c*M/d))return'mt_num_igual';return null}}}},
mt_frac_resta:{mat:'mates',nom:'Restar fraccions (denominador diferent)',ab:'F−',curs:[6],
 teoria:['Per restar fraccions amb denominadors diferents, primer les <b>reduïm a comú denominador</b> i després restam els numeradors. El denominador no es resta.',
  `Exemple: ${F(3,4)} − ${F(1,6)} → ${F(9,12)} − ${F(2,12)} = ${F(7,12)}.`,
  `Per restar una fracció d'un nombre enter, escrivim l'enter com a fracció: 2 − ${F(3,5)} = ${F(10,5)} − ${F(3,5)} = ${F(7,5)}.`],
 gen(lv){
  if(lv===2&&Math.random()<.4){const n=rnd(1,4),b=rnd(2,9),a=rnd(1,b-1),r=R(n*b-a,b);
   return{text:`Calcula:<br>${n} − ${F(a,b)}`,fields:[fF(n*b-a,b)],
    hints:[`Escriu ${n} com a fracció amb denominador ${b}.`,`${n} = ${F(n*b,b)}. Ara resta els numeradors.`],
    steps:[`Escrivim ${n} amb denominador ${b}: ${n} = ${F(n*b,b)}.`,`${F(n*b,b)} − ${F(a,b)} = ${F(n*b-a,b)}${r.d!==b?` = ${fr(n*b-a,b)}`:''}.`,`Resultat: <b>${fr(n*b-a,b)}</b>.`],
    err:x=>{const y=val(x[0]);return eq(y,(n-a)/b)||eq(y,n-a/1)?'mt_enter_fraccio':null}}}
  const pool=lv?[2,3,4,5,6,8,9,10,12]:[2,3,4,5,6];let b,d,a,c;
  do{b=pick(pool);d=lv===0?b*pick([2,3]):pick(pool);a=rnd(1,b-1);c=rnd(1,d-1)}while(b===d||a*d<=c*b||d>12);
  const M=lcm(b,d),na=a*M/b,nc=c*M/d,r=R(na-nc,M);
  return{text:`Calcula:<br>${F(a,b)} − ${F(c,d)}`,fields:[fF(na-nc,M)],
   hints:[`Els denominadors (${b} i ${d}) són diferents. Busca'n un de comú.`,`m.c.m.(${b}, ${d}) = ${M}. Converteix les dues fraccions a denominador ${M}.`],
   steps:[`Denominador comú: m.c.m.(${b}, ${d}) = ${M}.`,`${F(a,b)} = ${F(na,M)} i ${F(c,d)} = ${F(nc,M)}.`,`${F(na,M)} − ${F(nc,M)} = ${F(na-nc,M)}${r.d!==M?` = ${fr(na-nc,M)} (simplificat)`:''}.`],
   err:x=>b-d!==0&&eq(val(x[0]),(a-c)/(b-d))&&!eq((a-c)/(b-d),r.n/r.d)?'mt_resta_den':null}}},
mt_frac_mult:{mat:'mates',nom:'Multiplicar fraccions',ab:'F×',curs:[6],
 teoria:[`Per multiplicar un <b>nombre per una fracció</b>, multiplicam el nombre pel numerador i deixam el denominador: 3 × ${F(2,5)} = ${F(6,5)}.`,
  `Per multiplicar <b>dues fraccions</b>, multiplicam numerador per numerador i denominador per denominador: ${F(2,3)} × ${F(4,5)} = ${F(8,15)}.`,
  `La paraula «<b>de</b>» entre dues fraccions vol dir multiplicar: la meitat de ${F(3,4)} és ${F(1,2)} × ${F(3,4)} = ${F(3,8)}.`,
  'Al final, simplifica el resultat si es pot.'],
 gen(lv){const t=lv===0?0:lv===1?pick([0,1,1]):pick([1,2]);
  if(t===0){const n=rnd(2,9),b=rnd(2,10),a=rnd(1,b-1),fs=Math.random()<.5;
   const text=Math.random()<.4?`Cada got té ${F(a,b)} de litre de suc. Quants litres hi ha en ${n} gots?`:`Calcula:<br>${fs?`${F(a,b)} × ${n}`:`${n} × ${F(a,b)}`}`;
   return{text,fields:[fF(n*a,b,'Resultat (ex. 7/4)')],
    hints:['Quan multipliques un nombre per una fracció, quina part de la fracció canvia?',`Multiplica ${n} pel numerador, ${a}.`],
    steps:[`Multiplicam el nombre pel numerador: ${n} × ${a} = ${n*a}.`,`El denominador es queda igual: ${F(n*a,b)}.`,`Resultat: <b>${fr(n*a,b)}</b>.`],
    err:x=>!eq(a/b,n*a/b)&&eq(val(x[0]),a/b)?'mt_frac_mult_ambdos':null}}
  const b=rnd(2,9),d=rnd(2,9),a=rnd(1,lv===2?b:b-1),c=rnd(1,d-1),P=a*c,Q=b*d;
  const text=t===2?`Quant és ${F(a,b)} <b>de</b> ${F(c,d)}?`:`Calcula:<br>${F(a,b)} × ${F(c,d)}`;
  return{text,fields:[fF(P,Q)],
   hints:[t===2?'«De» entre dues fraccions vol dir multiplicar.':'Multiplica en línia: numerador amb numerador i denominador amb denominador.',`Numerador: ${a} × ${c}. Denominador: ${b} × ${d}.`],
   steps:[t===2?`«De» vol dir multiplicar: ${F(a,b)} × ${F(c,d)}.`:`Multiplicam en línia.`,`Numerador: ${a} × ${c} = ${P}. Denominador: ${b} × ${d} = ${Q}.`,`${F(P,Q)}${R(P,Q).d!==Q?` = ${fr(P,Q)} (simplificat)`:''}.`],
   err:x=>!eq(a*d/(b*c),P/Q)&&eq(val(x[0]),a*d/(b*c))?'mt_frac_creu':null}}},
mt_frac_div:{mat:'mates',nom:'Dividir fraccions',ab:'F:',curs:[6],
 teoria:[`Per dividir dues fraccions, multiplicam la primera per la <b>inversa</b> de la segona (la fracció girada): ${F(2,3)} : ${F(4,5)} = ${F(2,3)} × ${F(5,4)} = ${F(10,12)} = ${F(5,6)}.`,
  `També es pot fer <b>en creu</b>: el numerador del resultat és 2 × 5 i el denominador, 3 × 4.`,
  `Dividir una fracció entre un nombre: ${F(3,4)} : 2 = ${F(3,8)}. Dividir un nombre entre una fracció: quantes ampolles de ${F(3,4)} l omplim amb 6 l? → 6 : ${F(3,4)} = ${F(24,3)} = 8.`],
 gen(lv){const t=lv===0?0:lv===1?pick([0,1,1]):pick([1,2]);
  if(t===0){const b=rnd(2,9),a=rnd(1,b-1),n=rnd(2,6);
   return{text:`Calcula:<br>${F(a,b)} : ${n}`,fields:[fF(a,b*n)],
    hints:[`Pensa ${n} com la fracció ${F(n,1)}. Quina és la seva inversa?`,`Dividir entre ${n} és multiplicar per ${F(1,n)}.`],
    steps:[`Dividir entre ${n} és multiplicar per la inversa, ${F(1,n)}.`,`${F(a,b)} × ${F(1,n)} = ${F(a,b*n)}.`,`Resultat: <b>${fr(a,b*n)}</b>.`],
    err:x=>eq(val(x[0]),a*n/b)?'mt_frac_div_directe':null}}
  if(t===1){const b=rnd(2,9),d=rnd(2,9),a=rnd(1,b-1),c=rnd(1,d-1),P=a*d,Q=b*c;
   return{text:`Calcula:<br>${F(a,b)} : ${F(c,d)}`,fields:[fF(P,Q)],
    hints:[`Gira la segona fracció: la inversa de ${F(c,d)} és ${F(d,c)}.`,`Ara multiplica: ${F(a,b)} × ${F(d,c)}.`],
    steps:[`Multiplicam per la inversa de ${F(c,d)}, que és ${F(d,c)}.`,`${F(a,b)} × ${F(d,c)} = ${F(P,Q)}.`,`Resultat: <b>${fr(P,Q)}</b>.`],
    err:x=>!eq(a*c/(b*d),P/Q)&&eq(val(x[0]),a*c/(b*d))?'mt_frac_div_directe':null}}
  let a,b;do{b=rnd(2,5);a=rnd(1,b-1)}while(gcd(a,b)!==1);const m=rnd(2,6),n=a*m,res=m*b;
  return{text:`Tenim <b>${n} litres</b> de suc i omplim ampolles de ${F(a,b)} de litre. Quantes ampolles podem omplir?`,fields:[fInt('Ampolles',res)],
   hints:['Has de saber quantes vegades cap la fracció dins el total: és una divisió.',`Calcula ${n} : ${F(a,b)}. Multiplica per la inversa.`],
   steps:[`És una divisió: ${n} : ${F(a,b)}.`,`${n} × ${F(b,a)} = ${F(n*b,a)} = ${res}.`,`Podem omplir <b>${res} ampolles</b>.`],
   err:x=>eq(val(x[0]),n*a/b)?'mt_frac_div_directe':null}}},

/* ---------- Decimals ---------- */
mt_frac_dec:{mat:'mates',nom:'Fraccions i nombres decimals',ab:'Fd',curs:[6],
 teoria:[`Una fracció és una <b>divisió</b>: ${F(3,4)} = 3 : 4 = <b>0,75</b>.`,
  `Les fraccions amb denominador 10, 100 o 1.000 es passen a decimal directament: ${F(7,10)} = 0,7; ${F(23,100)} = 0,23; ${F(5,1000)} = 0,005.`,
  `Truc: busca una fracció equivalent amb denominador 10, 100 o 1.000. ${F(3,5)} = ${F(6,10)} = 0,6.`,
  `I al revés: 0,35 = ${F(35,100)} = ${F(7,20)} (simplificant fins a la fracció irreductible).`],
 gen(lv){
  if(Math.random()<.55){const d=pick(lv===0?[2,4,5,10]:lv===1?[4,5,8,20,25,100]:[8,20,25,40,50,125,1000]);let n;do{n=rnd(1,d-1)}while(gcd(n,d)!==1);
   const s=dc(n/d);let p=1;while((10**p)%d)p++;const k=10**p/d;
   return{text:`Escriu en forma de <b>nombre decimal</b>:<br>${F(n,d)}`,fields:[{label:'Nombre decimal (ex. 0,25)',txt:[s,s.replace(',','')]}],
    hints:[`Una fracció és una divisió: ${n} : ${d}.`,k===1?`El denominador és ${d}: compta els zeros per saber quantes xifres decimals hi ha.`:`Busca una fracció equivalent amb denominador ${num(10**p)}: multiplica per ${k}.`],
    steps:[k===1?`El denominador és ${num(d)}: el resultat tindrà ${p} xifres decimals.`:`Multiplicam numerador i denominador per ${k}: ${F(n,d)} = ${F(n*k,10**p)}.`,`${F(n*k,10**p)} = ${n*k} : ${num(10**p)}.`,`Resultat: <b>${s}</b>.`],
    err:x=>x[0]===`${n}${d}`?'mt_frac_coma':null}}
  const p=lv===0?1:pick([2,2,3]),P=10**p;let n;do{n=rnd(1,P-1)}while(n%10===0);const r=R(n,P);
  return{text:`Escriu en forma de <b>fracció irreductible</b>:<br>${dc(n/P)}`,fields:[{label:'Numerador',ans:R(r.n)},fInt('Denominador',r.d)],
   hints:['Compta les xifres decimals: 1 xifra són dècimes, 2 xifres són centèsimes i 3 xifres són mil·lèsimes. Escriu el nombre sense coma damunt el denominador que toca.','Després simplifica: divideix numerador i denominador pel mateix nombre fins que no es pugui més.'],
   steps:[`${dc(n/P)} = ${F(n,P)}.`,r.d!==P?`Simplificam dividint per ${P/r.d}: ${F(n,P)} = ${F(r.n,r.d)}.`:`No es pot simplificar.`,`Resultat: <b>${F(r.n,r.d)}</b>.`],
   err:x=>{const a=val(x[0]),b=val(x[1]);return b&&eq(a/b,n/P)&&a!==r.n?'mt_simplifica_mes':null}}}},
mt_dec_mult:{mat:'mates',nom:'Multiplicar decimals',ab:'D×',curs:[6],
 teoria:['Per <b>multiplicar per 10, 100 o 1.000</b>, corrent la coma 1, 2 o 3 llocs cap a la dreta (si falten xifres, hi posam zeros): 3,45 × 100 = 345.',
  'Per multiplicar <b>decimals</b>: 1. Multiplicam com si no hi hagués comes. 2. Comptam les xifres decimals de tots els factors. 3. Al resultat, posam la coma deixant aquest nombre de xifres a la dreta.',
  'Exemple: 2,4 × 1,3 → 24 × 13 = 312. Hi ha 1 + 1 = 2 xifres decimals → <b>3,12</b>.'],
 gen(lv){const t=lv===0?pick([0,1]):lv===1?pick([0,1,2]):pick([1,2,2]);let a,p,b,q,v;
  do{p=rnd(1,2);a=rnd(11,t===0?9999:lv===2?999:99);if(a%10===0)continue;
   if(t===0){p=rnd(1,3);b=10**rnd(1,3);q=0}else if(t===1){b=rnd(2,lv?25:9);q=0}else{do{b=rnd(2,99)}while(b%10===0);q=1}
   v=a*b/10**(p+q)}while(a%10===0||v>=1000&&!Number.isInteger(v)||v<0.001);
  const A=dc(a/10**p),B=dc(b/10**q),ans=R(a*b,10**(p+q)),z=Math.log10(b);
  return{text:`Calcula:<br><b>${A} × ${B}</b>`,fields:[Number.isInteger(v)&&v>=1000?fInt('Resultat',v):{label:'Resultat',ans}],
   hints:t===0?[`Multiplicar per ${num(b)} és córrer la coma uns quants llocs. Cap a on?`,`${num(b)} té ${z} zero${z>1?'s':''}: corre la coma ${z} llocs cap a la dreta.`]:['Multiplica primer sense fer cas de les comes.',`Després compta les xifres decimals dels factors: ${p+q}.`],
   steps:t===0?[`${num(b)} té ${z} zero${z>1?'s':''}.`,`Correm la coma ${z} llocs cap a la dreta.`,`${A} × ${num(b)} = <b>${dc(v)}</b>.`]
    :[`Multiplicam sense comes: ${a} × ${b} = ${a*b}.`,`Els factors tenen ${p}${q?` + ${q} = ${p+q}`:''} xifres decimals.`,`Posem la coma deixant ${p+q} xifres a la dreta: <b>${dc(v)}</b>.`],
   err:x=>comaErr(val(x[0]),v)?'mt_dec_coma':null}}},
mt_dec_div:{mat:'mates',nom:'Dividir decimals',ab:'D:',curs:[6],
 teoria:['Per <b>dividir entre 10, 100 o 1.000</b>, corrent la coma 1, 2 o 3 llocs cap a l\'esquerra: 45,6 : 100 = 0,456.',
  '<b>Decimal entre un nombre natural:</b> dividim normalment i, quan baixam la primera xifra decimal, posam la coma al quocient. 7,5 : 3 = 2,5.',
  '<b>Treure decimals:</b> si una divisió té residu, posam una coma al quocient, afegim un 0 al residu i continuam: 7 : 4 = 1,75.',
  '<b>Divisor decimal:</b> multiplicam el dividend i el divisor per 10, 100... fins que el divisor no tingui coma. 4,5 : 0,15 → 450 : 15 = 30.'],
 gen(lv){const t=lv===0?pick([0,1]):lv===1?pick([0,1,2]):pick([1,2,3]);
  if(t===0){let a,p,s;do{a=rnd(11,9999);p=rnd(0,2);s=rnd(1,3)}while(a%10===0||p+s>4);const v=a/10**(p+s);
   return{text:`Calcula:<br><b>${dc(a/10**p)} : ${num(10**s)}</b>`,fields:[{label:'Resultat',ans:R(a,10**(p+s))}],
    hints:[`Dividir entre ${num(10**s)} és córrer la coma. Cap a on?`,`Corre la coma ${s} llocs cap a l'esquerra. Si cal, posa zeros davant.`],
    steps:[`${num(10**s)} té ${s} zero${s>1?'s':''}.`,`Correm la coma ${s} llocs cap a l'esquerra.`,`${dc(a/10**p)} : ${num(10**s)} = <b>${dc(v)}</b>.`],
    err:x=>comaErr(val(x[0]),v)?'mt_dec_coma':null}}
  if(t===1){const r=rnd(1,2);let qi;do{qi=rnd(11,lv?999:99)}while(qi%10===0);const d=rnd(2,lv?15:9),D=qi*d,v=qi/10**r;
   return{text:`Calcula:<br><b>${dc(D/10**r)} : ${d}</b>`,fields:[{label:'Quocient',ans:R(qi,10**r)}],
    hints:['Divideix com si fos una divisió normal.','Quan baixis la primera xifra decimal del dividend, posa la coma al quocient.'],
    steps:[`Dividim sense pensar en la coma: ${D} : ${d} = ${qi}.`,`El dividend té ${r} xifra${r>1?'es':''} decimal${r>1?'s':''}, i el quocient també.`,`${dc(D/10**r)} : ${d} = <b>${dc(v)}</b>.`],
    err:x=>comaErr(val(x[0]),v)?'mt_dec_coma':null}}
  if(t===2){const d=pick([2,4,5,8,20,25]);let n;do{n=rnd(d+1,lv===2?400:100)}while(n%d===0);const v=n/d;
   return{text:`Calcula traient decimals fins que el residu sigui 0:<br><b>${n} : ${d}</b>`,fields:[{label:'Quocient',ans:R(n,d)}],
    hints:[`${n} : ${d} dona ${Math.floor(n/d)} i sobra ${n%d}. Però no t'aturis!`,'Posa una coma al quocient, afegeix un 0 al residu i continua dividint.'],
    steps:[`${n} : ${d} = ${Math.floor(n/d)}, residu ${n%d}.`,`Posem la coma al quocient i continuam afegint zeros al residu.`,`${n} : ${d} = <b>${dc(v)}</b>.`],
    err:x=>{const y=val(x[0]);return y===Math.floor(n/d)?'mt_dec_residu':comaErr(y,v)?'mt_dec_coma':null}}}
  const q=pick([1,2]);let b;do{b=rnd(2,q===1?9:30)}while(b%10===0);const B=b/10**q,Qr=pick([0,1]),qq=rnd(2,Qr?99:60),A=b*qq/10**(q+Qr),v=qq/10**Qr;
  return{text:`Calcula:<br><b>${dc(A)} : ${dc(B)}</b>`,fields:[{label:'Quocient',ans:R(qq,10**Qr)}],
   hints:['El divisor té coma. Multiplica el dividend i el divisor pel mateix nombre (10, 100...) perquè el divisor quedi sense coma.',`Multiplica'ls tots dos per ${num(10**q)}.`],
   steps:[`Multiplicam tots dos per ${num(10**q)}: ${dc(A)} : ${dc(B)} = ${dc(A*10**q)} : ${b}.`,`Dividim: ${dc(A*10**q)} : ${b} = ${dc(v)}.`,`Resultat: <b>${dc(v)}</b>.`],
   err:x=>comaErr(val(x[0]),v)?'mt_dec_coma':null}}},

/* ---------- Proporcionalitat i percentatges ---------- */
mt_proporcio:{mat:'mates',nom:'Proporcionalitat directa',ab:'Pd',curs:[6],
 teoria:['Dues magnituds són <b>directament proporcionals</b> si, quan una es multiplica per 2, per 3..., l\'altra també es multiplica per 2, per 3... Exemple: el nombre de kg de pomes i el preu.',
  'Per resoldre problemes, el millor és la <b>reducció a la unitat</b>: primer calculam quant val 1, i després multiplicam.',
  'Exemple: 3 kg costen 6,30 €. 1 kg costa 6,30 : 3 = 2,10 €. 5 kg costen 2,10 × 5 = <b>10,50 €</b>.',
  'També ho pots fer amb la <b>regla de tres</b>: si 3 kg → 6,30 €, aleshores 5 kg → 6,30 × 5 : 3 = <b>10,50 €</b>. Multiplicam en creu i dividim entre el nombre que queda.',
  'Compte: no és proporcional sumar la mateixa quantitat (si 3 kg costen 6 €, 4 kg no costen 7 €).'],
 gen(lv){const n1=rnd(2,lv?8:5);let n2;do{n2=rnd(2,lv?15:10)}while(n2===n1);
  const C=[
   {u:lv?pick([1.25,1.5,2.4,0.75,3.6,4.5]):rnd(2,9),t:(a,b,u)=>`Si ${a} kg de pomes costen ${eur(a*u)}, quant costaran ${b} kg?`,lab:'Preu (€)',e:true,one:'1 kg'},
   {u:lv?pick([4.5,6.5,7.25,8.5]):rnd(5,9),t:(a,b,u)=>`${a} entrades del cinema costen ${eur(a*u)}. Quant costaran ${b} entrades?`,lab:'Preu (€)',e:true,one:'1 entrada'},
   {u:pick([25,40,50,75,125]),t:(a,b,u)=>`Per fer un pastís per a ${a} persones calen ${a*u} g de farina. Quanta farina caldrà per a ${b} persones?`,lab:'Farina (g)',one:'1 persona',un:'g'},
   {u:pick([60,75,80,90,120]),t:(a,b,u)=>`Un tren recorre ${a*u} km en ${a} hores, sempre a la mateixa velocitat. Quants km recorrerà en ${b} hores?`,lab:'Distància (km)',one:'1 hora',un:'km'},
   {u:lv?pick([2.5,3.5,1.5]):rnd(3,12),t:(a,b,u)=>`Una aixeta omple ${dc(a*u)} litres en ${a} minuts. Quants litres omplirà en ${b} minuts?`,lab:'Litres',one:'1 minut',un:'l'}];
  const c=pick(C),u=c.u,ans=Math.round(n2*u*100)/100,add=Math.round((n1*u+(n2-n1))*100)/100,fmt=x=>c.e?eur(x):`${dc(x)} ${c.un}`;
  const tbl=lv>0&&Math.random()<.4,m=n1+1===n2?n1+2:n1+1;
  return{text:tbl?`Aquesta taula és de proporcionalitat directa. Quin nombre falta?`:c.t(n1,n2,u),
   fig:tbl?taula(['Quantitat',n1,m,n2],[['Valor',dc(n1*u),dc(m*u),'?']]):null,fields:[fDec(c.lab,ans)],
   hints:[tbl?'Per quin nombre es multipliquen les quantitats de dalt per obtenir les de baix?':`Calcula primer quant val ${c.one}.`,`${dc(n1*u)} : ${n1} = ${dc(u)}. Ara multiplica.`],
   steps:tbl?[`Cada valor és la quantitat multiplicada per ${dc(u)}: ${dc(n1*u)} : ${n1} = ${dc(u)}.`,`${n2} × ${dc(u)} = ${dc(ans)}.`,`Falta el <b>${dc(ans)}</b>.`]
    :[`Reducció a la unitat: ${c.one} → ${fmt(n1*u)} : ${n1} = ${fmt(u)}.`,`Multiplicam per ${n2}: ${dc(u)} × ${n2} = ${dc(ans)}.`,`Resposta: <b>${fmt(ans)}</b>.`],
   err:x=>!eq(add,ans)&&near(val(x[0]),add)?'mt_prop_additiu':null}}},
mt_descomptes:{mat:'mates',nom:'Descomptes, augments i percentatges',ab:'D%',curs:[6],
 teoria:['<b>Descompte</b> (rebaixa): calculam el percentatge i el <b>restam</b> del preu. 60 € amb un 25 % de descompte → 25 % de 60 = 15 € → 60 − 15 = <b>45 €</b>.',
  '<b>Augment</b> (per exemple, l\'IVA): calculam el percentatge i el <b>sumam</b>. 40 € + 21 % d\'IVA → 21 % de 40 = 8,40 € → 40 + 8,40 = <b>48,40 €</b>.',
  '<b>Quin percentatge és?</b> Dividim la part entre el total i multiplicam per 100. 6 de 24 → 6 : 24 × 100 = <b>25 %</b>.'],
 gen(lv){const t=lv===0?pick([0,2]):pick([0,1,2]);
  if(t===0){const p=pick(lv?[15,20,25,30,35,40]:[10,20,25,50]),st=lv?1:100/gcd(p,100);let P;do{P=st*rnd(1,Math.floor(150/st))}while(P<10);
   const dsc=P*p/100,a=Math.round((P-dsc)*100)/100,[what,vb]=pick([['Unes sabatilles','costen'],['Una motxilla','costa'],['Un joc de taula','costa'],['Una bicicleta','costa']]);
   return{text:`${what} ${vb} ${eur(P)}. ${vb==='costen'?'Tenen':'Té'} un descompte del <b>${p} %</b>. Quant ${vb} ara?`,fields:[fDec('Preu final (€)',a)],
    hints:[`Calcula primer quants euros et descompten: el ${p} % de ${P}.`,'Després resta el descompte del preu inicial.'],
    steps:[`Descompte: ${p} % de ${P} = ${P} × ${p} : 100 = ${eur(dsc)}.`,`Preu final: ${P} − ${dc(dsc)} = ${eur(a)}.`,`(També: si et descompten el ${p} %, pagues el ${100-p} % del preu.)`],
    err:x=>{const y=val(x[0]);return near(y,dsc)&&!near(dsc,a)?'mt_preu_final':near(y,P-p)&&!near(P-p,a)?'mt_percent_euros':null}}}
  if(t===1){const p=pick([10,21,5,8,12]),P=rnd(10,lv===2?300:120),inc=P*p/100,a=Math.round((P+inc)*100)/100;
   const text=p===21||p===10?`Un llibre costa ${eur(P)} sense IVA. Cal afegir-hi un <b>${p} %</b> d'IVA. Quant costa amb l'IVA?`:`Una entrada costava ${eur(P)} i ha pujat un <b>${p} %</b>. Quant costa ara?`;
   return{text,fields:[fDec('Preu final (€)',a)],
    hints:[`Calcula primer el ${p} % de ${P}.`,'Ara suma aquest augment al preu inicial.'],
    steps:[`Augment: ${p} % de ${P} = ${P} × ${p} : 100 = ${eur(inc)}.`,`Preu final: ${P} + ${dc(inc)} = <b>${eur(a)}</b>.`],
    err:x=>near(val(x[0]),inc)?'mt_preu_final':null}}
  let T,pc;do{T=pick([20,25,40,50,60,80,200,300,400,500]);pc=pick([10,20,25,30,40,50,60,75,80])}while(T*pc%100);const part=T*pc/100;
  const text=pick([`En una classe de ${T} alumnes, ${part} porten ulleres. Quin percentatge dels alumnes porta ulleres?`,`D'un camp de ${T} arbres, ${part} són ametllers. Quin percentatge són ametllers?`,`En una prova de ${T} preguntes, n'has encertat ${part}. Quin percentatge has encertat?`]);
  return{text,fields:[fInt('Percentatge (%)',pc)],
   hints:['Has de saber quantes en serien de cada 100.',`Divideix ${part} : ${T} i multiplica per 100.`],
   steps:[`Fracció: ${F(part,T)}.`,`${part} : ${T} = ${dc(part/T)}; × 100 = ${pc}.`,`És el <b>${pc} %</b>.`],
   err:x=>part!==pc&&val(x[0])===part?'mt_percent_part':null}}},
mt_escales:{mat:'mates',nom:'Escales: plànols i mapes',ab:'Es',curs:[6],
 teoria:['L\'<b>escala</b> d\'un plànol o d\'un mapa ens diu quantes vegades s\'ha fet més petita la realitat.',
  'L\'escala <b>1 : 50.000</b> vol dir que 1 cm del mapa són 50.000 cm a la realitat (és a dir, 500 m).',
  'Distància real = distància al mapa × escala. Després passam els cm a m (: 100) o a km (: 100.000).',
  'Exemple: a escala 1 : 200.000, 3 cm són 600.000 cm = <b>6 km</b>.'],
 gen(lv){const t=lv===0?0:lv===1?pick([0,1]):pick([0,1,2]),plan=Math.random()<.35,E=plan?pick([50,100,200,500]):pick([10000,20000,25000,50000,100000,200000]),
   un=plan?'m':'km',div=plan?100:100000,qn=plan?pick(['dues portes d\'una casa','els extrems d\'una pista','dos arbres d\'un parc']):pick(['dues poblacions','dos pobles','dues platges']);
  const c=rnd(2,15),real=c*E/div,ex=y=>(z=>[-5,-4,-3,-2,-1,1,2,3,4,5].some(k=>near(y,z*10**k)));
  if(t===0)return{text:`En un ${plan?'plànol':'mapa'} a escala <b>1 : ${num(E)}</b>, ${qn} estan separades ${c} cm. Quina és la distància real en ${plan?'metres':'quilòmetres'}?`,fields:[fDec(`Distància real (${un})`,real)],
   hints:[`1 cm del ${plan?'plànol':'mapa'} són ${num(E)} cm reals. Quants cm reals són ${c} cm?`,`Després passa els cm a ${plan?'m (divideix entre 100)':'km (divideix entre 100.000)'}.`],
   steps:[`1 cm són ${num(E)} cm reals.`,`${c} × ${num(E)} = ${num(c*E)} cm.`,`${num(c*E)} cm = <b>${dc(real)} ${un}</b>.`],
   err:x=>ex(val(x[0]))(real)?'mt_escala_unitats':null};
  if(t===1)return{text:`${qn[0].toUpperCase()+qn.slice(1)} estan a ${dc(real)} ${un} de distància real. A quina distància estaran en un ${plan?'plànol':'mapa'} a escala <b>1 : ${num(E)}</b>?`,fields:[fDec(`Distància al ${plan?'plànol':'mapa'} (cm)`,c)],
   hints:[`Passa primer la distància real a cm.`,`Després divideix entre ${num(E)}.`],
   steps:[`${dc(real)} ${un} = ${num(c*E)} cm.`,`${num(c*E)} : ${num(E)} = ${c}.`,`Al ${plan?'plànol':'mapa'}: <b>${c} cm</b>.`],
   err:x=>ex(val(x[0]))(c)?'mt_escala_unitats':null};
  return{text:`En un ${plan?'plànol':'mapa'}, ${c} cm representen ${dc(real)} ${un} reals. Quina és l'escala?<br>1 : ?`,fields:[fInt('Escala 1 :',E)],
   hints:['Passa la distància real a cm.',`Després calcula quants cm reals representa 1 cm: divideix entre ${c}.`],
   steps:[`${dc(real)} ${un} = ${num(c*E)} cm.`,`${num(c*E)} : ${c} = ${num(E)}.`,`L'escala és <b>1 : ${num(E)}</b>.`],
   err:x=>ex(val(x[0]))(E)?'mt_escala_unitats':null}}}
});
})();
