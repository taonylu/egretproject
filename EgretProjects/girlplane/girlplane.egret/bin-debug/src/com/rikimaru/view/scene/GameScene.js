/**
*  文 件 名：GameScene.ts
*  功    能： 游戏场景
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/23
*  修改日期：2015/8/23
*  修改日志：
*/
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        /**地图移动速度*/
        this.mapSpeed = 1;
        /**地图高宽*/
        this.mapWidth = 640;
        this.mapHeight = 1200;
        //主角移动操作
        this.startPosX = 0; //触摸按下点
        this.startPosY = 0;
        this.heroX = 0; //触摸按下时hero位置
        this.heroY = 0;
        this.skinName = skins.scene.GameSceneSkin;
        GameScene.instance = this;
    }
    var __egretProto__ = GameScene.prototype;
    __egretProto__.childrenCreated = function () {
        //初始化游戏容器
        this.gameSprite = new egret.Sprite();
        this.gameGroup.addElement(new egret.gui.UIAsset(this.gameSprite));
        //初始化游戏背景
        this.mapA = new egret.Bitmap(RES.getRes("02_jpg"));
        this.mapB = new egret.Bitmap(RES.getRes("02_jpg"));
        this.mapA.cacheAsBitmap = true;
        this.mapB.cacheAsBitmap = true;
        //初始化主角
        this.hero = new Hero();
        //初始化游戏数组
        this.heroBulletList = [];
        this.enemyList = [];
        this.enemyBulletList = [];
        //激活游戏场景
        this.onEnable();
    };
    __egretProto__.onEnable = function () {
        //激活背景
        this.mapA.width = this.mapWidth;
        this.mapA.height = this.mapHeight;
        this.mapB.width = this.mapWidth;
        this.mapB.height = this.mapHeight;
        this.mapA.y = 0;
        this.mapB.y = -this.mapB.height;
        this.gameSprite.addChild(this.mapA);
        this.gameSprite.addChild(this.mapB);
        //激活主角
        this.hero.x = GameConfig.stageWidth / 2;
        this.hero.y = GameConfig.stageHeight - this.hero.height - 100;
        this.hero.reset();
        this.hero.onEnter();
        this.gameSprite.addChild(this.hero);
        //重置参数
        this.timeCount = 0;
        //激活监听
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    __egretProto__.onEnterFrame = function () {
        this.timeCount++;
        this.moveMap(); //地图移动
        this.createEnemy(); //创建敌机
        this.enemyAction(); //敌机行动
        this.planeShot(); //飞机射击
        this.moveBullet(); //子弹移动
    };
    __egretProto__.onRemove = function () {
        //移除监听
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        //移除英雄
        this.hero.onRemove();
        //移除英雄子弹
        var len;
        var bullet;
        var enemy;
        len = this.heroBulletList.length;
        for (var i = 0; i < len; i++) {
            bullet = this.heroBulletList[i];
            bullet.onRemove();
        }
        this.heroBulletList.length = 0;
        //移除敌机
        len = this.enemyList.length;
        for (var i = 0; i < len; i++) {
            enemy = this.enemyList[i];
            enemy.onRemove();
        }
        this.enemyList.length = 0;
        //移除敌机子弹
        len = this.enemyBulletList.length;
        for (var i = 0; i < len; i++) {
            bullet = this.enemyBulletList[i];
            bullet.onRemove();
        }
        this.enemyBulletList.length = 0;
        //移除地图
        this.gameSprite.removeChild(this.mapA);
        this.gameSprite.removeChild(this.mapB);
    };
    /**地图移动*/
    __egretProto__.moveMap = function () {
        this.mapA.y += this.mapSpeed;
        this.mapB.y += this.mapSpeed;
        if (this.mapA.y >= this.mapA.height) {
            this.mapA.y = -this.mapA.height;
        }
        else if (this.mapB.y >= this.mapHeight) {
            this.mapB.y = -this.mapB.height;
        }
    };
    /**创建敌机*/
    __egretProto__.createEnemy = function () {
        var factory = EnemyFactory.getInstance();
        if (this.timeCount % 50 == 0) {
            factory.create(EnemyA.NAME);
        }
        else if (this.timeCount > 500) {
            if (this.timeCount % 120 == 0) {
                factory.create(EnemyB.NAME);
            }
        }
    };
    /**敌机行动*/
    __egretProto__.enemyAction = function () {
        var len;
        var enemy;
        var bullet;
        len = this.enemyList.length;
        for (var i = len - 1; i >= 0; i--) {
            enemy = this.enemyList[i];
            //敌机射击
            if (enemy.onShot()) {
                bullet = ObjectPool.getPool(enemy.bulletType).getObject();
                bullet.reset();
                bullet.x = enemy.x;
                bullet.y = enemy.y;
                this.gameSprite.addChild(bullet);
                this.enemyBulletList.push(bullet);
            }
            //敌机移动
            if (enemy.bLive) {
                enemy.onMove();
            }
            else {
                enemy.onRemove();
                this.enemyList.splice(i, 1);
            }
            //敌机碰撞玩家子弹
            var heroLen = this.heroBulletList.length;
            var heroBullet;
            for (var j = heroLen - 1; j >= 0; j--) {
                heroBullet = this.heroBulletList[j];
                if (enemy.bLive && enemy.hitTestPoint(heroBullet.x, heroBullet.y, false)) {
                    if (enemy.beAttacked(heroBullet.power)) {
                        enemy.onRemove();
                        this.enemyList.splice(i, 1);
                        var boom = ObjectPool.getPool(Boom.NAME).getObject();
                        boom.x = enemy.x;
                        boom.y = enemy.y;
                        this.gameSprite.addChild(boom);
                        boom.gotoAndPlay(0);
                    }
                    heroBullet.bLive = false;
                }
            }
        }
    };
    /**飞机射击*/
    __egretProto__.planeShot = function () {
        //玩家射击
        if (this.hero.onShot()) {
            var bullet = ObjectPool.getPool(this.hero.bulletType).getObject();
            bullet.reset();
            bullet.x = this.hero.x;
            bullet.y = this.hero.y - 50;
            this.heroBulletList.push(bullet);
            this.gameSprite.addChild(bullet);
        }
    };
    /**移动子弹*/
    __egretProto__.moveBullet = function () {
        var len;
        var bullet;
        var self = this;
        //玩家子弹
        len = self.heroBulletList.length;
        for (var i = len - 1; i >= 0; i--) {
            bullet = self.heroBulletList[i];
            if (bullet.bLive) {
                bullet.onMove();
            }
            else {
                bullet.parent && self.gameSprite.removeChild(bullet);
                self.heroBulletList.splice(i, 1);
                ObjectPool.getPool(bullet.bulletType).returnObject(bullet);
            }
        }
        //敌机子弹
        len = self.enemyBulletList.length;
        for (var i = len - 1; i >= 0; i--) {
            bullet = self.enemyBulletList[i];
            //子弹移动
            if (bullet.bLive) {
                bullet.onMove();
            }
            else {
                bullet.parent && self.gameSprite.removeChild(bullet);
                self.enemyBulletList.splice(i, 1);
                ObjectPool.getPool(bullet.bulletType).returnObject(bullet);
            }
            //子弹碰撞玩家
            if (this.hero.bLive && this.hero.hitArea.hitTestPoint(bullet.x, bullet.y, false)) {
                if (this.hero.beAttacked(bullet.power)) {
                    this.hero.bLive = false;
                    this.gameSprite.removeChild(this.hero);
                    var boom = ObjectPool.getPool(Boom.NAME).getObject();
                    boom.x = this.hero.x;
                    boom.y = this.hero.y;
                    this.gameSprite.addChild(boom);
                    boom.gotoAndPlay(0);
                    this.showLosePanel();
                }
                bullet.bLive = false;
            }
        }
    };
    __egretProto__.onTouchBegin = function (e) {
        this.startPosX = e.stageX;
        this.startPosY = e.stageY;
        this.heroX = this.hero.x;
        this.heroY = this.hero.y;
    };
    __egretProto__.onTouchMove = function (e) {
        if (this.hero.bLive) {
            this.hero.x = e.stageX - this.startPosX + this.heroX;
            this.hero.y = e.stageY - this.startPosY + this.heroY;
        }
    };
    __egretProto__.showLosePanel = function () {
        if (this.losePanel == null) {
            this.losePanel = new LosePanel();
        }
        this.gameGroup.addElement(this.losePanel);
        this.losePanel.startTimer();
    };
    return GameScene;
})(BaseScene);
GameScene.prototype.__class__ = "GameScene";
