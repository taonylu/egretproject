/**
 * 发送吃方块
 * @author
 *
 */
var SendEatRect = (function () {
    function SendEatRect() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.hunterid = 0; //int 吃方块的孢子id
        this.rectlist = []; //short 方块id列表
    }
    var d = __define,c=SendEatRect;p=c.prototype;
    p.toByteArray = function () {
        var byteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.hunterid);
        byteArray.writeShort(this.rectnum);
        for (var i = 0; i < this.rectnum; i++) {
            byteArray.writeShort(this.rectlist[i]);
        }
        return byteArray;
    };
    return SendEatRect;
})();
egret.registerClass(SendEatRect,"SendEatRect");
