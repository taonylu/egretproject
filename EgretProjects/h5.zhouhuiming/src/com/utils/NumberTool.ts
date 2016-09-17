/**
 * 数字工具类
 * @author 
 *
 */
class NumberTool {
    
    /**
     * 时间格式转换  0 -> "00"
     */ 
	public static timeFormat(value:number):string{
    	if(value < 10){
        	return ("0" + value);
    	}else{
        return value + "";
    	}
	}
}
