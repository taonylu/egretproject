/**
*  文 件 名： CircleMotion.ts
*  功    能： 圆形运动
*  内    容： 
*  作    者： Rikimaru
*  生成日期： 2016/3/7
*  修改日期： 2016/3/7
*  修改日志：
* 
* Example:
* this.circleMotion = new circleMotion(this.ball,[100,100],1000/60);
* this.circleMotion.play();
* this.circleMotion.stop();
*/
class CircleMotion {
    private target: egret.DisplayObject;  //目标对象
    private centerX: number;              //圆心坐标
    private centerY: number;  
    private vr: number = .05;             //运动角度
    private cos: number;                  //临时保存计算值
    private sin: number;
    private timer:egret.Timer;            //计时器
    
    /**
     * 构造函数
     * @param target 目标对象
     * @param centerPos 中心点数组[]
     * @param delay 计时器延迟
     */ 
	public constructor(target:egret.DisplayObject, centerPos,delay:number=1000/60) {
    	  this.target = target;
        this.cos = Math.cos(this.vr);
        this.sin = Math.sin(this.vr);
        this.centerX = centerPos[0];
        this.centerY = centerPos[1];
        this.timer = new egret.Timer(delay);
	}
	
    public play(): void {
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.reset();
        this.timer.start();
    }

    public stop(): void {
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
    }

    private onTimerHandler(): void {
        var x1: number = this.target.x - this.centerX;
        var y1: number = this.target.y - this.centerY;
        var x2: number = this.cos * x1 - this.sin * y1;
        var y2: number = this.cos * y1 + this.sin * x1;
        this.target.x = this.centerX + x2;
        this.target.y = this.centerY + y2;
    }
    
    public destroy(){
        
    }
}
