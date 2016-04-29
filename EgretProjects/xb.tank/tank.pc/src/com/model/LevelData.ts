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
    public enemyBirthPos = [[0,0],[6,0],[12,0]];
    /**道具数量*/
    public itemNum:number = 0;
    public shield:number = 0;  //道具出现几率
    public gun:number = 0;
    public star: number = 0;
    public armor: number = 0;
    public life: number = 0;
    public boom: number = 0;
    public pause: number = 0;
    
    //初始化道具几率
    public initItemChance(){
        this.gun += this.shield;
        this.star += this.gun;
        this.armor += this.star;
        this.life += this.armor;
        this.boom += this.life;
        this.pause += this.boom;
    }
    
    //根据道具出现几率，随机道具
    public getRandomItem():ItemEnum{
        var rand = NumberTool.getRandomInt(0,100);
        if(rand < this.shield){
            return ItemEnum.shield;
        }else if(rand < this.gun){
            return ItemEnum.gun;
        }else if(rand < this.star){
            return ItemEnum.star;
        } else if(rand < this.armor) {
            return ItemEnum.armor;
        } else if(rand < this.life) {
            return ItemEnum.life;
        } else if(rand < this.boom) {
            return ItemEnum.boom;
        } else if(rand < this.pause) {
            return ItemEnum.pause;
        }
        return ItemEnum.star;  //默认返回star
    }
}











