var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 长按识别二维码(只适用于竖屏游戏)
 * 创建img标签的二维码，在微信里长按扫描识别
 * @author chenkai
 * @date 2016/12/26
 *
 * example:
 * var euiImg:eui.Image;    //exml上二维码图片
 * var qrCode:QRCode = new QRCode();
 * qrCode.showHtmlCode("resource/assets/qrcode.png", euiImg);
 * qrCode.hideHtmlCode();
 */
var QRCode = (function () {
    function QRCode() {
        /**是否允许旋转屏幕时重置二维码，在显示有黑色半透明分享提示时，不需要重置*/
        this.enable = true;
        /**二维码是否初始化过位置*/
        this.bInit = false;
    }
    /**旋转屏幕，重置位置*/
    QRCode.prototype.onResize = function () {
        if (this.htmlImgUrl && this.euiImg) {
            this.showHtmlCode(this.htmlImgUrl, this.euiImg);
        }
    };
    /**
     * 显示二维码
     * htmlImgUrl html中img标签二维码图片地址
     * euiImg egret中二维码图片 (二维码图片容器必须和stage相等高宽)
     */
    QRCode.prototype.showHtmlCode = function (htmlImgUrl, euiImg) {
        var _this = this;
        //pc端不重置
        if (App.DeviceUtils.isPC) {
            return;
        }
        //监听屏幕旋转
        App.StageUtils.getStage().addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onResize, this);
        //判断横竖屏
        var portrait = document.body.clientWidth < document.body.clientHeight;
        this.htmlImgUrl = htmlImgUrl;
        this.euiImg = euiImg;
        //横屏时，始终显示eui二维码
        if (portrait == false) {
            this.euiImg.visible = true;
            if (this.htmlImg) {
                this.htmlImg.style.display = "none";
            }
        }
        else {
            this.enable = true; //防止间隔小于400ms时，二维码异步处理出错
            egret.Tween.get(this).wait(400).call(function () {
                //禁止重置时，退出
                if (_this.enable == false) {
                    return;
                }
                //显示html二维码，并隐藏eui二维码
                if (_this.htmlImg == null) {
                    var gameDiv = document.getElementById("gameDiv");
                    _this.htmlImg = document.createElement("img");
                    _this.htmlImg.onload = function () {
                        euiImg.visible = false;
                    };
                    _this.htmlImg.src = htmlImgUrl;
                    _this.htmlImg.style.position = "absolute";
                    _this.htmlImg.style.display = "none";
                    gameDiv.appendChild(_this.htmlImg);
                }
                else {
                    _this.euiImg.visible = false;
                }
                //计算hmtl二维码的高宽
                var wScale = document.body.clientWidth / App.StageUtils.stageWidth;
                var hScale = document.body.clientHeight / App.StageUtils.stageHeight;
                var htmlImgWidth = euiImg.width * wScale;
                var htmlImgHeight = euiImg.height * hScale;
                //旋转时，stage的高宽会偶尔发生获取错误，这里在获取错误时，不重置二维码大小和位置
                if (_this.bInit == false || htmlImgWidth / htmlImgHeight == _this.euiImg.width / _this.euiImg.height) {
                    _this.bInit = true;
                    _this.htmlImg.style.width = htmlImgWidth + "px";
                    _this.htmlImg.style.height = htmlImgHeight + "px";
                    _this.htmlImg.style.left = euiImg.x * wScale + "px";
                    _this.htmlImg.style.top = euiImg.y * hScale + 1 + "px"; //有1px的偏移
                }
                _this.htmlImg.style.display = "inline";
            }, this);
        }
    };
    /**隐藏二维码*/
    QRCode.prototype.hideHtmlCode = function () {
        if (App.DeviceUtils.isPC) {
            return;
        }
        this.enable = false;
        if (this.htmlImg && this.euiImg) {
            this.htmlImg.style.display = "none";
            this.euiImg.visible = true;
        }
    };
    /**销毁*/
    QRCode.prototype.onDestroy = function () {
        //TODO
    };
    return QRCode;
}());
__reflect(QRCode.prototype, "QRCode");
