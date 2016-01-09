/**
 * 游戏管理类
 * @author
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页场景
        this.gameScene = new GameScene(); //游戏场景
    }
    var d = __define,c=GameManager,p=c.prototype;
    //启动游戏框架
    p.startup = function (main) {
        //配置socket
        var socket = new ClientSocket();
        socket.homeScene = this.homeScene;
        socket.gameScene = this.gameScene;
        this.homeScene.socket = socket;
        this.gameScene.socket = socket;
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //创建弹幕层
        this.barrageUI = new BarrageUI();
        LayerManager.getInstance().popLayer.addChild(this.barrageUI);
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
        //模拟数据
        //登录成功
        var loginJson = { "status": 1, "msg": "" };
        this.homeScene.revLoginComplete(loginJson);
        //用户进入
        var userJoin = {
            "avatar": "resource/assets/testhead.png",
            "name": "我是用户1",
            "id": "gdfer1" //用户id
        };
        this.homeScene.revUserJoin(userJoin);
        //游戏开始
        var json = { "mapData": [], "luckyUser": 1 };
        json.mapData = [
            [1, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, , 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        this.homeScene.revGameStart(json);
        //游戏消除
        var self = this;
        //        egret.Tween.get(this).wait(1000).call(function(){
        //            var eJson = {"id":"", "pos":[[0,0],[0,4]]};
        //            self.gameScene.revEliminate(eJson);
        //        });
        //大屏幕更新地图
        //        egret.Tween.get(this).wait(2000).call(function() {
        //            var mapDataJson = {
        //                "mapdata": [
        //                    [1,0,0,0,1,0,0],
        //                    [0,0,1,0,0,1,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,1,0,0,,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,0,1,0,0,0]
        //                ]
        //            };
        //            self.gameScene.revluckyMap(mapDataJson);
        //        });
        //下一关
        //        egret.Tween.get(this).wait(2000).call(function() {
        //            var mapDataJson = {
        //                "mapdata": [
        //                    [1,0,0,0,1,0,0],
        //                    [0,0,1,0,0,1,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,0,0,0,,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,0,0,0,0,0]
        //                ]
        //            };
        //            self.gameScene.revMapData(mapDataJson);
        //        });
        //道具使用，大屏幕
        //        var self: GameManager = this;
        //        egret.Tween.get(this).wait(2000).call(function() {
        //            var json = {
        //                "type": "1","mapdata": [  //1打乱 2冻结 3提示
        //                    [1,0,0,0,1,0,0],
        //                    [0,0,1,0,0,1,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,0,0,0,1,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,0,1,0,0,0],
        //                    [0,0,0,0,0,0,0],
        //                    [0,0,0,0,0,0,0]
        //                ]};
        //            
        //            self.gameScene.revPro(json);
        //        });
        //游戏结束
        //        var self: GameManager = this;
        //        egret.Tween.get(this).wait(2000).call(function() {
        //            var json = {"winners":["4","1","2"]};
        //            self.gameScene.revGameOver(json);
        //        });
        //链接socket
        //socket.startConnect(NetConst.url);
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