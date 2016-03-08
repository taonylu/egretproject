/**
*  文 件 名： ArcMotion.ts
*  功    能： 弧线运动
*  内    容： 利用tween和二次贝塞尔曲线实现的弧线运动
*  作    者： Rikimaru
*  生成日期： 2016/3/7
*  修改日期： 2016/3/7
*  修改日志：
* 
* Example:
* this.arc = new ArcMotion(this.ball,[0,0],[100,100],[200,200],1500,true);
* this.arc.play();
* this.arc.stop();
*/

class ArcMotion {
    private target:egret.DisplayObject; //目标对象
    private p0:egret.Point;             //起始点
    private p1:egret.Point;             //拐点
    private p2:egret.Point;             //终止点
    private loop:Boolean = false;       //是否循环
    private delay:number = 1000;        //运动时间
    
    /**
     * 初始化
     * @param target 目标对象
     * @param p0 起始点
     * @param p1 拐点
     * @param p2 终止点
     * @param delay 运动时间 默认1000
     * @param loop 是否循环  默认false
     */ 
    public constructor(target: egret.DisplayObject,p0,p1,p2,delay:number =1000,loop:Boolean = false) {
    	  this.target = target;
    	  this.p0 = new egret.Point(p0[0],p0[1]);
        this.p1 = new egret.Point(p1[0],p1[1]);
        this.p2 = new egret.Point(p2[0],p2[1]);
    	  this.loop = loop;
    	  this.delay = delay;
	}
	
	/**播放*/
	public play(){
    	 //factor由0向1渐变，会调用set factor，ball的坐标变化
        this.factor = 0;
        egret.Tween.get(this,{ loop: this.loop }).to({ factor: 1 },this.delay);
	}

	/**停止*/
	public stop(){
        egret.Tween.removeTweens(this);
	}
	
	
    public get factor(): number {
        return 0;
    }
    
    /**二次贝塞尔曲线公式*/
    public set factor(value: number) {
        this.target.x = (1 - value) * (1 - value) * this.p0.x + 2 * value * (1 - value) * this.p1.x + value * value * this.p2.x;
        this.target.y = (1 - value) * (1 - value) * this.p0.y + 2 * value * (1 - value) * this.p1.y + value * value * this.p2.y;
    }
    
    /**销毁*/
    public destroy(){
        this.stop();
        this.target = null;
    }
}



