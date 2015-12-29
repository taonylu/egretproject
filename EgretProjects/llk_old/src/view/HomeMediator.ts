/**
*  文 件 名：HomeMediator.ts
*  功    能：开始页面
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
class HomeMediator extends puremvc.Mediator implements puremvc.IMediator,ISocketCallBack{
    public static NAME: string = "HomeSceneMediator";
    public static SHOW: string = "homeScene_show";
    public homeScene: HomeScene;
    
	public constructor() {
        super(HomeMediator.NAME);
        this.homeScene = new HomeScene();
	}
	
    public listNotificationInterests(): string[] { 
        return [HomeMediator.SHOW];
    }
    
    public handleNotification(notification: puremvc.INotification): void { 
        switch(notification.getName()) { 
            case HomeMediator.SHOW:
                ClientSocket.getInstance().setCallBack(this);
            LayerManager.getInstance().runScene(this.homeScene);
                break;
        }
    }
    
    public onSocketConnect(): void { 
        
    }
    
    public onSocketData(json): void { 
        var cmd: number = json.cmd;
        switch(cmd) { 
            case GameConst.S2C_LOGIN_SUCCES:
                this.loginSuccess(json);
                break;
        }
    }
    
    public onSocketError(): void { 
        
    }
    
    public onSocketClose(): void { 
        
    }
    
    private loginSuccess(json): void { 
        //读取用户数据
        var loginSuccesJson: LoginSuccessJSON = new LoginSuccessJSON();
        loginSuccesJson.readData(json);
        var userData:UserDataProxy = <UserDataProxy>this.facade.retrieveProxy(UserDataProxy.NAME);
        userData.userID = loginSuccesJson.userID;
        userData.userName = loginSuccesJson.userName;
        
        this.sendNotification(GameMediator.SHOW);
    }
    
}













