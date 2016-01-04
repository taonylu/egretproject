/**
 *
 * @author 
 *
 */
class PreloadScene extends BaseScene{
    private circle:eui.Image;
    private center:eui.Image;
    private centerX:number;
    private centerY:number;
    private  vr:number = .05;
    private  cos:number ;
    private  sin:number ;
    private progressLabel:eui.Label;
    
	public constructor() {
    	super("PreloadSceneSkin");
	}
	

    public componentCreated(): void {
        super.componentCreated();
        
        this.cos = Math.cos(this.vr);
        this.sin = Math.sin(this.vr);
        this.centerX = this.center.x + 64;   //取不到width
        this.centerY = this.center.y + 66;
        
    }

    public playAnim(): void {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    public stopAnim(): void {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
    
    public setProgress(progress:number):void{
        if(this.inited){
            this.progressLabel.text = "Loading..." + progress + "%";
        }
    }
    
    private onEnterFrame():void{
        if(this.inited){
            var x1: number = this.circle.x - this.centerX;
            var y1: number = this.circle.y - this.centerY;
            var x2: number = this.cos * x1 - this.sin * y1;
            var y2: number = this.cos * y1 + this.sin * x1;
            this.circle.x = this.centerX + x2;
            this.circle.y = this.centerY + y2;
        }
        
    }

}
