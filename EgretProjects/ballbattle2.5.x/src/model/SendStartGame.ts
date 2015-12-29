/**
 * 发送开始游戏包
 * @author 
 *
 */
class SendStartGame{
    public cmd: number = 0;       //short
    public len: number = 0;       //short
    public usertype: number = 0;  //byte   用户类型 0游客 1注册用户
    public userid: number = 0;    //int    用户id
    public username: string = ""; //string 用户昵称
    public skinid: number = 0;    //byte   皮肤id

    public getByteArray(): egret.ByteArray { 
        var byteArray: egret.ByteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeByte(this.usertype);
        byteArray.writeInt(this.userid);
        byteArray.writeUTF(this.username);
        byteArray.writeByte(this.skinid);
        return byteArray;
    }
}
