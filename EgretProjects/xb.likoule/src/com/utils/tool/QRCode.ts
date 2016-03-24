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
    }
    
    public  showCode(): void {
        if(this.myImg) {
            egret.log("show");
            this.myImg.style.display = "inline";
        }
    }

    public  hideCode(): void {
        if(this.myImg) {
            this.myImg.style.display = "none";
        }
    }
    
    public setPosition(_x: number,_y: number) {
        if(this.myImg){
            egret.log("setPos");
            var screenWidth = document.body.clientWidth;
            var screenHeight = document.body.clientHeight;
            var stageWidth = GameConst.stage.stageWidth;
            var stageHeight = GameConst.stage.stageHeight;
            var rate;
            
            
            if(screenWidth > screenHeight){
                rate = screenHeight / stageHeight;
                this.myImg.style.width = rate * 150 + "px";
                this.myImg.style.height = rate * 150 * 248 / 215 + "px";
                this.myImg.style.top = _y * rate + "px";
                this.myImg.style.left = _x * rate + "px";
            }else{
                rate = screenWidth / stageHeight;
                this.myImg.style.width = rate * 150 + "px";
                this.myImg.style.height = rate * 150 * 248 / 215 + "px";
                this.myImg.style.right = rate * _y + "px";
                this.myImg.style.top = rate * _x + "px";
            }
            
            
            
//            if(screenWidth > screenHeight){ //手机横着
//                rate = screenHeight/stageHeight;
//                this.myImg.style.left = rate * _x + "px";
//                this.myImg.style.top = rate * _y + "px";
//            }else{  //手机竖着
//                rate = screenWidth/stageHeight;
//                this.myImg.style.right = rate * _y + "px";
//                this.myImg.style.top = rate * _x + "px";
//            }
//            this.myImg.style.width = rate * 150 + "px";
//            this.myImg.style.height = rate * 150 + "px";
            //this.myImg.style.left = rate * _x + "px";
            //this.myImg.style.top = rate * _y + "px";
            
//            egret.log("2screenWidth:",screenWidth," screeHeight:",screenHeight);
//            egret.log("stageWidth",stageWidth," stageheight:",stageHeight);
//            egret.log("left:",this.myImg.style.left);
//            egret.log("top:",this.myImg.style.top);
//            egret.log("width:",this.myImg.style.width);
//            egret.log("height:",this.myImg.style.height);
//            egret.log("orientation:",window["orientation"]);
           // this.myImg.style.left = _x + "px";
           // this.myImg.style.top = _y + "px";
        }
    }

}







