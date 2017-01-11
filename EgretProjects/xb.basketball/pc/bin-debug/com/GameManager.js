/**
 * 游戏管理类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
        this.messageBox = new MessageBox(); //提示框
        this.socket = ClientSocket.getInstance();
    }
    var d = __define,c=GameManager,p=c.prototype;
    GameManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    };
    //启动游戏框架
    p.startup = function (main) {
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
        //配置socket
        this.socket.homeScene = this.homeScene;
        this.socket.gameScene = this.gameScene;
        this.socket.startConnect();
        if (GameConst.isDebug) {
            this.onConnect();
        }
    };
    ///////////////////////////////////////////
    //----------------[发送数据]---------------
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    //链接成功
    p.onConnect = function () {
        //提交房间号
        this.homeScene.submitRid();
    };
    //断开链接
    p.onDisconnect = function () {
        this.messageBox.showMessage("网页连接已断开");
    };
    p.onError = function () {
        this.messageBox.showMessage("连接网页错误");
    };
    return GameManager;
})();
egret.registerClass(GameManager,'GameManager');
