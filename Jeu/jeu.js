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

	intervale = setInterval(

		function()
		{
			console.log("Jeu->personnage.estCharge " + dragon.estCharge);
			//console.log("lla");
			if(!dragon.estCharge){

				
				dragon.afficher();
				//ennemi.afficher();

				clearInterval(intervale);

			}

		}, 1);

	
	function gererTouche(evenement)
	{

        switch(evenement.keyCode)
        {
           	case TOUCHE_GAUCHE:
                createjs.Ticker.on("tick", dragon.deplacerGauche);
     
                //dragon.deplacerGauche();
                break;
            case TOUCHE_DROITE:
                //alert("TOUCHE_DROITE");
  				createjs.Ticker.on("tick", dragon.deplacerDroite);
                //dragon.deplacerDroite();
                break;
            case TOUCHE_HAUT:
            	createjs.Ticker.on("tick", dragon.deplacerHaut);
                //dragon.deplacerHaut();
                break;
            case TOUCHE_BAS:
     			createjs.Ticker.on("tick", dragon.deplacerBas);
                //dragon.deplacerBas();
                break;
        }
                scene.update();
    }

    this.document.onkeydown = gererTouche;

})();