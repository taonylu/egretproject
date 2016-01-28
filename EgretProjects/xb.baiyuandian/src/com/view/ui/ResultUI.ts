/**
 * 结算面板UI
 * @author 
 *
 */
class ResultUI extends BaseUI{
    private scoreLabel:eui.Label;
    private headGroup:eui.Group;
    private headMask:eui.Rect;
    
    private _nickName:string;
    private _headUrl:string;
    
	public constructor() {
    	super("ResultUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.setLabel(this._nickName);
        this.setHead(this._headUrl);
    }
    
    //设置昵称
    public setLabel(nickName:string){
        this._nickName = nickName;
        if(this.inited){
            this.scoreLabel.text = this._nickName;
        }
    }
    
    //加载头像
    public setHead(headUrl:string){
        this._headUrl = headUrl;
        if(this.inited){
            var imageLoader: egret.ImageLoader = new egret.ImageLoader();
            imageLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
            imageLoader.load(this._headUrl);
        }
    }
    
    //加载完毕
    private loadCompleteHandler(event: egret.Event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        var bitmap: egret.Bitmap = new egret.Bitmap(imageLoader.data);
        this.headGroup.addChild(bitmap);
        bitmap.mask = this.headMask;
    }
    
    //清理
    public clear(){
        this.scoreLabel.text = "";
        if(this.headGroup.numChildren > 0){
            var bm:egret.Bitmap = <egret.Bitmap>this.headGroup.getChildAt(0);
            bm.mask = null;
            this.headGroup.removeChild(bm);
        }
    }
    
	
}
