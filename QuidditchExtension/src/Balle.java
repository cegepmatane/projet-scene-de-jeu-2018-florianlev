
public class Balle {

	

	
	public int dx = 4;
	public int dy = 2;
	
	public Balle()
	{
		
	}
	
	public void deplacementBalle(float x, float y, int width, int height)
	{
		
		if(x + dx > width || x + dx < 0)
		{
			dx = -dx;
		}
		if(y + dy > height || y + dy < 0 )
		{
			dy =-dy;
		}
	}

	public int getDx() {
		return dx;
	}

	public int getDy() {
		return dy;
	}
	
	
	
	


}
