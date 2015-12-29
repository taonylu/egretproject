/**
*  文 件 名：GameMediator.ts
*  功    能：游戏场景
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
var GameMediator = (function (_super) {
    __extends(GameMediator, _super);
    function GameMediator() {
        _super.call(this, GameMediator.NAME);
        this.gameScene = new GameScene();
    }
    var d = __define,c=GameMediator;p=c.prototype;
    p.listNotificationInterests = function () {
        return [GameMediator.SHOW, GameMediator.QUIT_GAME];
    };
    p.handleNotification = function (notification) {
        switch (notification.getName()) {
            case GameMediator.SHOW:
                this.show();
                break;
            case GameMediator.QUIT_GAME:
                this.gameScene.gameSprite.quitGame();
                break;
        }
    };
    p.show = function () {
        LayerManager.getInstance().runScene(this.gameScene);
    };
    p.hide = function () {
    };
    p.onSocketConnect = function () {
    };
    p.onSocketError = function () {
        this.gameScene.gameSprite.quitGame();
        this.facade.sendNotification(HomeMediator.SHOW_POPUPBOXUI, "网络连接异常...");
    };
    p.onSocketClose = function () {
        this.gameScene.gameSprite.quitGame();
        this.facade.sendNotification(HomeMediator.SHOW_POPUPBOXUI, "网络连接关闭...");
    };
    p.onSocketConnectTimeOver = function () {
    };
    p.onSocketData = function (cmd, byteArray) {
        switch (cmd) {
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
    };
    GameMediator.NAME = "GameMediator";
    GameMediator.SHOW = "GameMediator_Show";
    GameMediator.QUIT_GAME = "QUIT_GAME";
    return GameMediator;
})(puremvc.Mediator);
egret.registerClass(GameMediator,"GameMediator",["puremvc.IMediator","puremvc.INotifier","ISocketHand"]);
