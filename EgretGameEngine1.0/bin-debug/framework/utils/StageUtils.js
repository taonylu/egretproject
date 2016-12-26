/**
 * 舞台管理类
 * @author chenkai
 * @date 2016/12/23
 */
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    function StageUtils() {
        _super.apply(this, arguments);
    }
    var d = __define,c=StageUtils,p=c.prototype;
    /**初始化舞台*/
    p.init = function (stage) {
        this.stage = stage;
    };
    /**获取舞台*/
    p.getStage = function () {
        return this.stage;
    };
    d(p, "stageWidth"
        /**舞台宽度*/
        ,function () {
            return this.stage.stageWidth;
        }
    );
    d(p, "stageHeight"
        /**舞台高度*/
        ,function () {
            return this.stage.stageHeight;
        }
    );
    return StageUtils;
}(SingleClass));
egret.registerClass(StageUtils,'StageUtils');
