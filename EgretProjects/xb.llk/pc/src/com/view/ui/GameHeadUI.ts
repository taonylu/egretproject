/**
 * 游戏进度的头像
 * @author 
 *
 */
class GameHeadUI extends BaseUI{
    private headMask:eui.Image; //头套
    private headImg:egret.Bitmap = new egret.Bitmap();
    
	public constructor() {
    	super("GameHeadUISkin");
	}
	
    public componentCreated(): void {
        this.componentCreated();
        this.addChild(this.headImg);
        this.addChild(this.headMask);
    }
    
    //设置头像
    public setHeadBmd(bmd:egret.BitmapData){
        this.headImg.bitmapData = bmd;
    }
    
    //清理头像
    public clear(){
        this.parent && this.parent.removeChild(this);
        this.headImg.bitmapData = null;
    }
}
