/**
 * 图层管理类
 * @author chenkai
 * @date 2016/12/23
 */
var LayerManager = (function (_super) {
    __extends(LayerManager, _super);
    function LayerManager() {
        _super.call(this);
        var stage = App.StageUtils.getStage();
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
    var d = __define,c=LayerManager,p=c.prototype;
    return LayerManager;
}(SingleClass));
egret.registerClass(LayerManager,'LayerManager');
