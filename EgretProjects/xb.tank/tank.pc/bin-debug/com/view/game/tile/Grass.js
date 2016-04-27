/**
 * 草地
 * @author
 *
 */
var Grass = (function (_super) {
    __extends(Grass, _super);
    function Grass() {
        _super.call(this);
        this.skinName = "GrassSkin";
        this.canHit = false;
        this.canWalk = true;
        this.setType(TileEnum.grass);
    }
    var d = __define,c=Grass,p=c.prototype;
    Grass.NAME = "Grass";
    return Grass;
}(BaseTile));
egret.registerClass(Grass,'Grass');
