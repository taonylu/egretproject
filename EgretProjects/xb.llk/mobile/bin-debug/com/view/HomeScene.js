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
        this.initView();
    };
    p.onEnable = function () {
        this.danmuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDanMuBtnTouch, this);
        this.toolBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToolBtnTouch, this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
    };
    p.onRemove = function () {
        this.danmuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDanMuBtnTouch, this);
        this.toolBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToolBtnTouch, this);
        this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
    };
    p.initView = function () {
    };
    p.onDanMuBtnTouch = function () {
    };
    p.onToolBtnTouch = function () {
    };
    p.onRuleBtnTouch = function () {
    };
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //-----------------------------接收数据----------------------------------
    //接收用户自己数据
    p.revUserInfo = function (data) {
        var id = data.id;
        var avatar = data.avatar;
        var name = data.name;
    };
    //过关后，接收新关卡数据
    p.revMapData = function (data) {
        var mapData = data.mapdata;
        egret.log("下一关");
        //第一次接收，则是开始游戏
        MapManager.getInstance().level = mapData;
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    //-----------------------------发送数据----------------------------------
    p.sendDanMu = function (msg) {
        var json = { "msg": msg };
        this.socket.sendMessage(NetConst.C2S_barrage, json);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
