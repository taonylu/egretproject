/**
 * 头像UI
 * @author
 *
 */
var HeadUI = (function (_super) {
    __extends(HeadUI, _super);
    function HeadUI() {
        _super.call(this, "HeadUISkin");
        this.imgX = 10; //图片大小高宽
        this.imgY = 17;
        this.imgWidth = 50;
        this.imgHeight = 50;
        this.imageLoader = new egret.ImageLoader();
    }
    var d = __define,c=HeadUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
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
        var bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.x = this.imgX; //调整位置
        bitmap.y = this.imgY;
        //bitmap.width = this.imgWidth;
        //bitmap.height = this.imgHeight;
        this.addChild(bitmap);
        this.headImg = bitmap;
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
        this.headImg && this.removeChild(this.headImg);
        this.userID = "";
    };
    return HeadUI;
})(BaseUI);
egret.registerClass(HeadUI,'HeadUI');
