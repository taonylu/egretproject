/**
 * 舞台管理类
 * @author chenkai
 * @date 2016/12/23
 */
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    function StageUtils() {
        _super.call(this);
    }
    var d = __define,c=StageUtils,p=c.prototype;
    d(p, "stage"
        ,function () {
            return egret.MainContext.instance.stage;
        }
    );
    return StageUtils;
}(SingleClass));
egret.registerClass(StageUtils,'StageUtils');
//# sourceMappingURL=StageUtils.js.map