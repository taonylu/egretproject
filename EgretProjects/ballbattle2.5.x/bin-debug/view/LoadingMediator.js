/**
*  文 件 名：LoadingSceneMediator.ts
*  功    能：加载场景
*  内    容：从主页进入游戏场景，加载游戏资源时，显示的加载界面
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
var LoadingMediator = (function (_super) {
    __extends(LoadingMediator, _super);
    function LoadingMediator() {
        _super.call(this, LoadingMediator.NAME);
        this.loadingScene = new LoadingScene();
    }
    var d = __define,c=LoadingMediator;p=c.prototype;
    p.listNotificationInterests = function () {
        return [LoadingMediator.SHOW];
    };
    p.handleNotification = function (notification) {
        switch (notification.getName()) {
            case LoadingMediator.SHOW:
                this.show();
                break;
        }
    };
    p.show = function () {
        // LayerManager.getInstance().runScene(this.loadingScene);
        //LoadManager.getInstance().loadGroup("game",this,this.onComplete,null,this.onError);
        //暂时将游戏资源加载合并到preload
        ApplicationFacade.getInstance().sendNotification(GameMediator.SHOW);
    };
    p.hide = function () {
    };
    p.onComplete = function () {
        console.log("load game complete...");
        //ApplicationFacade.getInstance().sendNotification(GameMediator.SHOW);
    };
    p.onError = function () {
    };
    LoadingMediator.NAME = "LoadingMediator";
    LoadingMediator.SHOW = "loading_show";
    return LoadingMediator;
})(puremvc.Mediator);
egret.registerClass(LoadingMediator,"LoadingMediator",["puremvc.IMediator","puremvc.INotifier"]);
