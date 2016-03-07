/**
*  文 件 名：EnemyB.ts
*  功    能：敌人B
*  内    容： 小型金黄色飞机
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
var EnemyB = (function (_super) {
    __extends(EnemyB, _super);
    function EnemyB() {
        _super.call(this);
        this.texture = RES.getRes("enemy_4");
        this.setAnchor();
    }
    var __egretProto__ = EnemyB.prototype;
    __egretProto__.reset = function () {
        this.speedX = 2;
        this.speedY = 1;
        this.shotSpeed = Math.random() * 30 + 20;
        this.shotTimeCount = 0;
        this.life = 20;
        this.bLive = true;
        this.bulletType = BulletB.NAME;
    };
    __egretProto__.onRemove = function () {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(EnemyB.NAME).returnObject(this);
    };
    EnemyB.NAME = "EnemyB";
    return EnemyB;
})(BaseEnemy);
EnemyB.prototype.__class__ = "EnemyB";
