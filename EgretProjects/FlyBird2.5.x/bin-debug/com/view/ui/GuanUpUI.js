/**
 * 水管向上
 * @author 羊力大仙
 * @date 2015.10.27
 */
var GuanUpUI = (function (_super) {
    __extends(GuanUpUI, _super);
    function GuanUpUI() {
        _super.call(this);
        this.texture = RES.getRes("guanup_png");
    }
    var d = __define,c=GuanUpUI,p=c.prototype;
    GuanUpUI.NAME = "GuanUpUI";
    return GuanUpUI;
})(BaseGuan);
egret.registerClass(GuanUpUI,'GuanUpUI');
