/**
*  文 件 名：ApplicationFacade.ts
*  功    能：Facade
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
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
        this.registerCommand(GameConst.START_UP,StartupCommand);
        this.sendNotification(GameConst.START_UP);
        this.removeCommand(GameConst.START_UP);
    }
	
	
}
