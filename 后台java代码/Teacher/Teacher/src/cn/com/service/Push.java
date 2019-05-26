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
import cn.com.bean.News;
import cn.com.bean.Userpush;
import cn.com.tools.PareString;
@Repository(value = "push")
@Scope("prototype")
public class Push {
	@Autowired
	private SessionFactory sf;
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	// 消息推送模块
	@Transactional
	public String query() {
		Session session = sf.getCurrentSession();
		String kk = "";
		System.out.println("name:"+name);
		// 如果是游客的话，那么就推送教育模块的
		if (name == null || name == "" ||"".equals(name)) {
			kk = "教育";		
		} else {
			String sql = "from Userpush where username=?";
			Query query = session.createQuery(sql);
			query.setString(0, name);
			Userpush u = (Userpush) query.uniqueResult();
			if(u!=null){
				int[] sz = { u.getJy(), u.getCz(), u.getXl(), u.getKc() };
				// 比较最大的值
				kk = PareString.max(sz);
			}else{
				kk = "教育";			
			}
			
		}
		String sq = "from News where kinds=?";
		Query qs = session.createQuery(sq);
		qs.setString(0, kk);
		List<News> list = qs.list();
		// 把list变成json
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("utf-8");
		try {
			JSONArray json = JSONArray.fromObject(list);
			response.getWriter().write(json.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
