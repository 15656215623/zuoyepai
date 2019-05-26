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
import com.opensymphony.xwork2.ModelDriven;
@Repository(value = "queryNews")
@Scope("prototype")
public class QueryNews implements ModelDriven<News>{
	@Autowired
	private SessionFactory sf;
	@Autowired
	private News news;
	@Transactional
	public String querynews() {
		//查询新闻的某个类型
		System.out.println("["+news.getKinds()+"]");
		Session session = sf.getCurrentSession();
		String sql = "from News where kinds=?";
		Query query = session.createQuery(sql);
		query.setString(0, news.getKinds());
		List<News> list=query.list();
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
	public News getModel() {
		// TODO Auto-generated method stub
		return news;
	}
}
