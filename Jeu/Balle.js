function Balle(stage,canvas){
	
	dessin = new createjs.Shape();
	dessin.x = 150;
	dessin.y = 150;
	this.estCharge = false;	
	dy = 4;
	dx = 2;
	

	this.dessinerBalle = function()
	{
		dessin.graphics.beginFill("#330707");
		dessin.graphics.drawCircle(0,0,20);

		
		stage.addChild(dessin);

		//rectangleBalle = this.dessin.setBounds(this.dessin.x, this.dessin.y, this.dessin.dx,this.dessin.dy)
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

	this.rectangleDeBalle = function ()
	{
		return dessin.setBounds(dessin.x,dessin.y);
	}


  }
