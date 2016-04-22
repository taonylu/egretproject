/**
 * 河流
 * @author
 *
 */
var River = (function (_super) {
    __extends(River, _super);
    function River() {
        _super.call(this);
        this.canHit = false;
        this.canWalk = false;
    }
    var d = __define,c=River,p=c.prototype;
    River.NAME = "River";
    return River;
}(BaseTile));
egret.registerClass(River,'River');
