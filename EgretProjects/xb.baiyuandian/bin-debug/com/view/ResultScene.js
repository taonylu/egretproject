/**
 * 结果面板
 * @author
 *
 */
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        _super.call(this, "ResultSceneSkin");
        this.resultUIList = new Array();
        this.resultUILimit = 10;
    }
    var d = __define,c=ResultScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
        //初始化
        this.scoreGroup.visible = true;
        this.scoreGroup.y = (GameConst.stage.stageHeight - this.scoreGroup.height) / 2;
        this.wrongPacket.visible = false;
        this.resultGroup.visible = false;
        this.textBg0.alpha = 0;
        this.textBg1.alpha = 0;
        this.textBg2.alpha = 0;
        this.secLabel.alpha = 0;
        this.rateLabel.alpha = 0;
        this.curScoreLabel.alpha = 0;
        this.historyScoreLabel.alpha = 0;
        //移除头像
        for (var i = 0; i < this.resultUILimit; i++) {
            var resultUI = this.resultUIList[i];
            resultUI.clear();
            resultUI.parent && this.scrollerGroup.removeChild(resultUI);
        }
        this.no1.parent && this.no1.parent.removeChild(this.no1);
        this.no2.parent && this.no2.parent.removeChild(this.no2);
        this.no3.parent && this.no3.parent.removeChild(this.no3);
        //根据输赢显示分数
        var bWin = GameManager.getInstance().gameScene.bWin;
        if (bWin == false) {
            this.wrongPacket.visible = true;
            this.wrongPacket.alpha = 1;
            var self = this;
            egret.Tween.get(this.wrongPacket).wait(1200).to({ alpha: 0 }, 800).call(function () {
                self.showScore();
            }, this);
        }
        else {
            this.showScore();
        }
        //监听
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLinkBtnTouch, this);
    };
    p.onRemove = function () {
    };
    p.initView = function () {
        this.validateNow();
        this.scrollerGroup.y = (GameConst.stage.stageHeight - this.scrollerGroup.height) / 2;
        //获取结果UI
        for (var i = 0; i < this.resultUILimit; i++) {
            var resultUI = new ResultUI();
            resultUI.x = 0;
            resultUI.y = resultUI.height * i;
            this.resultUIList.push(resultUI);
            this.scrollerGroup.addChild(resultUI);
        }
    };
    p.onAgainBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    p.onShareBtnTouch = function () {
        console.log("分享");
        LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().shareUI);
    };
    p.onLinkBtnTouch = function () {
        window.location.href = "http://www.dipo.pro";
    };
    //显示分数
    p.showScore = function () {
        var gameScene = GameManager.getInstance().gameScene;
        //显示用了多少时间开了多少红包
        this.secLabel.text = (gameScene.timeLimit - gameScene.curTime).toString();
        this.curScoreLabel.text = gameScene.score.toString();
        egret.Tween.get(this.textBg0).to({ alpha: 1 }, 1000);
        egret.Tween.get(this.secLabel).to({ alpha: 1 }, 1000);
        egret.Tween.get(this.curScoreLabel).to({ alpha: 1 }, 1000);
        //显示历史最高
        GameConst.historyScore = (GameConst.historyScore > gameScene.score) ? GameConst.historyScore : gameScene.score;
        this.historyScoreLabel.text = GameConst.historyScore.toString();
        egret.Tween.get(this.textBg1).wait(1000).to({ alpha: 1 }, 1000);
        egret.Tween.get(this.historyScoreLabel).wait(1000).to({ alpha: 1 }, 1000);
        //显示打败了多少人
        var rate = Math.round(GameConst.historyScore / 3000 * 100);
        if (rate > 100) {
            rate = 100;
        }
        this.rateLabel.text = rate.toString();
        egret.Tween.get(this.textBg2).wait(2000).to({ alpha: 1 }, 1000);
        egret.Tween.get(this.rateLabel).wait(2000).to({ alpha: 1 }, 1000);
        //显示结果
        egret.Tween.get(this).wait(3200).call(this.showResult, this);
        //访问后端，提交积分，获取排行榜
        this.submitScore();
    };
    //显示结果
    p.showResult = function () {
        //隐藏时间和当前次数
        egret.Tween.get(this.textBg0).to({ alpha: 0 }, 500);
        egret.Tween.get(this.secLabel).to({ alpha: 0 }, 500);
        egret.Tween.get(this.curScoreLabel).to({ alpha: 0 }, 500);
        //上移历史最高
        var titleButtom = this.titleBg.height - 80; //110调整距离title位置
        egret.Tween.get(this.scoreGroup).wait(800).to({ y: titleButtom }, 500);
        //显示列表和按钮等
        var self = this;
        egret.Tween.get(this.resultGroup).wait(1300).call(function () {
            self.resultGroup.visible = true;
        });
    };
    //提交积分
    p.submitScore = function () {
        var http = SingleHttp.getInstance();
        http.completeHandler = this.completeHandler;
        http.errorHandler = this.errorHandler;
        var url = "";
        var msg = "money=" + GameManager.getInstance().gameScene.score;
        http.send(url, egret.HttpMethod.POST, msg, this);
        var rankList = [{ score: 1234, headUrl: "resource/assets/rule_bg.png" },
            { score: 1234, headUrl: "resource/assets/rule_bg.png" },
            { score: 1234, headUrl: "resource/assets/rule_bg.png" },
            { score: 1234, headUrl: "resource/assets/rule_bg.png" },
            { score: 1234, headUrl: "resource/assets/rule_bg.png" },
            { score: 1234, headUrl: "resource/assets/rule_bg.png" },
            { score: 1234, headUrl: "resource/assets/rule_bg.png" }];
        var len = rankList.length;
        var userInfo;
        var resultUI;
        for (var i = 0; i < len; i++) {
            userInfo = rankList[i];
            resultUI = this.resultUIList[i];
            resultUI.setLabel(userInfo.score);
            resultUI.setHead(userInfo.headUrl);
            resultUI.y = i * 110; //resultUI高100
            this.scrollerGroup.addChild(resultUI);
        }
        if (len >= 1) {
            this.scrollerGroup.addChild(this.no1);
        }
        if (len >= 2) {
            this.scrollerGroup.addChild(this.no2);
        }
        if (len >= 3) {
            this.scrollerGroup.addChild(this.no3);
        }
    };
    //获取获奖列表
    p.completeHandler = function (data) {
        var rankList = data.rankList;
        if (rankList) {
            var len = rankList.length;
            var userInfo;
            var resultUI;
            for (var i = 0; i < len; i++) {
                userInfo = rankList[i];
                resultUI = this.resultUIList[i];
                resultUI.setLabel(userInfo.score);
                resultUI.setHead(userInfo.headUrl);
                resultUI.y = i * 110; //resultUI高100
                this.scrollerGroup.addChild(resultUI);
            }
            if (len >= 1) {
                this.scrollerGroup.addChild(this.no1);
            }
            if (len >= 2) {
                this.scrollerGroup.addChild(this.no2);
            }
            if (len >= 3) {
                this.scrollerGroup.addChild(this.no3);
            }
        }
    };
    //获取获奖列表失败
    p.errorHandler = function () {
        console.log("提交分数错误");
    };
    return ResultScene;
})(BaseScene);
egret.registerClass(ResultScene,'ResultScene');
