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
        /**本关卡剩余坦克，保存的值为坦克类型，用于生成顺序*/
        this.tankList = [];
        /**敌方坦克同时存在上限*/
        this.tankLimit = 5;
        /**我方坦克生成点*/
        this.friendBirthPos = [[15, 6], [15, 11]];
        /**敌方坦克生成点*/
        this.enemyBirthPos = [[0, 0]];
    }
    var d = __define,c=LevelData,p=c.prototype;
    return LevelData;
}());
egret.registerClass(LevelData,'LevelData');
