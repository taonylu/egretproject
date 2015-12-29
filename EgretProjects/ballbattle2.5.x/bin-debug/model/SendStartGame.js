/**
 * 发送开始游戏包
 * @author
 *
 */
var SendStartGame = (function () {
    function SendStartGame() {
        this.cmd = 0; //short
        this.len = 0; //short
        this.usertype = 0; //byte   用户类型 0游客 1注册用户
        this.userid = 0; //int    用户id
        this.username = ""; //string 用户昵称
        this.skinid = 0; //byte   皮肤id
    }
    var d = __define,c=SendStartGame;p=c.prototype;
    p.getByteArray = function () {
        var byteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeByte(this.usertype);
        byteArray.writeInt(this.userid);
        byteArray.writeUTF(this.username);
        byteArray.writeByte(this.skinid);
        return byteArray;
    };
    return SendStartGame;
})();
egret.registerClass(SendStartGame,"SendStartGame");
