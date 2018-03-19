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


	var dragon;
	var balle;
	var balleEnCollisionAvecDragon = false;
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
	var serveur;
	var configuration = {};
	configuration.host = "127.0.0.1";
	configuration.port = 8080;
	configuration.zone = "JeuBalle";
	configuration.debug = false;
	configuration.room = 'RoomDragon';


	function initialiser() {
		//serveur = new Connection();

		//Initialisation des vues
		jeuVue = new JeuVue();
		accueilVue = new AccueilVue();
		gagnerVue = new GagnerVue();
		perduVue = new PerduVue();
		accueilVue.afficher();

		window.addEventListener("hashchange", interpreterEvenementLocation);

		//Ajout des evenement ecouteurs
		serveur = new SFS2X.SmartFox(configuration);
		serveur.addEventListener(SFS2X.SFSEvent.CONNECTION, executerApresOuvertureContactServeur, this);
		serveur.addEventListener(SFS2X.SFSEvent.LOGIN, executerApresOuvertureSession, this);
		serveur.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, executerApresEntreeSalon, this);


	}

	//Serveur event handler

	function executerApresOuvertureContactServeur(e) {
		tracer("executerApresOuvrirContactServeur()");
		tracer("succes de la connection " + e.success);

		if (e.success) {
			tracer("Connecté au serveur !");

			var pseudo = $("#pseudo").val();

			console.log(pseudo);
			serveur.send(new SFS2X.Requests.System.LoginRequest(""));
		}

		else {
			var error = "connection raté ";

		}
	}

	function executerApresOuvertureSession(e) {
		tracer("executerApresOuvertureSession()");
		tracer("l'usager " + e.user.name + " est dans la zone " + e.zone);

		entrerSalon();

	}

	function executerApresEntreeSalon(e) {
		tracer('executerApresEntreeSalon()');
		tracer('Entree dans le salon ' + e.room + ' reussie');
		dragon = new Dragon(scene, EtatCouleur.orange);



	}

	//connexion a la room
	this.ouvrirConnexion = function () {
		tracer("ouvrirConnexion");
		serveur.connect();

	}

	function entrerSalon() {
		tracer("entrerSalon()");
		serveur.send(new SFS2X.Requests.System.JoinRoomRequest(configuration.room));
	}

	//Methode privée

	function tracer(message, alerte) {
		console.log(message);
		if (alerte) alert(message);
	}


	function commencerAJouer() {
		//serveur.ouvrirSession(accueilVue.getPseudo());

		dessin = document.getElementById("dessin");
		scene = new createjs.Stage(dessin);
		arrierePlan = new ArrierePlan(scene);
		//dragon = new Dragon(scene, EtatCouleur.orange);
		ennemi = new Ennemi(scene);
		balle = new Balle(scene, dessin);
		intervale = setInterval(

			function () {

				//console.log("Jeu->personnage.estCharge " + dragon.estCharge);
				try {
					if (dragon.estCharge && ennemi.estCharge) {
						clearInterval(intervale);

						arrierePlan.afficher();
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


				}
				catch(err){
					console.log("Joueur pas encore charger !");

				}
			}, 1);


	}

	function interpreterEvenementLocation(evenement) {

		var intructionNavigation = window.location.hash;
		if (!intructionNavigation || intructionNavigation.match(/^#$/) || intructionNavigation.match(/^#accueil$/)) {
			accueilVue.afficher();
		}
		else if (intructionNavigation.match(/^#jeu$/)) {
			jeuVue.afficher();
			commencerAJouer();
		}
	}


	function enCollision() {

		rectangleDeBalle = balle.rectangleBalle();
		rectangleEnnemi = ennemi.rectangleEnnemi;
		//verif collision entre balle et joueur

		if (dragon.rectangleDuDragon().intersects(balle.rectangleBalle())) {
			balleEnCollisionAvecDragon = true;

		}

		else if (ennemi.representerRectangle().intersects(balle.rectangleBalle())) {
			//setTimeout( function(){

			balleEnCollisionAvecEnnemi = true;
			//},300);
		}
		else {
			balleEnCollisionAvecDragon = false;
			balleEnCollisionAvecEnnemi = false;
		}
	}


	function rafraichirDeplacementHero(evenement) {
		var vitesseParSeconde = evenement.delta / 1000 * NOMBRE_DE_PAS;
		arrierePlan.rafraichirAnimation(evenement);
		dragon.appliquerVitesse(vitesseParSeconde);
		balle.deplacementBalle();
		rectangleDuDragon = dragon.rectangleDuDragon();


		enCollision();
		pointsJoueur();

		gagnerPartieOuPerdu();




		if (balle.etatCaptivite == balle.EtatEnCaptivite.enlibertee && balleEnCollisionAvecEnnemi) {

			balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteEnnemi;

			balle.attraper();
			//balle.estAttrapable = false;

		}
		ennemi.poursuivreJoueur(rectangleDuDragon.x, rectangleDuDragon.y, balle.etatCaptivite, balle.EtatEnCaptivite.enlibertee, balle.EtatEnCaptivite.enCaptiviteEnnemi, balle.rectangleBalle().x, balle.rectangleBalle().y);

		if (balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteEnnemi) {
			console.log("test");
			vieJoueur();

			balle.lancer(rectangleDuDragon.x, rectangleDuDragon.y);

			balle.etatCaptivite = balle.EtatEnCaptivite.enlibertee;
			//balle.estAttrapable = true;
		}
		if (balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteAllie) {
			ennemi.fuir();
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
				if (balleEnCollisionAvecDragon) {
					balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteAllie;
					balle.attraper(dragon.getCouleur());
				}
				/*else {
					console.log(balle.etatCaptivite);
					balle.etatCaptivite = balle.EtatEnCaptivite.enCaptiviteNeutre;
				}*/
				break;
		}
	}

	function clicRelache(evenement) {

		positionX = evenement.stageX;
		positionY = evenement.stageY;


		if (balleEnCollisionAvecDragon && balle.etatCaptivite == balle.EtatEnCaptivite.enCaptiviteAllie) {

			balle.lancer(positionX, positionY);
		}

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