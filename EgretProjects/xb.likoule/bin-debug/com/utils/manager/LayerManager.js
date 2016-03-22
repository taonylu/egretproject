/**
*  文 件 名：LayerManager.ts
*  功    能： 图层管理类，单例
*  内    容： 游戏图层、场景管理
*  作    者： Rikimaru
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var LayerManager = (function () {
    function LayerManager() {
        /**场景动画时间*/
        this.tweenTime = 500;
    }
    var d = __define,c=LayerManager,p=c.prototype;
    /**初始化*/
    p.initialize = function (main) {
        this.main = main;
        this.sceneLayer = new eui.Group();
        this.sceneLayer.percentWidth = 100;
        this.sceneLayer.percentHeight = 100;
        this.main.addChild(this.sceneLayer);
        this.popLayer = new eui.Group();
        this.popLayer.percentWidth = 100;
        this.popLayer.percentHeight = 100;
        this.popLayer.touchEnabled = false;
        this.popLayer.touchThrough = true;
        this.main.addChild(this.popLayer);
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
            if (this.curScene) {
                this.sceneLayer.removeChild(this.curScene);
                this.curScene.onRemove();
                if (destroy) {
                    this.curScene.onDestroy();
                }
            }
        }
        //设置当前场景
        this.curScene = nextScene;
        //添加下一场景
        this.sceneLayer.addChild(nextScene);
        if (nextScene.inited) {
            nextScene.onEnable();
        }
    };
    p.clearPopLayer = function () {
        var num = this.popLayer.numChildren;
        if (num > 0) {
            for (var i = 0; i < num; i++) {
                this.popLayer.removeChildAt(i);
            }
        }
    };
    LayerManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new LayerManager();
        }
        return this.instance;
    };
    return LayerManager;
}());
egret.registerClass(LayerManager,'LayerManager');
