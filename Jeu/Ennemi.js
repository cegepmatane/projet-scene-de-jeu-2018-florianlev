function Ennemi(dessin){

	var ennemi = this;

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
		dessin.drawImage(imageDragon, 0,200);
		
	}

	this.exploser = function(){
		
	}

	initialiser();
}

