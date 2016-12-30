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
	 * 检查矩形碰撞 (getBounds方法必须在对象创建后延迟大概10ms后才会有值)
	 * @objA 矩形A
	 * @objB 矩形B
	 * @return 是否碰撞
	 */ 
//    public checkRect(objA: egret.DisplayObject,objB:egret.DisplayObject){
//        var rectA: egret.Rectangle = new egret.Rectangle(objA.x,objA.y,objA.width,objA.height);
//        var rectB: egret.Rectangle = new egret.Rectangle(objB.x,objB.y,objB.width,objB.height);
//        return rectA.intersects(rectB);
//	}
	
	/**
     * 检测碰撞矩形
     * @objA 对象A car
     * @objB 对象B clothes等
     */
    public checkRect(objA: egret.DisplayObject,objB: egret.DisplayObject) {
        var x1 = objA.x - objA.anchorOffsetX;
        var y1 = objA.y - objA.anchorOffsetY;
        var x2 = objB.x - objB.anchorOffsetX;
        var y2 = objB.y - objB.anchorOffsetY;

        if(y1 > (y2 - objA.height) && y1 < (y2 + objB.height)) {
            if(x1 > (x2 - objA.width) && x1 < (x2 + objB.width)) {
                return true;
            }
        }
        return false;
    }
	
	/**
	 * 检查point是否与测试对象碰撞
	 *  (target不计锚点不计容器位置，target相当于在stage上，检测点x，y必须是stage上坐标，若不是则自行转换)
	 * @x 点x
	 * @y 点y
	 * @target 目标对象
	 * @shapFlag true实际像素 false边框
	 */ 
//	public checkPoint(x:number, y:number, target:egret.DisplayObjectContainer, shapeFlag:boolean = false){
//    	  return target.hitTestPoint(x,y, shapeFlag);
//	}
	
	
	/*
     * 检测碰撞点x，y是否在obj范围内，计算锚点
     * @objA 检测对象
     * @x 检测点
     * @y 检测点
     * @calAnchor 计算锚点
     */
    public checkPoint(obj: egret.DisplayObject,x: number,y: number, calAnchor:boolean) {
        if(calAnchor){
            if(y > (obj.y - obj.anchorOffsetY) && y < (obj.y + obj.height - obj.anchorOffsetY)) {
                if(x > (obj.x - obj.anchorOffsetX) && x < (obj.x + obj.width - obj.anchorOffsetX)) {
                    return true;
                }
            }
            return false;
        }else{
            if(y > obj.y && y < (obj.y + obj.height)) {
                if(x > obj.x && x < (obj.x + obj.width)) {
                    return true;
                }
            }
            return false;
        }
    }
}












