/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.playerTankList = new Array(); //我方坦克
        this.enemyTankList = new Array(); //敌方坦克
        this.playerBulletList = new Array(); //我方子弹
        this.enemyBulletList = new Array(); //敌方子弹
        this.itemList = new Array(); //道具
        this.generateTimer = new egret.Timer(1000); //生成坦克计时器
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
        MapManager.getInstance().curLevel = 1;
        this.resetGame();
        this.startGame();
    };
    p.onRemove = function () {
    };
    p.startGame = function () {
        this.createMap();
        this.createPlayer();
        this.configListeners();
        //this.startGenerateTimer();
    };
    p.nextLevel = function () {
        this.resetGame();
        this.startGame();
    };
    p.gameOver = function () {
    };
    p.resetGame = function () {
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
        for (var i = 0; i < this.rowMax; i++) {
            this.tileList[i] = [];
            for (var j = 0; j < this.colMax; j++) {
                this.tileList[i][j] = null;
            }
        }
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
                    if (tileType == TileEnum.speed || tileType == TileEnum.river) {
                        this.footTileGroup.addChild(tile);
                    }
                    else {
                        this.topTileGroup.addChild(tile);
                    }
                    this.tileList[i][j] = tile;
                }
            }
        }
    };
    //初始化玩家
    p.createPlayer = function () {
        var userManager = UserManager.getInstance();
        var userNum = userManager.getUserNum();
        var mapManager = MapManager.getInstance();
        var levelData = mapManager.levelList[mapManager.curLevel - 1];
        var birthPos = levelData.friendBirthPos;
        for (var i = 0; i < userNum; i++) {
            var player = GameFactory.getInstance().getTank(TankEnum.player);
            player.y = birthPos[i][0] * this.tileWidth + this.tileWidth / 2;
            player.x = birthPos[i][1] * this.tileHeight + this.tileWidth / 2;
            player.openid = userManager.userList[i].openid;
            player.setPlayerNo(i + 1); //p1 p2
            this.tankGroup.addChild(player);
            this.playerTankList.push(player);
        }
    };
    //移动玩家坦克
    p.movePlayerTank = function () {
        var len = this.playerTankList.length;
        var tank;
        for (var i = 0; i < len; i++) {
            tank = this.playerTankList[i];
            if (this.getCollioseTile(tank) == null && this.checkEdge(tank) == false) {
                tank.move();
            }
        }
    };
    //移动敌方坦克
    p.moveEnemyTank = function () {
        var len = this.enemyTankList.length;
        var tank;
        for (var i = 0; i < len; i++) {
            tank = this.enemyTankList[i];
            if (this.getCollioseTile(tank) == null && this.checkEdge(tank) == false) {
                tank.autoMove();
            }
            else {
                tank.autoTurn();
            }
            tank.autoShoot();
        }
    };
    //移动自己子弹
    p.movePlayerBullet = function () {
        var len = this.playerBulletList.length;
        var bullet;
        for (var i = len - 1; i >= 0; i--) {
            bullet = this.playerBulletList[i];
            //边界检测
            //判断子弹击中障碍物
            var tile = this.getCollioseTile(bullet);
            if (tile.beAttacked(bullet)) {
                bullet.recycle();
                this.playerBulletList.splice(i, 1);
                continue; //跳出循环
            }
            //判断子弹击中坦克
            var tankLen = this.enemyTankList.length;
            for (var j = tankLen - 1; j >= 0; j--) {
                var tank = this.enemyTankList[tankLen];
                if (tank.beAttacked(bullet)) {
                    bullet.recycle();
                    this.playerBulletList.splice(i, 1);
                    break; //跳出循环
                }
            }
        }
    };
    /**
     * 边界检测
     * @target 检测对象
     * @return 返回是否超越边界
     */
    p.checkEdge = function (target) {
        var nextX = target.x + target.speedX;
        var nextY = target.y + target.speedY;
        if (nextX - this.halfWidth < 0) {
            return true;
        }
        else if (nextX + this.halfWidth > this.mapWidth) {
            return true;
        }
        if (nextY - this.halfHeight < 0) {
            return true;
        }
        else if (nextY + this.halfHeight > this.mapHeight) {
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
        //下一步坐标
        var nextX = target.x + target.speedX;
        var nextY = target.y + target.speedY;
        //获取坐标所在行列
        var col = Math.floor(target.x / this.tileWidth);
        var row = Math.floor(target.y / this.tileWidth);
        //获取四周的地形
        var tileList = this.getRoundTile(row, col);
        //判断是否碰撞地形
        var len = tileList.length;
        var tile;
        for (var i = 0; i < len; i++) {
            tile = tileList[i];
            if (tile != null && tile.type >= TileEnum.wall) {
                if (Math.abs(nextX - tile.x) < this.tileWidth && Math.abs(nextY - tile.y) < this.tileHeight) {
                    return tile;
                }
            }
        }
        return null;
    };
    //获取四周格子列表
    p.getRoundTile = function (row, col) {
        var tileList = [];
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
        if (this.enemyTankList.length > tankLimit) {
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
        //获取坦克生成点，并在该点生成坦克
        var enemyBirthPos = levelData.enemyBirthPos;
        var birthPos = enemyBirthPos[NumberTool.getRandomInt(0, enemyBirthPos.length - 1)];
        var tank = GameFactory.getInstance().getTank(tankeType);
        tank.x = birthPos[0] + this.halfWidth;
        tank.y = birthPos[1] + this.halfHeight;
        tank.autoTurn();
        this.tankGroup.addChild(tank);
        this.enemyTankList.push(tank);
    };
    //停止生成坦克
    p.stopGenerateTimer = function () {
        this.generateTimer.removeEventListener(egret.TimerEvent.TIMER, this.onGenerateTank, this);
        this.generateTimer.stop();
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
        //获取用户tank
        for (var i = 0; i < this.playerTankList.length; i++) {
            var tank = this.playerTankList[i];
            if (tank.openid == openid) {
                tank.setDirection(actionType);
            }
        }
    };
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
