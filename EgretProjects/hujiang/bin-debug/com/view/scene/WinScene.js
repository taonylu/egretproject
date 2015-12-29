/**
 *
 * @author
 *
 */
var WinScene = (function (_super) {
    __extends(WinScene, _super);
    function WinScene() {
        _super.call(this, "resource/myskin/scene/WinSceneSkin.exml");
    }
    var d = __define,c=WinScene;p=c.prototype;
    p.onEnable = function () {
        this.shareHand.parent && this.removeChild(this.shareHand);
        this.shareBg.parent && this.removeChild(this.shareBg);
        this.setScoreLabel(GameManager.getInstance().gameScene.score);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    p.onRemove = function () {
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    p.setScoreLabel = function (score) {
        this.scoreLabel.text = score.toString();
    };
    p.onShareBtnTouch = function () {
        this.addChild(this.shareBg);
        this.addChild(this.shareHand);
        this.shareBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBgTouch, this);
    };
    p.onShareBgTouch = function () {
        this.shareBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBgTouch, this);
        this.removeChild(this.shareBg);
        this.removeChild(this.shareHand);
    };
    p.onAgainBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
    };
    return WinScene;
})(BaseScene);
egret.registerClass(WinScene,"WinScene");
