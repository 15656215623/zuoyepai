package cn.com.bean;
import org.springframework.stereotype.Repository;
@Repository(value="work")
public class Work {
private int wid;
private String username;
private String wurl;
private String kinds;
private int flag;
public int getFlag() {
	return flag;
}
public void setFlag(int flag) {
	this.flag = flag;
}
public int getWid() {
	return wid;
}
public void setWid(int wid) {
	this.wid = wid;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public String getWurl() {
	return wurl;
}
public void setWurl(String wurl) {
	this.wurl = wurl;
}
public String getKinds() {
	return kinds;
}
public void setKinds(String kinds) {
	this.kinds = kinds;
}

}
