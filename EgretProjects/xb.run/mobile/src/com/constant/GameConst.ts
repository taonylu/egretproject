/**
 *
 * @author 
 *
 */
class GameConst {
    /**舞台*/
	public static stage:egret.Stage;
	/**是否调试模式*/
	public static debug:boolean = false;
	/**校准位置X*/
	public static centerX:number = 0;
	/**校准位置Z*/
	public static centerZ:number = 0;
	
	public static gameConfig = {
        debug: true,    //是否本地调试模式
        subscribe:0,    //是否需要关注公众号才能游戏  0不需要 1需要
        picture:"",     //关注的公众号二维码图片地址
        openid:"",      //用户openid
        headimgurl:"",  //用户头像
        nickname:"",    //用户昵称
        server:"",      //服务器地址
        rid:""          //房间号 
	}
}
