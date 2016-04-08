/**
 * 结算页面，排行榜头像、昵称
 * @author 
 *
 */
class RankHead extends BaseUI{
    
    private nameLabel:eui.Label;    //名字文本
    private rankLabel:eui.BitmapLabel;  //排名文本
    private scoreLabel:eui.Label;   //积分文本
    private headImg:egret.Bitmap;   //头像图片
    private openid:string;          //用户ID
    private headMask:eui.Image;     //头像遮罩
    private imgGroup:eui.Group;     //头像容器
    private imgWidth:number = 50;
    private imgHeight:number = 50;
    private imageLoader: egret.ImageLoader = new egret.ImageLoader(); //图片加载器
    
	public constructor() {
        super("RankHeadSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.nameLabel.text = "";
        
        this.headImg= new egret.Bitmap();
        this.headImg.width = this.imgWidth;
        this.headImg.height = this.imgHeight;
        if(this.headMask){
            this.headImg.mask = this.headMask; 
        }
        this.imgGroup.addChild(this.headImg);
    }
    
    public setNameLabel(_name:string):void{
        this.nameLabel.text = _name;
    }
    
    public setScoreLabel(_score:number){
        this.scoreLabel.text = _score + "";
    }
    
    public setRankLabel(rank:number){
        this.rankLabel.text = rank + "";
    }
    
    public loadImg(imgUrl:string){
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
    private isEmpty():Boolean{
        if(this.nameLabel.text == ""){
            return true;
        }
        return false;
    }
    
    //清理数据
    public clear():void{
        this.nameLabel.text = "";
        this.scoreLabel.text = "";
        this.rankLabel.text = "";
        this.headImg.bitmapData = null;
        this.openid = "";
    }
    
    
}
