/**
 * 分享UI
 * @author
 *
 */
var ShareUI = (function (_super) {
    __extends(ShareUI, _super);
    function ShareUI() {
        _super.call(this, "ShareUISkin");
    }
    var d = __define,c=ShareUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.show = function () {
        if (GameConst.haveChance) {
            this.haveChance.visible = true;
            this.noChance.visible = false;
        }
        else {
            this.haveChance.visible = false;
            this.noChance.visible = true;
        }
        LayerManager.getInstance().popLayer.addChild(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.onTouchTap = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.parent.removeChild(this);
    };
    return ShareUI;
})(BaseUI);
egret.registerClass(ShareUI,'ShareUI');
