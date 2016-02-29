/**
 * 游戏场景
 * 投球页面
 * @author 
 *
 */
class GameScene extends BaseScene{
    private stageWidth: number;   //舞台高宽
    private stageHeight: number;
    
    public ballBackGroup:eui.Group;  //球在球网后Group
    public ballFrontGroup:eui.Group; //球在球网前Group
    private frameGroup:eui.Group;    //球框Group
    private ballWang:eui.Image;      //球框
    private ballFrame:eui.Image;     //球网
    private leftHitArea: eui.Rect;   //篮筐碰撞点
    private rightHitArea: eui.Rect;
    
    private ballPool:ObjectPool = ObjectPool.getPool(Ball.NAME,5); //篮球对象池
    private ballList:Array<Ball> = new Array<Ball>();              //篮球数组
    private ballRadius:number = 110; //球半径
    private gravity: number = 0.5;  //重力
    
    private gameTimer:egret.Timer = new egret.Timer(1000);  //游戏计时器
    private timeLimit:number = 30;  //游戏计时
    private curTime:number = 0;     //当前计时
    
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
        this.moveFrame();
    }
    
    private onEnterFrame(){
        this.moveBall();
        
    }
    
    private gameOver(){
        this.stopGameTimer();
        //TODO 显示游戏结果，返回二维码界面
        
    }
    
    private resetGame(){
        
    }
    
    
    //z=0时，球道宽540，球道y=0
    //z=1000时，球道宽220，球道y=340
    //当前球所在位置z的球道宽度 220 + z*(540-220)/1000
    //球在z时，x速度= (1 - (z*(540-220)/1000)/540)*speedX
    //球在z时，y速度 = 同上
    //球在z时，z速度导致的y变化，600 - 340/1000*z
    //球在z时，球大小比例，1- (1-0.7)*z 
    private floorLength: number = 2000;   //球道长宽，虚拟长度
    private floorMaxWidth: number = 950;  //球道z=0，y=0时，宽度
    private floorMinWidth:number = 475;   //球道z=1000时宽度
    private floorHeight:number = 565;     //球道高度，视觉上Y高度
    private leftHitAreaX:number;          //篮筐坐标
    private leftHitAreaY: number;
    private rightHitAreaX: number;
    private rightHitAreaY: number;
    private wangX: number;                //篮网坐标
    private wangY: number;
    //private xRate:number = (this.floorMaxWidth - this.floorMinWidth)/this.floorLength; //球x轴速率比例 0.32
    //private yRate:number = this.floorHeight/this.floorLength;                          //z速度导致的y变化比例 0.34
    private xRate:number = 0.32;
    private yRate:number = 0.34;
    private ballScaleRate:number = (1 - 0.7)/this.floorLength;                         //球缩放比例
    
    
    //移动篮球
    private moveBall(){
        var len: number = this.ballList.length;
        var ball: Ball;
        var rate:number;
        for(var i: number = len-1;i >=0;i--) {
            ball = this.ballList[i];
            //重力
            ball.speedY += this.gravity;
            //x，y，z轴位移
            rate = (1 - (ball.z * this.xRate) / this.floorMaxWidth);
            ball.z += ball.speedZ;
            ball.x += ball.speedX * rate;
            ball.realY += ball.speedY*rate;
            ball.y = ball.realY + (this.stageHeight - this.yRate * ball.z );
            //球比例
            ball.scaleX = 1 - this.ballScaleRate*ball.z;
            ball.scaleY = ball.scaleX;
            //边界检测
            if(ball.z > this.floorLength){
                ball.speedZ = - ball.speedZ*0.5;
                ball.z = this.floorLength;
                
                //this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            }
            if(ball.realY  > 0){
                ball.realY = 0;
                ball.y = ball.realY + (this.stageHeight - this.yRate * ball.z);
                ball.speedY = -ball.speedY*0.9;
            }
            if(ball.x < (this.stageWidth - this.floorMaxWidth + ball.z * this.xRate)/2) { // 865/2 - (540 - 0.32*z)/2， 865/2 + (540-0.32*z)/2
                ball.speedX = - ball.speedX*0.9;
                ball.x = (this.stageWidth - this.floorMaxWidth + ball.z * this.xRate) / 2;
            } else if(ball.x > (this.stageWidth + this.floorMaxWidth - ball.z * this.xRate)/2){
                ball.speedX = - ball.speedX*0.9;
                ball.x = (this.stageWidth + this.floorMaxWidth - ball.z * this.xRate)/2;
            }
            
            if(ball.bShoot == false && ((this.floorLength - ball.z) < this.ballRadius)){
               
                //篮筐碰撞
                this.leftHitAreaX = this.leftHitArea.x + this.frameGroup.x;
                this.leftHitAreaY = this.leftHitArea.y + this.frameGroup.y;
                this.rightHitAreaX = this.rightHitArea.x + this.frameGroup.x;
                this.rightHitAreaY = this.rightHitArea.y + this.frameGroup.y;
                

                if((Math.abs(this.leftHitAreaX - ball.x) <= this.ballRadius) && 
                    (Math.abs(this.leftHitAreaY - ball.y) <= this.ballRadius))
                {
                    var angle: number = Math.atan2(ball.y - this.leftHitAreaY,ball.x - this.leftHitAreaX);
                        ball.speedX = -angle * 10;
                    
                        ball.speedX = (ball.x > this.leftHitAreaX)? Math.abs(ball.speedX):-Math.abs(ball.speedX);
                        ball.speedY = (ball.y > this.leftHitAreaY) ? Math.abs(ball.speedY) : -Math.abs(ball.speedY);
                        
                        console.log("hit left frame");
                        
                } else if((Math.abs(this.rightHitAreaX - ball.x) <= this.ballRadius) &&
                    (Math.abs(this.rightHitAreaY - ball.y) <= this.ballRadius))
                {
                    var angle: number = Math.atan2(ball.y - this.rightHitAreaY,ball.x - this.rightHitAreaX);
                    ball.speedX = -(angle + 1.57) * 10;
                    
                    ball.speedX = (ball.x > this.rightHitAreaX) ? Math.abs(ball.speedX) : -Math.abs(ball.speedX);
                    ball.speedY = (ball.y > this.rightHitAreaY) ? Math.abs(ball.speedY) : -Math.abs(ball.speedY);
                    console.log("hit right frame");
                }
                //判断进球
                this.wangX = this.ballWang.x + this.frameGroup.x;
                this.wangY = this.ballWang.y + this.frameGroup.y;
                if(Math.abs(ball.x - this.wangX) < 10 &&   //球在球网x轴范围13以内
                    (ball.y < (this.wangY - this.ballRadius))  //球y轴判断
                    ){
                    ball.bShoot = true;
                    ball.speedX = ball.speedX * 0.5; //下落时，将速度减慢，模拟球擦网摩擦力
                    ball.speedZ = -ball.speedZ*0.2;   
                    ball.speedY = ball.speedY*0.5;
                    this.ballWangAnim();
                    
                    //球进球时在球网后，下落后在球网前
                    ball.setIndex(this);
                    
                    console.log("shoot success");
                    //this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
                }
            }
            
            //影子
            ball.shadow.x = ball.x;
            ball.shadow.y = this.stageHeight - this.yRate * ball.z + ball.shadow.height;
            ball.shadow.scaleX = -ball.realY/this.stageHeight + 0.5;  //影子缩放
            ball.shadow.scaleY = -ball.realY/this.stageHeight + 0.5;
            
            //超出边界,移除篮球
            if(ball.y > this.stageHeight){
                this.ballList.splice(i,1);
                ball.recycle();
            } 
        }       

        
    }
    
    //球网动画
    private ballWangAnim(){
        this.ballWang.scaleY = 1;
        egret.Tween.removeTweens(this.ballWang);
        egret.Tween.get(this.ballWang).to({scaleY:0.1},250).to({scaleY:1},250);
    }

    //移动球框
    private moveFrame(){
        var self:GameScene = this;
        var dis:number = 0;
        egret.Tween.get(this.frameGroup).to({ x: -dis },1000).to({ x: dis},1000).call(function(){
            self.frameGroup.x = dis;
            egret.Tween.get(self.frameGroup,{loop:true}).to({x:-dis},1000).to({x:dis},1000);
        });
 
    }
    
    //停止移动球框
    private stopMoveFrame(){
        this.frameGroup.x = 0;
        egret.Tween.removeTweens(this.frameGroup);
    }
    
    //开始计时
    private startGameTimer(){
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    private onTimerHandler(){
        //TODO 计时
        this.curTime --;
        if(this.curTime < 0){
            egret.log("time over");
            this.gameOver();
        }
    }
    
    //停止计时
    private stopGameTimer(){
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
        this.gameTimer.stop();
    }
    
    
    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    
    //接收房间号是否正确
    public revShoot(data) {
        var angle:number = data.angle;  //发射角度
        
        angle = 225*Math.PI/180;
        
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shoot,this);
    }
    
    private shoot(){
        console.log("shoot");
        var ball: Ball = this.ballPool.getObject();
        ball.x = this.stageWidth / 2;
        ball.y = this.stageHeight;
        ball.speedX = 0;  //角度获取x移动方向
        ball.speedZ = 40;
        ball.speedY = -22;
        ball.gotoAndPlay("label0");
        this.ballList.push(ball);

        ball.shadow.x = ball.x;
        ball.shadow.y = this.stageHeight - this.yRate * ball.z + ball.shadow.height;
        this.ballBackGroup.addChild(ball.shadow);
        this.ballFrontGroup.addChild(ball);
    }
    
    
}









