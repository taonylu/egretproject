/**
*  文 件 名： HeadUI.ts
*  功    能： 头像组件
*  内    容：
*  作    者： Rikimaru
*  生成日期： ?
*  修改日期：2016/3/31
*  修改日志：
*
* Example:
  var headUI:HeadUI = new HeadUI();
  headUI.loadImg(headUrl);
  headUI.setNameLabel("peter");
  headUI.clear();
*/
var HeadUI = (function (_super) {
    __extends(HeadUI, _super);
    function HeadUI() {
        _super.call(this, "HeadUISkin");
        this.imgX = 10; //图片大小高宽和位置
        this.imgY = 17;
        this.imgWidth = 45;
        this.imgHeight = 45;
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
        this.userID = "";
    };
    return HeadUI;
}(BaseUI));
egret.registerClass(HeadUI,'HeadUI');
