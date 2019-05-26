package cn.com.service;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.opensymphony.xwork2.ModelDriven;
import cn.com.bean.News;
@Repository(value = "pushNews")
@Scope("prototype")
public class PushNews implements ModelDriven<News> {
	@Autowired
	private SessionFactory sf;
	@Autowired
	private News news;
	@Transactional
	public String copyfile() {
		Session session = sf.getCurrentSession();
		//获取当前时间
		Date d=new Date();
		SimpleDateFormat sim=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		String data=sim.format(d);
		news.setTime(data);
		session.save(news);
		return null;
	}

	@Override
	public News getModel() {
		// TODO Auto-generated method stub
		return news;
	}
}
