/**
 * 游戏主类
 * @author
 *
 */
var App = (function () {
    function App() {
    }
    var d = __define,c=App,p=c.prototype;
    App.init = function (root) {
        StageUtil.stage = root.stage;
        this.sndMgr = new SoundManager();
        this.layerMgr = new LayerManager();
        this.layerMgr.init(root);
        this.sceneMgr = new SceneManager();
        this.layerMgr.runScene(this.sceneMgr.sceneA);
    };
    return App;
}());
egret.registerClass(App,'App');
