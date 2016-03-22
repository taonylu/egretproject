/**
 * 排行榜
 * @author
 *
 */
var RankPanel = (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        _super.call(this, "RankPanelSkin");
        this.rankGroupList = new Array(); //排行榜
        this.rankLabelList = new Array();
        this.nameLabelList = new Array();
        this.scoreLabelList = new Array();
        this.rankLimit = 15;
        this.http = new HttpUtil();
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=RankPanel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        for (var i = 0; i < this.rankLimit; i++) {
            this.rankGroupList.push(this["rankGroup" + i]);
            this.rankLabelList.push(this["rankLabel" + i]);
            this.nameLabelList.push(this["nameLabel" + i]);
            this.scoreLabelList.push(this["scoreLabel" + i]);
        }
    };
    p.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.myTeamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.myTeamTouch, this);
        this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeTouch, this);
    };
    p.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.myTeamBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.myTeamTouch, this);
        this.prizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeTouch, this);
    };
    p.onCloseBtnTouch = function () {
        this.hide();
        GameManager.getInstance().homeScene.rankGroup.visible = true;
    };
    //我的团队
    p.myTeamTouch = function () {
        this.sendMyTeamRequest();
    };
    //获奖名单
    p.onPrizeTouch = function () {
        GameManager.getInstance().homeScene.sendPrizeRequest();
    };
    p.setView = function (data) {
        //移除之前的
        for (var i = 0; i < this.rankLimit; i++) {
            this.rankLabelList[i].text = "";
            this.nameLabelList[i].text = "";
            this.scoreLabelList[i].text = "";
        }
        this.myNameLabel0.text = "";
        this.myNameLabel1.text = "";
        this.myRankLabel0.text = "";
        this.myRankLabel1.text = "";
        this.myScoreLabel0.text = "";
        this.myScoreLabel1.text = "";
        //显示新的
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var teamName = data[i].teamName;
            var teamScore = data[i].teamScore;
            this.rankLabelList[i].text = (i + 1) + "";
            this.nameLabelList[i].text = teamName + "";
            this.scoreLabelList[i].text = teamScore + "";
        }
    };
    //发送我的团队请求
    p.sendMyTeamRequest = function () {
        egret.log("sendMyTeamRequest");
        if (GameConst.debug) {
            var json = {
                status: true,
                code: 200,
                msg: "a",
                data: [{ teamName: "A", totalScore: "1", member: [{ headImg: "", nickName: "A", score: "1" }] }]
            };
            this.revMyTeam(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revMyTeam;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = "http://wx.mcw9.com/ricolazt/teammembers";
            var msg = "_csrf=" + GameConst.csrf;
            this.http.send(url, msg, this);
        }
    };
    p.revMyTeam = function (res) {
        egret.log("revMyTeam:", res);
        var json = JSON.parse(res);
        var status = json.status; //true , false
        var code = json.code; //200成功
        var msg = json.msg; //描述消息
        if (status == true && code == 200) {
            this.hide();
            var myTeamPanel = GameManager.getInstance().myTeamPanel;
            LayerManager.getInstance().clearPopLayer();
            LayerManager.getInstance().popLayer.addChild(myTeamPanel);
            myTeamPanel.setView(json.data);
        }
        else {
            alert(msg);
        }
    };
    return RankPanel;
}(BaseUI));
egret.registerClass(RankPanel,'RankPanel');
