/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.userMax = 8; //用户最大数量
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.initView = function () {
    };
    //接收用户自己数据
    p.revUserInfo = function (data) {
        var id = data.id;
        var avatar = data.avatar;
        var name = data.name;
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,'HomeScene');
