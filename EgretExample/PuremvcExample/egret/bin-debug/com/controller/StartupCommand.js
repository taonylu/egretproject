/**
 *
 * @author
 *
 */
var StartupCommand = (function (_super) {
    __extends(StartupCommand, _super);
    function StartupCommand() {
        _super.apply(this, arguments);
    }
    var d = __define,c=StartupCommand,p=c.prototype;
    p.execute = function (notification) {
        console.log("execute startupcommand");
        //Command
        this.facade.registerCommand(GameConst.Mutile, MutileCommand);
        this.facade.registerCommand(GameConst.Attack, AttackCommand);
        //Proxy
        this.facade.registerProxy(new StartGameProxy());
        //Mediator
        this.facade.registerMediator(new HomeMediator());
        //显示主页场景
        this.sendNotification(HomeMediator.SHOW);
        //发送多命令
        this.sendNotification(GameConst.Mutile);
    };
    return StartupCommand;
})(puremvc.SimpleCommand);
egret.registerClass(StartupCommand,'StartupCommand');
