GagnerVue = function(){
	var corps;
    var nomJoueur;
	
	function initialiser()
	{
		corps = document.getElementsByTagName("body")[0];
	}

	this.afficher = function()
	{
		corps.innerHTML = GagnerVue.pageJeuHTML;
        nomJoueur = document.getElementById("nom-joueur");
        //nomJoueur.innerHTML = joueur.nom;
	}
	
	initialiser();
	
}
GagnerVue.pageJeuHTML = document.getElementById("page-gagner").innerHTML;
