/**
 * Created by huitao on 5/4/2015.
 */
var flash;
(function (flash) {
    var TextFormatAlign = (function () {
        function TextFormatAlign() {
        }
        var __egretProto__ = TextFormatAlign.prototype;
        /**[static] 常数；在文本字段内将文本居中对齐。 */
        TextFormatAlign.CENTER = "center";
        /**[static] 常数；在文本字段内将文本两端对齐。*/
        TextFormatAlign.JUSTIFY = "justify";
        /**[static] 常数；在文本字段内将文本左对齐。 */
        TextFormatAlign.LEFT = "left";
        /**[static] 常数；在文本字段内将文本右对齐。 */
        TextFormatAlign.RIGHT = "right";
        return TextFormatAlign;
    })();
    flash.TextFormatAlign = TextFormatAlign;
    TextFormatAlign.prototype.__class__ = "flash.TextFormatAlign";
})(flash || (flash = {}));
