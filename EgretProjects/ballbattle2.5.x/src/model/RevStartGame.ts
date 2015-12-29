/**
 * 接收开始游戏数据包
 * @author 
 *
 */
class RevStartGame extends puremvc.Proxy implements puremvc.IProxy{
    public static NAME: string = "RevStartGame";
    
    public cmd: number = 0;       //short
    public len: number = 0;       //short
    public userid: number = 0;    //int 玩家自己id
    public username: string = ""; //string 玩家自己昵称
    public weight: number = 0;    //int 玩家自己体重
    public x: number = 0;         //double 玩家自己x坐标
    public y: number = 0;         //double 玩家自己y坐标
    public skinid: number = 0;    //byte 玩家自己皮肤id
    public sporeid: number = 0;   //int 玩家自己孢子id
    public rectnum: number = 0;   //short 方块数量
    public rectlist: Array<any> = []; //[int,double,double] [方块id，坐标x，坐标y]
    public playernum: number = 0; //short 玩家人数
    public playerlist: Array<any> = [];//[int,string,int,byte,double,double,int][用户id,用户名,体重,皮肤id,x,y,孢子id]
    public errorcode: number = 0; //byte 错误码
    
    public constructor() { 
        super(RevStartGame.NAME);
    }
    
    public readData(byteArray: egret.ByteArray): void {
        this.cmd = byteArray.readShort();
        this.len = byteArray.readShort();
        this.userid = byteArray.readInt();
        this.username = byteArray.readUTF();
        this.weight = byteArray.readInt();
        this.x = byteArray.readDouble();
        this.y = byteArray.readDouble();
        this.skinid = byteArray.readByte();
        this.sporeid = byteArray.readInt();
        
        this.rectnum = byteArray.readShort();
        this.rectlist.length = 0;
        for(var i: number = 0;i < this.rectnum;i++) {
            var rectid: number = byteArray.readInt();
            var rectX: number = byteArray.readDouble();
            var rectY: number = byteArray.readDouble();
            this.rectlist.push([rectid,rectX,rectY]);
        }
        
        this.playernum = byteArray.readShort();
        this.playerlist.length = 0;
        for(i = 0;i < this.rectnum;i++) {
            var userid:number = byteArray.readInt();
            var username:string = byteArray.readUTF();
            var weight: number = byteArray.readInt();
            var skinid: number = byteArray.readByte();
            var playerX: number = byteArray.readDouble();
            var playerY: number = byteArray.readDouble();
            var sporeid: number = byteArray.readInt();
            this.playerlist.push([userid,username,weight,skinid,playerX,playerY,sporeid]);
        }
    }
}












