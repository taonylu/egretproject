/**
 * 设备工具类
 * @author chenkai
 * @date 2016/12/18
 */
var DeviceUtils = (function (_super) {
    __extends(DeviceUtils, _super);
    function DeviceUtils() {
        _super.apply(this, arguments);
    }
    var d = __define,c=DeviceUtils,p=c.prototype;
    d(p, "isNative"
        /**是否Native*/
        ,function () {
            return (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE);
        }
    );
    d(p, "isWeb"
        /**是否Web*/
        ,function () {
            return (egret.Capabilities.runtimeType == egret.RuntimeType.WEB);
        }
    );
    d(p, "isMoile"
        /**是否移动端*/
        ,function () {
            return egret.Capabilities.isMobile;
        }
    );
    d(p, "isPC"
        /**是否PC端*/
        ,function () {
            return !egret.Capabilities.isMobile;
        }
    );
    return DeviceUtils;
}(SingleClass));
egret.registerClass(DeviceUtils,'DeviceUtils');
//# sourceMappingURL=DeviceUtils.js.map