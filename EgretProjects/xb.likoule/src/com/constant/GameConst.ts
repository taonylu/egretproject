/**
 *
 * @author 
 *
 */
class GameConst {
	public static stage:egret.Stage;   //舞台
    public static orientation = 0;     //0竖屏
    public static csrf;                //验证码
    public static teamName = "";       //首页团队比拼时，创建的队伍
    public static debug:Boolean = true;//是否本地调试模式
    
    public static invitInfo =   //邀请信息，打开游戏页面时，由后台传来
        {        
            isInvit:true,  //是否被邀请
            name:"",     //发发出邀请人的名字
            teamName:""  //组建的队伍名字
       };  
}
