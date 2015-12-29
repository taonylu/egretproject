/**
*  文 件 名：LayerManager.ts
*  功    能： 图层管理类
*  内    容： 游戏图层、场景管理
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var LayerManager = (function () {
    function LayerManager() {
        /**场景动画时间*/
        this.tweenTime = 500;
    }
    var d = __define,c=LayerManager;p=c.prototype;
    LayerManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new LayerManager();
        }
        return this.instance;
    };
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
        this.main.addChild(this.popLayer);
    };
    /**
     * 运行场景
     * @param 运行的场景名
     * @param 切换场景过渡动画类型
     * @param 是否销毁上一场景
     */
    p.runScene = function (nextScene, tween, destroy) {
        if (tween === void 0) { tween = STween.None; }
        if (destroy === void 0) { destroy = false; }
        //隐藏或销毁当前场景
        if (this.curScene != null) {
            if (this.curScene) {
                this.curScene.onRemove();
                if (destroy) {
                    this.curScene.onDestroy();
                }
            }
        }
        //添加当前场景，并执行过渡动画
        this.sceneLayer.addChild(nextScene);
        if (nextScene.inited) {
            nextScene.onEnable();
        }
        this.playSceneTween(this.curScene, nextScene, tween);
        this.curScene = nextScene;
    };
    /**场景过渡动画*/
    p.playSceneTween = function (curScene, nextScene, tween) {
        var self = this;
        switch (tween) {
            case STween.None:
                curScene && self.sceneLayer.removeChild(curScene);
                break;
            case STween.R:
                curScene && self.sceneLayer.removeChild(curScene);
                break;
        }
    };
    return LayerManager;
})();
egret.registerClass(LayerManager,"LayerManager");
/**场景过渡动画*/
var STween;
(function (STween) {
    STween[STween["None"] = 0] = "None";
    /**新场景从右边入场*/
    STween[STween["R"] = 1] = "R";
})(STween || (STween = {}));
