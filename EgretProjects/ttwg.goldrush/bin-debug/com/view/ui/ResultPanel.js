/**
*  功    能：游戏胜利面板
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
var ResultPanel = (function (_super) {
    __extends(ResultPanel, _super);
    function ResultPanel() {
        _super.call(this);
        this.bg = new egret.Bitmap(RES.getRes("resultbg_png"));
        this.addChild(this.bg);
        this.fxBtn = new SimpleButton("resultbtn_png");
        this.fxBtn.setText("分享立减");
        this.fxBtn.setTextSize(20);
        this.fxBtn.x = 30;
        this.fxBtn.y = 180;
        this.addChild(this.fxBtn);
        this.buyBtn = new SimpleButton("resultbtn_png");
        this.buyBtn.setText("立刻购买");
        this.buyBtn.setTextSize(20);
        this.buyBtn.x = 180;
        this.buyBtn.y = 180;
        this.addChild(this.buyBtn);
        this.contentText = new egret.TextField();
        this.contentText.width = this.bg.width;
        this.contentText.height = this.bg.height - this.fxBtn.height;
        this.contentText.textAlign = egret.HorizontalAlign.CENTER;
        this.contentText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.contentText.text = "";
        this.contentText.textColor = 0x000000;
        this.addChild(this.contentText);
    }
    var d = __define,c=ResultPanel;p=c.prototype;
    p.show = function () {
        GameConst.stage.addChild(this);
        this.x = (GameConst.stage.stageWidth - this.bg.width) / 2;
        this.y = (GameConst.stage.stageHeight - this.bg.height) / 2;
        this.fxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFxBtnTouch, this);
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnTouch, this);
    };
    p.onFxBtnTouch = function () {
        window['share']();
    };
    p.onBuyBtnTouch = function () {
        window['toBuy']();
    };
    p.setText = function (msg) {
        this.contentText.text = msg;
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return ResultPanel;
})(egret.Sprite);
egret.registerClass(ResultPanel,"ResultPanel");
