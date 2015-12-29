/**
 * 发送玩家移动
 * @author 
 *
 */
class SendMovePlayer {
    public cmd: number = 0;       //short
    public len: number = 0;       //short
    public userid: number = 0;    //int    用户id
    public angle: number = 0;     //double 角度
    public sporenum: number = 0;  //short  玩家的孢子数
    public sporelist: Array<any> = []; //[int,double,double] [孢子id，x坐标，y坐标]
    
    public toByteArray(): egret.ByteArray {
        var byteArray: egret.ByteArray = new egret.ByteArray();
        byteArray.writeShort(this.cmd);
        byteArray.writeShort(this.len);
        byteArray.writeInt(this.userid);
        byteArray.writeDouble(this.angle);
        
        this.sporenum = this.sporelist.length;
        byteArray.writeShort(this.sporenum);
        for(var i: number = 0;i < this.sporenum;i++) {
            byteArray.writeInt(this.sporelist[i][0]);
            byteArray.writeDouble(this.sporelist[i][1]);
            byteArray.writeDouble(this.sporelist[i][2]);
        }
        
        return byteArray;
    }
}
