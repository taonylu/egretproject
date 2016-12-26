/**
 * 资源加载
 * 支持单个或多个资源组加载
 */
var ResUtils = (function (_super) {
    __extends(ResUtils, _super);
    /**
     * 构造函数
     */
    function ResUtils() {
        _super.call(this);
        this.groupMap = {};
        this.configs = new Array();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    }
    var d = __define,c=ResUtils,p=c.prototype;
    /**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    p.addConfig = function (jsonPath, filePath) {
        this.configs.push([jsonPath, filePath]);
    };
    /**
     * 开始加载配置文件
     * @param onConfigComplete 加载完成执行函数
     * @param onConfigCompleteTarget 加载完成执行函数所属对象
     */
    p.loadConfig = function (onConfigComplete, onConfigCompleteTarget) {
        this.onConfigComplete = onConfigComplete;
        this.onConfigCompleteTarget = onConfigCompleteTarget;
        this.loadNextConfig();
    };
    /**
     * 加载
     */
    p.loadNextConfig = function () {
        //加载完成
        if (this.configs.length == 0) {
            this.onConfigComplete.call(this.onConfigCompleteTarget);
            this.onConfigComplete = null;
            this.onConfigCompleteTarget = null;
            return;
        }
        var arr = this.configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    };
    /**
     * 加载完成
     * @param event
     */
    p.onConfigCompleteHandle = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    };
    /**
     * 加载资源组，静默加载(无回调函数)
     * @groupName 资源组
     */
    p.loadGroupQuiet = function (groupName) {
        RES.loadGroup(groupName);
    };
    /**
     * 加载资源组，带加载完成回调
     * @groupName 资源组
     * @onComplete 加载完成回调
     * @thisObject 回调执行对象
     */
    p.loadGroup = function (groupName, onComplete, thisObject) {
        this.groupMap[groupName] = [onComplete, null, thisObject];
        RES.loadGroup(groupName);
    };
    /**
     * 加载多个资源组
     * @groupName 多个资源组名
     * @keys 资源组数组
     * @onComplete 加载完成回调
     * @onProgress 加载进度
     * @thisObject 回调执行对象
     */
    p.loadGroups = function (groupName, keys, onComplete, onProgress, thisObject) {
        this.groupMap[groupName] = [onComplete, onProgress, thisObject];
        RES.createGroup(groupName, keys, false);
        RES.loadGroup(groupName);
    };
    /**
     * 加载资源组，带加载进度
     * @groupName 资源组
     * @onComplete 加载完成回调
     * @onProgress 加载进度回调
     * @thisObject 回调执行对象
     */
    p.loadGroupWithPro = function (groupName, onComplete, onProgress, thisObject) {
        this.groupMap[groupName] = [onComplete, onProgress, thisObject];
        RES.loadGroup(groupName);
    };
    /**
     * 资源组加载完成
     */
    p.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        console.log("资源组加载完成:" + groupName);
        if (this.groupMap[groupName]) {
            var loadComplete = this.groupMap[groupName][0];
            var loadCompleteTarget = this.groupMap[groupName][2];
            if (loadComplete != null) {
                loadComplete.call(loadCompleteTarget);
            }
            this.groupMap[groupName] = null;
            delete this.groupMap[groupName];
        }
    };
    /**
     * 资源组加载进度
     */
    p.onResourceLoadProgress = function (event) {
        var groupName = event.groupName;
        if (this.groupMap[groupName]) {
            var loadProgress = this.groupMap[groupName][1];
            var loadProgressTarget = this.groupMap[groupName][2];
            if (loadProgress != null) {
                loadProgress.call(loadProgressTarget, event);
            }
        }
    };
    /**
     * 资源组加载失败
     */
    p.onResourceLoadError = function (event) {
        console.log(event.groupName + "资源组有资源加载失败");
        this.onResourceLoadComplete(event);
    };
    /**清理加载回调*/
    p.clearAllCallBack = function () {
        for (var key in this.groupMap) {
            this.groupMap[key] = null;
            delete this.groupMap[key];
        }
    };
    return ResUtils;
}(SingleClass));
egret.registerClass(ResUtils,'ResUtils');
