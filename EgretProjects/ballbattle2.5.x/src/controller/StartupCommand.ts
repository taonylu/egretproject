/**
*  文 件 名：StartupCommand.ts
*  功    能：启动命令
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
class StartupCommand extends puremvc.SimpleCommand{
    
    public execute(notification: puremvc.INotification): void { 
        //Command

        //Proxy
        this.facade.registerProxy(new RevStartGame());
        
        //Mediator
        this.facade.registerMediator(new HomeMediator());
        this.facade.registerMediator(new LoadingMediator());
        this.facade.registerMediator(new GameMediator());

        //显示主页场景
        this.sendNotification(HomeMediator.SHOW);
        
    }
    
}
