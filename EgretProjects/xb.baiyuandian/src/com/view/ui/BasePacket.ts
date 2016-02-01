/**
 * 红包基类
 * @author 
 *
 */
class BasePacket extends egret.DisplayObjectContainer{
    private bg:egret.Bitmap;
    private money:egret.Bitmap;
    public className:string;
    public score:number;
    public speedX:number;
    public speedY:number;
    
    public constructor(className: string,score: number,money: egret.BitmapData,bg: egret.BitmapData = null) {
    	super();
    	//对象池类名、分值
    	this.className = className;
    	this.score = score;
    	
    	//新建红包背景
    	this.bg = new egret.Bitmap(bg);
            this.bg.width = 175;
            this.bg.height = 272;
    	this.addChild(this.bg);
    	
    	//新建红包数值
    	if(money){
              this.money = new egret.Bitmap(money);
              this.money.y = 20;
              this.money.x = (this.width - this.money.width) / 2 + 10;
              this.addChild(this.money);
    	}
        
          //设置锚点
          this.anchorOffsetX = this.bg.width / 2;
          this.anchorOffsetY = this.bg.height / 2;
        
          //缓存位图
          //this.cacheAsBitmap = true;
          
          //设置点击
          this.touchChildren = false;
          this.touchEnabled = true;
          
          
	}
	
	//发射
	public shoot(){
        //随机方向
        this.rotation = NumberTool.getRandomInt(-20,20);
            
        //随机飞行时间
        var flyTime: number = 2000 + Math.random() * 500; 
        //飞行目的地
        var dist: number = 1500;  //最远飞行距离
        var hudu: number = this.rotation * Math.PI / 180;
        var targetX: number = GameConst.stage.stageWidth / 2 + dist * Math.sin(hudu);
        var targetY: number = GameConst.stage.stageHeight - dist * Math.cos(hudu);
        var self: BasePacket = this;
        egret.Tween.get(this).to({ x: targetX,y: targetY },flyTime).call(function() {
            self.recycle();
        });
    }
	
	public recycle(){
        this.rotation = 0;
        this.parent && this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
        ObjectPool.getPool(this.className).returnObject(this);
	}
}
