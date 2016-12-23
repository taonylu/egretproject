/**
 * @对象池
 * @author chenkai
 * @date 2016/12/23
*/
var ObjectPool = (function (_super) {
    __extends(ObjectPool, _super);
    function ObjectPool() {
        _super.apply(this, arguments);
        /**存储对象池的Object*/
        this.poolList = {};
    }
    var d = __define,c=ObjectPool,p=c.prototype;
    /**
     * 获取对象池，如果不存在则新建一个
     * @param className 对象类名
     * @param initNum 初始化对象池数量
     */
    p.getPool = function (className, initNum) {
        if (initNum === void 0) { initNum = 0; }
        if (!this.poolList[className]) {
            this.poolList[className] = new PoolVo(className);
            if (initNum != 0) {
                var clazz = egret.getDefinitionByName(className);
                var pool = this.poolList[className];
                for (var i = 0; i < initNum; i++) {
                    pool.returnObject(new clazz());
                }
            }
        }
        return this.poolList[className];
    };
    return ObjectPool;
}(SingleClass));
egret.registerClass(ObjectPool,'ObjectPool');
/**对象池*/
var PoolVo = (function () {
    function PoolVo(className) {
        this.className = className;
        this.list = [];
    }
    var d = __define,c=PoolVo,p=c.prototype;
    /**获取对象*/
    p.getObject = function () {
        if (this.list.length > 0) {
            return this.list.pop();
        }
        var clazz = egret.getDefinitionByName(this.className);
        return new clazz();
    };
    /**回收对象*/
    p.returnObject = function (obj) {
        this.list.push(obj);
    };
    return PoolVo;
}());
egret.registerClass(PoolVo,'PoolVo');
//# sourceMappingURL=ObjectPool.js.map