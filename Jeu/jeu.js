(function(){
	//var dessin = document.getElementById("dessin").getContext("2d");
	var dessin = document.getElementById("dessin");
	var scene = new createjs.Stage(dessin);

	var dragon = new Dragon(dessin);
	var ennemi = new Ennemi(dessin);

	var TOUCHE_GAUCHE = 37; 
	var TOUCHE_DROITE = 39;
	var TOUCHE_HAUT = 38;
	var TOUCHE_BAS = 40;

	var deplacementX = 0;
	var deplacementY = 0;

	intervale = setInterval(

		function()
		{
			console.log("Jeu->personnage.estCharge " + dragon.estCharge);

			if(!dragon.estCharge ){

				
				dragon.afficher();
				//ennemi.afficher();

				clearInterval(intervale);

			}

		}, 1);

	
	function gererTouche(evenement)
	{
            //alert("touche" + evenement.keyCode);
            //alert(bonhomme.dessin.x);    
        switch(evenement.keyCode)
        {
           	case TOUCHE_GAUCHE:
                //alert("TOUCHE_GAUCHE");
     
                dragon.deplacerGauche();
                break;
            case TOUCHE_DROITE:
                //alert("TOUCHE_DROITE");
  
                dragon.deplacerDroite();
                break;
            case TOUCHE_HAUT:

                dragon.deplacerHaut();
                break;
            case TOUCHE_BAS:
     
                dragon.deplacerBas();
                break;
        }
                scene.update();
    }

    this.document.onkeydown = gererTouche;

})();