/**
 * 坦克基类
 * @author 
 *
 */
class BaseTank extends SimpleMC{
    public className:string = "";//类名
    public type:TankEnum;        //坦克类型
    public skin:string = "";     //坦克皮肤
    public speed:number = 0;     //移动速度
    public speedX:number = 0;    
    public speedY:number = 0;
    public direction:number = 0; //移动方向 -1停 0上 1下 2左 3右
    public power:number = 0;     //子弹威力
    public life:number = 0;      //生命值
    public shootTime:number = 0; //射击间隔时间，单位ms
    public shootCount:number = 0;//射击计时，单位帧
    
    public constructor(pngName: string,jsonName: string,mcName: string) {
        super(pngName,jsonName,mcName);
        this.className = egret.getQualifiedClassName(this);
	}

	public move(){
    	this.x += this.speedX;
    	this.y += this.speedY;
	}
	
	//自动射击
	public autoShoot(){
        this.shootCount++;
        if(this.shootCount*16 >= this.shootTime){  // 1帧的时间 1000/60 = 16ms
            this.shootCount = 0;
            this.shoot();
        }
	}
	
	//射击
	public shoot(){
    	var bullet:Bullet = GameFactory.getInstance().bulletPool.getObject();
    	bullet.type = this.type;
    	bullet.power = this.power;
    	switch(this.direction){
            case 0:   //上
                bullet.speedY = -bullet.speed;
                break;
    	       case 1:   //下
                bullet.speedY = bullet.speed;
                break;
    	       case 2:   //左
                bullet.speedX = -bullet.speed;
                break;
            case 3:     //右
                bullet.speedX = bullet.speed;
                break;
    	}
    	//子弹添加到场景中
    	var gameScene:GameScene = GameManager.getInstance().gameScene;
       gameScene.bulletGroup.addChild(bullet);
       if(bullet.type == TankEnum.player){
           gameScene.playerBulletList.push(bullet);
       }else{
           gameScene.enemyBulletList.push(bullet);
       }
	}
	
	/**
	 * 被击中
	 * bullet 子弹
	 * return 返回是否击中有效
	 */ 
    public beAttacked(bullet:Bullet){
        return true;
    }
    
	//重置状态
	public reset(){
    	   
	}
	
	//回收
    public recycle() {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(this.className).returnObject(this);
    }
}
