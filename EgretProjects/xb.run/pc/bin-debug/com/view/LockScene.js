/**
 * 校准
 * @author
 *
 */
var LockScene = (function (_super) {
    __extends(LockScene, _super);
    function LockScene() {
        _super.call(this, "LockSceneSkin");
    }
    var d = __define,c=LockScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.socket = ClientSocket.getInstance();
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    /////////////////////////////////////////////////////////
    //-----------------[Socket 数据]-------------------------
    /////////////////////////////////////////////////////////
    //接收锁定
    p.revLock = function (data) {
        egret.log("rev lock:", data);
        //TODO 所有人锁定完成，则开始游戏
        if (GameConst.debug) {
            this.sendStartGame();
            LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
        }
        else {
        }
    };
    //发送开始游戏
    p.sendStartGame = function () {
        egret.log("sendStartGame");
        this.socket.sendMessage("startGame");
    };
    return LockScene;
}(BaseScene));
egret.registerClass(LockScene,'LockScene');
