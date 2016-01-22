/**
 * 花瓣掉落粒子效果
 * @author
 *
 */
var FlowerParticle = (function (_super) {
    __extends(FlowerParticle, _super);
    function FlowerParticle() {
        var texture = RES.getRes("flower_png");
        var config = RES.getRes("flower_json");
        _super.call(this, texture, config);
    }
    var d = __define,c=FlowerParticle,p=c.prototype;
    return FlowerParticle;
})(particle.GravityParticleSystem);
egret.registerClass(FlowerParticle,'FlowerParticle');
