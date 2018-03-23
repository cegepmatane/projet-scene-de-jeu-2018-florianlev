import java.util.Iterator;
import java.util.List;

import com.smartfoxserver.v2.SmartFoxServer;
import com.smartfoxserver.v2.api.ISFSApi;
import com.smartfoxserver.v2.core.ISFSEvent;
import com.smartfoxserver.v2.core.SFSEventParam;
import com.smartfoxserver.v2.entities.SFSRoom;
import com.smartfoxserver.v2.entities.SFSUser;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.entities.variables.RoomVariable;
import com.smartfoxserver.v2.exceptions.SFSException;

import com.smartfoxserver.v2.extensions.BaseServerEventHandler;

public class VariableEcouteur extends BaseServerEventHandler {

	private ISFSApi api;
	private SFSRoom salon = null;
	private SFSUser utilisateur = null;
	public Integer posBalleX;
	public Integer posBalleY;
	private Balle balle;
	public static int widthCanvas;
	public static int heightCanvas;
	

	@SuppressWarnings("unchecked")
		

	public void handleServerEvent(ISFSEvent evenement) throws SFSException {
		
		balle = new Balle();
		//this.trace("VariableEcouteur.handleServerEvent()");
		SmartFoxServer serveur = SmartFoxServer.getInstance();
		this.api = serveur.getAPIManager().getSFSApi();

		
		this.salon = (SFSRoom)evenement.getParameter(SFSEventParam.ROOM);
		this.utilisateur = (SFSUser) evenement.getParameter(SFSEventParam.USER);
		//this.trace("salon " + salon.getName());
		
	
		//enregistrerVariablesCanvas((List<RoomVariable>)evenement.getParameter(SFSEventParam.VARIABLES));
		enregistrerVariablePositionBalle((List<RoomVariable>)evenement.getParameter(SFSEventParam.VARIABLES));
		
		try {
			
			balle.deplacementBalle(this.posBalleX, this.posBalleY, this.widthCanvas, this.heightCanvas);

		}catch(Exception e)
		{
			this.trace("Attente position balle");
		}

	}

	
	private void enregistrerVariablePositionBalle(List<RoomVariable> listeVariables)
	{
		Iterator<RoomVariable>visiteur = listeVariables.iterator();
		
		while(visiteur.hasNext())
		{
			RoomVariable variable = visiteur.next();
			if(variable != null)
			{
				if(variable.getName().compareTo("width") == 0)
				{
					this.widthCanvas = variable.getIntValue();
				}
				if(variable.getName().compareTo("height") == 0)
				{
					this.heightCanvas = variable.getIntValue();
				} 
				
				if(variable.getName().compareTo("posBalleX") == 0)
				{
					this.posBalleX = variable.getIntValue();
					
					
				}
				if(variable.getName().compareTo("posBalleY") == 0)
				{
					this.posBalleY = variable.getIntValue();
				}
				
			
				/*this.trace("DX" + balle.getDx());
				this.trace("DY" +balle.getDy());*/
				
				
			}
		}
	}
	
	
	
	

	
	

}
