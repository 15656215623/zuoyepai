package cn.com.service;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.bean.Work;
@Repository(value = "sendWork")
@Scope("prototype")
public class SendWork implements ModelDriven<Work>{
	@Autowired
	private SessionFactory sf;
	@Autowired
	private Work w;
	@Transactional
	public String save(){
		Session session = sf.getCurrentSession();
		session.save(w);
		return null;
	}
	@Override
	public Work getModel() {
		// TODO Auto-generated method stub
		return w;
	}
}
