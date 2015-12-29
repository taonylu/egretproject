/**
 * 发送吃泡泡
 * @author 羊力大仙
 *
 */
class SendEatPaoPao{
    
    public cmd: number = 0;   //short
    public len: number = 0;   //short
    public hunterid:number = 0   //int 吃泡泡的孢子id
    public paopaoid: number = 0; //int 泡泡id
    
    public toByteArray(): egret.ByteArray {
        var byteArray: egret.ByteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.hunterid);
        byteArray.writeInt(this.paopaoid);
        return byteArray;
    }
}
