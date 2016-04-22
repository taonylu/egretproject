/**
 * 坦克基类
 * @author 
 *
 */
class BaseTank extends SimpleMC{
    public className:string = "";//类名
    public type:TankEnum;        //坦克类型
    public skin:string = "";     //坦克皮肤
    public speed:number = 4;     //移动速度
    public speedX:number = 0;    //x，y轴移动速度
    public speedY:number = 0;
    public direction:ActionEnum; //移动方向
    public power:number = 0;     //子弹威力
    public life:number = 0;      //生命值
    public shootTime:number = 0; //射击间隔时间，单位ms
    public shootCount:number = 0;//射击计时，单位帧
    public isHaveItem:boolean;   //是否携带道具         
    public openid: string;       //openid
    
    public constructor() {
        super();
        this.className = egret.getQualifiedClassName(this);
	}

	//移动
	public move(){
    	this.x += this.speedX;
    	this.y += this.speedY;
	}
	
	//播放移动动画，敌方坦克不会停止移动
	public playMove(){
    	 if(this.type == TankEnum.player && this.direction != ActionEnum.stopMove){
            this.gotoAndPlay("lvl" + this.power);
    	 }
	}
	
	//设置方向
	public setDirection(direction:ActionEnum){
    	this.direction = direction;
      this.play(-1);
    	switch(this.direction){
        	case ActionEnum.up:
        	    this.speedX = 0;
        	    this.speedY = -this.speed;
        	    this.rotation = 0;
        	    break;
        	case ActionEnum.down:
        	    this.speedX = 0;
        	    this.speedY = this.speed;
        	    this.rotation = 180;
        	    break;
        	 case ActionEnum.left:
        	    this.speedX = -this.speed;
        	    this.speedY = 0;
        	    this.rotation = -90;
        	    break;
        	 case ActionEnum.right:
                this.speedX = this.speed;
                this.speedY = 0;
                this.rotation = 90;
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
    	 if(this.direction != ActionEnum.down){
        	 this.direction = ActionEnum.down;
    	 }else{
        	 this.direction = NumberTool.getRandomInt(ActionEnum.up, ActionEnum.right);
    	 }
    	 this.setDirection(this.direction);
	}
	
	//自动移动
	private turnCount = 60;
    public autoMove(){
        this.turnCount--;
        if(this.turnCount < 0){
            this.turnCount = Math.round(60 + Math.random()*100);  //每隔一段时间自动转向
            this.autoTurn();
        }else{
            this.move();
        }
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
                case ActionEnum.up:   //上
                    bullet.rotation = 0;
                    bullet.speedY = -bullet.speed + (this.power - 1); //子弹根据威力加速
                    break;
                case ActionEnum.down:   //下
                    bullet.rotation = 180;
                    bullet.speedY = bullet.speed + (this.power - 1);
                    break;
                case ActionEnum.left:   //左
                    bullet.rotation = -90;
                    bullet.speedX = -bullet.speed + (this.power - 1);
                    break;
                case ActionEnum.right:     //右
                    bullet.rotation = 90;
                    bullet.speedX = bullet.speed + (this.power - 1);
                    break;
            }
            var gameScene:GameScene = GameManager.getInstance().gameScene;
            gameScene.bulletList.push(bullet);
            gameScene.bulletGroup.addChild(bullet);
        }
	}
	
	/**
	 * 被击中
	 * bullet 子弹
	 * return 返回是否击中有效
	 */ 
    public beAttacked(bullet:Bullet){
        if(Math.abs(bullet.x - this.x) < 48 && (Math.abs(bullet.y- this.y)<48)){
            return true;
        }
        return false;
    }
    
	//重置状态
	public reset(){
    	   this.isHaveItem = false;
    	   this.shootCount = 0;
	}
	
	//回收
    public recycle() {
        this.parent && this.parent.removeChild(this);
        this.reset();
        ObjectPool.getPool(this.className).returnObject(this);
    }
}
