/**
 *
 * @author 
 *
 */
class Water extends egret.Bitmap{
    private animList = [];
    private curFrame: number = 0;
    
	public constructor() {
        super();
        for(var i: number = 0;i < 4;i++) {
            var te: egret.Texture = RES.getRes("water" + i + "_png");
            this.animList.push(te);
        }
        this.texture = this.animList[0];
	}
	
    public play(): void {
        this.reset();
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
    
    private count: number = 0;
    private onEnterFrame(): void {
        this.count++;
        if(this.count % 2 == 0) {
            if(this.curFrame >= 4) {
                this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
                this.dispatchEvent(new egret.Event("waterComplete"));
                return;
            }
            this.texture = this.animList[this.curFrame];
            this.curFrame++;
        }
    }
    
    public reset(): void {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.curFrame = 0;
        this.count = 0;
        this.texture = this.animList[0];
    }
    
    
}
