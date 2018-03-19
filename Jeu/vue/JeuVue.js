JeuVue = function(){
	var corps;
    var nomJoueur;
	
	function initialiser()
	{
		corps = document.getElementsByTagName("body")[0];
	}

	this.afficher = function()
	{
		corps.innerHTML = JeuVue.pageJeuHTML;
		nomJoueur = document.getElementById("nom-joueur");
		console.log(nomJoueur);
        //nomJoueur.innerHTML = joueur.nom;
	}
	
	initialiser();
	
}
JeuVue.pageJeuHTML = document.getElementById("page-jeu").innerHTML;
