/**
*  文 件 名： GestureDrag.ts
*  功    能： 手指按住拖动
*  内    容： 
*  作    者： Rikimaru
*  生成日期： 2016/3/14
*  修改日期： 
*  修改日志：
* 
* Example:
* var ges:GestureDrag = new GestureDrag(this.bm);
* ges.start();
* ges.stop();
* ges.destroy();
*/
class GestureDrag {
    private target:egret.DisplayObject;  //目标对象
    
	public constructor(target) {
        this.target = target;
        this.start();
	}
	
	public start(){
    	this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
	}
	
	public stop(){
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
	}
	
	private lastX:number;
	private lastY:number;
	private onTouchBegin(e:egret.TouchEvent){
    	  this.lastX = e.stageX;
    	  this.lastY = e.stageY;
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}
	
	private onTouchMove(e:egret.TouchEvent){
    	this.target.x += e.stageX - this.lastX;
    	this.target.y += e.stageY - this.lastY;
    	this.lastX = e.stageX;
    	this.lastY = e.stageY;
	}
	
	private onTouchEnd(e:egret.TouchEvent){
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
	}
	
	public destroy(){
    	this.stop();
    	this.target = null;
	}
}
