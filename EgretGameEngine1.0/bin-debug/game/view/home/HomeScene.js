/**
 * 主页
 * @author chenkai
 * @date 2016/12/26
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        this.skinName = "HomeSceneSkin";
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.childrenCreated = function () {
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
