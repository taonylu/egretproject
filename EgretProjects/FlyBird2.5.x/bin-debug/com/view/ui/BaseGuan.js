/**
 * 水管基类
 * @author 羊力大仙
 * @date 2015.10.27
 */
var BaseGuan = (function (_super) {
    __extends(BaseGuan, _super);
    function BaseGuan() {
        _super.call(this);
        this.isChecked = false; //小鸟飞过水管，是否已经计数过
    }
    var d = __define,c=BaseGuan;p=c.prototype;
    p.reset = function () {
        this.isChecked = false;
    };
    return BaseGuan;
})(egret.Bitmap);
egret.registerClass(BaseGuan,"BaseGuan");
