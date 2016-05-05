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
        this.imageLoader = new egret.ImageLoader(); //图片加载器
        this.skinName = "HeadUISkin";
    }
    var d = __define,c=HeadUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.headImg = new egret.Bitmap();
        this.headImg.width = this.width;
        this.headImg.height = this.height;
        this.addChild(this.headImg);
    };
    p.createWenHao = function () {
        this.wenHao = new egret.Bitmap(RES.getRes("home_wenhao_png"));
        this.addChild(this.wenHao);
    };
    p.loadImg = function (imgUrl) {
        this.clear();
        if (imgUrl == "" || imgUrl == null) {
            return;
        }
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        this.imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        this.imageLoader.load(imgUrl);
    };
    //加载完成
    p.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        this.headImg.bitmapData = imageLoader.data;
        if (this.wenHao) {
            this.wenHao.visible = false;
        }
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
        this.headImg.bitmapData = null;
        this.openid = "";
        if (this.wenHao) {
            this.wenHao.visible = true;
        }
    };
    return HeadUI;
}(BaseUI));
egret.registerClass(HeadUI,'HeadUI');
