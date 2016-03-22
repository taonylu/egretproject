/**
 * 文本工厂
 * @author
 *
 */
var LabelFactory = (function () {
    function LabelFactory() {
    }
    var d = __define,c=LabelFactory,p=c.prototype;
    LabelFactory.getLabel = function () {
        var label = new eui.Label();
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.size = 25;
        label.fontFamily = "微软雅黑";
        label.textColor = 0x000000;
        return label;
    };
    return LabelFactory;
}());
egret.registerClass(LabelFactory,'LabelFactory');
