/**
 * 地图管理类
 * @author 
 *
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
