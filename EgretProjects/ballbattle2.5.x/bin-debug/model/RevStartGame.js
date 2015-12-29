/**
 * 接收开始游戏数据包
 * @author
 *
 */
var RevStartGame = (function (_super) {
    __extends(RevStartGame, _super);
    function RevStartGame() {
        _super.call(this, RevStartGame.NAME);
        this.cmd = 0; //short
        this.len = 0; //short
        this.userid = 0; //int 玩家自己id
        this.username = ""; //string 玩家自己昵称
        this.weight = 0; //int 玩家自己体重
        this.x = 0; //double 玩家自己x坐标
        this.y = 0; //double 玩家自己y坐标
        this.skinid = 0; //byte 玩家自己皮肤id
        this.sporeid = 0; //int 玩家自己孢子id
        this.rectnum = 0; //short 方块数量
        this.rectlist = []; //[int,double,double] [方块id，坐标x，坐标y]
        this.playernum = 0; //short 玩家人数
        this.playerlist = []; //[int,string,int,byte,double,double,int][用户id,用户名,体重,皮肤id,x,y,孢子id]
        this.errorcode = 0; //byte 错误码
    }
    var d = __define,c=RevStartGame;p=c.prototype;
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
        this.rectnum = byteArray.readShort();
        this.rectlist.length = 0;
        for (var i = 0; i < this.rectnum; i++) {
            var rectid = byteArray.readInt();
            var rectX = byteArray.readDouble();
            var rectY = byteArray.readDouble();
            this.rectlist.push([rectid, rectX, rectY]);
        }
        this.playernum = byteArray.readShort();
        this.playerlist.length = 0;
        for (i = 0; i < this.rectnum; i++) {
            var userid = byteArray.readInt();
            var username = byteArray.readUTF();
            var weight = byteArray.readInt();
            var skinid = byteArray.readByte();
            var playerX = byteArray.readDouble();
            var playerY = byteArray.readDouble();
            var sporeid = byteArray.readInt();
            this.playerlist.push([userid, username, weight, skinid, playerX, playerY, sporeid]);
        }
    };
    RevStartGame.NAME = "RevStartGame";
    return RevStartGame;
})(puremvc.Proxy);
egret.registerClass(RevStartGame,"RevStartGame",["puremvc.IProxy","puremvc.INotifier"]);
