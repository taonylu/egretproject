/**
 * 头像UI,主页场景，用户进入后显示的头像UI
 * @author 
 *
 */
class HeadUI extends BaseUI{
    
    private nameLabel:eui.Label;    //名字文本
    public infoLabel:eui.Label;    //选择信息文本
    private headImg:egret.Bitmap;   //头像图片
    public openid:string;          //用户ID
    private headMask:eui.Image;     //头像遮罩
    private imgX:number = 8;        //图片大小高宽和位置
    private imgY:number = 7;
    private imgWidth:number = 75;
    private imgHeight:number = 75;
    private imageLoader: egret.ImageLoader = new egret.ImageLoader(); //图片加载器
    
	public constructor() {
    	super("HeadUI2Skin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.nameLabel.text = "";
        
        this.headImg= new egret.Bitmap();
        this.headImg.x = this.imgX;        //调整位置
        this.headImg.y = this.imgY;
        this.headImg.width = this.imgWidth;
        this.headImg.height = this.imgHeight;
        this.headImg.mask = this.headMask;
        this.addChild(this.headImg);
    }
    
    public setUserInfo(userVO:UserVO){
        if(this.isEmpty() == false){
            this.clear();
        }
        this.setNameLabel(userVO.nickName);
        this.loadImg(userVO.headUrl);
        this.openid = userVO.openid; 
    }
    
    private setNameLabel(_name:string):void{
        this.nameLabel.text = _name;
    }
    
    private loadImg(imgUrl:string){
        this.imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadError,this);
        this.imageLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
        this.imageLoader.load(imgUrl);
    }
    
    //加载完成
    private loadCompleteHandler(event: egret.Event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        this.headImg.bitmapData = imageLoader.data;
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
        this.headImg.bitmapData = null;
        this.openid = "";
    }
    
    
}
