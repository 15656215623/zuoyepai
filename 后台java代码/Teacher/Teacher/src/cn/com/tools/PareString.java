package cn.com.tools;
public class PareString {
//比较出最大值的索引
public static String max(int str[]){
	String [] sql={"教育","成长","心理","课程"};
	int length=str.length;
	//设置第一个值是最大值
	int max=str[0];
	int m=0;
	for (int i = 0; i < length-1; i++) {
			if(max<str[i+1]){
				max=str[i+1];
				m=i+1;
			}	
	}
	
	return sql[m];
	
}
}
