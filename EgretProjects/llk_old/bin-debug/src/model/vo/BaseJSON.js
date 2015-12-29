/**
*  文 件 名：BaseJSON.ts
*  功    能：JSON数据基类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
var BaseJSON = (function () {
    function BaseJSON() {
    }
    var __egretProto__ = BaseJSON.prototype;
    __egretProto__.getJSONString = function () {
        return JSON.stringify(this.json);
    };
    __egretProto__.readData = function (msg) {
        this.json = JSON.parse(msg);
    };
    return BaseJSON;
})();
BaseJSON.prototype.__class__ = "BaseJSON";
