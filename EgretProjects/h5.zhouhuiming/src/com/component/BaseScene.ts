/**
* 场景基类 
*/
class BaseScene extends eui.Component {
    public isAnimDone:boolean = false;
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.onCreated,this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onEnable, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }

    public onCreated(): void {
        
    }
    
    public onEnable(): void {

    }

    public onRemove(): void {
        
    }

    public onDestroy(): void {

    }

}
