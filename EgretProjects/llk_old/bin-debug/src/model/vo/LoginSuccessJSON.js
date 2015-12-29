/**
*  文 件 名：LoginSuccessJSON.ts
*  功    能： 登录成功
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
var LoginSuccessJSON = (function () {
    function LoginSuccessJSON() {
        this.cmd = 1001;
        this.userID = 0;
        this.userName = "";
    }
    var __egretProto__ = LoginSuccessJSON.prototype;
    __egretProto__.readData = function (json) {
        this.json = json;
        this.cmd = this.json.cmd;
        this.userID = this.json.userID;
        this.userName = StringTool.mixUnicodeToCh(this.json.userName);
        //this.userName = this.json.userName;
    };
    return LoginSuccessJSON;
})();
LoginSuccessJSON.prototype.__class__ = "LoginSuccessJSON";
