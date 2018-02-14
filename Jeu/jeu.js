(function(){

	//function Jeu(){
	//var dessin = document.getElementById("dessin").getContext("2d");

	var dessin ;
	var scene ;
	var contexte;

	var dragon;
	var balle;

	
	//var ennemi = new Ennemi(dessin);

	var TOUCHE_GAUCHE = 37; 
	var TOUCHE_DROITE = 39;
	var TOUCHE_HAUT = 38;
	var TOUCHE_BAS = 40;
	var NOMBRE_DE_PAS = 300;
	
	
	

	function initialiser(){

		dessin = document.getElementById("dessin");
		contexte = dessin.getContext("2d");
		
		scene = new createjs.Stage(dessin);
		dragon = new Dragon(scene);
		balle = new Balle(scene,dessin);
		
		
		//window.addEventListener(window.Evenement.dragonEnCollisionAvecBalle.type, interpreterEvenementsApplicatifs, false);
		


		intervale = setInterval(

			function()
			{
				console.log("Jeu->personnage.estCharge " + dragon.estCharge);
			//console.log("lla");
			if(dragon.estCharge ){
				clearInterval(intervale);

				//balle.dessinerBalle();
				dragon.afficher();
				balle.dessinerBalle();
				
		        document.onkeydown = gererToucheEnfoncee;
		        document.onkeyup = gererToucheLevee;
				createjs.Ticker.framerate = 90;
				createjs.Ticker.addEventListener("tick", rafraichirDeplacementHero);
				
			}


		}, 1);

	}

	/*var interpreterEvenementsApplicatifs = function(evenement)
	{
		switch(evenement.type)
		{
			case window.Evenement.dragonEnCollisionAvecBalle.type:
				console.log("coucou");
			break;
		}
	}*/

	this.checkIntersection = function (rect1,rect2)
	{
		if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
    	return true;
	}

	function rafraichirDeplacementHero(evenement){
		var vitesseParSeconde = evenement.delta / 1000 * NOMBRE_DE_PAS;
		dragon.appliquerVitesse(vitesseParSeconde);
		//balle.deplacementBalle();
		balle.deplacementBalle();
		if(dragon.representationRectangleAnimationBas().intersects(balle.rectangleDeBalle())){
			console.log("test");
		}

		scene.update(evenement);
	}

	function gererToucheEnfoncee(evenement)
	{

		switch(evenement.keyCode)
		{
			case TOUCHE_GAUCHE:
				dragon.deplacerVersLaGauche();

                //dragon.deplacerGauche();
                break;
            case TOUCHE_DROITE:
                //alert("TOUCHE_DROITE");
               	dragon.deplacerVersLaDroite();
                //dragon.deplacerDroite();
                break;
            case TOUCHE_HAUT:
                dragon.deplacerVersLeHaut();
                //dragon.deplacerHaut();
                break;
            case TOUCHE_BAS:
                dragon.deplacerVersLeBas();
                //dragon.deplacerBas();
                break;
        }

	}
	

	
        function gererToucheLevee(evenement){

        	switch(evenement.keyCode){
        		case TOUCHE_GAUCHE:
        		dragon.maintenirPosition();
        		break;

        		case TOUCHE_DROITE:
        		dragon.maintenirPosition();
        		break;

        		case TOUCHE_HAUT:
        		dragon.maintenirPosition();
        		break;

        		case TOUCHE_BAS:
        		dragon.maintenirPosition();
        		break;
        	}
        }



		initialiser();
		

	/* Jeu.Evenement = 
	{
		dragonEnCollisionAvecBalle : document.createEvent('Event')
	}

Jeu.Evenement.initialiser = function()
{
  for(key in Jeu.Evenement)
  {
    if(Jeu.Evenement[key] instanceof Event)
    {
		Jeu.Evenement[key].initEvent(key, false, true);
    }
  }
  window['Evenement'] = Jeu.Evenement;
}();//<-- Auto exécution... */

//jeu= new Jeu();


})();