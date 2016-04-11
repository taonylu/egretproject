/**
 * 结果页面，排行榜1-10头像
 * @author 
 *
 */
class RankHead extends BaseUI{
    public bg:eui.Image;            //背景
    private nameLabel:eui.Label;    //名字文本
    private headImg:egret.Bitmap;   //头像图片
    private rankLabel:eui.EditableText; //排名文本
    public openid:string;           //用户ID
    private headGroup:eui.Group;    //头像Group
    private scoreLabel:eui.Label;   //分数文本
    private imgWidth:number = 50;
    private imgHeight:number = 50;
    private imageLoader: egret.ImageLoader = new egret.ImageLoader(); //图片加载器
    
	public constructor() {
    	super("GameHeadSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.nameLabel.text = "";
        
        this.headImg= new egret.Bitmap();
        this.headImg.width = this.imgWidth;
        this.headImg.height = this.imgHeight;
        this.headGroup.addChild(this.headImg);
    }

    public setNameLabel(_name:string):void{
        this.nameLabel.text = _name;
    }
    
    public setScoreLabel(score:number){
        this.scoreLabel.text = score + "";
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
        this.scoreLabel.text = "0";
        this.rankLabel.text = "";
        this.openid = "";
    }
    
    public hide(){
        this.parent && this.parent.removeChild(this);
    }
    
    
}
