
/**
 * 滑动手势
 */ 
class GestureMove extends egret.EventDispatcher{
    public static Up:string = "Up";
    public static Down:string = "Down";
    public static Move:string = "Move";
    public target: egret.DisplayObject;  //目标对象
    private dist:number = 50;
    

    public constructor() {
        super();
    }

    public start() {
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
    }

    public stop() {
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        StageUtil.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }

    private startX: number;
    private startY: number;
    private onTouchBegin(e: egret.TouchEvent) {
        this.startX = e.stageX;
        this.startY = e.stageY;
        StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }

    private lastX:number;
    private lastY:number;
    private onTouchEnd(e: egret.TouchEvent) {
        StageUtil.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        StageUtil.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.lastX = e.stageX;
        this.lastY = e.stageY;
        if((this.lastY - this.startY) > this.dist){
            this.dispatchEvent(new egret.Event(GestureMove.Down));
        }else if((this.lastY - this.startY) < this.dist){
            this.dispatchEvent(new egret.Event(GestureMove.Up));
        }
    }
    
    private onTouchMove(e:egret.TouchEvent){
        var dist = e.stageY - this.startY;
        this.startY = e.stageY;
        this.dispatchEvent(new egret.Event(GestureMove.Move));
    }

    public destroy() {
        this.stop();
        this.target = null;
    }
}
