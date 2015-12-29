/**
 * 接收玩家加入
 * @author 羊力大仙
 */
var RevJoinPlayer = (function () {
    function RevJoinPlayer() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.userid = 0; //int 用户id
        this.username = ""; //string 用户名
        this.weight = 0; //int 体重
        this.x = 0; //double x坐标
        this.y = 0; //double y坐标
        this.skinid = 0; //byte 皮肤id
        this.sporeid = 0; //int 孢子id
    }
    var d = __define,c=RevJoinPlayer;p=c.prototype;
    p.readData = function (byteArray) {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
        this.username = byteArray.readUTF();
        this.weight = byteArray.readInt();
        this.x = byteArray.readDouble();
        this.y = byteArray.readDouble();
        this.skinid = byteArray.readByte();
        this.sporeid = byteArray.readInt();
    };
    return RevJoinPlayer;
})();
egret.registerClass(RevJoinPlayer,"RevJoinPlayer");
