/**
 * 长按识别二维码
 * 因为canvas上的二维码无法长按识别，所以需要覆盖一个透明png。
 * 和img标签直接放二维码图片相比，优点：
 * 1. 二维码中心有图片时，横竖屏切换，二维码可以跟随屏幕旋转
 * 2. egret代码操作，不需要在index上写html和css等额外代码
 * 
 * @author chenkai
 * @date 2016/12/26
 * 
 * example:
 * var codeImg:eui.Image;
 * var qrCode:QRCode = new QRCode();
 * qrCode.showCode("resource/assets/qrcode.png", codeImg);
 */
class QRCode{
    /**二维码透明png的img标签*/
    private myImg: HTMLImageElement;
    /**透明图片地址*/
    private imgUrl:string;
    /**二维码图片*/
    private codeImg:egret.DisplayObject;
    
    /**重置位置*/
    private onResize(){
        console.log("屏幕旋转，重置二维码位置");
        if(this.imgUrl && this.codeImg){
            this.showCode(this.imgUrl,this.codeImg);
        }
    }

    /**
     * 显示二维码
     * imgUrl 覆盖在二维码上透明图片地址
     * codeImg egret中二维码图片 (二维码图片容器必须和stage相等高宽)
     */ 
    public showCode(imgUrl: string, codeImg: egret.DisplayObject): void {
        this.imgUrl = imgUrl;
        this.codeImg = codeImg;
        App.StageUtils.getStage().addEventListener(
            egret.StageOrientationEvent.ORIENTATION_CHANGE,this.onResize,this);
        
        //二维码不存在，则创建一个
        if(this.myImg == null){   
            var gameDiv = document.getElementById("gameDiv");
            this.myImg = document.createElement("img");
            this.myImg.src = imgUrl;
            this.myImg.style.position = "absolute";
            this.myImg.style.display = "none";
            gameDiv.appendChild(this.myImg);
        }
        
        //竖屏
        if(document.body.clientWidth < document.body.clientHeight){
            var wScale = document.body.clientWidth / App.StageUtils.stageWidth;
            var hScale = document.body.clientHeight / App.StageUtils.stageHeight;
            this.myImg.style.width = codeImg.width * wScale + "px";
            this.myImg.style.height = codeImg.height * hScale + "px";
            this.myImg.style.left = codeImg.x * wScale + "px";
            this.myImg.style.top = codeImg.y * hScale + "px";
            this.myImg.style.display = "inline";
        //横屏
        }else{
            var wScale = document.body.clientWidth / App.StageUtils.stageHeight;
            var hScale = document.body.clientHeight / App.StageUtils.stageWidth;
            this.myImg.style.width = codeImg.height*wScale + "px";
            this.myImg.style.height = codeImg.width*hScale + "px";
            this.myImg.style.top = (App.StageUtils.stageWidth - codeImg.x - codeImg.width)*hScale + "px";
            this.myImg.style.left = codeImg.y*wScale + "px";
            this.myImg.style.display = "inline";
        }
        
    }
    
    /**隐藏二维码*/
    public hideCode(): void {
        if(this.myImg) {
            this.myImg.style.display = "none";
        }
    }
    
    /**销毁*/
    public onDestroy(){
        App.StageUtils.getStage().removeEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE,this.onResize,this);
        this.codeImg = null;
    }
}
