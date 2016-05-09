/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
        this.configListeners();
    };
    p.onRemove = function () {
    };
    p.configListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.deConfigListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onTouchMove = function (e) {
        if (this.curTouchTarget == e.target) {
            return;
        }
        this.curTouchTarget = e.target;
        switch (this.curTouchTarget) {
            case this.upBtn:
                this.sendAction(ActionEnum.up);
                break;
            case this.downBtn:
                this.sendAction(ActionEnum.down);
                break;
            case this.leftBtn:
                this.sendAction(ActionEnum.left);
                break;
            case this.rightBtn:
                this.sendAction(ActionEnum.right);
                break;
        }
    };
    p.onTouchBegin = function (e) {
        //console.log("begin",e.target);
        switch (e.target) {
            case this.upBtn:
                this.sendAction(ActionEnum.up);
                break;
            case this.downBtn:
                this.sendAction(ActionEnum.down);
                break;
            case this.leftBtn:
                this.sendAction(ActionEnum.left);
                break;
            case this.rightBtn:
                this.sendAction(ActionEnum.right);
                break;
            case this.shootBtn:
                this.sendAction(ActionEnum.shoot);
                break;
        }
    };
    p.onTouchEnd = function (e) {
        //console.log("touchEnd:",e.target);
        switch (e.target) {
            case this.upBtn:
            case this.downBtn:
            case this.leftBtn:
            case this.rightBtn:
            case this.shootBtn:
                this.sendAction(ActionEnum.stopMove);
                break;
        }
    };
    p.sendAction = function (actionType) {
        //egret.log("send action:",actionType);
        this.socket.sendMessage("action", { actionType: actionType, openid: GameConst.gameConfig.openid });
    };
    //接收游戏结束
    p.revGameOver = function (data) {
        egret.log("rev gameOver");
        var wave = data.wave;
        var heroRank = data.heroRank;
        var prize = data.prize;
    };
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
