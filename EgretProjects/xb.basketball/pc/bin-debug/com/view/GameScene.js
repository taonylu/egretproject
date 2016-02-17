/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.ballPool = ObjectPool.getPool(Ball.NAME); //篮球对象池
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        var ball = this.ballPool.getObject();
        this.addChild(ball);
        ball.play();
    };
    p.onRemove = function () {
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
