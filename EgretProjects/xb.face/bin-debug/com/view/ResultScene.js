/**
 * 测试颜值结果场景
 * @author
 *
 */
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        _super.call(this, "ResultSceneSkin");
    }
    var d = __define,c=ResultScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    return ResultScene;
})(BaseScene);
egret.registerClass(ResultScene,'ResultScene');
