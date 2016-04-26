/**
*  文 件 名： HeadUI.ts
*  功    能： 头像组件
*  内    容： 
*  作    者： Rikimaru
*  生成日期： ?
*  修改日期：2016/3/31
*  修改日志：
* 
* Example:
  var headUI:HeadUI = new HeadUI();
  headUI.loadImg(headUrl);
  headUI.setNameLabel("peter");
  headUI.clear();
*/
class HeadUI extends BaseUI{
    
    private nameLabel:eui.Label;    //名字文本
    public  headImg:egret.Bitmap;   //头像图片
    public  userID:string;          //用户ID
    private headMask:eui.Image;     //头像遮罩
    public imgX:number = 10;       //图片大小高宽和位置
    public imgY:number = 17;
    public imgWidth:number = 45;
    public imgHeight:number = 45;
    private imageLoader: egret.ImageLoader = new egret.ImageLoader(); //图片加载器
    
	public constructor() {
    	super();
        this.skinName = "HeadUISkin";
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
        this.userID = "";
    }
    
    
}
