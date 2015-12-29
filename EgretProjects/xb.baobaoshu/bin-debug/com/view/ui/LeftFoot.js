/**
 * 左脚印
 * @author
 *
 */
var LeftFoot = (function (_super) {
    __extends(LeftFoot, _super);
    function LeftFoot() {
        _super.call(this);
        this.bitmapData = RES.getRes("game_foot0_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.touchEnabled = false;
    }
    var d = __define,c=LeftFoot,p=c.prototype;
    p.recycle = function () {
        ObjectPool.getPool(LeftFoot.NAME).returnObject(this);
    };
    LeftFoot.NAME = "LeftFoot";
    return LeftFoot;
})(BaseFoot);
egret.registerClass(LeftFoot,'LeftFoot');
