/**
*  文 件 名：CImageLoader.ts
*  功    能：自定义图片加载类
*  内    容： 
*  作    者：Rikimaru
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*  Example:
    var imageLoader:CImageLoader = new CImageLoader();
    imageLoader.load(url,100,100,doc);
    imageLoader.clear();
*/
class CImageLoader{
    private loader:egret.ImageLoader = new egret.ImageLoader(); //加载器
    private doc:egret.DisplayObjectContainer; //图片加载完成后，显示的容器
    public id: number;  //加载器id
    private width:number = 0;
    private height:number = 0;
    
	public constructor() {
   
	}
	
	/**
	 * 加载
	 * @param url 图片链接
	 * @param width 图片宽
	 * @param height 图片高
	 * @param doc 显示容器
	 */ 
	public load(url:string,width:number, height:number, doc:egret.DisplayObjectContainer){
    	  this.doc = doc;
    	  this.width = width;
    	  this.height = height;
        this.loader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
        this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadError,this);
        this.loader.load(url);
	}
	
    private loadCompleteHandler(event: egret.Event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        var bitmap: egret.Bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.width = this.width;
        bitmap.height = this.height;
        this.doc.addChild(bitmap);
    }

    private onLoadError() {
        alert("加载头像错误");
    }
    
    public clear(){
        if(this.doc && this.doc.numChildren > 0){
            this.doc.removeChildAt(0);
        }
    }
}
