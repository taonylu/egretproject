/**
 * 游戏主类
 * @author 羊力大仙
 * @date 2015.10.27
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene();
        this.gameScene = new GameScene();
    }
    var d = __define,c=GameManager;p=c.prototype;
    p.startup = function () {
        LayerManager.getInstance().runScene(this.homeScene);
        this.createGreenBar();
    };
    p.createGreenBar = function () {
        var stage = LayerManager.getInstance().stage;
        this.greenBar = new GreenBarMC();
        this.greenBar.x = 0;
        this.greenBar.y = stage.stageHeight - this.greenBar.height;
        this.greenBar.play(-1);
        LayerManager.getInstance().popLayer.addChild(this.greenBar);
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
