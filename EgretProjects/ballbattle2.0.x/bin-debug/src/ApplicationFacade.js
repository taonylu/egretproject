/**
*  文 件 名：ApplicationFacade.ts
*  功    能：Facade
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
var ApplicationFacade = (function (_super) {
    __extends(ApplicationFacade, _super);
    function ApplicationFacade() {
        _super.call(this);
    }
    var __egretProto__ = ApplicationFacade.prototype;
    ApplicationFacade.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ApplicationFacade();
        }
        return (this.instance);
    };
    __egretProto__.startup = function () {
        this.registerCommand(GameConst.START_UP, StartupCommand);
        this.sendNotification(GameConst.START_UP);
        this.removeCommand(GameConst.START_UP);
    };
    return ApplicationFacade;
})(puremvc.Facade);
ApplicationFacade.prototype.__class__ = "ApplicationFacade";
