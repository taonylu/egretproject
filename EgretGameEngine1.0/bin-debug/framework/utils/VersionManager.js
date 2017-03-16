var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 版本控制管理
 * 通过重写getVirtualUrl方法，下载链接后增加?v=version
 * @author chenkai
 * @date 2016/12/18
 *
 * Example:
 * //加载开始前，先初始化版本号
 * App.VersionManager.init();
 */
var VersionManager = (function (_super) {
    __extends(VersionManager, _super);
    function VersionManager() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 初始化版本号
     * @version 版本号
     */
    VersionManager.prototype.init = function () {
        var version = window["version"];
        if (version == null) {
            console.warn("version not init");
            return;
        }
        console.log("版本号:", version);
        RES.web.Html5VersionController.prototype.getVirtualUrl = function (url) {
            if (url.indexOf("?") == -1) {
                url += "?v=" + version;
            }
            else {
                url += "&v=" + version;
            }
            return url;
        };
    };
    return VersionManager;
}(SingleClass));
__reflect(VersionManager.prototype, "VersionManager");
//# sourceMappingURL=VersionManager.js.map