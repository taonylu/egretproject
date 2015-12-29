/**
*  文 件 名：LoginJSON.ts
*  功    能： 登录JSON
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
var LoginJSON = (function () {
    function LoginJSON() {
        this.cmd = 1000;
    }
    var __egretProto__ = LoginJSON.prototype;
    __egretProto__.getJSONString = function () {
        //测试
        this.json = {
            "cmd": this.cmd,
            "userID": this.userID,
        };
        return JSON.stringify(this.json);
    };
    return LoginJSON;
})();
LoginJSON.prototype.__class__ = "LoginJSON";
