/**
 * 结算面板UI
 * @author 
 *
 */
class ResultUI extends BaseUI{
    private scoreLabel:eui.Label;
    private headGroup:eui.Group;
    private headMask:eui.Rect;
    
    private headBm:egret.Bitmap;
    private _nickName:string;
    private _headUrl:string;
    
	public constructor() {
        super("ResultUISkin");
        
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.headBm = new egret.Bitmap();
        this.headBm.width = 80;
        this.headBm.height = 80;
        this.headGroup.addChild(this.headBm);
        this.headBm.mask = this.headMask;
        //this.setLabel(this._nickName);
        //this.setHead(this._headUrl);
    }
    
    //设置昵称
    public setLabel(score:number){
        //this._nickName = nickName;
        //if(this.inited){
        this.scoreLabel.text = score.toString();
        //}
    }
    
    //加载头像
    public setHead(headUrl:string){
        //this._headUrl = headUrl;
       // if(this.inited){
            var imageLoader: egret.ImageLoader = new egret.ImageLoader();
            imageLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
            imageLoader.load(headUrl);
       // }
    }
    
    //加载完毕
    private loadCompleteHandler(event: egret.Event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        this.headBm.bitmapData = imageLoader.data;
    }
    
    //清理
    public clear(){
        this.scoreLabel.text = "";
        if(this.headGroup.numChildren > 0){
            var bm:egret.Bitmap = <egret.Bitmap>this.headGroup.getChildAt(0);
            bm.bitmapData = null;
        }
    }
    
	
}
