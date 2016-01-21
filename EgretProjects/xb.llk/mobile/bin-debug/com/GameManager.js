/**
 * 游戏管理类
 * @author
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
        this.messageBox = new MessageBox(); //消息框
        this.bReconnect = false; //当次连接是否是重连
    }
    var d = __define,c=GameManager,p=c.prototype;
    p.startup = function (main) {
        //配置socket
        this.socket = new ClientSocket();
        this.socket.homeScene = this.homeScene;
        this.socket.gameScene = this.gameScene;
        this.homeScene.socket = this.socket;
        this.gameScene.socket = this.socket;
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
        this.socket.startConnect();
    };
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //--------------------[接收]----------------------
    //链接成功
    p.onConnect = function () {
        this.sendLogin();
    };
    //断开链接
    p.onDisconnect = function () {
        //alert("已与服务器断开连接");
        if (this.gameScene.parent) {
            this.gameScene.reset();
        }
        LayerManager.getInstance().runScene(this.homeScene);
        this.messageBox.showMessage("已与服务器断开连接\n请尝试重新加入游戏");
    };
    p.onError = function () {
        this.messageBox.showMessage("连接错误");
    };
    //接收登录
    p.revLogin = function (data) {
        var status = data; //-1 房间不存在， 0 用户信息错误， 1 进入房间成功
        egret.log("接收登录:" + status);
        switch (status) {
            case 1:
                if (this.bReconnect) {
                    this.homeScene.sendUserReady();
                    this.bReconnect = false;
                }
                break;
            case -1:
                this.messageBox.showMessage("房间不存在");
                break;
            case 0:
                this.messageBox.showMessage("用户信息错误");
                break;
        }
    };
    //--------------------[发送]----------------------
    //发送登录
    p.sendLogin = function () {
        egret.log("发送登录");
        var json = { "uid": window["srvConfig"].uid, "rid": window["srvConfig"].rid };
        this.socket.sendMessage(NetConst.C2S_login, json, this.revLogin, this);
    };
    GameManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    };
    return GameManager;
})();
egret.registerClass(GameManager,'GameManager');
