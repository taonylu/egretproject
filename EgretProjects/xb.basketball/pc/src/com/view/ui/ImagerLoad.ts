
class ImagerLoad extends egret.DisplayObjectContainer{
    public  img:egret.Bitmap;   //图片
    private imageLoader: egret.ImageLoader = new egret.ImageLoader(); //图片加载器
    
	public constructor() {
    	super();
        this.img = new egret.Bitmap();
        this.addChild(this.img);
	}

    public loadImg(imgUrl:string){
        this.clear();
        if(imgUrl == "" || imgUrl == null){
            return;
        }
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadError,this);
        this.imageLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
        this.imageLoader.load(imgUrl);
    }
    
    //加载完成
    private loadCompleteHandler(event: egret.Event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        this.img.bitmapData = imageLoader.data;
        
        //正中心对齐
        if(this.parent){
            this.img.x = (this.parent.width - this.img.width) / 2;
            this.img.y = (this.parent.height - this.img.height) / 2;
        }
    }
    
    //加载头像错误
    private onLoadError(): void {
        egret.log("加载图片错误");
    }
    
    //是否为空
    public isEmpty():Boolean{
        if(this.img.bitmapData == null){
            return true;
        }
        return false;
    }
    
    //清理数据
    public clear():void{
        this.img.bitmapData = null;
    }
    
    
}
