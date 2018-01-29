function Dragon(dessin){

	var dragon = this;

	var imageDragon = new Image();
	this.estCharge = false;

	function initialiser(){
		imageDragon.src = "0.png";

		imageDragon.onload = noterFinChargement;

		dessin.x = 100;
		dessin.y = 100;
	}

	function noterFinChargement()
	{
		this.estCharge = true;
	}

	this.afficher = function()
	{
		dessin.drawImage(imageDragon, 50,0);
		
	}

	this.deplacerDroite = function(){

		dessin.x += 5;

	}

	this.deplacerGauche = function(){

		dessin.x -= 5;
		
	}

	this.deplacerHaut = function(){

		dessin.y -= 5;
		
	}

	this.deplacerBas = function(){
		
		dessin.y = +5;
	}


	this.attraperBalle = function(){
		
	}

	initialiser();
}

