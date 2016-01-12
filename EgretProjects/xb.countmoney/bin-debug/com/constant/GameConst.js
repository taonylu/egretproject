/**
 * 游戏常量
 * @author
 *
 */
var GameConst = (function () {
    function GameConst() {
    }
    var d = __define,c=GameConst,p=c.prototype;
    /**用户已获得的奖品数量*/
    GameConst.myPrizeNum = 0;
    GameConst.haveChance = true; //是否还有拆红包的机会
    GameConst.phone = ""; //用户输入的手机号码
    return GameConst;
})();
egret.registerClass(GameConst,'GameConst');
