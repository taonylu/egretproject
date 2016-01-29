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
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.onTouchTap = function () {
        this.parent && this.parent.removeChild(this);
    };
    return ShareUI;
})(BaseUI);
egret.registerClass(ShareUI,'ShareUI');
