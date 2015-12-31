var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.yaoqingFlow = 21;
        this.yaoqingOpen = 22;
        this.yaoqingFlow2 = 38;
        this.door = 39;
        this.door_wait = 52;
        this.door_takeoff = 53;
        this.door_waitin = 104;
        this.hair = 105;
        this.hair_wait = 118;
        this.hair_clear = 119;
        this.hair_over = 183;
        this.room = 184;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, flash.bind(this.onAddToStage, this), null);
    }
    var __egretProto__ = GameScene.prototype;
    __egretProto__.onAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, flash.bind(this.onAddToStage, this), null);
        var clz = flash.ApplicationDomain.currentDomain.getDefinition("Movie");
        this.scene = new clz();
        this.scene.gotoAndPlay(1);
        this.addChild(this.scene);
        //this.scene.gotoAndStop(1);
        //this.scene["btn"].addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this.onClick,this));
    };
    __egretProto__.onClick = function (e) {
        this.scene.gotoAndPlay(1);
        flash.navigateToURL(new egret.URLRequest("http://www.baidu.com"), "_self");
    };
    __egretProto__.onEnterFrame = function (e) {
        switch (this.scene.currentFrame) {
            case this.yaoqingFlow:
                this.scene.stop();
                break;
            case this.yaoqingFlow2:
                this.scene.stop();
                break;
            case this.door_wait:
                this.scene.stop();
                break;
            case this.door_waitin:
                this.scene.stop();
                break;
            case this.hair_wait:
                this.scene.stop();
                break;
            case this.hair_over:
                this.scene.stop();
                break;
        }
    };
    __egretProto__.onMouseClick = function (e) {
        switch (this.scene.currentFrame) {
            case this.yaoqingFlow:
                this.scene.gotoAndPlay(this.yaoqingOpen);
                break;
            case this.yaoqingFlow2:
                this.scene.gotoAndPlay(this.door);
                break;
            case this.door_wait:
                this.scene.gotoAndPlay(this.door_takeoff);
                break;
            case this.door_waitin:
                this.scene.gotoAndPlay(this.hair);
                break;
            case this.hair_wait:
                this.scene.gotoAndPlay(this.hair_clear);
                break;
            case this.hair_over:
                this.scene.gotoAndPlay(this.room);
                break;
        }
    };
    return GameScene;
})(egret.SwfMovie);
GameScene.prototype.__class__ = "GameScene";
