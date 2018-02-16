function Balle(stage, canvas) {

	dessin = new createjs.Shape();
	dessin.x = 150;
	dessin.y = 150;
	dessin.height = 10;
	dessin.width = 10;
	this.PasEnCollision = true;

	dy = 4;
	dx = 2;

	var couleurCourante;
	var EtatCouleur = {
		bleu: "est Bleu",
		rouge: "est Rouge",
		orange: "est Orange",
		jaune: "est Jaune",
	}

	var EtatBalle = {
		estAttraper: "est Attraper",
		estLancer: "est Lancer",
	}

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
		dessin.graphics.drawCircle(0, 0, 20);

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

		}

	}

	this.afficher = function () {
		stage.addChild(dessin);

	}

	this.deplacementBalle = function () {

		console.log(etatCourant);
		if (etatCourant == EtatBalle.estLancer) {
			
			if (dessin.x + dx > canvas.width || dessin.x + dx < 0) // Dépassement à droite ou à gauche
				dx = - dx;
			if (dessin.y + dy > canvas.height || dessin.y + dy < 0) // Dépassement en bas ou en haut
				dy = - dy;

			dessin.x += dx; // On déplace la balle
			dessin.y += dy;
			console.log(dx);
		}


		/* else if(etatCourant == EtatBalle.estAttraper)
		{
						
			dx = 0;
			dy = 0;
			

		} */




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
		changerCouleurBalle();
	}

	this.lancer = function()
	{	
		dx = dxTenu + 3;
		dy = dyTenu + 3;
		etatCourant = EtatBalle.estLancer;
	

		
	}




	initialiser();


}
