/**
*  文 件 名：LoadingSceneMediator.ts
*  功    能：加载场景
*  内    容：从主页进入游戏场景，加载游戏资源时，显示的加载界面
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
class LoadingMediator extends puremvc.Mediator implements puremvc.IMediator{
    public static NAME: string = "LoadingMediator";
    public static SHOW: string = "loading_show";
        
    public loadingScene:LoadingScene = new LoadingScene();
        
    public constructor() {
        super(LoadingMediator.NAME);
    }
    	
    public listNotificationInterests(): string[] { 
        return [LoadingMediator.SHOW];
    }
        
    public handleNotification(notification: puremvc.INotification): void { 
        switch(notification.getName()) { 
            case LoadingMediator.SHOW:
            this.show();
            break;
        }
    }
        
        
    public show(): void {
       // LayerManager.getInstance().runScene(this.loadingScene);
        //LoadManager.getInstance().loadGroup("game",this,this.onComplete,null,this.onError);
        //暂时将游戏资源加载合并到preload
        ApplicationFacade.getInstance().sendNotification(GameMediator.SHOW);
    }
        
    public hide(): void { 
        
    }
    
    private onComplete(): void { 
        console.log("load game complete...");
        //ApplicationFacade.getInstance().sendNotification(GameMediator.SHOW);
    }
    
    private onError(): void { 
        
    }
    	
}
        
        
        