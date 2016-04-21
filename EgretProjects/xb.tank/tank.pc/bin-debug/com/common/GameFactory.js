/**
 * 游戏工厂
 * @author
 *
 */
var GameFactory = (function () {
    function GameFactory() {
        this.playerTankPool = ObjectPool.getPool("PlayerTank");
        this.normalTankPool = ObjectPool.getPool("NormalTank");
        this.fastTankPool = ObjectPool.getPool("FastTank");
        this.strongTankPool = ObjectPool.getPool("StrongTank");
        this.superTankPool = ObjectPool.getPool("SuperTank");
        this.tankList = new Array();
        this.itemPool = ObjectPool.getPool(BaseItem.NAME);
        this.bulletPool = ObjectPool.getPool(Bullet.NAME);
        this.boomPool = ObjectPool.getPool(Boom.NAME);
        this.tilePool = ObjectPool.getPool(BaseTile.NAME);
        this.steelPool = ObjectPool.getPool("Steel");
        this.wallPool = ObjectPool.getPool("Wall");
        this.tankList.push(this.playerTankPool);
        this.tankList.push(this.normalTankPool);
        this.tankList.push(this.fastTankPool);
        this.tankList.push(this.strongTankPool);
        this.tankList.push(this.superTankPool);
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
        if (type == TileEnum.wall) {
            return this.wallPool.getObject();
        }
        else if (type == TileEnum.steel) {
            return this.steelPool.getObject();
        }
        else {
            var tile = this.tilePool.getObject();
            tile.setType(type);
            return tile;
        }
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
