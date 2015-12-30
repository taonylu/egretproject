/**
 * Created by huitao on 2015/6/6.
 */
var flash;
(function (flash) {
    var BindManager = (function () {
        function BindManager() {
            this.bindDisplayObject();
            this.bindMatrix();
            this.bindDisplayObjectContainer();
            this.bindSprite();
            this.bindStage();
        }
        var __egretProto__ = BindManager.prototype;
        __egretProto__.bindEvent = function () {
            egret.Event.prototype["clone"] = function () {
                return new egret.Event(this.type, this.bubbles, this.cancelable);
            };
            egret.Event.prototype["toString"] = function () {
                return "[Event type=" + this.type + " bubbles=" + this.bubbles + " cancelable=" + this.cancelable + "]";
            };
            egret.Event.prototype["formatToString"] = function () {
                return JSON.stringify(this);
            };
        };
        /**
         * 为DisplayObject 绑定属性
         */
        __egretProto__.bindDisplayObject = function () {
            //注册mouseX、mouseY
            if (!egret.DisplayObject.prototype.hasOwnProperty("mouseX")) {
                Object.defineProperty(egret.DisplayObject.prototype, "mouseX", {
                    get: function () {
                        return this.globalToLocal(egret.MainContext.instance.touchContext["lastTouchX"], egret.MainContext.instance.touchContext["lastTouchY"]).x;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
            if (!egret.DisplayObject.prototype.hasOwnProperty("root")) {
                Object.defineProperty(egret.DisplayObject.prototype, "root", {
                    get: function () {
                        return this;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
            if (!egret.DisplayObject.prototype.hasOwnProperty("mouseY")) {
                Object.defineProperty(egret.DisplayObject.prototype, "mouseY", {
                    get: function () {
                        return this.globalToLocal(egret.MainContext.instance.touchContext["lastTouchX"], egret.MainContext.instance.touchContext["lastTouchY"]).y;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
            if (!egret.DisplayObject.prototype.hasOwnProperty("loaderInfo")) {
                Object.defineProperty(egret.DisplayObject.prototype, "loaderInfo", {
                    get: function () {
                        var info = new flash.LoaderInfo();
                        info.applicationDomain = new flash.ApplicationDomain();
                        return info;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        };
        __egretProto__.bindSprite = function () {
        };
        __egretProto__.bindStage = function () {
            if (!egret.Stage.prototype.hasOwnProperty("invalidate")) {
                egret.Stage.prototype.invalidate = function () {
                };
            }
            if (!egret.Stage.prototype.hasOwnProperty("focus")) {
                egret.Stage.prototype.invalidate = function () {
                };
            }
            if (!egret.Stage.prototype.hasOwnProperty("quality")) {
                egret.Stage.prototype.invalidate = function () {
                };
            }
            if (!egret.Stage.prototype.hasOwnProperty("isFocusInaccessible")) {
                egret.Stage.prototype["isFocusInaccessible"] = function () {
                    return false;
                };
            }
            if (!egret.Stage.prototype.hasOwnProperty("allowsFullScreen")) {
                Object.defineProperty(egret.Stage.prototype, "allowsFullScreen", {
                    get: function () {
                        //不起作用
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        };
        __egretProto__.bindDisplayObjectContainer = function () {
            if (!egret.DisplayObjectContainer.prototype.hasOwnProperty("tabChildren")) {
                Object.defineProperty(egret.DisplayObjectContainer.prototype, "tabChildren", {
                    get: function () {
                        //不起作用
                        return false;
                    },
                    set: function (b) {
                        //没有处理
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        };
        __egretProto__.bindMatrix = function () {
            if (!egret.Matrix.prototype.hasOwnProperty("concat")) {
                egret.Matrix.prototype["concat"] = function (mtx) {
                    this.prepend(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
                    //this.append(mtx.a,mtx.b,mtx.c,mtx.d,mtx.tx,mtx.ty);
                };
            }
        };
        __egretProto__.bindBitmap = function () {
            if (!flash.Bitmap.prototype.hasOwnProperty("pixelSnapping")) {
                Object.defineProperty(flash.Bitmap.prototype, "pixelSnapping", {
                    get: function () {
                        //不起作用
                        return false;
                    },
                    set: function (b) {
                        //没有处理
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        };
        return BindManager;
    })();
    flash.BindManager = BindManager;
    BindManager.prototype.__class__ = "flash.BindManager";
})(flash || (flash = {}));
