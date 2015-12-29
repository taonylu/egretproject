/**
 * 发送吐泡泡技能
 * @author
 *
 */
var SendTuPaoPao = (function () {
    function SendTuPaoPao() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.userid = 0; //int
    }
    var d = __define,c=SendTuPaoPao;p=c.prototype;
    p.toByteArray = function () {
        var byteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.userid);
        return byteArray;
    };
    return SendTuPaoPao;
})();
egret.registerClass(SendTuPaoPao,"SendTuPaoPao");
