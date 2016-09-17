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
    private static instance: MapManager;
    private rowMax: number = 10;
    private colMax: number = 9;
    
    public static getInstance(): MapManager {
        if(this.instance == null) {
            this.instance = new MapManager();
        }
        return this.instance;
    }
    
    public level:Array<any> = new Array<any>();

    public level1: Array<any> =
    [
        [0,1,0,0,1,0,0],
        [0,0,1,0,0,1,0],
        [0,0,1,0,0,0,0],
        [0,0,0,0,0,1,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];

    
}
