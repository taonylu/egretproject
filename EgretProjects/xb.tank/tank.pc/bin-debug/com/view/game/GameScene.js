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
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.startGame = function () {
        this.initMap();
        this.initPlayer();
        this.configListeners();
    };
    p.nextLevel = function () {
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
        //初始化地图数据
        this.rowMax = MapManager.getInstance().rowMax;
        this.colMax = MapManager.getInstance().colMax;
        this.tileWidth = MapManager.getInstance().tileWidth;
        this.tileHeight = MapManager.getInstance().tileHeight;
        //初始化地形数组
        this.tileList = [];
        for (var i = 0; i < this.rowMax; i++) {
            this.tileList[i] = [];
            for (var j = 0; j < this.colMax; j++) {
                this.tileList[i][j] = null;
            }
        }
    };
    //初始化地图
    p.initMap = function () {
        //获取地图数据
        var mapManager = MapManager.getInstance();
        var levelData = mapManager.levelList[mapManager.curLevel];
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
                    tile.setType(tileType);
                    tile.x = j * this.tileWidth;
                    tile.y = i * this.tileHeight;
                    this.tileGroup.addChild(tile);
                    this.tileList[i][j] = tile;
                }
            }
        }
    };
    //初始化玩家
    p.initPlayer = function () {
    };
    //移动玩家坦克
    p.movePlayerTank = function () {
        var len = this.playerTankList.length;
        var tank;
        for (var i = 0; i < len; i++) {
            tank = this.playerTankList[i];
            if (this.getCollioseTile(tank) == null) {
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
            if (this.getCollioseTile(tank) == null) {
                tank.move();
            }
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
        var halfWidth = target.width / 2;
        var halfHeight = target.height / 2;
        if (target.x - halfWidth < 0) {
            return true;
        }
        else if (target.x + halfWidth > this.mapWidth) {
            return true;
        }
        if (target.y + halfHeight > this.mapHeight) {
            return true;
        }
        else if (target.y - halfHeight < 0) {
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
        var row = Math.floor(nextX / this.tileWidth);
        var col = Math.floor(nextY / this.tileWidth);
        //获取四周的地形
        var tileList = this.getRoundTile(row, col);
        //判断是否碰撞地形
        var len = tileList.length;
        var tile;
        for (var i = 0; i < len; i++) {
            tile = tileList[i];
            if (tile != null && tile.type >= TileEnum.wall) {
                if (target.getBounds().intersects(tile.getBounds())) {
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
    return GameScene;
}(BaseScene));
egret.registerClass(GameScene,'GameScene');
