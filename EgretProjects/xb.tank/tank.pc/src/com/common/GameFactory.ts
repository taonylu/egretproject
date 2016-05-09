/**
 * 游戏工厂
 * @author 
 *
 */
class GameFactory {
	private playerTankPool:ObjectPool = ObjectPool.getPool(PlayerTank.NAME);  //玩家坦克
    private normalTankPool:ObjectPool = ObjectPool.getPool(NormalTank.NAME);  //普通坦克
    private fastTankPool: ObjectPool = ObjectPool.getPool(FastTank.NAME);     //快速坦克
    private strongTankPool: ObjectPool = ObjectPool.getPool(StrongTank.NAME); //强化坦克
    private superTankPool: ObjectPool = ObjectPool.getPool(SuperTank.NAME);   //超级强化坦克
    private tankList:Array<ObjectPool> = new Array<ObjectPool>();          //坦克列表，保存坦克对象池，用于根据类型获取对象池
    
    private itemPool:ObjectPool = ObjectPool.getPool(BaseItem.NAME);       //道具
    public bulletPool:ObjectPool = ObjectPool.getPool(Bullet.NAME);        //子弹
    private boomPool:ObjectPool = ObjectPool.getPool(Boom.NAME);           //爆炸效果
    private tankBoomPool:ObjectPool = ObjectPool.getPool(TankBoom.NAME);   //坦克爆炸效果
    private scoreLabelPool:ObjectPool = ObjectPool.getPool(ScoreLabel.NAME);//爆炸或道具的分数文本
    
    private steelPool:ObjectPool = ObjectPool.getPool(Steel.NAME);            //钢铁
    private wallPool:ObjectPool = ObjectPool.getPool(Wall.NAME);              //墙
    private grassPool:ObjectPool = ObjectPool.getPool(Grass.NAME);            //草地
    private riverPool:ObjectPool = ObjectPool.getPool(River.NAME);            //河流
    private campPool:ObjectPool = ObjectPool.getPool(Camp.NAME);              //基地
    private tileList = [];   //地形列表，保存地形对象池，用于根据类型获取对象池
    
    private flashPool:ObjectPool = ObjectPool.getPool(Flash.NAME);
    
    public constructor(){
        this.tankList.push(this.playerTankPool);
        this.tankList.push(this.normalTankPool);
        this.tankList.push(this.fastTankPool);
        this.tankList.push(this.strongTankPool);
        this.tankList.push(this.superTankPool);
        
        this.tileList.push(this.grassPool);
        this.tileList.push(this.wallPool);
        this.tileList.push(this.steelPool);
        this.tileList.push(this.riverPool);
        this.tileList.push(this.campPool);
    }
    
    //获取一个坦克生成时的闪烁效果
    public getFlash():Flash{
        return this.flashPool.getObject();
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
    
    //获取一个分数文本
    public getScoreLabel():ScoreLabel{
        return this.scoreLabelPool.getObject();
    }
    
    //获取一个爆炸效果
    public getBoom():Boom{
        return this.boomPool.getObject();
    }
    
    //获取一个坦克爆炸效果
    public getTankBoom():TankBoom{
        return this.tankBoomPool.getObject();
    }
    
    //获取一个地形
    public getTile(type:TileEnum):any{
        return this.tileList[type-1].getObject();  //地形从1开始，数组索引从0开始
    }
    
    private static instance:GameFactory;
    public static getInstance():GameFactory{
        if(this.instance == null){
            this.instance = new GameFactory();
        }
        return this.instance;
    }
}
