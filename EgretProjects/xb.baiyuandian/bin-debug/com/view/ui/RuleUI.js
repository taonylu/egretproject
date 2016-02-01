/**
 * 规则页面
 * @author
 *
 */
var RuleUI = (function (_super) {
    __extends(RuleUI, _super);
    function RuleUI() {
        _super.call(this, "RuleUISkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=RuleUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.jiaohuoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJiaoHuoBtnTouch, this);
    };
    //点击关闭按钮
    p.onCloseBtnTouch = function () {
        this.parent && this.parent.removeChild(this);
    };
    //点击叫货宝
    p.onJiaoHuoBtnTouch = function () {
        window.location.href = "http://www.dipo.pro";
    };
    return RuleUI;
})(BaseUI);
egret.registerClass(RuleUI,'RuleUI');
