/**
 *
 * @author
 *
 */
var Example1 = (function (_super) {
    __extends(Example1, _super);
    function Example1() {
        _super.call(this);
        var texture = RES.getRes("star_png");
        var config = RES.getRes("fireworks_json");
        if (this.system) {
            this.system.stop();
            this.removeChild(this.system);
        }
        this.system = new particle.GravityParticleSystem(texture, config);
        this.addChild(this.system);
        this.system.start();
    }
    var d = __define,c=Example1;p=c.prototype;
    return Example1;
})(egret.Sprite);
egret.registerClass(Example1,"Example1");
