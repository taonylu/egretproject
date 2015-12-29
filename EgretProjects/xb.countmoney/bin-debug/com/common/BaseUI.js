/**
*
*/
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI(skinName) {
        _super.call(this);
        this.inited = false;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.componentCreated, this);
        this.skinName = skinName;
    }
    var d = __define,c=BaseUI,p=c.prototype;
    p.componentCreated = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.componentCreated, this);
        this.inited = true;
    };
    return BaseUI;
})(eui.Component);
egret.registerClass(BaseUI,'BaseUI');
