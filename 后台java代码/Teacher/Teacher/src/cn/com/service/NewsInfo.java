package cn.com.service;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.opensymphony.xwork2.ModelDriven;
import cn.com.bean.News;
import cn.com.bean.Userpush;
import cn.com.tools.ParseTo;
@Repository(value = "newsInfo")
@Scope("prototype")
public class NewsInfo implements ModelDriven<Userpush>{
	@Autowired
	private SessionFactory sf;
	private String kinds;
	public String getKinds() {
		return kinds;
	}
	public void setKinds(String kinds) {
		this.kinds = kinds;
	}
	private int nid;
	public int getNid() {
		return nid;
	}
	public void setNid(int nid) {
		this.nid = nid;
	}
	@Autowired
	private Userpush up;
	@Transactional
	public String querybyid(){
		Session session = sf.getCurrentSession();
		System.out.println("用户名"+up.getUsername()+"类型:"+kinds);
		//给当前用户+1
		String name=up.getUsername();
		if(name==null||name==""||"".equals(name)){
			
		}else{
			String sx=ParseTo.toSql(kinds);
			//查询是否有这个信息，有的话就修改
			String sq="from Userpush where username=?";
			Query qq = session.createQuery(sq);
			qq.setString(0,name);
			Userpush u=(Userpush) qq.uniqueResult();
			if(u==null){
				session.save(up);
			}
			//有的话就修改
			String uda="update userpush set "+sx+"="+sx+"+1 where username=?";
			Query qs = session.createSQLQuery(uda);
			qs.setString(0, up.getUsername());
			qs.executeUpdate();
			//有的话就修改	
		}
		//点击的瞬间浏览量+1
		String sq="update news set count = count + 1 where nid=?";
		Query q= session.createSQLQuery(sq);
		q.setInteger(0, nid);
		q.executeUpdate();
		String sql = "from News where nid=?";
		Query query = session.createQuery(sql);
		query.setInteger(0, nid);
		News news=(News) query.uniqueResult();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("utf-8");
		try {
			JSONObject json=JSONObject.fromObject(news);
			response.getWriter().write(json.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	@Override
	public Userpush getModel() {
		// TODO Auto-generated method stub
		return up;
	}
}
