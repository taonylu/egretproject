/**
*  文 件 名：GameMediator.ts
*  功    能：游戏场景
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
class GameMediator extends puremvc.Mediator implements puremvc.IMediator,ISocketHand{
    public static NAME: string = "GameMediator";
    public static SHOW: string = "GameMediator_Show";
    public static QUIT_GAME:string = "QUIT_GAME";
        
    public gameScene: GameScene = new GameScene();

        
    public constructor() {
        super(GameMediator.NAME);
    }
    	
    public listNotificationInterests(): string[] { 
        return [GameMediator.SHOW,
                GameMediator.QUIT_GAME];
    }
        
    public handleNotification(notification: puremvc.INotification): void { 
        switch(notification.getName()) { 
            case GameMediator.SHOW:
                this.show();
            break;
            case GameMediator.QUIT_GAME:
                this.gameScene.gameSprite.quitGame();
                break;
        }
    }
        
        
    public show(): void {
        LayerManager.getInstance().runScene(this.gameScene);
        
    }
        
    public hide(): void { 
        
    }
    
    public onSocketConnect(): void { 
        
    }
        
    public onSocketError(): void { 
        this.gameScene.gameSprite.quitGame();
        this.facade.sendNotification(HomeMediator.SHOW_POPUPBOXUI,"网络连接异常...");
    }
                
    public onSocketClose(): void { 
        this.gameScene.gameSprite.quitGame(); 
        this.facade.sendNotification(HomeMediator.SHOW_POPUPBOXUI,"网络连接关闭...");
    }
    
    public onSocketConnectTimeOver(): void { 
                
    }
        
    public onSocketData(cmd:number, byteArray:egret.ByteArray): void { 
        switch(cmd) { 
            case NetConst.MOVE_REQUEST:
                this.gameScene.gameSprite.revMovePlayer(byteArray);
                break;
            case NetConst.NEW_PLAYER_JOIN:
                this.gameScene.gameSprite.revAddPlayer(byteArray);
            break;
            case NetConst.EAT_RECT:
                this.gameScene.gameSprite.revEatRect(byteArray);
                break;
            case NetConst.EAT_PLAYER:
                this.gameScene.gameSprite.revEatPlayer(byteArray);
                break;
            case NetConst.CREATE_NEW_RECT:
                this.gameScene.gameSprite.revCreateNewRect(byteArray);
                break;
            case NetConst.USER_LEAVE:
                this.gameScene.gameSprite.revUserLeave(byteArray);
                break;
            case NetConst.TU_PAO_PAO:
                this.gameScene.gameSprite.revTuPaoPao(byteArray);
                break;
            case NetConst.EAT_PAO_PAO:
                this.gameScene.gameSprite.revEatPaoPao(byteArray);
                break;
            case NetConst.FEN_LIE:
                this.gameScene.gameSprite.revFenLie(byteArray);
                break;
        }
    }
    	
}






