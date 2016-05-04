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
        this.rowMax = 13; //地图行数
        this.colMax = 13; //地图列数
        this.tileWidth = 64; //tile宽度
        this.tileHeight = 64; //tile高度
        this.halfWidth = 32;
        this.halfHeight = 32;
        this.levelLimit = 0; //地图数量
        this.curLevel = 1; //当前关卡
        this.levelList = new Array(); //关卡数据列表
        this.endLess_tankAdd = 0.3; //无尽模式，坦克数量增加比例
        this.endLess_superChance = 50; //强化坦克出现几率
        this.endLess_superAdd = 10; //每波强化坦克出现几率增加比例
        this.endless_itemNum = 5; //道具数量
    }
    var d = __define,c=MapManager,p=c.prototype;
    //初始化地图配置文件
    p.initalize = function () {
        //清理地图数据
        this.levelList.length = 0;
        //获取地图文件
        var mapJson = RES.getRes("map_json");
        if (mapJson == null) {
            alert("地图配置文件不存在");
            return;
        }
        //获取map_json坦克数量
        var level = mapJson.level;
        this.levelLimit = level.levelLimit;
        for (var i = 0; i < this.levelLimit; i++) {
            var levelData = new LevelData();
            //坦克
            levelData.tankLimit = level.tankLimit[i];
            levelData.normalTank = level.normalTank[i];
            levelData.fastTank = level.fastTank[i];
            levelData.strongTank = level.strongTank[i];
            levelData.superTank = level.superTank[i];
            //将坦克存入列表，并随机打乱顺序
            this.setTankList(levelData.tankList, TankEnum.normal, levelData.normalTank);
            this.setTankList(levelData.tankList, TankEnum.fast, levelData.fastTank);
            this.setTankList(levelData.tankList, TankEnum.strong, levelData.strongTank);
            this.setTankList(levelData.tankList, TankEnum.super, levelData.superTank);
            ArrayTool.randomArr(levelData.tankList);
            //道具
            levelData.itemNum = level.itemNum[i];
            levelData.shield = level.shield[i];
            levelData.gun = level.gun[i];
            levelData.star = level.star[i];
            levelData.armor = level.armor[i];
            levelData.life = level.life[i];
            levelData.boom = level.boom[i];
            levelData.pause = level.pause[i];
            levelData.initItemChance();
            //保存地图
            this.levelList[i] = levelData;
        }
        //获取坦克和道具属性
        this.tankSet = mapJson.tankSet;
        this.itemSet = mapJson.itemSet;
        this.playerSet = mapJson.playerSet;
        //获取无尽模式设置
        this.endLess_tankAdd = level.tankAdd;
        this.endLess_superChance = level.superChance;
        this.endLess_superAdd = level.superAdd;
        this.endless_itemNum = level.itemNum[this.levelLimit - 1];
        //获取level_json地图数据
        for (var i = 1; i <= this.levelLimit; i++) {
            var levelJson = RES.getRes("level" + i + "_json");
            if (levelJson == null) {
                alert("第" + i + "关配置文件不存在");
                return;
            }
            var data = levelJson.layers[0].data;
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
    //获取当前关卡的LevelData
    p.getCurLevelData = function () {
        return this.levelList[this.curLevel - 1];
    };
    /**
     * 将各种坦克保存到列表中
     * @targetList 目标列表
     * @tankType 坦克类型
     * @tankNum 坦克数量
     */
    p.setTankList = function (targetList, tankType, tankNum) {
        for (var i = 0; i < tankNum; i++) {
            targetList.push(tankType);
        }
    };
    //获取无尽关卡的levelData
    p.getEndLessLevelData = function (wave) {
        var levelData = this.levelList[this.levelLimit - 1];
        //坦克数量 = 上限*增加比例*波数
        var tankNum = Math.round(levelData.tankLimit * this.endLess_tankAdd * wave);
        //强化坦克比例
        var superChance = this.endLess_superChance + this.endLess_superAdd * wave;
        //生成坦克列表
        levelData.tankList.length = 0;
        for (var i = 0; i < tankNum; i++) {
            var rand = Math.random();
            if (rand < superChance / 2) {
                levelData.tankList.push(TankEnum.super);
            }
            else if (rand < superChance) {
                levelData.tankList.push(TankEnum.strong);
            }
            else {
                var rand2 = Math.random(); //非强化坦克生成几率
                if (rand2 < 0.5) {
                    levelData.tankList.push(TankEnum.normal);
                }
                else {
                    levelData.tankList.push(TankEnum.fast);
                }
            }
        }
        //生成道具数量
        levelData.itemNum = this.endless_itemNum;
        return levelData;
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
