/**
 * Created by huitao on 5/6/2015.
 */
var flash;
(function (flash) {
    var Sound = (function (_super) {
        __extends(Sound, _super);
        function Sound(stream, context) {
            if (stream === void 0) { stream = null; }
            if (context === void 0) { context = null; }
            _super.call(this);
            this.musicLoad(stream);
        }
        var __egretProto__ = Sound.prototype;
        Object.defineProperty(__egretProto__, "bytesLoaded", {
            get: function () {
                return this.$bytesLoaded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "bytesTotal", {
            get: function () {
                return this.$bytesTotal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "id3", {
            get: function () {
                return this.$id3;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.isBuffering = function () {
            return this.$isBuffering;
        };
        Object.defineProperty(__egretProto__, "length", {
            get: function () {
                return this.$length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "url", {
            get: function () {
                return this.$url;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.musicLoad = function (stream) {
            if (stream === void 0) { stream = null; }
            if (stream != null) {
                this.$url = stream.url;
                var res = new RES.ResourceItem(this.$url, this.$url, RES.ResourceItem.TYPE_SOUND);
                RES.getResByUrl(this.$url, this.completeFun, this, RES.ResourceItem.TYPE_SOUND);
            }
        };
        __egretProto__.id3Fun = function (e) {
        };
        __egretProto__.completeFun = function (data, url) {
            this.$sound = data;
            var sevent = new egret.Event(egret.Event.COMPLETE, false, false);
            sevent.data = data;
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        };
        __egretProto__.progressFun = function (e) {
            this.$bytesLoaded = e.bytesLoaded;
            this.$bytesTotal = e.bytesTotal;
            this.dispatchEvent(e);
        };
        __egretProto__.close = function () {
            this.$sound.pause();
        };
        /**
         * 启动从指定 URL 加载外部 MP3 文件的过程。 Sound
         * @param stream
         * @param context
         */
        __egretProto__.load = function (stream, context) {
            if (context === void 0) { context = null; }
            this.musicLoad(stream);
        };
        /**
         * 生成一个新的 SoundChannel 对象来回放该声音。
         * @param startTime
         * @param loops
         * @param sndTransform
         */
        __egretProto__.play = function (startTime, loops, sndTransform) {
            if (startTime === void 0) { startTime = 0; }
            if (loops === void 0) { loops = 0; }
            if (sndTransform === void 0) { sndTransform = null; }
            var sc = new flash.SoundChannel(this.$sound);
            if (sndTransform == null)
                sndTransform = new flash.SoundTransform(0.6, 0);
            sc.soundTransform = sndTransform;
            var lp = loops > 0 ? true : false;
            this.$sound.play(lp);
            if (sndTransform == null) {
                this.$sound.setVolume(1);
            }
            else {
                this.$sound.setVolume(sndTransform.volume);
            }
            return sc;
        };
        return Sound;
    })(egret.EventDispatcher);
    flash.Sound = Sound;
    Sound.prototype.__class__ = "flash.Sound";
})(flash || (flash = {}));
