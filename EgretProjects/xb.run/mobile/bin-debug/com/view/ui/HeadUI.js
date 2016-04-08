/**
 * 结算页面，分数排名头像
 * @author
 *
 */
var HeadUI = (function (_super) {
    __extends(HeadUI, _super);
    function HeadUI() {
        _super.call(this, "HeadUISkin");
        this.imgX = 8; //图片大小高宽和位置
        this.imgY = 7;
        this.imgWidth = 75;
        this.imgHeight = 75;
        this.imageLoader = new egret.ImageLoader(); //图片加载器
    }
    var d = __define,c=HeadUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.nameLabel.text = "";
        this.headImg = new egret.Bitmap();
        this.headImg.x = this.imgX; //调整位置
        this.headImg.y = this.imgY;
        this.headImg.width = this.imgWidth;
        this.headImg.height = this.imgHeight;
        this.headImg.mask = this.headMask;
        this.addChild(this.headImg);
    };
    p.setUserInfo = function (headUrl, nickName, rank) {
        if (this.isEmpty() == false) {
            this.clear();
        }
        this.setNameLabel(nickName);
        this.loadImg(headUrl);
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
    return HeadUI;
}(BaseUI));
egret.registerClass(HeadUI,'HeadUI');
