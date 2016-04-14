/**
 * 分数UI
 * @author
 *
 */
var ScoreUI = (function (_super) {
    __extends(ScoreUI, _super);
    function ScoreUI() {
        _super.call(this, "ScoreUISkin");
    }
    var d = __define,c=ScoreUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    p.show = function (item) {
        var self = this;
        this.x = item.x;
        this.y = item.y;
        this.scoreLabel.text = "+" + item.score + "";
        item.parent.addChild(this);
        egret.Tween.get(this).to({ y: (this.y - 300) }, 500).call(function () {
            self.recycle();
        });
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(ScoreUI.NAME).returnObject(this);
    };
    ScoreUI.NAME = "ScoreUI";
    return ScoreUI;
}(BaseUI));
egret.registerClass(ScoreUI,'ScoreUI');
