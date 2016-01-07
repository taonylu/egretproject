/**
 * 头像加载
 * @author 
 *
 */
class HeadLoader {
    public userGroup:eui.Group;   //头像容器
    public headBg:eui.Image;      //头像背景，定位用
    public index:number;          //第几个头像
    public headImgList:Array<egret.Bitmap>;  //头像数组

	public constructor() {

        
	}
	
	public load(imgUrl:string){
        var imageLoader: egret.ImageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadError,this);
        imageLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
        imageLoader.load(imgUrl);
	}
	
    private loadCompleteHandler(event: egret.Event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        var bitmap: egret.Bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.x = this.headBg.x + 2;  //调整位置
        bitmap.y = this.headBg.y + 2;
        this.userGroup.addChild(bitmap);
        this.headImgList[this.index] = bitmap;  //保存头像
        
        this.destroy();
    }
    
    //加载头像错误
    private onLoadError(): void {
        egret.log("加载头像错误");
        
        this.destroy();
    }
    
    private destroy():void{
        this.userGroup = null;
        this.headBg = null;
        this.headImgList = null;
    }
}
