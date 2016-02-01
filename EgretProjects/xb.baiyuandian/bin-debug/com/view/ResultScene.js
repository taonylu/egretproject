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
        this.textBg00.alpha = 0;
        this.textBg01.alpha = 0;
        this.textBg02.alpha = 0;
        this.textBg1.alpha = 0;
        this.textBg2.alpha = 0;
        this.secLabel.alpha = 0;
        this.secLabel.text = "";
        this.rateLabel.alpha = 0;
        this.rateLabel.text = "";
        this.curScoreLabel.alpha = 0;
        this.curScoreLabel.text = "";
        this.historyScoreLabel.alpha = 0;
        this.historyScoreLabel.text = "";
        //随机显示文本
        this.textBg0 = this["textBg0" + NumberTool.getRandomInt(0, 2)];
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
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
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
    p.onRuleBtnTouch = function () {
        LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().ruleUI);
    };
    //显示分数
    p.showScore = function () {
        //访问后端，提交积分，获取排行榜
        this.submitScore();
        var gameScene = GameManager.getInstance().gameScene;
        //显示用了多少时间开了多少红包
        this.secLabel.text = (gameScene.timeLimit - gameScene.curTime).toString();
        this.curScoreLabel.text = gameScene.score.toString();
        egret.Tween.get(this.textBg0).to({ alpha: 1 }, 1000);
        egret.Tween.get(this.secLabel).to({ alpha: 1 }, 1000);
        egret.Tween.get(this.curScoreLabel).to({ alpha: 1 }, 1000);
        //显示历史最高
        GameConst.historyScore = (GameConst.historyScore > gameScene.score) ? GameConst.historyScore : gameScene.score;
        //        this.historyScoreLabel.text = GameConst.historyScore.toString();
        egret.Tween.get(this.textBg1).wait(1000).to({ alpha: 1 }, 1000);
        egret.Tween.get(this.historyScoreLabel).wait(1000).to({ alpha: 1 }, 1000);
        //显示打败了多少人
        //this.rateLabel.text = "";
        //        var rate: number = Math.round(GameConst.historyScore / 3000 * 100);
        //        if(rate > 100){
        //            rate = 100;
        //        }
        //        this.rateLabel.text = rate.toString();
        egret.Tween.get(this.textBg2).wait(2000).to({ alpha: 1 }, 1000);
        egret.Tween.get(this.rateLabel).wait(2000).to({ alpha: 1 }, 1000);
        //显示结果
        egret.Tween.get(this).wait(3200).call(this.showResult, this);
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
        var url = "" + window["url"];
        var score = "score=" + GameManager.getInstance().gameScene.score;
        var csrf = "&_csrf=" + window["_csrf"];
        var sign = "&sign=" + window["sign"];
        var msg = score + csrf + sign;
        http.send(url, egret.HttpMethod.POST, msg, this);
    };
    //返回获奖列表
    p.completeHandler = function (data) {
        console.log("接收返回数据:" + data);
        var json = JSON.parse(data);
        var rankList = json.rankList; //获取排行榜列表
        var success = json.success; //是否成功
        var historyScore = json.historyScore; //历史最高分数
        var msg = json.msg; //错误消息
        var rank = json.rank; //自己排名
        var count = json.count; //总人数
        console.log("rankList:", rankList);
        console.log("success:", success);
        console.log("msg:", msg);
        egret.log("rank:", rank);
        egret.log("count:", count);
        egret.log(GameConst.historyScore);
        if (success != true) {
            alert(msg);
            return;
        }
        if (rankList) {
            var len = rankList.length;
            var userInfo;
            var resultUI;
            for (var i = 0; i < len; i++) {
                userInfo = rankList[i];
                resultUI = this.resultUIList[i];
                resultUI.setLabel(userInfo.score); //获取玩家分数
                resultUI.setHead(userInfo.headUrl); //获取玩家头像地址
                resultUI.y = i * 110;
                this.scrollerGroup.addChild(resultUI);
            }
            //显示打败多少人
            if (count <= 1) {
                this.rateLabel.text = "100";
            }
            else {
                this.rateLabel.text = Math.round((count - rank) / (count - 1) * 100) + "";
            }
            //显示历史最高
            if (historyScore < GameConst.historyScore) {
                this.historyScoreLabel.text = GameConst.historyScore + "";
            }
            else {
                GameConst.historyScore = historyScore;
                this.historyScoreLabel.text = historyScore + "";
            }
            //显示no排名小图标
            if (len >= 1) {
                this.scrollerGroup.addChild(this.no1);
            }
            if (len >= 2) {
                this.scrollerGroup.addChild(this.no2);
            }
            if (len >= 3) {
                this.scrollerGroup.addChild(this.no3);
            }
            //分享文案
            var str1 = ["太棒了", "太厉害了", "真行"];
            var str2 = "!你从财神爷那里开了" + GameConst.historyScore + "个金币,2016年";
            var str3 = ["财运滚滚", "财运亨通", "日进斗金", "和气生财", "招财进宝"];
            var str4 = "，打败了" + this.rateLabel.text + "%的西班牙同胞";
            window["shareText"] = str1[NumberTool.getRandomInt(0, 2)] + str2 + str3[NumberTool.getRandomInt(0, 4)] + str4;
            window["wxshare"]();
            egret.log(window["shareText"]);
        }
    };
    //获取获奖列表失败
    p.errorHandler = function () {
        alert("提交地址错误");
    };
    return ResultScene;
})(BaseScene);
egret.registerClass(ResultScene,'ResultScene');
