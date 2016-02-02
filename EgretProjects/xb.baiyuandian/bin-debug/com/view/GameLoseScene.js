/**
 * 游戏失败界面
 * @author
 *
 */
var GameLoseScene = (function (_super) {
    __extends(GameLoseScene, _super);
    function GameLoseScene() {
        _super.call(this, "GameLoseSceneSkin");
    }
    var d = __define,c=GameLoseScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        this.wrongPacket.alpha = 1;
        egret.Tween.get(this.wrongPacket).wait(1200).to({ alpha: 0 }, 800).call(function () {
            LayerManager.getInstance().runScene(GameManager.getInstance().submitScene);
        }, this);
    };
    p.onRemove = function () {
    };
    return GameLoseScene;
})(BaseScene);
egret.registerClass(GameLoseScene,'GameLoseScene');
