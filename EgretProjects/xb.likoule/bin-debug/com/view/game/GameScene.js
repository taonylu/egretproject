/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.bee = new Bee(); //蜜蜂
        this.grass = 0; //获取香草数
        this.timeLimit = 2; //时间限制
        this.gameTimer = new DateTimer(1000); //游戏计时器
        this.itemList = new Array(); //item数组
        this.item2Pool = ObjectPool.getPool(Item2.NAME, 5); //item2对象池
        this.item5Pool = ObjectPool.getPool(Item5.NAME, 5); //item5对象池
        this.score2Pool = ObjectPool.getPool(Score2.NAME, 5); //score2对象池
        this.score5Pool = ObjectPool.getPool(Score5.NAME, 5); //score5对象池
        this.score20Pool = ObjectPool.getPool(Score20.NAME, 3); //score20对象池
        this.ballPool = ObjectPool.getPool(Ball.NAME, 3); //20分球
        this.itemCount = 0;
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
    };
    p.onEnable = function () {
        this.startGame();
    };
    p.onRemove = function () {
        this.bee.stop();
    };
    p.configListeners = function () {
        this.controlBtn.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onControlTouch, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.deConfigListeners = function () {
        this.controlBtn.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onControlTouch, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.onEnterFrame = function () {
        this.createItem(); //创建Item
        this.moveBee(); //移动蜜蜂
        this.gameBg.render(); //移动地图
        this.moveItem(); //移动Item
    };
    //开始游戏
    p.startGame = function () {
        this.reset();
        this.startGameTimer();
        this.configListeners();
    };
    //重置游戏
    p.reset = function () {
        //重置时间和分数
        this.score = 0;
        this.scoreLabel.text = this.score + "";
        this.curTime = this.timeLimit;
        this.timeLabel.text = this.curTime + "s";
        this.grass = 0;
        //重置蜜蜂
        this.bee.play(-1);
        this.bee.x = this.controlBtn.x + this.controlBtn.width;
        this.bee.y = (this.stageHeight - this.bee.height) / 2;
        //this.bee.x = 0;
        // this.bee.y = 0;
        this.addChild(this.bee);
        //重置游戏背景
        this.gameBg.reset();
        //重置获球
        var len = this.itemList.length;
        for (var i = 0; i < len; i++) {
            var item = this.itemList[i];
            item.recycle();
        }
        this.itemList.length = 0;
        //重置其他参数
        this.curFingerPos = this.bee.y;
    };
    //游戏结束
    p.gameOver = function () {
        this.deConfigListeners();
        this.stopGameTimer();
        var resultScene = GameManager.getInstance().resultScene;
        LayerManager.getInstance().runScene(resultScene);
        resultScene.setSceneValue(0, this.score, this.grass);
    };
    p.onControlTouch = function (e) {
        this.curFingerPos = e.stageY;
        if (this.bee.y > e.stageY) {
            this.bee.direction = -1;
        }
        else {
            this.bee.direction = 1;
        }
    };
    p.moveBee = function () {
        if (Math.abs(this.bee.y - this.curFingerPos) > this.bee.speedY) {
            this.bee.y += this.bee.direction * this.bee.speedY;
        }
    };
    p.moveItem = function () {
        var len = this.itemList.length;
        var item;
        for (var i = len - 1; i >= 0; i--) {
            item = this.itemList[i];
            item.x -= this.bee.speedX;
            //边缘检测
            if (item.x <= -item.width) {
                item.recycle();
                this.itemList.splice(i, 1);
            }
            else {
                if (Math.abs(item.y + 25 - this.bee.y) < 50 && Math.abs(item.x - this.bee.x) < 50) {
                    this.createScoreText(item);
                    item.recycle();
                    this.itemList.splice(i, 1);
                    this.score += item.score;
                    this.scoreLabel.text = this.score + "";
                    this.grass++;
                }
            }
        }
    };
    p.createItem = function () {
        this.itemCount++;
        if (this.itemCount > 10) {
            this.itemCount = 0;
            var rand = Math.random();
            var item;
            if (rand > 0.5) {
                item = ObjectPool.getPool(Item2.NAME).getObject();
            }
            else if (rand > 0.1) {
                item = ObjectPool.getPool(Item5.NAME).getObject();
            }
            else {
                //临时增加MC
                item = ObjectPool.getPool(Ball.NAME).getObject();
                item.play(1000);
            }
            this.itemList.push(item);
            item.x = this.stageWidth + item.width;
            item.y = 50 + (this.stageHeight - 100) * Math.random();
            this.addChild(item);
        }
    };
    p.createScoreText = function (target) {
        var scoreItem;
        var score = target.score;
        if (score == 2) {
            scoreItem = ObjectPool.getPool(Score2.NAME).getObject();
        }
        else if (score == 5) {
            scoreItem = ObjectPool.getPool(Score5.NAME).getObject();
        }
        else {
            scoreItem = ObjectPool.getPool(Score20.NAME).getObject();
        }
        scoreItem.x = target.x;
        scoreItem.y = target.y;
        this.addChild(scoreItem);
        var self = this;
        egret.Tween.get(scoreItem).wait(300).call(function () {
            scoreItem.recycle();
        }, this);
    };
    p.startGameTimer = function () {
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    p.onGameTimerHandler = function (e) {
        this.curTime--;
        this.timeLabel.text = this.curTime + "s";
        if (this.curTime <= 0) {
            this.gameOver();
        }
    };
    p.stopGameTimer = function () {
        this.gameTimer.stop();
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
    };
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
