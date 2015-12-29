/**
 * 游戏结算界面
 * @author 羊力大仙
 *
 */
var GameOverUI = (function (_super) {
    __extends(GameOverUI, _super);
    function GameOverUI() {
        _super.call(this);
        this.skinName = "resource/myskins/ui/GameOverUISkin.exml";
    }
    var d = __define,c=GameOverUI;p=c.prototype;
    p.show = function (doc) {
        doc.addChild(this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
        this.scoreLabel.text = GameManager.getInstance().gameScene.score.toString();
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
    };
    p.startBtnTouch = function () {
        this.hide();
        GameManager.getInstance().gameScene.resetGame();
    };
    return GameOverUI;
})(BaseUI);
egret.registerClass(GameOverUI,"GameOverUI");
