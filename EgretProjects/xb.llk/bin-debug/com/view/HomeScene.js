/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene(skinName) {
        _super.call(this, skinName);
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    //设置测试用文本
    p.setMsgLabel = function (msg) {
        this.msgLabel.text = msg;
    };
    //返回大屏幕准备
    p.revScreenReady = function (data) {
        var status = data.status;
        var msg = data.msg;
        if (status == 1) {
        }
        else if (status == 0) {
        }
        this.setMsgLabel(msg);
    };
    //玩家加入
    p.revUserJoin = function (data) {
        var avatar = data.avatar; //用户头像
        var name = data.name; //用户名
        var id = data.id; //用户id
    };
    //玩家退出
    p.revUserQuit = function (data) {
        var id = data.id; //用户id
    };
    //游戏开始
    p.revGameStart = function (data) {
        var mapData = data.mapData; //地图信息
        var luckyUser = data.luckyUser; //大屏幕显示的用户
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
