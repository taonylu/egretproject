/**
 * 用户数据
 * @author
 *
 */
var UserVO = (function () {
    function UserVO() {
        this.uid = ""; //用户ID
        this.name = ""; //用户名
        this.cancelBloukNum = 0; //消除方块的数量,用于计算进度
    }
    var d = __define,c=UserVO,p=c.prototype;
    //只清理引用的数据
    p.clear = function () {
        this.headBmd = null;
        if (this.gameHeadUI) {
            this.gameHeadUI.clear();
            this.gameHeadUI = null;
        }
        if (this.headUI) {
            this.headUI.reset();
            this.headUI = null;
        }
    };
    return UserVO;
})();
egret.registerClass(UserVO,'UserVO');
