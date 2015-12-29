/**
 * Created by huitao on 5/6/2015.
 */
var flash;
(function (flash) {
    var SoundTransform = (function () {
        function SoundTransform(vol, panning) {
            if (vol === void 0) { vol = 1; }
            if (panning === void 0) { panning = 0; }
            this.pan = panning;
            this.volume = vol;
        }
        var __egretProto__ = SoundTransform.prototype;
        return SoundTransform;
    })();
    flash.SoundTransform = SoundTransform;
    SoundTransform.prototype.__class__ = "flash.SoundTransform";
})(flash || (flash = {}));
