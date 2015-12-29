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
        
    public onSocketData(json): void { 
        switch(json.cmd) { 
            case NetConst.MOVE_REQUEST:
                JSONManager.getInstance().revPlayerMove = json;
                this.gameScene.gameSprite.revMovePlayer();
                break;
            case NetConst.NEW_PLAYER_JOIN:
                JSONManager.getInstance().playerJoin = json;
                this.gameScene.gameSprite.revAddPlayer();
            break;
            case NetConst.EAT_RECT:
                JSONManager.getInstance().revEatRect = json;
                this.gameScene.gameSprite.revEatRect();
                break;
            case NetConst.EAT_PLAYER:
                JSONManager.getInstance().revEatPlayer = json;
                this.gameScene.gameSprite.revEatPlayer();
                break;
            case NetConst.CREATE_NEW_RECT:
                JSONManager.getInstance().revCreateNewRect = json;
                this.gameScene.gameSprite.revCreateNewRect();
                break;
            case NetConst.USER_LEAVE:
                JSONManager.getInstance().revUserLeave = json;
                this.gameScene.gameSprite.revUserLeave();
                break;
            case NetConst.TU_PAO_PAO:
                JSONManager.getInstance().revTuPaoPao = json;
                this.gameScene.gameSprite.revTuPaoPao();
                break;
            case NetConst.EAT_PAO_PAO:
                JSONManager.getInstance().revEatPaoPao = json;
                this.gameScene.gameSprite.revEatPaoPao();
                break;
            case NetConst.FEN_LIE:
                JSONManager.getInstance().revFenLie = json;
                this.gameScene.gameSprite.revFenLie();
                break;
        }
    }
    	
}






