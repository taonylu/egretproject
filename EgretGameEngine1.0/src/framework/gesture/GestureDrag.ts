/**
* 拖拽手势
* @author chenkai
* @since 2016/3/14
* @example
* var ges:GestureDrag = new GestureDrag(this.bm);
* ges.start();
* ges.stop();
* ges.destroy();
*/
class GestureDrag {
	/**目标对象*/
    private target:egret.DisplayObject;
	/**当前触摸ID */
    private curPointID:number = -1;
    
	/**设置拖拽对象 */
	public setTarget(target){
    	this.target = target;
	}
	
	/**开始拖拽 */
	public start(){
    	this.curPointID = -1;
    	this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
	}
	
	/**结束拖拽 */
	public stop(){
    	this.curPointID = -1;
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
	}
	
	private lastX:number;
	private lastY:number;
	private onTouchBegin(e:egret.TouchEvent){
    	  if(this.curPointID != -1){
            return;
    	  }
    	  this.curPointID = e.touchPointID;
    	  this.lastX = e.stageX;
    	  this.lastY = e.stageY;
          App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
          App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}
	
	private onTouchMove(e:egret.TouchEvent){
    	if(e.touchPointID == this.curPointID){
            this.target.x += e.stageX - this.lastX;
            this.target.y += e.stageY - this.lastY;
            this.lastX = e.stageX;
            this.lastY = e.stageY;
    	}
	}
	
	private onTouchEnd(e:egret.TouchEvent){
    	  if(e.touchPointID == this.curPointID){
        	  this.curPointID = -1;
              App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
              App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    	  }
	}
	
	/**销毁 */
	public destroy(){
    	this.stop();
    	this.target = null;
	}
}
