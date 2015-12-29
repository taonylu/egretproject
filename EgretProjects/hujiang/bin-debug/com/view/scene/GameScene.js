/**
 *
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "resource/myskin/scene/GameSceneSkin.exml");
        this.gameTimeLimit = 20;
        this.score = 0;
        this.time = 0;
        this.gameTimer = new egret.Timer(1000);
        this.dropTimer = new egret.Timer(300);
        this.dropSpeed = 5;
        this.playerSpeed = 7;
        this.pillPool = ObjectPool.getPool(Pill.NAME, 10);
        this.pill5Pool = ObjectPool.getPool(Pill5.NAME, 1);
        this.pill10Pool = ObjectPool.getPool(Pill10.NAME, 1);
        this.poisonPool = ObjectPool.getPool(PoisonPill.NAME, 1);
        this.pillList = [];
        this.player = new Player();
    }
    var d = __define,c=GameScene;p=c.prototype;
    p.onEnable = function () {
        //设置主角
        this.player.x = this.stage.stageWidth / 2;
        this.player.y = this.stage.stageHeight - this.player.height;
        this.addChild(this.player);
        //设置界面
        this.setScoreLabel(0);
        this.setTimeLabel(this.gameTimeLimit);
        //设置参数
        this.targetX = this.player.x;
        //设置计时器
        this.startGameTimer();
        this.startDropTimer();
        //设置监听
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    p.onRemove = function () {
    };
    //每帧执行
    p.onEnterFrame = function () {
        this.movePlayer();
        this.moveItem();
    };
    p.gameOver = function () {
        console.log("game over");
        //移除监听
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        //停止计时器
        this.stopGameTimer();
        this.stopDropTimer();
        //清理药片
        var len = this.pillList.length;
        var pill;
        for (var i = 0; i < len; i++) {
            pill = this.pillList[i];
            pill.recycle();
            this.removeChild(pill);
        }
        this.pillList.length = 0;
        if (this.time >= 0) {
            LayerManager.getInstance().runScene(GameManager.getInstance().loseScene);
        }
        else {
            LayerManager.getInstance().runScene(GameManager.getInstance().winScene);
        }
    };
    //移动物品
    p.moveItem = function () {
        var len = this.pillList.length;
        var pill;
        for (var i = len - 1; i >= 0; i--) {
            pill = this.pillList[i];
            pill.y += this.dropSpeed;
            //药片移动
            if (pill.y >= GameConst.stage.stageHeight) {
                this.pillList.splice(i, 1);
                pill.recycle();
                this.removeChild(pill);
            }
            else if (this.hitTest(this.player, pill)) {
                this.pillList.splice(i, 1);
                pill.recycle();
                this.removeChild(pill);
                this.player.eat();
                if (pill instanceof PoisonPill) {
                    this.gameOver();
                    return;
                }
                else {
                    this.score += pill.score;
                    this.setScoreLabel(this.score);
                }
            }
        }
    };
    //移动玩家
    p.movePlayer = function () {
        if (Math.abs(this.targetX - this.player.x) < this.playerSpeed) {
            this.player.x = this.targetX;
        }
        else if (this.targetX > this.player.x) {
            this.player.x += this.playerSpeed;
        }
        else {
            this.player.x -= this.playerSpeed;
        }
    };
    p.onTouchMove = function (e) {
        this.targetX = e.stageX - this.player.width / 2;
    };
    p.hitTest = function (player, pill) {
        var rect1 = player.getBounds();
        var rect2 = pill.getBounds();
        rect1.width -= 30; //将player的碰撞rect缩小30
        rect1.height -= 30;
        rect1.x = player.x + 30;
        rect1.y = player.y + 30;
        rect2.x = pill.x;
        rect2.y = pill.y;
        return rect1.intersects(rect2);
    };
    p.setScoreLabel = function (score) {
        this.score = score;
        this.scoreLabel.text = this.score.toString();
    };
    p.setTimeLabel = function (_time) {
        this.time = _time;
        this.timeLabel.text = this.time.toString();
    };
    p.startGameTimer = function () {
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    p.onGameTimerHandler = function () {
        this.time--;
        if (this.time < 0) {
            this.gameOver();
            return;
        }
        else {
            this.setTimeLabel(this.time);
        }
    };
    p.stopGameTimer = function () {
        this.gameTimer.stop();
    };
    p.startDropTimer = function () {
        this.dropTimer.addEventListener(egret.TimerEvent.TIMER, this.onDropTimerHandler, this);
        this.dropTimer.reset();
        this.dropTimer.start();
    };
    p.onDropTimerHandler = function () {
        var rand = Math.floor(Math.random() * 100); //概率100
        var pill;
        if (rand < 80) {
            pill = this.pillPool.getObject();
        }
        else if (rand < 85) {
            pill = this.pill5Pool.getObject();
        }
        else if (rand < 90) {
            pill = this.pill10Pool.getObject();
        }
        else {
            pill = this.poisonPool.getObject();
        }
        pill.x = 10 + (Math.random() * (GameConst.stage.stageWidth - 80)); //防止药片超出场景
        pill.y = -pill.height;
        this.addChild(pill);
        this.pillList.push(pill);
    };
    p.stopDropTimer = function () {
        this.dropTimer.stop();
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,"GameScene");
