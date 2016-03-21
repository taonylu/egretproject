/**
 * 分享界面
 * @author
 *
 */
var SharePanel = (function (_super) {
    __extends(SharePanel, _super);
    function SharePanel() {
        _super.call(this, "SharePanelSkin");
    }
    var d = __define,c=SharePanel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.percentWidth = 100;
        this.percentHeight = 100;
    };
    p.onEnable = function () {
        if (GameConst.orientation == 0) {
            this.arrowGroup.scaleX = -1;
        }
        else {
            this.arrowGroup.scaleX = 1;
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    p.onRemove = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    p.onTouch = function () {
        this.hide();
    };
    return SharePanel;
}(BaseUI));
egret.registerClass(SharePanel,'SharePanel');
