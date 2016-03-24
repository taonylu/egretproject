/**
 * 自定义图片加载类
 * @author 
 *
 */
class CImageLoader{
    private loader:egret.ImageLoader = new egret.ImageLoader();
    public id:number;
    public doc:egret.DisplayObjectContainer;
	public constructor() {
   
	}
	
	public load(url:string){
        this.loader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
        this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadError,this);
        this.loader.load(url);
	}
	
    private loadCompleteHandler(event: egret.Event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        var bitmap: egret.Bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.width = 60;
        bitmap.height = 60;
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
