/**
 * 数字工具类
 * @author
 *
 */
var NumberTool = (function () {
    function NumberTool() {
    }
    var d = __define,c=NumberTool,p=c.prototype;
    /**
     * 时间格式转换  0 -> "00"
     */
    NumberTool.timeFormat = function (value) {
        if (value < 10) {
            return ("0" + value);
        }
        else {
            return value + "";
        }
    };
    return NumberTool;
}());
egret.registerClass(NumberTool,'NumberTool');
