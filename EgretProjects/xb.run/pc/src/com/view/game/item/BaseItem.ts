/**
 * 水果基类
 * @author 
 *
 */
class BaseItem extends egret.Bitmap{
    public type:number;       //物品类型  0可获取物品  1可跨越障碍物 2不可跨越障碍物
    public score:number = 0;  //分值
    public track:number = 0;  //赛道
    public className:string;  //类名
    public moveSpeedY:number; //y移动速度
	public constructor() {
    	super();
        this.className = egret.getQualifiedClassName(this);
	}
	
    public flyToHead(gameHead: GameHead) {
        var self = this;
        egret.Tween.get(this).to({y:this.y - 200},200).to({ x: gameHead.x, y:gameHead.y,scaleX:0.1,scaleY:0.1},1000,egret.Ease.circIn).call(function() {
            self.recycle();
        });
    }
	
    public recycle() {
        this.scaleX = 1;
        this.scaleY = 1;
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(this.className).returnObject(this);
    }
}
