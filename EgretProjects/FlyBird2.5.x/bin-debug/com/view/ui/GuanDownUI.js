/**
 * 水管朝下
 * @author 羊力大仙
 * @date 2015.10.27
 */
var GuanDownUI = (function (_super) {
    __extends(GuanDownUI, _super);
    function GuanDownUI() {
        _super.call(this);
        this.texture = RES.getRes("guandown_png");
    }
    var d = __define,c=GuanDownUI,p=c.prototype;
    GuanDownUI.NAME = "GuanDownUI";
    return GuanDownUI;
})(BaseGuan);
egret.registerClass(GuanDownUI,'GuanDownUI');
