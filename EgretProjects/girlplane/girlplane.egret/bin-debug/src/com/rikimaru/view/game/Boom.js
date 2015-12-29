/**
*  文 件 名：Boom.ts
*  功    能：爆炸类
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
var Boom = (function (_super) {
    __extends(Boom, _super);
    function Boom() {
        _super.call(this);
        var png = RES.getRes("boom_png");
        var json = RES.getRes("boom_json");
        var mcF = new egret.MovieClipDataFactory(json, png);
        this.movieClipData = mcF.generateMovieClipData("boom");
        this.anchorOffsetX = this.width;
        this.anchorOffsetY = this.height;
        this.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
    }
    var __egretProto__ = Boom.prototype;
    __egretProto__.onComplete = function () {
        this.stop();
        this.parent && this.parent.removeChild(this);
        this.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
    };
    Boom.NAME = "Boom";
    return Boom;
})(egret.MovieClip);
Boom.prototype.__class__ = "Boom";
