import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import com.smartfoxserver.v2.SmartFoxServer;
import com.smartfoxserver.v2.core.ISFSEvent;
import com.smartfoxserver.v2.core.SFSEventParam;
import com.smartfoxserver.v2.core.SFSEventType;
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.entities.variables.RoomVariable;
import com.smartfoxserver.v2.entities.variables.SFSRoomVariable;
import com.smartfoxserver.v2.exceptions.SFSException;
import com.smartfoxserver.v2.extensions.BaseServerEventHandler;
import com.smartfoxserver.v2.extensions.SFSExtension;

public class QuidditchExtension extends SFSExtension{
	
	
		 
	 public QuidditchExtension jeuExtension;
	 public Balle balle;

	 

	private volatile boolean jeuLance;

	
	int compteur;
	
	

	
    public void init()
    {
    	
       	//this.addRequestHandler("add", DeplacementBalle.class);
 
    	balle = new Balle(this);
    	this.trace("init()");
    	jeuExtension = this;
    	
    	
       	this.addEventHandler(SFSEventType.ROOM_VARIABLES_UPDATE, VariableEcouteur.class);
       	this.addEventHandler(SFSEventType.USER_JOIN_ROOM, Inviteur.class);
       	
       	//addRequestHandler("pret", EntrerSalonEcouteur.class);
       
    }
    
    
    

	Room getGameRoom() {
		// TODO Auto-generated method stub
		return this.getParentRoom();
	}
	
	boolean jeuEstLancer()
	{
		return jeuLance;
	}

	public void demarerJeu(User user, Room salon) {

		this.trace("QuidditchExtension.demarerJeu(User user, Room salon)");
		if(jeuLance)
			throw new IllegalStateException("Le jeu est lanc�e");
			
		

		jeuLance = true;

		List<RoomVariable> listeVariables = new ArrayList<RoomVariable>();
		RoomVariable variableSalon = new SFSRoomVariable("estCommencer", jeuLance);

		listeVariables.add(variableSalon);
		getApi().setRoomVariables(user, salon, listeVariables);
		
		//SmartFoxServer serveur =  SmartFoxServer.getInstance();
		
		//taskHandle = serveur.getTaskScheduler().scheduleAtFixedRate(new TaskRunner(), 0, 500, TimeUnit.MILLISECONDS);
		
		//List<User> utilisateurs = salon.getUserList();
		
		
		/*for(User utilisateur : utilisateurs)
		{
			if(utilisateur != null)
			{
				this.trace("utilisateur : " + utilisateur.getName());

			}
		}*/
		
		
		//User joueur1 = salon.getUserById(0);
		//User joueur2 = salon.getUserById(1);
		
		//ISFSObject joueurObj = new SFSObject();
		//joueurObj.putUtfString("p1n", joueur1.getName());
		//joueurObj.putUtfString("p2n", joueur2.getName());
		
		//send("start", joueurObj, getParentRoom().getUserList());
		
		
	
		
	}
	
	public void trace(String message) 
	{
		Object[] listeMessages = new Object[1];
		listeMessages[0] = "LOG_COLLISIONS:" + message;		
		this.trace(listeMessages);
	}
	
	
	

	
	

}
