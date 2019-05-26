package cn.com.bean;
import org.springframework.stereotype.Repository;
@Repository(value="userpush")
public class Userpush {
private int id;
private String username;
private int jy;
private int cz;
private int xl;
private int kc;
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public int getJy() {
	return jy;
}
public void setJy(int jy) {
	this.jy = jy;
}
public int getCz() {
	return cz;
}
public void setCz(int cz) {
	this.cz = cz;
}
public int getXl() {
	return xl;
}
public void setXl(int xl) {
	this.xl = xl;
}
public int getKc() {
	return kc;
}
public void setKc(int kc) {
	this.kc = kc;
}

}
