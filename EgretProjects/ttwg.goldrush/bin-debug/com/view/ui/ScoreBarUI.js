/**
 * 分数条UI
 * @author
 *
 */
var ScoreBarUI = (function (_super) {
    __extends(ScoreBarUI, _super);
    function ScoreBarUI() {
        _super.call(this);
        this.discountUIList = []; //折扣UI
        this.curDiscount = 0; //当前折扣
        //分数背景
        this.scoreBg = new egret.Bitmap(RES.getRes("scorebg_png"));
        this.addChild(this.scoreBg);
        //分数条
        this.scoreBar = new egret.Bitmap(RES.getRes("scorebar_png"));
        this.scoreBar.x = this.scoreBg.x + 1;
        this.scoreBar.y = this.scoreBg.y + 1;
        this.addChild(this.scoreBar);
        //分数文本
        this.scoreText = new egret.TextField();
        this.scoreText.width = 70;
        this.scoreText.height = this.scoreBar.height;
        this.scoreText.textAlign = egret.HorizontalAlign.CENTER;
        this.scoreText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.scoreText.x = this.scoreBar.x;
        this.scoreText.y = this.scoreBar.y;
        this.addChild(this.scoreText);
        //折扣UI位置
        var scoreList = GameConst.scoreList;
        var discountList = GameConst.discountList;
        var len = discountList.length;
        for (var i = 0; i < len; i++) {
            var discountUI = new DiscountUI();
            discountUI.setText(discountList[i] + "折");
            discountUI.anchorOffsetX = discountUI.width / 2;
            discountUI.x = this.scoreBg.x + (scoreList[i] / GameConst.scoreMax) * this.scoreBar.width;
            discountUI.y = this.scoreBg.y + this.scoreBg.height;
            discountUI.setZhe(false);
            this.addChild(discountUI);
            this.discountUIList.push(discountUI);
        }
        this.setScore(0);
    }
    var d = __define,c=ScoreBarUI;p=c.prototype;
    //设置分数
    p.setScore = function (score) {
        //分数文本
        this.scoreText.text = score.toString();
        //分数条
        var scale = score / GameConst.scoreMax;
        if (scale > 1) {
            scale = 1;
        }
        this.scoreBar.scaleX = scale;
        //当前折扣
        var scoreList = GameConst.scoreList;
        var len = scoreList.length;
        var maxIndex = -1;
        for (var i = 0; i < len; i++) {
            if (score >= scoreList[i]) {
                maxIndex = i;
                this.curDiscount = GameConst.discountList[maxIndex];
            }
        }
        //折扣标签高亮
        if (maxIndex != -1) {
            for (i = 0; i < len; i++) {
                this.discountUIList[i].setZhe(false);
            }
            this.discountUIList[maxIndex].setZhe(true);
        }
    };
    return ScoreBarUI;
})(egret.DisplayObjectContainer);
egret.registerClass(ScoreBarUI,"ScoreBarUI");
