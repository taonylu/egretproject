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
        _super.call(this);
        //private headMask:eui.Image;     //头像遮罩
        this.imgWidth = 100;
        this.imgHeight = 100;
        this.imageLoader = new egret.ImageLoader(); //图片加载器
        this.skinName = "HeadUISkin";
    }
    var d = __define,c=HeadUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        //this.nameLabel.text = "";
        this.headImg = new egret.Bitmap();
        this.headImg.width = this.imgWidth;
        this.headImg.height = this.imgHeight;
        //this.headImg.mask = this.headMask;
        this.addChild(this.headImg);
    };
    p.setNameLabel = function (_name) {
        // this.nameLabel.text = _name;
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
        if (this.headImg.bitmapData == null) {
            return true;
        }
        return false;
    };
    //清理数据
    p.clear = function () {
        //this.nameLabel.text = "";
        this.headImg.bitmapData = null;
        this.openid = "";
    };
    return HeadUI;
}(BaseUI));
egret.registerClass(HeadUI,'HeadUI');
