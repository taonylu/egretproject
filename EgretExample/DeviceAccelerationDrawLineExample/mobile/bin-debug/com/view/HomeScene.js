/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.socket = ClientSocket.getInstance();
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
        this.last_x = 0;
        this.last_y = 0;
        this.last_z = 0;
        this.last_update = 0;
        this.SHAKE_THRESHOLD = 0.25; //摇动变化值/时间差  25/100大概值
        this.shakeCount = 0; //摇动次数
        this.lastDeviceX = 0;
        this.lastDeviceY = 0;
        this.lastDeviceZ = 0;
        this.allowSendOrientation = false;
        this.count = 0;
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.centerGroup.visible = false;
    };
    p.onEnable = function () {
        this.sendLogin();
    };
    p.onRemove = function () {
    };
    p.openDevice = function () {
        var orientation = new egret.DeviceOrientation();
        orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
        orientation.start();
    };
    p.onOrientation = function (e) {
        this.deviceX = parseFloat(e.beta.toFixed(2));
        this.deviceY = parseFloat(e.gamma.toFixed(2));
        this.deviceZ = parseFloat(e.alpha.toFixed(2));
        this.deviceLabel.text =
            "x轴角速度:" + this.deviceX //-90-90 手机平放0度，手机头朝上增加，手机头朝下减少
                + "\ny轴角速度:" + this.deviceY //-90~270 手机平放0度，向右倾斜增加，向左倾斜减少
                + "\nz轴角速度:" + this.deviceZ; //0~360   北方为0(360)，向左0-360增加，向右360-0减少
        if (this.allowSendOrientation && (Math.abs(this.lastDeviceX - this.deviceX) > 2 || Math.abs(this.lastDeviceZ - this.deviceZ) > 2)) {
            this.sendOrientation();
        }
    };
    p.onOKBtnTouch = function () {
        this.sendLockOn();
    };
    //-------------------网络数据-------------------
    p.sendLogin = function () {
        var rid = egret.getOption("rid");
        egret.log("send login:", rid, "userType:mobile");
        this.socket.sendMessage("login", { rid: rid, userType: "mobile" }, this.revLogin, this);
    };
    p.revLogin = function (data) {
        egret.log("rev login");
        this.centerGroup.visible = true;
        this.openDevice();
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
    };
    p.sendLockOn = function () {
        egret.log("send lockOn:", this.deviceX, this.deviceY, this.deviceZ);
        this.socket.sendMessage("lockOn", { deviceX: this.deviceX, deviceY: this.deviceY, deviceZ: this.deviceZ }, this.revLockOn, this);
    };
    p.revLockOn = function () {
        egret.log("rev lockOn2");
        this.allowSendOrientation = true;
    };
    p.sendOrientation = function () {
        this.count++;
        this.centerLabel.text = this.count + "";
        this.socket.sendMessage("drawLine", { deviceX: this.deviceX, deviceY: this.deviceY, deviceZ: this.deviceZ });
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
