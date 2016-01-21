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
     * getRandomInt(1,3) //返回1-3
     */
    NumberTool.getRandomInt = function (start, end) {
        return Math.round(Math.random() * (end - start)) + start;
    };
    /**
     * 获取时间字符串
     * @param time 时间数字
     * @return 补0后的时间字符串
     * getTimeString(7)  //返回"07"
     * getTimeString(11) //返回"11"
     */
    NumberTool.getTimeString = function (time) {
        var str = "";
        if (time < 10) {
            str = "0" + time;
        }
        else {
            str = time.toString();
        }
        return str;
    };
    return NumberTool;
})();
egret.registerClass(NumberTool,'NumberTool');
