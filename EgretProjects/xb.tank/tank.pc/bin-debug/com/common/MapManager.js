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
        this.rowMax = 16; //地图行数
        this.colMax = 20; //地图列数
        this.tileWidth = 64; //tile宽度
        this.tileHeight = 64; //tile高度
        this.halfWidth = 32;
        this.halfHeight = 32;
        this.levelLimit = 6; //地图数量
        this.curLevel = 1; //当前关卡
        this.createPos = [[15, 6], [15, 11]]; //生成点
        this.levelList = new Array();
    }
    var d = __define,c=MapManager,p=c.prototype;
    //初始化地图配置文件
    p.initalize = function () {
        var json = RES.getRes("map_json");
        if (json == null) {
            console.log("地图配置文件为null");
            return;
        }
        var level = json.level;
        for (var i = 0; i < this.levelLimit; i++) {
            var levelData = new LevelData();
            levelData.normalTank = level[i].normalTank;
            levelData.fastTank = level[i].fastTank;
            levelData.strongTank = level[i].strongTank;
            levelData.superTank = level[i].superTank;
            this.levelList[i] = levelData;
        }
        for (var i = 1; i <= this.levelLimit; i++) {
            var json = RES.getRes("level" + i + "_json");
            if (json == null) {
                console.log("第" + i + "关配置文件不存在");
                return;
            }
            var data = json.layers[0].data;
            var levelData = this.levelList[i - 1];
            var arr2D = []; //将tile导出的一维数组转成二维数组
            for (var m = 0; m < this.rowMax; m++) {
                arr2D[m] = [];
                for (var n = 0; n < this.colMax; n++) {
                    arr2D[m][n] = data[this.colMax * m + n];
                }
            }
            levelData.mapData = arr2D;
        }
    };
    MapManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new MapManager();
        }
        return this.instance;
    };
    return MapManager;
}());
egret.registerClass(MapManager,'MapManager');
