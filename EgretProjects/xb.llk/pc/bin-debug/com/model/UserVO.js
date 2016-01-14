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
    p.clear = function () {
        this.cancelBloukNum = 0;
        this.gameHeadUI.clear();
        this.headUI.clear();
        this.headUI = null;
        this.gameHeadUI = null;
    };
    return UserVO;
})();
egret.registerClass(UserVO,'UserVO');
