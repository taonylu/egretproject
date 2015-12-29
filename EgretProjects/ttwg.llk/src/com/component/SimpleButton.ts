/**
 * 简单按钮
 * 一张底图bitmap和一个文本textField
 * @author 羊力大仙 
 */
class SimpleButton extends egret.Sprite{
    private up: egret.Bitmap;
    private down: egret.Bitmap;
    private displayText: egret.TextField;
    
	public constructor(upUrl:string, downUrl:string = null) {
        super();
        this.up = new egret.Bitmap(RES.getRes(upUrl));
        this.addChild(this.up);
        
        if(downUrl != null) {
            this.down = new egret.Bitmap(RES.getRes(downUrl));
            this.addChild(this.down);
            this.down.visible = false;
        }

        this.touchEnabled = true;
        this.touchChildren = false;

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
	}

    private touchBegin():void{
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.onPress();
    }

    private touchEnd():void{
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.onRelease();
    }
	
	private onPress():void{
        if(this.down) { 
            this.up.visible = false;
            this.down && (this.down.visible = true);
        }
    }
    
    private onRelease(): void { 
        if(this.down) { 
            this.up.visible = true;
            this.down && (this.down.visible = false);
        }
    }
    
    public setText(msg:string): void {
        if(this.displayText == null && this.up != null) {
            this.displayText = new egret.TextField();
            this.displayText.width = this.up.width;
            this.displayText.height = this.up.height;
            this.displayText.textAlign = egret.HorizontalAlign.CENTER;
            this.displayText.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.displayText.textColor = 0x000000;
            this.addChild(this.displayText);
        }
        this.displayText.text = msg;
    }
    
    public setTextColor(color:number): void {
        if(this.displayText) {
            this.displayText.textColor = color; 
        }
    }
    
    public setTextSize(size:number): void {
        if(this.displayText) {
            this.displayText.size = size;
        }
    }
}






