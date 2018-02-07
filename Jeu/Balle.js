function Balle(contexte, dessin){

	var balle = this;
	this.estCharge = false;

	var x = 150;
	var y = 150;
	var dx = 2;
	var dy = 4;

	


	function cercle(x,y,r)
	{
		contexte.beginPath();
		contexte.arc(x, y, r, 0, Math.PI*2, true);
		contexte.closePath();
		contexte.fill();

	}

	

	function clear() {
 		contexte.clearRect(0, 0, dessin.width, dessin.height);
	}
	

	
	this.dessiner = function()
	{

		cercle(x,y, 10);
		 if (x + dx > dessin.width || x + dx < 0) // Dépassement à droite ou à gauche
		 	dx = -dx;
  		if (y + dy > dessin.height|| y + dy < 0) // Dépassement en bas ou en haut
  			dy = -dy;


  		x += dx; // On déplace la balle
  		y += dy;
  	}
  }
