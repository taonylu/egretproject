/**
 * 结果场景
 * @author
 *
 */
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        _super.call(this, "ResultSceneSkin");
        this.countDownTime = 10000;
    }
    var d = __define,c=ResultScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.countDownTime = GameConst.gameConfig.resultCountDown * 1000;
    };
    p.onEnable = function () {
        window["changeBgColor"](GameConst.color0);
    };
    //清理结果页面
    p.clear = function () {
        for (var i = 0; i < 4; i++) {
            this["p1Tank" + i + "Label"].text = "";
            this["p2Tank" + i + "Label"].text = "";
            this["p1Score" + i + "Label"].text = "";
            this["p2Score" + i + "Label"].text = "";
        }
        this.p1TotalLabel.text = "";
        this.p2TotalLabel.text = "";
        this.historyLabel.text = "";
    };
    /**
     *设置结果界面
     *@data 传递参数
     *@bGameOver true游戏结束  false下一关
     *@bEndLess 是否无尽模式
     */
    p.setResult = function (data, bGameOver, bEndLess) {
        if (bEndLess === void 0) { bEndLess = false; }
        this.clear();
        //历史最高分
        this.historyLabel.text = data.historyScore + "";
        //第几关
        this.stageLabel.text = "STAGE" + data.stage;
        //第几波
        if (bEndLess) {
            this.waveLabel.text = "WAVE." + data.wave;
        }
        else {
            this.waveLabel.text = "";
        }
        //击杀列表
        var killList = data.killList;
        var totalKillList = data.totalKillList;
        //总分
        var userNum = UserManager.getInstance().getUserNum();
        if (userNum >= 1) {
            this.p1ScoreLabel.text = data.totalScore[0] + "";
            this.p2ScoreGroup.visible = false;
            this.p2ScoreLabel.text = "";
        }
        if (userNum == 2) {
            this.p2ScoreGroup.visible = true;
            this.p2ScoreLabel.text = data.totalScore[1] + "";
        }
        var p1kill = 0; //本关击杀
        var p2kill = 0;
        for (var i = 0; i < 4; i++) {
            p1kill += killList[0][i];
            p2kill += killList[1][i];
        }
        //游戏结束，才能显示击杀和英雄榜
        if (bGameOver && data.success == true) {
            this.rankGroup.visible = true;
            //英雄榜
            var userManager = UserManager.getInstance();
            var userList = userManager.userList;
            var userNum = userList.length;
            if (userNum >= 1) {
                this.p1RankHead.loadImg(userList[0].headimgurl);
            }
            if (userNum == 2) {
                this.p2RankHead.loadImg(userList[1].headimgurl);
            }
            this.rankLabel.text = data.heroRank + "";
            //击杀榜
            if (userNum >= 1) {
                this.p1KillHead.loadImg(userList[0].headimgurl);
            }
            if (userNum == 2) {
                this.p2KillHead.loadImg(userList[1].headimgurl);
            }
            if (data.p1KillRank != 0) {
                this.p1Kill0Label.visible = true;
                this.p1Kill1Label.visible = true;
            }
            else {
                this.p1Kill0Label.visible = false;
                this.p1Kill1Label.visible = false;
            }
            this.p1KillLabel.text = data.p1KillRank + "";
            if (data.p2KillRank != 0) {
                this.p2Kill0Label.visible = true;
                this.p2Kill1Label.visible = true;
            }
            else {
                this.p2Kill0Label.visible = false;
                this.p2Kill1Label.visible = false;
            }
            if (userNum == 2) {
                this.p2KillLabel.text = data.p2KillRank + "";
            }
            else {
                this.p2KillLabel.text = "";
            }
        }
        else {
            this.rankGroup.visible = false;
        }
        //击毁坦克数量
        var self = this;
        egret.Tween.get(this).wait(500).call(function () {
            self.p1Score0Label.text = killList[0][0] * 100 + "";
            self.p1Tank0Label.text = killList[0][0] + "";
            self.p2Score0Label.text = killList[1][0] * 100 + "";
            self.p2Tank0Label.text = killList[1][0] + "";
        }).wait(500).call(function () {
            self.p1Score1Label.text = killList[0][1] * 200 + "";
            self.p1Tank1Label.text = killList[0][1] + "";
            self.p2Score1Label.text = killList[1][1] * 200 + "";
            self.p2Tank1Label.text = killList[1][1] + "";
        }).wait(500).call(function () {
            self.p1Score2Label.text = killList[0][2] * 300 + "";
            self.p1Tank2Label.text = killList[0][2] + "";
            self.p2Score2Label.text = killList[1][2] * 300 + "";
            self.p2Tank2Label.text = killList[1][2] + "";
        }).wait(500).call(function () {
            self.p1Score3Label.text = killList[0][3] * 400 + "";
            self.p1Tank3Label.text = killList[0][3] + "";
            self.p2Score3Label.text = killList[1][3] * 400 + "";
            self.p2Tank3Label.text = killList[1][3] + "";
        }).wait(500).call(function () {
            self.p1TotalLabel.text = p1kill + "";
            self.p2TotalLabel.text = p2kill + "";
        }).wait(this.countDownTime).call(function () {
            //游戏结束则回到首页，否则进入下一关
            if (bGameOver) {
                MapManager.getInstance().curLevel = 1;
                LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
            }
            else {
                MapManager.getInstance().curLevel += 1;
                LayerManager.getInstance().runScene(GameManager.getInstance().transitionScene);
            }
        });
    };
    return ResultScene;
}(BaseScene));
egret.registerClass(ResultScene,'ResultScene');
