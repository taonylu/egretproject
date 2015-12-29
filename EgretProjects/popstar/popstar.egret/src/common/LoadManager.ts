/**
 *
 * 加载管理类
 * @author 
 *
 */
class LoadManager {
	
    private static  instance: LoadManager;
    private loadComplete: Object;
    private loadError: Object;
    private loadProgress: Object;
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
    
    public loadGroup(name:string,  thisObject:any,  loadComplete:Function=null, loadError:Function=null, loadProgress:Function=null): void { 
        this.loadComplete[name] = loadComplete;
        this.loadError[name] = loadError;
        this.loadProgress[name] = loadProgress;
        this.thisObject[name] = thisObject;
        
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(name);
    }
    
    /**
    * preload资源组加载完成
    * preload resource group is loaded
    */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        var groupName: string = event.groupName;
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        if(this.loadComplete[groupName] != null) { 
            this.loadComplete[groupName] (this.thisObject[groupName]);
        }
        this.clearCallBack(groupName);
      
    }
    
    /**
    * 资源组加载出错
    * Resource group loading failed
    */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        this.clearCallBack(event.groupName);
        if(this.loadError[event.groupName] != null) { 
            
        }
    }
    
    /**
    * preload资源组加载进度
    * loading process of preload resource
    */
    private onResourceProgress(event:RES.ResourceEvent):void {
       // if (event.groupName == "preload") {
            // this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        //}
        if(this.loadProgress[event.groupName] != null) { 
            
        }
    }
    
    private clearCallBack(name:string): void { 
        this.loadComplete[name] = null;
        this.loadError[name] = null;
        this.loadProgress[name] = null;
        this.thisObject[name] = null;
    }
    
}
