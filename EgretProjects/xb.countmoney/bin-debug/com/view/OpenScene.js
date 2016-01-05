/**
 * 拆红包场景
 * @author
 *
 */
var OpenScene = (function (_super) {
    __extends(OpenScene, _super);
    function OpenScene() {
        _super.call(this, "OpenSceneSkin");
    }
    var d = __define,c=OpenScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initShareBtnY = this.shareBtn.y;
    };
    p.onEnable = function () {
        this.openGroup.visible = true;
        this.openedGroup.visible = false;
        //分享按钮动画
        egret.Tween.get(this.shareBtn, { loop: true }).to({ y: this.initShareBtnY + 15 }, 500).to({ y: this.initShareBtnY }, 500);
        //监听
        this.openBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBtnTouch, this);
    };
    p.onRemove = function () {
        egret.Tween.removeTweens(this.shareBtn);
        this.openBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openBtnTouch, this);
    };
    //拆红包按钮
    p.openBtnTouch = function () {
        //发送拆红包请求
    };
    //接收拆红包结果
    p.revOpenRequest = function () {
    };
    return OpenScene;
})(BaseScene);
egret.registerClass(OpenScene,'OpenScene');
