/**
 * 用户数据
 * @author
 *
 */
var UserVO = (function () {
    function UserVO() {
        this.uid = ""; //用户ID
        this.name = ""; //用户名
    }
    var d = __define,c=UserVO,p=c.prototype;
    return UserVO;
})();
egret.registerClass(UserVO,'UserVO');
