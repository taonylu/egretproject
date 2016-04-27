/**
 *
 * @author
 *
 */
var TankBoom = (function (_super) {
    __extends(TankBoom, _super);
    function TankBoom() {
        _super.call(this);
        this.setMovieClip("tankBoom_png", "tankBoom_json", "tankBoom");
        this.anchorOffsetX = 64;
        this.anchorOffsetY = 64;
        this.addEventListener(egret.MovieClipEvent.COMPLETE, this.recycle, this);
    }
    var d = __define,c=TankBoom,p=c.prototype;
    p.playBoom = function () {
        this.gotoAndPlay(1, 1);
    };
    p.onComplete = function () {
        this.recycle();
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.gotoAndStop(1);
        ObjectPool.getPool(TankBoom.NAME).returnObject(this);
    };
    TankBoom.NAME = "TankBoom";
    return TankBoom;
}(SimpleMC));
egret.registerClass(TankBoom,'TankBoom');
