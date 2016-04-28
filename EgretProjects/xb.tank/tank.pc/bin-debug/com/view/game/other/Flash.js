/**
 * 坦克出生时闪烁效果
 * @author
 *
 */
var Flash = (function (_super) {
    __extends(Flash, _super);
    function Flash() {
        _super.call(this);
        this.setMovieClip("flash_png", "flash_json", "flash");
        this.anchorOffsetX = 32;
        this.anchorOffsetY = 32;
    }
    var d = __define,c=Flash,p=c.prototype;
    p.playAnim = function () {
        this.gotoAndPlay(1, 1);
        this.addEventListener(egret.MovieClipEvent.COMPLETE, this.recycle, this);
    };
    p.recycle = function () {
        this.parent && this.parent.removeChild(this);
        this.gotoAndStop(1);
        ObjectPool.getPool(Flash.NAME).returnObject(this);
    };
    Flash.NAME = "Flash";
    return Flash;
}(SimpleMC));
egret.registerClass(Flash,'Flash');
