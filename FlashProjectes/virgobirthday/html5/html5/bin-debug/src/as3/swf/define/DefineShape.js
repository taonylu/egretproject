var egret;
(function (egret) {
    var DefineShape = (function (_super) {
        __extends(DefineShape, _super);
        function DefineShape(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this);
            //public var bounds:Rectangle;
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
            //是否导出了png图片
            this.isexportpng = false;
            this.createFromObject(obj);
            this.t = egret.Config.RESShape;
        }
        var __egretProto__ = DefineShape.prototype;
        __egretProto__.createFromObject = function (obj) {
            if (null == obj) {
                return;
            }
            for (var key in obj) {
                var fillstyles = new Array();
                if (key == DefineShape.Dynamic_Fillstyles && obj[DefineShape.Dynamic_Fillstyles] != null) {
                    var fss = (obj[DefineShape.Dynamic_Fillstyles]);
                    var length = fss.length;
                    for (var i = 0; i < length; i++) {
                        var o = fss[i];
                        var fs = new egret.FillStyle(o);
                        fillstyles.push(fs);
                    }
                    this[DefineShape.Dynamic_Fillstyles] = fillstyles;
                }
                else {
                    this[key] = obj[key];
                }
            }
        };
        // 作为动态属性。纯矢量图形没有位图数据
        //public var fillstyles:Vector.<FillStyle> = new Vector.<FillStyle>();
        DefineShape.Dynamic_Fillstyles = "fillstyles";
        return DefineShape;
    })(egret.DefineBase);
    egret.DefineShape = DefineShape;
    DefineShape.prototype.__class__ = "egret.DefineShape";
})(egret || (egret = {}));
