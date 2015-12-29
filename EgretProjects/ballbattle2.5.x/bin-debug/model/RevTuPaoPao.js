/**
 * 接收吐泡泡技能
 * @author
 *
 */
var RevTuPaoPao = (function () {
    function RevTuPaoPao() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.userid = 0; //int 用户id
        this.paopaonum = 0; //short 吐出泡泡数量
        this.paopaolist = []; //[int,int][孢子id，泡泡id]
    }
    var d = __define,c=RevTuPaoPao;p=c.prototype;
    p.readData = function (byteArray) {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
        this.paopaonum = byteArray.readShort();
        for (var i = 0; i < this.paopaonum; i++) {
            var sporeid = byteArray.readInt();
            var paopaoid = byteArray.readInt();
            this.paopaolist.push([sporeid, paopaoid]);
        }
    };
    return RevTuPaoPao;
})();
egret.registerClass(RevTuPaoPao,"RevTuPaoPao");
