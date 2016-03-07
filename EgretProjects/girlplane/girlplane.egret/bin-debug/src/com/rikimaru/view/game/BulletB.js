/**
*  文 件 名：BulletA.ts
*  功    能：子弹B
*  内    容： 圆形普通小子弹
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
var BulletB = (function (_super) {
    __extends(BulletB, _super);
    function BulletB() {
        _super.call(this);
        this.texture = RES.getRes("enemyBullet1");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    var __egretProto__ = BulletB.prototype;
    __egretProto__.reset = function () {
        this.moveSpeed = 10;
        this.speedY = 5;
        this.owner = 0 /* Enemy */;
        this.power = 1;
        this.bLive = true;
    };
    BulletB.NAME = "BulletB";
    return BulletB;
})(BaseBullet);
BulletB.prototype.__class__ = "BulletB";
