/**
*  文 件 名：HomeMediator.ts
*  功    能：主页场景
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/23
*  修改日志：
*/
class HomeMediator extends puremvc.Mediator implements puremvc.IMediator,ISocketHand{
    public static NAME: string = "HomeMediator";
    public static SHOW: string = "HomeMediator_SHOW";
    public static SEND_START_REQUEST = "SEND_START_REQUEST";
    public static SHOW_POPUPBOXUI = "SHOW_POPUPBOXUI";
    
    
    public homeScene: HomeScene = new HomeScene();
    public popupBoxUI: PopupBoxUI = new PopupBoxUI();
    
	public constructor() {
        super(HomeMediator.NAME);
	}

    public listNotificationInterests(): string[] { 
        return [HomeMediator.SHOW,
                HomeMediator.SEND_START_REQUEST,
                HomeMediator.SHOW_POPUPBOXUI];
    }
    
    public handleNotification(notification: puremvc.INotification): void { 
        switch(notification.getName()) { 
            case HomeMediator.SHOW:
                this.show();
                break;
            case HomeMediator.SEND_START_REQUEST:
                this.sendStartRequest();
                break;
            case HomeMediator.SHOW_POPUPBOXUI:
                this.popupBoxUI.showMsg(notification.getBody());
                break;
        }
    }

    public show(): void {
        LayerManager.getInstance().runScene(this.homeScene);
        ClientSocket.getInstance().setSocketHand(this);
    }
    
    public hide(): void { 

    }
    
    public onSocketConnect(): void { 
        this.homeScene.loadingUI.hide();
    }
    
    public onSocketError(): void { 
        this.homeScene.loadingUI.hide();    
        this.popupBoxUI.showMsg("网络连接错误...");
    }
            
    public onSocketClose(): void { 
        this.homeScene.loadingUI.hide();     
    }
    
    public onSocketConnectTimeOver(): void { 
        this.popupBoxUI.showMsg("网络连接超时...");
    }
    
    public onSocketData(json): void { 
        switch(json.cmd) { 
            case NetConst.START_REQUEST:    //返回开始游戏请求
                this.revStartGame(json);
                break;
            case NetConst.LOGIN_REQUEST:    //返回登录请求
                this.revloginReturn(json);
                break;
        }
    }

    private sendStartRequest():void{
        var userName: string = this.homeScene.nameLabel.text;
        var userM:UserManager = UserManager.getInstance();
        userM.userName = userName;

        var json = JSONManager.getInstance().startRequset;
        json.cmd = NetConst.START_REQUEST;
        json.usertype = userM.userType;
        json.userid = userM.userID;
        json.username = StringTool.mixToUnicode(userName);
        json.skinid = NumberTool.getRandomInt(1,GameConst.SkinKindCount);

        ClientSocket.getInstance().send(json);

    }

    private revStartGame(json): void {
        if(json.errorcode == 0) {  //成功
            ClientSocket.getInstance().setSocketHand(<GameMediator>this.facade.retrieveMediator(GameMediator.NAME));
            JSONManager.getInstance().gameData = json;
            UserManager.getInstance().userID = json.hero[0];
            this.sendNotification(LoadingMediator.SHOW);
        } else {
            this.popupBoxUI.showMsg("开始游戏失败...");
        }
    }

    private revloginReturn(json): void {
        console.log("返回登录:",json.cmd,json.success,json.errorcode);
    }


}










