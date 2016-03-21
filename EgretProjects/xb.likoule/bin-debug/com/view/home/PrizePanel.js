/**
 * 获奖列表
 * @author
 *
 */
var PrizePanel = (function (_super) {
    __extends(PrizePanel, _super);
    function PrizePanel() {
        _super.call(this, "PrizePanelSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=PrizePanel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.leaderBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaderBtnTouch, this);
    };
    p.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.leaderBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaderBtnTouch, this);
    };
    p.onCloseBtnTouch = function () {
        this.hide();
    };
    p.onLeaderBtnTouch = function () {
        //TODO 队长来领奖
    };
    return PrizePanel;
}(BaseUI));
egret.registerClass(PrizePanel,'PrizePanel');
