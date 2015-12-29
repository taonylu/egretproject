/**
 * Created by chenpeng on 2015/6/11.
 */
var flash;
(function (flash) {
    var SwfSound = (function (_super) {
        __extends(SwfSound, _super);
        /**
         * 创建一个新的 Sound 对象。
         * @param stream
         * @param context 不支持
         */
        function SwfSound(stream, context) {
            if (stream === void 0) { stream = null; }
            if (context === void 0) { context = null; }
            _super.call(this, stream, context);
            this.$init();
        }
        var __egretProto__ = SwfSound.prototype;
        __egretProto__.$init = function () {
            if (null == this.conf) {
                return;
            }
            else {
                if (null != this.define) {
                    this.initWithDefine(this.define);
                }
            }
        };
        __egretProto__.initWithDefine = function (define) {
            this.define = define;
            var soundName = egret.Config.GetResName(this.define.id, egret.Config.RESSound);
            soundName = this.conf.resNamePrefix + soundName;
            var sound = RES.getRes(soundName);
            sound.type = egret.Sound.EFFECT;
            this['_sound'] = sound;
        };
        return SwfSound;
    })(flash.Sound);
    flash.SwfSound = SwfSound;
    SwfSound.prototype.__class__ = "flash.SwfSound";
})(flash || (flash = {}));
