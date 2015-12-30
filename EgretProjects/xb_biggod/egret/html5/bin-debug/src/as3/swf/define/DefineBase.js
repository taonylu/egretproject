var egret;
(function (egret) {
    var DefineBase = (function () {
        function DefineBase(obj) {
            if (obj === void 0) { obj = null; }
            /**
             * type 从Config中读
             */
            this.t = -1;
            /**
             * ID tagID，默认为-1表示未赋值的
             */
            this.id = -1;
            //this.createFromObject(obj);
        }
        var __egretProto__ = DefineBase.prototype;
        __egretProto__.createFromObject = function (obj) {
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
                this.t = obj[0];
                this.id = obj[1];
            }
            else {
                for (var key in obj) {
                    if (this.saveKey(key, obj[key])) {
                        continue;
                    }
                    this[key] = obj[key];
                }
            }
        };
        /**
         * 提供给子类，特殊解析的属性
         * @param key
         * @param keyobj
         * @return
         *
         */
        __egretProto__.saveKey = function (key, keyobj) {
            return false;
        };
        __egretProto__.toString = function () {
            return JSON.stringify(this);
        };
        return DefineBase;
    })();
    egret.DefineBase = DefineBase;
    DefineBase.prototype.__class__ = "egret.DefineBase";
})(egret || (egret = {}));
