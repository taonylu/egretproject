/**
 * 返回吃方块
 * @author 
 *
 */
class RevEatRect{

    public cmd: number = 0;           //short
    public len: number = 0;           //short
    public hunterid: number = 0;      //int   吃方块的孢子id
    public rectnum: number = 0;       //short 被吃掉的方块数量
    public rectlist: Array<any> = []; //short 被吃掉的方块id列表
    
    public readData(byteArray: egret.ByteArray): void {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.hunterid = byteArray.readInt();
        this.rectnum = byteArray.readShort();
        for(var i: number = 0;i < this.rectnum;i++) {
            this.rectlist.push(byteArray.readShort());
        }
    }
}
