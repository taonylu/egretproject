/**
 * 胡萝卜
 * @author
 *
 */
var Carrot = (function (_super) {
    __extends(Carrot, _super);
    function Carrot() {
        _super.call(this);
        this.bitmapData = RES.getRes("carrot_png");
        this.score = 10;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    var d = __define,c=Carrot,p=c.prototype;
    p.recycle = function () {
        _super.prototype.recycle.call(this);
        this.parent && this.parent.removeChild(this);
        this.alpha = 1;
        ObjectPool.getPool(Carrot.NAME).returnObject(this);
    };
    Carrot.NAME = "Carrot";
    return Carrot;
}(BaseItem));
egret.registerClass(Carrot,'Carrot');
