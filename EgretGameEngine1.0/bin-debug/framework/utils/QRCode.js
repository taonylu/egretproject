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
    }
    /**
     * 创建<img>的二维码图片
     * @param codeImgUrl 二维码图片地址
     */
    QRCode.prototype.createHtmlCode = function (codeImgUrl) {
        if (this.htmlCode == null) {
            var gameDiv = document.getElementById("gameDiv");
            this.htmlCode = document.createElement("img");
            this.htmlCode.src = codeImgUrl;
            this.htmlCode.style.position = "absolute";
            this.htmlCode.style.display = "none";
            gameDiv.appendChild(this.htmlCode);
        }
    };
    /**
     * 显示二维码
     * codeImgUrl 二维码图片地址
     * euiImg egret中二维码图片 (二维码图片容器必须和stage相等高宽)
     */
    QRCode.prototype.showHtmlCode = function (codeImgUrl, euiImg) {
        if (this.htmlCode) {
            this.setSize(euiImg.width, euiImg.height);
            this.setPosition(euiImg.x, euiImg.y);
            this.htmlCode.style.display = "none";
        }
    };
    /**隐藏二维码*/
    QRCode.prototype.hideHtmlCode = function () {
        if (this.htmlCode) {
            this.htmlCode.style.display = "none";
        }
    };
    /**
     * 设置二维码图片位置
     * @param xPos exml中x坐标
     * @param yPos exml中y坐标
     */
    QRCode.prototype.setPosition = function (xPos, yPos) {
        if (this.htmlCode) {
            var wScale = document.body.clientWidth / App.StageUtils.stageWidth;
            var hScale = document.body.clientHeight / App.StageUtils.stageHeight;
            this.htmlCode.style.left = xPos * wScale + "px";
            this.htmlCode.style.top = yPos * hScale + "px";
        }
    };
    /**
     * 设置二维码高宽
     * @param width  <img>在exml中width
     * @param height <img>在exml中的height
     */
    QRCode.prototype.setSize = function (width, height) {
        if (this.htmlCode) {
            var wScale = document.body.clientWidth / App.StageUtils.stageWidth;
            var hScale = document.body.clientHeight / App.StageUtils.stageHeight;
            this.htmlCode.style.left = width * wScale + "px";
            this.htmlCode.style.top = height * hScale + "px";
        }
    };
    /**销毁*/
    QRCode.prototype.destroy = function () {
        if (this.htmlCode) {
            this.htmlCode.parentNode.removeChild(this.htmlCode);
            this.htmlCode = null;
        }
    };
    return QRCode;
}());
__reflect(QRCode.prototype, "QRCode");
//# sourceMappingURL=QRCode.js.map