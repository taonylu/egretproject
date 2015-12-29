/**
 * 接收玩家离开
 * @author 
 *
 */
class RevPlayerLeave {
    
    public cmd: number = 0;    //short
    public len: number = 0;    //short
    public userid: number = 0; //int

    public readData(byteArray: egret.ByteArray): void {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
    }
}
