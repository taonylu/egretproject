/**
 * 我的团队页面
 * @author
 *
 */
var MyTeamScene = (function (_super) {
    __extends(MyTeamScene, _super);
    function MyTeamScene() {
        _super.call(this, "MyTeamSceneSkin");
    }
    var d = __define,c=MyTeamScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    return MyTeamScene;
})(BaseScene);
egret.registerClass(MyTeamScene,'MyTeamScene');
