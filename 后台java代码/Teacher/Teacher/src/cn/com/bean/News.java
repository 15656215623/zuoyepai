package cn.com.bean;
import org.springframework.stereotype.Repository;
@Repository(value="news")
public class News {
private int nid;
private String kinds;
private String title;
private String content;
private String img;
private int count;
private String time;
public int getNid() {
	return nid;
}
public void setNid(int nid) {
	this.nid = nid;
}
public String getKinds() {
	return kinds;
}
public void setKinds(String kinds) {
	this.kinds = kinds;
}
public String getTitle() {
	return title;
}
public void setTitle(String title) {
	this.title = title;
}
public String getContent() {
	return content;
}
public void setContent(String content) {
	this.content = content;
}
public String getImg() {
	return img;
}
public void setImg(String img) {
	this.img = img;
}
public int getCount() {
	return count;
}
public void setCount(int count) {
	this.count = count;
}
public String getTime() {
	return time;
}
public void setTime(String time) {
	this.time = time;
}

}
