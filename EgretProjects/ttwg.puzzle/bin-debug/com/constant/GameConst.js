/**
 *
 * @author
 *
 */
var GameConst = (function () {
    function GameConst() {
    }
    var d = __define,c=GameConst;p=c.prototype;
    GameConst.cellWidth = 80; //拼图被裁剪的方块大小
    GameConst.pieceScore = 10; //一个碎片的分值
    return GameConst;
})();
egret.registerClass(GameConst,"GameConst");
