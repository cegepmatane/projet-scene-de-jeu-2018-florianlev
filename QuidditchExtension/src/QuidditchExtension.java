import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import com.smartfoxserver.v2.core.SFSEventType;
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.extensions.SFSExtension;

public class QuidditchExtension extends SFSExtension{
	
	private volatile boolean jeuLance;
	//private VariableEcouteur variableEcouteur;
	int delai = 1000;
	int periode = 1000;
	
	Timer timer = new Timer();
	Balle balle = new Balle();
	
	int compteur;
	
	

    public void init()
    {
    	
       	//this.addRequestHandler("add", DeplacementBalle.class);
       	
    	this.trace("init()");
    
    	
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

	public void demarerJeu(Room salon) {

		if(jeuLance)
			throw new IllegalStateException("Le jeu est lancée");
			
		
		
		jeuLance = true;
		
		
		List<User> utilisateurs = salon.getUserList();
		
		
		for(User utilisateur : utilisateurs)
		{
			if(utilisateur != null)
			{
				this.trace("utilisateur : " + utilisateur.getName());

			}
		}
		
		
		User joueur1 = salon.getUserById(0);
		User joueur2 = salon.getUserById(1);
		
		ISFSObject joueurObj = new SFSObject();
		joueurObj.putUtfString("p1n", joueur1.getName());
		joueurObj.putUtfString("p2n", joueur2.getName());
		
		send("start", joueurObj, getParentRoom().getUserList());
		
		
		
		
		/*timer.scheduleAtFixedRate(new TimerTask()
	    {
	    	public void run() {
	    		
	    		ISFSObject resObj = new SFSObject();
	    		resObj.putFloat("diagonaleX", balle.getDx());
	    		resObj.putFloat("diagonaleX", balle.getDy());
	    		send("diagonalesBalle", resObj, getParentRoom().getUserList());


	    	}
	    }, delai, periode);
		*/
	}
	
	public void trace(String message) 
	{
		Object[] listeMessages = new Object[1];
		listeMessages[0] = "LOG_COLLISIONS:" + message;		
		this.trace(listeMessages);
	}
	

	
	

}
