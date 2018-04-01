

function Connection(quandJoueurEstPret, 
                    recupererVariableCommencer, 
                    recupererIdJoueur, 
                    recupererDiagonaleBalleX,
                    recupererDiagonaleBalleY,
                    recupererPositionBalleX,
                    recupererPositionBalleY) {


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
    this.serveur.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, executerApresVariableDeSalon, this);
    this.serveur.addEventListener(SFS2X.SFSEvent.USER_ENTER_ROOM, executerApresEntrerUtilisateur, this)

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

function executerApresOuvertureSession(e)
{
    tracer("executerApresOuvertureSession()");
    tracer("l'usager " + e.user.id + " est dans la zone " + e.zone);
    recupererIdJoueur(e.user.id);
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

    widthDouble = (width).toFixed(2);
    heightDouble = (height).toFixed(2);

    widthDoubleF = parseFloat(widthDouble);
    heightDoubleF = parseFloat(heightDouble);

    listeVariables.push(new SFS2X.Entities.Variables.SFSRoomVariable('action', "envoyerTailleCanvas"));

    listeVariables.push(new SFS2X.Entities.Variables.SFSRoomVariable('width', widthDoubleF));
    listeVariables.push(new SFS2X.Entities.Variables.SFSRoomVariable('height', heightDoubleF));

    estEnvoyee = serveur.send(new SFS2X.Requests.System.SetRoomVariablesRequest(listeVariables));

}



this.envoyerPositionBalle = function(positionBalleX, positionBalleY) {
    //tracer("envoyerPositionBalle");


    var listePositions = [];
    //console.log(isFloat(test));
    testX = (positionBalleX).toFixed(10);
    testY = (positionBalleY).toFixed(10);
    //console.log(test2);
    console.log(testX);
    
    balleX = parseFloat(testX);
    balleY = parseFloat(testY);

    listePositions.push(new SFS2X.Entities.Variables.SFSRoomVariable('action', "envoyerPositionBalle"));
    listePositions.push(new SFS2X.Entities.Variables.SFSRoomVariable('positionXBalle', balleX));
    listePositions.push(new SFS2X.Entities.Variables.SFSRoomVariable('positionYBalle', balleY));
    console.log("apres " +listePositions);
    
    estEnvoyeePosition = serveur.send(new SFS2X.Requests.System.SetRoomVariablesRequest(listePositions));

}
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function executerApresVariableDeSalon(e)
{
    //tracer('variables recues ' + e.changedVars);
    if(e.changedVars.indexOf('estCommencer') != -1)
    {
        //tracer('EstCoemmencer == ' + e.room.getVariable('estCommencer').value, false);
        estCommencer = e.room.getVariable('estCommencer').value;
        recupererVariableCommencer(estCommencer);
    }

    if(e.changedVars.indexOf('diagonaleX') != -1)
    {
        recupererDiagonaleBalleX(e.room.getVariable('diagonaleX').value);
        //console.log(e.room.getVariable('diagonaleX').value);
    }

    if(e.changedVars.indexOf('diagonaleY') != -1)
    {
        recupererDiagonaleBalleY(e.room.getVariable('diagonaleY').value);
        //console.log(e.room.getVariable('diagonaleY').value);
    }

    if(e.changedVars.indexOf('positionX') != -1)
    {
        recupererPositionBalleX(e.room.getVariable('positionX').value);
    }

    if(e.changedVars.indexOf('positionY') != -1)
    {
        recupererPositionBalleY(e.room.getVariable('positionY').value);
    }

    
}

function executerApresEntrerUtilisateur(e)
{
    console.log(e.user.name);       
}

/*function onUserEnterRoom(event)
	{
		tracer('onUserEnterRoom()');
		//J2 = new Dragon(scene, EtatCouleur.orange);
		
	}*/

function tracer(message, alerte)
{
    console.log(message);
    if(alerte) alert(message);
}

}