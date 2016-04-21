/**
 * 游戏工厂
 * @author 
 *
 */
class GameFactory {
	private playerTankPool:ObjectPool = ObjectPool.getPool("PlayerTank");
    private normalTankPool:ObjectPool = ObjectPool.getPool("NormalTank");
    private fastTankPool: ObjectPool = ObjectPool.getPool("FastTank");
    private strongTankPool: ObjectPool = ObjectPool.getPool("StrongTank");
    private superTankPool: ObjectPool = ObjectPool.getPool("SuperTank");
    private tankList:Array<ObjectPool> = new Array<ObjectPool>();
    
    private itemPool:ObjectPool = ObjectPool.getPool(BaseItem.NAME);
    public bulletPool:ObjectPool = ObjectPool.getPool(Bullet.NAME);
    private boomPool:ObjectPool = ObjectPool.getPool(Boom.NAME);
    private tilePool:ObjectPool = ObjectPool.getPool(BaseTile.NAME);
    private steelPool:ObjectPool = ObjectPool.getPool("Steel");
    private wallPool:ObjectPool = ObjectPool.getPool("Wall");
    
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
    public getTile(type:TileEnum):any{
        if(type == TileEnum.wall){
            return this.wallPool.getObject();
        }else if(type == TileEnum.steel){
            return this.steelPool.getObject();
        }else{
            var tile: BaseTile = this.tilePool.getObject();
            tile.setType(type);
            return tile;
        }
    }
    
    private static instance:GameFactory;
    public static getInstance():GameFactory{
        if(this.instance == null){
            this.instance = new GameFactory();
        }
        return this.instance;
    }
}
