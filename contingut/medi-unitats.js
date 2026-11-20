/* Aprenem - unitats de MEDI (clau interna 'ciencies'), en l'ordre d'un llibre de 6è
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Format: [nom de la unitat, [ids de temes], (opcional) [cursos]]
   - 5è: les unitats de sempre.
   - 6è: ordre habitual dels llibres de 6è (Coneixement del medi natural i social / Ciencias de la Naturaleza i Ciencias
     Sociales de Santillana, Anaya, SM, Vicens Vives, Edelvives): primer el medi natural (9 unitats) i després el social (6),
     cobrint els sabers del RD 157/2022 i del Decret 31/2022 de les Illes Balears. Els temes propis de les Illes duen
     «Illes Balears» al nom (md_illes, md_ecobal, md_histbal) i es mantenen dins la unitat que els toca.
   Les làmines s'afegeixen soles a la pàgina de Medi des del seu arxiu (contingut/lamines/) i el material,
   des de contingut/medi-material.js. */
UNITS.ciencies=[
 // ---------- 5è ----------
 ['El cos humà',['ci_cos','ci_respiratori'],[5]],
 ['Els éssers vius',['ci_plantes','ci_classif','ci_ecosis'],[5]],
 ['La matèria i l\'energia',['ci_materia','ci_energia'],[5]],
 ['La Terra i l\'Univers',['ci_univers'],[5]],
 // ---------- 6è: el medi natural ----------
 ['La cèl·lula i els éssers vius',['md_cellula','md_regnes','ci_classif','ci_plantes'],[6]],
 ['La nutrició',['ci_cos','md_digestiu','ci_respiratori','md_circulatori','md_excretor'],[6]],
 ['La relació: sentits, sistema nerviós i aparell locomotor',['md_sentits','md_nervios','md_locomotor'],[6]],
 ['La reproducció, la pubertat i la salut',['md_reproduccio','md_salut'],[6]],
 ['Els ecosistemes i la sostenibilitat',['ci_ecosis','md_ecobal','md_sostenibilitat'],[6]],
 ['La matèria i els seus canvis',['ci_materia','md_mescles','md_canvis','md_densitat'],[6]],
 ['L\'energia, les forces i les màquines',['md_forces','ci_energia','md_energia','md_llumso','md_maquines'],[6]],
 ['L\'electricitat, el magnetisme i la tecnologia',['md_electricitat','md_magnetisme','md_tecnologia'],[6]],
 ['L\'Univers',['md_univers','ci_univers'],[6]],
 // ---------- 6è: el medi social ----------
 ['Els paisatges d\'Espanya i de les Illes Balears',['md_relleu','md_clima','md_illes'],[6]],
 ['La població i l\'economia',['md_poblacio','md_sectors','md_economia'],[6]],
 ['L\'organització política: Espanya i la Unió Europea',['md_institucions','md_comunitats','md_ue'],[6]],
 ['L\'Edat Moderna',['md_temps','md_moderna'],[6]],
 ['L\'Edat Contemporània: el segle XIX i el segle XX',['md_contemporania','md_segle19','md_segle20'],[6]],
 ['La història de les Illes Balears',['md_histbal'],[6]],
 // ---------- tots els cursos ----------
 ['Del teu llibre',['ci_llibre']]];
