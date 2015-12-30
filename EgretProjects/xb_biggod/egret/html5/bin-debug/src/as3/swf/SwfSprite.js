var egret;
(function (egret) {
    var SwfSprite = (function (_super) {
        __extends(SwfSprite, _super);
        function SwfSprite() {
            _super.call(this);
            this.conf = null; // 配置的引用
            this.symbolName = "";
            /**
             *
             */
            this.extendinfo = null;
            /**
             * 实例名
             */
            this.$instanceName = "";
        }
        var __egretProto__ = SwfSprite.prototype;
        Object.defineProperty(__egretProto__, "instanceName", {
            get: function () {
                return this.$instanceName;
            },
            set: function (value) {
                this.name = value;
                this.$instanceName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "scale9Grid", {
            get: function () {
                return this.$scale9Grid;
            },
            set: function (value) {
                this.$scale9Grid = value;
                if (null != value) {
                    // 设置所有的子对象图片的九宫格
                    this.$setChildBitmapScale9Grid(this, this.$scale9Grid);
                }
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.$setChildBitmapScale9Grid = function (child, grid) {
            if (child instanceof flash.Bitmap) {
                var bm = (child);
                bm.scale9Grid = grid;
                bm.cacheAsBitmap = true; // 设置9宫会导致draw升到9
                return true;
            }
            else {
                if (child instanceof egret.DisplayObjectContainer) {
                    var con = child;
                    for (var index = 0; index < con.numChildren; index++) {
                        var result = this.$setChildBitmapScale9Grid(con.getChildAt(index), grid);
                        if (result) {
                            return true;
                        }
                    }
                }
                return false;
            }
        };
        return SwfSprite;
    })(egret.Sprite);
    egret.SwfSprite = SwfSprite;
    SwfSprite.prototype.__class__ = "egret.SwfSprite";
})(egret || (egret = {}));
