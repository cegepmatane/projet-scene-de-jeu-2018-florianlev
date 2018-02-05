function Dragon(dessin){

	var dragon = this;

	var imageDragon = new Image();
	this.estCharge = false;
	var scene = new createjs.Stage(dessin);
	var bmpAnim;
	var spriteDragon;
	//player = animationDeplacement(10,10)
	

	function initialiser()
	{

		imageDragon.src = "dragons.png";

		imageDragon.onload = noterFinChargement;


	}

	function noterFinChargement()
	{
		this.estCharge = true;
	}

// fonction IDLE du personnage
	this.afficher = function()
	{
		animationDeplacement();
	}

	function animationDeplacement(){
		
		createjs.Ticker.addEventListener("tick", rafraichirJeu);

		createjs.Ticker.setFPS(12);
		spriteDragon = new createjs.SpriteSheet(
		{	
			images:[imageDragon],
			frames:{"regX" : 0, "height" : 128, "count": 64, "regY": 0, "width": 128},
			animations:
			{
				marcheBas:[0,3, "marcheBas"],
				marcheGauche:[4,7, "marcheGauche"],
				marcheDroite:[8,11, "marcheDroite"],
				marcheHaut:[12,15, "marcheHaut"]
			}

		});
		
		this.animHaut = new createjs.Sprite(spriteDragon, "marcheHaut");
		this.animDroite = new createjs.Sprite(spriteDragon, "marcheDroite");
		this.animGauche = new createjs.Sprite(spriteDragon, "marcheGauche");
		this.animBas = new createjs.Sprite(spriteDragon, "marcheBas");

		//createjs.Ticker.on("tick", tick);
	}

	function tick(event){
		spriteDragon.x = spriteDragon.x + (event.delta) / 1000*100;
		spriteDragon.x = 0;
	}

	this.deplacerDroite = function(){

		scene.addChild(animDroite);
		createjs.Ticker.on("tick", tick);
		//animDroite.play();
		scene.x += 10;

		stage.update(event); 
		

	}

	this.deplacerGauche = function(){

		scene.addChild(animGauche);
		//animGauche.play();
		scene.x -= 15;
	}

	this.deplacerHaut = function(){

		
		scene.addChild(animHaut);
		//animHaut.play();
		scene.y -= 5;
		
	}

	this.deplacerBas = function(){

		scene.addChild(animBas);
		//animBas.play();
		scene.y += 5;
	}


	this.attraperBalle = function(){
		
	}

	function rafraichirJeu(evenement)
	{
		scene.update();
	}

	initialiser();
}

