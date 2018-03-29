import java.util.List;

import com.smartfoxserver.v2.SmartFoxServer;
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.variables.RoomVariable;

public class Balle {

	
	QuidditchExtension jeuExtension;
	
	
	public int dx = 4;
	public int dy = 2;
	public int x;
	public int y;
	
	public Balle(QuidditchExtension extension)
	{
		jeuExtension = extension;

	}
	
	public void deplacementBalle(int x, int y)
	{
		Room salon = jeuExtension.getParentZone().getRoomByName("RoomDragon");
		int largeur = salon.getVariable("width").getIntValue();
		jeuExtension.trace("x : " + x);
		jeuExtension.trace("y : " + y);
		jeuExtension.trace("width" + largeur);
		//jeuExtension.trace("height : " + height);
		/*if(x + dx > width || x + dx < 0)
		{
			jeuExtension.trace("x : " + x);
			
			dx = dx - dx;
		}
		if(y + dy > height || y + dy < 0 )
			jeuExtension.trace("y : " + y);
		{
			dy = dy - dy;
		}*/
	}
	
	public int getX()
	{
		return x;
	}
	
	public int getY()
	{
		return y;
	}

	public int getDx() {
		return dx;
	}

	public int getDy() {
		return dy;
	}
	
	
	
	


}
