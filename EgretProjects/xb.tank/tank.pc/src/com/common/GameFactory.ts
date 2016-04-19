/**
 * 游戏工厂
 * @author 
 *
 */

//坦克 0玩家 1普通 2快速 3强化 4超级强化
enum TankEnum  {
    player = 0,
    normal = 1,
    fast = 2,
    strong = 3,
    super = 4,
    max = 4
}

//道具 0隐身，1枪，2星星，3基地护甲，4命，5手雷，6暂停
enum ItemEnum{
    alpha = 0,
    gun = 1,
    star = 2,
    armor = 3,
    life = 4,
    boom = 5,
    pause = 6,
    max = 6
}

//地形 1砖墙 2钢板 3草地 4加速带 5河流 
enum TileEnum{
    grass = 1,
    speed = 2,
    wall = 3,
    steel = 4,
    river = 5,
    max = 5
}

class GameFactory {
	public playerTankPool:ObjectPool = ObjectPool.getPool("PlayerTank");
    public normalTankPool:ObjectPool = ObjectPool.getPool("NormalTank");
    public fastTankPool: ObjectPool = ObjectPool.getPool("FastTank");
    public strongTankPool: ObjectPool = ObjectPool.getPool("StrongTank");
    public superTankPool: ObjectPool = ObjectPool.getPool("superTank");
    public tankList:Array<ObjectPool> = new Array<ObjectPool>();
    
    public itemPool:ObjectPool = ObjectPool.getPool(BaseItem.NAME);
    public bulletPool:ObjectPool = ObjectPool.getPool(Bullet.NAME);
    public boomPool:ObjectPool = ObjectPool.getPool(Boom.NAME);
    public tilePool:ObjectPool = ObjectPool.getPool(BaseTile.NAME);
    
    public constructor(){
        this.tankList.push(this.playerTankPool);
        this.tankList.push(this.normalTankPool);
        this.tankList.push(this.fastTankPool);
        this.tankList.push(this.strongTankPool);
        this.tankList.push(this.superTankPool);
        
    }
    
    //获取一辆坦克 0玩家 1普通 2快速 3强化 4超级强化
    public getTank(type: TankEnum):BaseTank{
        return this.tankList[type].getObject();
    }
    
    //获取一个道具
    public getItem(type:ItemEnum):BaseItem{
        var item:BaseItem = this.itemPool.getObject();
        item.setType(type);
        return item;
    }
    
    //获取一颗子弹
    public getBullet():Bullet{
        return this.bulletPool.getObject();
    }
    
    //获取一个爆炸效果
    public getBoom():Boom{
        return this.boomPool.getObject();
    }
    
    //获取一个地形
    public getTile(type:TileEnum):BaseTile{
        var tile:BaseTile = this.tilePool.getObject();
        tile.setType(type);
        return tile;
    }
    
    private static instance:GameFactory;
    public static getInstance():GameFactory{
        if(this.instance == null){
            this.instance = new GameFactory();
        }
        return this.instance;
    }
}
