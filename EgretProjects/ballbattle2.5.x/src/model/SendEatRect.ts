/**
 * 发送吃方块
 * @author 
 *
 */
class SendEatRect {

    public cmd: number = 0;  //short
    public len: number = 0;  //short
    public hunterid: number = 0; //int 吃方块的孢子id
    public rectnum: number; //short 方块数量
    public rectlist: Array<any> = []; //short 方块id列表
    
  
    public toByteArray(): egret.ByteArray {
        var byteArray: egret.ByteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.hunterid);
        byteArray.writeShort(this.rectnum);
        for(var i: number = 0;i < this.rectnum;i++) {
            byteArray.writeShort(this.rectlist[i]);
        }
        return byteArray;
    }
    
}
