var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
        this.last_x = 0;
        this.last_y = 0;
        this.last_z = 0;
        this.last_update = 0;
        this.SHAKE_THRESHOLD = 0.25; //摇动变化值/时间差  25/100大概值
        this.shakeCount = 0; //摇动次数
        this.label = new egret.TextField();
        this.label.y = 150;
        this.label.x = 50;
        this.addChild(this.label);
        this.shakeLabel = new egret.TextField();
        this.shakeLabel.y = 350;
        this.shakeLabel.x = 50;
        this.addChild(this.shakeLabel);
        var orientation = new egret.DeviceOrientation();
        orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
        orientation.start();
    }
    var d = __define,c=Main;p=c.prototype;
    p.onOrientation = function (e) {
        this.label.text = "z轴角速度:" + e.alpha + "\nx轴角速度:" + e.beta + "\ny轴角速度:" + e.gamma; //-90~270 手机平放0度，向右倾斜增加，向左倾斜减少
        var curTime = egret.getTimer();
        if ((curTime - this.last_update) > 100) {
            var diffTime = curTime - this.last_update;
            this.last_update = curTime;
            this.xPos = e.beta;
            this.yPos = e.gamma;
            this.zPos = e.alpha;
            var speed = Math.abs(this.xPos + this.yPos + this.zPos - this.last_x - this.last_y - this.last_z) / diffTime;
            if (speed > this.SHAKE_THRESHOLD) {
                this.shakeCount++;
                if (this.shakeCount > 3) {
                    this.shakeCount = 0;
                    this.label.text = "shake";
                }
            }
            this.shakeLabel.text = "摇动变化值：" + Math.abs(this.xPos + this.yPos + this.zPos - this.last_x - this.last_y - this.last_z) + "\n时间差:" + diffTime + "\n摇动次数" + this.shakeCount;
            this.last_x = this.xPos;
            this.last_y = this.yPos;
            this.last_z = this.zPos;
        }
    };
    return Main;
})(egret.Sprite);
egret.registerClass(Main,"Main");
