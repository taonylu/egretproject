/**
 * Created by chenpeng on 2015/5/8.
 */
var flash;
(function (flash) {
    var LoaderContext = (function () {
        function LoaderContext(checkPolicyFile, applicationDomain, securityDomain) {
            if (checkPolicyFile === void 0) { checkPolicyFile = false; }
            if (applicationDomain === void 0) { applicationDomain = null; }
            if (securityDomain === void 0) { securityDomain = null; }
            // 指定在加载对象之前是否应检查有无 URL 策略文件。
            this.checkPolicyFile = false;
            // 指定要用于 Loader 对象的 ApplicationDomain 对象。
            this.applicationDomain = null;
            // 指定要用于 Loader 对象的 SecurityDomain 对象。
            this.securityDomain = null;
            this.allowLoadBytesCodeExcution = false;
            this.imageDecodingPolicy = "";
            this.parameters = null;
            this.allowCodeImport = false;
            this.checkPolicyFile = checkPolicyFile;
            this.applicationDomain = applicationDomain;
            this.securityDomain = securityDomain;
        }
        var __egretProto__ = LoaderContext.prototype;
        return LoaderContext;
    })();
    flash.LoaderContext = LoaderContext;
    LoaderContext.prototype.__class__ = "flash.LoaderContext";
})(flash || (flash = {}));
