/**
*  功    能： 图层管理类
*/
var LayerManager = (function () {
    function LayerManager() {
    }
    var d = __define,c=LayerManager,p=c.prototype;
    /**初始化*/
    p.init = function (main) {
        this.main = main;
        this.sceneLayer = new eui.Group();
        this.sceneLayer.percentWidth = 100;
        this.sceneLayer.percentHeight = 100;
        this.main.addChild(this.sceneLayer);
    };
    /**
     * 运行场景
     * @param 运行的场景名
     * @param 是否销毁上一场景
     */
    p.runScene = function (nextScene, destroy) {
        if (destroy === void 0) { destroy = false; }
        //隐藏或销毁当前场景
        if (this.curScene != null) {
            this.sceneLayer.removeChild(this.curScene);
        }
        //设置当前场景
        this.curScene = nextScene;
        //添加下一场景
        this.sceneLayer.addChild(nextScene);
    };
    return LayerManager;
}());
egret.registerClass(LayerManager,'LayerManager');
