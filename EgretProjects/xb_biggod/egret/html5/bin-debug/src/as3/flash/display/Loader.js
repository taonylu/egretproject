/**
 * Created by mengj_000 on 2015/4/27.
 */
var flash;
(function (flash) {
    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader() {
            _super.call(this);
            this.$contentLoaderInfo = null;
            this.$context = null;
            this.$contentLoaderInfo = new flash.LoaderInfo();
            this.$contentLoaderInfo.addEventListener(egret.Event.COMPLETE, this.loadComplete, this, false, 0);
            this.$uncaughtErrorEvents = new flash.UncaughtErrorEvents();
        }
        var __egretProto__ = Loader.prototype;
        Object.defineProperty(__egretProto__, "uncaughtErrorEvents", {
            get: function () {
                return this.$uncaughtErrorEvents;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.addEventListener_as3 = function (type, listener, useCapture, priority, weak) {
            this.addEventListener(type, listener, null, useCapture, priority);
        };
        __egretProto__.loadComplete = function (e) {
            this.addChild(this.$contentLoaderInfo.content);
        };
        Object.defineProperty(__egretProto__, "content", {
            get: function () {
                return this.$contentLoaderInfo.content;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "contentLoaderInfo", {
            get: function () {
                return this.$contentLoaderInfo;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.loadBytes = function (byts, context) {
            if (context === void 0) { context = null; }
        };
        __egretProto__.load = function (req, context) {
            if (context === void 0) { context = null; }
            if (req.url.indexOf(".swf") != -1 || req.url.indexOf(".SWF") != -1) {
                if (null == context) {
                    context = new flash.LoaderContext(false, flash.ApplicationDomain.currentDomain);
                }
                if (null == context.applicationDomain) {
                    context.applicationDomain = flash.ApplicationDomain.currentDomain;
                }
                this.$context = context;
                this.$contentLoaderInfo.applicationDomain = context.applicationDomain;
            }
            this.$contentLoaderInfo.initWidthLoader(this, req);
        };
        __egretProto__.close = function () {
        };
        return Loader;
    })(egret.DisplayObjectContainer);
    flash.Loader = Loader;
    Loader.prototype.__class__ = "flash.Loader";
})(flash || (flash = {}));
