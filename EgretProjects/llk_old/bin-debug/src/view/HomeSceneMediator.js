/**
*  文 件 名：HomeSceneMediator.ts
*  功    能：开始页面
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
var HomeSceneMediator = (function (_super) {
    __extends(HomeSceneMediator, _super);
    function HomeSceneMediator() {
        _super.call(this, HomeSceneMediator.NAME);
        this.homeScene = new HomeScene();
    }
    var __egretProto__ = HomeSceneMediator.prototype;
    __egretProto__.listNotificationInterests = function () {
        return [HomeSceneMediator.SHOW];
    };
    __egretProto__.handleNotification = function (notification) {
        switch (notification.getName()) {
            case HomeSceneMediator.SHOW:
                LayerManager.getInstance().runScene(this.homeScene);
                break;
        }
    };
    HomeSceneMediator.NAME = "HomeSceneMediator";
    HomeSceneMediator.SHOW = "homeScene_show";
    return HomeSceneMediator;
})(puremvc.Mediator);
HomeSceneMediator.prototype.__class__ = "HomeSceneMediator";
