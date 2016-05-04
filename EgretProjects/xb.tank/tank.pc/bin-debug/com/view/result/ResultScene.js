/**
 * 结果场景
 * @author
 *
 */
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        _super.call(this, "ResultSceneSkin");
    }
    var d = __define,c=ResultScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
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
    };
    //设置结果界面 bGameOver true游戏结束  false下一关
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
        if (UserManager.getInstance().getUserNum() == 1) {
            this.p2ScoreGroup.visible = false;
        }
        else {
            this.p2ScoreGroup.visible = true;
        }
        var p1Score = 0; //总分
        var p2Score = 0;
        var p1kill = 0; //本关击杀
        var p2kill = 0;
        for (var i = 0; i < 4; i++) {
            p1Score += totalKillList[0][i] * (i + 1) * 100;
            p2Score += totalKillList[1][i] * (i + 1) * 100;
            p1kill += killList[0][i];
            p2kill += killList[1][i];
        }
        this.p1ScoreLabel.text = p1Score + "";
        this.p2ScoreLabel.text = p2Score + "";
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
        }).wait(5000).call(function () {
            //游戏结束则回到首页，否则进入下一关
            if (bGameOver) {
                MapManager.getInstance().curLevel = 1;
                LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
            }
            else {
                MapManager.getInstance().curLevel += 1;
                LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
            }
        });
        //游戏结束，才能显示击杀和英雄榜
        if (bGameOver) {
            this.rankGroup.visible = true;
            //英雄榜
            this.p1RankHead.loadImg(data.p1RankHeadUrl);
            this.p2RankHead.loadImg(data.p2RankHeadUrl);
            this.rankLabel.text = data.scoreRank + "";
            //击杀榜
            this.p1KillHead.loadImg(data.p1KillHeadUrl);
            this.p2KillHead.loadImg(data.p2KillHeadUrl);
            if (data.p1Kill != "") {
                this.p1Kill0Label.visible = true;
                this.p1Kill1Label.visible = true;
            }
            else {
                this.p1Kill0Label.visible = false;
                this.p1Kill1Label.visible = false;
            }
            this.p1KillLabel.text = data.p1KillRank + "";
            if (data.p2Kill != "") {
                this.p2Kill0Label.visible = true;
                this.p2Kill1Label.visible = true;
            }
            else {
                this.p2Kill0Label.visible = false;
                this.p2Kill1Label.visible = false;
            }
            this.p2KillLabel.text = data.p2KillRank + "";
        }
        else {
            this.rankGroup.visible = false;
        }
    };
    return ResultScene;
}(BaseScene));
egret.registerClass(ResultScene,'ResultScene');