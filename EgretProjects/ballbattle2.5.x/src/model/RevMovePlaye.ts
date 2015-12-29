/**
 * 接收玩家移动
 * @author 羊力大仙
 *
 */
class RevMovePlayer {
    
    public cmd: number = 0;    //short
    public len: number = 0;    //short
    public userid: number = 0; //int      用户id
    public angle: number = 0;  //double   角度
    public sporenum: number = 0;//short   孢子数
    public sporelist: Array<any> = [];  //[int ,double, double] [孢子id，x，y]
    
    public readData(byteArray: egret.ByteArray): void {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
        this.angle = byteArray.readDouble();
        this.sporenum = byteArray.readShort();
        
        for(var i: number = 0;i < this.sporenum;i++) {
            var sporeid: number = byteArray.readInt();
            var x: number = byteArray.readDouble();
            var y: number = byteArray.readDouble();
            this.sporelist.push([sporeid,x,y]);
        }
    }
}
