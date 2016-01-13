/**
 * 地图管理类
 * @author
 *
 */
var MapManager = (function () {
    function MapManager() {
        this.level = new Array();
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
