/**
 * 网络常量
 * @author 
 *
 */
class NetConst {
    
    public static url: string = "http://192.168.1.103:3000"; //IP、端口号
    
    //-----------------发送数据----------------------
    public static C2S_login:string = "login";                //请求登录
    
    //-----------------接收数据----------------------
    public static S2C_barrage: string = "barrage";               //弹幕
    public static S2C_loginComplete: string = "loginComplete";   //登录完成
    public static S2C_userJoin: string = "userJoin";         //玩家加入
    public static S2C_userQuit: string = "userQuit";         //玩家退出
    public static S2C_gameStart: string = "gameStart";       //游戏开始
    public static S2C_eliminate: string = "eliminate";       //消除
    public static S2C_pro: string = "pro";                   //返回使用道具
    public static S2C_luckyMap: string = "luckMap";          //更换地图，玩家无可消除，随机地图
    public static S2C_mapData:string = "mapData";            //更换地图，下一关
    public static S2C_gameOver: string = "gameOver";         //游戏结束 
}
