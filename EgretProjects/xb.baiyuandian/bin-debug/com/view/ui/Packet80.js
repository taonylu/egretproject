/**
 * 红包80
 * @author
 *
 */
var Packet80 = (function (_super) {
    __extends(Packet80, _super);
    function Packet80() {
        _super.call(this, "Packet80", 80, RES.getRes("packet80_png"), RES.getRes("packetbg"));
    }
    var d = __define,c=Packet80,p=c.prototype;
    return Packet80;
})(BasePacket);
egret.registerClass(Packet80,'Packet80');
