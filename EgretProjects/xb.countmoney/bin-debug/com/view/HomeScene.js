/**
 *
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
        this.gonglueGroup.visible = false;
        ;
    };
    p.onEnable = function () {
        this.gonglueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGongLueBtnTouch, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
    };
    p.onRemove = function () {
    };
    p.onGongLueBtnTouch = function () {
        this.gonglueGroup.visible = true;
        this.gonglueGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTouch, this);
    };
    p.onGroupTouch = function () {
        this.gonglueGroup.visible = false;
        this.gonglueGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTouch, this);
    };
    p.onStartBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
