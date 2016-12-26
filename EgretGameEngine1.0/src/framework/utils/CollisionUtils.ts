/**
 * 碰撞检测工具类
 * 适用于少量碰撞
 * 大量碰撞时，新建局部变量和函数调用消耗较大，可以优化。
 * @author chenkai
 * @date 2016/12/26
 */
class CollisionUtils extends SingleClass{
    
    /**
     * 根据圆形的半径，检查圆形是否碰撞
     * @ballA 圆形A
     * @ballB 圆形B
     * @radius 半径
     * @return 是否碰撞
     */ 
	public checkCircle(ballA:egret.DisplayObject, ballB:egret.DisplayObject, radius:number){
    	  var pA:egret.Point =  new egret.Point(ballA.x, ballA.y);
    	  var pB:egret.Point = new egret.Point(ballB.x, ballB.y);
    	  if(egret.Point.distance(pA, pB) <= radius*2){
        	  return true;
    	  }
    	  return false;
	}
	
	/**
	 * 检查矩形碰撞 (objA.getBounds()的rect的x,y,width,height都是0???)
	 * @objA 矩形A
	 * @objB 矩形B
	 * @return 是否碰撞
	 */ 
    public checkRect(objA: egret.DisplayObject,objB:egret.DisplayObject){
        var rectA: egret.Rectangle = new egret.Rectangle(objA.x,objA.y,objA.width,objA.height);
        var rectB: egret.Rectangle = new egret.Rectangle(objB.x,objB.y,objB.width,objB.height);
        return rectA.intersects(rectB);
	}
	
	/**
	 * 检查point是否与测试对象碰撞
	 * @x 点x
	 * @y 点y
	 * @target 目标对象
	 * @shapFlag true实际像素 false边框
	 */ 
	public checkPoint(x:number, y:number, target:egret.DisplayObjectContainer, shapeFlag:boolean = false){
    	  return target.hitTestPoint(x,y, shapeFlag);
	}
}












