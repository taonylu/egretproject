/**
*  文 件 名：MapData.ts
*  功    能：地图数据
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
var MapData = (function () {
    function MapData() {
    }
    var __egretProto__ = MapData.prototype;
    MapData.rows = 7;
    MapData.cols = 7;
    //第一关地图
    MapData.map0 = [
        [0, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    //第二关地图
    MapData.map1 = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
    ];
    return MapData;
})();
MapData.prototype.__class__ = "MapData";
