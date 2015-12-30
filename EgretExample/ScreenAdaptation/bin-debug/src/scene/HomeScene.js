/**
 *
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        this.skinName = skins.scene.HomeSceneSkin;
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var __egretProto__ = HomeScene.prototype;
    return HomeScene;
})(egret.gui.SkinnableComponent);
HomeScene.prototype.__class__ = "HomeScene";
