/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.http = new HttpUtil(); //请求
        this.bFirstEnter = true; //首次进入，显示接收请求
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        window["playBGM"]();
    };
    p.onEnable = function () {
        //隐藏
        this.acceptGroup.visible = false;
        this.invitFailGroup.visible = false;
        this.beginGroup.visible = false;
        this.rankGroup.visible = true;
        //TODO 根据获取的变量显示Group
        var invitInfo = GameConst.invitInfo;
        if (this.bFirstEnter && invitInfo.isInvit) {
            this.bFirstEnter = false;
            this.acceptGroup.visible = true;
            this.acceptLabel.text = invitInfo.nickName + " 邀请你参加" + invitInfo.teamName + "队伍";
        }
        else {
            this.beginGroup.visible = true;
        }
        this.configListeners();
    };
    p.onRemove = function () {
    };
    p.configListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.deConfigListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.onTouchTap = function (e) {
        switch (e.target) {
            case this.acceptBtn:
                this.sendAcceptRequest();
                break;
            case this.ruleBtn: //点击游戏规则
            case this.ruleBtn2:
                this.addChild(GameManager.getInstance().rulePanel);
                break;
            case this.closeInvitBtn:
                this.invitFailGroup.visible = false;
                this.beginGroup.visible = true;
                break;
            case this.beginBtn:
                //if(GameConst.teamName == ""){ //没有队伍时，会发送组队请求
                this.sendStartGame();
                //}else{
                //  LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
                //}
                break;
            case this.teamBtn:
                this.sendTeamRequest();
                break;
            case this.rankBtn:
                this.sendRankRequest();
                break;
            case this.prizeBtn:
                GameConst.prizeLastView = this;
                this.sendPrizeRequest();
                break;
        }
    };
    //发送接收邀请
    p.sendAcceptRequest = function () {
        egret.log("sendAccept,teamName=", GameConst.invitInfo.teamName);
        if (GameConst.debug) {
            var json = {
                status: false,
                code: 400,
                msg: "失败"
            };
            this.revAccept(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revAccept;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = window["httpUrl"] + "acceptinvitation";
            var msg = "_csrf=" + GameConst.csrf + "&teamName=" + GameConst.invitInfo.teamName;
            this.http.send(url, msg, this);
        }
    };
    p.revAccept = function (res) {
        egret.log("revAccept:", res);
        var json = JSON.parse(res);
        var status = json.status; //true , false
        var code = json.code; //200成功
        var msg = json.msg; //描述消息
        this.acceptGroup.visible = false;
        //接收邀请成功
        if (status == true && code == 200) {
            this.beginGroup.visible = true;
            GameConst.teamName = GameConst.invitInfo.teamName;
        }
        else {
            GameConst.teamName = "";
            this.invitFailGroup.visible = true;
            this.invitFailLabel.text = msg;
        }
    };
    //发送开始游戏
    p.sendStartGame = function () {
        egret.log("sendStartGame");
        if (GameConst.debug) {
            var json = { status: true, code: 200, msg: "aa", data: { teamName: "ABCD", validSigne: {
                        keyword: "", timestamp: 123, signature: "" } } };
            this.revStartGame(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revStartGame;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = window["httpUrl"] + "createteam ";
            var msg = "_csrf=" + GameConst.csrf;
            this.http.send(url, msg, this);
        }
    };
    p.revStartGame = function (res) {
        egret.log("revStartGame:", res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        //创建队伍成功
        if (status == true && code == 200) {
            //获取队伍名
            GameConst.teamName = data.teamName;
            //获取验证信息
            GameConst.validSigne.keyword = data.validSigne.keyword;
            GameConst.validSigne.timestamp = data.validSigne.timestamp;
            GameConst.validSigne.signature = data.validSigne.signature;
            //开始游戏
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
            window["tn"] = GameConst.teamName;
            window["nick"] = GameConst.myName;
            window["wxshare"]();
        }
        else {
            alert(msg);
        }
    };
    //发送组队请求
    p.sendTeamRequest = function () {
        egret.log("sendTeam");
        if (GameConst.debug) {
            var json = { status: true, code: 200, msg: "aa", data: { teamName: "ABCD" } };
            this.revTeam(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revTeam;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = window["httpUrl"] + "createteam ";
            var msg = "_csrf=" + GameConst.csrf;
            this.http.send(url, msg, this);
        }
    };
    p.revTeam = function (res) {
        egret.log("revTeam:", res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        //创建队伍成功
        if (status == true && code == 200) {
            //获取队伍名
            GameConst.teamName = data.teamName;
            window["tn"] = GameConst.teamName;
            window["nick"] = GameConst.myName;
            window["wxshare"]();
            //显示分享页面
            this.addChild(GameManager.getInstance().sharePanel);
        }
        else {
            alert(msg);
        }
    };
    //发送排行榜
    p.sendRankRequest = function () {
        egret.log("sendRank");
        if (GameConst.debug) {
            var json = { status: true, code: 200, data: [
                    { teamName: "队名1", teamScore: '分数' },
                    { teamName: "队名2", teamScore: '分数' },
                    { teamName: "队名3", teamScore: '分数' },
                    { teamName: "队名4", teamScore: '分数' },
                    { teamName: "队名5", teamScore: '分数' },
                    { teamName: "队名6", teamScore: '分数' },
                    { teamName: "队名7", teamScore: '分数' },
                    { teamName: "队名8", teamScore: '分数' },
                    { teamName: "队名9", teamScore: '分数' },
                    { teamName: "队名10", teamScore: '分数' },
                    { teamName: "队名11", teamScore: '分数' },
                    { teamName: "队名12", teamScore: '分数' },
                    { teamName: "队名13", teamScore: '分数' },
                    { teamName: "队名14", teamScore: '分数' },
                    { teamName: "队名15", teamScore: '分数' },
                    { teamName: "队名16", teamScore: '分数' }
                ] };
            this.revRank(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revRank;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = window["httpUrl"] + "gamerank";
            var msg = "_csrf=" + GameConst.csrf;
            this.http.send(url, msg, this);
        }
    };
    p.revRank = function (res) {
        egret.log("revRank:", res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        //查看排行榜成功
        if (status == true && code == 200) {
            this.rankGroup.visible = false;
            var rankPanel = GameManager.getInstance().rankPanel;
            LayerManager.getInstance().popLayer.addChild(rankPanel);
            rankPanel.setView(data);
        }
        else {
            this.rankGroup.visible = true;
            alert(msg);
        }
    };
    //发送获奖名单
    p.sendPrizeRequest = function () {
        egret.log("sendPrize");
        if (GameConst.debug) {
            var json = { status: true, code: 200, msg: "",
                data: {
                    weekRank: [
                        { teamName: "ABCD", teamScore: 123 },
                        { teamName: "BCDE", teamScore: 321 },
                        { teamName: "BCDE", teamScore: 321 },
                        { teamName: "BCDE", teamScore: 321 },
                        { teamName: "BCDE", teamScore: 321 },
                        { teamName: "BCDE", teamScore: 321 },
                        { teamName: "ECDE", teamScore: 321 }
                    ],
                    rankWin: [
                        { teamName: "EEEE", teamScore: 111 },
                        { teamName: "BBBB", teamScore: 222 },
                        { teamName: "BBBB", teamScore: 222 },
                        { teamName: "CBBB", teamScore: 222 },
                        { teamName: "ABBB", teamScore: 222 },
                    ]
                } };
            this.revPrize(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revPrize;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = window["httpUrl"] + "winners";
            var msg = "_csrf=" + GameConst.csrf;
            this.http.send(url, msg, this);
        }
    };
    p.revPrize = function (res) {
        egret.log("revPrize:", res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        //查看获奖名单成功
        if (status == true && code == 200) {
            var prizePanel = GameManager.getInstance().prizePanel;
            LayerManager.getInstance().clearPopLayer();
            LayerManager.getInstance().popLayer.addChild(prizePanel);
            prizePanel.setView(data);
        }
        else {
            alert(msg);
        }
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
