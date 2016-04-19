/**
 * 地图数据
 * @author
 *
 */
var LevelData = (function () {
    function LevelData() {
        /**地图数据*/
        this.mapData = [];
        /**普通坦克*/
        this.normalTank = 0;
        /**快速坦克*/
        this.fastTank = 0;
        /**强化坦克*/
        this.strongTank = 0;
        /**超级强化坦克*/
        this.superTank = 0;
    }
    var d = __define,c=LevelData,p=c.prototype;
    return LevelData;
}());
egret.registerClass(LevelData,'LevelData');
