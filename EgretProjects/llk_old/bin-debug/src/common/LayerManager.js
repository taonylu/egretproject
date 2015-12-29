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
    var __egretProto__ = LayerManager.prototype;
    LayerManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new LayerManager();
        }
        return this.instance;
    };
    /**初始化*/
    __egretProto__.initialize = function (stage) {
        this.stage = stage;
        this.uiStage = new egret.gui.UIStage();
        stage.addChild(this.uiStage);
        this.uiSceneLayer = new egret.gui.Group();
        this.uiSceneLayer.percentWidth = 100;
        this.uiSceneLayer.percentHeight = 100;
        this.uiStage.addElement(this.uiSceneLayer);
        this.uiPopLayer = new egret.gui.Group();
        this.uiPopLayer.percentWidth = 100;
        this.uiPopLayer.percentHeight = 100;
        this.uiStage.addElement(this.uiPopLayer);
    };
    /**
     * 运行场景
     * @param 运行的场景名
     * @param 切换场景过渡动画类型
     * @param 是否销毁上一场景
     */
    __egretProto__.runScene = function (nextScene, tween, destroy) {
        if (tween === void 0) { tween = 0 /* None */; }
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
        if (nextScene.initialized) {
            nextScene.onEnable();
        }
        this.playSceneTween(this.curScene, nextScene, tween);
        this.curScene = nextScene;
    };
    /**场景过渡动画*/
    __egretProto__.playSceneTween = function (curScene, nextScene, tween) {
        var self = this;
        switch (tween) {
            case 0 /* None */:
                curScene && self.uiSceneLayer.removeElement(curScene);
                self.uiSceneLayer.addElement(nextScene);
                break;
            case 1 /* R */:
                nextScene.x = self.stage.stageWidth;
                this.uiSceneLayer.addElement(nextScene);
                egret.Tween.get(nextScene).to({ x: 0 }, this.tweenTime, egret.Ease.quartOut).call(function () {
                    curScene && self.uiSceneLayer.removeElement(curScene);
                });
                break;
        }
    };
    return LayerManager;
})();
LayerManager.prototype.__class__ = "LayerManager";
/**场景过渡动画*/
var STween;
(function (STween) {
    STween[STween["None"] = 0] = "None";
    /**新场景从右边入场*/
    STween[STween["R"] = 1] = "R";
})(STween || (STween = {}));
