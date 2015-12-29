/**
 * 发送分裂
 * @author 羊力大仙
 *
 */
var SendFenLie = (function () {
    function SendFenLie() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.userid = 0; //int
    }
    var d = __define,c=SendFenLie;p=c.prototype;
    p.toByteArray = function () {
        var byteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.userid);
        return byteArray;
    };
    return SendFenLie;
})();
egret.registerClass(SendFenLie,"SendFenLie");
