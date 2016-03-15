/**
 * 排行榜场景
 * @author
 *
 */
var RankScene = (function (_super) {
    __extends(RankScene, _super);
    function RankScene() {
        _super.call(this, "RankSceneSkin");
    }
    var d = __define,c=RankScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    return RankScene;
})(BaseScene);
egret.registerClass(RankScene,'RankScene');
