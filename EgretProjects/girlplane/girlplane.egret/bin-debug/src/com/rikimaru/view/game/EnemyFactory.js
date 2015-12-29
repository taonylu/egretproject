/**
*  文 件 名：EnemyFactory.ts
*  功    能： 飞机工厂
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/25
*  修改日期：2015/8/25
*  修改日志：
*/
var EnemyFactory = (function () {
    function EnemyFactory() {
    }
    var __egretProto__ = EnemyFactory.prototype;
    EnemyFactory.getInstance = function () {
        if (this.instance == null) {
            this.instance = new EnemyFactory();
        }
        return this.instance;
    };
    /**创建一个敌人*/
    __egretProto__.create = function (name) {
        var scene = GameScene.instance;
        var enemy = ObjectPool.getPool(name).getObject();
        enemy.reset();
        scene.enemyList.push(enemy);
        scene.gameSprite.addChild(enemy);
        enemy.x = 50 + (scene.mapWidth - 100) * Math.random();
        enemy.y = 0;
    };
    __egretProto__.createRandom = function () {
    };
    return EnemyFactory;
})();
EnemyFactory.prototype.__class__ = "EnemyFactory";
