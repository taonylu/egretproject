/**
*  文 件 名：EnemyA.ts
*  功    能：敌人A
*  内    容： 小型金黄色飞机
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
var EnemyA = (function (_super) {
    __extends(EnemyA, _super);
    function EnemyA() {
        _super.call(this);
        this.texture = RES.getRes("enemy_1");
        this.setAnchor();
    }
    var __egretProto__ = EnemyA.prototype;
    /**重置参数*/
    __egretProto__.reset = function () {
        this.speedY = 2;
        this.shotSpeed = Math.random() * 50 + 50;
        this.shotTimeCount = 0;
        this.life = 1;
        this.bLive = true;
        this.bulletType = BulletB.NAME;
    };
    /**从舞台移除*/
    __egretProto__.onRemove = function () {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(EnemyA.NAME).returnObject(this);
    };
    EnemyA.NAME = "EnemyA";
    return EnemyA;
})(BaseEnemy);
EnemyA.prototype.__class__ = "EnemyA";
