/**
 * 爆炸效果
 * @author
 *
 */
var Boom = (function (_super) {
    __extends(Boom, _super);
    function Boom() {
        _super.call(this);
        var png = RES.getRes("boom_png");
        var json = RES.getRes("boom_json");
        var mcF = new egret.MovieClipDataFactory(json, png);
        this.movieClipData = mcF.generateMovieClipData("boom");
    }
    var d = __define,c=Boom,p=c.prototype;
    p.playAnim = function (block) {
        this.x = block.x - (140 - block.width) / 2; //140是movieClip最大宽度
        this.y = block.y - (140 - block.height) / 2;
        block.parent.addChild(this);
        this.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.gotoAndPlay(0, 1);
    };
    p.onComplete = function () {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Boom.NAME).returnObject(this);
    };
    Boom.NAME = "Boom";
    return Boom;
})(egret.MovieClip);
egret.registerClass(Boom,'Boom');
