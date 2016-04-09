/**
 * 胡萝卜
 * @author
 *
 */
var Carrot = (function (_super) {
    __extends(Carrot, _super);
    function Carrot() {
        _super.call(this);
        this.bitmapData = RES.getRes("item_carrot_png");
        this.score = 10;
        this.type = 0;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    var d = __define,c=Carrot,p=c.prototype;
    Carrot.NAME = "Carrot";
    return Carrot;
}(BaseItem));
egret.registerClass(Carrot,'Carrot');
