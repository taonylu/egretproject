/**
*  文 件 名：HomeMediator.ts
*  功    能：开始页面
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
var HomeMediator = (function (_super) {
    __extends(HomeMediator, _super);
    function HomeMediator() {
        _super.call(this, HomeMediator.NAME);
        this.homeScene = new HomeScene();
    }
    var __egretProto__ = HomeMediator.prototype;
    __egretProto__.listNotificationInterests = function () {
        return [HomeMediator.SHOW];
    };
    __egretProto__.handleNotification = function (notification) {
        switch (notification.getName()) {
            case HomeMediator.SHOW:
                ClientSocket.getInstance().setCallBack(this);
                LayerManager.getInstance().runScene(this.homeScene);
                break;
        }
    };
    __egretProto__.onSocketConnect = function () {
    };
    __egretProto__.onSocketData = function (json) {
        var cmd = json.cmd;
        switch (cmd) {
            case GameConst.S2C_LOGIN_SUCCES:
                this.loginSuccess(json);
                break;
        }
    };
    __egretProto__.onSocketError = function () {
    };
    __egretProto__.onSocketClose = function () {
    };
    __egretProto__.loginSuccess = function (json) {
        //读取用户数据
        var loginSuccesJson = new LoginSuccessJSON();
        loginSuccesJson.readData(json);
        var userData = this.facade.retrieveProxy(UserDataProxy.NAME);
        userData.userID = loginSuccesJson.userID;
        userData.userName = loginSuccesJson.userName;
        this.sendNotification(GameMediator.SHOW);
    };
    HomeMediator.NAME = "HomeSceneMediator";
    HomeMediator.SHOW = "homeScene_show";
    return HomeMediator;
})(puremvc.Mediator);
HomeMediator.prototype.__class__ = "HomeMediator";
