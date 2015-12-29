/**
*  文 件 名：LosePanel.ts
*  功    能   : 游戏失败弹出框
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/26
*  修改日期：2015/8/26
*  修改日志：
*/
var LosePanel = (function (_super) {
    __extends(LosePanel, _super);
    function LosePanel() {
        _super.call(this);
        this.skinName = skins.ui.LosePanelSkin;
    }
    var __egretProto__ = LosePanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.x = (GameConfig.stageWidth - this.width) / 2;
        this.y = (GameConfig.stageHeight - this.height) / 2;
    };
    __egretProto__.startTimer = function () {
        if (this.timer == null) {
            this.timer = new egret.Timer(1000);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this);
        }
        this.timer.delay = 1000;
        this.timer.repeatCount = 3;
        this.timer.reset();
        this.timer.start();
        GameScene.instance.gameGroup.addElement(this);
        this.timeLabel.text = "3";
    };
    __egretProto__.onTimer = function (e) {
        console.log("ontimer:" + this.timer.currentCount);
        this.timeLabel.text = (3 - this.timer.currentCount).toString();
    };
    __egretProto__.onComplete = function () {
        console.log("onComplete:" + this.timer.currentCount);
        this.timer.stop();
        GameScene.instance.gameGroup.removeElement(this);
        LayerManager.getInstance().replaceScene(GameConfig.SN_Through, 1 /* R */);
    };
    return LosePanel;
})(egret.gui.SkinnableComponent);
LosePanel.prototype.__class__ = "LosePanel";
