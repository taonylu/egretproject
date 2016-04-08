/**
 * 结算页面，本次游戏玩家排名
 * @author
 *
 */
var ResultHead = (function (_super) {
    __extends(ResultHead, _super);
    function ResultHead() {
        _super.call(this, "ResultHeadSkin");
        this.imgWidth = 75;
        this.imgHeight = 75;
        this.imageLoader = new egret.ImageLoader(); //图片加载器
    }
    var d = __define,c=ResultHead,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.nameLabel.text = "";
        this.headImg = new egret.Bitmap();
        this.headImg.width = this.imgWidth;
        this.headImg.height = this.imgHeight;
        if (this.headMask) {
            this.headImg.mask = this.headMask;
        }
        this.imgGroup.addChild(this.headImg);
    };
    p.setNameLabel = function (_name) {
        this.nameLabel.text = _name;
    };
    p.loadImg = function (imgUrl) {
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        this.imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        this.imageLoader.load(imgUrl);
    };
    //加载完成
    p.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        this.headImg.bitmapData = imageLoader.data;
    };
    //加载头像错误
    p.onLoadError = function () {
        egret.log("加载头像错误");
    };
    //是否为空
    p.isEmpty = function () {
        if (this.nameLabel.text == "") {
            return true;
        }
        return false;
    };
    //清理数据
    p.clear = function () {
        this.nameLabel.text = "";
        this.headImg.bitmapData = null;
        this.openid = "";
    };
    return ResultHead;
}(BaseUI));
egret.registerClass(ResultHead,'ResultHead');
