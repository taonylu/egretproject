/**
 *
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.player = new Player(); //玩家
        this.goldPool = ObjectPool.getPool(Gold.NAME, 10); //金币对象池
        this.boomPool = ObjectPool.getPool(Boom.NAME, 3); //炸弹对象池
        this.itemList = []; //下落物品列表
        this.gameTimer = new egret.Timer(1000); //计时器
        this.refreshTime = 20; //刷新物品计时
        this.dropSpeed = 5; //物品下落时间
        this.boomRate = 0.2; //炸弹概率
        this.itemCount = 0; //创建物品计时
        this.initConfig();
        this.initView();
    }
    var d = __define,c=GameScene;p=c.prototype;
    p.initConfig = function () {
        var json = RES.getRes("config_json");
        GameConst.scoreList = json.scoreList;
        GameConst.discountList = json.discountList;
        GameConst.scoreMax = (json.scoreList[json.scoreList.length - 1]);
        GameConst.timeLimit = json.timeLimit;
        GameConst.playerSpeed = json.playerSpeed;
        this.boomRate = json.boomRate / 100;
        this.dropSpeed = json.dropSpeed;
        this.refreshTime = Math.floor(json.refreshTime / 1000 * 60);
    };
    p.initView = function () {
        this.mStage = GameConst.stage;
        this.gameBg = new egret.Bitmap(RES.getRes("gamebg_jpg"));
        this.addChild(this.gameBg);
        this.scoreBarUI = new ScoreBarUI();
        this.scoreBarUI.x = (this.mStage.stageWidth - this.scoreBarUI.scoreBg.width) / 2;
        this.scoreBarUI.y = this.mStage.stageHeight / 10;
        this.addChild(this.scoreBarUI);
        this.timerUI = new TimerUI();
        this.timerUI.x = (this.mStage.stageWidth - this.timerUI.width) / 2;
        this.timerUI.y = this.mStage.stageHeight / 50;
        this.addChild(this.timerUI);
        this.lifeUI = new LifeUI();
        this.lifeUI.x = 10;
        this.lifeUI.y = this.timerUI.y;
        this.addChild(this.lifeUI);
        this.resultPanel = new ResultPanel();
        this.startBtn = new egret.Bitmap(RES.getRes("start_png"));
        this.startBtn.x = (this.mStage.stageWidth - this.startBtn.width) / 2;
        this.startBtn.y = (this.mStage.stageHeight - this.startBtn.height) / 2;
        this.startBtn.touchEnabled = true;
        this.addChild(this.startBtn);
        this.player.anchorOffsetX = this.player.width / 2;
        this.player.x = this.mStage.stageWidth / 2;
        this.player.y = this.mStage.stageHeight - this.player.height;
        this.player.speed = GameConst.playerSpeed;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
    };
    p.startGame = function () {
        this.startBtn.parent && this.removeChild(this.startBtn);
        this.startTimer();
        this.resetGame();
        this.mStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.resetGame = function () {
        //重置角色
        this.player.x = this.mStage.stageWidth / 2;
        this.player.y = this.mStage.stageHeight - this.player.height;
        this.addChild(this.player);
        //重置变量
        this.score = 0;
        this.timeLimit = GameConst.timeLimit;
        this.life = 3;
        this.targetX = this.player.x;
        //重置UI
        this.scoreBarUI.setScore(0);
        this.scoreBarUI.curDiscount = 0;
        this.timerUI.setTimeText(0);
        this.lifeUI.setLife(this.life);
    };
    p.gameOver = function () {
        this.mStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stopTimer();
        this.showResult();
    };
    p.onTouchMove = function (e) {
        this.targetX = e.stageX;
    };
    p.onEnterFrame = function () {
        this.movePlayer();
        this.createItem();
        this.moveItem();
    };
    p.movePlayer = function () {
        if (Math.abs(this.targetX - this.player.x) < this.player.speed) {
            this.player.x = this.targetX;
        }
        else if (this.targetX > this.player.x) {
            this.player.x += this.player.speed;
        }
        else {
            this.player.x -= this.player.speed;
        }
    };
    p.moveItem = function () {
        var len = this.itemList.length;
        for (var i = len - 1; i >= 0; i--) {
            var item = this.itemList[i];
            item.y += this.dropSpeed;
            //碰撞检测
            var left = item.x - this.player.width / 2 + 20;
            var right = item.x + item.width + this.player.width / 2 - 20;
            var top = item.y + item.height - 20;
            var buttom = item.y - this.player.height + 10;
            if ((this.player.x > left && this.player.x < right) && (this.player.y > buttom && this.player.y < top)) {
                this.removeItem(item);
                this.itemList.splice(i, 1);
                if (item instanceof Gold) {
                    this.score += GameConst.goldScore;
                    this.scoreBarUI.setScore(this.score);
                }
                else {
                    this.life -= 1;
                    this.lifeUI.setLife(this.life);
                    if (this.life <= 0) {
                        this.gameOver();
                        return;
                    }
                }
                continue;
            }
            //边界检测
            if (item.y >= this.mStage.stageHeight) {
                this.removeItem(item);
                this.itemList.splice(i, 1);
            }
        }
    };
    p.removeItem = function (item) {
        if (item instanceof Gold) {
            this.goldPool.returnObject(item);
        }
        else {
            this.boomPool.returnObject(item);
        }
        this.removeChild(item);
    };
    p.createItem = function () {
        this.itemCount++;
        if (this.itemCount > this.refreshTime) {
            this.itemCount = 0;
            var rand = Math.random();
            var item;
            if (rand > this.boomRate) {
                item = this.goldPool.getObject();
            }
            else {
                item = this.boomPool.getObject();
            }
            item.x = Math.random() * (this.mStage.stageWidth - item.width);
            item.y = -item.height;
            this.addChild(item);
            this.itemList.push(item);
        }
    };
    p.startTimer = function () {
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    p.onTimerHandler = function () {
        this.timeLimit--;
        this.timerUI.setTimeText(this.timeLimit);
        if (this.timeLimit <= 0) {
            this.gameOver();
        }
    };
    p.stopTimer = function () {
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.gameTimer.stop();
    };
    p.showResult = function () {
        this.resultPanel.show();
        var curZhe = this.scoreBarUI.curDiscount;
        //拼显示内容
        var msg = "";
        if (curZhe <= 0) {
            msg += "很遗憾，未获得折扣";
        }
        else {
            msg += "获得:" + curZhe + "折";
            msg += "\n￥1000" + "   -￥" + Math.round(1000 * (1 - curZhe / 10));
        }
        msg += "\n获得天天币:" + 100;
        this.resultPanel.setText(msg);
    };
    return GameScene;
})(egret.DisplayObjectContainer);
egret.registerClass(GameScene,"GameScene");
