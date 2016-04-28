/**
 * 护盾
 * @author
 *
 */
var Shield = (function (_super) {
    __extends(Shield, _super);
    function Shield() {
        _super.call(this);
        this.setMovieClip("shield_png", "shield_json", "shield");
    }
    var d = __define,c=Shield,p=c.prototype;
    return Shield;
}(SimpleMC));
egret.registerClass(Shield,'Shield');
