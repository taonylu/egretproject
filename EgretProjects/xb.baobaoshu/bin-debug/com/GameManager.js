/**
 * 游戏主类，单例
 * @author
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.preloadScene = new PreloadScene();
        this.gameScene = new GameScene();
        this.submitScene = new SubmitScene();
    }
    var d = __define,c=GameManager,p=c.prototype;
    //启动
    p.startup = function (main) {
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        LayerManager.getInstance().runScene(this.gameScene);
        console.log("submit");
        //Test 测试
        window['submit']();
        egret.Tween.get(this).wait(3000).call(function () {
            window['sendGetPrize']();
        });
    };
    GameManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    };
    return GameManager;
})();
egret.registerClass(GameManager,'GameManager');
