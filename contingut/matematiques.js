/* Aprenem - contingut de MATEMATIQUES (temes i generadors d exercicis)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.

   Arxius de Matemàtiques (en aquest ordre a index.html):
     matematiques-eines.js        eines comunes (objecte MT: format de nombres, camps, dibuixos)
     matematiques.js              temes de 5è i 6è (fraccions, decimals, divisions, percentatges) i UNITS.mates
     matematiques-nombres.js      6è: naturals, operacions, divisibilitat, potències i arrels, enters
     matematiques-fraccions.js    6è: fraccions, decimals, proporcionalitat, percentatges, escales
     matematiques-mesura.js       6è: mesura (longitud, massa, capacitat, superfície, volum, temps) i angles
     matematiques-geometria.js    6è: polígons, circumferència, àrees, cossos i volum
     matematiques-estadistica.js  6è: estadística i probabilitat + material (formulari i taules de mesura)
     matematiques-practica.js     6è: temes afegits per seguir el llibre de referència (comparar fraccions i decimals,
                                  coordenades, bisectriu i mediatriu, freqüències)
     matematiques-estat.js        6è: sabers del currículum estatal (RD 157/2022) que no són al llibre: patrons, igualtats,
                                  moviments al pla, educació financera, fraccions-decimals-percentatges, gràfics
     lamines/mates-lamines.js     làmines (figures, cossos, recta numèrica, geoplà) i material (convertidor, taules)

   Fonts del temari de 6è:
   - Decret 31/2022, d'1 d'agost, que estableix el currículum de l'educació primària a les Illes Balears
     (BOIB núm. 101, de 2 d'agost de 2022). Matemàtiques, sabers bàsics del 3r cicle:
     A. Sentit numèric (comptatge, quantitat, sentit de les operacions, relacions, educació financera),
     B. Sentit de la mesura (magnitud, mesura, estimació), C. Sentit espacial (figures de 2 i 3 dimensions,
     localització, visualització i raonament geomètric), D. Sentit algebraic (patrons, relacions, proporcionalitat),
     E. Sentit estocàstic (organització i anàlisi de dades, incertesa), F. Sentit socioafectiu.
     https://www.caib.es/sites/lomloe/ca/normativa_de_educacion_primaria
     (Nota: el Decret 32/2022 és el de l'ESO; el de Primària és el 31/2022.)
   - Reial decret 157/2022, d'1 de març (ensenyaments mínims de Primària), annex II, Matemàtiques.
   - Estructura habitual dels llibres de Matemàtiques de 6è (nombres grans i romans, divisibilitat, potències
     i arrels, enters, fraccions, decimals, proporcionalitat i percentatges, mesura, angles, polígons i
     circumferència, àrees, cossos i volum, estadística i probabilitat, resolució de problemes).
   - Llibre de referència (ordre de les unitats de 6è): «Practica Mat 6. Matemàtiques. Illes Balears (6.1-6.2-6.3)»,
     Comunitat Zoom, Editorial Vicens Vives (J. Fraile i A. Pineda), ISBN 978-84-682-9280-9. Índex consultat a
     l'extracte oficial en PDF de la fitxa del llibre: https://vicensvives.com/shop/product/9788468292809
     12 temes: 1 Nombres naturals i operacions · 2 Potències i arrel quadrada · 3 Múltiples i divisors · 4 Fraccions ·
     5 Nombres decimals · 6 Proporcionalitat i percentatges · 7 Nombres enters · 8 Angles · 9 Unitats de mesura ·
     10 Unitats de superfície i volum · 11 Àrees i volums · 12 Estadística i probabilitat.
     Els exercicis de l'app són originals: no es copia cap text ni exercici del llibre. */
