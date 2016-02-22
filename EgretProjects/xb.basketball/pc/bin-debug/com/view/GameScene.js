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
        //z=0时，球道宽540，球道y=0
        //z=1000时，球道宽220，球道y=340
        //当前球所在位置z的球道宽度 540-z*(540-220)/1000
        //球在z时，x速度= (1 - (z*(540-220)/1000)/540)*speedX
        //球在z时，y速度 = 同上
        //球在z时，z速度导致的y变化，600 - 340/1000*z
        //球在z时，球大小比例，1- (1-0.8)*z 
        this.floorHeight = 1000; //球道长宽
        this.floorWidth = 540;
        this.gravity = 1; //重力
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
    };
    p.onEnterFrame = function () {
        this.moveBall();
    };
    //移动篮球
    p.moveBall = function () {
        var len = this.ballList.length;
        var ball;
        var rate;
        for (var i = 0; i < len; i++) {
            ball = this.ballList[i];
            if (ball.z <= 500) {
                //重力
                //ball.speedY += this.gravity;
                //x，y，z轴位移
                rate = (1 - (ball.z * 0.32) / 540);
                ball.z += ball.speedZ;
                ball.x += ball.speedX * rate;
                ball.y += ball.speedY * rate - rate * ball.speedZ;
                //比例
                ball.scaleX = 1 - 0.0003 * ball.z;
                ball.scaleY = ball.scaleX;
            }
        }
    };
    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    //接收房间号是否正确
    p.revShoot = function (data) {
        var angle = data.angle; //发射角度
        angle = 225 * Math.PI / 180;
        var ball = this.ballPool.getObject();
        this.ballGroup.addChild(ball);
        ball.x = this.stageWidth / 2;
        ball.y = this.stageHeight;
        ball.speedX = 1; //角度获取x移动方向
        ball.speedZ = 1;
        ball.speedY = 0;
        ball.play();
        this.ballList.push(ball);
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
