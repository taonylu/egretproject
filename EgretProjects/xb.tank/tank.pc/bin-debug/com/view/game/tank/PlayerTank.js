/**
 * 玩家坦克
 * @author
 *
 */
var PlayerTank = (function (_super) {
    __extends(PlayerTank, _super);
    function PlayerTank() {
        _super.call(this);
        this.shield = new Shield(); //护盾
        this.birthShieldTime = 30; //出生时护盾循环次数
        this.itemShieldTime = 0; //道具护盾持续时间
        this.setMovieClip("playerYellowTank_png", "playerYellowTank_json", "playerYellowTank");
        this.reset();
    }
    var d = __define,c=PlayerTank,p=c.prototype;
    //override 
    p.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.shield.parent) {
            this.shield.x = this.x;
            this.shield.y = this.y;
        }
    };
    //播放护盾动画
    p.playShield = function (loopTimes) {
        if (this.parent) {
            this.parent.addChild(this.shield);
            this.shield.x = this.x;
            this.shield.y = this.y;
            this.shield.play(loopTimes);
            this.shield.addEventListener(egret.MovieClipEvent.COMPLETE, this.onShieldComplete, this);
        }
    };
    //移除护盾
    p.onShieldComplete = function () {
        this.shield.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onShieldComplete, this);
        this.shield.parent && this.shield.parent.removeChild(this.shield);
    };
    //override 被攻击
    p.beAttacked = function (bullet) {
        if (this.shield.parent) {
            return false;
        }
        else {
            return _super.prototype.beAttacked.call(this, bullet);
        }
    };
    //设置玩家坦克，玩家1黄色坦克，玩家2绿色坦克
    p.setPlayerNo = function (no) {
        this.playerNo = no;
        if (this.playerNo == 1) {
            this.setMovieClip("playerYellowTank_png", "playerYellowTank_json", "playerYellowTank");
        }
        else {
            this.setMovieClip("playerGreenTank_png", "playerGreenTank_json", "playerGreenTank");
        }
    };
    //override  玩家坦克动画lvl1 lvl2 lvl3
    p.playMoveAnim = function () {
        this.gotoAndPlay("lvl" + this.power, -1);
    };
    //override 设置坦克威力，并且改变坦克外形
    p.setPower = function (power) {
        if (power >= 3) {
            power = 3;
        }
        if (this.power == power) {
            return;
        }
        this.power = power;
        this.gotoAndPlay("lvl" + this.power, -1);
        this.shootTime = MapManager.getInstance().tankSet.playerTank.shootTime[this.power - 1];
    };
    //时间道具停止
    p.pause = function () {
        this.stop();
        egret.Tween.get(this, { loop: true }).to({ alpha: 0.1 }, 200).to({ alpha: 1 }, 200);
    };
    //停止暂停,恢复行动
    p.resume = function () {
        egret.Tween.removeTweens(this);
        this.alpha = 1;
    };
    //override
    p.reset = function () {
        _super.prototype.reset.call(this);
        var tankSet = MapManager.getInstance().tankSet.playerTank;
        this.speed = tankSet.speed;
        this.setPower(tankSet.power);
        this.life = tankSet.life;
        this.shootTime = tankSet.shootTime[0];
        this.type = TankEnum.player;
        this.rotation = 0;
        this.direction = DirectionEnum.up;
        this.gotoAndStop("lvl1");
        this.resume();
        this.snd.stop(this.snd.user_move);
        var itemSet = MapManager.getInstance().itemSet;
        this.itemShieldTime = Math.round(itemSet.shield * 1000 / 160); //护盾动画播放一次160ms
        if (this.itemShieldTime <= 0) {
            this.itemShieldTime = 1;
        }
    };
    PlayerTank.NAME = "PlayerTank";
    return PlayerTank;
}(BaseTank));
egret.registerClass(PlayerTank,'PlayerTank');
