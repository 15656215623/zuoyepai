package cn.com.bean;
import org.springframework.stereotype.Repository;
@Repository(value="correct")
public class Correct {
private int cid;
private int wid;
private String user;
private String teacher;
private String km;
private String pl;
private String url;

public String getUser() {
	return user;
}
public void setUser(String user) {
	this.user = user;
}
public int getCid() {
	return cid;
}
public void setCid(int cid) {
	this.cid = cid;
}
public int getWid() {
	return wid;
}
public void setWid(int wid) {
	this.wid = wid;
}
public String getTeacher() {
	return teacher;
}
public void setTeacher(String teacher) {
	this.teacher = teacher;
}
public String getKm() {
	return km;
}
public void setKm(String km) {
	this.km = km;
}
public String getPl() {
	return pl;
}
public void setPl(String pl) {
	this.pl = pl;
}
public String getUrl() {
	return url;
}
public void setUrl(String url) {
	this.url = url;
}

}
