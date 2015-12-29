/**
*  功    能：爆炸效果
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
var BoomUI = (function (_super) {
    __extends(BoomUI, _super);
    function BoomUI() {
        _super.call(this);
        this.texture = RES.getRes("cloud_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    var d = __define,c=BoomUI;p=c.prototype;
    p.play = function (target) {
        this.x = target.x + this.width / 2;
        this.y = target.y + this.height / 2;
        target.parent.addChild(this);
        var self = this;
        egret.Tween.get(this).to({ alpha: 0.3, rotation: 360 }, 500).call(function () {
            self.parent.removeChild(self);
            self.alpha = 1;
            self.rotation = 0;
            ObjectPool.getPool(BoomUI.NAME).returnObject(self);
        });
    };
    BoomUI.NAME = "BoomUI";
    return BoomUI;
})(egret.Bitmap);
egret.registerClass(BoomUI,"BoomUI");
