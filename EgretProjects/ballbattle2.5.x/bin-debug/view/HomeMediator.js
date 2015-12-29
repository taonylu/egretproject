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
    var d = __define,c=HomeMediator;p=c.prototype;
    p.listNotificationInterests = function () {
        return [HomeMediator.SHOW, HomeMediator.SEND_START_REQUEST, HomeMediator.SHOW_POPUPBOXUI];
    };
    p.handleNotification = function (notification) {
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
    p.show = function () {
        LayerManager.getInstance().runScene(this.homeScene);
        ClientSocket.getInstance().setSocketHand(this);
    };
    p.hide = function () {
    };
    p.onSocketConnect = function () {
        this.homeScene.loadingUI.hide();
    };
    p.onSocketError = function () {
        this.homeScene.loadingUI.hide();
        this.popupBoxUI.showMsg("网络连接错误...");
    };
    p.onSocketClose = function () {
        this.homeScene.loadingUI.hide();
    };
    p.onSocketConnectTimeOver = function () {
        this.popupBoxUI.showMsg("网络连接超时...");
    };
    p.onSocketData = function (cmd, byteArray) {
        switch (cmd) {
            case NetConst.START_REQUEST:
                this.revStartGame(byteArray);
                break;
            case NetConst.LOGIN_REQUEST:
                this.revloginReturn(byteArray);
                break;
        }
    };
    //发送游戏开始
    p.sendStartRequest = function () {
        var userName = this.homeScene.nameLabel.text;
        var userM = UserManager.getInstance();
        userM.userName = userName;
        var data = new SendStartGame();
        data.cmd = NetConst.START_REQUEST;
        data.usertype = userM.userType;
        data.userid = userM.userID;
        data.username = StringTool.mixToUnicode(userName);
        data.skinid = NumberTool.getRandomInt(1, GameConst.SkinKindCount);
        ClientSocket.getInstance().send(data);
    };
    //接收游戏开始
    p.revStartGame = function (byteArray) {
        var data = this.facade.retrieveProxy(RevStartGame.NAME);
        data.readData(byteArray);
        if (data.errorcode == 0) {
            ClientSocket.getInstance().setSocketHand(this.facade.retrieveMediator(GameMediator.NAME));
            UserManager.getInstance().userID = data.userid;
            this.sendNotification(GameMediator.SHOW);
        }
        else {
            this.popupBoxUI.showMsg("开始游戏失败...");
        }
    };
    p.revloginReturn = function (json) {
        console.log("返回登录:", json.cmd, json.success, json.errorcode);
    };
    HomeMediator.NAME = "HomeMediator";
    HomeMediator.SHOW = "HomeMediator_SHOW";
    HomeMediator.SEND_START_REQUEST = "SEND_START_REQUEST";
    HomeMediator.SHOW_POPUPBOXUI = "SHOW_POPUPBOXUI";
    return HomeMediator;
})(puremvc.Mediator);
egret.registerClass(HomeMediator,"HomeMediator",["puremvc.IMediator","puremvc.INotifier","ISocketHand"]);
