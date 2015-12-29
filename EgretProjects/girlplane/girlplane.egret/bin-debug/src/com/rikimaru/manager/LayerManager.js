/**
*  文 件 名：LayerManager.ts
*  功    能： 图层管理类
*  内    容： 游戏图层、场景管理
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/22
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
        this.sceneList = {};
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
    __egretProto__.replaceScene = function (nextSceneName, tween, destroy) {
        if (tween === void 0) { tween = 0 /* None */; }
        if (destroy === void 0) { destroy = false; }
        //隐藏或销毁当前场景
        if (this.curSceneName != undefined) {
            var curScene = this.sceneList[this.curSceneName];
            if (curScene) {
                curScene.onRemove(); //缓动前，移除场景监听等
                if (destroy) {
                    curScene.onDestroy();
                    this.sceneList[this.curSceneName] = null;
                }
            }
        }
        //添加要运行的场景
        var nextScene = this.sceneList[nextSceneName];
        if (nextScene == null) {
            var clazz = egret.getDefinitionByName(nextSceneName);
            if (clazz != null) {
                nextScene = new clazz();
                this.sceneList[nextSceneName] = nextScene;
            }
            else {
                console.warn("场景不存在:" + nextSceneName);
                return;
            }
        }
        else {
            nextScene.onEnable();
        }
        this.curSceneName = nextSceneName;
        this.playSceneTween(curScene, nextScene, tween);
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
                    self.uiSceneLayer.removeElement(curScene);
                });
                break;
        }
    };
    /**获取场景*/
    __egretProto__.getScene = function (sceneName) {
        return this.sceneList[sceneName];
    };
    /**显示加载动画*/
    __egretProto__.showLoading = function () {
        if (this.loadingPanel == null) {
            this.loadingPanel = new LoadingPanel();
        }
        this.uiPopLayer.addElement(this.loadingPanel);
        this.loadingPanel.onEnable();
    };
    /**隐藏加载动画*/
    __egretProto__.hideLoading = function () {
        if (this.loadingPanel) {
            this.loadingPanel.onRemove();
            this.uiPopLayer.removeElement(this.loadingPanel);
        }
    };
    return LayerManager;
})();
LayerManager.prototype.__class__ = "LayerManager";
