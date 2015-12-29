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
    var __egretProto__ = GameMediator.prototype;
    __egretProto__.listNotificationInterests = function () {
        return [GameMediator.SHOW, GameMediator.QUIT_GAME];
    };
    __egretProto__.handleNotification = function (notification) {
        switch (notification.getName()) {
            case GameMediator.SHOW:
                this.show();
                break;
            case GameMediator.QUIT_GAME:
                this.gameScene.gameSprite.quitGame();
                break;
        }
    };
    __egretProto__.show = function () {
        LayerManager.getInstance().runScene(this.gameScene);
    };
    __egretProto__.hide = function () {
    };
    __egretProto__.onSocketConnect = function () {
    };
    __egretProto__.onSocketError = function () {
        this.gameScene.gameSprite.quitGame();
        this.facade.sendNotification(HomeMediator.SHOW_POPUPBOXUI, "网络连接异常...");
    };
    __egretProto__.onSocketClose = function () {
        this.gameScene.gameSprite.quitGame();
        this.facade.sendNotification(HomeMediator.SHOW_POPUPBOXUI, "网络连接关闭...");
    };
    __egretProto__.onSocketConnectTimeOver = function () {
    };
    __egretProto__.onSocketData = function (json) {
        switch (json.cmd) {
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
    };
    GameMediator.NAME = "GameMediator";
    GameMediator.SHOW = "GameMediator_Show";
    GameMediator.QUIT_GAME = "QUIT_GAME";
    return GameMediator;
})(puremvc.Mediator);
GameMediator.prototype.__class__ = "GameMediator";
