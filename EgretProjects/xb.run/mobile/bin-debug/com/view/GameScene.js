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
        this.angleLimit = 30; //角度限制
        this.angleReturn = 25; //回复手势角度
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.centerLabel.visible = false;
        this.deviceLabel.visible = false;
        this.actionLabel.visible = false;
        this.statusLabel.visible = false;
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
        this.resetGame();
        this.startGame();
    };
    p.onRemove = function () {
        this.stopDevice();
    };
    p.startGame = function () {
        this.configListeners();
        this.openDevice();
    };
    p.resetGame = function () {
        egret.log("resetGame1");
        //重置感应
        this.gestureUp = false;
        this.gestureR = false;
        this.gestureL = false;
        this.centerZ = GameConst.centerZ;
        this.centerX = GameConst.centerX;
        this.centerLabel.text = "centerZ:" + this.centerZ + "  centerX:" + this.centerX;
        //头像、名称
        this.setRoleImg();
        this.setRoleName();
    };
    p.gameOver = function () {
        this.resetGame();
    };
    p.configListeners = function () {
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLeftBtnTouch, this);
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRightBtnTouch, this);
        this.upBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onUpBtnTouch, this);
    };
    p.onLeftBtnTouch = function () {
        egret.log("left touch");
        this.sendLeftAction();
    };
    p.onRightBtnTouch = function () {
        this.sendRightAction();
    };
    p.onUpBtnTouch = function () {
        this.sendUpAction();
    };
    //设置角色头像
    p.setRoleImg = function () {
        this.headImg.texture = null;
        var role = UserManager.getInstance().roleID;
        this.headImg.texture = RES.getRes("head" + role + "_png");
    };
    //设置角色名字
    p.setRoleName = function () {
        var role = UserManager.getInstance().roleID;
        this.nameLabel.text = UserManager.getInstance().roleNameList[role];
    };
    p.openDevice = function () {
        this.orientation = new egret.DeviceOrientation();
        this.orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
        this.orientation.start();
    };
    p.stopDevice = function () {
        this.orientation.stop();
        this.orientation.removeEventListener(egret.Event.CHANGE, this.onOrientation, this);
    };
    p.onOrientation = function (e) {
        this.deviceX = parseFloat(e.beta.toFixed(2));
        this.deviceZ = parseFloat(e.alpha.toFixed(2));
        this.deviceLabel.text =
            "x轴角速度:" + this.deviceX //-90-90 手机平放0度，手机头朝上增加，手机头朝下减少
                + "\nz轴角速度:" + this.deviceZ; //0~360   北方为0(360)，向左0-360增加，向右360-0减少 
        this.statusLabel.text = "up:" + this.gestureUp + " R:" + this.gestureR + " L:" + this.gestureL;
        //向上超过n度，则判定为跳跃
        // this.deviceLabel.text += "\naccX:" + this.deviceX.toFixed(2);
        if (this.deviceX >= this.angleLimit && this.gestureUp == false) {
            this.gestureUp = true;
            this.sendUpAction();
            this.upBtn.devieceDown();
            this.actionLabel.text = "Up:" + this.deviceX;
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
        else if ((dist > 180 && (360 - dist) < this.angleReturn) || (dist < -180 && (360 + dist) < this.angleReturn)) {
            this.gestureR = false;
            this.gestureL = false;
        }
        //判断左
        if ((dist >= this.angleLimit && dist < 180) || (dist >= (this.angleLimit - 360) && dist < -180)) {
            if (this.gestureL == false && this.gestureR == false) {
                this.gestureL = true;
                this.sendLeftAction();
                this.leftBtn.devieceDown();
                this.actionLabel.text = "L:" + this.deviceZ;
            }
        }
        else if ((dist <= -this.angleLimit && dist > -180) || (dist < (360 - this.angleLimit) && dist > 180)) {
            if (this.gestureR == false && this.gestureL == false) {
                this.gestureR = true;
                this.sendRightAction();
                this.rightBtn.devieceDown();
                this.actionLabel.text = "R:" + this.deviceZ;
            }
        }
    };
    p.sendRightAction = function () {
        this.socket.sendMessage("action", { actionType: "right", openid: GameConst.gameConfig.openid });
        //egret.log("sendAction:right",this.deviceZ,"-",this.centerZ,"=",this.deviceZ - this.centerZ);
    };
    p.sendLeftAction = function () {
        this.socket.sendMessage("action", { actionType: "left", openid: GameConst.gameConfig.openid });
        //egret.log("sendAction:left",this.deviceZ,"-",this.centerZ,"=",this.deviceZ - this.centerZ);
    };
    p.sendUpAction = function () {
        this.socket.sendMessage("action", { actionType: "up", openid: GameConst.gameConfig.openid });
        //egret.log("sendAction:up");
    };
    p.revGameOver = function (data) {
        egret.log("revGameOver");
        console.log("revGameOver", data);
        //if(GameConst.debug == true){
        data = {
            gameRankList: [
                { headUrl: "resource/assets/home/head0.png", nickName: "Test", score: 999, rank: 1 },
                { headUrl: "resource/assets/home/head0.png", nickName: "Test", score: 999, rank: 1 },
                { headUrl: "resource/assets/home/head0.png", nickName: "Test", score: 999, rank: 1 },
            ],
            rankList: [
                { headUrl: "resource/assets/home/head0.png", nickName: "Test", score: 99 },
                { headUrl: "resource/assets/home/head0.png", nickName: "Test", score: 99 },
                { headUrl: "resource/assets/home/head0.png", nickName: "Test", score: 99 }
            ]
        };
        //}
        this.resultData = data;
        //当不显示获奖页时，才显示结果页，因为不知道哪个命令先后
        if (!GameManager.getInstance().prizeScene.parent) {
            LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
        }
    };
    //接收奖品
    p.revPrize = function () {
        egret.log("revPrize:", GameConst.gameConfig.isGetPrie);
        if (GameConst.gameConfig.isGetPrie == 1) {
            if (!GameManager.getInstance().resultScene.parent) {
                LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
            }
        }
        else {
            LayerManager.getInstance().runScene(GameManager.getInstance().prizeScene);
        }
    };
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
