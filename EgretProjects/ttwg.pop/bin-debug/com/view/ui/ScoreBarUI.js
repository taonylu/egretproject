/**
 * 分数条
 * @author
 *
 */
var ScoreBarUI = (function (_super) {
    __extends(ScoreBarUI, _super);
    function ScoreBarUI() {
        _super.call(this);
        this.zheScore = []; //折扣分数
        this.zheList = []; //几折
        this.zheUIList = []; //折扣UI
        this.curZhe = 0; //当前折扣
        this.zheScore = GameConst.zheScore;
        this.zheList = GameConst.zheList;
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
        var len = this.zheList.length;
        for (var i = 0; i < len; i++) {
            var zheUI = new ZheUI();
            zheUI.setText(this.zheList[i] + "折");
            zheUI.anchorOffsetX = zheUI.width / 2;
            zheUI.x = this.scoreBg.x + (this.zheScore[i] / GameConst.totalScore) * this.scoreBar.width;
            zheUI.y = this.scoreBg.y + this.scoreBg.height;
            zheUI.setZhe(false);
            this.addChild(zheUI);
            this.zheUIList.push(zheUI);
        }
        this.setScore(0);
    }
    var d = __define,c=ScoreBarUI;p=c.prototype;
    //设置分数
    p.setScore = function (score) {
        //分数文本
        this.scoreText.text = score.toString();
        //分数条
        var scale = score / GameConst.totalScore;
        if (scale > 1) {
            scale = 1;
        }
        this.scoreBar.scaleX = scale;
        //当前折扣
        var len = this.zheScore.length;
        var maxIndex = -1;
        for (var i = 0; i < len; i++) {
            if (score >= this.zheScore[i]) {
                maxIndex = i;
                this.curZhe = this.zheList[maxIndex];
            }
        }
        //折扣标签高亮
        if (maxIndex != -1) {
            for (i = 0; i < len; i++) {
                this.zheUIList[i].setZhe(false);
            }
            this.zheUIList[maxIndex].setZhe(true);
        }
    };
    return ScoreBarUI;
})(egret.DisplayObjectContainer);
egret.registerClass(ScoreBarUI,"ScoreBarUI");
