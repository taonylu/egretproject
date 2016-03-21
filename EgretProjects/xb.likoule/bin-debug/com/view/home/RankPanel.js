/**
 * 排行榜
 * @author
 *
 */
var RankPanel = (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        _super.call(this, "RankPanelSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=RankPanel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
    };
    p.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
    };
    p.onCloseBtnTouch = function () {
        this.hide();
    };
    return RankPanel;
}(BaseUI));
egret.registerClass(RankPanel,'RankPanel');
