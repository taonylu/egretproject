/**
 * App主类
 * @author chenkai 
 * @date 2016/12/18
 */
class App extends SingleClass{
	
    /**获取视图模块*/
    public static get View(): View{
        return View.getInstance();
    }
	
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
    public static get MessageCenter(): MessageCenter{
        return MessageCenter.getInstance();
	}

	/**对象池*/
	public static get ObjectPool():ObjectPool{
		return ObjectPool.getInstance();
	}

	/**Http请求*/
	public static get Http():Http{
		return Http.getInstance();
	}

	/**Socket*/
	public static get Socket():ClientSocket{
		return ClientSocket.getInstance();
	}

	/**资源加载类*/
	public static get ResUtils():ResUtils{
		return ResUtils.getInstance();
	}

	/**舞台管理类*/
	public static get StageUtils():StageUtils{
		return StageUtils.getInstance();
	}

	/**弹框管理类*/
	public static get PanelManager():PanelManager{
		return PanelManager.getInstance();
	}

	/**场景管理类*/
	public static get SceneManager():SceneManager{
		return SceneManager.getInstance();
	}

	/**图层管理类*/
	public static get LayerManager():LayerManager{
		return LayerManager.getInstance();
	}
	
	/**声音管理类*/
	public static get Sound():SoundManager{
    	return SoundManager.getInstance();
	}
	
	/**设备管理类*/
	public static get DeviceUtils():DeviceUtils{
    	return DeviceUtils.getInstance();
	}
	
	/**蓝月亮SDK*/
    public static get BluemoonSDK(): BluemoonSDK{
        return BluemoonSDK.getInstance();
	}
	
	/**微信分享*/
	public static get WxContent():WxContent{
    	return WxContent.getInstance();
	}
}















