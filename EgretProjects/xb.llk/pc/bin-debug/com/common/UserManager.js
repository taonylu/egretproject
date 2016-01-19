/**
 *
 * @author
 *
 */
var UserManager = (function () {
    function UserManager() {
        this.luckyUser = ""; //大屏显示用户
        this.userList = {}; //用户列表，根据uid保存userVO信息
    }
    var d = __define,c=UserManager,p=c.prototype;
    //保存用户
    p.storeUser = function (userVO) {
        this.userList[userVO.uid] = userVO;
    };
    //获取用户
    p.getUser = function (uid) {
        return this.userList[uid];
    };
    //删除用户
    p.deleteUser = function (uid) {
        if (this.isExist(uid)) {
            var userVO = this.userList[uid];
            userVO.clear();
        }
        delete this.userList[uid];
    };
    //用户是否存在
    p.isExist = function (uid) {
        if (this.userList[uid]) {
            return true;
        }
        return false;
    };
    //清理用户列表
    p.clear = function () {
        for (var key in this.userList) {
            var userVO = this.userList[key];
            userVO.clear();
            delete this.userList[key];
        }
    };
    UserManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new UserManager();
        }
        return this.instance;
    };
    return UserManager;
})();
egret.registerClass(UserManager,'UserManager');
