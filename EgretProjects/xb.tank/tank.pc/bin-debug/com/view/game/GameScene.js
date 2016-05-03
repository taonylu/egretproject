/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.snd = SoundManager.getInstance(); //声音播放
        this.enemyNumIconList = new Array(); //敌人图标数组
        this.initGameOverPos = new egret.Point(); //GameOver图标初始位置
        this.campRoundList = [[12, 5], [11, 5], [11, 6], [11, 7], [12, 7]]; //基地周围的坐标，用于手动设置基地周围砖块为一半
        this.playerTankList = new Array(); //我方坦克
        this.enemyTankList = new Array(); //敌方坦克
        this.bulletList = new Array(); //子弹
        this.itemList = new Array(); //道具
        this.generateTimer = new egret.Timer(2000); //生成坦克计时器
        this.armorTimer = new egret.Timer(1000); //基地护甲计时
        this.pauseTimer = new egret.Timer(1000); //暂停计时
        this.bPlayerPause = false; //暂定道具标志
        this.bEnemyPause = false;
        this.gameStatus = GameStatus.waiting; //游戏状态
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
        MapManager.getInstance().curLevel = 1;
        this.nextLevel(); //下一关
    };
    p.onRemove = function () {
    };
    p.nextLevel = function () {
        this.gameStatus = GameStatus.waiting;
        this.resetGame();
        this.startGame();
        this.gameStatus = GameStatus.gameing;
    };
    p.startGame = function () {
        this.snd.play(this.snd.start_stage);
        this.createMap(); //创建地图
        this.setEnemyNumIcon(); //设置敌方生命
        this.setPlayerIcon(); //设置玩家生命
        this.initPlayer(); //创建我方坦克
        this.configListeners(); //监听
        this.startGenerateTimer(); //生成坦克计时器
    };
    p.resetGame = function () {
        this.resetGameValue(); //重置游戏变量
        this.resetGameOverIcon(); //重置游戏结束图标
        this.clearEnemyNumIcon(); //清理敌方生命图标
        this.clearPlayerIcon(); //清理玩家生命
        this.clearEnemyTank(); //清理敌方坦克
        this.clearPlayerTank(); //清理我方坦克
        this.clearItem(); //清理道具
        this.clearTile(); //清理地形
    };
    p.gameOver = function () {
        console.log("game over");
        this.gameStatus = GameStatus.gameover;
        this.snd.play(this.snd.lose); //播放失败音效
        this.playGameOverAnim(); //播放游戏结束图标
        this.deConfigListeners(); //停止移动和碰撞检测
        this.stopGenerateTimer(); //停止生成坦克计时
        this.stopArmorTimer(); //停止基地护甲计时
    };
    p.gameWin = function () {
        console.log("game win");
        this.gameStatus = GameStatus.waiting;
        this.deConfigListeners(); //停止移动和碰撞检测
        this.stopGenerateTimer(); //停止生成坦克计时
        this.stopArmorTimer(); //停止基地护甲计时
        //进入下一关
        var map = MapManager.getInstance();
        map.curLevel += 1;
        if (map.curLevel <= map.levelLimit) {
            this.nextLevel();
        }
        else {
        }
    };
    p.configListeners = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.deConfigListeners = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    //每帧执行
    p.onEnterFrame = function () {
        this.movePlayerTank(); //移动自己坦克
        this.moveEnemyTank(); //移动敌方坦克
        this.moveBullet(); //移动子弹
    };
    //初始化界面
    p.initView = function () {
        //socket
        this.socket = ClientSocket.getInstance();
        //初始化地图数据
        var mapManager = MapManager.getInstance();
        this.rowMax = mapManager.rowMax;
        this.colMax = mapManager.colMax;
        this.tileWidth = mapManager.tileWidth;
        this.tileHeight = mapManager.tileHeight;
        this.halfWidth = mapManager.halfWidth;
        this.halfHeight = mapManager.halfHeight;
        this.mapWidth = this.colMax * this.tileWidth;
        this.mapHeight = this.rowMax * this.tileHeight;
        //初始化地形数组
        this.tileList = [];
        this.mapList = [];
        for (var i = 0; i < this.rowMax; i++) {
            this.tileList[i] = [];
            this.mapList[i] = [];
            for (var j = 0; j < this.colMax; j++) {
                this.tileList[i][j] = null;
                this.mapList[i][j] = 0;
            }
        }
        //初始化gameOver图片位置
        this.initGameOverPos.x = this.gameOverIcon.x;
        this.initGameOverPos.y = this.gameOverIcon.y;
    };
    //重置游戏变量
    p.resetGameValue = function () {
        this.bPlayerPause = false;
        this.bEnemyPause = false;
    };
    //创建地图
    p.createMap = function () {
        //获取地图数据
        var mapManager = MapManager.getInstance();
        var levelData = mapManager.levelList[mapManager.curLevel - 1];
        var mapData = levelData.mapData;
        this.mapList = ArrayTool.copy2DArr(mapData);
        //创建地图
        var gameFactory = GameFactory.getInstance();
        var tileType;
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                tileType = mapData[i][j];
                if (tileType != 0) {
                    var tile = gameFactory.getTile(tileType);
                    tile.x = j * this.tileWidth + this.halfWidth;
                    tile.y = i * this.tileHeight + this.halfHeight;
                    tile.row = i;
                    tile.col = j;
                    if (tileType == TileEnum.river) {
                        this.footTileGroup.addChild(tile);
                    }
                    else {
                        this.topTileGroup.addChild(tile);
                    }
                    this.tileList[i][j] = tile;
                }
            }
        }
        //设置基地周边的墙
        this.setCampWall();
    };
    //基地附近的砖块是只有一半的，因为地图编辑器没做一半的砖块,这里取基地固定位置，然后手动设置砖块为一半
    p.setCampWall = function () {
        var camp = this.tileList[12][6];
        var len = this.campRoundList.length;
        for (var i = 0; i < len; i++) {
            var p = this.campRoundList[i];
            //清理原有非砖块地形
            var tile = this.tileList[p[0]][p[1]];
            if (tile != null && tile.type != TileEnum.wall) {
                tile.recycle();
                //新建地形
                var wall = GameFactory.getInstance().getTile(TileEnum.wall);
                wall.x = p[1] * this.tileWidth + this.halfWidth;
                wall.y = p[0] * this.tileHeight + this.halfHeight;
                wall.row = p[0];
                wall.col = p[1];
                this.footTileGroup.addChild(wall);
                this.tileList[p[0]][p[1]] = wall;
                this.mapList[p[0]][p[1]] = TileEnum.wall;
            }
        }
        //设置地形为一半
        this.tileList[camp.row][camp.col - 1] && this.tileList[camp.row][camp.col - 1].setTileHalf(3);
        this.tileList[camp.row - 1][camp.col - 1] && this.tileList[camp.row - 1][camp.col - 1].setTileHalf(5);
        this.tileList[camp.row - 1][camp.col] && this.tileList[camp.row - 1][camp.col].setTileHalf(1);
        this.tileList[camp.row - 1][camp.col + 1] && this.tileList[camp.row - 1][camp.col + 1].setTileHalf(4);
        this.tileList[camp.row][camp.col + 1] && this.tileList[camp.row][camp.col + 1].setTileHalf(2);
    };
    //基地附近为钢铁
    p.setCampSteel = function () {
        var camp = this.tileList[12][6];
        var len = this.campRoundList.length;
        for (var i = 0; i < len; i++) {
            var p = this.campRoundList[i];
            //清理原有地形
            var tile = this.tileList[p[0]][p[1]];
            if (tile != null) {
                tile.recycle();
            }
            //新建地形
            var steel = GameFactory.getInstance().getTile(TileEnum.steel);
            steel.x = p[1] * this.tileWidth + this.halfWidth;
            steel.y = p[0] * this.tileHeight + this.halfHeight;
            steel.row = p[0];
            steel.col = p[1];
            this.footTileGroup.addChild(steel);
            this.tileList[p[0]][p[1]] = steel;
            this.mapList[p[0]][p[1]] = TileEnum.steel;
        }
        //设置地形为一半
        this.tileList[camp.row][camp.col - 1].setTileHalf(3);
        this.tileList[camp.row - 1][camp.col - 1].setTileHalf(5);
        this.tileList[camp.row - 1][camp.col].setTileHalf(1);
        this.tileList[camp.row - 1][camp.col + 1].setTileHalf(4);
        this.tileList[camp.row][camp.col + 1].setTileHalf(2);
    };
    //初始化玩家
    p.initPlayer = function () {
        var userNum = UserManager.getInstance().getUserNum();
        if (userNum >= 1) {
            this.createPlayer(1);
        }
        if (userNum == 2) {
            this.createPlayer(2);
        }
    };
    //创建玩家
    p.createPlayer = function (playerNo) {
        var userManager = UserManager.getInstance();
        var userNum = userManager.getUserNum();
        var mapManager = MapManager.getInstance();
        var levelData = mapManager.levelList[mapManager.curLevel - 1];
        var birthPos = levelData.friendBirthPos;
        var player = GameFactory.getInstance().getTank(TankEnum.player);
        player.y = birthPos[playerNo - 1][1] * this.tileWidth + this.tileWidth / 2;
        player.x = birthPos[playerNo - 1][0] * this.tileHeight + this.tileWidth / 2;
        player.openid = userManager.userList[playerNo - 1].openid;
        player.setPlayerNo(playerNo); //p1 p2
        this.tankGroup.addChild(player);
        this.playerTankList.push(player);
        player.playShield(player.birthShieldTime);
    };
    //设置敌人图标数量
    p.setEnemyNumIcon = function () {
        var levelData = MapManager.getInstance().getCurLevelData();
        var tankList = levelData.tankList;
        var enemyNum = tankList.length;
        var row = Math.ceil(enemyNum / 2); //一行2个，判断右几行
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < 2; j++) {
                if ((i * 2 + j) >= enemyNum) {
                    return;
                }
                var enemyIcon = new EnemyNumIcon();
                enemyIcon.x = enemyIcon.width * j + 3 * j; //3行列间隔
                enemyIcon.y = enemyIcon.height * i + 3 * i;
                this.enemyNumIconList.push(enemyIcon);
                this.enemyNumGroup.addChild(enemyIcon);
            }
        }
    };
    //清理敌人数量图标
    p.clearEnemyNumIcon = function () {
        var len = this.enemyNumIconList.length;
        for (var i = 0; i < len; i++) {
            var enemyIcon = this.enemyNumIconList[i];
            enemyIcon.parent && enemyIcon.parent.removeChild(enemyIcon);
        }
        this.enemyNumIconList.length = 0;
    };
    //减少一个敌人数量图标，返回敌人数量是否为0
    p.reduceEnemyNumIcon = function () {
        var len = this.enemyNumIconList.length;
        if (len > 0) {
            var enemyIcon = this.enemyNumIconList.pop();
            enemyIcon.parent && enemyIcon.parent.removeChild(enemyIcon);
        }
    };
    //设置玩家生命图标
    p.setPlayerIcon = function () {
        if (MapManager.getInstance().curLevel == 1) {
            var userNum = UserManager.getInstance().getUserNum();
            var playerLife = MapManager.getInstance().playerSet.life;
            if (userNum >= 1) {
                this.p1Label.visible = true;
                this.p1LifeLabel.visible = true;
                this.p1Icon.visible = true;
                this.p1LifeLabel.text = playerLife + "";
            }
            if (userNum == 2) {
                this.p2Label.visible = true;
                this.p2LifeLabel.visible = true;
                this.p2Icon.visible = true;
                this.p2LifeLabel.text = playerLife + "";
            }
        }
    };
    //减少玩家生命文本
    p.reducePlayerIcon = function (playerNo, reduceLife) {
        if (reduceLife === void 0) { reduceLife = 1; }
        if (playerNo == 1) {
            var life = parseInt(this.p1LifeLabel.text);
            this.p1LifeLabel.text = (life - reduceLife) + "";
        }
        else if (playerNo == 2) {
            var life = parseInt(this.p2LifeLabel.text);
            this.p2LifeLabel.text = (life - reduceLife) + "";
        }
    };
    //检查玩家是否全死
    p.checkPlayerAllDie = function () {
        var userNum = UserManager.getInstance().getUserNum();
        if (userNum == 1) {
            var life = parseInt(this.p1LifeLabel.text);
            if (life <= 0 && this.playerTankList.length == 0) {
                return true;
            }
        }
        else if (userNum == 2) {
            var life1 = parseInt(this.p1LifeLabel.text);
            var life2 = parseInt(this.p2LifeLabel.text);
            if (life1 <= 0 && life2 <= 0 && this.playerTankList.length == 0) {
                return true;
            }
        }
        return false;
    };
    //清理游戏玩家生命图标
    p.clearPlayerIcon = function () {
        if (MapManager.getInstance().curLevel == 1) {
            this.p1Label.visible = false;
            this.p2Label.visible = false;
            this.p1LifeLabel.visible = false;
            this.p2LifeLabel.visible = false;
            this.p1Icon.visible = false;
            this.p2Icon.visible = false;
            this.p1LifeLabel.text = "0";
            this.p2LifeLabel.text = "0";
        }
    };
    //检查地方坦克是否全部击毁
    p.checkEnemyAllDie = function () {
        //已生成坦克和剩余坦克都为0，则坦克全灭
        if (this.enemyTankList.length == 0 && this.enemyNumIconList.length == 0) {
            return true;
        }
        return false;
    };
    //重置游戏结束图标
    p.resetGameOverIcon = function () {
        this.gameOverIcon.x = this.initGameOverPos.x;
        this.gameOverIcon.y = this.initGameOverPos.y;
        this.gameOverIcon.visible = false;
    };
    //播放游戏结束图标动画
    p.playGameOverAnim = function () {
        this.gameOverIcon.visible = true;
        egret.Tween.get(this.gameOverIcon).to({ y: this.initGameOverPos.y - 400 }, 1000);
    };
    //清理敌方坦克
    p.clearEnemyTank = function () {
        var len = this.enemyTankList.length;
        for (var i = 0; i < len; i++) {
            var tank = this.enemyTankList[i];
            tank.recycle();
        }
        this.enemyTankList.length = 0;
    };
    //清理我方坦克
    p.clearPlayerTank = function () {
        var len = this.playerTankList.length;
        for (var i = 0; i < len; i++) {
            var tank = this.playerTankList[i];
            tank.recycle();
        }
        this.playerTankList.length = 0;
    };
    //清理道具
    p.clearItem = function () {
        var len = this.itemList.length;
        for (var i = 0; i < len; i++) {
            var item = this.itemList[i];
            item.recycle();
        }
        this.itemList.length = 0;
    };
    //清理地形
    p.clearTile = function () {
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                var tile = this.tileList[i][j];
                tile && tile.recycle();
                this.tileList[i][j] = null;
                this.mapList[i][j] = 0;
            }
        }
    };
    //清理子弹
    p.clearBullet = function () {
        var len = this.bulletList.length;
        for (var i = 0; i < len; i++) {
            var bullet = this.bulletList[i];
            bullet.recycle();
        }
        this.bulletList.length = 0;
    };
    //移动玩家坦克
    p.movePlayerTank = function () {
        if (this.bPlayerPause) {
            return;
        }
        var len = this.playerTankList.length;
        var player;
        var enemy;
        var otherPlayer;
        for (var i = 0; i < len; i++) {
            player = this.playerTankList[i];
            //射击
            player.updateShootCount();
            //我方坦克和敌方坦克碰撞检测
            var enemyLen = this.enemyTankList.length;
            for (var j = 0; j < enemyLen; j++) {
                enemy = this.enemyTankList[j];
                if (player.checkCollision(enemy) == false) {
                    if (player.checkNextCollision(enemy)) {
                        return;
                    }
                }
            }
            //我方坦克和我方坦克碰撞检测
            var playerLen = this.playerTankList.length;
            for (var j = 0; j < playerLen; j++) {
                otherPlayer = this.playerTankList[j];
                if (otherPlayer != player) {
                    if (player.checkCollision(enemy) == false) {
                        if (player.checkNextCollision(enemy)) {
                            return;
                        }
                    }
                }
            }
            //道具碰撞
            var itemLen = this.itemList.length;
            for (var j = itemLen - 1; j >= 0; j--) {
                var item = this.itemList[j];
                if (item.checkCollision(player)) {
                    if (this.checkItemEffect(item, player)) {
                        this.itemList.splice(j, 1);
                        item.recycle();
                    }
                }
            }
            //地形碰撞检测
            if (this.getCollioseTile(player).length == 0 && this.checkEdge(player) == false) {
                player.move();
            }
        }
    };
    //移动敌方坦克
    p.moveEnemyTank = function () {
        if (this.bEnemyPause) {
            return;
        }
        var len = this.enemyTankList.length;
        var enemy;
        var player;
        var otherEnemy;
        for (var i = 0; i < len; i++) {
            enemy = this.enemyTankList[i];
            //射击
            enemy.shoot();
            //我方坦克和敌方坦克
            var playerLen = this.playerTankList.length;
            for (var j = 0; j < playerLen; j++) {
                player = this.playerTankList[j];
                if (enemy.checkCollision(player) == false) {
                    if (enemy.checkNextCollision(player)) {
                        enemy.autoTurn();
                        enemy = null;
                        break;
                    }
                }
            }
            if (enemy == null) {
                continue;
            }
            //敌方坦克和敌方坦克
            var enemyLen = this.enemyTankList.length;
            for (var j = 0; j < enemyLen; j++) {
                otherEnemy = this.enemyTankList[j];
                if (otherEnemy != enemy) {
                    if (enemy.checkCollision(otherEnemy) == false) {
                        if (enemy.checkNextCollision(otherEnemy)) {
                            enemy.autoTurn();
                            enemy = null;
                            break;
                        }
                    }
                }
            }
            if (enemy == null) {
                continue;
            }
            //地形碰撞检测
            if (this.getCollioseTile(enemy).length == 0 && this.checkEdge(enemy) == false) {
                enemy.autoMove();
            }
            else {
                enemy.autoTurn();
                this.modifyTankTurn(enemy);
            }
            //道具碰撞
            var itemLen = this.itemList.length;
            for (var j = itemLen - 1; j >= 0; j--) {
                var item = this.itemList[j];
                if (item.checkCollision(enemy)) {
                    if (this.checkItemEffect(item, enemy)) {
                        this.itemList.splice(j, 1);
                        item.recycle();
                        if (item.type == ItemEnum.boom) {
                            if (this.checkPlayerAllDie()) {
                                this.gameOver();
                                return;
                            }
                            else if (this.checkEnemyAllDie()) {
                                this.gameWin();
                                return;
                            }
                        }
                    }
                }
            }
        }
    };
    //移动自己子弹
    p.moveBullet = function () {
        var len = this.bulletList.length;
        var bullet;
        for (var i = len - 1; i >= 0; i--) {
            bullet = this.bulletList[i];
            //边界检测
            if (this.checkEdge(bullet)) {
                if (bullet.type == TankEnum.player) {
                    this.snd.play(this.snd.fire_reach_wall);
                }
                this.playBoom(bullet);
                this.bulletList.splice(i, 1);
                bullet.recycle();
                continue; //子弹已销毁，跳过本次循环
            }
            //判断子弹击中障碍物
            var collisionTileList = this.getCollioseTile(bullet);
            for (var j = 0; j < collisionTileList.length; j++) {
                var tile = collisionTileList[j];
                if (tile.beAttacked(bullet)) {
                    if (tile.type == TileEnum.camp) {
                        this.playBoom(bullet);
                        this.playTankBoom(tile.x, tile.y);
                        bullet.recycle();
                        this.bulletList.splice(i, 1);
                        tile.setGameOver();
                        this.gameOver();
                        return;
                    }
                    else {
                        this.mapList[tile.row][tile.col] = 0;
                        this.tileList[tile.row][tile.col] = null;
                        tile.recycle();
                    }
                }
                else if (tile.type == TileEnum.steel) {
                    if (bullet.type == TankEnum.player) {
                        this.snd.play(this.snd.fire_reach_wall);
                    }
                }
            }
            if (collisionTileList.length > 0) {
                this.playBoom(bullet);
                bullet.recycle();
                this.bulletList.splice(i, 1);
                continue; //子弹已销毁，跳过本次循环
            }
            //判断子弹和子弹碰撞
            var jLen = this.bulletList.length;
            for (var j = i - 1; j >= 0; j--) {
                var jBullet = this.bulletList[j];
                if (bullet != jBullet) {
                    if (bullet.checkCollision(jBullet)) {
                        bullet.recycle();
                        this.bulletList.splice(i, 1);
                        jBullet.recycle();
                        this.bulletList.splice(j, 1);
                        i--; //销毁了两颗子弹，子弹数组减少了2
                        bullet = null;
                        break;
                    }
                }
            }
            if (bullet == null) {
                continue; //子弹已销毁，则跳过本次循环
            }
            //判断子弹击中敌方坦克
            if (bullet.type == TankEnum.player) {
                var tankLen = this.enemyTankList.length;
                for (var j = tankLen - 1; j >= 0; j--) {
                    var tank = this.enemyTankList[j];
                    if (tank.checkCollision(bullet)) {
                        //掉落道具判断
                        if (tank.isHaveItem) {
                            tank.isHaveItem = false;
                            this.createItem();
                            this.snd.play(this.snd.gift);
                        }
                        //击毁，销毁坦克
                        if (tank.beAttacked(bullet)) {
                            tank.recycle();
                            this.enemyTankList.splice(j, 1);
                            this.playTankBoom(tank.x, tank.y);
                            //敌方坦克全灭
                            if (this.checkEnemyAllDie()) {
                                this.gameWin();
                                return;
                            }
                        }
                        else {
                            tank.playMoveAnim();
                        }
                        //击中，销毁子弹
                        this.playBoom(bullet);
                        bullet.recycle();
                        this.bulletList.splice(i, 1);
                        break; //跳出循环
                    }
                }
            }
            else {
                var tankLen = this.playerTankList.length;
                for (var j = tankLen - 1; j >= 0; j--) {
                    var tank = this.playerTankList[j];
                    if (tank.checkCollision(bullet)) {
                        //击毁判断
                        if (tank.beAttacked(bullet)) {
                            tank.actionHandler(ActionEnum.stopMove);
                            tank.recycle();
                            this.playerTankList.splice(j, 1);
                            this.playTankBoom(tank.x, tank.y);
                            //我方坦克全灭
                            if (this.checkPlayerAllDie()) {
                                this.gameOver();
                                return;
                            }
                            //坦克重生
                            this.createPlayer(tank.playerNo);
                            this.reducePlayerIcon(tank.playerNo);
                        }
                        //销毁子弹
                        this.playBoom(bullet);
                        bullet.recycle();
                        this.bulletList.splice(i, 1);
                        break; //跳出循环
                    }
                }
            }
            //子弹移动
            bullet.move();
        }
    };
    //创建道具
    p.createItem = function () {
        //根据地图道具配置随机生成道具类型
        var mapMananger = MapManager.getInstance();
        var levelData = mapMananger.levelList[mapMananger.curLevel - 1];
        var itemType = levelData.getRandomItem();
        var item = GameFactory.getInstance().getItem(itemType);
        //获取地图空位置
        var emptyTileList = [];
        var len = this.mapList.length;
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                if (this.mapList[i][j] == 0) {
                    emptyTileList.push([i, j]);
                }
            }
        }
        //随机空位置，防止道具
        var emptyPos = emptyTileList[NumberTool.getRandomInt(0, emptyTileList.length - 1)];
        item.y = emptyPos[0] * this.tileWidth + this.halfWidth;
        item.x = emptyPos[1] * this.tileWidth + this.halfWidth;
        item.startFlash();
        this.itemGroup.addChild(item);
        this.itemList.push(item);
    };
    //道具生效，返回道具是否生效
    p.checkItemEffect = function (item, tank) {
        if (item.type == ItemEnum.shield) {
            if (tank.type == TankEnum.player) {
                var player = tank;
                player.playShield(player.itemShieldTime * 1000); //时间s转成ms
            }
            else {
                return false;
            }
        }
        else if (item.type == ItemEnum.gun) {
            tank.setPower(3);
        }
        else if (item.type == ItemEnum.star) {
            tank.setPower(tank.power + 1);
        }
        else if (item.type == ItemEnum.armor) {
            if (tank.type == TankEnum.player) {
                this.setCampSteel();
                this.startArmorTimer();
            }
            else {
                this.setCampWall();
                this.stopArmorTimer();
            }
        }
        else if (item.type == ItemEnum.life) {
            if (tank.type == TankEnum.player) {
                this.snd.play(this.snd.gift_life);
                this.reducePlayerIcon(-1);
            }
            else {
                return false;
            }
        }
        else if (item.type == ItemEnum.boom) {
            this.snd.play(this.snd.gift_bomb);
            if (tank.type == TankEnum.player) {
                var len = this.enemyTankList.length;
                for (var i = 0; i < len; i++) {
                    var tank = this.enemyTankList[i];
                    tank.recycle();
                    this.playTankBoom(tank.x, tank.y);
                    this.reduceEnemyNumIcon();
                }
                this.enemyTankList.length = 0;
            }
            else {
                var len = this.playerTankList.length;
                for (var i = 0; i < len; i++) {
                    var tank = this.playerTankList[i];
                    tank.recycle();
                    this.playTankBoom(tank.x, tank.y);
                    this.reducePlayerIcon(tank.playerNo);
                }
                this.playerTankList.length = 0;
            }
        }
        else if (item.type == ItemEnum.pause) {
            if (tank.type == TankEnum.player) {
                this.bEnemyPause = true;
                this.startPauseTimer();
                var len = this.enemyTankList.length;
                for (var i = 0; i < len; i++) {
                    var tank = this.enemyTankList[i];
                    tank.stop();
                }
            }
            else {
                this.bPlayerPause = true;
                this.startPauseTimer();
                var len = this.playerTankList.length;
                for (var i = 0; i < len; i++) {
                    var tank = this.playerTankList[i];
                    tank.stop();
                }
            }
        }
        return true;
    };
    //坦克转向碰到障碍物，且下一步目的地行走的地形为空，允许一定的碰撞偏差，让坦克转向成功
    p.modifyTankTurn = function (tank) {
        if (this.getCollioseTile(tank).length > 0) {
            var curCol = Math.floor(tank.x / this.tileWidth);
            var curRow = Math.floor(tank.y / this.tileHeight);
            var nextCol = curCol;
            var nextRow = curRow;
            var direction = tank.direction;
            if (direction == DirectionEnum.up) {
                nextRow -= 1;
            }
            else if (direction == DirectionEnum.down) {
                nextRow += 1;
            }
            else if (direction == DirectionEnum.left) {
                nextCol -= 1;
            }
            else if (direction == DirectionEnum.right) {
                nextCol += 1;
            }
            //当前地形是障碍物，例如墙，修正位置会产生bug
            if (this.tileList[curRow][curCol] != null && this.tileList[curRow][curCol].canWalk == false) {
                return;
            }
            if (curRow != nextRow || curCol != nextCol) {
                if (nextRow >= 0 && nextRow < this.rowMax && nextCol >= 0 && nextCol < this.colMax) {
                    var tile = this.tileList[nextRow][nextCol];
                    if (tile == null || tile.canWalk == true) {
                        tank.x = curCol * this.tileWidth + this.halfWidth + tank.speedX;
                        tank.y = curRow * this.tileHeight + this.halfHeight + tank.speedY;
                    }
                }
            }
        }
    };
    //播放爆炸动画
    p.playBoom = function (bullet) {
        var boom = GameFactory.getInstance().getBoom();
        boom.x = bullet.x;
        boom.y = bullet.y;
        this.boomGroup.addChild(boom);
        boom.playBoom();
    };
    //播放坦克爆炸效果
    p.playTankBoom = function (xPos, yPos) {
        var tankBoom = GameFactory.getInstance().getTankBoom();
        tankBoom.x = xPos;
        tankBoom.y = yPos;
        this.boomGroup.addChild(tankBoom);
        tankBoom.playBoom();
    };
    /**
     * 边界检测
     * @target 检测对象
     * @return 返回是否超越边界
     */
    p.checkEdge = function (target) {
        var nextX = target.x + target.speedX;
        var nextY = target.y + target.speedY;
        if (nextX - target.hitHalfWidth < 0) {
            return true;
        }
        else if (nextX + target.hitHalfWidth > this.mapWidth) {
            return true;
        }
        if (nextY - target.hitHalfWidth < 0) {
            return true;
        }
        else if (nextY + target.hitHalfWidth > this.mapHeight) {
            return true;
        }
        return false;
    };
    /**
     * 获取碰撞的地形
     * @target 检测对象
     * @return 返回碰撞的地形
     */
    p.getCollioseTile = function (target) {
        //碰撞的地形列表
        var collisionTileList = [];
        //获取坐标所在行列
        var col = Math.floor(target.x / this.tileWidth);
        var row = Math.floor(target.y / this.tileWidth);
        //获取四周的地形
        var tileList = this.getRoundTile(row, col);
        //判断是否碰撞地形
        var len = tileList.length;
        for (var i = 0; i < len; i++) {
            var tile = tileList[i];
            if (tile != null) {
                //子弹碰撞了地形
                if (target instanceof Bullet && tile.canHit) {
                    if (tile.checkCollision(target)) {
                        collisionTileList.push(tile);
                    }
                }
                else if ((target instanceof Bullet) == false && tile.canWalk == false) {
                    if (tile.checkCollision(target)) {
                        collisionTileList.push(tile);
                    }
                }
            }
        }
        return collisionTileList;
    };
    //获取四周格子列表
    p.getRoundTile = function (row, col) {
        var tileList = [];
        //当前格子，子弹碰撞时需要，坦克移动时不需要
        tileList.push(this.tileList[row][col]);
        if (row - 1 >= 0) {
            tileList.push(this.tileList[row - 1][col]);
            if (col - 1 >= 0) {
                tileList.push(this.tileList[row - 1][col - 1]);
            }
            if (col + 1 < this.colMax) {
                tileList.push(this.tileList[row - 1][col + 1]);
            }
        }
        if (col - 1 >= 0) {
            tileList.push(this.tileList[row][col - 1]);
        }
        if (col + 1 < this.colMax) {
            tileList.push(this.tileList[row][col + 1]);
        }
        if (row + 1 < this.rowMax) {
            tileList.push(this.tileList[row + 1][col]);
            if (col - 1 >= 0) {
                tileList.push(this.tileList[row + 1][col - 1]);
            }
            if (col + 1 < this.colMax) {
                tileList.push(this.tileList[row + 1][col + 1]);
            }
        }
        return tileList;
    };
    //开始生成坦克计时
    p.startGenerateTimer = function () {
        this.generateTimer.addEventListener(egret.TimerEvent.TIMER, this.onGenerateTank, this);
        this.generateTimer.reset();
        this.generateTimer.start();
    };
    //生成坦克
    p.onGenerateTank = function () {
        //获取当前坦克数量，判断上限
        var mapManager = MapManager.getInstance();
        var levelData = mapManager.levelList[mapManager.curLevel - 1];
        var tankLimit = levelData.tankLimit;
        if (this.enemyTankList.length >= tankLimit) {
            return;
        }
        //获取坦克剩余数量，随机生成
        var tankList = levelData.tankList;
        if (tankList.length > 0) {
            var tankeType = tankList.pop();
        }
        else {
            return;
        }
        //减少坦克图标
        this.reduceEnemyNumIcon();
        //获取坦克生成点，并在该点生成坦克
        var enemyBirthPos = levelData.enemyBirthPos;
        var birthPos = enemyBirthPos[NumberTool.getRandomInt(0, enemyBirthPos.length - 1)];
        var self = this;
        var flash = GameFactory.getInstance().getFlash();
        flash.x = birthPos[0] * this.tileWidth + this.halfWidth;
        flash.y = birthPos[1] * this.tileWidth + this.halfHeight;
        this.tankGroup.addChild(flash);
        flash.playAnim();
        egret.Tween.get(this).wait(1200).call(function () {
            var tank = GameFactory.getInstance().getTank(tankeType);
            tank.x = birthPos[0] * self.tileWidth + self.halfWidth;
            tank.y = birthPos[1] * self.tileWidth + self.halfHeight;
            if (Math.random() < (levelData.itemNum / (tankList.length + 1))) {
                tank.isHaveItem = true;
            }
            tank.autoTurn();
            self.tankGroup.addChild(tank);
            self.enemyTankList.push(tank);
        });
    };
    //停止生成坦克
    p.stopGenerateTimer = function () {
        this.generateTimer.removeEventListener(egret.TimerEvent.TIMER, this.onGenerateTank, this);
        this.generateTimer.stop();
    };
    //开始基地护甲计时
    p.startArmorTimer = function () {
        this.armorTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onArmorComplete, this);
        this.armorTimer.repeatCount = MapManager.getInstance().itemSet.armor;
        this.armorTimer.reset();
        this.armorTimer.start();
    };
    //基地护甲计时结束
    p.onArmorComplete = function () {
        this.stopArmorTimer();
        this.setCampWall();
    };
    //停止护甲计时
    p.stopArmorTimer = function () {
        this.armorTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onArmorComplete, this);
        this.armorTimer.stop();
    };
    //暂定计时
    p.startPauseTimer = function () {
        this.pauseTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onPauseComplete, this);
        this.pauseTimer.repeatCount = MapManager.getInstance().itemSet.pause;
        this.pauseTimer.reset();
        this.pauseTimer.start();
    };
    //暂定计时结束
    p.onPauseComplete = function () {
        this.stopPauseTimer();
        if (this.bEnemyPause) {
            var len = this.enemyTankList.length;
            for (var i = 0; i < len; i++) {
                var tank = this.enemyTankList[i];
                tank.playMoveAnim();
            }
        }
        this.bPlayerPause = false;
        this.bEnemyPause = false;
    };
    //停止暂定计时
    p.stopPauseTimer = function () {
        this.pauseTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onPauseComplete, this);
        this.pauseTimer.stop();
    };
    //发送游戏结束
    p.sendGameOver = function () {
        this.socket.sendMessage("gameOver");
    };
    //接收用户操作
    p.revAction = function (data) {
        //console.log("rev action:",data);
        var actionType = data.actionType;
        var openid = data.openid;
        if (this.gameStatus != GameStatus.gameing) {
            return;
        }
        if (this.bPlayerPause) {
            return;
        }
        //获取用户tank
        for (var i = 0; i < this.playerTankList.length; i++) {
            var tank = this.playerTankList[i];
            if (tank.openid == openid) {
                if (actionType == ActionEnum.shoot) {
                    tank.shoot();
                }
                else {
                    tank.actionHandler(actionType);
                    this.modifyTankTurn(tank);
                }
            }
        }
    };
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
