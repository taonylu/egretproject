/**
 * 接收吃泡泡
 * @author 羊力大仙
 *
 */
var RevEatPaoPao = (function () {
    function RevEatPaoPao() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.hunterid = 0; //int 吃泡泡的孢子id
        this.paopaoid = 0; //int 泡泡id
    }
    var d = __define,c=RevEatPaoPao;p=c.prototype;
    p.readData = function (byteArray) {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.hunterid = byteArray.readInt();
        this.paopaoid = byteArray.readInt();
    };
    return RevEatPaoPao;
})();
egret.registerClass(RevEatPaoPao,"RevEatPaoPao");
