function Ennemi(scene){

	var ennemi = this;

	var imageDragon;
	this.estCharge = false;

	var spriteEnnemi;

	var animIdle;

	var etatActuelX;
	var etatActuelY;
	this.animBas;
	var rectangleEnnemi;


	var xCourant;
	var yCourant;
	var animationCourante;


	var positionCourante = { x: 0, y: 0 };

	var etatCourant;

	function initialiser(){
		imageEnnemi = new Image();
		createjs.MotionGuidePlugin.install();
		imageEnnemi.src = "ennemiSprites.png";

		imageEnnemi.onload = terminerChargement;
	}

	function terminerChargement() {


		spriteEnnemi = new createjs.SpriteSheet(
			{
				images: [imageEnnemi],
				frames: { "regX": 0, "height": 100, "count": 90	, "regY": 0, "width": 100},
				framerate: 13,
				animations:
					{
						idle: [0, 3, "idle"],
					
					}

			});

		animIdle = new createjs.Sprite(spriteEnnemi, "idle");

		rectangleEnnemi = animIdle.getTransformedBounds();
		
		ennemi.estCharge = true;


	}

	this.afficher = function()
	{
		scene.addChild(animIdle);
		
		
	}
	this.representerRectangle = function()
	{	
		return rectangleAnimationEnnemi = animIdle.getTransformedBounds();
	}

	this.poursuivreJoueur = function(positionJoueurX, positionJoueurY, balleEstAttrapable, positionBalleX,positionBalleY)
	{
		

		if(balleEstAttrapable)
		{
			createjs.Tween.get(animIdle).to({x:positionJoueurX,y:positionJoueurY}, 2000);

		}
		else
		{
			console.log("test");
			animIdle.x = positionBalleX;
			animIdle.y = positionBalleY;
		}


	}

	this.exploser = function(){
		
	}

	initialiser();
}

