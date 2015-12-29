/**
*  功    能：主页场景
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/22
*  修改日期：
*  修改日志：
*/
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        this.skinName = "resource/myskins/HomeSceneSkin.exml";
    }
    var d = __define,c=HomeScene;p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.onEnable();
    };
    p.onEnable = function () {
        this.configListeners();
    };
    p.onRemove = function () {
        this.deConfigListeners();
    };
    p.configListeners = function () {
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
        this.optionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOptionBtnTouch, this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch, this);
        this.cupBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCupBtnTouch, this);
    };
    p.deConfigListeners = function () {
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
        this.optionBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOptionBtnTouch, this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtnTouch, this);
        this.cupBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCupBtnTouch, this);
    };
    p.onStartBtnTouch = function () {
        console.log("点击开始");
        LayerManager.getInstance().runScene(GameManager.getInstance().levelScene);
    };
    p.onOptionBtnTouch = function () {
    };
    p.onRankBtnTouch = function () {
    };
    p.onCupBtnTouch = function () {
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,"HomeScene");