/* ===================== habilitats (exercicis verificables) ===================== */
Object.assign(SK,{
 frac_equiv:{nom:'Fraccions equivalents',ic:'🍕',
  teoria:['Dues fraccions són <b>equivalents</b> si representen la mateixa quantitat, encara que s\'escriguin amb nombres diferents.',
   `Per exemple, ${F(1,2)} i ${F(2,4)}: si parteixes una pizza en 2 trossos i en menges 1, menges el mateix que si la parteixes en 4 i en menges 2.`,
   'Per trobar una fracció equivalent <b>multipliquem (o dividim) el numerador i el denominador pel mateix nombre</b>. Mai no sumem!'],
  gen(lv){const b=rnd(2,lv?9:6),a=rnd(1,b-1),k=rnd(2,lv>1?9:5);
   return{text:`Completa la fracció equivalent:<br>${F(a,b)} = ${F('?',b*k)}`,fields:[{label:'Numerador',ans:R(a*k)}],
    vis:barHTML(b,a),
    hints:[`Fixa't en els denominadors: ${b} i ${b*k}. Per quin nombre s'ha multiplicat ${b}?`,`${b} × ${k} = ${b*k}. Ara has de fer el mateix amb el numerador.`],
    steps:[`El denominador ${b} s'ha convertit en ${b*k}, perquè ${b} × ${k} = ${b*k}.`,`Per mantenir la mateixa quantitat, el numerador també es multiplica per ${k}: ${a} × ${k} = ${a*k}.`,`Per tant, ${F(a,b)} = ${F(a*k,b*k)}.`],
    err:v=>v[0].d===1&&v[0].n===a+b*k-b?'suma_no_multiplica':null,
    paint:b*k<=24?{kind:'bar',parts:b*k,target:a*k,label:`Pinta ${F(a,b)} d'aquesta barra. Està dividida en ${b*k} parts iguals.`,
      follow:{q:`Quina fracció de la barra has pintat? Escriu-la amb denominador ${b*k}.`,ans:R(a*k,b*k),raw:`${a*k}/${b*k}`}}:null};
  }},
 frac_suma_igual:{nom:'Sumar i restar fraccions (mateix denominador)',ic:'➕',
  teoria:['Quan les fraccions tenen el <b>mateix denominador</b>, les parts són de la mateixa mida.',
   `Per això només sumem (o restem) els <b>numeradors</b> i deixem el mateix denominador: ${F(2,7)} + ${F(3,7)} = ${F(5,7)}.`,
   'El denominador no se suma: diu en quantes parts està dividida la unitat, i això no canvia.'],
  gen(lv){const den=rnd(3,lv?12:8);let a=rnd(1,den-1),b=rnd(1,den-1);const resta=lv>0&&Math.random()<.5;
   if(resta){if(a===b){if(a===1)a=2;else b--}if(a<b)[a,b]=[b,a]}
   const r=resta?a-b:a+b,op=resta?'−':'+',s=R(r,den);
   return{text:`Calcula:<br>${F(a,den)} ${op} ${F(b,den)}`,fields:[{label:'Resultat (ex. 3/4)',ans:s}],
    vis:barHTML(den,a)+barHTML(den,b),
    hints:['Els denominadors són iguals. Què passa amb el denominador quan sumes o restes?',`El denominador continua sent ${den}. Ara ${resta?'resta':'suma'} només els numeradors.`],
    steps:[`Els dos denominadors són ${den}: el resultat també tindrà denominador ${den}.`,`${resta?'Restem':'Sumem'} els numeradors: ${a} ${op} ${b} = ${r}.`,`Resultat: ${F(r,den)}${s.d!==den&&s.n?` = ${F(s.n,s.d)} (simplificat)`:''}.`],
    err:v=>!resta&&req(v[0],R(a+b,2*den))?'suma_denominadors':null};
  }},
 frac_suma_dif:{nom:'Sumar fraccions (denominador diferent)',ic:'🧮',
  teoria:['Si els denominadors són <b>diferents</b>, les parts tenen mides diferents i no es poden sumar directament.',
   'Primer busquem un <b>denominador comú</b> (el mínim comú múltiple dels denominadors) i convertim cada fracció en una d\'equivalent.',
   `Exemple: ${F(1,2)} + ${F(1,3)} → ${F(3,6)} + ${F(2,6)} = ${F(5,6)}.`],
  gen(lv){const pool=lv?[2,3,4,5,6,8,9,10,12]:[2,3,4,6,8];const b=pick(pool);let e;do{e=pick(pool)}while(e===b);
   const a=rnd(1,b-1),c=rnd(1,e-1),L=lcm(b,e),na=a*L/b,nc=c*L/e,s=R(na+nc,L);
   return{text:`Calcula:<br>${F(a,b)} + ${F(c,e)}`,fields:[{label:'Resultat (ex. 5/6)',ans:s}],
    vis:barHTML(b,a)+barHTML(e,c),
    hints:[`Els denominadors (${b} i ${e}) són diferents. Busca un nombre que sigui múltiple de tots dos.`,`El mínim comú múltiple de ${b} i ${e} és ${L}. Converteix les dues fraccions a denominador ${L}.`],
    steps:[`Busquem el denominador comú: m.c.m.(${b}, ${e}) = ${L}.`,`${F(a,b)} = ${F(na,L)} (multipliquem per ${L/b}) i ${F(c,e)} = ${F(nc,L)} (multipliquem per ${L/e}).`,`${F(na,L)} + ${F(nc,L)} = ${F(na+nc,L)}${s.d!==L?` = ${F(s.n,s.d)} (simplificat)`:''}.`],
    err:v=>req(v[0],R(a+c,b+e))?'suma_denominadors':null};
  }},
 frac_de_nombre:{nom:'Fracció d\'un nombre',ic:'🍬',
  teoria:['Per calcular la fracció d\'un nombre fem dues passes:','1. <b>Dividim</b> el nombre pel denominador (així sabem quant val cada part).','2. <b>Multipliquem</b> el resultat pel numerador (agafem les parts que ens diuen).',`Exemple: ${F(3,4)} de 20 → 20 : 4 = 5 → 5 × 3 = 15.`],
  gen(lv){const d=rnd(2,lv?10:6),n=rnd(1,d-1),k=rnd(2,lv?15:8),N=d*k;
   const text=pick([`Una classe té ${N} alumnes. ${F(n,d)} dels alumnes van d'excursió. Quants alumnes hi van?`,`En Pau té ${N} cromos i en regala ${F(n,d)}. Quants cromos regala?`,`Un dipòsit té ${N} litres d'aigua. Se n'han gastat ${F(n,d)}. Quants litres s'han gastat?`,`Quant és ${F(n,d)} de ${N}?`]);
   return{text,fields:[{label:'Resposta',ans:R(n*k)}],
    vis:N<=80?groupsHTML(d,k,0):null,
    hints:[`En quantes parts iguals has de repartir ${N}? Mira el denominador.`,`${N} : ${d} = ${k}. Cada part val ${k}. Quantes parts has d'agafar?`],
    steps:[`Dividim pel denominador: ${N} : ${d} = ${k}. Cada part val ${k}.`,`Multipliquem pel numerador: ${k} × ${n} = ${n*k}.`,`Resposta: ${n*k}.`],
    err:v=>v[0].d!==1?null:(n!==1&&v[0].n===k?'nomes_divideix':(v[0].n===N*n?'nomes_multiplica':null)),
    paint:N<=60?{kind:'groups',parts:d,k,target:n,label:`Hi ha ${N} punts repartits en ${d} grups iguals. Toca els grups que formen ${F(n,d)} del total.`,
      follow:{q:`Quants punts hi ha als grups que has triat? (és ${F(n,d)} de ${N})`,ans:R(n*k)}}:null};
  }},
 decimals:{nom:'Sumar i restar decimals',ic:'🔢',
  teoria:['En els nombres decimals, la <b>coma</b> separa la part entera de la part decimal.','Per sumar o restar decimals, col·loquem els nombres de manera que les <b>comes quedin alineades</b>: unitats davall unitats, dècimes davall dècimes, centèsimes davall centèsimes.','Si cal, afegim zeros a la dreta: 1,4 = 1,40.'],
  gen(lv){let a=rnd(101,lv?2999:999);if(a%10===0)a++;const bt=rnd(11,lv?199:99),bh=bt*10;let resta=Math.random()<.5;if(resta&&a<=bh)resta=false;
   const r=resta?a-bh:a+bh,op=resta?'−':'+';
   return{text:`Calcula:<br><b>${dec(a)} ${op} ${dec(bh)}</b>`,fields:[{label:'Resultat',ans:R(r,100)}],vis:null,
    hints:['Imagina els nombres un davall l\'altre amb les comes alineades. Quantes xifres decimals té cada un?',`Escriu ${dec(bh)} com ${dec2(bh)} i ${resta?'resta':'suma'} columna per columna.`],
    steps:[`Escrivim ${dec(bh)} com ${dec2(bh)} perquè tots dos tinguin dues xifres decimals.`,`Alineem les comes i ${resta?'restem':'sumem'}: ${dec2(a)} ${op} ${dec2(bh)}.`,`Resultat: ${dec(r)}.`],
    err:v=>req(v[0],R(resta?a-bt:a+bt,100))?'comes_no_alineades':null};
  }},
 divisions:{nom:'Divisions',ic:'➗',
  teoria:['En una divisió hi ha: <b>dividend</b> (el que repartim), <b>divisor</b> (entre quants), <b>quocient</b> (quant toca a cadascú) i <b>residu</b> (el que sobra).','El residu sempre ha de ser <b>més petit que el divisor</b>. Si no, encara en podríem repartir més!','Comprovació: divisor × quocient + residu = dividend.'],
  gen(lv,curs){const dv=curs>=6&&lv>0?rnd(11,29):rnd(3,9),D=rnd(lv?1000:100,lv?9999:999),q=Math.floor(D/dv),r=D%dv;
   return{text:`Fes la divisió:<br><b>${D} : ${dv}</b>`,fields:[MT.fInt('Quocient',q),{label:'Residu',ans:R(r)}],vis:null,
    hints:[`Comença per les primeres xifres de ${D}: quantes vegades hi cap ${dv}?`,`Pots comprovar el resultat: ${dv} × quocient + residu ha de donar ${D}.`],
    steps:[`${dv} × ${q} = ${dv*q}, que és el múltiple de ${dv} més gran que no passa de ${D}.`,`Residu: ${D} − ${dv*q} = ${r} (és més petit que ${dv} ).`,`Comprovació: ${dv} × ${q} + ${r} = ${D}.`],
    err:v=>v[1].d===1&&v[1].n>=dv?'residu_gran':null};
  }},
 percentatges:{nom:'Percentatges',ic:'💯',
  teoria:['El <b>percentatge</b> (%) vol dir «de cada 100». El 25% vol dir 25 de cada 100.',`Un percentatge és una fracció amb denominador 100: 25% = ${F(25,100)} = ${F(1,4)}.`,'Per calcular el p% d\'un nombre: <b>multipliquem pel percentatge i dividim entre 100</b>. Exemple: 20% de 50 → 50 × 20 : 100 = 10.'],
  gen(lv){const p=pick(lv?[5,15,30,40,60,75]:[10,20,25,50]),step=100/gcd(p,100),lo=Math.ceil(20/step),N=step*rnd(lo,lo+(lv?15:8)),ans=p*N/100;
   const text=pick([`Una bicicleta costa ${N} €. Està rebaixada un ${p}%. Quants euros et descompten?`,`En una escola hi ha ${N} alumnes i el ${p}% hi va en bicicleta. Quants alumnes hi van en bicicleta?`,`Calcula el ${p}% de ${N}.`]);
   return{text,fields:[{label:'Resposta',ans:R(ans)}],vis:null,
    hints:[`${p}% vol dir ${p} de cada 100. Com ho escriuries en forma de fracció?`,`Multiplica ${N} × ${p} i després divideix entre 100.`],
    steps:[`${p}% = ${F(p,100)}.`,`${N} × ${p} = ${N*p}.`,`${N*p} : 100 = ${ans}.`],
    err:v=>p!==10&&N%p===0&&v[0].d===1&&v[0].n===N/p?'divideix_percent':null};
  }}
});

