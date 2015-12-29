/**
 * 返回吃人
 * @author 羊力大仙
 *
 */
class RevEatPlayer{
    public cmd: number = 0; //short
    public len: number = 0; //short
    public hunterid: number = 0; //int,吃人的孢子id
    public foodid: number = 0;   //int,被吃的孢子id
    
    public readData(byteArray: egret.ByteArray): void {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.hunterid = byteArray.readInt();
        this.foodid = byteArray.readInt();
    }
}
