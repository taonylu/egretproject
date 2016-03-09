/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.canvas = new egret.Sprite();
        this.angleLimit = 45;
        this.row = 0;
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
        this.halfStageWidth = this.stageWidth / 2;
        this.halfStageHeight = this.stageHeight / 2;
        this.centerX = this.halfStageWidth;
        this.centerY = this.halfStageHeight;
    };
    p.onEnable = function () {
        this.createCanvas();
    };
    p.onRemove = function () {
    };
    p.createCanvas = function () {
        this.canvas.width = GameConst.stage.stageWidth;
        this.canvas.height = GameConst.stage.stageHeight;
        this.canvas.graphics.lineStyle(5, 0xff0000);
        this.canvas.graphics.moveTo(this.centerX, this.centerY);
        this.addChild(this.canvas);
    };
    p.revLockOn = function (data) {
        var deviceX = data.deviceX;
        var deviceY = data.deviceY;
        var deviceZ = data.deviceZ;
        egret.log("rev lockOn:", deviceX, deviceY, deviceZ);
        this.centerDeviceX = deviceX;
        this.centerDeviceY = deviceY;
        this.centerDeviceZ = deviceZ;
    };
    p.revDrawLine = function (data) {
        var curDeviceX = data.deviceX; //本次点位置
        var curDeviceY = data.deviceY;
        var curDeviceZ = data.deviceZ;
        //判断z轴和x轴角度改变值，用改变值*舞台高宽 = 改变的线段长度，在上一次的绘制点开始绘制
        //或者，判断z轴和x轴离中心点的距离，根据距离moveTo绘制直线
        //z轴角度，北方向为0，往左0-360增加，往右360-0减少
        var offerZ = curDeviceZ - this.centerDeviceZ; //角度差值 = 当前z角度 - 中心z角度
        var angleZ; //假设中点角度为0，换算后，当前点离中心点的角度
        //往左
        if (offerZ < 0 && offerZ <= -180) {
            angleZ = -360 - offerZ;
        }
        else if (offerZ > 0 && offerZ <= 180) {
            angleZ = -offerZ;
        }
        else if (offerZ < 0 && offerZ > -180) {
            angleZ = -offerZ;
        }
        else if (offerZ > 0 && offerZ > 180) {
            angleZ = 360 - offerZ;
        }
        var nextX = this.centerX + angleZ * this.halfStageWidth / 45;
        if (nextX > this.stageWidth) {
            nextX = this.stageWidth;
        }
        else if (nextX < 0) {
            nextX = 0;
        }
        nextX = parseFloat(nextX.toFixed(2));
        //x轴角度，上至下 90 ~ -90度，由改变后x轴角度-中心x角度，得出当前x与中心x的距离
        var nextY = this.centerY - (curDeviceX - this.centerDeviceX) * this.halfStageHeight / 45;
        if (nextY > this.stageHeight) {
            nextY = this.stageHeight;
        }
        else if (nextY < 0) {
            nextY = 0;
        }
        nextY = parseFloat(nextY.toFixed(2));
        this.setMsgLabel("绘制点坐标:" + nextX + "," + nextY);
        this.canvas.graphics.lineTo(nextX, nextY);
    };
    p.setMsgLabel = function (msg) {
        this.row++;
        if (this.row > 10) {
            this.row = 0;
            this.msgLabel.text = "";
        }
        this.msgLabel.text += "\n" + msg;
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
