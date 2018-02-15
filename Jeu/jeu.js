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
	var NOMBRE_DE_PAS = 300;


	function initialiser() {

		dessin = document.getElementById("dessin");
		contexte = dessin.getContext("2d");

		scene = new createjs.Stage(dessin);
		balle = new Balle(scene, dessin);
		balle.estChargee = true;
		console.log(balle.estChargee);
		dragon = new Dragon(scene);
		
		intervale = setInterval(

			function () {
				
				console.log("Jeu->personnage.estCharge " + dragon.estCharge);

				if (dragon.estCharge) {
					clearInterval(intervale);


					dragon.afficher();
					balle.afficher();

					document.onkeydown = gererToucheEnfoncee;
					document.onkeyup = gererToucheLevee;
					createjs.Ticker.framerate = 90;
					createjs.Ticker.addEventListener("tick", rafraichirDeplacementHero);
					
			
				}
			}, 1);

	}


	function collision()
	{

		console.log(dragon.rectangleDuDragon().height);
		if (dragon.rectangleDuDragon().x >= balle.rectangleBalle().x +  balle.rectangleBalle().width || dragon.rectangleDuDragon().x + dragon.rectangleDuDragon().width <= balle.rectangleBalle().x || dragon.rectangleDuDragon().y >= balle.rectangleBalle().y + balle.rectangleBalle().height || dragon.rectangleDuDragon().y +dragon.rectangleDuDragon().height <= balle.rectangleBalle().y){
			return console.log("caca");
		} 
		
	
	}

	this.checkIntersection = function (rect1, rect2) {
		if (rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y) return false;
		return true;
	}

	function rafraichirDeplacementHero(evenement) {
		var vitesseParSeconde = evenement.delta / 1000 * NOMBRE_DE_PAS;
		dragon.appliquerVitesse(vitesseParSeconde);

		collision();


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
		}
	}

	initialiser();

})();