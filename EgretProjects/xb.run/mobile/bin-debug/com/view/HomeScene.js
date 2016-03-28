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
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    //---------------测试目的-------------------
    //1. 重力感应x,y,z轴值变化
    //2. 摇一摇功能
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
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
