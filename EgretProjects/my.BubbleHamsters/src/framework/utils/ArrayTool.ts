/**
 * 数组工具类
 * @author chenkai
 * @date 2016/12/18
 */
class ArrayTool extends SingleClass{
    
    /**
     * 获取object的长度
     * @obj 目标对象
     * @return object长度
     */ 
	public getObjectLen(obj){
    	 var count = 0;
    	 for(var key in obj){
           count++;
    	 }
    	 return count;
	}
}
