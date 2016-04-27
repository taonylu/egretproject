/**
 * 爆炸效果
 * @author
 *
 */
var Boom = (function (_super) {
    __extends(Boom, _super);
    function Boom() {
        _super.call(this);
        this.setMovieClip("boom_png", "boom_json", "boom");
        this.addEventListener(egret.MovieClipEvent.COMPLETE, this.recycle, this);
    }
    var d = __define,c=Boom,p=c.prototype;
    p.playBoom = function () {
        this.gotoAndPlay(1, 1);
    };
    p.onComplete = function () {
        this.recycle();
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.gotoAndStop(1);
        ObjectPool.getPool(Boom.NAME).returnObject(this);
    };
    Boom.NAME = "Boom";
    return Boom;
}(SimpleMC));
egret.registerClass(Boom,'Boom');
