(function(){
	//var dessin = document.getElementById("dessin").getContext("2d");
	var dessin ;
	var scene ;
	var contexte;

	var dragon;

	
	//var ennemi = new Ennemi(dessin);

	var TOUCHE_GAUCHE = 37; 
	var TOUCHE_DROITE = 39;
	var TOUCHE_HAUT = 38;
	var TOUCHE_BAS = 40;
	var NOMBRE_DE_PAS = 300;
	//balle = new Balle(scene);
	

	function initialiser(){
		dessin = document.getElementById("dessin");
		contexte = dessin.getContext("2d");
		
		scene = new createjs.Stage(dessin);
		dragon = new Dragon(scene);
		balle = new Balle(contexte, dessin);




		intervale = setInterval(

			function()
			{
				console.log("Jeu->personnage.estCharge " + dragon.estCharge);
			//console.log("lla");
			if(dragon.estCharge ){
				clearInterval(intervale);

				dragon.afficher();


		        document.onkeydown = gererToucheEnfoncee;
		        document.onkeyup = gererToucheLevee;
				createjs.Ticker.framerate = 90;
				createjs.Ticker.addEventListener("tick", rafraichir);
			}


		}, 1);

		intervaleDessinerBalle = setInterval(balle.dessiner,10);
	}


	function rafraichir(evenement){
		var vitesseParSeconde = evenement.delta / 1000 * NOMBRE_DE_PAS;
		dragon.appliquerVitesse(vitesseParSeconde);
		scene.update(evenement);

	}

	function gererToucheEnfoncee(evenement)
	{

		switch(evenement.keyCode)
		{
			case TOUCHE_GAUCHE:
				dragon.deplacerVersLaGauche();

                //dragon.deplacerGauche();
                break;
            case TOUCHE_DROITE:
                //alert("TOUCHE_DROITE");
               	dragon.deplacerVersLaDroite();
                //dragon.deplacerDroite();
                break;
            case TOUCHE_HAUT:
                dragon.deplacerVersLeHaut();
                //dragon.deplacerHaut();
                break;
            case TOUCHE_BAS:
                dragon.deplacerVersLeBas();
                //dragon.deplacerBas();
                break;
        }

    }

        function gererToucheLevee(evenement){

        	switch(evenement.keyCode){
        		case TOUCHE_GAUCHE:
        		dragon.maintenirPosition();
        		break;

        		case TOUCHE_DROITE:
        		dragon.maintenirPosition();
        		break;

        		case TOUCHE_HAUT:
        		dragon.maintenirPosition();
        		break;

        		case TOUCHE_BAS:
        		dragon.maintenirPosition();
        		break;
        	}
        }

        initialiser();


})();