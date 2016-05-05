/**
 * 手柄
 * @author
 *
 */
var Handler = (function (_super) {
    __extends(Handler, _super);
    function Handler() {
        _super.call(this, "HandlerSkin");
    }
    var d = __define,c=Handler,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
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
        this.checkDirection(e.localX, e.localY);
    };
    p.onTouchBegin = function (e) {
        this.checkDirection(e.localX, e.localY);
    };
    p.onTouchEnd = function () {
        this.sendAction(ActionEnum.stopMove);
        this.visible = false;
    };
    p.checkDirection = function (xPos, yPos) {
        var angle = Math.atan2((yPos - 250), (xPos - 250)) * 180 / Math.PI + 180;
        if (angle >= 45 && angle <= 135) {
            this.sendAction(ActionEnum.up);
        }
        else if (angle >= 135 && angle <= 225) {
            this.sendAction(ActionEnum.right);
        }
        else if (angle >= 225 && angle <= 315) {
            this.sendAction(ActionEnum.down);
        }
        else {
            this.sendAction(ActionEnum.left);
        }
    };
    //发送动作
    p.sendAction = function (actionType) {
        //egret.log("send action:",actionType);
        if (this.curAction != actionType) {
            this.curAction = actionType;
            this.socket.sendMessage("action", { actionType: actionType, openid: GameConst.gameConfig.openid });
        }
    };
    return Handler;
}(BaseUI));
egret.registerClass(Handler,'Handler');
