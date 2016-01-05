/**
 * 结果UI
 * @author
 *
 */
var ResultUI = (function (_super) {
    __extends(ResultUI, _super);
    function ResultUI() {
        _super.call(this, "ResultUISkin");
    }
    var d = __define,c=ResultUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initShareBtnY = this.shareBtn.y;
    };
    p.showInScene = function (doc, totalPacket) {
        doc.addChild(this);
        //分享按钮动画
        egret.Tween.get(this.shareBtn, { loop: true }).to({ y: this.initShareBtnY + 15 }, 500).to({ y: this.initShareBtnY }, 500);
        //监听
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.openPacketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenBtnTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeBtnTouch, this);
    };
    p.hide = function () {
        //从场景移除
        this.parent && this.parent.removeChild(this);
        //停止分享按钮动画
        egret.Tween.removeTweens(this.shareBtn);
        //移除监听
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.openPacketBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenBtnTouch, this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.prizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeBtnTouch, this);
    };
    //再拆一次
    p.onAgainBtnTouch = function () {
        this.hide();
        GameManager.getInstance().gameScene.startGame();
    };
    //去拆红包
    p.onOpenBtnTouch = function () {
    };
    //分享按钮
    p.onShareBtnTouch = function () {
        GameManager.getInstance().shareUI.show();
    };
    //我的奖品
    p.onPrizeBtnTouch = function () {
    };
    return ResultUI;
})(BaseUI);
egret.registerClass(ResultUI,'ResultUI');
