/**
 * 坦克基类
 * @author 
 *
 */
class BaseTank extends SimpleMC{
    public className:string = "";//类名
    public type:TankEnum;        //坦克类型
    public speed:number = 4;     //移动速度
    public speedX:number = 0;    //x，y轴移动速度
    public speedY:number = 0;
    public direction: DirectionEnum; //移动方向
    public power:number = 0;     //子弹威力
    public life:number = 0;      //生命值
    public shootTime:number = 0; //射击间隔时间，单位ms
    public shootCount:number = 0;//射击计时，单位帧
    public isWuDi:boolean = false;//是否无敌
    public isHaveItem:boolean;   //是否携带道具         
    public openid: string;       //openid
    public hitWidth:number = 64;     //碰撞检测范围，因为切图大小并不是64x64，所以不能取width判断碰撞范围，这里自定义一个变量
    public hitHalfWidth:number = 32;
    
    public constructor() {
        super();
        this.className = egret.getQualifiedClassName(this);
	}
	
    //重置状态
    public reset() {
         this.speedX = 0;
         this.speedY = 0;
    	   this.isHaveItem = false;
    	   this.shootCount = 0;
    	   this.isWuDi = false;
    }

	//移动
	public move(){
    	this.x += this.speedX;
    	this.y += this.speedY;
	}
	
	//播放移动动画
	public playMoveAnim(){
        
	}
	
	//设置行动
	public actionHandler(actionType){
    	//当坦克停止时，播放动画
      if(this.speedX == 0 && this.speedY ==0 && actionType != ActionEnum.stopMove){
          this.playMoveAnim();
      }
     
      switch(actionType){
        	case ActionEnum.up:
        	    this.speedX = 0;
        	    this.speedY = -this.speed;
        	    this.rotation = 0;
        	    this.direction = DirectionEnum.up;
        	    break;
        	case ActionEnum.down:
        	    this.speedX = 0;
        	    this.speedY = this.speed;
        	    this.rotation = 180;
                this.direction = DirectionEnum.down;
        	    break;
        	 case ActionEnum.left:
        	    this.speedX = -this.speed;
        	    this.speedY = 0;
        	    this.rotation = -90;
                this.direction = DirectionEnum.left;
        	    break;
        	 case ActionEnum.right:
                this.speedX = this.speed;
                this.speedY = 0;
                this.rotation = 90;
                this.direction = DirectionEnum.right;
                break;
            case ActionEnum.stopMove:
                this.speedX = 0;
                this.speedY = 0;
                this.stop();
                break;
    	}
	}
	
	//自动转向，优先往下
	public autoTurn(){
    	 if(this.direction != DirectionEnum.down){
             var actionType = ActionEnum.down;
    	 }else{
             actionType = NumberTool.getRandomInt(ActionEnum.up, ActionEnum.right);
    	 }
    	 this.actionHandler(actionType);
	}
	
	//自动移动
	private turnCount = 60;
    public autoMove(){
        this.turnCount--;
        if(this.turnCount < 0){
            this.turnCount = Math.round(120 + Math.random()*120);  //每隔一段时间自动转向
            this.autoTurn();
        }else{
            this.move();
        }
    }
    
    //更新射击时间
    public updateShootCount() {
        this.shootCount++;
    }
    
	//射击
	public shoot(){
        this.shootCount++;
        if(this.shootCount * 16 >= this.shootTime) {  // 1帧的时间 1000/60 = 16ms
            this.shootCount = 0;
            var bullet: Bullet = GameFactory.getInstance().bulletPool.getObject();
            bullet.type = this.type;
            bullet.power = this.power;
            bullet.x = this.x;
            bullet.y = this.y;
            switch(this.direction) {
                case DirectionEnum.up:   //上
                    bullet.rotation = 0;
                    bullet.speedY = -bullet.speed + (this.power - 1); //子弹根据威力加速
                    break;
                case DirectionEnum.down:   //下
                    bullet.rotation = 180;
                    bullet.speedY = bullet.speed + (this.power - 1);
                    break;
                case DirectionEnum.left:   //左
                    bullet.rotation = -90;
                    bullet.speedX = -bullet.speed + (this.power - 1);
                    break;
                case DirectionEnum.right:     //右
                    bullet.rotation = 90;
                    bullet.speedX = bullet.speed + (this.power - 1);
                    break;
            }
            var gameScene:GameScene = GameManager.getInstance().gameScene;
            gameScene.bulletList.push(bullet);
            gameScene.bulletGroup.addChild(bullet);
        }
	}
	
	//坦克碰撞检测
	public checkCollision(target):boolean{
        var myX = this.x + this.speedX;
        var myY = this.y + this.speedY;
        if(Math.abs(target.x - myX) < 64 && Math.abs(target.y- myY) < 64) {
            return true;
        }
        return false;
	}
	
	/**
	 * 被击中
	 * bullet 子弹
	 * return 返回是否击毁坦克
	 */ 
    public beAttacked(bullet:Bullet){
        if(this.isWuDi){
            return false;
        }
        this.life -= bullet.power;
        if(this.life <= 0){
            return true;
        }
        return false;
    }
    
	
	
	//回收
    public recycle() {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(this.className).returnObject(this);
    }
}
