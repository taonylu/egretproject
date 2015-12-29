/**
 *
 * @author 
 *
 */
class QRCode {
    public  myImg: HTMLImageElement;
    
    //创建可长按识别的二维码图片
    public  createCode(): void {
        if(this.myImg == null) {
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
    }
    
    public  showCode(_x: number,_y: number,_width: number,_height: number): void {
        if(this.myImg) {
            //this.myImg.style.width = _width + "";
            //this.myImg.style.height = _height + "";
            this.myImg.style.left = _x + "px";
            this.myImg.style.top = _y + "px";
            this.myImg.style.display = "inline";
        }
    }

    public  hideCode(): void {
        if(this.myImg) {
            this.myImg.style.display = "none";
        }
    }
    
    public setPosition(_x: number,_y: number) {
        this.myImg.style.left = _x + "px";
        this.myImg.style.top = _y + "px";
    }

}







