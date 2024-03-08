/* 
!   QuickJedi Algorithm : 
?       extends JEDI baseline algorithm : 
?       -   JEDI baseline : calculate min cost matching between children 
?       -   whilst the QuickJedi CHECKS THE aggregate size bound to access whether the matching is required 




!   Distance d'éditions des arbres 
?       les opérations à faire : supprimer, modifier, ajouter des noeuds 
?       

?       à vérifier : si JEDI fait les différences après il calcule les distances, ou bien il fait les distances en premier 


!   Lire tt ce qui est json schema (sur les données fournit)
!   Comprendre 


!   Distance d'édition : le nimbre minimale pour transformer un arbre T1 en arbre T2 avec les opérations suivantes : 
?       -   Suppression d'un noeud (+ relier les enfants avec son ancêtre )
?       -   Ajout d'un noeud dans l'arbre 
?       -   renommer un noeud  
!   Json Edit Maping 
?       -   Noeud de T1 qui ne sont pas mappé dans T2 sont supprimé 
?       -   Noeud de T2 qui ne sont pas mappé dans T1 sont rajouté 
?       -   Noeud qui sont mappés sont renoméer 

!   BaseLine algorithm 
?       -   solution récusrive : 
?       -   nous avons deux arbre T1 , T2 
?       -   soit v(resp. w) le root node de T1 (resp. T2)
?       -   décomposer les trees en subtress et subforests 
*       -   la distance entre T1 et T2 est calculée à partir de la distance entre 
*           les sous problem obtenues par la décomposition ????? 
?       -   la distance édition est le coût minimale de soit : 
?               -   inserer  v dans un des subtrees de T2
?               -   supprimer v : les noeuds du subtrees T2[w] sony mappé avec un des fils de V dans T1
?               -   renommer v : 

?       -   le résultats est sauvegarder dans une matrice DT + DF 
*       min cost matching 



!   plotter la distribution des distacnces + enlever les outliers qui sont plus grand que la moyenne 
!   threadshold d'erreur + regarder les moyennes 

?   trouver des explcications entre distance d'édition entre 

!   Rédaction
?           -   écrire sur la distance d'édition, c'est quoi 
?           -   donner des exemples sur JEDI et comment la distance d'édition marche entre temps  


!   Codes : 
?           -   prendre des samples des schemas + instances non correct (une dizaine de schéma et une dizaine d'instance)
*           Notes : 
?               -   anyOf : ne précise pas ou est situer l'erreur juste qu'il y'a bien une erreur (pas de TypeError juste qu'il y a une erreur sur la branche)
?               -   Not : précise ou est situer l'erreur  (TypeError)
?               -   allOf : précise ou est situer l'erreur  (TypeError)
todo        -   visualiser manuellement avec faker ou se situe la tendance des erreurs
todo        -   essayer d'automatiser ça 
todo        -   essayer de trouver des solutions basiques poru certaines violation de contraintes (type mismatch ....)
todo        -   le gros soucis c'est l'opérateur :  not et allOf, y'a des techniques pour transferer un allOf en anyOf qui est plus simple à vérifier mais qui ne marche pas tt le temps 




!   Raport : 
?           -   Introduction 
?           -   Châpitre 1.5 ==> 1.2 
?           -   Validation d'un schéma => validation d'instance par rapport à un schéma  
?           -       Donner un exemple sur la validation : un schéma une instance valide + non valide +  
?           -   Chapitre 2.2 déplacer au chapitre 1 pour la génération 

?           -   Chapitre 2.1 : mettre les résultats de l'année dernière sur les trois générateurs, dire qu'on a les schémas, 




!   Introduire la notion d'erreur : 
?       -   pour chaque opérateur dire quelles sont les erreurs possibles 
?           dire qu'on se base sur l'algorithme de fixing inspiré par l'erreur 
?           



!   https://github.com/jimblackler/jsongenerator/blob/master/src/main/java/net/jimblackler/jsongenerator/Fixer.java

*/