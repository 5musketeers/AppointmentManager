package sessions;

import javax.ejb.Stateless;

@Stateless
public class Session implements SessionInt {
	public Boolean checkLogin (String user, String password){
		return true;
	}
}
