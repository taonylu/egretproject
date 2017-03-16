var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 舞台管理类
 * @author chenkai
 * @date 2016/12/23
 *
 * Example:
 * //进入游戏场景钱，先初始化stage
 * App.StageUtils.init(this.stage);
 *
 * //全局获取stage
 * App.StageUtils.getStage();
 */
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    function StageUtils() {
        return _super.apply(this, arguments) || this;
    }
    /**初始化舞台 egret.MainContext API废弃，这里必须在Main.ts里传入stage*/
    StageUtils.prototype.init = function (stage) {
        this.stage = stage;
    };
    Object.defineProperty(StageUtils.prototype, "stageWidth", {
        /**舞台宽度*/
        get: function () {
            return this.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils.prototype, "stageHeight", {
        /**舞台高度*/
        get: function () {
            return this.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    /**改变舞台适配模式 PC上showall，手机上大于4:3FixedWidth，小于4:3showAll*/
    StageUtils.prototype.changeStageMode = function () {
        if (App.DeviceUtils.isPC) {
            this.stage.orientation = egret.OrientationMode.AUTO;
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        else {
            if (this.stageHeight / this.stageWidth <= 4 / 3) {
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
            else {
                this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            }
        }
    };
    /**改变背景颜色 颜色值:"#FFFFFF" */
    StageUtils.prototype.changeBgColor = function (color) {
        document.body.style.backgroundColor = color;
    };
    /**窗口失去焦点时，停止播放音乐*/
    StageUtils.prototype.addFocusListener = function () {
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
__reflect(StageUtils.prototype, "StageUtils");
//# sourceMappingURL=StageUtils.js.map