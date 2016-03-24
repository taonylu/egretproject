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
            egret.log("create");
            var gameDiv = document.getElementById("gameDiv");
            this.myImg = document.createElement("img");
            this.myImg.src = "resource/assets/codeHitArea.png";
            this.myImg.style.position = "absolute";
            this.myImg.style.display = "none";
            //this.myImg.style.width = window.screen.height*150 / GameConst.stage.stageHeight + "px";
            //this.myImg.style.height = window.screen.height*150/GameConst.stage.stageHeight + "px";
            //egret.log(window.screen.height,GameConst.stage.stageHeight);
            //egret.log(window.screen.width,GameConst.stage.stageWidth);
            gameDiv.appendChild(this.myImg);
        }
    };
    p.showCode = function () {
        if (this.myImg) {
            egret.log("show");
            this.myImg.style.display = "inline";
        }
    };
    p.hideCode = function () {
        if (this.myImg) {
            this.myImg.style.display = "none";
        }
    };
    p.setPosition = function (_x, _y) {
        if (this.myImg) {
            egret.log("setPos");
            var screenWidth = document.body.clientWidth;
            var screenHeight = document.body.clientHeight;
            var stageWidth = GameConst.stage.stageWidth;
            var stageHeight = GameConst.stage.stageHeight;
            var rate;
            if (screenWidth > screenHeight) {
                rate = screenHeight / stageHeight;
                this.myImg.style.width = rate * 150 + "px";
                this.myImg.style.height = rate * 150 * 248 / 215 + "px";
                this.myImg.style.top = _y * rate + "px";
                this.myImg.style.left = _x * rate + "px";
            }
            else {
                rate = screenWidth / stageHeight;
                this.myImg.style.width = rate * 150 + "px";
                this.myImg.style.height = rate * 150 * 248 / 215 + "px";
                this.myImg.style.right = rate * _y + "px";
                this.myImg.style.top = rate * _x + "px";
            }
        }
    };
    return QRCode;
}());
egret.registerClass(QRCode,'QRCode');
