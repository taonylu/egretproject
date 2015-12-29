/**
 *
 * @author
 * 游戏管理类
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene();
        this.roleScene = new RoleScene();
        this.introduceScene = new IntroduceScene();
        this.gameScene = new GameScene();
        this.loseScene = new LoseScene();
        this.winScene = new WinScene();
    }
    var d = __define,c=GameManager;p=c.prototype;
    //启动游戏
    p.startup = function () {
        LayerManager.getInstance().runScene(this.homeScene);
    };
    GameManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    };
    return GameManager;
})();
egret.registerClass(GameManager,"GameManager");
