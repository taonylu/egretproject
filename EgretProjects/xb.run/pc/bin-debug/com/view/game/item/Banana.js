/**
 * 香蕉
 * @author
 *
 */
var Banana = (function (_super) {
    __extends(Banana, _super);
    function Banana() {
        _super.call(this);
        this.bitmapData = RES.getRes("item_banana_png");
        this.type = 0;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.score = 10;
    }
    var d = __define,c=Banana,p=c.prototype;
    Banana.NAME = "Banana";
    return Banana;
}(BaseItem));
egret.registerClass(Banana,'Banana');
