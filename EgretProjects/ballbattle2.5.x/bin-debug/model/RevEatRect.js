/**
 * 返回吃方块
 * @author
 *
 */
var RevEatRect = (function () {
    function RevEatRect() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.hunterid = 0; //int   吃方块的孢子id
        this.rectnum = 0; //short 被吃掉的方块数量
        this.rectlist = []; //short 被吃掉的方块id列表
    }
    var d = __define,c=RevEatRect;p=c.prototype;
    p.readData = function (byteArray) {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.hunterid = byteArray.readInt();
        this.rectnum = byteArray.readShort();
        for (var i = 0; i < this.rectnum; i++) {
            this.rectlist.push(byteArray.readShort());
        }
    };
    return RevEatRect;
})();
egret.registerClass(RevEatRect,"RevEatRect");
