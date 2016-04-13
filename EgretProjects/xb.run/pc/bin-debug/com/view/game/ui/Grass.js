/**
 * 草地
 * @author
 *
 */
var Grass = (function (_super) {
    __extends(Grass, _super);
    function Grass(value) {
        _super.call(this);
        this.speedX = 3;
        this.speedY = 1;
    }
    var d = __define,c=Grass,p=c.prototype;
    p.randomSkin = function () {
        this.texture = RES.getRes("game_grass" + NumberTool.getRandomInt(0, 2) + "_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Grass.NAME).returnObject(this);
    };
    Grass.NAME = "Grass";
    return Grass;
}(egret.Bitmap));
egret.registerClass(Grass,'Grass');
