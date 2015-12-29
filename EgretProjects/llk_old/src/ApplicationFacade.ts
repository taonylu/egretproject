/**
*  文 件 名：ApplicationFacade.ts
*  功    能： Facade主类
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
class ApplicationFacade extends puremvc.Facade implements puremvc.IFacade{
    
    public constructor() { 
        super();
    }
    
    public static getInstance(): ApplicationFacade { 
        if(this.instance == null) { 
            this.instance = new ApplicationFacade();
        }
        return <ApplicationFacade>(this.instance);
    }
    
    public startup(): void { 
        this.registerCommand(GameConst.CMD_StartUp,StartupCommand);
        this.sendNotification(GameConst.CMD_StartUp);
        this.removeCommand(GameConst.CMD_StartUp);
    }
}
