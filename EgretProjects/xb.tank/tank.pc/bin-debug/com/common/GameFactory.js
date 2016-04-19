/**
 * 游戏工厂
 * @author
 *
 */
//坦克 0玩家 1普通 2快速 3强化 4超级强化
var TankEnum;
(function (TankEnum) {
    TankEnum[TankEnum["player"] = 0] = "player";
    TankEnum[TankEnum["normal"] = 1] = "normal";
    TankEnum[TankEnum["fast"] = 2] = "fast";
    TankEnum[TankEnum["strong"] = 3] = "strong";
    TankEnum[TankEnum["super"] = 4] = "super";
    TankEnum[TankEnum["max"] = 4] = "max";
})(TankEnum || (TankEnum = {}));
//道具 0隐身，1枪，2星星，3基地护甲，4命，5手雷，6暂停
var ItemEnum;
(function (ItemEnum) {
    ItemEnum[ItemEnum["alpha"] = 0] = "alpha";
    ItemEnum[ItemEnum["gun"] = 1] = "gun";
    ItemEnum[ItemEnum["star"] = 2] = "star";
    ItemEnum[ItemEnum["armor"] = 3] = "armor";
    ItemEnum[ItemEnum["life"] = 4] = "life";
    ItemEnum[ItemEnum["boom"] = 5] = "boom";
    ItemEnum[ItemEnum["pause"] = 6] = "pause";
    ItemEnum[ItemEnum["max"] = 6] = "max";
})(ItemEnum || (ItemEnum = {}));
//地形 1砖墙 2钢板 3草地 4加速带 5河流 
var TileEnum;
(function (TileEnum) {
    TileEnum[TileEnum["grass"] = 1] = "grass";
    TileEnum[TileEnum["speed"] = 2] = "speed";
    TileEnum[TileEnum["wall"] = 3] = "wall";
    TileEnum[TileEnum["steel"] = 4] = "steel";
    TileEnum[TileEnum["river"] = 5] = "river";
    TileEnum[TileEnum["max"] = 5] = "max";
})(TileEnum || (TileEnum = {}));
var GameFactory = (function () {
    function GameFactory() {
        this.playerTankPool = ObjectPool.getPool("PlayerTank");
        this.normalTankPool = ObjectPool.getPool("NormalTank");
        this.fastTankPool = ObjectPool.getPool("FastTank");
        this.strongTankPool = ObjectPool.getPool("StrongTank");
        this.superTankPool = ObjectPool.getPool("superTank");
        this.tankList = new Array();
        this.itemPool = ObjectPool.getPool(BaseItem.NAME);
        this.bulletPool = ObjectPool.getPool(Bullet.NAME);
        this.boomPool = ObjectPool.getPool(Boom.NAME);
        this.tilePool = ObjectPool.getPool(BaseTile.NAME);
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
        var tile = this.tilePool.getObject();
        tile.setType(type);
        return tile;
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
