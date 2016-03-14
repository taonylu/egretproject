/**
 *
 * @author
 *
 */
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        _super.call(this);
    }
    var d = __define,c=GameApp,p=c.prototype;
    GameApp.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameApp();
        }
        return (this.instance);
    };
    p.startup = function () {
        this.registerCommand(GameConst.START_UP, StartupCommand);
        this.sendNotification(GameConst.START_UP);
        this.removeCommand(GameConst.START_UP);
    };
    return GameApp;
})(puremvc.Facade);
egret.registerClass(GameApp,'GameApp',["puremvc.IFacade","puremvc.INotifier"]);
