/**
 *
 * @author
 *
 */
var UserManager = (function () {
    function UserManager() {
        this.luckyUser = ""; //大屏显示用户
        this.bLuckUser = false;
    }
    var d = __define,c=UserManager,p=c.prototype;
    UserManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new UserManager();
        }
        return this.instance;
    };
    return UserManager;
})();
egret.registerClass(UserManager,'UserManager');
