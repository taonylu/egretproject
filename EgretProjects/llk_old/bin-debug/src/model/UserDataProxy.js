/**
*  文 件 名：UserDataProxy.ts
*  功    能： 用户数据
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
var UserDataProxy = (function (_super) {
    __extends(UserDataProxy, _super);
    function UserDataProxy() {
        _super.call(this, UserDataProxy.NAME);
        this.userID = 0;
        this.userName = "";
    }
    var __egretProto__ = UserDataProxy.prototype;
    UserDataProxy.NAME = "UserDataProxy";
    return UserDataProxy;
})(puremvc.Proxy);
UserDataProxy.prototype.__class__ = "UserDataProxy";
