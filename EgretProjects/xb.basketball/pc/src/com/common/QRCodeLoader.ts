/**
 * 二维码加载器
 * @author  Rikimaru
 * 
 使用范例
    index.html:
    <div id="code" style="display:none"></div> 
    
    <script>
        var srvConfig = {
            host : '<%= host %>',
            port : '<%= port %>',
    		rid : '<%= rid %>'
    	}
        var codeUrl =  "http://"+srvConfig.host+":"+srvConfig.port+ "/mobile?rid=" + srvConfig.rid;
    	var codeWidth = 350;
    	var codeHeight = 350;
    	var logoUrl = "";
        $("#code").qrcode({ width: codeWidth, height:codeHeight,text:codeUrl });
        var i=$("#code > canvas");
        var codeData=i[0].toDataURL();
        window["dataUrl"] = codeData;
        window["codeWidth"] = codeWidth;
        window["codeHeight"] = codeHeight;
        window["logoUrl"] = logoUrl;
    </script>
    
    TS:
    var codeLoader:QRCodeLoader = new QRCodeLoader();
    codeLoader.load(window["dataUrl"], window["codeWidth"],window["codeHeight"], window["logoUrl"]);
    this.addChild(codeLoader);
 */


class QRCodeLoader  extends egret.DisplayObjectContainer{
    
    private qrcodeWidth:number;  //二维码高宽
    private qrcodeHeight:number;
    private logoUrl:string = ""; //logo地址
    
    
    /**
     * @dataUrl 二维码地址  (由jQuery.code.js生成的canvas.toDataUrl，从index.html生成，由window传递进TS)
     * @icon 二维码logo图片地址
     */ 
    public load(dataUrl,width: number,height: number,logoUrl:string = ""){
        
        this.qrcodeWidth = width;
        this.qrcodeHeight = height;
        this.logoUrl = logoUrl;
        
        var imageLoader: egret.ImageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE,this.onQRCodeComplete,this);
        imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onQRCodeError, this);
        imageLoader.load(dataUrl); 
    }
    
    private onQRCodeError():void{
        console.log("加载二维码错误");
    }
    
    //加载QRCode完成
    private onQRCodeComplete(event:egret.Event):void {
        //生成二维码
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        var bitmap: egret.Bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.width = this.qrcodeWidth;
        bitmap.height = this.qrcodeHeight;
        this.addChild(bitmap);
        
        //加载logo
        if(this.logoUrl != ""){
            var imageLoader: egret.ImageLoader = new egret.ImageLoader();
            imageLoader.addEventListener(egret.Event.COMPLETE,this.onlogoComplete,this);
            imageLoader.load(this.logoUrl); 
        }
 
    }
    
    
    //logo加载完成
    private onlogoComplete(event: egret.Event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        var bitmap: egret.Bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.width = this.qrcodeWidth/4;    //  二维码高宽：logo高宽 =   4 : 1
        bitmap.height = this.qrcodeHeight/4;
        bitmap.x = (this.qrcodeWidth - bitmap.width)/2;
        bitmap.y = (this.qrcodeHeight - bitmap.height) / 2;
        this.addChild(bitmap);
       
    }
}
