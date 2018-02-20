PerduVue = function(){
	var corps;
    var nomJoueur;
	
	function initialiser()
	{
		corps = document.getElementsByTagName("body")[0];
	}

	this.afficher = function()
	{
		corps.innerHTML = PerduVue.pageJeuHTML;
        nomJoueur = document.getElementById("nom-joueur");
        //nomJoueur.innerHTML = joueur.nom;
	}
	
	initialiser();
	
}
PerduVue.pageJeuHTML = document.getElementById("page-perdu").innerHTML;
