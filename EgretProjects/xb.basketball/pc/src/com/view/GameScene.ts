/**
 * 游戏场景
 * 投球页面
 * @author 
 *
 */
class GameScene extends BaseScene{
    private resultPanel: ResultPanel = new ResultPanel(); //结算框
    private countDownUI:CountDownUI = new CountDownUI();  //倒计时
    private soundManager:SoundManager = SoundManager.getInstance();
    
    private stageWidth: number;   //舞台高宽
    private stageHeight: number;
    
    public ballBackGroup:eui.Group;  //球在球网后Group
    public ballFrontGroup:eui.Group; //球在球网前Group
    private frameBgGroup:eui.Group;  //球框背景Group
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
    private timeLimit:number = 30;  //游戏计时
    private curTime:number = 0;     //当前计时
    
    private countDownTimer:egret.Timer = new egret.Timer(1000);  //倒计时
    private countDownLimit:number = 3;
    
    private score:number = 0;      //当前得分
    
    private logoGroup:eui.Group;   //logo加载
    private logoLoader:ImagerLoad = new ImagerLoad();
    
	public constructor() {
        super("GameSceneSkin");
	}

    public componentCreated(): void {
        super.componentCreated();
        
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;

    }

    public onEnable(): void {
        this.loadLogo();
        this.soundManager.playBgm(this.soundManager.bgm_game, 0.5);
        this.resetGame();
        this.startCountDown(); 
    }

    public onRemove(): void {
        this.soundManager.stopBgm();
        this.hideResult();
        this.stopCountDown();
    }
    
    private loadLogo(){
        if(this.logoLoader.isEmpty()){
            this.logoGroup.addChild(this.logoLoader);
            this.logoLoader.loadImg(window["logoUrl"]);
        }
    }
    
    private startCountDown(){
        this.countDownUI.show(this);
        this.countDownUI.setTimeLabel(this.countDownLimit);
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    }
    
    private onCountDownHandler(){
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        if(count <= 0){
            this.stopCountDown();
            this.startGame();
        }else{
            this.countDownUI.setTimeLabel(count);
        }
    }
    
