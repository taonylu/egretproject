/**
*  文 件 名：MapManager.ts
*  功    能： 地图管理类
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
class MapManager {
    
    public rowMax: number = 13;     //地图行数
    public colMax: number = 13;     //地图列数
    public tileWidth:number = 64;  //tile宽度
    public tileHeight:number = 64; //tile高度
    public halfWidth:number = 32;
    public halfHeight:number = 32;
    public levelLimit:number = 6;   //地图数量
    public curLevel:number = 1;     //当前关卡
    
    public levelList: Array<LevelData> = new Array<LevelData>(); //关卡数据列表
    
    public tankSet;  //坦克属性
    public itemSet;  //道具属性
    
    //初始化地图配置文件
    public initalize(){
        //获取地图文件
        var mapJson = RES.getRes("map_json");
        if(mapJson == null){
            console.log("地图配置文件为null");
            return;
        }
        //获取map_json坦克数量
        var level = mapJson.level;
        this.levelLimit = level.levelLimit;
        for(var i = 0;i < this.levelLimit;i++) {
            var levelData = new LevelData();
            levelData.normalTank = level.normalTank[i];
            levelData.fastTank = level.fastTank[i];
            levelData.strongTank = level.strongTank[i];
            levelData.superTank = level.superTank[i];
            //将坦克存入列表，并随机打乱顺序
            this.setTankList(levelData.tankList, TankEnum.normal, levelData.normalTank);
            this.setTankList(levelData.tankList,TankEnum.fast,levelData.fastTank);
            this.setTankList(levelData.tankList,TankEnum.strong,levelData.strongTank);
            this.setTankList(levelData.tankList,TankEnum.super,levelData.superTank);
            ArrayTool.randomArr(levelData.tankList);
            this.levelList[i] = levelData; 
        }
        //获取坦克和道具属性
        this.tankSet = mapJson.tankSet;
        this.itemSet = mapJson.itemSet;
        
        
        //获取level_json地图数据
        for(var i=1;i<=this.levelLimit;i++){
            var levelJson = RES.getRes("level" + i + "_json");
            if(levelJson == null){
                console.log("第" + i + "关配置文件不存在");
                return;
            }
            var data = levelJson.layers[0].data;
            var levelData:LevelData = this.levelList[i-1];
            var arr2D = [];  //将tile导出的一维数组转成二维数组
            for(var m = 0;m < this.rowMax;m++) {
                arr2D[m] = [];
                for(var n = 0;n < this.colMax;n++) {
                    arr2D[m][n] = data[this.colMax * m + n];
                }
            }
            levelData.mapData = arr2D;
        }
       
    }
    
    /**
     * 将各种坦克保存到列表中
     * @targetList 目标列表
     * @tankType 坦克类型
     * @tankNum 坦克数量
     */ 
    private setTankList(targetList,tankType, tankNum){
        for(var i=0;i<tankNum;i++){
            targetList.push(tankType); 
        } 
    }
    
    
    
    private static instance: MapManager;
    
    public static getInstance(): MapManager {
        if(this.instance == null) {
            this.instance = new MapManager();
        }
        return this.instance;
    }
    
}
