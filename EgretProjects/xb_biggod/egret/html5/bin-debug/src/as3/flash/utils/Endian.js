/**
 * Created by huitao on 5/6/2015.
 */
var flash;
(function (flash) {
    var Endian = (function () {
        function Endian() {
        }
        var __egretProto__ = Endian.prototype;
        /**
         * 指示多字节数字的最高有效字节位于字节序列的最前面。
         * @type {string}
         */
        Endian.BIG_ENDIAN = "bigEndian";
        /**
         * 指示多字节数字的最低有效字节位于字节序列的最前面。
         * @type {string}
         */
        Endian.LITTLE_ENDIAN = "littleEndian";
        return Endian;
    })();
    flash.Endian = Endian;
    Endian.prototype.__class__ = "flash.Endian";
})(flash || (flash = {}));
