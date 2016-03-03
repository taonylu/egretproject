/**
 * 弧线运动
 * tween和二次贝塞尔曲线
 * @author 
 *
 */
class ArcMotion {
    private target:egret.DisplayObject;
    private p0:egret.Point;
    private p1:egret.Point;
    private p2:egret.Point;
    private loop:Boolean = false;
    private delay:number = 1000;
    
    /**
     * 初始化
     * @param target 需要运动的对象
     * @param p0 起始点
     * @param p1 拐点
     * @param p2 终止点
     * @param delay 移动时间 默认1000
     * @param loop 是否循环  默认false
     */ 
    public constructor(target: egret.DisplayObject,p0: egret.Point,p1: egret.Point,p2: egret.Point,delay:number =1000,loop:Boolean = false) {
    	  this.target = target;
    	  this.p0 = p0;
    	  this.p1 = p1;
    	  this.p2 = p2;
    	  this.loop = loop;
    	  this.delay = delay;
	}
	
	public play(){
    	//factor由0向1渐变，会调用set factor，ball的坐标变化
        this.factor = 0;
        egret.Tween.get(this,{ loop: this.loop }).to({ factor: 1 },this.delay);
	}

	public stop(){
        egret.Tween.removeTweens(this);
	}
	
    public get factor(): number {
        return 0;
    }
    
    //起始点P0 = 100，中间点P1 = 300, 终点P2 = 500
    public set factor(value: number) {
        this.target.x = (1 - value) * (1 - value) * this.p0.x + 2 * value * (1 - value) * this.p1.x + value * value * this.p2.x;
        this.target.y = (1 - value) * (1 - value) * this.p0.y + 2 * value * (1 - value) * this.p1.y + value * value * this.p2.y;
    }
}

/* 使用范例
var p0: egret.Point = new egret.Point(this.ballPosX,this.ballPosY);
var p1: egret.Point = new egret.Point(this.ballPosX - 60,this.ballPosY - 480);
var p2: egret.Point = new egret.Point(this.ballPosX - 165,this.ballPosY - 250);
this.arc = new ArcMotion(this.ball,p0,p1,p2,1500,true);
this.arc.play();
this.arc.stop();
*/

