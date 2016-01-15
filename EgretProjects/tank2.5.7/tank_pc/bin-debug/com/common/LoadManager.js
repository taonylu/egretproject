/**
*  文 件 名：LoadManager.ts
*  功    能： 加载类
*  内    容： 自定义加载类，方便添加回调函数，减少代码书写
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
/**资源加载类*/
var LoadManager = (function () {
    function LoadManager() {
        this.loadComplete = new Object();
        this.loadError = new Object();
        this.loadProgress = new Object();
        this.thisObject = new Object();
    }
    var d = __define,c=LoadManager;p=c.prototype;
    LoadManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new LoadManager();
        }
        return this.instance;
    };
    /**
     * 加载资源组
     * @param name 资源组名
     * @param thisObject 回调函数绑定的对象
     * @param loadComplete 加载完成回调函数
     * @param loadError 加载错误回调函数
     * @param loadProgress 加载进度回调函数
     */
    p.loadGroup = function (name, thisObject, loadComplete, loadProgress, loadError) {
        if (loadComplete === void 0) { loadComplete = null; }
        if (loadProgress === void 0) { loadProgress = null; }
        if (loadError === void 0) { loadError = null; }
        this.loadComplete[name] = loadComplete;
        this.loadError[name] = loadError;
        this.loadProgress[name] = loadProgress;
        this.thisObject[name] = thisObject;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(name);
    };
    /**资源组加载完成*/
    p.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        var fun = this.loadComplete[groupName];
        if (fun != null) {
            fun.call(this.thisObject[groupName], event);
        }
        this.clearCallBack(groupName);
    };
    /**资源组加载错误*/
    p.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        var fun = this.loadError[event.groupName];
        if (fun != null) {
            fun.call(this.thisObject[event.groupName], event);
        }
        this.clearCallBack(event.groupName);
    };
    /**资源组加载进度*/
    p.onResourceProgress = function (event) {
        var fun = this.loadProgress[event.groupName];
        if (fun != null) {
            fun.call(this.thisObject[event.groupName], event);
        }
    };
    /**清除指定资源组的回调函数*/
    p.clearCallBack = function (name) {
        this.loadComplete[name] = null;
        this.loadError[name] = null;
        this.loadProgress[name] = null;
    };
    return LoadManager;
})();
egret.registerClass(LoadManager,"LoadManager");
