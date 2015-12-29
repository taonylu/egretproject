/**
 * 发送玩家移动
 * @author
 *
 */
var SendMovePlayer = (function () {
    function SendMovePlayer() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.userid = 0; //int    用户id
        this.angle = 0; //double 角度
        this.sporenum = 0; //short  玩家的孢子数
        this.sporelist = []; //[int,double,double] [孢子id，x坐标，y坐标]
    }
    var d = __define,c=SendMovePlayer;p=c.prototype;
    p.toByteArray = function () {
        var byteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.userid);
        byteArray.writeDouble(this.angle);
        this.sporenum = this.sporelist.length;
        byteArray.writeShort(this.sporenum);
        for (var i = 0; i < this.sporenum; i++) {
            byteArray.writeInt(this.sporelist[i][0]);
            byteArray.writeDouble(this.sporelist[i][1]);
            byteArray.writeDouble(this.sporelist[i][2]);
        }
        return byteArray;
    };
    return SendMovePlayer;
})();
egret.registerClass(SendMovePlayer,"SendMovePlayer");
