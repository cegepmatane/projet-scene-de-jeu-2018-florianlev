import java.util.ArrayList;
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
import com.smartfoxserver.v2.entities.variables.SFSRoomVariable;
import com.smartfoxserver.v2.exceptions.SFSException;

import com.smartfoxserver.v2.extensions.BaseServerEventHandler;

public class VariableEcouteur extends BaseServerEventHandler {

	private ISFSApi api;
	private SFSRoom salon = null;
	private SFSUser utilisateur = null;
	public double posBalleX;
	public double posBalleY;
	public QuidditchExtension jeuExtension;

	public double widthCanvas;
	public double heightCanvas;
	
	
	

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
		double widthCanvasTemporaire = 0;
		double heightCanvasTemporaire = 0;
		int positionBalleXInt = 0;
		int positionBalleYInt = 0;
		double positionBalleXTemporaire = 0;
		double positionBalleYTemporaire = 0;
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
					widthCanvasTemporaire = variable.getDoubleValue();
				

				}
				
				if(variable.getName().compareTo("height") == 0)
				{
					heightCanvasTemporaire = variable.getDoubleValue();
			
				} 
		
				
				
				if(variable.getName().compareTo("positionXBalle") == 0)
				{
					if(variable.getValue() instanceof Double)
					{
						trace("Double");
						positionBalleXTemporaire = variable.getDoubleValue();
						
					}
					else if (variable.getValue() instanceof Integer) {
						trace("Integer");
						positionBalleXTemporaire = variable.getIntValue();

					}
					
		
				}
				if(variable.getName().compareTo("positionYBalle") == 0)
				{
					if(variable.getValue() instanceof Double)
					{
						trace("Double");
						positionBalleYTemporaire = variable.getDoubleValue();

						
					}
					else if (variable.getValue() instanceof Integer) {
						trace("Integer");
							positionBalleYTemporaire = variable.getIntValue();

					}
				}

			}
			
		}
		
		if(action.compareTo("envoyerPositionBalle") == 0)
		{
			this.posBalleX = positionBalleXTemporaire;
			this.posBalleY = positionBalleYTemporaire;
			jeuExtension.balle.deplacementBalle(this.posBalleX, this.posBalleY);
			
			List<RoomVariable> listeDiagonalesPosition = new ArrayList<RoomVariable>();
			
			RoomVariable diagonaleX = new SFSRoomVariable("diagonaleX", jeuExtension.balle.getDx());
			RoomVariable diagonaleY = new SFSRoomVariable("diagonaleY", jeuExtension.balle.getDy());
			RoomVariable positionX = new SFSRoomVariable("positionX", jeuExtension.balle.getX());
			RoomVariable positionY = new SFSRoomVariable("positionY", jeuExtension.balle.getY());
			listeDiagonalesPosition.add(diagonaleY);
			listeDiagonalesPosition.add(diagonaleX);
			listeDiagonalesPosition.add(positionX);
			listeDiagonalesPosition.add(positionY);
			//trace(jeuExtension.balle.getDx());
			//trace(jeuExtension.balle.getDy());	
			getApi().setRoomVariables(null, jeuExtension.getParentZone().getRoomByName("RoomDragon"), listeDiagonalesPosition);		
		}
		
		else if (action.compareTo("envoyerTailleCanvas") == 0)
		{
			trace("if envoyerTailleCanvas");
			this.widthCanvas = widthCanvasTemporaire;
			this.heightCanvas = heightCanvasTemporaire;
		}
		
	}

}
