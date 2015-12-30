/**
 * Created by huitao on 5/5/2015.
 */
var flash;
(function (flash) {
    var TextLineMetrics = (function () {
        function TextLineMetrics(x, width, height, ascent, descent, leading) {
            this.ascent = ascent;
            this.x = x;
            this.width = width;
            this.height = height;
            this.descent = descent;
            this.leading = leading;
        }
        var __egretProto__ = TextLineMetrics.prototype;
        return TextLineMetrics;
    })();
    flash.TextLineMetrics = TextLineMetrics;
    TextLineMetrics.prototype.__class__ = "flash.TextLineMetrics";
})(flash || (flash = {}));
