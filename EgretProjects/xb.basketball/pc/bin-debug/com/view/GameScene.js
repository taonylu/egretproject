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
        this.ballRadius = 110; //球半径
        this.gravity = 0.5; //重力
        this.gameTimer = new egret.Timer(1000); //游戏计时器
        this.timeLimit = 30; //游戏计时
        this.curTime = 0; //当前计时
        //z=0时，球道宽540，球道y=0
        //z=1000时，球道宽220，球道y=340
        //当前球所在位置z的球道宽度 220 + z*(540-220)/1000
        //球在z时，x速度= (1 - (z*(540-220)/1000)/540)*speedX
        //球在z时，y速度 = 同上
        //球在z时，z速度导致的y变化，600 - 340/1000*z
        //球在z时，球大小比例，1- (1-0.7)*z 
        this.floorLength = 2000; //球道长宽，虚拟长度
        this.floorMaxWidth = 950; //球道z=0，y=0时，宽度
        this.floorMinWidth = 475; //球道z=1000时宽度
        this.floorHeight = 565; //球道高度，视觉上Y高度
        //private xRate:number = (this.floorMaxWidth - this.floorMinWidth)/this.floorLength; //球x轴速率比例 0.32
        //private yRate:number = this.floorHeight/this.floorLength;                          //z速度导致的y变化比例 0.34
        this.xRate = 0.32;
        this.yRate = 0.34;
        this.ballScaleRate = (1 - 0.7) / this.floorLength; //球缩放比例
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
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.moveFrame();
    };
    p.onEnterFrame = function () {
        this.moveBall();
    };
    p.gameOver = function () {
        this.stopGameTimer();
        //TODO 显示游戏结果，返回二维码界面
    };
    p.resetGame = function () {
    };
    //移动篮球
    p.moveBall = function () {
        var len = this.ballList.length;
        var ball;
        var rate;
        for (var i = len - 1; i >= 0; i--) {
            ball = this.ballList[i];
            //重力
            ball.speedY += this.gravity;
            //x，y，z轴位移
            rate = (1 - (ball.z * this.xRate) / this.floorMaxWidth);
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
                ball.y = ball.realY + (this.stageHeight - this.yRate * ball.z);
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
            if (ball.bShoot == false && ((this.floorLength - ball.z) < this.ballRadius)) {
                //篮筐碰撞
                this.leftHitAreaX = this.leftHitArea.x + this.frameGroup.x;
                this.leftHitAreaY = this.leftHitArea.y + this.frameGroup.y;
                this.rightHitAreaX = this.rightHitArea.x + this.frameGroup.x;
                this.rightHitAreaY = this.rightHitArea.y + this.frameGroup.y;
                if ((Math.abs(this.leftHitAreaX - ball.x) <= this.ballRadius) &&
                    (Math.abs(this.leftHitAreaY - ball.y) <= this.ballRadius)) {
                    var angle = Math.atan2(ball.y - this.leftHitAreaY, ball.x - this.leftHitAreaX);
                    ball.speedX = -angle * 10;
                    ball.speedX = (ball.x > this.leftHitAreaX) ? Math.abs(ball.speedX) : -Math.abs(ball.speedX);
                    ball.speedY = (ball.y > this.leftHitAreaY) ? Math.abs(ball.speedY) : -Math.abs(ball.speedY);
                    console.log("hit left frame");
                }
                else if ((Math.abs(this.rightHitAreaX - ball.x) <= this.ballRadius) &&
                    (Math.abs(this.rightHitAreaY - ball.y) <= this.ballRadius)) {
                    var angle = Math.atan2(ball.y - this.rightHitAreaY, ball.x - this.rightHitAreaX);
                    ball.speedX = -(angle + 1.57) * 10;
                    ball.speedX = (ball.x > this.rightHitAreaX) ? Math.abs(ball.speedX) : -Math.abs(ball.speedX);
                    ball.speedY = (ball.y > this.rightHitAreaY) ? Math.abs(ball.speedY) : -Math.abs(ball.speedY);
                    console.log("hit right frame");
                }
                //判断进球
                this.wangX = this.ballWang.x + this.frameGroup.x;
                this.wangY = this.ballWang.y + this.frameGroup.y;
                if (Math.abs(ball.x - this.wangX) < 10 &&
                    (ball.y < (this.wangY - this.ballRadius)) //球y轴判断
                ) {
                    ball.bShoot = true;
                    ball.speedX = ball.speedX * 0.5; //下落时，将速度减慢，模拟球擦网摩擦力
                    ball.speedZ = -ball.speedZ * 0.2;
                    ball.speedY = ball.speedY * 0.5;
                    this.ballWangAnim();
                    //球进球时在球网后，下落后在球网前
                    ball.setIndex(this);
                    console.log("shoot success");
                }
            }
            //影子
            ball.shadow.x = ball.x;
            ball.shadow.y = this.stageHeight - this.yRate * ball.z + ball.shadow.height;
            ball.shadow.scaleX = -ball.realY / this.stageHeight + 0.5; //影子缩放
            ball.shadow.scaleY = -ball.realY / this.stageHeight + 0.5;
            //超出边界,移除篮球
            if (ball.y > this.stageHeight) {
                this.ballList.splice(i, 1);
                ball.recycle();
            }
        }
    };
    //球网动画
    p.ballWangAnim = function () {
        this.ballWang.scaleY = 1;
        egret.Tween.removeTweens(this.ballWang);
        egret.Tween.get(this.ballWang).to({ scaleY: 0.1 }, 250).to({ scaleY: 1 }, 250);
    };
    //移动球框
    p.moveFrame = function () {
        var self = this;
        var dis = 0;
        egret.Tween.get(this.frameGroup).to({ x: -dis }, 1000).to({ x: dis }, 1000).call(function () {
            self.frameGroup.x = dis;
            egret.Tween.get(self.frameGroup, { loop: true }).to({ x: -dis }, 1000).to({ x: dis }, 1000);
        });
    };
    //停止移动球框
    p.stopMoveFrame = function () {
        this.frameGroup.x = 0;
        egret.Tween.removeTweens(this.frameGroup);
    };
    //开始计时
    p.startGameTimer = function () {
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    p.onTimerHandler = function () {
        //TODO 计时
        this.curTime--;
        if (this.curTime < 0) {
            egret.log("time over");
            this.gameOver();
        }
    };
    //停止计时
    p.stopGameTimer = function () {
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.gameTimer.stop();
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
        ball.speedX = 0; //角度获取x移动方向
        ball.speedZ = 40;
        ball.speedY = -22;
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
