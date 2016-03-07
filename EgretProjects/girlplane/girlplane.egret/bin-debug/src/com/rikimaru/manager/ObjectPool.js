var ObjectPool = (function () {
    function ObjectPool(className) {
        this.className = className;
        this.list = [];
    }
    var __egretProto__ = ObjectPool.prototype;
    /**获取对象*/
    __egretProto__.getObject = function () {
        if (this.list.length > 0) {
            return this.list.shift();
        }
        var clazz = egret.getDefinitionByName(this.className);
        return new clazz();
    };
    /**回收对象*/
    __egretProto__.returnObject = function (value) {
        this.list.push(value);
    };
    /**
     * 获取对象池，如果不存在则新建一个
     * @param className 对象类名
     * @param initNum 初始化对象池数量
     */
    ObjectPool.getPool = function (className, initNum) {
        if (initNum === void 0) { initNum = 0; }
        if (!ObjectPool.pool[className]) {
            ObjectPool.pool[className] = new ObjectPool(className);
            if (initNum != 0) {
                var clazz = egret.getDefinitionByName(className);
                var pool = ObjectPool.pool[className];
                for (var i = 0; i < initNum; i++) {
                    pool.returnObject(new clazz());
                }
            }
        }
        return ObjectPool.pool[className];
    };
    /**存储对象池的Object*/
    ObjectPool.pool = {};
    return ObjectPool;
})();
ObjectPool.prototype.__class__ = "ObjectPool";
