/**
 * 地图管理类
 * @author 
 *
 */
class MapManager {
    private static instance: MapManager;
    private rowMax: number = 8;
    private colMax: number = 7;
    
    public static getInstance(): MapManager {
        if(this.instance == null) {
            this.instance = new MapManager();
        }
        return this.instance;
    }
    
    public level:Array<any> = new Array<any>();
    
    //计算当前地图的方块的总数
    public getBlockNum(): number {
        var len: number = this.level.length;
        var blockNum: number = 0;
        for(var i: number = 0;i < len;i++) {
            var arr = this.level[i];
            for(var j: number = 0;j < this.rowMax;j++) {
                for(var k: number = 0;k < this.colMax;k++) {
                    if(arr[j][k] > 0) {
                        blockNum++;
                    }
                }
            }
        }
        egret.log("方块总数:",blockNum);
        return blockNum;
    }
    
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