/* Unitats de MATEMÀTIQUES: [nom, [temes], (opcional) [cursos]] */
// Els temes sense curs serveixen per a 5è i 6è; els de 6è tenen curs:[6]. Cada curs veu només les seves unitats.
UNITS.mates=[
 // ---- 5è ----
 ['Fraccions',['frac_equiv','frac_suma_igual','frac_suma_dif','frac_de_nombre'],[5]],
 ['Decimals i percentatges',['decimals','percentatges'],[5]],
 ['Operacions',['divisions'],[5]],
 // ---- 6è: ordre del llibre de referència (Practica Mat 6, Vicens Vives, Illes Balears) ----
 // 1r trimestre (quadern 6.1): temes 1-4
 ['Nombres naturals i operacions',['mt_grans','mt_aprox','mt_combinades','divisions','mt_problemes'],[6]],
 ['Potències i arrel quadrada',['mt_potencies','mt_pot10','mt_arrels'],[6]],
 ['Múltiples i divisors',['mt_multiples','mt_criteris','mt_mcm_mcd','mt_primers'],[6]],
 ['Fraccions',['frac_de_nombre','mt_simplificar','frac_equiv','mt_frac_comparar','mt_comu_den','frac_suma_igual','frac_suma_dif','mt_frac_resta'],[6]],
 // temes 5-12 (quaderns 6.2 i 6.3)
 ['Nombres decimals',['mt_frac_dec','mt_dec_ordre','decimals','mt_dec_mult','mt_dec_div'],[6]],
 ['Proporcionalitat i percentatges',['mt_proporcio','percentatges','mt_fdp','mt_descomptes','mt_escales'],[6]],
 ['Nombres enters',['mt_enters','mt_enters_op','mt_coordenades'],[6]],
 ['Angles',['mt_angles','mt_angles_poligon','mt_bisectriu'],[6]],
 ['Unitats de mesura',['mt_mesures'],[6]],
 ['Unitats de superfície i volum',['mt_superficie','mt_volum_unitats'],[6]],
 ['Àrees i volums',['mt_lam_figures','mt_poligons','mt_area_quad','mt_area_tri','mt_area_cercle','mt_circumf','mt_area_comp','mt_cossos','mt_lam_cossos','mt_volum'],[6]],
 ['Estadística i probabilitat',['mt_frequencies','mt_estadistica','mt_grafics','mt_grafics_sl','mt_probabilitat'],[6]],
 // sabers bàsics del currículum estatal (RD 157/2022) que no surten al llibre de referència
 ['Patrons, igualtats i moviments',['mt_patrons','mt_equacions','mt_moviments'],[6]],
 ['Educació financera',['mt_finances'],[6]],
 // temes que no surten al llibre de referència, però que es conserven per repassar i ampliar
 ['Repàs i ampliació',['mt_romans','mt_frac_mult','mt_frac_div','mt_temps'],[6]]];
