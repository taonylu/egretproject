/**
 *
 * @author
 *
 */
var QRCode = (function () {
    function QRCode() {
    }
    var d = __define,c=QRCode,p=c.prototype;
    //创建可长按识别的二维码图片
    p.createCode = function () {
        if (this.myImg == null) {
            var gameDiv = document.getElementById("gameDiv");
            this.myImg = document.createElement("img");
            this.myImg.src = "resource/assets/game_qrcode.png";
            this.myImg.style.position = "absolute";
            this.myImg.style.display = "none";
            gameDiv.appendChild(this.myImg);
        }
        //this.myImg.style.width = 100 + "";
        //this.myImg.style.height = 100 + "";
        //        this.myImg.style.left = 100+ "px";
        //        this.myImg.style.top = 100 + "px";
    };
    p.showCode = function (_x, _y, _width, _height) {
        if (this.myImg) {
            //this.myImg.style.width = _width + "";
            //this.myImg.style.height = _height + "";
            this.myImg.style.left = _x + "px";
            this.myImg.style.top = _y + "px";
            this.myImg.style.display = "inline";
        }
    };
    p.hideCode = function () {
        if (this.myImg) {
            this.myImg.style.display = "none";
        }
    };
    p.setPosition = function (_x, _y) {
        this.myImg.style.left = _x + "px";
        this.myImg.style.top = _y + "px";
    };
    return QRCode;
}());
egret.registerClass(QRCode,'QRCode');
