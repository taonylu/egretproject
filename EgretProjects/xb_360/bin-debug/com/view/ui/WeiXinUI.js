/**
 *
 * @author
 *
 */
var WeiXinUI = (function (_super) {
    __extends(WeiXinUI, _super);
    function WeiXinUI() {
        _super.call(this);
    }
    var d = __define,c=WeiXinUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.img0.visible = false;
        this.img1.visible = false;
        this.img2.visible = false;
        this.img3.visible = false;
    };
    p.play = function () {
        var self = this;
        this.img0.visible = true;
        egret.Tween.get(this).wait(100).call(function () {
            self.img0.visible = false;
            self.img1.visible = true;
        }, this).wait(100).call(function () {
            self.img1.visible = false;
            self.img2.visible = true;
        }, this).wait(100).call(function () {
            self.img2.visible = false;
            self.img3.visible = true;
        }, this);
    };
    return WeiXinUI;
})(BaseUI);
egret.registerClass(WeiXinUI,'WeiXinUI');
