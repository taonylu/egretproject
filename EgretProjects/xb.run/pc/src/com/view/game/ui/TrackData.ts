/**
 * 赛道信息，用于地图的生成
 * @author 
 *
 */
class TrackData {
    public lastItemType:number = 0;   //上一次生成物品类型  0无 1 水果 2障碍物
    public fruitNum:number = 0;       //生成了多少次水果
    public fruitType:number = 0;      //水果类型
    public shouldCreate:number = 0;   //应该生成多少个水果
    
    public clear(){
        this.lastItemType = 0;
        this.fruitNum = 0;
        this.shouldCreate = 0;
        this.fruitType = 0;
    }
}
