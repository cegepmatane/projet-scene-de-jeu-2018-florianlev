

function Connection(quandJoueurEstPret) {


this.serveur;
var configuration = {};
configuration.host = "127.0.0.1";
configuration.port = 8080;
configuration.zone = "JeuBalle";
configuration.debug = false;
configuration.room = 'RoomDragon';
//this.quandJoueurEstPret = quandJoueurEstPret;



function initialiser()
{
    
    tracer('onload -> initialiser()', false);
    this.serveur = new SFS2X.SmartFox(configuration);
    
    this.serveur.addEventListener(SFS2X.SFSEvent.CONNECTION, executerApresOuvertureContactServeur, this);
    this.serveur.addEventListener(SFS2X.SFSEvent.LOGIN, executerApresOuvertureSession, this);
    this.serveur.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, executerApresEntreeSalon, this);

    
    //serveur.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, execxuterApresVariableDeSalon, this);

}

initialiser();

function executerApresOuvertureContactServeur(e) {
    tracer("executerApresOuvrirContactServeur()");
    tracer("succes de la connection " + e.success);

    if (e.success) {
        tracer("Connecté au serveur !");

        var pseudo = $("#pseudo").val();

        this.serveur.send(new SFS2X.Requests.System.LoginRequest(""));
    }

    else {
        var error = "connection raté ";

    }
}


this.ouvrirContactServeur = function()
{
    tracer("ouvrirConnection");
    serveur.connect();
    
}

function ouvrirSession()
{
    tracer("ouvrirSession()");
    this.serveur.send(new SFS2X.Requests.System.LoginRequest("Nadine"));
}

function executerApresOuvertureSession(e)
{
    tracer("executerApresOuvertureSession()");
    tracer("l'usager " + e.user.name + " est dans la zone " + e.zone);
    entrerSalon();
}

function entrerSalon()
{
    tracer('entrerSalon()');
    estEnvoye = this.serveur.send(new SFS2X.Requests.System.JoinRoomRequest(configuration.room));
    
    tracer('demande d\'entrer dans le salon effectuee');
}

function executerApresEntreeSalon(e)
{
    tracer('executerApresEntreeSalon()');
    tracer('Entree dans le salon ' + e.room + ' reussie');
    quandJoueurEstPret();
}

this.envoyerTailleCanvasAuServeur = function(width,height) {

    tracer("envoyerTailleCanvasAuServeur()");
    var listeVariables = [];

    listeVariables.push(new SFS2X.Entities.Variables.SFSRoomVariable('width', width));
    listeVariables.push(new SFS2X.Entities.Variables.SFSRoomVariable('height', height));

    estEnvoyee = serveur.send(new SFS2X.Requests.System.SetRoomVariablesRequest(listeVariables));
    //tracer('la nouvelle valeur est envoyee ' + estEnvoyee);

}



this.envoyerPositionBalle = function(positionBalleX, positionBalleY) {
    tracer("envoyerPositionBalle");
    var listePositions = [];

    listePositions.push(new SFS2X.Entities.Variables.SFSRoomVariable('posBalleX', positionBalleX ));
    listePositions.push(new SFS2X.Entities.Variables.SFSRoomVariable('posBalleY', positionBalleY));

    estEnvoyeePosition = serveur.send(new SFS2X.Requests.System.SetRoomVariablesRequest(listePositions));
    console.log("test");

}

function executerApresVariableDeSalon(e)
{
    tracer('executerApresVariableDeSalon()');
    tracer('variables recues ' + e.changedVars);
    /*if(e.changedVars.indexOf('salutation') != -1)
    {
        tracer('salutation == ' + e.room.getVariable('positionXBalle').value, true);
    }
    */
}

function onUserEnterRoom(event)
	{
		tracer('onUserEnterRoom()');
		//J2 = new Dragon(scene, EtatCouleur.orange);
		
	}

function tracer(message, alerte)
{
    console.log(message);
    if(alerte) alert(message);
}

}