/**
 * 接收分裂技能
 * @author 羊力大仙
 *
 */
var RevFenLie = (function () {
    function RevFenLie() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.userid = 0; //int
        this.sporenum = 0; //short 分裂孢子数量
        this.sporelist = []; //[int, int]  [原孢子id，新分裂的孢子id]
    }
    var d = __define,c=RevFenLie;p=c.prototype;
    p.readData = function (byteArray) {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
        this.sporenum = byteArray.readShort();
        for (var i = 0; i < this.sporenum; i++) {
            var sporeid = byteArray.readInt();
            var newid = byteArray.readInt();
            this.sporelist.push([sporeid, newid]);
        }
    };
    return RevFenLie;
})();
egret.registerClass(RevFenLie,"RevFenLie");
