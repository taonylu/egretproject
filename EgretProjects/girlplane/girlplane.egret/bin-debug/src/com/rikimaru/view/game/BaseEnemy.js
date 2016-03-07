/**
*  文 件 名：Enemy.ts
*  功    能：敌人基类
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
var BaseEnemy = (function (_super) {
    __extends(BaseEnemy, _super);
    function BaseEnemy() {
        _super.call(this);
    }
    var __egretProto__ = BaseEnemy.prototype;
    /**设置锚点*/
    __egretProto__.setAnchor = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    __egretProto__.onMove = function () {
        //移动
        this.x += this.speedX;
        this.y += this.speedY;
        //边界检测
        if (this.y < -this.height || this.y > GameConfig.stageHeight) {
            this.bLive = false;
        }
        if (this.x < this.width / 2) {
            this.x = this.width / 2;
            this.speedX = -this.speedX;
        }
        else if (this.x > GameConfig.stageWidth - this.width / 2) {
            this.x = GameConfig.stageWidth - this.width / 2;
            this.speedX = -this.speedX;
        }
    };
    /**射击*/
    __egretProto__.onShot = function () {
        //射击计时
        this.shotTimeCount++;
        if (this.shotTimeCount >= this.shotSpeed) {
            this.shotTimeCount = 0;
            return true;
        }
        return false;
    };
    /**遭受攻击*/
    __egretProto__.beAttacked = function (power) {
        this.life -= power;
        if (this.life <= 0) {
            this.bLive = false;
            return true;
        }
        return false;
    };
    return BaseEnemy;
})(GameObject);
BaseEnemy.prototype.__class__ = "BaseEnemy";
