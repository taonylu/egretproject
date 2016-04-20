/**
 * 用户管理类
 * @author
 *
 */
var UserManager = (function () {
    function UserManager() {
        this.userList = new Array(); //用户列表
        this.userLimit = 2; //用户数量上限
    }
    var d = __define,c=UserManager,p=c.prototype;
    /**
     * 添加用户
     * @param userVo
     * @return 是否添加成功
     */
    p.addUser = function (userVO) {
        if (this.userList.length < this.userLimit) {
            if (this.isExsit(userVO.openid) == false) {
                this.userList.push(userVO);
                return true;
            }
        }
        else {
            console.log("用户数量已达上限");
        }
        return false;
    };
    //删除用户
    p.deleteUser = function (openid) {
        var len = this.userList.length;
        for (var i = 0; i < len; i++) {
            if (this.userList[i].openid == openid) {
                this.userList.splice(i, 1);
            }
        }
    };
    //获取用户
    p.getUser = function (openid) {
        var len = this.userList.length;
        for (var i = 0; i < len; i++) {
            if (this.userList[i].openid == openid) {
                return this.userList[i];
            }
        }
        return null;
    };
    //是否已存在该用户
    p.isExsit = function (openid) {
        var len = this.userList.length;
        for (var i = 0; i < len; i++) {
            if (this.userList[i].openid == openid) {
                return true;
            }
        }
        return false;
    };
    //超出用户人数限制
    p.isOverUserLimit = function () {
        if (this.userList.length > this.userLimit) {
            return true;
        }
        return false;
    };
    //获取用户人数
    p.getUserNum = function () {
        return this.userList.length;
    };
    //清理所有用户
    p.clearAllUser = function () {
        this.userList.length = 0;
    };
    UserManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new UserManager();
        }
        return this.instance;
    };
    return UserManager;
}());
egret.registerClass(UserManager,'UserManager');
