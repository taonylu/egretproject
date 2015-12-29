/**
*  文 件 名：Lightning.ts
*  功    能：闪电
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
var Lightning = (function (_super) {
    __extends(Lightning, _super);
    function Lightning() {
        _super.call(this);
        var json = RES.getRes("shandian_json");
        var png = RES.getRes("shandian_png");
        var mcFactory = new egret.MovieClipDataFactory(json, png);
        this.movieClipData = mcFactory.generateMovieClipData("shandian");
    }
    var __egretProto__ = Lightning.prototype;
    __egretProto__.playMC = function () {
        this.alpha = 1;
        this.gotoAndPlay(1);
        egret.Tween.get(this).wait(300).to({ alpha: 0 }, 100).call(this.onComplete, this);
    };
    __egretProto__.onComplete = function () {
        this.stop();
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Lightning.NAME).returnObject(this);
    };
    Lightning.NAME = "Lightning";
    return Lightning;
})(egret.MovieClip);
Lightning.prototype.__class__ = "Lightning";
