/**
 * 分数文本
 * @author
 *
 */
var ScoreLabel = (function (_super) {
    __extends(ScoreLabel, _super);
    function ScoreLabel() {
        _super.call(this);
        this.skinName = "ScoreLabelSkin";
    }
    var d = __define,c=ScoreLabel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.anchorOffsetX = 35;
        this.anchorOffsetY = 35;
    };
    p.setScoreLabel = function (score) {
        this.scoreLabel.text = score + "";
        var self = this;
        egret.Tween.get(this).wait(500).call(function () {
            self.recycle();
        }, this);
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.scoreLabel.text = "0";
        ObjectPool.getPool(ScoreLabel.NAME).returnObject(this);
    };
    ScoreLabel.NAME = "ScoreLabel";
    return ScoreLabel;
}(BaseUI));
egret.registerClass(ScoreLabel,'ScoreLabel');
