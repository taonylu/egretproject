/**
 * 返回吃人
 * @author 羊力大仙
 *
 */
var RevEatPlayer = (function () {
    function RevEatPlayer() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.hunterid = 0; //int,吃人的孢子id
        this.foodid = 0; //int,被吃的孢子id
    }
    var d = __define,c=RevEatPlayer;p=c.prototype;
    p.readData = function (byteArray) {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.hunterid = byteArray.readInt();
        this.foodid = byteArray.readInt();
    };
    return RevEatPlayer;
})();
egret.registerClass(RevEatPlayer,"RevEatPlayer");
