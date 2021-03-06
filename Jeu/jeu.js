(function () {
	var accueilVue;
	var jeuVue;

	var gagnerVue;
	var perduVue;

	var dessin;
	var scene;
	var contexte;
	var rectangle;
	var serveur;
	var connection;
	var pretACommencerPartie;


	var J1;
	var J2;
	var estJoueurMaitre;
	var dragon;
	var balle;
	var balleEnCollisionAvecDragon = false;
	var balleEnCollisionAvecJ1 = false;
	var balleEnCollisionAvecJ2 = false;

	var balleEnCollisionAvecEnnemi = false;
	var points = 0;
	var vie = 3;
	var arrierePlan = null;
	var TOUCHE_GAUCHE = 65;
	var TOUCHE_DROITE = 68;
	var TOUCHE_HAUT = 87;
	var TOUCHE_BAS = 83;
	var TOUCHE_ESPACE = 32;
	var NOMBRE_DE_PAS = 500;

	var dejaTouchee = false;

	var EtatCouleur = {
		bleu: "est Bleu",
		rouge: "est Rouge",
		orange: "est Orange",
		jaune: "est Jaune",
		rose: "est Rose",
		noir: "est Noir",
	}

	var bouton;

	//Creation de la connexion


	function initialiser() {
		//serveur = new Connection();

		//Initialisation des vues
		connection = new Connection(recevoirConfirmationJoueurPret,
			recevoirVariableCommencerJouer,
			recevoirIdJoueur,
			recevoirDiagonaleBalleX,
			recevoirDiagonaleBalleY,
			recevoirPositionBalleX,
			recevoirPositionBalleY);

		jeuVue = new JeuVue();
		accueilVue = new AccueilVue();
		gagnerVue = new GagnerVue();
		perduVue = new PerduVue();

		estJoueurMaitre = false;
		pretACommencerPartie = false;
		accueilVue.afficher();

		document.getElementById("bouton-jouer").addEventListener("click", connection.ouvrirContactServeur);
		window.addEventListener("hashchange", interpreterEvenementLocation);

	}

	function recevoirIdJoueur(id) {

		if (id == 0) {
			estJoueurMaitre = true;
			//J1 = new Dragon(scene, EtatCouleur.orange);
		}
		else if (id == 1) {
			//J2 = new Dragon(scene, EtatCouleur.orange);

		}
	}
	function recevoirDiagonaleBalleX(dX) {
		//console.log("recevoirDiagonaleBalleX()");
		balle.setDiagonaleBalleX(dX);
	}

	function recevoirDiagonaleBalleY(dY) {
		//console.log("dY" + dY);

		balle.setDiagonaleBalleY(dY);
	}

	function recevoirPositionBalleX(x) {
		//console.log("x : " +  x);
		balle.setPositionBalleX(x);
	}

	function recevoirPositionBalleY(y) {
		//console.log("y : " +  y);
		balle.setPositionBalleY(y);
	}

	function recevoirConfirmationJoueurPret() {
		console.log("recevoirConfirmationJoueurPret()");
		pretACommencerPartie = true;

	}


	function recevoirDeplacementBalle(e) {
		tracer("recevoirDeplacementBalle()");
		tracer("La reponse a la commande" + e.cmd + "est la suivante :");

		dep = e.params["deplacementBalle"];

		tracer("x :" + dep.x);
		tracer("y :" + dep.y);
	}




	//Methode privée

	function tracer(message, alerte) {
		console.log(message);
		if (alerte) alert(message);
	}

	function deplacementDeLaBalle() {
		if (estJoueurMaitre) {

			balle.deplacementBalle();
			connection.envoyerPositionBalle(balle.getPositionBalleX(), balle.getPositionBalleY());
		}
		balle.afficher();


	}

	function recevoirVariableCommencerJouer(varBool) {
		console.log("recevoirVariableCommencerJouer()");
		commencerAJouer();
		pretACommencerPartie = true;

	}


	function commencerAJouer() {
		//serveur.ouvrirSession(accueilVue.getPseudo());

		dessin = document.getElementById("dessin");
		connection.envoyerTailleCanvasAuServeur(dessin.width, dessin.height);

		scene = new createjs.Stage(dessin);
		arrierePlan = new ArrierePlan(scene);
		if (pretACommencerPartie) {
			document.getElementById("texteAttendre").style.display = "none";

			//dragon = new Dragon(scene, EtatCouleur.orange, "dragons.png");
			J1 = new Dragon(scene, EtatCouleur.orange, "dragonsRed.png");

			J2 = new Dragon(scene, EtatCouleur.orange, "dragons.png");
			console.log("estCharge == " + J1.estCharge);
			J1.modifierPosition(400,300);
			//ennemi = new Ennemi(scene);
			balle = new Balle(scene, dessin);

			setInterval(deplacementDeLaBalle, 25);

			test = "hello";

			intervale = setInterval(

				function () {

					//console.log("Jeu->personnage.estCharge " + dragon.estCharge);

					if (J1.estCharge && J2.estCharge) {
						//if (dragon.estCharge ) {
						clearInterval(intervale);
						arrierePlan.afficher();
						//dragon.afficher();

						J1.afficher();
						J2.afficher();
						
						//ennemi.afficher();
						//balle.deplacementBalle();


						document.onkeydown = gererToucheEnfoncee;
						document.onkeyup = gererToucheLevee;

						scene.on("stagemouseup", clicRelache);

						createjs.Ticker.framerate = 90;
						createjs.Ticker.addEventListener("tick", rafraichirDeplacementHero);
					}
				}, 500);
		}
	}


	function estConnecter() {

	}

	function interpreterEvenementLocation(evenement) {

		var intructionNavigation = window.location.hash;
		if (!intructionNavigation || intructionNavigation.match(/^#$/) || intructionNavigation.match(/^#accueil$/)) {
			accueilVue.afficher();
		}
		else if (intructionNavigation.match(/^#jeu$/)) {
			jeuVue.afficher();

		}
	}


	function enCollision() {

		rectangleDeBalle = balle.rectangleBalle();
		//rectangleEnnemi = ennemi.rectangleEnnemi;
		//verif collision entre balle et joueur

	
		if (J1.rectangleDuDragon().intersects(balle.rectangleBalle())) {
			balleEnCollisionAvecJ1 = true;

		}
		else if (J2.rectangleDuDragon().intersects(balle.rectangleBalle())) {
			balleEnCollisionAvecJ2 = true;

		}

		/*else if (ennemi.representerRectangle().intersects(balle.rectangleBalle())) {
			//setTimeout( function(){

			balleEnCollisionAvecEnnemi = true;
			//},300);
		}*/
		else {
			balleEnCollisionAvecJ1 = false;
			balleEnCollisionAvecJ2 = false;
			//balleEnCollisionAvecDragon = false;
			//balleEnCollisionAvecEnnemi = false;
		}
	}


	function rafraichirDeplacementHero(evenement) {
		var vitesseParSeconde = evenement.delta / 1000 * NOMBRE_DE_PAS;
		arrierePlan.rafraichirAnimation(evenement);
		//dragon.appliquerVitesse(vitesseParSeconde);

		if(estJoueurMaitre)
		{
			J1.appliquerVitesse(vitesseParSeconde);

		}
		else{
			J2.appliquerVitesse(vitesseParSeconde);

		}



		//envoyerPositionBalle();
		//rectangleDuDragon = dragon.rectangleDuDragon();
		rectangleJ1 = J1.rectangleDuDragon();
		rectangleJ2 = J2.rectangleDuDragon();
		console.log(rectangleJ1.x);

		connection.envoyerPositionJ1(rectangleJ1.x, rectangleJ1.y);
		connection.envoyerPositionJ2(rectangleJ2.x, rectangleJ2.y);

		enCollision();
		pointsJoueur();

		gagnerPartieOuPerdu();
		if (balle.etatCaptivite == balle.EtatEnCaptivite.enlibertee && balleEnCollisionAvecEnnemi) {

			//balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteEnnemi;

			balle.attraper();
			//balle.estAttrapable = false;

		}
		//ennemi.poursuivreJoueur(rectangleDuDragon.x, rectangleDuDragon.y, balle.etatCaptivite, balle.EtatEnCaptivite.enlibertee, balle.EtatEnCaptivite.enCaptiviteEnnemi, balle.rectangleBalle().x, balle.rectangleBalle().y);

		if (balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteEnnemi) {
			console.log("test");
			vieJoueur();

			balle.lancer(rectangleDuDragon.x, rectangleDuDragon.y);

			balle.etatCaptivite = balle.EtatEnCaptivite.enlibertee;
			//balle.estAttrapable = true;
		}
		if (balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteAllie) {
			//ennemi.fuir();
		}
		scene.update(evenement);
	}


	function gererToucheEnfoncee(evenement) {

		if (estJoueurMaitre) {
			switch (evenement.keyCode) {
				case TOUCHE_GAUCHE:

					J1.deplacerVersLaGauche();

					break;
				case TOUCHE_DROITE:

					J1.deplacerVersLaDroite();

					break;
				case TOUCHE_HAUT:
					J1.deplacerVersLeHaut();

					break;
				case TOUCHE_BAS:
					J1.deplacerVersLeBas();

					break;
			}
		}
		else {
			switch (evenement.keyCode) {
				case TOUCHE_GAUCHE:

					J2.deplacerVersLaGauche();
					break;
				case TOUCHE_DROITE:

					J2.deplacerVersLaDroite();

					break;
				case TOUCHE_HAUT:
					J2.deplacerVersLeHaut();

					break;
				case TOUCHE_BAS:
					J2.deplacerVersLeBas();

					break;
			}
		}

	}



	function gererToucheLevee(evenement) {


		if (estJoueurMaitre) {
			switch (evenement.keyCode) {

				case TOUCHE_GAUCHE:
					J1.maintenirPosition();
					break;

				case TOUCHE_DROITE:
					J1.maintenirPosition();
					break;

				case TOUCHE_HAUT:
					J1.maintenirPosition();
					break;

				case TOUCHE_BAS:
					J1.maintenirPosition();
					break;

				case TOUCHE_ESPACE:

					if (balleEnCollisionAvecJ1) {
						balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteAllie;
						balle.attraper(J1.getCouleur());
					}
					/*else {
						console.log(balle.etatCaptivite);
						balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteNeutre;
					}*/
					break;
			}
		}
		else {
			switch (evenement.keyCode) {

				case TOUCHE_GAUCHE:
					J2.maintenirPosition();
					break;

				case TOUCHE_DROITE:
					J2.maintenirPosition();
					break;

				case TOUCHE_HAUT:
					J2.maintenirPosition();
					break;

				case TOUCHE_BAS:
					J2.maintenirPosition();
					break;

				case TOUCHE_ESPACE:
					if (balleEnCollisionAvecJ2) {
						balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteAllie;
						balle.attraper(J2.getCouleur());
					}
				/*else {
					console.log(balle.etatCaptivite);
					balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteNeutre;
				}
				break;*/
			}
		}
	}

	function clicRelache(evenement) {

		positionX = evenement.stageX;
		positionY = evenement.stageY;


		if (estJoueurMaitre && balleEnCollisionAvecJ1 && balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteAllie) {

			balle.lancer(positionX, positionY);
		}
		else if (!estJoueurMaitre && balleEnCollisionAvecJ2 && balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteAllie) {
			balle.lancer(positionX, positionY);
		}


		/* 	if (balleEnCollisionAvecDragon && balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteAllie) {
	
				balle.lancer(positionX, positionY);
			} */

	}

	function pointsJoueur() {
		if (balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteAllie) {
			if (balleEnCollisionAvecEnnemi) {

				points += 1;
				console.log("points" + points);
			}
		}
	}

	function vieJoueur() {
		console.log(balle.etatCaptivite);
		if (balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteEnnemi) {
			console.log(balleEnCollisionAvecDragon);
			if (balleEnCollisionAvecDragon) {
				vie -= 1;
				console.log("vie " + vie);
			}
		}
	}

	function gagnerPartieOuPerdu() {
		if (points == 3) {
			gagnerVue.afficher();
		}
		else if (vie == 0) {
			perduVue.afficher();
		}
	}



	initialiser();

})();