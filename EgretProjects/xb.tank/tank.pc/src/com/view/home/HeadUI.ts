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
    //private nameLabel:eui.Label;    //名字文本
    public  headImg:egret.Bitmap;   //头像图片
    public  openid:string;          //用户ID
    private imageLoader: egret.ImageLoader = new egret.ImageLoader(); //图片加载器
    
	public constructor() {
    	super();
        this.skinName = "HeadUISkin";
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.headImg= new egret.Bitmap();
        this.headImg.width = this.width;
        this.headImg.height = this.height;
        this.addChild(this.headImg);
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
        this.headImg.bitmapData = imageLoader.data;
    }
    
    //加载头像错误
    private onLoadError(): void {
        egret.log("加载头像错误");
    }
    
    //是否为空
    public isEmpty():Boolean{
        if(this.headImg.bitmapData == null){
            return true;
        }
        return false;
    }
    
    //清理数据
    public clear():void{
        this.headImg.bitmapData = null;
        this.openid = "";
    }
    
    
}
