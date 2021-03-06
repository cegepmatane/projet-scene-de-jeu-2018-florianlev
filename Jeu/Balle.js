function Balle(stage, canvas) {
	var balle = this;
	dessin = new createjs.Shape();
	createjs.MotionGuidePlugin.install();
	dessin.x = 150;
	dessin.y = 150;
	dessin.height = 10;
	dessin.width = 10;
	var dx;

	var positionBalleX;
	var positionBalleY;
	var dy;



	var dejaLance = false;

	//dy = 4;
	//dx = 2;

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
		enCaptiviteAllie: "En captivite allie",
		enCaptiviteEnnemi: "En captivite ennemi",
		enlibertee: "En Liberte",
	}

	this.etatCaptivite = this.EtatEnCaptivite.enlibertee;


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


			dessin.x = dessin.x + dx; // On déplace la balle
			dessin.y = dessin.y + dy;
			positionBalleX = dessin.x;
			positionBalleY = dessin.y;

		}
	}

	this.getPositionBalleX = function()
	{
		
		return positionBalleX;
	}
	this.getPositionBalleY = function()
	{
		
		return positionBalleY;
	}

	this.setDiagonaleBalleX = function(dX)
	{
		dx = dX;
	}
	this.setDiagonaleBalleY = function(dY)
	{

		dy = dY;
	}

	this.setPositionBalleX = function(x)
	{
		dessin.x = x;
	}	

	this.setPositionBalleY = function(y)	
	{
		dessin.y = y;
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
			//this.estAttrapable = false;
			couleurCourante = EtatCouleur.rose;
			//console.log(this.estAttrapable);
			//this.estAttrapable = false;
		}
		else if (this.etatCaptivite == this.EtatEnCaptivite.enlibertee) {
			console.log("porue");
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
				createjs.Tween.get(dessin).to({ x: positionX, y: positionY }, 500);
				this.etatCaptivite = this.EtatEnCaptivite.enCaptiviteAllie;
			}

			//console.log(etatCaptivite);

			else if (this.etatCaptivite == this.EtatEnCaptivite.enCaptiviteEnnemi) {
				setTimeout(function () {
					createjs.Tween.get(dessin).to({ x: positionX, y: positionY }, 500);
				}, 500);
			}

			setTimeout(function () {
				couleurCourante = EtatCouleur.noir;
				changerCouleurBalle();
				balle.etatCaptivite = balle.EtatEnCaptivite.enlibertee;



			}, 1000);
			//this.etatCaptivite = this.EtatEnCaptivite.enlibertee;
			etatCourant = EtatBalle.estLancer;
			setTimeout(function () {
				dejaLance = false;
			}, 500);
		}

	}




	initialiser();


}
