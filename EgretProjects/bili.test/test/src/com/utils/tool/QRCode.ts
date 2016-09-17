/**
*  文 件 名： QRCode.ts
*  功    能： 二维码生成
*  内    容： 在egret里加载二维码图片，生成img标签图，可以长按识别扫描
*  作    者： Rikimaru
*  生成日期： 2015/8/22
*  修改日期： 2016/3/7
*  修改日志：
* 
* Example:

*/
class QRCode {
    public  myImg: HTMLImageElement;  //img标签
    public width:number = 0;
    public height:number = 0;
    
    /**
     * 创建二维码img标签
     * @param imgUrl 二维码图片地址
     */ 
    public  createCode(imgUrl:string): void {
        if(this.myImg == null) {
            var gameDiv = document.getElementById("gameDiv");
            this.myImg = document.createElement("img");
            this.myImg.src = imgUrl;
            this.myImg.style.position = "absolute";
            this.myImg.style.display = "none";
            gameDiv.appendChild(this.myImg);
        }
    }
    
    //显示二维码
    public  showCode(): void {
        if(this.myImg) {
            egret.log("show");
            this.myImg.style.display = "inline";
        }
    }

    //隐藏二维码
    public  hideCode(): void {
        if(this.myImg) {
            this.myImg.style.display = "none";
        }
    }
    
    /**
     * 设置二维码位置
     * @param _x  egret中x坐标
     * @param _y  egret中y坐标
     */ 
    public setPosition(_x: number,_y: number) {
        if(this.myImg){
            egret.log("setPos");
            var screenWidth = document.body.clientWidth;
            var screenHeight = document.body.clientHeight;
            var stageWidth = GameConst.stage.stageWidth;
            var stageHeight = GameConst.stage.stageHeight;
            var rate;
            
            
            if(screenWidth > screenHeight) { //手机竖着
                rate = screenWidth / stageHeight;
                this.myImg.style.width = rate * 150 + "px";   //150 egret里宽度 
                this.myImg.style.height = rate * 150 * 248 / 215 + "px"; //248x215图片实际高宽
                this.myImg.style.right = rate * _y + "px";
                this.myImg.style.top = rate * _x + "px";
            }else{   //手机横着
                rate = screenHeight / stageHeight;
                this.myImg.style.width = rate * 150 + "px";
                this.myImg.style.height = rate * 150 * 248 / 215 + "px";
                this.myImg.style.top = _y * rate + "px";
                this.myImg.style.left = _x * rate + "px";
            }
        }
    }

}







