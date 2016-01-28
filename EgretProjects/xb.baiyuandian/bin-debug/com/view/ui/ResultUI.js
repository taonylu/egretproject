/**
 * 结算面板UI
 * @author
 *
 */
var ResultUI = (function (_super) {
    __extends(ResultUI, _super);
    function ResultUI() {
        _super.call(this, "ResultUISkin");
    }
    var d = __define,c=ResultUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.setLabel(this._nickName);
        this.setHead(this._headUrl);
    };
    //设置昵称
    p.setLabel = function (nickName) {
        this._nickName = nickName;
        if (this.inited) {
            this.scoreLabel.text = this._nickName;
        }
    };
    //加载头像
    p.setHead = function (headUrl) {
        this._headUrl = headUrl;
        if (this.inited) {
            var imageLoader = new egret.ImageLoader();
            imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
            imageLoader.load(this._headUrl);
        }
    };
    //加载完毕
    p.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        var bitmap = new egret.Bitmap(imageLoader.data);
        this.headGroup.addChild(bitmap);
        bitmap.mask = this.headMask;
    };
    //清理
    p.clear = function () {
        this.scoreLabel.text = "";
        if (this.headGroup.numChildren > 0) {
            var bm = this.headGroup.getChildAt(0);
            bm.mask = null;
            this.headGroup.removeChild(bm);
        }
    };
    return ResultUI;
})(BaseUI);
egret.registerClass(ResultUI,'ResultUI');
