/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
        this.startConnect();
        this.handler.visible = false;
    };
    p.onRemove = function () {
    };
    p.configListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.handler.configListeners();
    };
    p.deConfigListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.handler.deConfigListeners();
    };
    p.onTouchBegin = function (e) {
        switch (e.target) {
            case this.aBtn:
            case this.bBtn:
                this.sendAction(ActionEnum.shoot);
                break;
            case this.directionBg:
                this.handler.x = e.stageX - this.handler.width / 2;
                this.handler.y = e.stageY - this.handler.height / 2;
                this.handler.visible = true;
                break;
        }
    };
    //开始连接socket
    p.startConnect = function () {
        if (this.socket.isConnected() == false) {
            this.socket.startConnect();
        }
    };
    //连接成功
    p.connect = function () {
        this.sendLogin();
    };
    //发送登录请求
    p.sendLogin = function () {
        egret.log("send login");
        var gameConfig = GameConst.gameConfig;
        var json = {
            rid: gameConfig.rid,
            openid: gameConfig.openid,
            headimgurl: gameConfig.headimgurl,
            nickname: gameConfig.nickname,
            userType: "mobile"
        };
        this.socket.sendMessage("login", json, this.revLogin, this);
    };
    //接收登录
    p.revLogin = function (data) {
        var success = data.success;
        var msg = data.msg;
        egret.log("rev login:", " success:", success, " msg:", msg);
    };
    //接收游戏开始
    p.revStartGame = function () {
        egret.log("rev startGame");
        this.configListeners();
    };
    //发送动作
    p.sendAction = function (actionType) {
        //egret.log("send action:",actionType);
        this.socket.sendMessage("action", { actionType: actionType, openid: GameConst.gameConfig.openid });
    };
    //接收游戏结束
    p.revGameOver = function (data) {
        egret.log("rev gameOver");
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
