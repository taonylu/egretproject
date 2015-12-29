/**
*  文 件 名：HomeMediator.ts
*  功    能：主页场景
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/23
*  修改日志：
*/
var HomeMediator = (function (_super) {
    __extends(HomeMediator, _super);
    function HomeMediator() {
        _super.call(this, HomeMediator.NAME);
        this.homeScene = new HomeScene();
        this.popupBoxUI = new PopupBoxUI();
    }
    var __egretProto__ = HomeMediator.prototype;
    __egretProto__.listNotificationInterests = function () {
        return [HomeMediator.SHOW, HomeMediator.SEND_START_REQUEST, HomeMediator.SHOW_POPUPBOXUI];
    };
    __egretProto__.handleNotification = function (notification) {
        switch (notification.getName()) {
            case HomeMediator.SHOW:
                this.show();
                break;
            case HomeMediator.SEND_START_REQUEST:
                this.sendStartRequest();
                break;
            case HomeMediator.SHOW_POPUPBOXUI:
                this.popupBoxUI.showMsg(notification.getBody());
                break;
        }
    };
    __egretProto__.show = function () {
        LayerManager.getInstance().runScene(this.homeScene);
        ClientSocket.getInstance().setSocketHand(this);
    };
    __egretProto__.hide = function () {
    };
    __egretProto__.onSocketConnect = function () {
        this.homeScene.loadingUI.hide();
    };
    __egretProto__.onSocketError = function () {
        this.homeScene.loadingUI.hide();
        this.popupBoxUI.showMsg("网络连接错误...");
    };
    __egretProto__.onSocketClose = function () {
        this.homeScene.loadingUI.hide();
    };
    __egretProto__.onSocketConnectTimeOver = function () {
        this.popupBoxUI.showMsg("网络连接超时...");
    };
    __egretProto__.onSocketData = function (json) {
        switch (json.cmd) {
            case NetConst.START_REQUEST:
                this.revStartGame(json);
                break;
            case NetConst.LOGIN_REQUEST:
                this.revloginReturn(json);
                break;
        }
    };
    __egretProto__.sendStartRequest = function () {
        var userName = this.homeScene.nameLabel.text;
        var userM = UserManager.getInstance();
        userM.userName = userName;
        var json = JSONManager.getInstance().startRequset;
        json.cmd = NetConst.START_REQUEST;
        json.usertype = userM.userType;
        json.userid = userM.userID;
        json.username = StringTool.mixToUnicode(userName);
        json.skinid = NumberTool.getRandomInt(1, GameConst.SkinKindCount);
        ClientSocket.getInstance().send(json);
    };
    __egretProto__.revStartGame = function (json) {
        if (json.errorcode == 0) {
            ClientSocket.getInstance().setSocketHand(this.facade.retrieveMediator(GameMediator.NAME));
            JSONManager.getInstance().gameData = json;
            UserManager.getInstance().userID = json.hero[0];
            this.sendNotification(LoadingMediator.SHOW);
        }
        else {
            this.popupBoxUI.showMsg("开始游戏失败...");
        }
    };
    __egretProto__.revloginReturn = function (json) {
        console.log("返回登录:", json.cmd, json.success, json.errorcode);
    };
    HomeMediator.NAME = "HomeMediator";
    HomeMediator.SHOW = "HomeMediator_SHOW";
    HomeMediator.SEND_START_REQUEST = "SEND_START_REQUEST";
    HomeMediator.SHOW_POPUPBOXUI = "SHOW_POPUPBOXUI";
    return HomeMediator;
})(puremvc.Mediator);
HomeMediator.prototype.__class__ = "HomeMediator";
