/**
 * 发送吃掉玩家
 * @author
 *
 */
var SendEatPlayer = (function () {
    function SendEatPlayer() {
        this.cmd = 0;
        this.len = 0;
        this.hunterid = 0; //吃人的孢子id
        this.foodid = 0; //被吃的孢子id
    }
    var d = __define,c=SendEatPlayer;p=c.prototype;
    p.toByteArray = function () {
        var byteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.hunterid);
        byteArray.writeInt(this.foodid);
        return byteArray;
    };
    return SendEatPlayer;
})();
egret.registerClass(SendEatPlayer,"SendEatPlayer");
