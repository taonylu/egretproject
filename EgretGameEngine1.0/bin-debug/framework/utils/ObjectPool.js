var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @对象池
 * @author chenkai
 * @date 2016/12/23
 *
 * Example:
 * //获取对象池
 * var pool:Pool = App.ObjectPool.getPool("Ball",10);
 * //获取一个Ball
 * var ball:Ball = pool.getObject();
 * //回收一个Ball
 * pool.returnObject(ball);
*/
var ObjectPool = (function (_super) {
    __extends(ObjectPool, _super);
    function ObjectPool() {
        var _this = _super.apply(this, arguments) || this;
        /**存储对象池的Object*/
        _this.poolList = {};
        return _this;
    }
    /**
     * 获取对象池，如果不存在则新建一个
     * @param className 对象类名
     * @param initNum 初始化对象池数量
     */
    ObjectPool.prototype.getPool = function (className, initNum) {
        if (initNum === void 0) { initNum = 0; }
        if (!this.poolList[className]) {
            this.poolList[className] = new Pool(className);
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
__reflect(ObjectPool.prototype, "ObjectPool");
/**对象池*/
var Pool = (function () {
    function Pool(className) {
        this.className = className;
        this.list = [];
    }
    /**获取对象*/
    Pool.prototype.getObject = function () {
        if (this.list.length > 0) {
            return this.list.pop();
        }
        var clazz = egret.getDefinitionByName(this.className);
        return new clazz();
    };
    /**回收对象*/
    Pool.prototype.returnObject = function (obj) {
        this.list.push(obj);
    };
    Object.defineProperty(Pool.prototype, "length", {
        /**获取对象池长度*/
        get: function () {
            var count = 0;
            for (var key in this.list) {
                count++;
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    return Pool;
}());
__reflect(Pool.prototype, "Pool");
//# sourceMappingURL=ObjectPool.js.map