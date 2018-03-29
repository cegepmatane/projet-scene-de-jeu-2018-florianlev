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
	public int posBalleX;
	public int posBalleY;
	public QuidditchExtension jeuExtension;
	
	

	
	
	public int widthCanvas;
	public int heightCanvas;
	
	
	

	@SuppressWarnings("unchecked")
		

	public void handleServerEvent(ISFSEvent evenement) throws SFSException {
		
		jeuExtension = (QuidditchExtension) getParentExtension();

		
		//balle = new Balle();
		//this.trace("VariableEcouteur.handleServerEvent()");
		SmartFoxServer serveur = SmartFoxServer.getInstance();
		this.api = serveur.getAPIManager().getSFSApi();

		
		this.salon = (SFSRoom)evenement.getParameter(SFSEventParam.ROOM);
		this.utilisateur = (SFSUser) evenement.getParameter(SFSEventParam.USER);
		//this.trace("salon " + salon.getName());
		
	
		//enregistrerVariablesCanvas((List<RoomVariable>)evenement.getParameter(SFSEventParam.VARIABLES));
		enregistrerVariablePositionBalle((List<RoomVariable>)evenement.getParameter(SFSEventParam.VARIABLES));
		
	

	}

	
	private void enregistrerVariablePositionBalle(List<RoomVariable> listeVariables)
	{
		Iterator<RoomVariable>visiteur = listeVariables.iterator();
		String action = "";
		int widthCanvasTemporaire = 0;
		int heightCanvasTemporaire = 0;
		int positionBalleXTemporaire = 0;
		int positionBalleYTemporaire = 0;
		while(visiteur.hasNext())
		{
			RoomVariable variable = visiteur.next();
			if(variable != null)
			{
				
				if(variable.getName().compareTo("action") == 0 )
				{
					action = variable.getStringValue();
					trace("action : " + action);
				}
				
				if(variable.getName().compareTo("width") == 0 )
				{
					widthCanvasTemporaire = variable.getIntValue();
				
						
				}
				
				if(variable.getName().compareTo("height") == 0)
				{
					heightCanvasTemporaire = variable.getIntValue();
				} 
		
				
				
				if(variable.getName().compareTo("positionXBalle") == 0)
				{
					positionBalleXTemporaire = variable.getIntValue();
					
					
				}
				if(variable.getName().compareTo("positionYBalle") == 0)
				{
					positionBalleYTemporaire = variable.getIntValue();

				}
				//trace("width :" + this.widthCanvas);
				//trace("height :" + this.heightCanvas);
				
				//trace("jeuExtension = " + jeuExtension.toString());
				//trace("balle = " + jeuExtension.balle.toString());
				
			
				/*this.trace("DX" + balle.getDx());
				this.trace("DY" +balle.getDy());*/
				
				
			}
			
		}
		
		if(action.compareTo("envoyerPositionBalle") == 0)
		{
			trace("if envoyerPositionBalle");
			this.posBalleX = positionBalleXTemporaire;
			this.posBalleY = positionBalleYTemporaire;
			jeuExtension.balle.deplacementBalle(this.posBalleX, this.posBalleY);
		}
		else if (action.compareTo("envoyerTailleCanvas") == 0)
		{
			trace("if envoyerTailleCanvas");
			this.widthCanvas = widthCanvasTemporaire;
			this.heightCanvas = heightCanvasTemporaire;
		}
		
	}
	
	
	
	

	
	

}
