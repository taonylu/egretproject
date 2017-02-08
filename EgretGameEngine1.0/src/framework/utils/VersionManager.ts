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
class VersionManager extends SingleClass {
    
    /**
     * 初始化版本号
     * @version 版本号
     */
    public init() {
        var version = window["version"];
        if(version == null){
            console.warn("version not init");
            return;
        }
        console.log("版本号:",version);
        RES.web.Html5VersionController.prototype.getVirtualUrl = function(url) {
            if(url.indexOf("?") == -1) {
                url += "?v=" + version;
            } else {
                url += "&v=" + version;
            }
            return url;
        }
    }


}
