/**
 * 游戏场景
 * 投球页面
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.ballPool = ObjectPool.getPool(Ball.NAME, 5); //篮球对象池
        this.ballList = new Array(); //篮球数组
        this.gameTimer = new egret.Timer(1000); //游戏计时器
        this.timeLimit = 3; //游戏计时
        this.curTime = 0; //当前计时
        this.score = 0; //当前得分
        this.floorLength = 2000; //球道长宽，虚拟长度
        this.floorMaxWidth = 950; //球道z=0，y=0时，宽度
        this.floorMinWidth = 475; //球道z=2000时宽度
        this.floorHeight = 565; //球道高度，视觉上Y高度
        this.xRate = 0.32; //z轴位置球x轴速率比例 0.32 
        this.yRate = 0.34; //z轴位置球y轴速率比例 0.34 
        this.ballRadius = 106 * 0.7; //球在球网时半径
        this.gravity = 0.5; //重力
        this.ballScaleRate = (1 - 0.7) / this.floorLength; //球缩放比例, 0.7为球在球网处时缩小比例
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
    };
    p.onEnable = function () {
        this.startGame();
        this.revShoot({ angle: 90 });
    };
    p.onRemove = function () {
    };
    p.startGame = function () {
        this.resetGame();
        this.startGameTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.onEnterFrame = function () {
        this.moveBall();
    };
    p.gameOver = function () {
        this.stopGameTimer(); //停止游戏计时
        this.stopMoveFrame(); //停止球网移动
        //TODO 显示游戏结果，返回二维码界面
        var self = this;
        egret.Tween.get(this).wait(1000).call(function () {
            self.resetGame();
            LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
        });
    };
    p.resetGame = function () {
        //停止游戏
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        //重置游戏计时
        this.curTime = this.timeLimit;
        this.setTimeLabel(this.curTime);
        //重置分数
        this.score = 0;
        this.scoreLabel.text = "0";
        //重置球框
        this.frameGroup.x = 0;
        //重置球
        var len = this.ballList.length;
        for (var i = 0; i < len; i++) {
            this.ballList[i].recycle();
        }
        this.ballList.length = 0;
    };
    p.stopAllMove = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stopMoveFrame();
    };
    //移动篮球
    p.moveBall = function () {
        var len = this.ballList.length;
        var ball;
        for (var i = len - 1; i >= 0; i--) {
            ball = this.ballList[i];
            this.checkEdge(ball); //边界检测
            this.checkShoot(ball); //命中检测
            this.checkFrameColliose(ball); //篮筐碰撞检测
            this.checkOther(ball, i); //深度排序、影子移动、超出边界移除等
        }
    };
    //边界检测
    p.checkEdge = function (ball) {
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
        if (ball.z > this.floorLength) {
            ball.speedZ = -ball.speedZ * 0.5;
            ball.z = this.floorLength;
        }
        if (ball.realY > 0) {
            ball.realY = 0;
            ball.y = ball.realY + (this.stageHeight - this.yRate * ball.z); //z轴时，球实际y坐标+视觉变化的坐标
            ball.speedY = -ball.speedY * 0.9;
        }
        if (ball.x < (this.stageWidth - this.floorMaxWidth + ball.z * this.xRate) / 2) {
            ball.speedX = -ball.speedX * 0.9;
            ball.x = (this.stageWidth - this.floorMaxWidth + ball.z * this.xRate) / 2;
        }
        else if (ball.x > (this.stageWidth + this.floorMaxWidth - ball.z * this.xRate) / 2) {
            ball.speedX = -ball.speedX * 0.9;
            ball.x = (this.stageWidth + this.floorMaxWidth - ball.z * this.xRate) / 2;
        }
    };
    //检查是否进球
    p.checkShoot = function (ball) {
        if ((this.floorLength - ball.z) > this.ballRadius) {
            return;
        }
        //判断进球
        if (ball.bShoot == false) {
            this.wangX = this.ballWang.x + this.frameGroup.x;
            this.wangY = this.ballWang.y + this.frameGroup.y;
            if (Math.abs(ball.x - this.wangX) < 25 &&
                (ball.y < (this.wangY - this.ballRadius)) //球y轴判断
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
    };
    //检查篮筐碰撞
    p.checkFrameColliose = function (ball) {
        if ((this.floorLength - ball.z) > this.ballRadius) {
            return;
        }
        //篮筐碰撞
        this.leftHitAreaX = this.leftHitArea.x + this.frameGroup.x;
        this.leftHitAreaY = this.leftHitArea.y + this.frameGroup.y;
        this.rightHitAreaX = this.rightHitArea.x + this.frameGroup.x;
        this.rightHitAreaY = this.rightHitArea.y + this.frameGroup.y;
        if (!ball.bShoot && Math.sqrt(Math.pow(this.leftHitAreaX - ball.x, 2) + Math.pow(this.leftHitAreaY - ball.y, 2)) <= this.ballRadius) {
            var angle = Math.atan2(ball.y - this.leftHitAreaY, ball.x - this.leftHitAreaX);
            ball.speedX = -angle * 10; //反弹后，x轴速度变化
            ball.speedX = (ball.x > this.leftHitAreaX) ? Math.abs(ball.speedX) : -Math.abs(ball.speedX);
            ball.speedY = (ball.y > this.leftHitAreaY) ? Math.abs(ball.speedY) : -Math.abs(ball.speedY);
            egret.log("hit left frame");
        }
        else if (!ball.bShoot && Math.sqrt(Math.pow(this.rightHitAreaX - ball.x, 2) + Math.pow(this.rightHitAreaY - ball.y, 2)) <= this.ballRadius) {
            var angle = Math.atan2(ball.y - this.rightHitAreaY, ball.x - this.rightHitAreaX);
            ball.speedX = -(angle + 1.57) * 10; //反弹后，x轴速度变化
            ball.speedX = (ball.x > this.rightHitAreaX) ? Math.abs(ball.speedX) : -Math.abs(ball.speedX);
            ball.speedY = (ball.y > this.rightHitAreaY) ? Math.abs(ball.speedY) : -Math.abs(ball.speedY);
            egret.log("hit right frame");
        }
    };
    //其他检测
    p.checkOther = function (ball, index) {
        //深度排序
        if (ball.bShoot && ball.y > (this.wangY + this.ballWang.height)) {
            this.ballFrontGroup.addChild(ball);
        }
        //影子
        ball.shadow.x = ball.x;
        ball.shadow.y = this.stageHeight - this.yRate * ball.z + ball.shadow.height; //影子在z轴时，y坐标视觉修正
        ball.shadow.scaleX = -ball.realY / this.stageHeight + 0.5; //影子缩放
        ball.shadow.scaleY = -ball.realY / this.stageHeight + 0.5;
        //超出边界,移除篮球
        if (ball.y > this.stageHeight) {
            this.ballList.splice(index, 1);
            ball.recycle();
        }
    };
    //球网动画
    p.ballWangAnim = function () {
        this.ballWang.scaleY = 1;
        egret.Tween.removeTweens(this.ballWang);
        egret.Tween.get(this.ballWang).to({ scaleY: 0.1 }, 300).to({ scaleY: 1 }, 300);
    };
    //移动球框
    p.moveFrame = function () {
        var self = this;
        var dis = 50;
        egret.Tween.get(this.frameGroup).to({ x: -dis }, 1000).to({ x: dis }, 1000).call(function () {
            self.frameGroup.x = dis;
            egret.Tween.get(self.frameGroup, { loop: true }).to({ x: -dis }, 1000).to({ x: dis }, 1000);
        });
    };
    //停止移动球框
    p.stopMoveFrame = function () {
        //this.frameGroup.x = 0;
        egret.Tween.removeTweens(this.frameGroup);
    };
    //开始计时
    p.startGameTimer = function () {
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    p.onTimerHandler = function () {
        this.curTime--;
        if (this.curTime == Math.round(this.timeLimit / 2)) {
            this.moveFrame();
        }
        if (this.curTime >= 0) {
            this.setTimeLabel(this.curTime);
        }
        else {
            egret.log("time over");
            this.gameOver();
        }
    };
    //停止计时
    p.stopGameTimer = function () {
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.gameTimer.stop();
    };
    //设置时间文本
    p.setTimeLabel = function (time) {
        this.timeLabel.text = "00:" + StringTool.getTimeString(time);
    };
    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    //接收房间号是否正确
    p.revShoot = function (data) {
        var angle = data.angle; //发射角度
        angle = 225 * Math.PI / 180;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shoot, this);
    };
    p.shoot = function () {
        console.log("shoot");
        var ball = this.ballPool.getObject();
        ball.x = this.stageWidth / 2;
        ball.y = this.stageHeight;
        ball.z = 0;
        ball.speedX = 0; //角度获取x移动方向
        ball.speedZ = 40;
        ball.speedY = -20;
        ball.gotoAndPlay("label0");
        this.ballList.push(ball);
        ball.shadow.x = ball.x;
        ball.shadow.y = this.stageHeight - this.yRate * ball.z + ball.shadow.height;
        this.ballBackGroup.addChild(ball.shadow);
        this.ballFrontGroup.addChild(ball);
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
