/**
 * 游戏管理类
 * @author  陈凯
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();            //主页
    public editFaceScene:EditFaceScene = new EditFaceScene(); //编辑和上传照片
    public myTeamScene:MyTeamScene = new MyTeamScene();       //我的团队
    public rankScene:RankScene = new RankScene();             //排行榜
    public resultScene:ResultScene = new ResultScene();       //颜值结果界面
    
    
    //启动游戏框架
    public startup(main: Main): void {
        
        //配置全局变量
        GameConst.csrf = window["_csrf"];
        
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        //配置微信
        this.weixin();
        
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);  
    }
    

    private weixin(){
        //配置微信
        var bodyConfig: BodyConfig = new BodyConfig();
        bodyConfig.debug = window["wx_debug"];
        bodyConfig.appId = window["wx_appid"];
        bodyConfig.timestamp = window["wx_timestamp"];
        bodyConfig.nonceStr = window["wx_nonceStr"];
        bodyConfig.signature = window["wx_signature"];
        bodyConfig.jsApiList = ["onMenuShareTimeline","BodyMenuShareAppMessage","chooseImage",
            "uploadImage","downloadImage"];
        if(wx) {
            // 通过config接口注入权限验证配置
            wx.config(bodyConfig);
            
            //接口验证失败
            wx.error(function() {
                egret.log("接口验证失败");
            });
            
            //接口验证成功
            wx.ready(function() {
                //分享朋友圈
                var body: BodyMenuShareTimeline = new BodyMenuShareTimeline();
                wx.onMenuShareTimeline(body);
                body.title = "123";
                body.imgUrl = "http://egret5.sinaapp.com/Example/WeiXinExample/resource/assets/icon.jpg";
                body.link = "http://www.baidu.com";
                body.success = function() {
                    
                }

                //分享好友
                var bodyFriend: BodyMenuShareAppMessage = new BodyMenuShareAppMessage();
                wx.onMenuShareAppMessage(bodyFriend);
                bodyFriend.title = "分享给好友";
                bodyFriend.imgUrl = "http://egret5.sinaapp.com/Example/WeiXinExample/resource/assets/icon.jpg";
                bodyFriend.link = "http://www.baidu.com";
                bodyFriend.desc = "分享好友描述";
                bodyFriend.success = function() {
                    egret.log("分享好友");
                }
            });
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
