/**
 * 游戏进度的头像
 * @author
 *
 */
var GameHeadUI = (function (_super) {
    __extends(GameHeadUI, _super);
    function GameHeadUI() {
        _super.call(this, "GameHeadUISkin");
        this.headImg = new egret.Bitmap();
    }
    var d = __define,c=GameHeadUI,p=c.prototype;
    p.componentCreated = function () {
        this.componentCreated();
        this.addChild(this.headImg);
        this.addChild(this.headMask);
    };
    //设置头像
    p.setHeadBmd = function (bmd) {
        this.headImg.bitmapData = bmd;
    };
    //清理头像
    p.clear = function () {
        this.parent && this.parent.removeChild(this);
        this.headImg.bitmapData = null;
    };
    return GameHeadUI;
})(BaseUI);
egret.registerClass(GameHeadUI,'GameHeadUI');
