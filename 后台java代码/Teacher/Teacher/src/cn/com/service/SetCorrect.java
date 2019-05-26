package cn.com.service;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import cn.com.bean.Correct;

import com.opensymphony.xwork2.ModelDriven;
@Repository(value = "setCorrect")
@Scope("prototype")
public class SetCorrect implements ModelDriven<Correct> {
	// 老师批改作业
	@Autowired
	private SessionFactory sf;
	@Autowired
	private Correct c;
	//用户查询批改的作业
	@Transactional
	public String look(){
		Session session = sf.getCurrentSession();
		String sql = "from Correct where user=?";
		Query q=session.createQuery(sql);
		q.setString(0, c.getUser());
		 List<Correct> list=q.list();	
		 System.out.println("集合的长度"+list.size());
		 HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("utf-8");
			try {
				 JSONArray json=JSONArray.fromObject(list);
				response.getWriter().write(json.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}
		
		return null;
	}
	//把批改的作业进行保存
	@Transactional
	public String save() {
		Session session = sf.getCurrentSession();
		session.save(c);
		//在work表里flag=1
		String sql = "update Work set flag=1 where wid=?";
		Query q=session.createQuery(sql);
		q.setInteger(0, c.getWid());
		q.executeUpdate();
		return null;
	}
//显示所有未批改的作业
	@Transactional
	public String show() {
		Session session = sf.getCurrentSession();
		String sql = "from Work where flag=0";
		Query q=session.createQuery(sql);
		List<Correct> list=q.list();
		//把list变成json
		   HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("utf-8");
			try {
				 JSONArray json=JSONArray.fromObject(list);
				response.getWriter().write(json.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}
		return null;
	}
	

	@Override
	public Correct getModel() {
		// TODO Auto-generated method stub
		return c;
	}
}
