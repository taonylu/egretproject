/**
 * 结果页面，排名123头像
 * @author
 *
 */
var ScoreHead = (function (_super) {
    __extends(ScoreHead, _super);
    function ScoreHead() {
        _super.call(this, "GameHeadSkin");
        this.imgWidth = 150;
        this.imgHeight = 150;
        this.imageLoader = new egret.ImageLoader(); //图片加载器
    }
    var d = __define,c=ScoreHead,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.nameLabel.text = "";
        this.headImg = new egret.Bitmap();
        this.headImg.width = this.imgWidth;
        this.headImg.height = this.imgHeight;
        this.headGroup.addChild(this.headImg);
    };
    p.setNameLabel = function (_name) {
        this.nameLabel.text = "昵称：" + _name;
    };
    p.setScoreLabel = function (msg) {
        this.scoreLabel.text = msg;
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
        this.scoreLabel.text = "";
        this.openid = "";
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return ScoreHead;
}(BaseUI));
egret.registerClass(ScoreHead,'ScoreHead');
