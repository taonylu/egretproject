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
        this.no1.parent && this.no1.parent.removeChild(this.no1);
        this.no2.parent && this.no2.parent.removeChild(this.no2);
        this.no3.parent && this.no3.parent.removeChild(this.no3);
        //监听
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLinkBtnTouch, this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
        //显示排行榜
        this.showRank();
    };
    p.onRemove = function () {
        //隐藏排行榜
        var len = this.resultUIList.length;
        for (var i = 0; i < len; i++) {
            var resultUI = this.resultUIList[i];
            resultUI.clear();
            resultUI.parent && resultUI.parent.removeChild(resultUI);
        }
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
    //显示排行榜
    p.showRank = function () {
        var json = GameConst.rankJson;
        var rankList = json.rankList; //获取排行榜列表
        var success = json.success; //是否成功
        var historyScore = json.historyScore; //历史最高分数
        var msg = json.msg; //错误消息
        var rank = json.rank; //自己排名
        var count = json.count; //总人数
        egret.log("rankList:", rankList);
        egret.log("success:", success);
        egret.log("msg:", msg);
        egret.log("rank:", rank);
        egret.log("count:", count);
        egret.log("history:", historyScore);
        if (success != true) {
            alert(msg);
            return;
        }
        if (rankList) {
            var len = rankList.length;
            len = (len > 10) ? 10 : len;
            var userInfo;
            var resultUI;
            for (var i = 0; i < len; i++) {
                userInfo = rankList[i];
                resultUI = this.resultUIList[i];
                resultUI.setScoreLabel(userInfo.score); //获取玩家分数
                resultUI.setTelLabel(userInfo.headUrl); //获取玩家头像地址（修改成电话号码）
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
        }
    };
    return ResultScene;
})(BaseScene);
egret.registerClass(ResultScene,'ResultScene');
