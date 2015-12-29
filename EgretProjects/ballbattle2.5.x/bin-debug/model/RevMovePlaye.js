/**
 * 接收玩家移动
 * @author 羊力大仙
 *
 */
var RevMovePlayer = (function () {
    function RevMovePlayer() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.userid = 0; //int      用户id
        this.angle = 0; //double   角度
        this.sporenum = 0; //short   孢子数
        this.sporelist = []; //[int ,double, double] [孢子id，x，y]
    }
    var d = __define,c=RevMovePlayer;p=c.prototype;
    p.readData = function (byteArray) {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
        this.angle = byteArray.readDouble();
        this.sporenum = byteArray.readShort();
        for (var i = 0; i < this.sporenum; i++) {
            var sporeid = byteArray.readInt();
            var x = byteArray.readDouble();
            var y = byteArray.readDouble();
            this.sporelist.push([sporeid, x, y]);
        }
    };
    return RevMovePlayer;
})();
egret.registerClass(RevMovePlayer,"RevMovePlayer");
