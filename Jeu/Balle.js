function Balle(stage,canvas){
	
	dessin = new createjs.Shape();
	dessin.x = 150;
	dessin.y = 150;
	
	dy = 4;
	dx = 2;

	function initialiser()
	{

		this.estChargee = false;
		dessinerBalle();
	}
	

	function dessinerBalle()
	{
		
		dessin.graphics.beginFill("#330707");
		dessin.graphics.drawCircle(0,0,20);
	
	}

	this.afficher = function()
	{	
		stage.addChild(dessin);
		
	}

	this.deplacementBalle = function ()
	{
		if (dessin.x + dx > canvas.width || dessin.x + dx < 0) // Dépassement à droite ou à gauche
			dx =- dx;
  		if (dessin.y + dy > canvas.height|| dessin.y + dy < 0) // Dépassement en bas ou en haut
			dy =- dy;
		
		dessin.x += dx; // On déplace la balle
		dessin.y += dy;
		
		

	}

	
	this.rectangleBalle = function()
	{

		dessin.setBounds(dessin.x,dessin.y,50, 50);

		return dessin.getBounds();
	}




	initialiser();

	
  }
