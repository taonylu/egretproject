/**
 * 玩家类
 * @author
 *
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(png, json, mc) {
        _super.call(this, png, json, mc);
        this.isJumping = false; //是否跳跃
        this.isMoving = false; //是否在移动，防止连续移动导致位置不正确
        this.isDie = false; //是否死亡
        this.shadow = new egret.Bitmap(RES.getRes("shadow_png"));
        this.shadow.anchorOffsetX = this.shadow.width / 2;
        this.shadow.anchorOffsetY = this.shadow.height / 2;
    }
    var d = __define,c=Player,p=c.prototype;
    p.modifyPos = function () {
        this.x += this.offerX;
        this.y += this.offerY;
    };
    p.stand = function () {
        this.gotoAndStop(4);
    };
    p.run = function () {
        this.gotoAndPlay("run", -1);
    };
    p.jump = function () {
        if (this.isJumping == false) {
            this.isJumping = true;
            this.gotoAndPlay("jump", 1);
            var self = this;
            egret.Tween.get(this).to({ y: this.initY - 150 }, 300).to({ y: this.initY }, 300).
                call(function () {
                self.isJumping = false;
                self.run();
            }, this);
        }
    };
    p.die = function () {
        this.isDie = true;
        this.gotoAndPlay("die", 1);
        var self = this;
        //        egret.Tween.get(this).to({ y: -200,x: Math.random() * GameConst.stage.stageWidth,rotation: 360 * 3 },500).call(function() {
        //            GameManager.getInstance().gameScene.resetPlayer(self);
        //        });
        egret.Tween.get(this.shadow).to({ y: GameConst.stage.stageHeight + this.width }, 900);
        egret.Tween.get(this).to({ y: GameConst.stage.stageHeight + this.width }, 1000).call(function () {
            GameManager.getInstance().gameScene.resetPlayer(self);
        });
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
        this.shadow.parent && this.shadow.parent.removeChild(this.shadow);
        this.stop();
    };
    p.clearStatus = function () {
        this.isJumping = false;
        this.isMoving = false;
        this.isDie = false;
    };
    p.reset = function () {
        this.clearStatus();
        this.gameHead = null;
        this.score = 0;
        this.track = 0;
        this.roleID = 0;
        this.openid = "";
    };
    return Player;
}(SimpleMC));
egret.registerClass(Player,'Player');
