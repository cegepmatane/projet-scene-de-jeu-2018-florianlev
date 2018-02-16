(function () {


	var dessin;
	var scene;
	var contexte;

	var dragon;
	var balle;

	var TOUCHE_GAUCHE = 37;
	var TOUCHE_DROITE = 39;
	var TOUCHE_HAUT = 38;
	var TOUCHE_BAS = 40;
	var TOUCHE_ESPACE = 32;
	
	var NOMBRE_DE_PAS = 500	;

	var EtatCouleur = {
		bleu: "est Bleu",
		rouge: "est Rouge",
		orange: "est Orange",
		jaune: "est Jaune",
	}
	

	function initialiser() {

		dessin = document.getElementById("dessin");
		contexte = dessin.getContext("2d");

		scene = new createjs.Stage(dessin);
		balle = new Balle(scene, dessin);

		dragon = new Dragon(scene,EtatCouleur.orange);
		


		intervale = setInterval(

			function () {

				console.log("Jeu->personnage.estCharge " + dragon.estCharge);

				if (dragon.estCharge) {
					clearInterval(intervale);


					dragon.afficher();
					balle.afficher();

					document.onkeydown = gererToucheEnfoncee;
					document.onkeyup = gererToucheLevee;
					dessin.addEventListener("mouseup", cliqueLevee, false);

					createjs.Ticker.framerate = 90;
					createjs.Ticker.addEventListener("tick", rafraichirDeplacementHero);


				}
			}, 1);

	}




	function pasEnCollision() {
		rectangleDuDragon = dragon.rectangleDuDragon();
		rectangleDeBalle = balle.rectangleBalle();

		if (rectangleDuDragon.x >= rectangleDeBalle.x + rectangleDeBalle.width || rectangleDuDragon.x + rectangleDuDragon.width <= rectangleDeBalle.x || rectangleDuDragon.y >= rectangleDeBalle.y + rectangleDeBalle.height || rectangleDuDragon.y + rectangleDuDragon.height <= rectangleDeBalle.y) {
			balle.pasEnCollision = false;

		}
		else {
			balle.pasEnCollision = true;
		}

	}


	function rafraichirDeplacementHero(evenement) {
		var vitesseParSeconde = evenement.delta / 1000 * NOMBRE_DE_PAS;
		dragon.appliquerVitesse(vitesseParSeconde);


		balle.deplacementBalle();
		pasEnCollision();


		scene.update(evenement);
	}

	function gererToucheEnfoncee(evenement) {

		switch (evenement.keyCode) {
			case TOUCHE_GAUCHE:
				dragon.deplacerVersLaGauche();


				break;
			case TOUCHE_DROITE:

				dragon.deplacerVersLaDroite();

				break;
			case TOUCHE_HAUT:
				dragon.deplacerVersLeHaut();

				break;
			case TOUCHE_BAS:
				dragon.deplacerVersLeBas();

				break;
		}
	}



	function gererToucheLevee(evenement) {

		switch (evenement.keyCode) {

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

			case TOUCHE_ESPACE:

				if (balle.pasEnCollision) {
					balle.attraper(dragon.getCouleur());
					//console.log("suce ma bite");
				}
				break;
		}
	}

	function cliqueLevee()
	{
		if(balle.pasEnCollision){
			
			balle.lancer();
		}
		
	}

	initialiser();

})();