/**
 *
 * @author 
 *
 */
class ZheUI extends egret.Sprite{
	private zhe0:egret.Bitmap;
    private zhe1: egret.Bitmap;
	private displayText:egret.TextField;

	public constructor() {
		super();
        this.zhe0 = new egret.Bitmap(RES.getRes("zhe0_png"));
        this.addChild(this.zhe0);
        this.zhe1 = new egret.Bitmap(RES.getRes("zhe1_png"));
        this.addChild(this.zhe1);
        
		this.displayText = new egret.TextField();
        this.displayText.width = this.zhe0.width;
        this.displayText.height = this.zhe0.height;
		this.displayText.size = 18;
		this.displayText.textColor = 0x000000;
		this.displayText.textAlign = egret.HorizontalAlign.CENTER;
		this.displayText.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.addChild(this.displayText);
	}
	
    public setZhe(isVisable: boolean) {
        this.zhe0.visible = !isVisable;
        this.zhe1.visible = isVisable;
    }

	public setText(msg:string):void{
		this.displayText.text = msg;
	}

}
