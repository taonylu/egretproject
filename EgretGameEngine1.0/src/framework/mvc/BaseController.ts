/**
 * 控制基类
 * @author chenkai
 * @date 2016/12/18
 */
class BaseController {
	
	/**
     * 添加消息监听
     * @param type 事件类型
     * @param listener 侦听函数
     * @param thisObject 侦听函数所属对象
     */
	public addEvent(type:string, listener:Function, thisObject:any){
		App.EventManager.addEvent(type,listener,thisObject);
	}

	/**
     * 移除消息监听
     * @param type 事件类型
     * @param listener 侦听函数
     * @param thisObject 侦听函数所属对象
     */
    public removeEvent(type:string, listener:Function, thisObject:any):void {
        App.EventManager.removeEvent(type, listener, thisObject);
    }

	/**
     * 发送事件
     * @param type 事件类型
     * @param param 消息参数
     *
     */
    public sendEvent(type:string, ...param:any[]):void {
		App.EventManager.sendEvent(type, ...param);
    }
}