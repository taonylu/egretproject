/**
 * 接收吐泡泡技能
 * @author 
 *
 */
class RevTuPaoPao {
    public cmd: number = 0;   //short
    public len: number = 0;   //short
    public userid: number = 0; //int 用户id
    public paopaonum: number = 0; //short 吐出泡泡数量
    public paopaolist: Array<any> = []; //[int,int][孢子id，泡泡id]
    
    public readData(byteArray: egret.ByteArray): void {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
        this.paopaonum = byteArray.readShort();
        for(var i: number = 0;i < this.paopaonum;i++) {
            var sporeid: number = byteArray.readInt();
            var paopaoid: number = byteArray.readInt();
            this.paopaolist.push([sporeid,paopaoid]);
        }
    }
    
}
