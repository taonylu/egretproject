/**
 * 发送吐泡泡技能
 * @author 
 *
 */
class SendTuPaoPao {
    public cmd: number = 0;    //short
    public len: number = 0;    //short
    public userid: number = 0; //int
    
    public toByteArray(): egret.ByteArray {
        var byteArray: egret.ByteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.userid);
        return byteArray;
    }
}
