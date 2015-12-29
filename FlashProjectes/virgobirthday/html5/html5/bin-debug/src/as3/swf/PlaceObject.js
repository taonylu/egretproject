var egret;
(function (egret) {
    var PlaceObject = (function (_super) {
        __extends(PlaceObject, _super);
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
            /**
             * 最先出现在哪一帧
             */
            this.firstFrame = 0;
            this.createFromObject(obj);
        }
        var __egretProto__ = PlaceObject.prototype;
        return PlaceObject;
    })(egret.TransformInfo);
    egret.PlaceObject = PlaceObject;
    PlaceObject.prototype.__class__ = "egret.PlaceObject";
})(egret || (egret = {}));
