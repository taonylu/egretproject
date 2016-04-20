/**
 * 用户管理类
 * @author
 *
 */
var UserManager = (function () {
    function UserManager() {
    }
    var d = __define,c=UserManager,p=c.prototype;
    UserManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new UserManager();
        }
        return this.instance;
    };
    return UserManager;
}());
egret.registerClass(UserManager,'UserManager');
