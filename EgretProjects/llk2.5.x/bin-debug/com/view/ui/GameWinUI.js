/**
*  功    能：游戏胜利面板
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
var GameWinUI = (function (_super) {
    __extends(GameWinUI, _super);
    function GameWinUI() {
        _super.call(this);
        this.skinName = "resource/myskins/GameWinUISkin.exml";
    }
    var d = __define,c=GameWinUI;p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.setScoreLabel(this.tempScore);
        this.configListeners();
    };
    p.show = function (doc) {
        doc.addChild(this);
        this.x = doc.width / 2 - this.width / 2;
        this.y = doc.height / 2 - this.height / 2;
    };
    p.configListeners = function () {
        this.retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRetryBtnTouch, this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextBtnTouch, this);
    };
    p.onRetryBtnTouch = function () {
        console.log("touch retrybtn");
        GameManager.getInstance().gameScene.quitGame();
    };
    p.onNextBtnTouch = function () {
        console.log("touch nextbtn");
        //GameManager.getInstance().sendSubmit(this.tempScore);
        var gameScene = GameManager.getInstance().gameScene;
        gameScene.starGame(gameScene.curLevel + 1);
    };
    p.setScoreLabel = function (score) {
        this.tempScore = score;
        if (this.inited) {
            this.scoreLabel.text = "分数：" + this.tempScore;
        }
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
        this.setScoreLabel(0);
    };
    return GameWinUI;
})(BaseUI);
egret.registerClass(GameWinUI,"GameWinUI");
