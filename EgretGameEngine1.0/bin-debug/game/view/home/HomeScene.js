/**
 * 主页
 * @author chenkai
 * @date 2016/12/26
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        this.skinName = "HomeSceneSkin";
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.childrenCreated = function () {
        console.log("home childrenCreated");
    };
    p.onEnable = function () {
        console.log("home onEnable");
        var img = new QRCode();
        img.showCode("resource/assets/Button/button_down.png", this.qrCode);
    };
    p.onRemove = function () {
        console.log("home onRemove");
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
