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
        this.imgWidth = 55;
        this.imgHeight = 55;
    }
    var d = __define,c=GameHeadUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.addChild(this.headImg);
        this.addChild(this.headMask);
        this.anchorOffsetX = this.width / 2;
    };
    //设置头像
    p.setHeadBmd = function (bmd) {
        this.headImg.bitmapData = bmd;
        this.headImg.width = this.imgWidth;
        this.headImg.height = this.imgHeight;
        this.headImg.x = 23;
        this.headImg.y = 20;
    };
    //清理头像
    p.clear = function () {
        this.parent && this.parent.removeChild(this);
        this.headImg.bitmapData = null;
    };
    return GameHeadUI;
})(BaseUI);
egret.registerClass(GameHeadUI,'GameHeadUI');
