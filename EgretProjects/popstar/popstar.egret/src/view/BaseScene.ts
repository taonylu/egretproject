/**
 *
 * @author 
 *
 */
class BaseScene extends egret.gui.SkinnableComponent{
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onEnable,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
	}
	
    protected onEnable(): void { 
        
    }
	
    protected onRemove(): void { 
        
    }
}
