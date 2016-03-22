/**
 * 蜜蜂
 * @author
 *
 */
var Bee = (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        _super.call(this, "bee_png", "bee_json", "bee");
        this.direction = 0; //0停 -1上 1下 
        this.speedX = 5;
        this.speedY = 8;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2 + 30;
    }
    var d = __define,c=Bee,p=c.prototype;
    return Bee;
}(SimpleMC));
egret.registerClass(Bee,'Bee');
