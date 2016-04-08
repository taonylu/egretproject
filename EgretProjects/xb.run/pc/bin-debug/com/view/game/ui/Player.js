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
    }
    var d = __define,c=Player,p=c.prototype;
    p.run = function () {
        //this.gotoAndPlay("run",-1);
        this.play(-1);
    };
    p.jump = function () {
        if (this.isJumping == false) {
            this.isJumping = true;
            //this.gotoAndPlay("jump",1);
            this.initY = this.y;
            var self = this;
            egret.Tween.get(this).to({ y: this.y - 500 }, 300).to({ y: this.initY }, 300).
                call(function () {
                self.isJumping = false;
                self.run();
            }, this);
        }
    };
    p.die = function () {
        //this.gotoAndPlay("die",1);
        var self = this;
        egret.Tween.get(this).to({ y: -200, x: Math.random() * GameConst.stage.stageWidth, rotation: 360 * 3 }, 500).call(function () {
            GameManager.getInstance().gameScene.resetPlayer(self);
        });
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
        this.stop();
    };
    return Player;
}(SimpleMC));
egret.registerClass(Player,'Player');
