import java.util.ArrayList;
import java.util.List;

import com.smartfoxserver.v2.core.ISFSEvent;
import com.smartfoxserver.v2.core.SFSEventParam;
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.variables.RoomVariable;
import com.smartfoxserver.v2.entities.variables.SFSRoomVariable;
import com.smartfoxserver.v2.exceptions.SFSException;
import com.smartfoxserver.v2.extensions.BaseServerEventHandler;

public class Inviteur extends BaseServerEventHandler
{

	@Override
	public void handleServerEvent(ISFSEvent e) throws SFSException {
		// TODO Auto-generated method stub
		
		
		QuidditchExtension jeuExtension = (QuidditchExtension) getParentExtension();

		
		User utilisateur = (User)e.getParameter(SFSEventParam.USER);
		Room salon = (Room)e.getParameter(SFSEventParam.ROOM);

		int nombreJoueur = salon.getVariable("nombreJoueur").getIntValue() + 1;
		RoomVariable variableSalon = new SFSRoomVariable("nombreJoueur", nombreJoueur);
		List<RoomVariable> listeVariables = new ArrayList<RoomVariable>();
		listeVariables.add(variableSalon);
		getApi().setRoomVariables(utilisateur, salon, listeVariables);
		
		if(nombreJoueur == 2)
		{
			this.trace("Demarrage du jeu");

			jeuExtension.demarerJeu(salon);
		}
		else
		{
			this.trace("En attende des joueurs");
		}


	} 

}
