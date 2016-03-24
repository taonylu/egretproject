/**
 * 游戏管理类
 * @author  陈凯
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    public resultScene:ResultScene = new ResultScene(); //结算页面
    
    public rulePanel: RulePanel = new RulePanel();   //游戏规则
    public prizePanel:PrizePanel = new PrizePanel(); //获奖名单
    public rankPanel:RankPanel = new RankPanel();    //排行榜
    public teamForm: TeamForm = new TeamForm();      //创建团队
    public sharePanel:SharePanel = new SharePanel(); //分享
    public myTeamPanel: MyTeamPanel = new MyTeamPanel(); //我的团队
    public luckForm:LuckForm = new LuckForm();       //中奖页面
    
    //启动游戏框架
    public startup(main: Main): void {
        //配置全局变量
        GameConst.csrf = window["csrf"];  //验证码
        GameConst.myName = window["nickName"]; //我自己名字
        egret.log("myName:",GameConst.myName);
        
        //是否被邀请组队
        if(GameConst.debug){
            GameConst.invitInfo.isInvit = 1;
            GameConst.invitInfo.nickName = "XXXX";
            GameConst.invitInfo.teamName = "XXXX";
        }else{
            //TODO获取实际参数
            GameConst.invitInfo = window["invitInfo"];
        }
        egret.log("invitInfo:",GameConst.invitInfo.isInvit,GameConst.invitInfo.nickName,
            GameConst.invitInfo.teamName);
            
        //配置重力感应
        window["GM"] = this;

        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);  
        
    }
    
    public onOrientation(orientation){
        //重力感应  0竖屏 90 -90横屏
        egret.log(orientation);
        GameConst.orientation = orientation;
        if(this.resultScene.parent){   //旋转后，更改二维码点击范围图片的位置
            this.resultScene.showCode();
        }
        if(this.sharePanel.parent){   //旋转后，更改分享的箭头位置
            this.sharePanel.onEnable();
        }
    }
    
    //获取单例
    private static instance: GameManager;
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
}
