/**
*  文 件 名：NumberTool.ts
*  功    能：数字工具类
*  内    容：
*  作    者： Rikiamru
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
    return NumberTool;
}());
egret.registerClass(NumberTool,'NumberTool');
