/**
 * 接收吃泡泡
 * @author 羊力大仙
 *
 */
class RevEatPaoPao {

    public cmd: number = 0;      //short
    public len: number = 0;      //short
    public hunterid: number = 0; //int 吃泡泡的孢子id
    public paopaoid: number = 0; //int 泡泡id
    
    public readData(byteArray: egret.ByteArray): void {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.hunterid = byteArray.readInt();
        this.paopaoid = byteArray.readInt();
    }
}
