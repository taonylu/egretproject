/**
 * 游戏场景
 * @author 羊力大仙
 * @date 2015.10.27
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.bird = new BirdMC();
        this.introduceUI = new IntorduceUI();
        this.gameOverUI = new GameOverUI();
        this.guanupPool = ObjectPool.getPool(GuanUpUI.NAME);
        this.guandownPool = ObjectPool.getPool(GuanDownUI.NAME);
        this.guanList = [];
        this.screenMoveSpeed = -3;
        this.score = 0;
        this.gravity = 0.5; //重力
        this.createTime = 80; //创建水管间隔
        this.craeteCount = 0; //创建水管间隔计数
        this.minDis = 70; //两水管之间最小距离
        this.maxDis = 150; //两水管之间最大距离
        this.upMin = 120; //朝上水管露出最低的长度
        this.birdRect = new egret.Rectangle();
        this.guanRect = new egret.Rectangle();
        this.skinName = "resource/myskins/scene/GameSceneSkin.exml";
        this.stageWidth = LayerManager.getInstance().stage.stageWidth;
        this.stageHeight = LayerManager.getInstance().stage.stageHeight;
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.onEnable = function () {
        LayerManager.getInstance().popLayer.addChild(this.scoreLabel);
        this.addBird();
        this.addIntroduceUI();
        this.setScoreLable(0);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.onRemove = function () {
        this.addChild(this.scoreLabel);
        this.bird.stop();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.addBird = function () {
        this.bird.x = this.bird.width;
        this.bird.y = LayerManager.getInstance().stage.stageHeight / 2;
        this.addChild(this.bird);
        this.bird.play(-1);
    };
    p.addIntroduceUI = function () {
        this.addChild(this.introduceUI);
    };
    p.startGame = function () {
        this.removeChild(this.introduceUI);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.resetGame = function () {
        var len = this.guanList.length;
        var guan;
        for (var i = 0; i < len; i++) {
            guan = this.guanList[i];
            guan.reset();
            guan.parent && guan.parent.removeChild(guan);
        }
        this.guanList.length = 0;
        this.onEnable();
    };
    p.onTouchTap = function () {
        this.bird.fly();
    };
    p.onEnterFrame = function () {
        this.moveBird();
        this.createGuan();
        this.moveGuan();
    };
    p.createGuan = function () {
        this.craeteCount++;
        if (this.craeteCount % this.createTime == 0) {
            var up = this.guanupPool.getObject();
            var down = this.guandownPool.getObject();
            up.x = this.stageWidth + up.width;
            up.y = (this.stageHeight - up.height) + Math.random() * (up.height - this.upMin);
            down.x = up.x;
            down.y = up.y - down.height - NumberTool.getRandomInt(this.minDis, this.maxDis);
            this.addChild(up);
            this.addChild(down);
            this.guanList.push(up, down);
        }
    };
    p.moveBird = function () {
        this.bird.speedY += this.gravity;
        this.bird.y += this.bird.speedY;
        this.bird.rotation = this.bird.speedY * 3;
        if (this.bird.y <= 0 || this.bird.y >= this.stageHeight) {
            this.gameOver();
        }
    };
    p.moveGuan = function () {
        var len = this.guanList.length;
        var guan;
        for (var i = len - 1; i >= 0; i--) {
            //移动
            guan = this.guanList[i];
            guan.x += this.screenMoveSpeed;
            //算分
            if (i % 2 == 0 && guan.isChecked == false && guan.x < this.bird.x) {
                this.setScoreLable(++this.score);
                guan.isChecked = true;
            }
            //边界检测
            if (guan.x <= -guan.width) {
                guan.reset();
                this.guanList.splice(i, 1);
                if (guan instanceof GuanUpUI) {
                    this.guanupPool.returnObject(guan);
                }
                else {
                    this.guandownPool.returnObject(guan);
                }
            }
            //碰撞检测
            if (this.hitTest(this.bird, guan, this.bird.hitRect, guan.getBounds())) {
                this.gameOver();
            }
        }
    };
    p.hitTest = function (obj1, obj2, rect1, rect2) {
        rect1.x = obj1.x - 10;
        rect1.y = obj1.y - 10;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    p.setScoreLable = function (score) {
        this.score = score;
        this.scoreLabel.text = "score:" + this.score;
    };
    p.gameOver = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.bird.stop();
        this.gameOverUI.show(this);
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
