/**
 * 地图管理类
 * @author
 *
 */
var MapManager = (function () {
    function MapManager() {
        this.level1 = [
            [0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        this.level2 = [
            [0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 1]
        ];
        this.level3 = [
            [0, 1, 0, 0, 1, 0, 1],
            [0, 0, 1, 0, 0, 1, 1],
            [0, 0, 1, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 0],
            [1, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0]
        ];
    }
    var d = __define,c=MapManager,p=c.prototype;
    MapManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new MapManager();
        }
        return this.instance;
    };
    return MapManager;
})();
egret.registerClass(MapManager,'MapManager');
