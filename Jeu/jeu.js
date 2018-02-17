(function () {


	var dessin;
	var scene;
	var contexte;
	var rectangle;

	var dragon;
	var balle;
	var balleEnCollisionAvecDragon = false;
	var balleEnCollisionAvecEnnemi = false;

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
		rose: "est Rose",
		noir: "est Noir",
	}

	var bY;
	var bX;

	

	function initialiser() {

		dessin = document.getElementById("dessin");
		contexte = dessin.getContext("2d");

		scene = new createjs.Stage(dessin);

		balle = new Balle(scene, dessin);

		dragon = new Dragon(scene,EtatCouleur.orange);
		ennemi = new Ennemi(scene);
		
		

		intervale = setInterval(

			function () {

				console.log("Jeu->personnage.estCharge " + dragon.estCharge);

				if (dragon.estCharge && ennemi.estCharge) {
					clearInterval(intervale);


					dragon.afficher();
					ennemi.afficher();
					balle.afficher();

					document.onkeydown = gererToucheEnfoncee;
					document.onkeyup = gererToucheLevee;
					//dessin.addEventListener("mouseup", cliqueLevee, false);
					scene.on("stagemouseup", clicRelache);

					createjs.Ticker.framerate = 90;
					createjs.Ticker.addEventListener("tick", rafraichirDeplacementHero);


				}
			}, 1);

	}





	function enCollision() {
		
		rectangleDeBalle = balle.rectangleBalle();
		rectangleEnnemi = ennemi.rectangleEnnemi;
		//verif collision entre balle et joueur


		if(dragon.rectangleDuDragon().intersects(balle.rectangleBalle()))
		{
			balle.balleEnCollisionAvecDragon = true;
			
		}

		else if(ennemi.representerRectangle().intersects(balle.rectangleBalle()))
		{
			balle.balleEnCollisionAvecEnnemi = true;

		}
		else
		{
			balle.balleEnCollisionAvecDragon = false;
			balle.balleEnCollisionAvecEnnemi = false;
		}
	

	}


	function rafraichirDeplacementHero(evenement) {
		var vitesseParSeconde = evenement.delta / 1000 * NOMBRE_DE_PAS;
		dragon.appliquerVitesse(vitesseParSeconde);
		rectangleDuDragon = dragon.rectangleDuDragon();
		ennemi.poursuivreJoueur(dragon.rectangleDuDragon().x,dragon.rectangleDuDragon().y, balle.estAttrapable,balle.rectangleBalle().x,balle.rectangleBalle().y);
		balle.deplacementBalle();
		enCollision();


		if(balle.estAttrapable && balle.balleEnCollisionAvecEnnemi)
		{
			balle.attraper();
			balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteEnnemi;

		}


		if(!balle.estAttrapable && balle.balleEnCollisionAvecEnnemi) 
		{
			balle.lancer(rectangleDuDragon.x, rectangleDuDragon.y);
			balle.estAttrapable = true;
		}
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

				if (balle.balleEnCollisionAvecDragon) {
					balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteAllie;
					balle.attraper(dragon.getCouleur());
				}
				else{
					balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteNeutre;
				}
				break;
		}
	}

	function clicRelache(evenement)
	{

		positionX = evenement.stageX;
		positionY = evenement.stageY;


		if(balle.balleEnCollisionAvecDragon){
			
			balle.lancer(positionX, positionY,bX, bY);
		}
		
	}

	initialiser();

})();