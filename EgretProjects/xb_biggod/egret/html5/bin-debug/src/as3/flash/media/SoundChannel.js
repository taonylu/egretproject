/**
 * Created by huitao on 5/6/2015.
 */
var flash;
(function (flash) {
    var SoundChannel = (function (_super) {
        __extends(SoundChannel, _super);
        function SoundChannel($s) {
            _super.call(this);
            this.$sound = $s;
        }
        var __egretProto__ = SoundChannel.prototype;
        Object.defineProperty(__egretProto__, "leftPeak", {
            get: function () {
                return this.$leftPeak;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "position", {
            get: function () {
                return this.$position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "rightPeak", {
            get: function () {
                return this.$rightPeak;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "soundTransform", {
            get: function () {
                return this.$soundTransform;
            },
            set: function ($value) {
                if (this.$sound != null) {
                    this.$sound.setVolume($value.volume);
                }
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.scompleteFun = function (e) {
            this.dispatchEvent(e);
        };
        __egretProto__.stop = function () {
            if (this.$sound != null) {
                this.$sound.pause();
            }
        };
        return SoundChannel;
    })(egret.EventDispatcher);
    flash.SoundChannel = SoundChannel;
    SoundChannel.prototype.__class__ = "flash.SoundChannel";
})(flash || (flash = {}));
