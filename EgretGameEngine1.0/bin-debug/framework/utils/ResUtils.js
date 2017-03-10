var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 资源加载
 * 支持单个或多个资源组加载
 *
 * Example:
 * //添加配置文件，并加载配置文件
 * App.ResUtils.addConfig("resource/default.res.json", "resource/");
 * App.ResUtils.loadConfig(this.onConfigComplete, this);
 *
 * //静默加载
 * App.ResUtils.loadGroupQuiet("preload");
 *
 * //加载单个资源组
 * App.ResUtils.loadGroup("preload", this.onPreloadComplete, this);
 *
 * //加载多个资源组
 * App.ResUtils.loadGroups("All",["preload","home"],this.onLoadComplete,this.onLoadProgress, this);
 */
var ResUtils = (function (_super) {
    __extends(ResUtils, _super);
    /**
     * 构造函数
     */
    function ResUtils() {
        var _this = _super.call(this) || this;
        _this.groupMap = {};
        _this.configs = new Array();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this.onResourceLoadComplete, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, _this.onResourceLoadProgress, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, _this.onResourceLoadError, _this);
        return _this;
    }
    /**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    ResUtils.prototype.addConfig = function (jsonPath, filePath) {
        this.configs.push([jsonPath, filePath]);
    };
    /**
     * 开始加载配置文件
     * @param onConfigComplete 加载完成执行函数
     * @param onConfigCompleteTarget 加载完成执行函数所属对象
     */
    ResUtils.prototype.loadConfig = function (onConfigComplete, onConfigCompleteTarget) {
        this.onConfigComplete = onConfigComplete;
        this.onConfigCompleteTarget = onConfigCompleteTarget;
        this.loadNextConfig();
    };
    /**
     * 加载
     */
    ResUtils.prototype.loadNextConfig = function () {
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
    ResUtils.prototype.onConfigCompleteHandle = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    };
    /**
     * 加载资源组，静默加载(无回调函数)
     * @groupName 资源组
     */
    ResUtils.prototype.loadGroupQuiet = function (groupName) {
        RES.loadGroup(groupName);
    };
    /**
     * 加载资源组，带加载完成回调
     * @groupName 资源组
     * @onComplete 加载完成回调
     * @thisObject 回调执行对象
     */
    ResUtils.prototype.loadGroup = function (groupName, onComplete, thisObject) {
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
    ResUtils.prototype.loadGroups = function (groupName, keys, onComplete, onProgress, thisObject) {
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
    ResUtils.prototype.loadGroupWithPro = function (groupName, onComplete, onProgress, thisObject) {
        this.groupMap[groupName] = [onComplete, onProgress, thisObject];
        RES.loadGroup(groupName);
    };
    /**
     * 资源组加载完成
     */
    ResUtils.prototype.onResourceLoadComplete = function (event) {
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
    ResUtils.prototype.onResourceLoadProgress = function (event) {
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
    ResUtils.prototype.onResourceLoadError = function (event) {
        console.log(event.groupName + "资源组有资源加载失败");
        this.onResourceLoadComplete(event);
    };
    /**清理加载回调*/
    ResUtils.prototype.clearAllCallBack = function () {
        for (var key in this.groupMap) {
            this.groupMap[key] = null;
            delete this.groupMap[key];
        }
    };
    return ResUtils;
}(SingleClass));
__reflect(ResUtils.prototype, "ResUtils");
