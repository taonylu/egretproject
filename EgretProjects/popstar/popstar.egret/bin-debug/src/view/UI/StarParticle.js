/**
 *
 * @author
 *
 */
var StarParticle = (function (_super) {
    __extends(StarParticle, _super);
    function StarParticle() {
        var partTexture = RES.getRes("starParticle_png");
        var partJson = RES.getRes("starParticle_json");
        _super.call(this, partTexture, partJson);
        this.emissionRate = 0.5;
    }
    var __egretProto__ = StarParticle.prototype;
    __egretProto__.play = function (x, y, doc) {
        this.x = x;
        this.y = y;
        this.start();
        doc.addChild(this);
        var that = this;
        egret.Tween.get(this).wait(1000).call(function () {
            var pool = ObjectPool.getPool("StarParticle");
            that.stop(true);
            pool.returnObject(that);
            doc.removeChild(that);
        });
    };
    return StarParticle;
})(particle.GravityParticleSystem);
StarParticle.prototype.__class__ = "StarParticle";
