/**
 * 结算页面
 * @author
 *
 */
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        _super.call(this, "ResultSceneSkin");
        this.headList = new Array(); //结算页面，本次游戏头像
        this.rankList = new Array(); //排行榜头像、昵称等
    }
    var d = __define,c=ResultScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.headList.push(this.head0, this.head1, this.head2);
        for (var i = 0; i < 10; i++) {
            this.rankList.push(this["rank" + i]);
        }
    };
    p.onEnable = function () {
        this.showResult(GameManager.getInstance().gameScene.resultData);
    };
    p.onRemove = function () {
    };
    p.showResult = function (data) {
        var scoreList = data.scoreList;
        var rankList = data.rankList;
        //清理头像
        var len = this.headList.length;
        for (var i = 0; i < len; i++) {
            var head = this.headList[i];
            head.clear();
        }
        //显示本次游戏玩家分数
        len = scoreList.length;
        for (var i = 0; i < len; i++) {
            this.headList[i].setNameLabel(scoreList[i].nickName);
            this.headList[i].setScoreLabel(scoreList[i].score);
            this.headList[i].loadImg(scoreList[i].headUrl);
            this.headList[i].setRankLabel(scoreList[i].rank);
        }
        //清理历史排行
        for (var i = 0; i < 10; i++) {
            var rankHead = this.rankList[i];
            rankHead.clear();
        }
        //显示历史排行榜
        len = rankList.length;
        len = (len > 10) ? 10 : len;
        for (var i = 0; i < len; i++) {
            var rankData = rankList[i];
            var rankHead = this.rankList[i];
            rankHead.setNameLabel(rankData.nickName);
            rankHead.setScoreLabel(rankData.score);
            rankHead.loadImg(rankData.headUrl);
            rankHead.setRankLabel(i + 1);
        }
    };
    return ResultScene;
}(BaseScene));
egret.registerClass(ResultScene,'ResultScene');
