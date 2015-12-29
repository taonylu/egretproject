/**
 * 接收生成新的方块
 * @author 羊力大仙
 */
class RevCreateRect {
    
    public cmd: number = 0;           //short 
    public len: number = 0;           //short
    public rectnum: number = 0;       //short 方块数量
    public rectlist: Array<any> = []; //[short double double] [方块id，x坐标，y坐标]
    
    public readData(byteArray: egret.ByteArray): void {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.rectnum = byteArray.readShort();
        for(var i: number = 0;i < this.rectnum;i++) {
            var rectid: number = byteArray.readShort();
            var x: number = byteArray.readDouble();
            var y: number = byteArray.readDouble();
            this.rectlist.push([rectid,x,y]);
        }
    }
    
}
