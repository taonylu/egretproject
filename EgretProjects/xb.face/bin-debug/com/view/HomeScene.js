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
        this.configListeners();
    };
    p.onRemove = function () {
    };
    /////////////////////////////////////
    //-------------[事件处理]----------------
    /////////////////////////////////////
    p.configListeners = function () {
        this.newTeamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNewTeamTouch, this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch, this);
        this.winnerListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWinnerListBtnTouch, this);
        this.myTeamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMyTeamBtnTouch, this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
    };
    p.deConfigListeners = function () {
        this.newTeamBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNewTeamTouch, this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch, this);
        this.winnerListBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWinnerListBtnTouch, this);
        this.myTeamBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMyTeamBtnTouch, this);
        this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
    };
    //我要开团
    p.onNewTeamTouch = function () {
        egret.log("send new team");
        this.http.completeHandler = this.revNewTeam;
        this.http.httpMethod = egret.HttpMethod.POST;
        this.http.send("http://wx.mcw9.com/face360/createteam", "_csrf=" + GameConst.csrf, this);
    };
    p.revNewTeam = function (res) {
        egret.log("rev new team:", res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        if (code == 200) {
            var data = json.data;
            var teamName = data.teamName;
            MyTeam.getInstance().myTeamName = teamName;
            //TODO 跳转到上传图片页面
            LayerManager.getInstance().runScene(GameManager.getInstance().editFaceScene);
        }
        else {
        }
    };
    //排行榜
    p.onRankBtnTouch = function () {
        egret.log("send rank");
        this.http.completeHandler = this.revRank;
        this.http.httpMethod = egret.HttpMethod.POST;
        this.http.send("http://wx.mcw9.com/face360/gamerank", "_csrf=" + GameConst.csrf, this);
    };
    p.revRank = function (res) {
        egret.log("rev rank:", res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        if (code == 200) {
            var len = data.length;
            for (var i = 0; i < len; i++) {
                var obj = data[i];
                for (var key in obj) {
                }
            }
        }
        else {
        }
    };
    //获奖名单
    p.onWinnerListBtnTouch = function () {
        egret.log("send winners");
        this.http.completeHandler = this.revWinner;
        this.http.httpMethod = egret.HttpMethod.POST;
        this.http.send("http://wx.mcw9.com/face360/winners", "_csrf=" + GameConst.csrf, this);
    };
    p.revWinner = function (res) {
        egret.log("rev winners:", res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        var data = json.data;
        if (code == 200) {
            var isWinner = data.isWiner;
            var winList = data.winList;
            var len = winList.length;
            for (var i = 0; i < len; i++) {
                var obj = winList[i];
                for (var key in obj) {
                }
            }
        }
        else {
        }
    };
    //我的团队
    p.onMyTeamBtnTouch = function () {
        egret.log("send myTeam");
        this.http.completeHandler = this.revMyTeam;
        this.http.httpMethod = egret.HttpMethod.GET;
        this.http.send("http://wx.mcw9.com/face360/teammembers", "_csrf=" + GameConst.csrf, this);
    };
    p.revMyTeam = function (res) {
        egret.log("rev myTeam:", res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        if (code == 200) {
            var data = json.data;
            for (var teamName in data) {
                MyTeam.getInstance().myTeamName = teamName;
            }
            //TODO goto myteam scene
            //LayerManager.getInstance().runScene(GameManager.getInstance().myTeamScene);
            LayerManager.getInstance().runScene(GameManager.getInstance().editFaceScene);
        }
        else {
        }
    };
    //游戏规则
    p.onRuleBtnTouch = function () {
    };
    //接口测试
    p.test = function () {
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
