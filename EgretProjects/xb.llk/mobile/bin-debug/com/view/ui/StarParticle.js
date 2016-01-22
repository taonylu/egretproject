/**
 * 星星粒子效果
 * @author
 *
 */
var StarParticle = (function (_super) {
    __extends(StarParticle, _super);
    function StarParticle() {
        _super.call(this);
        var texture = RES.getRes("skillBang_png");
        var config = RES.getRes("skillBang_json");
        this.system = new particle.GravityParticleSystem(texture, config);
        this.addChild(this.system);
    }
    var d = __define,c=StarParticle,p=c.prototype;
    p.play = function () {
        this.system.start();
    };
    p.stop = function () {
        this.system.stop();
    };
    return StarParticle;
})(egret.DisplayObjectContainer);
egret.registerClass(StarParticle,'StarParticle');
