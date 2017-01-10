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
    var d = __define,c=StringTool,p=c.prototype;
    /**
     * 获取时间字符串
     * @param time 时间数字
     * @return 补0后的时间字符串
     *
     * 范例：
     * getTimeString(7)  //返回"07"
     * getTimeString(11) //返回"11"
     */
    StringTool.getTimeString = function (time) {
        var str = "";
        if (time < 10) {
            str = "0" + time;
        }
        else {
            str = time.toString();
        }
        return str;
    };
    return StringTool;
}());
egret.registerClass(StringTool,'StringTool');
