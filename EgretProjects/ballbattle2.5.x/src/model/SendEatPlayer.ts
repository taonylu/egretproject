/**
 * 发送吃掉玩家
 * @author 
 *
 */
class SendEatPlayer {
    public cmd: number = 0;   
    public len: number = 0;
    public hunterid: number = 0;  //吃人的孢子id
    public foodid: number = 0;    //被吃的孢子id

    public toByteArray(): egret.ByteArray {
        var byteArray: egret.ByteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.hunterid);
        byteArray.writeInt(this.foodid);
        return byteArray;
    }
}
