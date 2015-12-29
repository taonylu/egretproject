/**
*  功    能：游戏管理类
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/22
*  修改日期：
*  修改日志：
*/
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.levelScene = new LevelScene(); //选关场景
        this.gameScene = new GameScene(); //游戏场景
        this.titleUI = new TitleUI(); //顶部标题(鱼、星星数量)
    }
    var d = __define,c=GameManager;p=c.prototype;
    //启动游戏
    p.startup = function () {
        ClientSocket.getInstance().IP = GameConst.IP;
        ClientSocket.getInstance().port = GameConst.Port;
        ClientSocket.getInstance().setSocketHand(this);
        LayerManager.getInstance().runScene(this.homeScene);
    };
    //开始游戏
    p.startGame = function (levelNum) {
        LayerManager.getInstance().runScene(this.gameScene);
        this.gameScene.starGame(levelNum);
    };
    //连接成功
    p.onSocketConnect = function () {
    };
    //连接失败
    p.onSocketError = function () {
    };
    //连接关闭
    p.onSocketClose = function () {
    };
    //连接超时
    p.onSocketConnectTimeOver = function () {
    };
    //接收数据
    p.onSocketData = function (json) {
        switch (json.cmd) {
            case NetConst.SUBMIT_SCORE:
                this.gameScene.showRank(json);
                break;
        }
    };
    //提交分数
    p.sendSubmit = function (score) {
        var json = JsonManager.submit;
        json.cmd = NetConst.SUBMIT_SCORE;
        json.userid = 1000;
        json.gameid = 1000;
        json.score = score;
        json.username = NumberTool.getRandomInt(0, 10000).toString();
        ClientSocket.getInstance().send(json);
    };
    GameManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    };
    return GameManager;
})();
egret.registerClass(GameManager,"GameManager",["ISocketHand"]);
