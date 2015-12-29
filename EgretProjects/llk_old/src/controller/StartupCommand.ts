/**
*  文 件 名：StartupCommand.ts
*  功    能： 启动命令
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/11
*  修改日志：
*/
class StartupCommand extends puremvc.SimpleCommand{
    public execute(notification: puremvc.INotification): void { 
        //初始化Mediator
        this.facade.registerMediator(new HomeMediator());
        this.facade.registerMediator(new GameMediator());
        
        //初始化Proxy
        this.facade.registerProxy(new UserDataProxy());
        
        
        
        
        //显示开始界面
        this.sendNotification(HomeMediator.SHOW);
    }
}
