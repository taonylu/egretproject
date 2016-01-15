/**
 * 主页场景
 * @author 羊力大仙
 * @date 2015.10.27
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        this.skinName = "resource/myskins/scene/HomeSceneSkin.exml";
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.onEnable = function () {
        this.createBird();
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
    };
    p.onRemove = function () {
        this.bird && this.bird.stop();
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
    };
    p.createBird = function () {
        if (this.bird == null) {
            this.bird = new BirdMC();
            this.bird.x = (this.stage.stageWidth - this.bird.width) / 2;
            this.bird.y = (this.stage.stageHeight - this.bird.height) / 2;
            this.addChild(this.bird);
        }
        this.bird.play(-1);
    };
    p.onStartBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
