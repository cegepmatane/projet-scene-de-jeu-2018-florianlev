(function(){
	var dessin = document.getElementById("dessin").getContext("2d");
	var dragon = new Dragon(dessin);
	var ennemi = new Ennemi(dessin);

	intervale = setInterval(
		function()
		{
			console.log("Jeu->personnage.estCharge " + dragon.estCharge);

			if(!dragon.estCharge ){ 

				dragon.afficher();
				ennemi.afficher();
				clearInterval(intervale);

			}

		}, 1);	
})();