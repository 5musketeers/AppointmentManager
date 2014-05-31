package sessions;

import javax.ejb.Local;

@Local
public interface SessionInt {	
	public Boolean checkLogin (String user, String password);
}
