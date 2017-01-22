/**
 *
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.skinName = "GameSceneSkin";
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.childrenCreated = function () {
        console.log("game childrenCreated");
    };
    p.onEnable = function () {
        console.log("game onEnable");
    };
    p.onRemove = function () {
        console.log("game onRemove");
    };
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
