/**
 * 加载UI
 * @author 
 */
class LoadUI extends egret.DisplayObjectContainer{
    
    private loadText: egret.TextField;
    
	public constructor() {
        super();
        
        this.loadText = new egret.TextField();
        this.loadText.textAlign = egret.HorizontalAlign.CENTER;
        this.loadText.width = 100;
        this.loadText.textColor = 0x000000;
        this.addChild(this.loadText);
        
        this.x = GameConst.stage.stageWidth / 2 - this.loadText.width / 2;
        this.y = GameConst.stage.stageHeight / 2;
	}
	
    public setLoadText(str:string): void {
        this.loadText.text = str;
    }
	
}
