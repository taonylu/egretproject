var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 碰撞检测工具类
 * 适用于少量碰撞
 * 大量碰撞时，新建局部变量和函数调用消耗较大，可以优化。
 * @author chenkai
 * @date 2016/12/26
 */
var CollisionUtils = (function (_super) {
    __extends(CollisionUtils, _super);
    function CollisionUtils() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 根据圆形的半径，检查圆形是否碰撞
     * @ballA 圆形A
     * @ballB 圆形B
     * @radius 半径
     * @return 是否碰撞
     */
    CollisionUtils.prototype.checkCircle = function (ballA, ballB, radius) {
        var pA = new egret.Point(ballA.x, ballA.y);
        var pB = new egret.Point(ballB.x, ballB.y);
        if (egret.Point.distance(pA, pB) <= radius * 2) {
            return true;
        }
        return false;
    };
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
    CollisionUtils.prototype.checkRect = function (objA, objB) {
        var x1 = objA.x - objA.anchorOffsetX;
        var y1 = objA.y - objA.anchorOffsetY;
        var x2 = objB.x - objB.anchorOffsetX;
        var y2 = objB.y - objB.anchorOffsetY;
        if (y1 > (y2 - objA.height) && y1 < (y2 + objB.height)) {
            if (x1 > (x2 - objA.width) && x1 < (x2 + objB.width)) {
                return true;
            }
        }
        return false;
    };
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
    CollisionUtils.prototype.checkPoint = function (obj, x, y, calAnchor) {
        if (calAnchor) {
            if (y > (obj.y - obj.anchorOffsetY) && y < (obj.y + obj.height - obj.anchorOffsetY)) {
                if (x > (obj.x - obj.anchorOffsetX) && x < (obj.x + obj.width - obj.anchorOffsetX)) {
                    return true;
                }
            }
            return false;
        }
        else {
            if (y > obj.y && y < (obj.y + obj.height)) {
                if (x > obj.x && x < (obj.x + obj.width)) {
                    return true;
                }
            }
            return false;
        }
    };
    return CollisionUtils;
}(SingleClass));
__reflect(CollisionUtils.prototype, "CollisionUtils");
//# sourceMappingURL=CollisionUtils.js.map