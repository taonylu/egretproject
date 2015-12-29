/**
 *
 * @author 
 *
 */
class MsgPanel extends egret.Sprite{
    private txt: egret.TextField;
	public constructor() {
        super();
	}
	
    public show(msg:string): void { 
        if(this.txt == null) { 
            this.txt = new egret.TextField();
        }
        LayerManager.getInstance().stage.addChild(this.txt);
        this.txt.text = msg;
        var self: MsgPanel = this;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).wait(5000).call(function(): void {
            self.parent && self.parent.removeChild(self);
        });
    }
    
    
}
