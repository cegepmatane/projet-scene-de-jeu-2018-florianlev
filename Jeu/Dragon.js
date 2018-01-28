function Dragon(dessin){

	var dragon = this;

	var imageDragon = new Image();
	this.estCharge = false;

	function initialiser(){
		imageDragon.src = "0.png";

		imageDragon.onload = noterFinChargement;
	}

	function noterFinChargement()
	{
		this.estCharge = true;
	}

	this.afficher = function()
	{
		dessin.drawImage(imageDragon, 50,0);
		
	}

	this.avancer = function(){

	}

	this.attraperBalle = function(){
		
	}

	initialiser();
}

