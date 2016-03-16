/**
 * 我的团队
 * @author
 *
 */
var MyTeam = (function () {
    function MyTeam() {
        this.teamObj = {}; //我的所有团队
    }
    var d = __define,c=MyTeam,p=c.prototype;
    MyTeam.getInstance = function () {
        if (this.instance == null) {
            this.instance = new MyTeam();
        }
        return this.instance;
    };
    return MyTeam;
})();
egret.registerClass(MyTeam,'MyTeam');
