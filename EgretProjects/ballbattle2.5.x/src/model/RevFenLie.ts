/**
 * 接收分裂技能
 * @author 羊力大仙
 *
 */
class RevFenLie {
    public cmd: number = 0;  //short
    public len: number = 0;  //short
    public userid: number = 0;  //int
    public sporenum: number = 0; //short 分裂孢子数量
    public sporelist: Array<any> = []; //[int, int]  [原孢子id，新分裂的孢子id]
    
    public readData(byteArray: egret.ByteArray): void {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
        this.sporenum = byteArray.readShort();
        for(var i: number = 0;i < this.sporenum;i++) {
            var sporeid: number = byteArray.readInt();
            var newid:number = byteArray.readInt();
            this.sporelist.push([sporeid,newid]);
        }
    }
}
