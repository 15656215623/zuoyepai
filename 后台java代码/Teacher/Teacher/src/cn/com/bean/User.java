package cn.com.bean;
import org.springframework.stereotype.Repository;
@Repository(value="user")
public class User {
private int uid;
private String username;
private String password;
private String tell;
public int getUid() {
	return uid;
}
public void setUid(int uid) {
	this.uid = uid;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getTell() {
	return tell;
}
public void setTell(String tell) {
	this.tell = tell;
}

}
