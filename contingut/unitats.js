/* Aprenem - unitats de cada assignatura (com el llibre de text)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Cada unitat: [nom, [ids de temes]]. Els temes que no hi surten van a «Altres temes». */
const UNITS={
 mates:[
  ['Fraccions',['frac_equiv','frac_suma_igual','frac_suma_dif','frac_de_nombre']],
  ['Decimals i percentatges',['decimals','percentatges']],
  ['Operacions',['divisions']]],
 angles:[
  ['Verbs i temps verbals',['en_present','en_cont','en_be','en_was','en_reg_past','en_irr_past','en_irr_pp','en_irr_inf','en_verb_sig','en_past','en_past_neg']],
  ['Gramàtica',['en_plural','en_compar']],
  ['Vocabulari i comprensió',['en_vocab','en_listen']]],
 ciencies:[
  ['El cos humà',['ci_cos','ci_respiratori']],
  ['Els éssers vius',['ci_plantes','ci_classif','ci_ecosis']],
  ['La matèria i l\'energia',['ci_materia','ci_energia']],
  ['La Terra i l\'Univers',['ci_univers']],
  ['Del teu llibre',['ci_llibre']]]
};
// Làmines disponibles per assignatura (pantalla, nom, descripció, icona)
const LAMINES={ciencies:[{obre:'lamina',nom:'L\'aparell respiratori',desc:'Les parts i com respiram',ic:'lungs',tema:'ci_respiratori'}]};
