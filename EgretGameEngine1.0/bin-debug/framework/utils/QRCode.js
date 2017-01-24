/**
 * 生成<img>标签二维码
 * @author chenkai
 * @date 2016/12/26
 * @modify 2017/1/18
 *
 * example:
 * var euiImg:eui.Image;    //exml上二维码图片
 * var qrCode:QRCode = new QRCode();
 * qrCode.showCode("resource/assets/qrcode.png", euiImg);
 */
var QRCode = (function (_super) {
    __extends(QRCode, _super);
    function QRCode() {
        _super.call(this);
    }
    var d = __define,c=QRCode,p=c.prototype;
    /**重置位置*/
    p.onResize = function () {
        var _this = this;
        console.log("屏幕旋转，重置二维码位置");
        if (this.htmlImgUrl && this.euiImg) {
            egret.Tween.get(this).wait(180).call(function () {
                _this.showHtmlCode(_this.htmlImgUrl, _this.euiImg);
            }, this);
        }
    };
    /**
     * 显示html中img标签二维码
     * @htmlImgUrl 二维码地址
     * @euiImg egret中二维码图片 (二维码图片容器必须和stage相等高宽)
     */
    p.showHtmlCode = function (htmlImgUrl, euiImg) {
        this.htmlImgUrl = htmlImgUrl;
        this.euiImg = euiImg;
        App.StageUtils.getStage().addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onResize, this);
        //二维码不存在，则创建一个
        if (this.htmlImg == null) {
            var gameDiv = document.getElementById("gameDiv");
            this.htmlImg = document.createElement("img");
            this.htmlImg.onload = function () {
                euiImg.visible = false; //隐藏eui上原有图片，防止重叠
            };
            this.htmlImg.src = htmlImgUrl;
            this.htmlImg.style.position = "absolute";
            this.htmlImg.style.display = "none";
            gameDiv.appendChild(this.htmlImg);
        }
        //竖屏
        if (document.body.clientWidth < document.body.clientHeight) {
            this.htmlImg.style.transform = "rotate(0deg)";
            var wScale = document.body.clientWidth / App.StageUtils.stageWidth;
            var hScale = document.body.clientHeight / App.StageUtils.stageHeight;
            this.htmlImg.style.width = euiImg.width * wScale + "px";
            this.htmlImg.style.height = euiImg.height * hScale + "px";
            this.htmlImg.style.left = euiImg.x * wScale + "px";
            this.htmlImg.style.top = euiImg.y * hScale + "px";
            this.htmlImg.style.display = "inline";
        }
        else {
            this.htmlImg.style.transform = "rotate(-90deg)";
            var wScale = document.body.clientWidth / App.StageUtils.stageHeight;
            var hScale = document.body.clientHeight / App.StageUtils.stageWidth;
            this.htmlImg.style.width = euiImg.height * wScale + "px";
            this.htmlImg.style.height = euiImg.width * hScale + "px";
            this.htmlImg.style.top = (App.StageUtils.stageWidth - euiImg.x - euiImg.width) * hScale + "px";
            this.htmlImg.style.left = euiImg.y * wScale + "px";
            this.htmlImg.style.display = "inline";
        }
    };
    /**隐藏html二维码*/
    p.hideHtmlCode = function () {
        if (this.htmlImg) {
            this.htmlImg.style.display = "none";
        }
    };
    /**显示eui上二维码，主要是用于点击分享，显示分享提示，这时html二维码会被置于顶层*/
    p.showEuiCode = function () {
        if (this.euiImg) {
            this.euiImg.visible = true;
        }
    };
    /**隐藏eui上二维码*/
    p.hideEuiCode = function () {
        if (this.euiImg) {
            this.euiImg.visible = false;
        }
    };
    /**销毁*/
    p.onDestroy = function () {
        App.StageUtils.getStage().removeEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onResize, this);
        this.euiImg = null;
    };
    return QRCode;
}(SingleClass));
egret.registerClass(QRCode,'QRCode');
