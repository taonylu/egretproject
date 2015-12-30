var egret;
(function (egret) {
    var DefineSprite = (function (_super) {
        __extends(DefineSprite, _super);
        function DefineSprite(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this);
            /**
             * FrameCount
             */
            this.f = 1;
            /**
             * 帧数据，每一帧是一个数组Vector.<PlaceObject>，这种数据格式支持嵌套
             */
            this.fd = [];
            this.createFromObject(obj);
            this.t = egret.Config.RESSprite;
        }
        var __egretProto__ = DefineSprite.prototype;
        __egretProto__.saveKey = function (key, keyobj) {
            if (key == "fd") {
                if (null != keyobj) {
                    var keyobjarr = keyobj;
                    for (var i = 0; i < keyobjarr.length; i++) {
                        var vec = new Array();
                        this.fd[i] = vec;
                        var vecarr = (keyobjarr[i]);
                        for (var j = 0; j < vecarr.length; j++) {
                            var po = new egret.PlaceObject(vecarr[j]);
                            vec.push(po);
                        }
                    }
                }
                return true;
            }
            return false;
        };
        /**
         * 从帧中取出实例名为name的对象
         * @param frame
         * @param name
         * @return
         *
         */
        __egretProto__.getObjByInstanceName = function (frame, name) {
            var frameObjs = this.fd[frame];
            var length = frameObjs.length;
            for (var i = 0; i < length; i++) {
                var po = frameObjs[i];
                if (po.instanceName == name) {
                    return po;
                }
            }
            return null;
        };
        __egretProto__.checkLegal = function () {
            if (this.f != this.fd.length) {
                return false;
            }
            return true;
        };
        return DefineSprite;
    })(egret.DefineBase);
    egret.DefineSprite = DefineSprite;
    DefineSprite.prototype.__class__ = "egret.DefineSprite";
})(egret || (egret = {}));
