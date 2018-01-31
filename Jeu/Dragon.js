function Dragon(dessin){

	var dragon = this;

	var imageDragon = new Image();
	this.estCharge = false;
	var scene = new createjs.Stage(dessin);

	function initialiser()
	{

		imageDragon.src = "0.png";

		imageDragon.onload = noterFinChargement;


	}

	function noterFinChargement()
	{
		this.estCharge = true;
	}

// fonction IDLE du personnage
	this.afficher = function()
	{
		this.deplacerBas();
	}

	function animationDeplacement(sprite){
		imageDragon.src = sprite;
		imageDragon.onload = noterFinChargement
		createjs.Ticker.addEventListener("tick", rafraichirJeu);

		createjs.Ticker.setFPS(9);

		var spriteDragon = new createjs.SpriteSheet(
		{
			images:[imageDragon],
			frames:{width:128,height:110},
			animations:
			{
				marche:[0,1,2,3]
			}

		}

		);

		var animationDragon = new createjs.Sprite(spriteDragon, "marche");

		scene.addChild(animationDragon);
		animationDragon.play();

	}

	this.deplacerDroite = function(){

		animationDeplacement("dragon-droite.png");

		dessin.x += 5;
		

	}

	this.deplacerGauche = function(){

		animationDeplacement("dragon-gauche.png");

		dessin.x -= 5;

	
		
	}

	this.deplacerHaut = function(){

		animationDeplacement("dragon-haut.png");

		dessin.y -= 5;
		
	}

	this.deplacerBas = function(){

		animationDeplacement("dragon-bas.png");

		
	}


	this.attraperBalle = function(){
		
	}

	function rafraichirJeu(evenement)
	{
		scene.update();
	}

	initialiser();
}

