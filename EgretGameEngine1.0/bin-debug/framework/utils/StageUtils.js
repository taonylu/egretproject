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
    /**初始化舞台 egret.MainContext API废弃，这里必须在Main.ts里传入stage*/
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
    /**改变舞台适配模式 PC上showall，手机上大于4:3FixedWidth，小于4:3showAll*/
    p.changeStageMode = function () {
        if (App.DeviceUtils.isPC) {
            this.changeBgColor("#ffffff");
            this.getStage().orientation = egret.OrientationMode.AUTO;
            this.getStage().scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        else {
            this.changeBgColor("#fb5116");
            if (this.stageHeight / this.stageWidth <= 4 / 3) {
                this.getStage().scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
            else {
                this.getStage().scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            }
        }
    };
    /**改变背景颜色*/
    p.changeBgColor = function (color) {
        document.body.style.backgroundColor = color;
    };
    /**激活和非激活处理*/
    p.activeHandler = function () {
        this.stage.addEventListener(egret.Event.ACTIVATE, function () {
            egret.log("active");
            App.Sound.resumeBGM();
        }, this);
        this.stage.addEventListener(egret.Event.DEACTIVATE, function () {
            egret.log("deactive");
            App.Sound.pauseBGM();
        }, this);
    };
    return StageUtils;
}(SingleClass));
egret.registerClass(StageUtils,'StageUtils');
