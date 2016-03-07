/**
*  文 件 名：App.ts
*  功    能： 游戏主类
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/21
*  修改日志：
*/
var App = (function () {
    function App() {
    }
    var __egretProto__ = App.prototype;
    /**启动游戏*/
    __egretProto__.startup = function (stage) {
        //调试参数
        egret.Profiler.getInstance().run();
        //图层初始化
        LayerManager.getInstance().initialize(stage);
        //舞台高宽
        GameConfig.stageWidth = stage.stageWidth;
        GameConfig.stageHeight = stage.stageHeight;
        stage.addEventListener(egret.Event.RESIZE, function () {
            GameConfig.stageWidth = stage.stageWidth;
            GameConfig.stageHeight = stage.stageHeight;
        }, this);
        //加载预加载界面资源
        LoadManager.getInstance().loadGroup(GameConfig.GN_Preload, this, this.onLoadComplete);
    };
    /**启动预加载界面*/
    __egretProto__.onLoadComplete = function () {
        LayerManager.getInstance().replaceScene(GameConfig.SN_Preload);
    };
    App.getInstance = function () {
        if (this.instance == null) {
            this.instance = new App();
        }
        return this.instance;
    };
    return App;
})();
App.prototype.__class__ = "App";
