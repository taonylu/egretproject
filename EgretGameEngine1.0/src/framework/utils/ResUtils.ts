/**
 * 资源加载
 * 支持单个或多个资源组加载
 */
class ResUtils extends SingleClass {
    /**保存资源组名*/
    private groupMap: any;
    /**资源配置文件*/
    private configs: Array<any>;
    /**资源配置加载完成回调*/
    private onConfigComplete: Function;
    /**资源配置加载完成回调执行对象*/
    private onConfigCompleteTarget: any;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.groupMap = {};
        this.configs = new Array<any>();

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoadProgress,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
    }

	/**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    public addConfig(jsonPath: string,filePath: string): void {
        this.configs.push([jsonPath,filePath]);
    }

    /**
     * 开始加载配置文件
     * @param onConfigComplete 加载完成执行函数
     * @param onConfigCompleteTarget 加载完成执行函数所属对象
     */
    public loadConfig(onConfigComplete: Function,onConfigCompleteTarget: any): void {
        this.onConfigComplete = onConfigComplete;
        this.onConfigCompleteTarget = onConfigCompleteTarget;
        this.loadNextConfig();
    }

    /**
     * 加载
     */
    private loadNextConfig(): void {
        //加载完成
        if(this.configs.length == 0) {
            this.onConfigComplete.call(this.onConfigCompleteTarget);
            this.onConfigComplete = null;
            this.onConfigCompleteTarget = null;
            return;
        }

        var arr: any = this.configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigCompleteHandle,this);
        RES.loadConfig(arr[0],arr[1]);
    }

    /**
     * 加载完成
     * @param event
     */
    private onConfigCompleteHandle(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigCompleteHandle,this);
        this.loadNextConfig();
    }
    
    /**
     * 加载资源组，静默加载(无回调函数)
     * @groupName 资源组
     */
    public loadGroupQuiet(groupName) {
        RES.loadGroup(groupName);
    }
    
    /**
     * 加载资源组，带加载完成回调
     * @groupName 资源组
     * @onComplete 加载完成回调
     * @thisObject 回调执行对象
     */
    public loadGroup(groupName: string,onComplete: Function,thisObject: any) {
        this.groupMap[groupName] = [onComplete,null,thisObject];
        RES.loadGroup(groupName);
    }

	/**
	 * 加载多个资源组
	 * @groupName 多个资源组名
	 * @keys 资源组数组
	 * @onComplete 加载完成回调
	 * @onProgress 加载进度
	 * @thisObject 回调执行对象
	 */
    public loadGroups(groupName,keys,onComplete: Function,onProgress: Function,thisObject: any) {
        this.groupMap[groupName] = [onComplete,onProgress,thisObject];
        RES.createGroup(groupName,keys,false);
        RES.loadGroup(groupName);
    }
    
    
    /**
     * 加载资源组，带加载进度
     * @groupName 资源组
     * @onComplete 加载完成回调
     * @onProgress 加载进度回调
     * @thisObject 回调执行对象
     */
    public loadGroupWithPro(groupName,onComplete: Function,onProgress: Function,thisObject: any): void {
        this.groupMap[groupName] = [onComplete,onProgress,thisObject];
        RES.loadGroup(groupName);
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        var groupName: string = event.groupName;
        console.log("资源组加载完成:" + groupName);
        if(this.groupMap[groupName]) {
            var loadComplete: Function = this.groupMap[groupName][0];
            var loadCompleteTarget: any = this.groupMap[groupName][2];
            if(loadComplete != null) {
                loadComplete.call(loadCompleteTarget);
            }

            this.groupMap[groupName] = null;
            delete this.groupMap[groupName];
        }
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(event: RES.ResourceEvent): void {
        var groupName: string = event.groupName;
        if(this.groupMap[groupName]) {
            var loadProgress: Function = this.groupMap[groupName][1];
            var loadProgressTarget: any = this.groupMap[groupName][2];
            if(loadProgress != null) {
                loadProgress.call(loadProgressTarget,event);
            }
        }
    }

    /**
     * 资源组加载失败
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        console.log(event.groupName + "资源组有资源加载失败");
        this.onResourceLoadComplete(event);
    }

    /**清理加载回调*/
    public clearAllCallBack() {
        for(var key in this.groupMap) {
            this.groupMap[key] = null;
            delete this.groupMap[key];
        }
    }
}