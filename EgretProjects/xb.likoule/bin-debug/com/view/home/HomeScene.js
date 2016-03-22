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
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        //隐藏
        this.acceptGroup.visible = false;
        this.invitFailGroup.visible = false;
        this.beginGroup.visible = false;
        this.rankGroup.visible = true;
        //TODO 根据获取的变量显示Group
        var invitInfo = GameConst.invitInfo;
        if (invitInfo.isInvit) {
            this.acceptGroup.visible = true;
            this.acceptLabel.text = invitInfo.name + " 邀请你参加" + invitInfo.teamName + "队伍";
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
                LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
                break;
            case this.teamBtn:
                this.sendTeamRequest();
                break;
            case this.rankBtn:
                this.sendRankRequest();
                break;
            case this.prizeBtn:
                this.sendPrizeRequest();
                break;
        }
    };
    //发送接收邀请
    p.sendAcceptRequest = function () {
        egret.log("sendAccept");
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
            var url = "http://wx.mcw9.com/ricolazt/acceptinvitation";
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
        }
        else {
            this.invitFailGroup.visible = true;
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
            var url = "http://wx.mcw9.com/ricolazt/createteam ";
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
            //显示分享页面
            this.addChild(GameManager.getInstance().sharePanel);
        }
        else {
            alert(msg);
        }
    };
    //发送排行榜
    p.sendRankRequest = function () {
        this.rankGroup.visible = false;
        egret.log("sendRank");
        if (GameConst.debug) {
            var json = { status: true, code: 200, data: [{ teamName: "队名1", teamScore: '分数' }, { teamName: "队名2", teamScore: '分数' }] };
            this.revRank(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revRank;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = "http://wx.mcw9.com/ricolazt/gamerank";
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
                data: { weekRank: [{ teamName: "ABCD", teamScore: 123 }, { teamName: "BCDE", teamScore: 321 }],
                    rankWin: [{ teamName: "EEEE", teamScore: 111 }, { teamName: "BBBB", teamScore: 222 }] } };
            this.revPrize(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revPrize;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = "http://wx.mcw9.com/ricolazt/winners";
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
