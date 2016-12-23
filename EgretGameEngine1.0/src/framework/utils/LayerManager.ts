/**
 * 图层管理类
 * @author chenkai
 * @date 2016/12/23
 */
class LayerManager extends SingleClass{
	/**场景层*/
	public sceneLayer:eui.UILayer;
	/**弹框层*/
	public panelLayer:eui.UILayer;
	/**提示层*/
	public tipLayer:eui.UILayer;

	public constructor() {
		super();

		var stage:egret.Stage = App.StageUtils.getStage();

		this.sceneLayer = new eui.UILayer();
		this.sceneLayer.percentWidth = 100;
		this.sceneLayer.percentHeight = 100;
		this.sceneLayer.touchEnabled = false;
		stage.addChild(this.sceneLayer);

		this.panelLayer = new eui.UILayer();
		this.panelLayer.percentWidth = 100;
		this.panelLayer.percentHeight = 100;
		this.panelLayer.touchEnabled = false;
		stage.addChild(this.panelLayer);

		this.tipLayer = new eui.UILayer();
		this.tipLayer.percentWidth = 100;
		this.tipLayer.percentHeight = 100;
		this.tipLayer.touchEnabled = false;
		stage.addChild(this.tipLayer);
		
	}

	

}