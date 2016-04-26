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
    }
    var d = __define,c=Grass,p=c.prototype;
    return Grass;
}(BaseTile));
egret.registerClass(Grass,'Grass');
//# sourceMappingURL=Grass.js.map