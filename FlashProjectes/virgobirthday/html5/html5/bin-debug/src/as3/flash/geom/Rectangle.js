var flash;
(function (flash) {
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(_x, _y, _w, _h) {
            if (_x === void 0) { _x = 0; }
            if (_y === void 0) { _y = 0; }
            if (_w === void 0) { _w = 0; }
            if (_h === void 0) { _h = 0; }
            _super.call(this, _x, _y, _w, _h);
        }
        var __egretProto__ = Rectangle.prototype;
        Object.defineProperty(__egretProto__, "topLeft", {
            get: function () {
                return new egret.Point(this.left, this.top);
            },
            set: function (value) {
                this.top = value.y;
                this.left = value.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "bottomRight", {
            get: function () {
                return new egret.Point(this.right, this.bottom);
            },
            set: function (value) {
                this.bottom = value.y;
                this.right = value.x;
            },
            enumerable: true,
            configurable: true
        });
        return Rectangle;
    })(egret.Rectangle);
    flash.Rectangle = Rectangle;
    Rectangle.prototype.__class__ = "flash.Rectangle";
})(flash || (flash = {}));
