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
    
    private timeLabel:eui.Label;     //时间文本
    private scoreLabel:eui.Label;    //得分文本
    
    private ballPool:ObjectPool = ObjectPool.getPool(Ball.NAME,5); //篮球对象池
    private ballList:Array<Ball> = new Array<Ball>();              //篮球数组
    
    
    private gameTimer:egret.Timer = new egret.Timer(1000);  //游戏计时器
    private timeLimit:number = 3;  //游戏计时
    private curTime:number = 0;     //当前计时
    
    private score:number = 0;      //当前得分
    
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
        this.resetGame();
        this.startGameTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    
    private onEnterFrame(){
        this.moveBall();
        
    }
    
    private gameOver(){
        this.stopGameTimer();    //停止游戏计时
        this.stopMoveFrame();    //停止球网移动
        //TODO 显示游戏结果，返回二维码界面
        
        var self:GameScene = this;
        egret.Tween.get(this).wait(1000).call(function(){
            self.resetGame();
            LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
        });
    }
    
    private resetGame(){
        //停止游戏
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        //重置游戏计时
        this.curTime = this.timeLimit;
        this.setTimeLabel(this.curTime);
        //重置分数
        this.score = 0;
        this.scoreLabel.text = "0";
        //重置球框
        this.frameGroup.x = 0;
        //重置球
        var len:number = this.ballList.length;
        for(var i:number=0;i<len;i++){
            this.ballList[i].recycle();
        }
        this.ballList.length = 0;
        
    }
    
    private stopAllMove(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.stopMoveFrame();
    }
    

    private floorLength: number = 2000;     //球道长宽，虚拟长度
    private floorMaxWidth: number = 950;    //球道z=0，y=0时，宽度
    private floorMinWidth:number = 475;     //球道z=2000时宽度
    private floorHeight:number = 565;       //球道高度，视觉上Y高度
    private leftHitAreaX:number;            //篮筐坐标
    private leftHitAreaY: number;
    private rightHitAreaX: number;
    private rightHitAreaY: number;
    private wangX: number;                  //篮网坐标 (this.floorMaxWidth - this.floorMinWidth)/this.floorLength
    private wangY: number;                       
    private xRate: number = 0.32;           //z轴位置球x轴速率比例 0.32 
    private yRate: number = 0.34;           //z轴位置球y轴速率比例 0.34 
    private ballRadius: number = 106 * 0.7; //球在球网时半径
    private gravity: number = 0.5;          //重力
    private ballScaleRate:number = (1 - 0.7)/this.floorLength;   //球缩放比例, 0.7为球在球网处时缩小比例
    
    //移动篮球
    private moveBall(){
        var len: number = this.ballList.length;
        var ball: Ball;
        
        for(var i: number = len-1;i >=0;i--) {
            ball = this.ballList[i];
            this.checkEdge(ball);           //边界检测
            this.checkShoot(ball);          //命中检测
            this.checkFrameColliose(ball);  //篮筐碰撞检测
            this.checkOther(ball,i);        //深度排序、影子移动、超出边界移除等
        }        
    }
    
    //边界检测
    private checkEdge(ball:Ball){
        //重力
        ball.speedY += this.gravity;
        //x，y，z轴位移,rate=球在z轴位置时速度的缩放比例
        var rate = (1 - (ball.z * this.xRate) / this.floorMaxWidth); 
        ball.z += ball.speedZ;
        ball.x += ball.speedX * rate;
        ball.realY += ball.speedY * rate;
        ball.y = ball.realY + (this.stageHeight - this.yRate * ball.z);
        //球比例
        ball.scaleX = 1 - this.ballScaleRate * ball.z;
        ball.scaleY = ball.scaleX;
        //边界检测
        if(ball.z > this.floorLength) {
            ball.speedZ = - ball.speedZ * 0.5;
            ball.z = this.floorLength;
        }
        if(ball.realY > 0) {
            ball.realY = 0;
            ball.y = ball.realY + (this.stageHeight - this.yRate * ball.z); //z轴时，球实际y坐标+视觉变化的坐标
            ball.speedY = -ball.speedY * 0.9;
        }
        if(ball.x < (this.stageWidth - this.floorMaxWidth + ball.z * this.xRate) / 2) { //z轴时，球道宽度
            ball.speedX = - ball.speedX * 0.9;
            ball.x = (this.stageWidth - this.floorMaxWidth + ball.z * this.xRate) / 2;
        } else if(ball.x > (this.stageWidth + this.floorMaxWidth - ball.z * this.xRate) / 2) {
            ball.speedX = - ball.speedX * 0.9;
            ball.x = (this.stageWidth + this.floorMaxWidth - ball.z * this.xRate) / 2;
        }
    }
    
    //检查是否进球
    private checkShoot(ball:Ball){
        if((this.floorLength - ball.z) > this.ballRadius){
            return;
        }
        //判断进球
        if(ball.bShoot == false) {
            this.wangX = this.ballWang.x + this.frameGroup.x;
            this.wangY = this.ballWang.y + this.frameGroup.y;
            if(Math.abs(ball.x - this.wangX) < 25 &&       //球在离球网一定范围以内
                (ball.y < (this.wangY - this.ballRadius))  //球y轴判断
            ) {
                ball.bShoot = true;
                ball.speedX = ball.speedX * 0.5; //下落时，将速度减慢，模拟球擦网摩擦力
                ball.speedZ = -ball.speedZ * 0.1;
                //ball.speedY = ball.speedY*0.5;
                this.ballWangAnim();
                    
                //球进球时在球网后，下落后在球网前
                this.ballBackGroup.addChild(ball);
                    
                //得分
                this.score += 2;
                this.scoreLabel.text = this.score + "";

                egret.log("shoot success");
            }
        }
    }
    
    //检查篮筐碰撞
    private checkFrameColliose(ball:Ball){
        if((this.floorLength - ball.z) > this.ballRadius) {
            return;
        }
        //篮筐碰撞
        this.leftHitAreaX = this.leftHitArea.x + this.frameGroup.x;
        this.leftHitAreaY = this.leftHitArea.y + this.frameGroup.y;
        this.rightHitAreaX = this.rightHitArea.x + this.frameGroup.x;
        this.rightHitAreaY = this.rightHitArea.y + this.frameGroup.y;


        if(!ball.bShoot && Math.sqrt(Math.pow(this.leftHitAreaX - ball.x,2) + Math.pow(this.leftHitAreaY - ball.y,2)) <= this.ballRadius) {
            var angle: number = Math.atan2(ball.y - this.leftHitAreaY,ball.x - this.leftHitAreaX);
            ball.speedX = -angle * 10; //反弹后，x轴速度变化

            ball.speedX = (ball.x > this.leftHitAreaX) ? Math.abs(ball.speedX) : -Math.abs(ball.speedX);
            ball.speedY = (ball.y > this.leftHitAreaY) ? Math.abs(ball.speedY) : -Math.abs(ball.speedY);

            egret.log("hit left frame");

        } else if(!ball.bShoot && Math.sqrt(Math.pow(this.rightHitAreaX - ball.x,2) + Math.pow(this.rightHitAreaY - ball.y,2)) <= this.ballRadius) {
            var angle: number = Math.atan2(ball.y - this.rightHitAreaY,ball.x - this.rightHitAreaX);
            ball.speedX = -(angle + 1.57) * 10; //反弹后，x轴速度变化

            ball.speedX = (ball.x > this.rightHitAreaX) ? Math.abs(ball.speedX) : -Math.abs(ball.speedX);
            ball.speedY = (ball.y > this.rightHitAreaY) ? Math.abs(ball.speedY) : -Math.abs(ball.speedY);


            egret.log("hit right frame");
        }
    }
    
    //其他检测
    private checkOther(ball:Ball,index:number){
        //深度排序
        if(ball.bShoot && ball.y > (this.wangY + this.ballWang.height)) {
            this.ballFrontGroup.addChild(ball);
        }

        //影子
        ball.shadow.x = ball.x;
        ball.shadow.y = this.stageHeight - this.yRate * ball.z + ball.shadow.height; //影子在z轴时，y坐标视觉修正
        ball.shadow.scaleX = -ball.realY / this.stageHeight + 0.5;  //影子缩放
        ball.shadow.scaleY = -ball.realY / this.stageHeight + 0.5;
            
        //超出边界,移除篮球
        if(ball.y > this.stageHeight) {
            this.ballList.splice(index,1);
            ball.recycle();
        } 
    }
    
    //球网动画
    private ballWangAnim(){
        this.ballWang.scaleY = 1;
        egret.Tween.removeTweens(this.ballWang);
        egret.Tween.get(this.ballWang).to({scaleY:0.1},300).to({scaleY:1},300);
    }

    //移动球框
    private moveFrame(){
        var self:GameScene = this;
        var dis:number = 50;
        egret.Tween.get(this.frameGroup).to({ x: -dis },1000).to({ x: dis},1000).call(function(){
            self.frameGroup.x = dis;
            egret.Tween.get(self.frameGroup,{loop:true}).to({x:-dis},1000).to({x:dis},1000);
        });
        
    }
    
    //停止移动球框
    private stopMoveFrame(){
        //this.frameGroup.x = 0;
        egret.Tween.removeTweens(this.frameGroup);
    }
    
    //开始计时
    private startGameTimer(){
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    private onTimerHandler(){
        this.curTime --;
        
        if(this.curTime == Math.round(this.timeLimit/2)){
            this.moveFrame();
        }
        
        if(this.curTime >= 0){
            this.setTimeLabel(this.curTime);
        }else{
            egret.log("time over");
            this.gameOver();
        }
        
    }
    
    //停止计时
    private stopGameTimer(){
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
        this.gameTimer.stop();
    }
    
    //设置时间文本
    private setTimeLabel(time:number){
        this.timeLabel.text = "00:" + StringTool.getTimeString(time);
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
        ball.z = 0;
        ball.speedX = 0;  //角度获取x移动方向
        ball.speedZ = 40;
        ball.speedY = -20;
        ball.gotoAndPlay("label0");
        this.ballList.push(ball);

        ball.shadow.x = ball.x;
        ball.shadow.y = this.stageHeight - this.yRate * ball.z + ball.shadow.height;
        this.ballBackGroup.addChild(ball.shadow);
        this.ballFrontGroup.addChild(ball);
    }
    
    
}









