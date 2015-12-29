/**
*  文 件 名：StartupCommand.ts
*  功    能：启动命令
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
var StartupCommand = (function (_super) {
    __extends(StartupCommand, _super);
    function StartupCommand() {
        _super.apply(this, arguments);
    }
    var __egretProto__ = StartupCommand.prototype;
    __egretProto__.execute = function (notification) {
        //Command
        //Proxy
        //Mediator
        this.facade.registerMediator(new HomeMediator());
        this.facade.registerMediator(new LoadingMediator());
        this.facade.registerMediator(new GameMediator());
        //显示主页场景
        this.sendNotification(HomeMediator.SHOW);
    };
    return StartupCommand;
})(puremvc.SimpleCommand);
StartupCommand.prototype.__class__ = "StartupCommand";
