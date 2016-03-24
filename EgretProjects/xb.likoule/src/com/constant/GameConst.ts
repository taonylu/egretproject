/**
 *
 * @author 
 *
 */
class GameConst {
	public static stage:egret.Stage;   //舞台
    public static orientation = 0;     //0竖屏
    public static csrf;                //验证码
    public static teamName = "";       //首页组队比拼时，创建的队伍名，用于分享
    public static debug:Boolean = false;//是否本地调试模式
    public static prizeLastView;       //获奖名单的上一级视图，临时用于记录，用于返回时显示
    public static myName = "";         //我自己的名字
    
    public static invitInfo =   //邀请信息，打开游戏页面时，由后台传来
        {        
            isInvit:0,  //是否被邀请
            nickName:"",     //发发出邀请人的名字
            teamName:""  //组建的队伍名字
       };  
}
