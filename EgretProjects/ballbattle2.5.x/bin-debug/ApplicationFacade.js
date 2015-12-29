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
    var d = __define,c=ApplicationFacade;p=c.prototype;
    ApplicationFacade.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ApplicationFacade();
        }
        return (this.instance);
    };
    p.startup = function () {
        this.registerCommand(GameConst.START_UP, StartupCommand);
        this.sendNotification(GameConst.START_UP);
        this.removeCommand(GameConst.START_UP);
    };
    return ApplicationFacade;
})(puremvc.Facade);
egret.registerClass(ApplicationFacade,"ApplicationFacade",["puremvc.IFacade","puremvc.INotifier"]);
