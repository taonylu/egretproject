/**
 * 控制类
 * @author chenkai 
 * @date 2017/2/8
 * 
 * Example:
 * App.View.register(HomeMediator.NAME, new HomeMediator());
 */
class View extends SingleClass{
    /**控制模块列表*/
    private mediatorList = {};

	/**
	 * 注册控制类
	 * @mediatorName 视图模块名
	 * @mediator 控制模块
	 */
    public register(mediatorName: string, mediator:IMediator) {
        mediator.onRegister();
        this.mediatorList[mediatorName] = mediator;
    }

	/**
	 * 注销控制模块
	 * @mediatorName 视图模块名
	 */
    public unRegister(mediatorName: string) {
        var controller: IMediator = this.mediatorList[mediatorName];
        if(controller){
            controller.onRemove();
            this.mediatorList[mediatorName] = null;
            delete this.mediatorList[mediatorName];
        }
    }

	/**
	 * 获取控制模块
	 * @mediatorName 控制模块名
	 */
    public getController(mediatorName: string): IMediator {
        return this.mediatorList[mediatorName];
    }
}
