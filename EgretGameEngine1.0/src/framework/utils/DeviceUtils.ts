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
	
}
