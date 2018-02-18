function Balle(stage, canvas) {

	dessin = new createjs.Shape();
	createjs.MotionGuidePlugin.install();
	dessin.x = 150;
	dessin.y = 150;
	dessin.height = 10;
	dessin.width = 10;
	


	var dejaLance = false;

	dy = 4;
	dx = 2;

	var couleurCourante;
	this.estAttrapable = true;

	var EtatCouleur = {
		bleu: "est Bleu",
		rouge: "est Rouge",
		orange: "est Orange",
		jaune: "est Jaune",
		rose: "est Rose",
		noir: "est Noir",
	}

	var EtatBalle = {
		estAttraper: "est Attraper",
		estLancer: "est Lancer",
	}

	this.EtatEnCaptivite = {
		enCaptiviteAllie :"En captivite allie",
		enCaptiviteEnnemi : "En captivite ennemi",
		enlibertee : "En Liberte",
	}

	this.etatCaptivite;


	var etatCourant;


	var dyTenu;
	var dxTenu;

	function initialiser() {

		this.estChargee = false;
		etatCourant = EtatBalle.estLancer;
		dessinerBalle();
	}


	function dessinerBalle() {

		dessin.graphics.beginFill("#000000");
		dessin.graphics.drawCircle(0, 0, 30);

	}

	function changerCouleurBalle() {
		switch (couleurCourante) {

			case EtatCouleur.bleu:
				dessin.graphics.beginFill("#4826e0");
				dessin.graphics.drawCircle(0, 0, 20);
				couleurCourante = EtatCouleur.bleu;
				break;
			case EtatCouleur.rouge:
				dessin.graphics.beginFill("#ba1818");
				dessin.graphics.drawCircle(0, 0, 20);
				couleurCourante = EtatCouleur.rouge;
				break;
			case EtatCouleur.orange:

				dessin.graphics.beginFill("#ff7200");
				dessin.graphics.drawCircle(0, 0, 20);
				couleurCourante = EtatCouleur.orange;
				break;
			case EtatCouleur.jaune:
				//console.log("test");
				dessin.graphics.beginFill("#fffa00");
				dessin.graphics.drawCircle(0, 0, 20);
				couleurCourante = EtatCouleur.jaune;
				break;
			case EtatCouleur.rose:
				console.log("test");
				dessin.graphics.beginFill("#f91deb");
				dessin.graphics.drawCircle(0, 0, 20);
				couleurCourante = EtatCouleur.rose;
				break;

			case EtatCouleur.noir:
				console.log("test");
				dessin.graphics.beginFill("#000000");
				dessin.graphics.drawCircle(0, 0, 20);
				couleurCourante = EtatCouleur.noir;
				break;

		}

	}

	this.afficher = function () {
		stage.addChild(dessin);

	}

	this.deplacementBalle = function () {

		//console.log(etatCourant);
		if (etatCourant == EtatBalle.estLancer) {

			if (dessin.x + dx > canvas.width || dessin.x + dx < 0) // Dépassement à droite ou à gauche
				dx = - dx;
			if (dessin.y + dy > canvas.height || dessin.y + dy < 0) // Dépassement en bas ou en haut
				dy = - dy;

			dessin.x = dessin.x + dx; // On déplace la balle
			dessin.y = dessin.y + dy;

		}


	}


	this.rectangleBalle = function () {

		dessin.setBounds(dessin.x, dessin.y, dessin.height, dessin.width);

		return dessin.getBounds();
	}

	this.attraper = function (couleurJoueur) {
		etatCourant = EtatBalle.estAttraper;
		
		dyTenu = dy;
		dxTenu = dx;

		dx = 0;
		dy = 0;
		couleurCourante = couleurJoueur;
		if (this.etatCaptivite == this.EtatEnCaptivite.enCaptiviteEnnemi) {
			couleurCourante = EtatCouleur.rose;

			this.estAttrapable = false;
		}
		else if (this.etatCaptivite == this.EtatEnCaptivite.enlibertee) {
			couleurCourante = EtatCouleur.noir;
			this.estAttrapable = true;
		}

		changerCouleurBalle();
	}

	this.lancer = function (positionX, positionY) {
		if (!dejaLance) {
			dxTenu = dxTenu + 3;
			dyTenu = dyTenu + 3;
			dx = dxTenu;
			dy = dyTenu;
			dejaLance = true;
			if (this.etatCaptivite == this.EtatEnCaptivite.enCaptiviteAllie) {
				createjs.Tween.get(dessin).to({ x: positionX, y: positionY }, 300);
			}

			//console.log(etatCaptivite);
			
			else if (this.etatCaptivite == this.EtatEnCaptivite.enCaptiviteEnnemi) {
				setTimeout(function (){
					createjs.Tween.get(dessin).to({ x: positionX, y: positionY }, 300);
				}, 3000);

			}
			this.etatCaptivite = this.EtatEnCaptivite.enlibertee;
			etatCourant = EtatBalle.estLancer;
			setTimeout(function () {
				dejaLance = false;
			}, 500);
		}

	}




	initialiser();


}
