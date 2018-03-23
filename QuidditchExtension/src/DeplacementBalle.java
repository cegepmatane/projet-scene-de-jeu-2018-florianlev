import java.util.Iterator;
import java.util.List;

import com.smartfoxserver.v2.core.ISFSEvent;
import com.smartfoxserver.v2.core.SFSEventParam;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.variables.RoomVariable;
import com.smartfoxserver.v2.exceptions.SFSException;
import com.smartfoxserver.v2.extensions.BaseServerEventHandler;

public class DeplacementBalle extends BaseServerEventHandler {



	@Override
	public void handleServerEvent(ISFSEvent evenement) throws SFSException {
		List<RoomVariable> listeVariables = (List<RoomVariable>)
		evenement.getParameter(SFSEventParam.VARIABLES);
		
		trace(listeVariables.size() + " variable(s) modifiee(s)");

		RoomVariable variable = null;
		for(Iterator<RoomVariable> visiteur = listeVariables.iterator();visiteur.hasNext();variable = visiteur.next())
		{
			if(null != variable) trace("La variable " + variable.getName() + " a la valeur " + variable.getValue());
		}

		
	}
	

	
	

}
