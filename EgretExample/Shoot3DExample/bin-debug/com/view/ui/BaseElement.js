/**
 * 基类元素
 * @author
 *
 */
var BaseElement = (function (_super) {
    __extends(BaseElement, _super);
    function BaseElement() {
        _super.call(this);
        this.z = 0;
        this.fl = 250;
        this.xpos = 0; //x，y轴未加入z判断时坐标
        this.ypos = 0;
    }
    var d = __define,c=BaseElement,p=c.prototype;
    p.update = function () {
        this.scale = this.fl / (this.fl + this.z);
        this.scaleX = this.scale;
        this.scaleY = this.scale;
        this.x = this.scale * this.xpos;
        this.y = this.scale * this.ypos;
    };
    return BaseElement;
})(eui.Component);
egret.registerClass(BaseElement,'BaseElement');
