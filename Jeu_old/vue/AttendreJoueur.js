AttendreJoueur = function()
{
    var corps;
    var nomJoueur;
	
	function initialiser()
	{
		corps = document.getElementsByTagName("body")[0];
	}

	this.afficher = function()
	{
        corps.innerHTML = AttendreJoueur.pageJeuHTML;
        formAccueil = document.getElementById("form-attendre");
        formAccueil.addEventListener("submit", 
        function(evenement){
           evenement.preventDefault(); 
           return false;
        });

        boutonJouer = document.getElementById("test");

       


        
	}
	
	initialiser();
}
AttendreJoueur.pageJeuHTML = document.getElementById("page-AttendreJoueur").innerHTML;
