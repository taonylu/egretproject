/**
 * 游戏场景
 * 投球页面
 * @author 
 *
 */
class GameScene extends BaseScene{
    private ballGroup:eui.Group;  //球Group
    private ballWang:eui.Image;   //球框
    private ballFrame:eui.Image;  //球网
    private ballPool:ObjectPool = ObjectPool.getPool(Ball.NAME,5); //篮球对象池
    private ballList:Array<Ball> = new Array<Ball>();  //篮球数组
    
    //z=0时，球道宽540，球道y=0
    //z=1000时，球道宽220，球道y=340
    //当前球所在位置z的球道宽度 540-z*(540-220)/1000
    //球在z时，x速度= (1 - (z*(540-220)/1000)/540)*speedX
    //球在z时，y速度 = 同上
    //球在z时，z速度导致的y变化，600 - 340/1000*z
    //球在z时，球大小比例，1- (1-0.8)*z 
    private floorHeight:number = 1000;   //球道长宽
    private floorWidth:number = 540;
    
    private stageWidth:number;   //舞台高宽
    private stageHeight:number;
    
    private gravity:number = 1; //重力
    
    private leftHitArea:eui.Rect;   //篮筐碰撞点
    private rightHitArea:eui.Rect;
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
    }

    public onEnable(): void {
        
        this.startGame();
        this.revShoot({angle:90});
    }

    public onRemove(): void {
        
    }
    
    
    public startGame(){
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    
    private onEnterFrame(){
        this.moveBall();
    }
    
    //移动篮球
    private moveBall(){
        var len: number = this.ballList.length;
        var ball: Ball;
        var rate:number;
        for(var i: number = 0;i < len;i++) {
            ball = this.ballList[i];
            if(ball.z <= 500){
                //重力
                //ball.speedY += this.gravity;
                //x，y，z轴位移
                rate = (1 - (ball.z * 0.32) / 540);
                ball.z += ball.speedZ;
                ball.x += ball.speedX * rate;
                ball.y += ball.speedY*rate - rate*ball.speedZ;
                //比例
                ball.scaleX = 1- 0.0003*ball.z;
                ball.scaleY = ball.scaleX;
                //边界检测
//                if(ball.z >= 1000){
//                    ball.speedZ = - ball.speedZ;
//                }
               
            }
        }
    }

    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    
    //接收房间号是否正确
    public revShoot(data) {
        var angle:number = data.angle;  //发射角度
        
        angle = 225*Math.PI/180;
        
        var ball: Ball = this.ballPool.getObject();
        this.ballGroup.addChild(ball);
        ball.x = this.stageWidth / 2;
        ball.y = this.stageHeight;
        ball.speedX = 1;  //角度获取x移动方向
        ball.speedZ = 1;
        ball.speedY = 0;
        ball.play();
        this.ballList.push(ball);
        
    }
    
}









