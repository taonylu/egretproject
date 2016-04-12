/**
 * 结果场景
 * @author
 *
 */
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        _super.call(this, "ResultSceneSkin");
        this.scoreHeadList = new Array(); //排名123头像
        this.rankHeadList = new Array(); //排名1-10头像
        this.countDownTimer = new egret.Timer(1000);
        this.countDownLimit = 0;
    }
    var d = __define,c=ResultScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        //初始化排名123头像
        for (var i = 0; i < 3; i++) {
            this.scoreHeadList.push(this["scoreHead" + i]);
        }
        //初始化排名1-10头像
        for (var i = 0; i < 10; i++) {
            this.rankHeadList.push(this["rankHead" + i]);
        }
        this.countDownLimit = GameConst.gameCofig.resultTime;
    };
    p.onEnable = function () {
        this.showResult();
    };
    p.showResult = function () {
        var data = GameManager.getInstance().gameScene.resultData;
        var gameRankList = data.gameRankList;
        var rankList = data.rankList;
        var gameRankList = data.gameRankList;
        //清理123排名
        for (var i = 0; i < 3; i++) {
            this.scoreHeadList[i].clear();
        }
        //显示123排名
        var len = gameRankList.length;
        for (var i = 0; i < len; i++) {
            var scoreHead = this.scoreHeadList[i];
            scoreHead.setNameLabel(gameRankList[i].nickName);
            scoreHead.loadImg(gameRankList[i].headUrl);
            scoreHead.setScoreLabel("得分：" + gameRankList[i].score + " 排名：" + gameRankList[i].rank);
        }
        //清理1-10排名
        for (var i = 0; i < 10; i++) {
            this.rankHeadList[i].clear();
        }
        //显示1-10排名
        len = rankList.length;
        for (var i = 0; i < len; i++) {
            var rankHead = this.rankHeadList[i];
            rankHead.setNameLabel(rankList[i].nickName);
            rankHead.setScoreLabel(rankList[i].score);
            rankHead.setRankLabel(i + 1);
            rankHead.loadImg(rankList[i].headUrl);
        }
        //倒计时
        this.countDownLabel.text = "";
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHander, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    };
    p.onTimerHander = function () {
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        if (count <= 0) {
            this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHander, this);
            this.countDownTimer.stop();
            //清理用户列表
            UserManager.getInstance().clearAllUser();
            //跳转场景
            LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
        }
        this.countDownLabel.text = count + "";
    };
    return ResultScene;
}(BaseScene));
egret.registerClass(ResultScene,'ResultScene');
