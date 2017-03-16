/**
 * 弹框基类
 * @author chenkai
 * @since 2016/12/18
 */
class BasePanel extends eui.Component{

	public constructor() {
		super();
        this.percentWidth = 100;
        this.percentHeight = 100;
	}

	/**显示到舞台*/
	public onEnable(data:any = null){

	}

	/**从舞台移除*/
	public onRemove(){

	}
}