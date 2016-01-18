/**
选择框
*/
var SelectUI = (function (_super) {
    __extends(SelectUI, _super);
    function SelectUI() {
        _super.call(this);
        this.bitmapData = RES.getRes("select0_png");
    }
    var d = __define,c=SelectUI,p=c.prototype;
    //停止动画，并从舞台移除
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    p.play = function (block) {
        this.x = block.x - (this.width - block.width) / 2;
        this.y = block.y - (this.height - block.height) / 2;
        block.parent.addChild(this);
    };
    return SelectUI;
})(egret.Bitmap);
egret.registerClass(SelectUI,'SelectUI');
