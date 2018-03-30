import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import com.smartfoxserver.v2.SmartFoxServer;
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.variables.RoomVariable;
import com.smartfoxserver.v2.entities.variables.SFSRoomVariable;


public class Balle {

	
	QuidditchExtension jeuExtension;
	
	
	public int dy = 4;
	public int dx = 2;
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
		int hauteur = salon.getVariable("height").getIntValue();



		if(x + dx > largeur || x + dx < 0)
		{
			
			dx =-  dx;
			//jeuExtension.trace("dx " + dx);
		}
		else if(y + dy > hauteur || y + dy < 0 )
		{
			dy =- dy;
			//jeuExtension.trace("dy " + dy);

		}
		setX(x);
		setY(y);
		
	}
	

	
	public int getX()
	{
		return x;
	}
	
	public int getY()
	{
		return y;
	}
	public void setX(int x) {
		this.x = x;
	}

	public void setY(int y) {
		this.y = y;
	}
	
	
	public int getDx() {
		return dx;
	}

	public int getDy() {
		return dy;
	}
	
}
