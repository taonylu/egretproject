var egret;
(function (egret) {
    var SymbolClass = (function () {
        function SymbolClass(obj) {
            if (obj === void 0) { obj = null; }
            /**
             * 链接类的定义characterId, 0是文档类
             */
            this.id = 0;
            /**
             * 链接类名
             */
            this.className = "";
            this.createFromObject(obj);
        }
        var __egretProto__ = SymbolClass.prototype;
        __egretProto__.createFromObject = function (obj) {
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
                this.fromSlimData(obj);
                return;
            }
            for (var key in obj) {
                this[key] = obj[key];
            }
        };
        __egretProto__.fromSlimData = function (sd) {
            this.id = sd[0];
            this.className = sd[1];
        };
        return SymbolClass;
    })();
    egret.SymbolClass = SymbolClass;
    SymbolClass.prototype.__class__ = "egret.SymbolClass";
})(egret || (egret = {}));
