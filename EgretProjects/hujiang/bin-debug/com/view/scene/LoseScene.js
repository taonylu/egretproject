/**
 *
 * @author
 * 失败场景
 */
var LoseScene = (function (_super) {
    __extends(LoseScene, _super);
    function LoseScene() {
        _super.call(this, "resource/myskin/scene/LoseSceneSkin.exml");
    }
    var d = __define,c=LoseScene;p=c.prototype;
    p.onEnable = function () {
        this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLinkBtnTouch, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    p.onRemove = function () {
        this.linkBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLinkBtnTouch, this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    p.onLinkBtnTouch = function () {
        alert("点击链接");
    };
    p.onAgainBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return LoseScene;
})(BaseScene);
egret.registerClass(LoseScene,"LoseScene");
