/**
 * 长按识别二维码(只适用于竖屏游戏)
 * 创建img标签的二维码，在微信里长按扫描识别
 * @author chenkai
 * @date 2016/12/26
 * 
 * example:
 * var codeImg:eui.Image;    //exml上二维码图片
 * var qrCode:QRCode = new QRCode();
 * qrCode.showCode("resource/assets/qrcode.png", codeImg);
 */
class QRCode{
    /**html中<img>标签二维码*/
    private htmlImg: HTMLImageElement;
    /**二维码图片地址*/
    private htmlImgUrl:string;
    /**二维码图片*/
    private euiImg:egret.DisplayObject;
    /**是否允许旋转屏幕时重置二维码，在显示有黑色半透明分享提示时，不需要重置*/
    public enable:boolean = true;
    /**二维码是否初始化过位置*/
    private bInit:boolean = false;
    
    /**旋转屏幕，重置位置*/
    private onResize(){
        if(this.htmlImgUrl && this.euiImg){
            this.showHtmlCode(this.htmlImgUrl,this.euiImg); 
        }
    }

    /**
     * 显示二维码
     * htmlImgUrl html中img标签二维码图片地址
     * euiImg egret中二维码图片 (二维码图片容器必须和stage相等高宽)
     */ 
    public showHtmlCode(htmlImgUrl: string,euiImg: egret.DisplayObject): void {
        //pc端不重置
        if(App.DeviceUtils.isPC) {
            return;
        }
        //监听屏幕旋转
        App.StageUtils.getStage().addEventListener(
            egret.StageOrientationEvent.ORIENTATION_CHANGE,this.onResize,this);
        //判断横竖屏
        var portrait: boolean = document.body.clientWidth < document.body.clientHeight;
        this.htmlImgUrl = htmlImgUrl;
        this.euiImg = euiImg;
        //横屏时，始终显示eui二维码
        if(portrait == false){
            this.euiImg.visible = true;
            if(this.htmlImg ){
                this.htmlImg.style.display = "none";
            }
        //竖屏时，设置html二维码标签，延迟一段时间才能获取euiImg.y值
        }else{
            egret.Tween.get(this).wait(400).call(() => {
                //禁止重置时，退出
                if(this.enable == false){
                    return;
                }
                //显示html二维码，并隐藏eui二维码
                if(this.htmlImg == null) {
                    var gameDiv = document.getElementById("gameDiv");
                    this.htmlImg = document.createElement("img");
                    this.htmlImg.onload = function() {
                        euiImg.visible = false;
                    }
                    this.htmlImg.src = htmlImgUrl;
                    this.htmlImg.style.position = "absolute";
                    this.htmlImg.style.display = "none";
                    gameDiv.appendChild(this.htmlImg);
                } else {
                    this.euiImg.visible = false;
                }
                //计算hmtl二维码的高宽
                var wScale = document.body.clientWidth / App.StageUtils.stageWidth;
                var hScale = document.body.clientHeight / App.StageUtils.stageHeight;
                var htmlImgWidth = euiImg.width * wScale;
                var htmlImgHeight = euiImg.height * hScale;
                //旋转时，stage的高宽会偶尔发生获取错误，这里在获取错误时，不重置二维码大小和位置
                if(this.bInit == false || htmlImgWidth / htmlImgHeight == this.euiImg.width / this.euiImg.height) {
                    this.bInit = true;
                    this.htmlImg.style.width = htmlImgWidth + "px";
                    this.htmlImg.style.height = htmlImgHeight + "px";
                    this.htmlImg.style.left = euiImg.x * wScale + "px";
                    this.htmlImg.style.top = euiImg.y * hScale + 1 + "px"; //有1px的偏移
                }
                this.htmlImg.style.display = "inline";
            },this); 
        } 
    }
    
    /**隐藏二维码*/
    public hideHtmlCode(): void {
        if(App.DeviceUtils.isPC) {
            return;
        }
        if(this.htmlImg && this.euiImg) {
            this.htmlImg.style.display = "none";
            this.euiImg.visible = true;
        }
    }
    
    /**销毁*/
    public onDestroy(){
        //TODO
    }
}
