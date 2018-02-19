(function () {

	var accueilVue;
	var jeuVue;


	var dessin;
	var scene;
	var contexte;
	var rectangle;


	var dragon;
	var balle;
	var balleEnCollisionAvecDragon = false;
	var balleEnCollisionAvecEnnemi = false;
	var points = 0;
	var vie = 3;

	var TOUCHE_GAUCHE = 65;
	var TOUCHE_DROITE = 68;
	var TOUCHE_HAUT = 87;
	var TOUCHE_BAS = 83;
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


	function initialiser() {
		window.addEventListener("hashchange", interpreterEvenementLocation);
		dessin = document.getElementById("dessin");
		//contexte = dessin.getContext("2d");
		createjs.MotionGuidePlugin.install();

		scene = new createjs.Stage(dessin);
		
		dragon = new Dragon(scene,EtatCouleur.orange);
		
		accueilVue = new AccueilVue(dragon);
		accueilVue.afficher();
		jeuVue = new JeuVue(dragon);
		balle = new Balle(scene, dessin);

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

	function interpreterEvenementLocation(evenement)
	{

		var intructionNavigation = window.location.hash;
		if(!intructionNavigation || intructionNavigation.match(/^#$/) || intructionNavigation.match(/^#accueil$/))
		{
			accueilVue.afficher();
		}
		else if (intructionNavigation.match(/^#jeu$/))
		{
			jeuVue.afficher();
		}
	}


	function enCollision() {
		
		rectangleDeBalle = balle.rectangleBalle();
		rectangleEnnemi = ennemi.rectangleEnnemi;
		//verif collision entre balle et joueur


		if(dragon.rectangleDuDragon().intersects(balle.rectangleBalle()))
		{
			balleEnCollisionAvecDragon = true;
			
		}

		else if(ennemi.representerRectangle().intersects(balle.rectangleBalle()))
		{
			balleEnCollisionAvecEnnemi = true;

		}
		else
		{
			balleEnCollisionAvecDragon = false;
			balleEnCollisionAvecEnnemi = false;
		}
	

	}


	function rafraichirDeplacementHero(evenement) {
		var vitesseParSeconde = evenement.delta / 1000 * NOMBRE_DE_PAS;
		dragon.appliquerVitesse(vitesseParSeconde);
		balle.deplacementBalle();
		rectangleDuDragon = dragon.rectangleDuDragon();
		
		
		enCollision();
		pointsJoueur();
		vieJoueur();
		gagnerPartieOuPerdu();

		
		
		if(balle.etatCaptivite == balle.EtatEnCaptivite.enlibertee && balleEnCollisionAvecEnnemi)
		{
			
			balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteEnnemi;
			
			balle.attraper();
			//balle.estAttrapable = false;
		
		}
		ennemi.poursuivreJoueur(rectangleDuDragon.x,rectangleDuDragon.y, balle.etatCaptivite,balle.EtatEnCaptivite.enlibertee, balle.EtatEnCaptivite.enCaptiviteEnnemi, balle.rectangleBalle().x, balle.rectangleBalle().y);

		if(balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteEnnemi ) 
		{
			console.log("test");
			
			balle.lancer(rectangleDuDragon.x, rectangleDuDragon.y);
			balle.etatCaptivite = balle.EtatEnCaptivite.enlibertee;
			//balle.estAttrapable = true;
		}
		console.log(balle.etatCaptivite);
		if (balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteAllie)
		{
			ennemi.fuir();
		}
		scene.update(evenement);
	}


/* 	function ennemiPoursuivreJoueur()
	{


		if(!balle.balleEstAttrapable)
		{
			rectangleDuDragon = dragon.rectangleDuDragon();
			console.log(ennemi.animIdle);
			createjs.Tween.get(ennemi.animIdle).to({x: rectangleDuDragon.x , y: rectangleDuDragon.y}, 2000);

		}

		else if(balle.balleEstAttrapable)
		{
			ennemi.setPositionEnnemi(balle.rectangleBalle().x, balle.rectangleBalle().y);
		}
	} */

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
				if (balleEnCollisionAvecDragon) {
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


		if(balleEnCollisionAvecDragon && balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteAllie){
			
			balle.lancer(positionX, positionY);
		}
		
	}

	function pointsJoueur()
	{
		if(balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteAllie)
		{
			if(balleEnCollisionAvecEnnemi)
			{
				
				points += 1;
				console.log("points" + points);
			}
		}
	}

	function vieJoueur()
	{
		if(balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteEnnemi)
		{
			console.log(balleEnCollisionAvecDragon);
			if(balleEnCollisionAvecDragon)
			{
				vie -= 1;
				console.log("vie " + vie);
			}
		}
	}

	function gagnerPartieOuPerdu()
	{
		if (points == 3)
		{
			alert("GAGNER");
		}
		else if (vie == 0)
		{
			alert("PERDU");
		}
	}



	initialiser();

})();