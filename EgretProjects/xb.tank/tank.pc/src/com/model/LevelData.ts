/**
 * 地图数据
 * @author 
 *
 */
class LevelData {
    /**地图数据*/
    public mapData = [];
    /**普通坦克*/
    public normalTank:number = 0;
    /**快速坦克*/
    public fastTank:number = 0;
    /**强化坦克*/
    public strongTank:number = 0;
    /**超级强化坦克*/
    public superTank:number = 0;
    /**本关卡剩余坦克，保存的值为坦克类型，用于生成顺序*/
    public tankList = [];
    /**敌方坦克同时存在上限*/
    public tankLimit:number = 5;
    /**我方坦克生成点*/
    public friendBirthPos = [[4,12],[8,12]];
    /**敌方坦克生成点*/
    public enemyBirthPos = [[0,0]];
}
