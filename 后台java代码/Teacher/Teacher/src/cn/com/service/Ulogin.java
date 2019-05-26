package cn.com.service;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.opensymphony.xwork2.ModelDriven;
import cn.com.bean.User;
@Repository(value = "ulogin")
@Scope("prototype")
public class Ulogin implements ModelDriven<User> {
	@Autowired
	private SessionFactory sf;
	@Autowired
	private User u;

	// 注册功能
	@Transactional
	public String regedit() {
		Session session = sf.getCurrentSession();
		session.save(u);
		return null;
	}
//修改密码
	@Transactional
	public String repass() {
		Session session = sf.getCurrentSession();
		String sql = "update User set password=? where tell=? and username=?";
		Query query = session.createQuery(sql);
		query.setString(0, u.getPassword());
		query.setString(1, u.getTell());
		query.setString(2, u.getUsername());
		int c=query.executeUpdate();
		String info = null;
		if (c>0) {
			info = "success";
		} else {
			info = "fail";
		}
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("utf-8");
		try {
			response.getWriter().write(info);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}	
	// 登录功能
	@Transactional
	public String login() {
		Session session = sf.getCurrentSession();
		String sql = "from User where username=? and password=?";
		Query query = session.createQuery(sql);
		query.setString(0, u.getUsername());
		query.setString(1, u.getPassword());
		System.out.println("==="+u.getUsername()+":"+u.getPassword());
		User uu = (User) query.uniqueResult();
		String info = null;
		if (uu != null) {
			info = "success";
		} else {
			info = "fail";
		}
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("utf-8");
		try {
			response.getWriter().write(info);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public User getModel() {
		// TODO Auto-generated method stub
		return u;
	}
}
