/**
 * 地图管理类
 * @author
 *
 */
var MapManager = (function () {
    function MapManager() {
        this.rowMax = 10;
        this.colMax = 9;
        this.level = new Array();
    }
    var d = __define,c=MapManager,p=c.prototype;
    MapManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new MapManager();
        }
        return this.instance;
    };
    //计算当前地图的方块的总数
    p.getBlockNum = function () {
        var len = this.level.length;
        var blockNum = 0;
        for (var i = 0; i < len; i++) {
            var arr = this.level[i];
            for (var j = 0; j < this.rowMax; j++) {
                for (var k = 0; k < this.colMax; k++) {
                    if (arr[j][k] > 0) {
                        blockNum++;
                    }
                }
            }
        }
        egret.log("方块总数:", blockNum);
        return blockNum;
    };
    return MapManager;
})();
egret.registerClass(MapManager,'MapManager');
