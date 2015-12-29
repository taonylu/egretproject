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
    };
    p.showInScene = function (doc, totalMoney) {
        this.y = (GameConst.stage.stageHeight - this.height) / 2;
        doc.addChild(this);
        this.setResultLabel(totalMoney);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch, this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
    };
    p.onStartBtnTouch = function () {
        this.hide();
        GameManager.getInstance().gameScene.startGame();
    };
    p.onRankBtnTouch = function () {
    };
    p.onShareBtnTouch = function () {
    };
    p.setResultLabel = function (totalMoney) {
        this.resultLabel.text = "获得了xxxxx，超过了xxxx";
    };
    return ResultUI;
})(BaseUI);
egret.registerClass(ResultUI,'ResultUI');
