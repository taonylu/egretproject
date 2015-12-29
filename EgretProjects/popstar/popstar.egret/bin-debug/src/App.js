/**
 *
 * 游戏类
 * @author
 *
 */
var SceneID;
(function (SceneID) {
    SceneID[SceneID["homeScene"] = 0] = "homeScene";
    SceneID[SceneID["gameScene"] = 1] = "gameScene";
})(SceneID || (SceneID = {}));
var App = (function () {
    function App() {
    }
    var __egretProto__ = App.prototype;
    App.getInstance = function () {
        if (this.instance == null) {
            this.instance = new App();
        }
        return this.instance;
    };
    /**启动游戏，进行初始化*/
    __egretProto__.startup = function () {
        this.uiStage = egret.gui.UIGlobals.uiStage;
        this.sceneList = new Object();
        this.runScene(AppConst.SceneID_Home);
    };
    /**
    * 运行场景
    */
    __egretProto__.runScene = function (sceneID) {
        switch (sceneID) {
            case AppConst.SceneID_Home:
                if (this.sceneList[sceneID] == null) {
                    this.sceneList[sceneID] = new HomeScene();
                }
                break;
            case AppConst.SceneID_Game:
                if (this.sceneList[sceneID] == null) {
                    this.sceneList[sceneID] = new GameScene();
                }
                break;
            default:
                throw new Error("当前场景不存在");
                return;
        }
        //移除当前场景
        if (this.sceneList[this.curSceneID] != null) {
            this.uiStage.removeElement(this.sceneList[this.curSceneID]);
        }
        //添加要运行的场景
        this.uiStage.addElement(this.sceneList[sceneID]);
        this.curSceneID = sceneID;
    };
    return App;
})();
App.prototype.__class__ = "App";
