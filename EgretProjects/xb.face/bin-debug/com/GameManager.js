/**
 * 游戏管理类
 * @author  陈凯
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.homeScene = new HomeScene(); //主页
        this.editFaceScene = new EditFaceScene(); //编辑和上传照片
        this.myTeamScene = new MyTeamScene(); //我的团队
        this.rankScene = new RankScene(); //排行榜
        this.resultScene = new ResultScene(); //颜值结果界面
    }
    var d = __define,c=GameManager,p=c.prototype;
    //启动游戏框架
    p.startup = function (main) {
        //配置全局变量
        GameConst.csrf = window["_csrf"];
        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        //配置微信
        this.weixin();
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
    };
    p.weixin = function () {
        //配置微信
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = window["wx_debug"];
        bodyConfig.appId = window["wx_appid"];
        bodyConfig.timestamp = window["wx_timestamp"];
        bodyConfig.nonceStr = window["wx_nonceStr"];
        bodyConfig.signature = window["wx_signature"];
        bodyConfig.jsApiList = ["onMenuShareTimeline", "BodyMenuShareAppMessage", "chooseImage",
            "uploadImage", "downloadImage"];
        if (wx) {
            // 通过config接口注入权限验证配置
            wx.config(bodyConfig);
            //接口验证失败
            wx.error(function () {
                egret.log("接口验证失败");
            });
            //接口验证成功
            wx.ready(function () {
                //分享朋友圈
                var body = new BodyMenuShareTimeline();
                wx.onMenuShareTimeline(body);
                body.title = "123";
                body.imgUrl = "http://egret5.sinaapp.com/Example/WeiXinExample/resource/assets/icon.jpg";
                body.link = "http://www.baidu.com";
                body.success = function () {
                };
                //分享好友
                var bodyFriend = new BodyMenuShareAppMessage();
                wx.onMenuShareAppMessage(bodyFriend);
                bodyFriend.title = "分享给好友";
                bodyFriend.imgUrl = "http://egret5.sinaapp.com/Example/WeiXinExample/resource/assets/icon.jpg";
                bodyFriend.link = "http://www.baidu.com";
                bodyFriend.desc = "分享好友描述";
                bodyFriend.success = function () {
                    egret.log("分享好友");
                };
            });
        }
    };
    GameManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    };
    return GameManager;
})();
egret.registerClass(GameManager,'GameManager');
