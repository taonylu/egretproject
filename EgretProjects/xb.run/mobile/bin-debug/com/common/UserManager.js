/**
 * 用户管理类
 * @author
 *
 */
var UserManager = (function () {
    function UserManager() {
        /**角色 0兔子 1熊猫 2麋鹿*/
        this.roleID = 0;
        /**角色名字列表*/
        this.roleNameList = ["哈哈兔", "悠悠熊猫", "暴躁鹿"];
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
