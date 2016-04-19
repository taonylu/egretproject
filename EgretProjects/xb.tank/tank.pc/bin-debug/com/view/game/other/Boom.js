/**
 * 爆炸效果
 * @author
 *
 */
var Boom = (function (_super) {
    __extends(Boom, _super);
    function Boom(pngName, jsonName, mcName) {
        _super.call(this, pngName, jsonName, mcName);
    }
    var d = __define,c=Boom,p=c.prototype;
    p.playAnim = function () {
        this.gotoAndPlay(1, 1);
        this.addEventListener(egret.MovieClipEvent.COMPLETE, this.onComplete, this);
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
