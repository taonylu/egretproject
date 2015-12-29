/**
 * 接收生成新的方块
 * @author 羊力大仙
 */
var RevCreateRect = (function () {
    function RevCreateRect() {
        this.cmd = 0; //short 
        this.len = 0; //short
        this.rectnum = 0; //short 方块数量
        this.rectlist = []; //[short double double] [方块id，x坐标，y坐标]
    }
    var d = __define,c=RevCreateRect;p=c.prototype;
    p.readData = function (byteArray) {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.rectnum = byteArray.readShort();
        for (var i = 0; i < this.rectnum; i++) {
            var rectid = byteArray.readShort();
            var x = byteArray.readDouble();
            var y = byteArray.readDouble();
            this.rectlist.push([rectid, x, y]);
        }
    };
    return RevCreateRect;
})();
egret.registerClass(RevCreateRect,"RevCreateRect");
