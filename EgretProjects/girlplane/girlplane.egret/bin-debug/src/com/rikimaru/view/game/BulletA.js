/**
*  文 件 名：BulletHeroA.ts
*  功    能： 英雄子弹A
*  内    容： 锥形火焰子弹
*  作    者： Rikimaru
*  生成日期：2015/8/25
*  修改日期：2015/8/25
*  修改日志：
*/
var BulletA = (function (_super) {
    __extends(BulletA, _super);
    function BulletA() {
        _super.call(this);
        this.texture = RES.getRes("heroBullet11");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    var __egretProto__ = BulletA.prototype;
    __egretProto__.reset = function () {
        this.moveSpeed = 20;
        this.speedX = 0;
        this.speedY = -20;
        this.power = 1;
        this.owner = 1 /* Hero */;
        this.bLive = true;
    };
    BulletA.NAME = "BulletA";
    return BulletA;
})(BaseBullet);
BulletA.prototype.__class__ = "BulletA";
