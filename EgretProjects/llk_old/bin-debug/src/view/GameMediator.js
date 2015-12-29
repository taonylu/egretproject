/**
*  文 件 名：GameMediator.ts
*  功    能：游戏页面
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
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
        return [GameMediator.SHOW, GameMediator.PLAY_AGAIN];
    };
    __egretProto__.handleNotification = function (notification) {
        switch (notification.getName()) {
            case GameMediator.SHOW:
                ClientSocket.getInstance().setCallBack(this);
                LayerManager.getInstance().runScene(this.gameScene);
                break;
            case GameMediator.PLAY_AGAIN:
                this.gameScene.playAgain();
                break;
        }
    };
    __egretProto__.onSocketConnect = function () {
    };
    __egretProto__.onSocketData = function (json) {
        var cmd = json.cmd;
        switch (cmd) {
            case GameConst.S2C_RANK:
                var data = new RankJSON();
                data.readData(json);
                this.gameScene.showRank(data);
                break;
        }
    };
    __egretProto__.onSocketError = function () {
    };
    __egretProto__.onSocketClose = function () {
    };
    GameMediator.NAME = "GameMediator";
    GameMediator.SHOW = "gameScene_show";
    GameMediator.PLAY_AGAIN = "play_again";
    return GameMediator;
})(puremvc.Mediator);
GameMediator.prototype.__class__ = "GameMediator";
