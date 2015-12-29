/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.isDrag = false; //是否拖拽状态
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initMoneyPosY = this.money.y;
    };
    p.onEnable = function () {
        this.money.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onRemove = function () {
        this.money.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onTouchBegin = function (e) {
        this.isDrag = true;
        this.beginY = e.stageY;
    };
    p.onTouchMove = function (e) {
        if (this.isDrag) {
            this.money.y += e.stageY - this.beginY;
            this.beginY = e.stageY;
        }
    };
    p.onTouchEnd = function (e) {
        if (this.isDrag && (Math.abs(this.money.y - this.initMoneyPosY) > 10)) {
            var time = (this.money.y / this.initMoneyPosY) * 200;
            egret.Tween.get(this.money).to({ y: -this.money.height }, time).call(function () {
                LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
            });
        }
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
