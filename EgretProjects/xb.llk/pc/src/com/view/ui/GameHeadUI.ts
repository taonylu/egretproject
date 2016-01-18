/**
 * 游戏进度的头像
 * @author 
 *
 */
class GameHeadUI extends BaseUI{
    private headMask:eui.Image; //头套
    private headImg:egret.Bitmap = new egret.Bitmap();
    private imgWidth:number = 55;
    private imgHeight:number = 55;
    
	public constructor() {
    	super("GameHeadUISkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.addChild(this.headImg);
        this.addChild(this.headMask);
    }
    
    //设置头像
    public setHeadBmd(bmd:egret.BitmapData){
        this.headImg.bitmapData = bmd;
        this.headImg.width = this.imgWidth;
        this.headImg.height = this.imgHeight;
        this.headImg.x = 23;
        this.headImg.y = 20;
    }
    
    //清理头像
    public clear(){
        this.parent && this.parent.removeChild(this);
        this.headImg.bitmapData = null;
    }
}
