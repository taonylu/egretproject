/**
*  文 件 名：QRCodeLoader.ts
*  功    能：二维码加载器
*  内    容：加载qrcode.js生成的img标签图片，生成egret的Bitmap
*  作    者： Rikiamru
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*
* Example:
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
    private imageLoader: egret.ImageLoader;  //二维码加载器
    private logoLoader:egret.ImageLoader;    //logo加载器
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
        
        if(this.imageLoader == null){
            this.imageLoader = new egret.ImageLoader();
            this.imageLoader.addEventListener(egret.Event.COMPLETE,this.onQRCodeComplete,this);
            this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onQRCodeError,this);
        }

        this.imageLoader.load(dataUrl); 
    }
    
    private onQRCodeError():void{
        console.log("加载二维码错误");
    }
    
    //加载QRCode完成
    private onQRCodeComplete(event:egret.Event):void {
        //生成二维码
        var bitmap: egret.Bitmap = new egret.Bitmap(this.imageLoader.data);
        bitmap.width = this.qrcodeWidth;
        bitmap.height = this.qrcodeHeight;
        this.addChild(bitmap);
        
        //加载logo
        if(this.logoUrl != ""){
            if(this.logoLoader == null){
                this.logoLoader = new egret.ImageLoader();
                this.logoLoader.addEventListener(egret.Event.COMPLETE,this.onlogoComplete,this);
            }
            this.logoLoader.load(this.logoUrl); 
        }
    }
    
    
    //logo加载完成
    private onlogoComplete(event: egret.Event): void {
        var bitmap: egret.Bitmap = new egret.Bitmap(this.logoLoader.data);
        bitmap.width = this.qrcodeWidth/4;    //  二维码高宽：logo高宽 =   4 : 1
        bitmap.height = this.qrcodeHeight/4;
        bitmap.x = (this.qrcodeWidth - bitmap.width)/2;
        bitmap.y = (this.qrcodeHeight - bitmap.height) / 2;
        this.addChild(bitmap);
       
    }
    
    //清理二维码
    private clear(){
        var len:number = this.numChildren;
        for(var i:number=len-1;i>=0;i--){
            var obj:egret.DisplayObject = this.getChildAt(i);
            obj.parent && obj.parent.removeChild(obj);
        }
    }
}
