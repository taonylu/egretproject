/**
 * 接收玩家离开
 * @author
 *
 */
var RevPlayerLeave = (function () {
    function RevPlayerLeave() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.userid = 0; //int
    }
    var d = __define,c=RevPlayerLeave;p=c.prototype;
    p.readData = function (byteArray) {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
    };
    return RevPlayerLeave;
})();
egret.registerClass(RevPlayerLeave,"RevPlayerLeave");
