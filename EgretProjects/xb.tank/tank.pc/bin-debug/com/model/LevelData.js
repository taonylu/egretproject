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
        this.friendBirthPos = [[4, 12], [8, 12]];
        /**敌方坦克生成点*/
        this.enemyBirthPos = [[0, 0], [6, 0], [12, 0]];
        /**道具数量*/
        this.itemNum = 0;
        this.shield = 0; //道具出现几率
        this.gun = 0;
        this.star = 0;
        this.armor = 0;
        this.life = 0;
        this.boom = 0;
        this.pause = 0;
    }
    var d = __define,c=LevelData,p=c.prototype;
    //初始化道具几率
    p.initItemChance = function () {
        this.gun += this.shield;
        this.star += this.gun;
        this.armor += this.star;
        this.life += this.armor;
        this.boom += this.life;
        this.pause += this.boom;
    };
    //根据道具出现几率，随机道具
    p.getRandomItem = function () {
        var rand = NumberTool.getRandomInt(0, 100);
        if (rand < this.shield) {
            return ItemEnum.shield;
        }
        else if (rand < this.gun) {
            return ItemEnum.gun;
        }
        else if (rand < this.star) {
            return ItemEnum.star;
        }
        else if (rand < this.armor) {
            return ItemEnum.armor;
        }
        else if (rand < this.life) {
            return ItemEnum.life;
        }
        else if (rand < this.boom) {
            return ItemEnum.boom;
        }
        else if (rand < this.pause) {
            return ItemEnum.pause;
        }
    };
    return LevelData;
}());
egret.registerClass(LevelData,'LevelData');
