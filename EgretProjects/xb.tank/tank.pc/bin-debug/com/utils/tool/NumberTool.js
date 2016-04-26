/**
*  文 件 名：NumberTool.ts
*  功    能：数字工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
var NumberTool = (function () {
    function NumberTool() {
    }
    var d = __define,c=NumberTool,p=c.prototype;
    /**
     * 获取随机数
     * @param start 起始数字
     * @param end 终止数字
     * @return 返回随机数字
     * Example: getRandomInt(1,3) 返回1 2 3
     */
    NumberTool.getRandomInt = function (start, end) {
        return Math.round(Math.random() * (end - start)) + start;
    };
    /**
     * 获取验证码
     * @param n 验证码位数
     */
    NumberTool.getVerificationCode = function (n) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var len = str.length;
        var result = "";
        for (var i = 0; i < n; i++) {
            result += str.charAt(NumberTool.getRandomInt(0, len));
        }
        return result;
    };
    return NumberTool;
}());
egret.registerClass(NumberTool,'NumberTool');
//# sourceMappingURL=NumberTool.js.map