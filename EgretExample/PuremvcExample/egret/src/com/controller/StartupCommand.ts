/**
 *
 * @author 
 *
 */
class StartupCommand extends puremvc.SimpleCommand {

    public execute(notification: puremvc.INotification): void { 
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

    }

}
