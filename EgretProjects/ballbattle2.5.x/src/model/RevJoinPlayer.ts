/**
 * 接收玩家加入
 * @author 羊力大仙
 */
class RevJoinPlayer {
    
    public cmd: number = 0;       //short
    public len: number = 0;       //short
    public userid: number = 0;    //int 用户id
    public username: string = ""; //string 用户名
    public weight: number = 0;    //int 体重
    public x: number = 0;         //double x坐标
    public y: number = 0;         //double y坐标
    public skinid: number = 0;    //byte 皮肤id
    public sporeid: number = 0;   //int 孢子id
    
    public readData(byteArray: egret.ByteArray): void {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
        this.username = byteArray.readUTF();
        this.weight = byteArray.readInt();
        this.x = byteArray.readDouble();
        this.y = byteArray.readDouble();
        this.skinid = byteArray.readByte();
        this.sporeid = byteArray.readInt();
    }
}
