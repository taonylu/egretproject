/**
*  文 件 名：MapManager.ts
*  功    能： 地图管理类
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var MapManager = (function () {
    function MapManager() {
        this.rowMax = 10;
        this.colMax = 9;
        this.level = new Array();
        this.level1 = [
            [0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
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
}());
egret.registerClass(MapManager,'MapManager');
