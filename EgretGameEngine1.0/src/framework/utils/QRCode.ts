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
class QRCode{
    /**html中<img>标签二维码*/
    private htmlCode: HTMLImageElement;

    /**
     * 创建<img>的二维码图片
     * @param codeImgUrl 二维码图片地址
     */
    private createHtmlCode(codeImgUrl:string){
        if(this.htmlCode == null) {
            var gameDiv = document.getElementById("gameDiv");
            this.htmlCode = document.createElement("img");
            this.htmlCode.src = codeImgUrl;
            this.htmlCode.style.position = "absolute";
            this.htmlCode.style.display = "none";
            gameDiv.appendChild(this.htmlCode);
        }
    }


    /**
     * 显示二维码
     * codeImgUrl 二维码图片地址
     * euiImg egret中二维码图片 (二维码图片容器必须和stage相等高宽)
     */ 
    public showHtmlCode(codeImgUrl: string,euiImg: egret.DisplayObject): void {
        if(this.htmlCode){
             this.setSize(euiImg.width, euiImg.height);
             this.setPosition(euiImg.x, euiImg.y);
             this.htmlCode.style.display = "none";
        }
    }
    
    /**隐藏二维码*/
    public hideHtmlCode(): void {
        if(this.htmlCode) {
            this.htmlCode.style.display = "none";
        }
    }

    /**
     * 设置二维码图片位置
     * @param xPos exml中x坐标
     * @param yPos exml中y坐标
     */
    public setPosition(xPos:number, yPos:number){
        if(this.htmlCode){
            var wScale = document.body.clientWidth / App.StageUtils.stageWidth;
            var hScale = document.body.clientHeight / App.StageUtils.stageHeight;
            this.htmlCode.style.left = xPos * wScale + "px";
            this.htmlCode.style.top = yPos * hScale + "px";
        }
    }

    /**
     * 设置二维码高宽
     * @param width  <img>在exml中width
     * @param height <img>在exml中的height
     */
    public setSize(width:number, height:number){
        if(this.htmlCode){
            var wScale = document.body.clientWidth / App.StageUtils.stageWidth;
            var hScale = document.body.clientHeight / App.StageUtils.stageHeight;
            this.htmlCode.style.left = width * wScale + "px";
            this.htmlCode.style.top = height * hScale + "px";
        }
    }
    
    /**销毁*/
    public destroy(){
        if(this.htmlCode){
            this.htmlCode.parentNode.removeChild(this.htmlCode);
            this.htmlCode = null;
        }
    }
}