    private stopCountDown(){
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler,this);
        this.countDownTimer.stop();
        this.countDownUI.hide();
    }
    
    public startGame(){
        //为了配合手机端倒计时3秒，pc端延迟一段时间再开始计时
        //if(GameConst.isDebug == false){
            var self: GameScene = this;
            //egret.Tween.get(this).wait(5000).call(function() {
                self.startGameTimer();
            //});
        //}
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        
        if(GameConst.isDebug) {
            this.revShoot({ angle: 90 });
        }
    }
    
    private onEnterFrame(){
        this.moveBall();
        
    }
    
    private gameOver(){
        this.stopGameTimer();    //停止游戏计时
        this.stopMoveFrame();    //停止球网移动
        
        //显示游戏结果，返回二维码界面
        this.showResult();
        
        //发送游戏结束
        this.sendGameOver();

        var self:GameScene = this;
        egret.Tween.get(this).wait(5000).call(function(){
            self.resetGame();
            LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
        });
        
        
    }
    
    private resetGame(){
        //停止游戏
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.stopCountDown();
        //重置游戏计时
        this.stopGameTimer();
        this.curTime = this.timeLimit;
        this.setTimeLabel(this.curTime);
        //重置分数
        this.score = 0;
        this.scoreLabel.text = "0";
        //重置球框
        this.stopMoveFrame();
        this.frameGroup.x = this.frameGroupX;
        this.frameBgGroup.x = this.frameGroupX;
        //重置球
        var len:number = this.ballList.length;
        for(var i:number=0;i<len;i++){
            this.ballList[i].recycle();
        }
        this.ballList.length = 0;
        
        if(GameConst.isDebug){
            this.moveFrame();
        }
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
    private ballRadius: number = 106 * 0.6; //球在球网时半径
    private gravity: number = 1;          //重力
    private ballScaleRate:number = (1 - 0.6)/this.floorLength;   //球缩放比例, 0.7为球在球网处时缩小比例
    private frameGroupX:number = 0;
    
    //模拟投球
    private shootTouch() {
        this.shoot(-90 * Math.PI / 180);
    }
    
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
            ball.z = this.floorLength;
            ball.speedZ = 0;
            this.ballBackGroup.addChild(ball);
            ball.bTouchWall = true;
            ball.gotoAndPlay("label1");
            this.soundManager.play(this.soundManager.floor);
            
        }else if(ball.z < this.floorLength){
            this.ballFrontGroup.addChild(ball);
        }
        if(ball.realY > 0) {
            ball.realY = 0;
            ball.y = ball.realY + (this.stageHeight - this.yRate * ball.z); //z轴时，球实际y坐标+视觉变化的坐标
            ball.speedY = -ball.speedY * 0.9;
            
            //球撞到墙后，下落后滚动回来
            if(ball.bTouchWall) {
                ball.bShoot = false;
                ball.speedZ = -20;
                ball.speedY = -20;
            }
            this.soundManager.play(this.soundManager.floor);
        }
        if(ball.x < (this.stageWidth - this.floorMaxWidth + ball.z * this.xRate) / 2) { //z轴时，球道宽度
            ball.speedX = - ball.speedX * 0.9;
            ball.x = (this.stageWidth - this.floorMaxWidth + ball.z * this.xRate) / 2;
            this.soundManager.play(this.soundManager.floor);
        } else if(ball.x > (this.stageWidth + this.floorMaxWidth - ball.z * this.xRate) / 2) {
            ball.speedX = - ball.speedX * 0.9;
            ball.x = (this.stageWidth + this.floorMaxWidth - ball.z * this.xRate) / 2;
            this.soundManager.play(this.soundManager.floor);
        }
    }
    
    //检查是否进球
    private checkShoot(ball:Ball){
//        if((this.floorLength - ball.z) > this.ballRadius){
//            return;
//        }
        if(this.floorLength != ball.z){ 
            return;
        }
        //判断进球
        if(ball.bShoot == false) {
            this.wangX = this.ballWang.x + this.frameGroup.x;
            this.wangY = this.ballWang.y + this.frameGroup.y;
            if(ball.bTouchWall && Math.abs(ball.x - this.wangX) < 37 &&       //球在离球网一定范围以内
                (ball.y < (this.wangY - this.ballRadius + 20))  //球y轴判断 ,+20防止修正球框在移动中球y坐标会比半径小的问题
            ) {
                ball.bShoot = true;
                ball.bTouchWall = true;
                ball.speedX = ball.speedX * 0.5; //下落时，将速度减慢，模拟球擦网摩擦力
                ball.speedY = 15;
                ball.speedZ = 0;
                this.ballWangAnim();
                    
                //游戏未结束时，才计算得分
                if(!this.resultPanel.parent){
                    this.score += 2;
                    this.scoreLabel.text = this.score + ""; 
                }
                
                
                this.soundManager.play(this.soundManager.wang);
                
                egret.log("shoot success");
            }
        }
    }
    
    //检查篮筐碰撞
    private checkFrameColliose(ball:Ball){
//        if((this.floorLength - ball.z) > this.ballRadius) {
//            return;
//        }
        if(this.floorLength != ball.z) { //ball.z在一定范围内才检测进球
            return;
        }
        //篮筐碰撞
        this.leftHitAreaX = this.leftHitArea.x + this.frameGroup.x;
        this.leftHitAreaY = this.leftHitArea.y + this.frameGroup.y;
        this.rightHitAreaX = this.rightHitArea.x + this.frameGroup.x;
        this.rightHitAreaY = this.rightHitArea.y + this.frameGroup.y;


        if(Math.sqrt(Math.pow(this.leftHitAreaX - ball.x,2) + Math.pow(this.leftHitAreaY - ball.y,2)) < this.ballRadius) {
            var angle: number = Math.atan2(ball.y - this.leftHitAreaY,ball.x - this.leftHitAreaX);
            
            ball.speedX = -angle * 10; //反弹后，x轴速度变化
            ball.speedX = (ball.x > this.leftHitAreaX) ? Math.abs(ball.speedX) : -Math.abs(ball.speedX);
            
            //防止篮球碰撞后x速度过小，连续多次碰撞篮筐
            if(Math.abs(ball.speedX) < 5){
                ball.speedX = (ball.speedX/Math.abs(ball.speedX))*5; 
                ball.speedX += ball.speedX;
            }else{
                ball.x += (ball.speedX / Math.abs(ball.speedX)) * 5;
            }
            
            
            if(!ball.bShoot){ //进篮后的球，碰撞后在y和z不会改变，而是直接下落
                ball.speedY = (ball.y > this.leftHitAreaY) ? Math.abs(ball.speedY) : -Math.abs(ball.speedY);
                ball.speedZ = -5;
            }
            
            this.soundManager.play(this.soundManager.frame);
            
            egret.log("hit left frame");

        } else if(Math.sqrt(Math.pow(this.rightHitAreaX - ball.x,2) + Math.pow(this.rightHitAreaY - ball.y,2)) < this.ballRadius) {
            var angle: number = Math.atan2(ball.y - this.rightHitAreaY,ball.x - this.rightHitAreaX);
            
            ball.speedX = -(angle + 1.57) * 10; //反弹后，x轴速度变化
            ball.speedX = (ball.x > this.rightHitAreaX) ? Math.abs(ball.speedX) : -Math.abs(ball.speedX);
            
            if(Math.abs(ball.speedX) < 5) {
                ball.speedX = (ball.speedX / Math.abs(ball.speedX)) * 5; 
                ball.x += ball.speedX;
            }else{
                ball.x += (ball.speedX / Math.abs(ball.speedX)) * 5;
            }
            
            
            if(!ball.bShoot) {
                ball.speedY = (ball.y > this.rightHitAreaY) ? Math.abs(ball.speedY) : -Math.abs(ball.speedY);
                ball.speedZ = -5;
            }
            
            this.soundManager.play(this.soundManager.frame);
            
            egret.log("hit right frame");
        }
    }
    
    //其他检测
    private checkOther(ball:Ball,index:number){

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
        var dis:number = 100;
        egret.Tween.get(this.frameGroup).to({ x: -dis },2000).to({ x: dis },2000).call(function(){
            self.frameGroup.x = dis;
            egret.Tween.get(self.frameGroup,{ loop: true }).to({ x: -dis },2000).to({ x: dis },2000);
        });
        egret.Tween.get(this.frameBgGroup).to({ x: -dis },2000).to({ x: dis },2000).call(function() {
            self.frameGroup.x = dis;
            egret.Tween.get(self.frameBgGroup,{ loop: true }).to({ x: -dis },2000).to({ x: dis },2000);
        });
        
    }
    
    //停止移动球框
    private stopMoveFrame(){
        egret.Tween.removeTweens(this.frameGroup);
        egret.Tween.removeTweens(this.frameBgGroup);
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
    
    //显示游戏结果
    private showResult(){
        this.resultPanel.x = (GameConst.stage.stageWidth - this.resultPanel.width)/2;
        this.resultPanel.y = (GameConst.stage.stageHeight - this.resultPanel.height) / 2;
        this.addChild(this.resultPanel);
        this.resultPanel.setScore(this.score);
    }
    
    private hideResult(){
        if(this.resultPanel.parent){
            this.removeChild(this.resultPanel);
        }
    }
    
    ///////////////////////////////////////////
    //----------------[发送数据]---------------
    ///////////////////////////////////////////
    private sendGameOver(){
        egret.log("发送游戏结束:",this.score);
        ClientSocket.getInstance().sendMessage("gameOver",{"score":this.score});
    }
    
    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    
    //接收房间号是否正确
    public revShoot(data) {
        var angle:number = data.angle;  //发射弧度
        
        if(GameConst.isDebug){
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shootTouch,this);
        }else{
            if(this.ballList.length <= 7 && !this.countDownUI.parent){
                this.shoot(angle);
            }
        }
        
    }
    
    //接收用户射击
    private shoot(angle:number){   //angle = 弧度
        //egret.log("shoot",angle);
        var ball: Ball = this.ballPool.getObject();
        ball.x = this.stageWidth / 2;
        ball.y = this.stageHeight;
        ball.z = 0;
        
        //角度获取x移动方向  -90=-1.57  -100=-1.74  -(angle + 1.57) * 10  -angle*10
        //var hudu = parseFloat((angle*Math.PI/180).toFixed(2)) + 1.57;
        
        ball.speedX = (angle + 1.57)*20;
        ball.speedZ = 45;
        ball.speedY = -30;
        ball.gotoAndPlay("label0");
        this.ballList.push(ball);

        ball.shadow.x = ball.x;
        ball.shadow.y = this.stageHeight - this.yRate * ball.z + ball.shadow.height;
        this.ballBackGroup.addChild(ball.shadow);
        this.ballFrontGroup.addChild(ball);
    }
    
    //用户离开
    public revUserQuit(){
        egret.log("rev userQuit");
        if(!this.resultPanel.parent){ //游戏结束，不处理userQuit
            this.resetGame();
            LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
        }
        
    }
    
}









