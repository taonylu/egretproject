/**
*  文 件 名：Bullet.ts
*  功    能：子弹基类
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
var BaseBullet = (function (_super) {
    __extends(BaseBullet, _super);
    function BaseBullet() {
        _super.call(this);
    }
    var __egretProto__ = BaseBullet.prototype;
    __egretProto__.onMove = function () {
        //移动
        this.x += this.speedX;
        this.y += this.speedY;
        //边界检测
        if (this.y < -this.height || this.y > GameConfig.stageHeight) {
            this.bLive = false;
        }
    };
    return BaseBullet;
})(GameObject);
BaseBullet.prototype.__class__ = "BaseBullet";
