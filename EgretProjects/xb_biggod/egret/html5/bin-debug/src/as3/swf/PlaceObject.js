var egret;
(function (egret) {
    var PlaceObject = (function (_super) {
        __extends(PlaceObject, _super);
        /**
         * 最先出现在哪一帧
         */
        //public firstFrame:number = 0;
        //public var colorTransform:ColorTransform;// 暂不支持
        function PlaceObject(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this);
            this.id = 0;
            this.depth = 0;
            /**
             * 实例名
             */
            this.instanceName = "";
            this.createFromObject(obj);
        }
        var __egretProto__ = PlaceObject.prototype;
        __egretProto__.createFromObject = function (obj) {
            _super.prototype.createFromObject.call(this, obj);
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
                this.id = obj[6];
                this.depth = obj[7];
                this.instanceName = obj[8];
            }
        };
        return PlaceObject;
    })(egret.TransformInfo);
    egret.PlaceObject = PlaceObject;
    PlaceObject.prototype.__class__ = "egret.PlaceObject";
})(egret || (egret = {}));
