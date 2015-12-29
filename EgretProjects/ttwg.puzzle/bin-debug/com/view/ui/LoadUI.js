/**
 * 加载UI
 * @author
 */
var LoadUI = (function (_super) {
    __extends(LoadUI, _super);
    function LoadUI() {
        _super.call(this);
        this.loadText = new egret.TextField();
        this.loadText.textAlign = egret.HorizontalAlign.CENTER;
        this.loadText.width = 100;
        this.loadText.textColor = 0x000000;
        this.addChild(this.loadText);
        this.x = GameConst.stage.stageWidth / 2 - this.loadText.width / 2;
        this.y = GameConst.stage.stageHeight / 2;
    }
    var d = __define,c=LoadUI;p=c.prototype;
    p.setLoadText = function (str) {
        this.loadText.text = str;
    };
    return LoadUI;
})(egret.DisplayObjectContainer);
egret.registerClass(LoadUI,"LoadUI");
