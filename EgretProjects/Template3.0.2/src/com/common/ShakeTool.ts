/**
*  文 件 名：ShakeTool.ts
*  功    能：震动工具类
*  内    容：
*  作    者： Rikiamru
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
* 
*  Example:
*  var shakeTool:ShakeTool = new ShakeTool();
*  shakeTool.shakeObj(obj,1000,3,100);
*/
class ShakeTool {
    private initX:number;                //初始位置
    private initY: number;  
    private target:egret.DisplayObject;  //震动目标
    private maxDis: number;              //震动距离
    private count: number = 0;           //计时器次数
    private rate: number;                //一秒震动次数
    private timer:egret.Timer = new egret.Timer(1000); //计时器

    /**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
    public shakeObj(target: egret.DisplayObject,time: number,rate: number,maxDis: number): void {
        this.target = target;
        this.initX = target.x;
        this.initY = target.y;
        this.maxDis = maxDis;
        this.count = time * rate;
        this.rate = rate;
    
        this.timer.delay = 1000/rate;
        this.timer.repeatCount = this.count;
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.shaking, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
        this.timer.reset();
        this.timer.start();
    }
    
    private shaking(): void {
        egret.Tween.removeTweens(this);
        this.target.x = this.initX - this.maxDis + Math.random()*this.maxDis*2;  //中心点在左上角
        this.target.y = this.initY - this.maxDis +  Math.random()*this.maxDis*2;
        egret.Tween.get(this.target).to({x:this.initX, y:this.initY},999/this.rate);    
    }
    
    private shakeComplete(): void {
        egret.Tween.removeTweens(this);
        this.target.x = this.initX;
        this.target.y = this.initY;
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.shaking,this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.shakeComplete,this);
    }
    
    
}


   

