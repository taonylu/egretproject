/**
*  功    能：游戏地图
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
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
        this.level4 = [
            [0, 1, 0, 0, 1, 0, 1],
            [0, 1, 1, 0, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 0],
            [1, 0, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 1, 1, 0]
        ];
        this.level5 = [
            [1, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 1],
            [0, 0, 1, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 0],
            [1, 0, 1, 1, 0, 0, 1],
            [0, 0, 0, 0, 1, 0, 1]
        ];
        this.level6 = [
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 1, 1],
            [0, 0, 1, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 0],
            [1, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0]
        ];
    }
    var d = __define,c=MapManager;p=c.prototype;
    MapManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new MapManager();
        }
        return this.instance;
    };
    return MapManager;
})();
egret.registerClass(MapManager,"MapManager");
