/**
 * 设备工具类
 * @author chenkai
 * @date 2016/12/18
 */
class DeviceUtils extends SingleClass{
    
    /**是否Native*/
	public get isNative(){
    	  return (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE);
	}

	/**是否Web*/
	public get isWeb(){
    	  return (egret.Capabilities.runtimeType == egret.RuntimeType.WEB);
	}

	/**是否移动端*/
	public get isMoile(){
		return egret.Capabilities.isMobile;
	}

	/**是否PC端*/
	public get isPC(){
		return !egret.Capabilities.isMobile;
	}
	
    /**是否Android系统*/
    public get isAndroid() {
        return egret.Capabilities.os == "Android";
    }
	
    /**是否ios系统*/
    public get isIos() {
        return egret.Capabilities.os == "iOS";
    }
	
}
