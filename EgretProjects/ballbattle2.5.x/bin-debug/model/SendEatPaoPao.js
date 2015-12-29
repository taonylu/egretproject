/**
 * 发送吃泡泡
 * @author 羊力大仙
 *
 */
var SendEatPaoPao = (function () {
    function SendEatPaoPao() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.hunterid = 0; //int 吃泡泡的孢子id
        this.paopaoid = 0; //int 泡泡id
    }
    var d = __define,c=SendEatPaoPao;p=c.prototype;
    p.toByteArray = function () {
        var byteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.hunterid);
        byteArray.writeInt(this.paopaoid);
        return byteArray;
    };
    return SendEatPaoPao;
})();
egret.registerClass(SendEatPaoPao,"SendEatPaoPao");
