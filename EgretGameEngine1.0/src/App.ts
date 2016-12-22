/**
 * App主类
 * @author chenkai 
 * @date 2016/12/18
 */
class App extends SingleClass{
    
    
    /**版本管理*/
	public static get VersionManager():VersionManager{
    	return VersionManager.getInstance();
	}
	
	/**数据中心*/
	public static get DataCenter():DataCenter{
    	return DataCenter.getInstance();
	}
	
	/**数组工具类*/
	public static get ArrayTool():ArrayTool{
    	return ArrayTool.getInstance();
	}
	
	/**数字工具类*/
	public static get NumberTool():NumberTool{
    	return NumberTool.getInstance();
	}
	
	/**字符串工具*/
	public static get StringTool():StringTool{
    	return StringTool.getInstance();
	}

	/**事件管理类*/
	public static get EventManager():EventManager{
		return EventManager.getInstance();
	}

	/**对象池*/
	public static get ObjectPool():ObjectPool{
		return ObjectPool.getInstance();
	}

	/**Http请求*/
	public static get Http():Http{
		return Http.getInstance();
	}
}
