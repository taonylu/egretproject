/**
 * 网络常量
 * @author 
 *
 */
class NetConst {
    
    public static url: string = "http://192.168.1.103:3000"; //IP、端口号
    
    //接收
    public static S2C_userInfo: string ="userInfo";      //用户信息
    public static S2C_mapData:string = "mapData";        //关卡地图数据
    public static S2C_pro: string = "pro";               //被施放道具
    public static S2C_gameOver: string = "gameOver";     //游戏结束
    
    //发送
    public static C2S_barrage: string = "barrage";       //发送弹幕
    public static C2S_upMap: string = "upMap";           //无可消除，随机地图，提交地图
    public static C2S_eliminate: string = "eliminate";   //玩家消除
    public static C2S_usePro: string = "usePro";         //玩家使用道具
    
}
