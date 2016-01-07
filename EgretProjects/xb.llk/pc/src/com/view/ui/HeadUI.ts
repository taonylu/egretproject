/**
 * 头像UI
 * @author 
 *
 */
class HeadUI extends BaseUI{
    
    private nameLabel:eui.Label;    //名字文本
    private headImg:egret.Bitmap;   //头像图片
    public  userID:string;          //用户ID
    private imgX:number = 10;       //图片大小高宽
    private imgY:number = 17;
    private imgWidth:number = 50;
    private imgHeight:number = 50;
    
    private imageLoader: egret.ImageLoader = new egret.ImageLoader();
    
	public constructor() {
    	super("HeadUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
    
    public setNameLabel(_name:string):void{
        this.nameLabel.text = _name;
    }
    
    public loadImg(imgUrl:string){
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadError,this);
        this.imageLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
        this.imageLoader.load(imgUrl);
    }
    
    //加载完成
    private loadCompleteHandler(event: egret.Event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        var bitmap: egret.Bitmap = new egret.Bitmap(imageLoader.data);
        bitmap.x = this.imgX;  //调整位置
        bitmap.y = this.imgY;
        //bitmap.width = this.imgWidth;
        //bitmap.height = this.imgHeight;
        this.addChild(bitmap);
        this.headImg = bitmap;
    }
    
    //加载头像错误
    private onLoadError(): void {
        egret.log("加载头像错误");
    }
    
    //是否为空
    public isEmpty():Boolean{
        if(this.nameLabel.text == ""){
            return true;
        }
        return false;
    }
    
    //清理数据
    public clear():void{
        this.nameLabel.text = "";
        this.headImg && this.removeChild(this.headImg);
        this.userID = "";
    }
    
    
}
