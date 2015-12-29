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
    var __egretProto__ = NumberTool.prototype;
    /**
     * 获取随机数,(1,3) 返回1 2 3
     */
    NumberTool.getRandomInt = function (start, end) {
        return Math.round(Math.random() * (end - start)) + start;
    };
    return NumberTool;
})();
NumberTool.prototype.__class__ = "NumberTool";
