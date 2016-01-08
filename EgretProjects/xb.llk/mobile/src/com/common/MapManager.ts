/**
 * 地图管理类
 * @author 
 *
 */
class MapManager {
    private static instance: MapManager;
    
    public static getInstance(): MapManager {
        if(this.instance == null) {
            this.instance = new MapManager();
        }
        return this.instance;
    }
    
    public level:Array<any>;
    
//    public level1: Array<any> =
//    [
//        [0,1,0,0,1,0,0],
//        [0,0,1,0,0,1,0],
//        [0,0,1,0,0,0,0],
//        [0,0,0,0,0,1,0],
//        [0,0,0,0,0,0,0],
//        [0,0,0,0,0,0,0]
//    ];
//
//    public level2: Array<any> =
//    [
//        [0,1,0,0,1,0,0],
//        [0,0,1,0,0,1,0],
//        [0,0,1,0,0,0,0],
//        [1,0,1,1,1,1,0],
//        [0,0,0,0,0,0,0],
//        [0,0,0,0,1,0,1]
//    ];
//
//    public level3: Array<any> =
//    [
//        [0,1,0,0,1,0,1],
//        [0,0,1,0,0,1,1],
//        [0,0,1,0,0,0,0],
//        [1,0,1,1,1,1,0],
//        [1,0,1,1,0,0,0],
//        [0,0,0,0,1,0,0]
//    ];
    
}
