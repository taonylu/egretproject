var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 设备工具类
 * @author chenkai
 * @date 2016/12/18
 */
var DeviceUtils = (function (_super) {
    __extends(DeviceUtils, _super);
    function DeviceUtils() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DeviceUtils.prototype, "isNative", {
        /**是否Native*/
        get: function () {
            return (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "isWeb", {
        /**是否Web*/
        get: function () {
            return (egret.Capabilities.runtimeType == egret.RuntimeType.WEB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "isMoile", {
        /**是否移动端*/
        get: function () {
            return egret.Capabilities.isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "isPC", {
        /**是否PC端*/
        get: function () {
            return !egret.Capabilities.isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "isAndroid", {
        /**是否Android系统*/
        get: function () {
            return egret.Capabilities.os == "Android";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "isIos", {
        /**是否ios系统*/
        get: function () {
            return egret.Capabilities.os == "iOS";
        },
        enumerable: true,
        configurable: true
    });
    return DeviceUtils;
}(SingleClass));
__reflect(DeviceUtils.prototype, "DeviceUtils");
//# sourceMappingURL=DeviceUtils.js.map