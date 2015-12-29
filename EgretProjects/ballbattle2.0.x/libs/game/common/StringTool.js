/**
*  文 件 名：StringTool.ts
*  功    能： 字符串工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/15
*  修改日期：2015/9/15
*  修改日志：
*/
var StringTool = (function () {
    function StringTool() {
    }
    var __egretProto__ = StringTool.prototype;
    /**
    * 中英文混合字符串转换成包含unicode码的字符串
    * "abc一二三123" -> "abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123"
    */
    StringTool.mixToUnicode = function (str) {
        var i = 0;
        var l = str.length;
        var result = ""; //转换后的结果
        var unicodePrefix = "\\u"; //unicode前缀 (example:\1234||\u1234)
        var unicode16; //转换成16进制后的unicode
        var charCode;
        for (; i < l; i++) {
            //转为16进制的unicode
            charCode = str.charCodeAt(i);
            if (charCode > 255) {
                unicode16 = charCode.toString(16);
                result += unicodePrefix + unicode16;
            }
            else {
                result += str.charAt(i);
            }
        }
        return result;
    };
    /**
     *中英文混合unicode转换成含中文的字符串
     * abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123 ->abc一二三123
     */
    StringTool.mixUnicodeToCh = function (str) {
        return eval("'" + str + "'");
    };
    return StringTool;
})();
StringTool.prototype.__class__ = "StringTool";
