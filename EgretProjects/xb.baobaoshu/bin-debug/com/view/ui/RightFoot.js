/**
 * 右脚印
 * @author
 *
 */
var RightFoot = (function (_super) {
    __extends(RightFoot, _super);
    function RightFoot() {
        _super.call(this);
        this.bitmapData = RES.getRes("game_foot1_png");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.touchEnabled = false;
    }
    var d = __define,c=RightFoot,p=c.prototype;
    p.recycle = function () {
        ObjectPool.getPool(RightFoot.NAME).returnObject(this);
    };
    RightFoot.NAME = "RightFoot";
    return RightFoot;
})(BaseFoot);
egret.registerClass(RightFoot,'RightFoot');
