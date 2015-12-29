var egret;
(function (egret) {
    var SwfRes = (function () {
        function SwfRes() {
        }
        var __egretProto__ = SwfRes.prototype;
        __egretProto__.instance = function () {
            if (null == SwfRes.$instance) {
                SwfRes.$instance = new SwfRes();
            }
            return SwfRes.$instance;
        };
        // pool
        SwfRes.hasPool = function (poolname) {
            return SwfRes.resPools[poolname] != null;
        };
        SwfRes.getPool = function (poolname) {
            return (SwfRes.resPools[poolname]);
        };
        /**
         *
         * @param poolname
         * @param _resconf
         * @param target 显示对象，SwfXXXX
         * @param objID
         * @param extendInfo
         * @returns {boolean}
         * @constructor
         */
        SwfRes.Pool_recycle = function (poolname, _resconf, target, objID, extendInfo) {
            if (extendInfo === void 0) { extendInfo = null; }
            if (objID == 0) {
                return false;
            }
            var pool = null;
            if (SwfRes.hasPool(poolname)) {
                pool = SwfRes.getPool(poolname);
            }
            else {
                pool = new egret.SwfResPool(poolname, _resconf);
            }
            SwfRes.resPools[poolname] = pool;
            pool.Pool_recycle(target, objID, extendInfo);
            return true;
        };
        SwfRes.Pool_getByID = function (poolname, _resconf, objID, extendInfo) {
            if (extendInfo === void 0) { extendInfo = null; }
            var pool = null;
            if (SwfRes.hasPool(poolname)) {
                pool = SwfRes.getPool(poolname);
            }
            else {
                pool = new egret.SwfResPool(poolname, _resconf);
            }
            SwfRes.resPools[poolname] = pool;
            return pool.Pool_getByID(objID, extendInfo);
        };
        SwfRes.resPools = {};
        return SwfRes;
    })();
    egret.SwfRes = SwfRes;
    SwfRes.prototype.__class__ = "egret.SwfRes";
})(egret || (egret = {}));
