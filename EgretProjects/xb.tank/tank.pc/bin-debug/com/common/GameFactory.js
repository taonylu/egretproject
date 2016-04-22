/**
 * 游戏工厂
 * @author
 *
 */
var GameFactory = (function () {
    function GameFactory() {
        this.playerTankPool = ObjectPool.getPool(PlayerTank.NAME); //玩家坦克
        this.normalTankPool = ObjectPool.getPool(NormalTank.NAME); //普通坦克
        this.fastTankPool = ObjectPool.getPool(FastTank.NAME); //快速坦克
        this.strongTankPool = ObjectPool.getPool(StrongTank.NAME); //强化坦克
        this.superTankPool = ObjectPool.getPool(SuperTank.NAME); //超级强化坦克
        this.tankList = new Array(); //坦克列表，保存坦克对象池，用于根据类型获取对象池
        this.itemPool = ObjectPool.getPool(BaseItem.NAME); //道具
        this.bulletPool = ObjectPool.getPool(Bullet.NAME); //子弹
        this.boomPool = ObjectPool.getPool(Boom.NAME); //爆炸效果
        this.steelPool = ObjectPool.getPool(Steel.NAME); //钢铁
        this.wallPool = ObjectPool.getPool(Wall.NAME); //墙
        this.grassPool = ObjectPool.getPool(Grass.NAME); //草地
        this.riverPool = ObjectPool.getPool(River.NAME); //河流
        this.speedPool = ObjectPool.getPool(Speed.NAME); //加速
        this.tileList = []; //地形列表，保存地形对象池，用于根据类型获取对象池
        this.tankList.push(this.playerTankPool);
        this.tankList.push(this.normalTankPool);
        this.tankList.push(this.fastTankPool);
        this.tankList.push(this.strongTankPool);
        this.tankList.push(this.superTankPool);
        this.tileList.push(this.grassPool);
        this.tileList.push(this.speedPool);
        this.tileList.push(this.wallPool);
        this.tileList.push(this.steelPool);
        this.tileList.push(this.riverPool);
    }
    var d = __define,c=GameFactory,p=c.prototype;
    //获取一辆坦克 0玩家 1普通 2快速 3强化 4超级强化
    p.getTank = function (type) {
        return this.tankList[type].getObject();
    };
    //获取一个道具
    p.getItem = function (type) {
        var item = this.itemPool.getObject();
        item.setType(type);
        return item;
    };
    //获取一颗子弹
    p.getBullet = function () {
        return this.bulletPool.getObject();
    };
    //获取一个爆炸效果
    p.getBoom = function () {
        return this.boomPool.getObject();
    };
    //获取一个地形
    p.getTile = function (type) {
        return this.tileList[type - 1].getObject(); //地形从1开始，数组索引从0开始
    };
    GameFactory.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameFactory();
        }
        return this.instance;
    };
    return GameFactory;
}());
egret.registerClass(GameFactory,'GameFactory');
