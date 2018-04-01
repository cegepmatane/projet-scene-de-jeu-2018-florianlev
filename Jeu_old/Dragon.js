function Dragon(scene, couleur) {

	var dragon = this;

	var imageDragon;
	this.estCharge = false;
	var bmpAnim;
	var spriteDragon;

	var animHaut;
	var animDroite;
	var animGauche;
	var etatActuelX;
	var etatActuelY;
	this.animBas;
	


	var xCourant;
	var yCourant;
	var animationCourante;


	var positionCourante = { x: 0, y: 0 };

	var etatCourant;

	// utiliser etats pour collisionement

	var Etat = {

		enDirectionDroite: "EN DIRECTION DROITE",
		enDirectionGauche: "EN DIRECTION GAUCHE",
		enDirectionHaut: "EN DIRECTION HAUT",
		enDirectionBas: "EN DIRECTION BAS",
		enSurplace: "EN SURPLACE",
		enPossessionBalle: "EN POSSESSION DE LA BALLE",
	}
	//player = animationDeplacement(10,10)


	function initialiser() {

		imageDragon = new Image();
		
		imageDragon.src = "dragons.png";

		imageDragon.onload = terminerChargement;


	}



	function terminerChargement() {


		spriteDragon = new createjs.SpriteSheet(
			{
				images: [imageDragon],
				frames: { "regX": 0, "height": 128, "count": 64, "regY": 0, "width": 128 },
				framerate: 13,
				animations:
					{
						marcheBas: [0, 3, "marcheBas"],
						marcheGauche: [4, 7, "marcheGauche"],
						marcheDroite: [8, 11, "marcheDroite"],
						marcheHaut: [12, 15, "marcheHaut"]
					}

			});

		animHaut = new createjs.Sprite(spriteDragon, "marcheHaut");
		animDroite = new createjs.Sprite(spriteDragon, "marcheDroite");
		animGauche = new createjs.Sprite(spriteDragon, "marcheGauche");
		animBas = new createjs.Sprite(spriteDragon, "marcheBas");
		dragon.estCharge = true;
		
		animDroite.x = positionCourante.x;
		animDroite.y = positionCourante.y;
		etatCourant = Etat.enDirectionDroite;

		rectrangleAnimationDragonMarcheBas = animBas.getTransformedBounds();
		rectrangleAnimationDragonMarcheHaut = animHaut.getTransformedBounds();
		rectrangleAnimationDragonMarcheGauche = animGauche.getTransformedBounds();
		rectrangleAnimationDragonMarcheDroite = animDroite.getTransformedBounds();



	}

	function gererAnimation(animation)
	{
		xCourant = animationCourante.x;
		yCourant = animationCourante.y;

		scene.removeChild(animationCourante);
		animationCourante = animation;
		animationCourante.x = xCourant;
		animationCourante.y = yCourant;
		scene.addChild(animationCourante);
	}

	this.afficher = function () {

		
		animationCourante = animBas;
		scene.addChild(animationCourante);

	}
	

	this.appliquerVitesse = function (nombreDePas) {
		if (etatCourant == Etat.enDirectionDroite) {
			positionCourante.x = animDroite.x;
			positionCourante.x += nombreDePas;
			animDroite.x = positionCourante.x;

		}
		if (etatCourant == Etat.enDirectionGauche) {
			positionCourante.x = animGauche.x;
			positionCourante.x -= nombreDePas;
			animGauche.x = positionCourante.x;
		}
		if (etatCourant == Etat.enDirectionHaut) {
			positionCourante.y = animHaut.y;
			positionCourante.y -= nombreDePas;
			animHaut.y = positionCourante.y;
		}
		if (etatCourant == Etat.enDirectionBas) {
			positionCourante.y = animBas.y;
			positionCourante.y += nombreDePas;
			animBas.y = positionCourante.y;
		}
		if (etatCourant == Etat.enSurplace) {
		}



	}

	this.maintenirPosition = function () {
		etatCourant = Etat.enSurplace;
	}

	this.deplacerVersLaDroite = function () {
		if (etatCourant == Etat.enDirectionDroite) {
		}
		else {
	
			etatCourant = Etat.enDirectionDroite;
			gererAnimation(animDroite);

		}

	}

	this.deplacerVersLaGauche = function () {
		if (etatCourant == Etat.enDirectionGauche) {
		}
		else {

			etatCourant = Etat.enDirectionGauche;
			gererAnimation(animGauche);

		}

	}

	this.deplacerVersLeHaut = function () {
		if (etatCourant == Etat.enDirectionHaut) {
		}
		else {

			etatCourant = Etat.enDirectionHaut;
			gererAnimation(animHaut);
			

		}

	}

	this.deplacerVersLeBas = function () {
		if (etatCourant == Etat.enDirectionBas) {
		}
		else {

			etatCourant = Etat.enDirectionBas;
			gererAnimation(animBas);

		}

	}


	this.rectangleDuDragon = function () {

		switch (etatCourant) {
			case Etat.enDirectionDroite:
				etatActuelX = animDroite.getTransformedBounds();
				break;
			case Etat.enDirectionGauche:
				etatActuelX = animGauche.getTransformedBounds();
				break;
			case Etat.enDirectionHaut:
				etatActuelX = animHaut.getTransformedBounds();
				break;
			case Etat.enDirectionBas:
				etatActuelX = animBas.getTransformedBounds();
				break;
		}

		return etatActuelX;
	}

	


	this.attraperBalle = function () 
	{
		etatCourant = Etat.enPossessionBalle;

	}

	this.lancerBalle = function()
	{

	}

	this.getCouleur = function()
	{
		return couleur;
	}


	initialiser();
}

