/**
*  文 件 名：BaseScene.ts
*  功    能： 场景基类
*  内    容： 将场景自适应到容器的100%
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        _super.call(this);
        /**组件是否初始化完毕*/
        this.inited = false;
        this.percentWidth = 100;
        this.percentHeight = 100;
        this.touchEnabled = false;
        this.addEventListener(eui.UIEvent.COMPLETE, this.componentCreated, this);
    }
    var d = __define,c=BaseScene;p=c.prototype;
    /**组件初始化完毕*/
    p.componentCreated = function () {
        this.inited = true;
        this.parent && this.onEnable();
    };
    /**组建创建完毕的情况下，添加到舞台时执行*/
    p.onEnable = function () {
        console.log("内部");
    };
    /**移除界面时执行*/
    p.onRemove = function () {
    };
    /**销毁界面时执行*/
    p.onDestroy = function () {
    };
    return BaseScene;
})(eui.Component);
egret.registerClass(BaseScene,"BaseScene");

/**
 *  文 件 名：BaseUI.ts
 *  功    能： 基类UI
 *  内    容：
 *  作    者： 羊力大仙
 *  生成日期：2015/9/23
 *  修改日期：2015/9/23
 *  修改日志：
 */
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        _super.call(this);
        /**组件是否初始化完毕*/
        this.inited = false;
        this.addEventListener(egret.Event.COMPLETE, this.componentCreated, this);
    }
    var d = __define,c=BaseUI;p=c.prototype;
    /**组件初始化完毕*/
    p.componentCreated = function () {
        this.inited = true;
    };
    return BaseUI;
})(eui.Component);
egret.registerClass(BaseUI,"BaseUI");

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
        this.stage = main.stage;
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
            case 0 /* None */:
                curScene && self.sceneLayer.removeChild(curScene);
                break;
            case 1 /* R */:
                nextScene.x = self.stage.stageWidth;
                egret.Tween.get(nextScene).to({ x: 0 }, this.tweenTime, egret.Ease.quartOut).call(function () {
                    curScene && self.sceneLayer.removeChild(curScene);
                });
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

/**
 *  文 件 名：SimpleMC.ts
 *  功    能：简单MC
 *  内    容：简化了新建json和png以及Factory的代码
 *  作    者： 羊力大仙
 *  生成日期：2015/9/23
 *  修改日期：2015/9/23
 *  修改日志：
 */
var SimpleMC = (function (_super) {
    __extends(SimpleMC, _super);
    function SimpleMC(pngName, jsonName, mcName) {
        var png = RES.getRes(pngName);
        var json = RES.getRes(jsonName);
        var mcF = new egret.MovieClipDataFactory(json, png);
        _super.call(this, mcF.generateMovieClipData(mcName));
    }
    var d = __define,c=SimpleMC;p=c.prototype;
    return SimpleMC;
})(egret.MovieClip);
egret.registerClass(SimpleMC,"SimpleMC");

