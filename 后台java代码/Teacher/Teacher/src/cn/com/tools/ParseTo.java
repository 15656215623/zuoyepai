package cn.com.tools;
public class ParseTo {
	public static String toSql(String q){
		int c=0;
		String [] sql={"jy","cz","xl","kc"};
		String [] kind={"教育","成长","心理","课程"};
       for (int i = 0; i < kind.length; i++) {
		 if(kind[i].endsWith(q)){
			c=i;
		 }
	    }
		return sql[c];
	}

}
