/**
 *
 * @author
 *
 */
var GameManager = (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        _super.call(this);
    }
    var d = __define,c=GameManager,p=c.prototype;
    GameManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameManager();
        }
        return (this.instance);
    };
    p.startup = function () {
        console.log("game startup");
        this.registerCommand(GameConst.START_UP, StartupCommand);
        this.sendNotification(GameConst.START_UP);
        this.removeCommand(GameConst.START_UP);
    };
    return GameManager;
})(puremvc.Facade);
egret.registerClass(GameManager,'GameManager',["puremvc.IFacade","puremvc.INotifier"]);
