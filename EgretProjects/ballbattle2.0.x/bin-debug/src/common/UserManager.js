/**
*  文 件 名：UserManager.ts
*  功    能：用户数据
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/
var UserManager = (function () {
    function UserManager() {
        /**用户ID*/
        this.userID = 0;
        /**用户昵称*/
        this.userName = "";
        /**用户类型 0游客 1注册用户*/
        this.userType = 0;
        /**皮肤ID*/
        this.skinID = 1;
    }
    var __egretProto__ = UserManager.prototype;
    UserManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new UserManager();
        }
        return this.instance;
    };
    return UserManager;
})();
UserManager.prototype.__class__ = "UserManager";
