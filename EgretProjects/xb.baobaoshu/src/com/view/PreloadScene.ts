/**
 * 预加载界面
 * @author 
 *
 */
class PreloadScene extends BaseScene{
    private man0: eui.Image;
    private man1: eui.Image;
    private box: eui.Image;
    private processLabel: eui.Label;
    
    private boxStartY: number;
    private boxEndY: number;
    
	public constructor() {
        super("PreloadSceneSkin");
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onEnable,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.boxStartY = this.box.y;
        this.boxEndY = this.boxStartY - 500;
    }
	
    public onEnable(): void {
        this.box.y = this.boxStartY;
        this.playAnimThrow();
    }
    
    public onRemove(): void {
        egret.Tween.removeAllTweens();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onEnable,this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
    }
    
    public setProcessLabel(process:number): void {
        this.processLabel.text = "Loading " + process + "%";
    }
    
    public playAnimThrow(): void {
        this.man0.visible = false;
        this.man1.visible = true;
        this.box.visible = true;
        var self: PreloadScene = this;
        egret.Tween.get(this.box).to({ y: this.boxEndY,rotation:360 },800).call(function() {
            self.playAnimFall();
        });
    }
    
    public playAnimFall(): void {
        this.man0.visible = false;
        this.man1.visible = true;
        var self: PreloadScene = this;
        egret.Tween.get(this.box).to({ y: this.boxStartY,rotation: 360 },800).call(function() {
            self.playAnimHold();
        });
    }
    
    public playAnimHold(): void {
        this.man0.visible = true;
        this.man1.visible = false;
        this.box.visible = false;
        var self: PreloadScene = this;
        egret.Tween.get(this.box).wait(300).call(function() {
            self.playAnimThrow();
        });
    }
    
    
}










