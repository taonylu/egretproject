/**
*  文 件 名：GameMediator.ts
*  功    能：游戏页面
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
class GameMediator extends puremvc.Mediator implements puremvc.IMediator, ISocketCallBack{
    public static NAME:string = "GameMediator";
    public static SHOW: string = "gameScene_show";
    public static PLAY_AGAIN: string = "play_again";
    
    public gameScene: GameScene;
    
	public constructor() {
        super(GameMediator.NAME);
        this.gameScene = new GameScene();
	}
	
    public listNotificationInterests(): string[] { 
        return [GameMediator.SHOW,
                GameMediator.PLAY_AGAIN
                ];
    }
        
    public handleNotification(notification: puremvc.INotification): void { 
        switch(notification.getName()) { 
            case GameMediator.SHOW:
                ClientSocket.getInstance().setCallBack(this);
                LayerManager.getInstance().runScene(this.gameScene);
                break;
            case GameMediator.PLAY_AGAIN:
                this.gameScene.playAgain();
                break;
        }
    }
    
    public onSocketConnect(): void { 
        
    }
    
    public onSocketData(json): void { 
        var cmd: number = json.cmd;
        switch(cmd) { 
            case GameConst.S2C_RANK:
                var data: RankJSON = new RankJSON();
                data.readData(json);
                this.gameScene.showRank(data);
            break;
        }
    }
    
    public onSocketError(): void { 
        
    }
    
    public onSocketClose(): void { 
        
    }
}





