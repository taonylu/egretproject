/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.deviceX = 0;
        this.deviceZ = 0;
        this.gestureUp = false;
        this.gestureR = false;
        this.gestureL = false;
        this.angleLimit = 45; //角度限制
        this.angleReturn = 30; //回复手势角度
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
        this.resetGame();
        this.startGame();
    };
    p.onRemove = function () {
    };
    p.configListeners = function () {
        this.lockBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLockBtnTouch, this);
    };
    p.deConfigListeners = function () {
        this.lockBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLockBtnTouch, this);
    };
    p.startGame = function () {
        //this.openDevice();
        this.configListeners();
    };
    p.resetGame = function () {
        //重置感应
        this.gestureUp = false;
        this.gestureR = false;
        this.gestureL = false;
        this.centerZ = 0;
        this.centerX = 0;
        this.isLocked = false;
    };
    p.gameOver = function () {
        this.resetGame();
    };
    p.openDevice = function () {
        var orientation = new egret.DeviceOrientation();
        orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
        orientation.start();
    };
    p.onOrientation = function (e) {
        this.deviceX = parseFloat(e.beta.toFixed(2));
        this.deviceZ = parseFloat(e.alpha.toFixed(2));
        this.deviceLabel.text =
            "x轴角速度:" + this.deviceX //-90-90 手机平放0度，手机头朝上增加，手机头朝下减少
                + "\nz轴角速度:" + this.deviceZ; //0~360   北方为0(360)，向左0-360增加，向右360-0减少
        if (this.isLocked == false) {
            return;
        }
        //向上超过n度，则判定为跳跃
        this.deviceLabel.text += "\naccX:" + this.deviceX.toFixed(2);
        if (this.deviceX >= this.angleLimit && this.gestureUp == false) {
            this.gestureUp = true;
            this.socket.sendMessage("action", { actionType: "up" });
            egret.log("sendAction:up");
        }
        else if (this.deviceX <= this.angleReturn) {
            this.gestureUp = false;
        }
        //当跳跃角度过大时，不计算左右判断
        if (this.deviceX > this.angleLimit) {
            return;
        }
        //获取角速度变化
        var dist = Math.round(this.deviceZ - this.centerZ);
        //清除左右手势
        if ((dist < this.angleReturn && dist > -this.angleReturn)) {
            this.gestureR = false;
            this.gestureL = false;
        }
        //判断左
        if ((dist >= this.angleLimit && dist < 180) || dist < -180) {
            if (this.gestureL == false && this.gestureR == false) {
                this.gestureL = true;
                this.socket.sendMessage("action", { actionType: "left" });
                egret.log("sendAction:left", this.deviceZ, "-", this.centerZ, "=", this.deviceZ - this.centerZ);
            }
        }
        else if ((dist <= -this.angleLimit && dist > -180) || dist > 180) {
            if (this.gestureR == false && this.gestureL == false) {
                this.gestureR = true;
                this.socket.sendMessage("action", { actionType: "right" });
                egret.log("sendAction:14right", this.deviceZ, "-", this.centerZ, "=", this.deviceZ - this.centerZ);
            }
        }
    };
    //点击校准按钮
    p.onLockBtnTouch = function () {
        egret.log("lock:", this.deviceZ);
        this.centerZ = this.deviceZ;
        this.centerX = this.deviceX;
        //校准一次后，第二次校准不需要发送到服务端，因为校准的结果本来就跟pc和服务端无关
        if (this.isLocked == false) {
            this.sendLock();
        }
        this.isLocked = true;
    };
    //接收开始游戏
    p.revStartGame = function () {
        egret.log("revStartGame");
        this.startGame();
    };
    //发送校准
    p.sendLock = function () {
        egret.log("sendLock");
        this.socket.sendMessage("lock");
    };
    //接收游戏结束
    p.revGameOver = function (data) {
        egret.log("revGameOver");
    };
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
