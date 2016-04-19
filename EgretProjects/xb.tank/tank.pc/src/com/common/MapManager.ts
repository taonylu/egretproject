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
    
    public rowMax: number = 10;     //地图行数
    public colMax: number = 9;      //地图列数
    public tileWidth:number = 128;  //tile宽度
    public tileHeight:number = 128; //tile高度
    public levelLimit:number = 6;   //地图数量
    public curLevel:number = 1;     //当前关卡
    
    public levelList: Array<LevelData> = new Array<LevelData>();
    
    //初始化地图配置文件
    public initalize(){
        var json = RES.getRes("map_json");
        
        if(json == null){
            console.log("地图配置文件为null");
            return;
        }
        
        var level = json.level;
        for(var i=0;i<this.levelLimit;i++){
            var levelData = new LevelData();
            var arr2D = [];  //将tile导出的一维数组转成二维数组
            for(var m=0;m<this.rowMax;m++){
                arr2D[m] = [];
                for(var n=0;n<this.colMax;n++){
                    arr2D[m][n] = level[i].data[this.rowMax*m + n];
                }
            }
            levelData.mapData = arr2D;
            levelData.normalTank = level[i].normalTank;
            levelData.fastTank = level[i].fastTank;
            levelData.strongTank = level[i].strongTank;
            levelData.superTank = level[i].superTank;
            this.levelList[i] = levelData;
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
