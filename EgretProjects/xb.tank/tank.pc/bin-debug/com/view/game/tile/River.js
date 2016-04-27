/**
 * 河流
 * @author
 *
 */
var River = (function (_super) {
    __extends(River, _super);
    function River() {
        _super.call(this);
        this.skinName = "RiverSkin";
        this.canHit = false;
        this.canWalk = false;
        this.setType(TileEnum.river);
    }
    var d = __define,c=River,p=c.prototype;
    River.NAME = "River";
    return River;
}(BaseTile));
egret.registerClass(River,'River');
