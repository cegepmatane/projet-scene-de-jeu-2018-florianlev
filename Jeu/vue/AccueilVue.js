AccueilVue = function()
{
    var corps;
    var formAccueil;
    var champNom;
    var boutonJouer;

    function initialiser()
    {
        corps = document.getElementsByTagName("body")[0];
    }

/*     function enregistrerNom(evenement)
    {
        joueur.nom = champNom.value;
    }
 */
    this.afficher = function()
    {
        corps.innerHTML = AccueilVue.pageAccueilHTML;
        formAccueil = document.getElementById("form-accueil");
        formAccueil.addEventListener("submit", 
									 function(evenement){
										evenement.preventDefault(); 
										return false;
									 });
        boutonJouer = document.getElementById("bouton-jouer");
        champNom = document.getElementById("nom");
		//boutonJouer.addEventListener("click", enregistrerNom);
    }

    initialiser();
}

AccueilVue.pageAccueilHTML = document.getElementById("page-accueil").innerHTML;

