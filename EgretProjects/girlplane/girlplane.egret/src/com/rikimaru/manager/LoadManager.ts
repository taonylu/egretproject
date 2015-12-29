/**
*  文 件 名：LoadManager.ts
*  功    能： 加载类
*  内    容： 自定义加载类，方便添加回调函数，减少代码书写
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/21
*  修改日志：
*/
class LoadManager {
	
    /**实例*/
    private static  instance: LoadManager;
    /**加载完成回调*/
    private loadComplete: Object;
    /**加载错误回调*/
    private loadError: Object;
    /**加载进度回调*/
    private loadProgress: Object;
    /**回调函数绑定的对象*/
    private thisObject: Object;
    
    public constructor() {
        this.loadComplete = new Object();
        this.loadError = new Object();
        this.loadProgress = new Object();
        this.thisObject = new Object();
    }
    
    public static getInstance(): LoadManager { 
        if(this.instance == null) { 
            this.instance = new LoadManager();
        }
        return this.instance;
    }
    
    /**
     * 加载资源组
     * @param name 资源组名
     * @param thisObject 回调函数绑定的对象
     * @param loadComplete 加载完成回调函数
     * @param loadError 加载错误回调函数
     * @param loadProgress 加载进度回调函数
     */ 
    public loadGroup(name:string,thisObject:any,  loadComplete:Function=null, loadProgress:Function=null,loadError:Function=null): void { 
        this.loadComplete[name] = loadComplete;
        this.loadError[name] = loadError;
        this.loadProgress[name] = loadProgress;
        this.thisObject[name] = thisObject;
        
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(name);
    }
    
    /**资源组加载完成*/
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        var groupName: string = event.groupName;
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        
        var fun: Function = this.loadComplete[groupName];
        if(fun != null) { 
            fun.call(this.thisObject[groupName],event);
        }
        this.clearCallBack(groupName);
      
    }
    
    /**资源组加载错误*/
    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        var fun: Function = this.loadError[event.groupName];
        if(fun != null) { 
            fun.call(this.thisObject[event.groupName],event);
        }
        this.clearCallBack(event.groupName);
    }
    
    /**资源组加载进度*/
    private onResourceProgress(event:RES.ResourceEvent):void {
        var fun: Function = this.loadProgress[event.groupName];
        if(fun != null) { 
            fun.call(this.thisObject[event.groupName],event);
        }
    }
    
    /**清除指定资源组的回调函数*/
    private clearCallBack(name:string): void { 
        this.loadComplete[name] = null;
        this.loadError[name] = null;
        this.loadProgress[name] = null;
    }
    
}
