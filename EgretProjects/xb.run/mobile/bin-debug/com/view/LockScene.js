/**
 * 校准页面
 * @author
 *
 */
var LockScene = (function (_super) {
    __extends(LockScene, _super);
    function LockScene() {
        _super.call(this, "LockSceneSkin");
    }
    var d = __define,c=LockScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    return LockScene;
}(BaseScene));
egret.registerClass(LockScene,'LockScene');
