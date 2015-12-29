/**
*  文 件 名：Boom.ts
*  功    能：爆炸
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
var Boom = (function (_super) {
    __extends(Boom, _super);
    function Boom() {
        _super.call(this);
        var json = RES.getRes("boom_json");
        var png = RES.getRes("boom_png");
        var mcFactory = new egret.MovieClipDataFactory(json, png);
        this.movieClipData = mcFactory.generateMovieClipData("boom");
        this.scaleX = 2;
        this.scaleY = 2;
    }
    var __egretProto__ = Boom.prototype;
    __egretProto__.playMC = function (target) {
        this.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.x = target.x;
        this.y = target.y;
        this.gotoAndPlay(10);
    };
    __egretProto__.onComplete = function () {
        this.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.stop();
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(Boom.NAME).returnObject(this);
    };
    __egretProto__.reset = function () {
        this.gotoAndStop(1);
    };
    Boom.NAME = "Boom";
    return Boom;
})(egret.MovieClip);
Boom.prototype.__class__ = "Boom";
