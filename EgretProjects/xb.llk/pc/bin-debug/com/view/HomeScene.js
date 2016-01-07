/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.userMax = 8; //用户最大数量
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.initView = function () {
        //获取头像背景
        this.headUIList = new Array();
        for (var i = 0; i < this.userMax; i++) {
            this.headUIList.push(this["headUI" + i]);
        }
    };
    //返回登录成功
    p.revLoginComplete = function (data) {
        var status = data.status;
        var msg = data.msg;
        egret.log("loginComplete:", status, msg);
        if (status == 1) {
        }
        else if (status == 0) {
        }
    };
    //玩家加入
    p.revUserJoin = function (data) {
        var avatar = data.avatar; //用户头像
        var name = data.name; //用户名
        var id = data.id; //用户id
        egret.log("userJion:" + avatar, name, id);
        //设置用户名，选取一个空文本。因为可能出现靠前的玩家退出游戏。
        var index = -1;
        for (var i = 0; i < this.userMax; i++) {
            if (this.headUIList[i].isEmpty()) {
                this.headUIList[i].setNameLabel(name);
                this.headUIList[i].loadImg(avatar);
                break;
            }
        }
    };
    //玩家退出
    p.revUserQuit = function (data) {
        var id = data.id; //用户id
        //删除玩家头像
        for (var i = 0; i < this.userMax; i++) {
            if (this.headUIList[i].userID == id) {
                this.headUIList[i].clear();
            }
        }
    };
    //游戏开始
    p.revGameStart = function (data) {
        var mapData = data.mapData; //地图信息
        var luckyUser = data.luckyUser; //大屏幕显示的用户
        MapManager.getInstance().level1 = mapData[0];
        MapManager.getInstance().level2 = mapData[1];
        MapManager.getInstance().level3 = mapData[2];
        //跳转场景
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
