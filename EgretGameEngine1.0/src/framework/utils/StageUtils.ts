/**
 * 舞台管理类
 * @author chenkai
 * @date 2016/12/23
 */
class StageUtils extends SingleClass{
	/**舞台*/
	private stage:egret.Stage;

	/**初始化舞台*/
	public init(stage:egret.Stage){
		this.stage = stage;
	}

	/**获取舞台*/
	public getStage():egret.Stage{
		return this.stage;
	}

	/**舞台宽度*/
	public get stageWidth(){
		return this.stage.stageWidth;
	}

	/**舞台高度*/
	public get stageHeight(){
		return this.stage.stageHeight;
	}
	
}