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
        this.showJoinBtn();
        this.danmuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDanMuBtnTouch, this);
        this.toolBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToolBtnTouch, this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
    };
    p.onRemove = function () {
        this.danmuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDanMuBtnTouch, this);
        this.toolBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToolBtnTouch, this);
        this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
        this.dmGroup.visible = false;
        this.ruleGroup.visible = false;
    };
    p.reset = function () {
    };
    p.initView = function () {
        this.ruleGroup.visible = false;
        this.dmGroup.visible = false;
        this.queueLabel.text = "";
    };
    //显示加入游戏按钮
    p.showJoinBtn = function () {
        this.joinBtn.visible = true;
        var self = this;
        this.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.sendUserReady();
        }, this);
    };
    p.onDanMuBtnTouch = function () {
        this.dmGroup.visible = true;
        this.sendDmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendDmBtnTouch, this);
        this.closeDmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseDmBtnTouch, this);
    };
    p.onToolBtnTouch = function () {
    };
    p.onRuleBtnTouch = function () {
        this.ruleGroup.visible = true;
        this.closeRuleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseRuleBtnTouch, this);
    };
    p.onSendDmBtnTouch = function () {
        this.dmGroup.visible = false;
        this.sendDanMu(this.dmLabel.text);
    };
    p.onCloseDmBtnTouch = function () {
        this.dmGroup.visible = false;
        this.sendDmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendDmBtnTouch, this);
        this.closeDmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseDmBtnTouch, this);
    };
    p.onCloseRuleBtnTouch = function () {
        this.ruleGroup.visible = false;
        this.closeRuleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
    };
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //-----------------------------发送数据----------------------------------
    p.sendDanMu = function (msg) {
        egret.log("发送弹幕:" + msg);
        var json = { "msg": msg };
        this.socket.sendMessage(NetConst.C2S_barrage, json);
    };
    p.sendUserReady = function () {
        egret.log("发送用户准备");
        this.socket.sendMessage("userReady");
    };
    //-----------------------------接收数据----------------------------------
    //接收排队信息
    p.revQueue = function (data) {
        var status = data.status; //"wait"、"ready"
        var queue = data.queue; //排队位置
        egret.log("排队信息:" + status, queue);
        if (status == "wait") {
            if (queue < 10) {
                this.queueLabel.text = "0" + queue.toString();
            }
            else if (queue <= 99) {
                this.queueLabel.text = queue.toString();
            }
            else {
                this.queueLabel.text = "99";
            }
        }
        else if (status == "ready") {
        }
        this.joinBtn.visible = false;
    };
    //过关后，接收新关卡数据
    p.revMapData = function (data) {
        var mapData = data.mapData;
        egret.log("下一关");
        //接收地图数据，则表示开始游戏
        MapManager.getInstance().level.length = 0;
        MapManager.getInstance().level.push(mapData[0], mapData[1], mapData[2]);
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
