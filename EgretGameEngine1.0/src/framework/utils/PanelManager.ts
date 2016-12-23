/**
 * 面板加载类
 * @author chenkai
 * @date 2016/12/23
 */
class PanelManager extends SingleClass{
	/**面板实例*/
	private panelMap = {};
	/**面板类定义*/
	private clzMap = {};
	/**面板所需资源组*/
	private groupMap = {};

	public constructor() {
		super();
	}

	/**
	 * @注册
	 * @clz panel类名
	 */
	public register(panelName:string, panelClz:any , groupName:string = null){
		this.clzMap[panelName] = panelClz;
		this.groupMap[panelName] = groupName;
	}

	/**
	 * 打开面板，若需要实时加载资源，则加载完成后打开
	 * @panelName 面板名
	 * @callBack 面板添加到舞台后的回调函数
	 * @thisObject 回调函数执行对象
	 */
	public open(panelName:string, callBack:Function = null, thisObject:any = null){
		var panel:BasePanel = this.panelMap[panelName];
		if(panel){
			this.openPanel(panelName, callBack, thisObject);
		}else{
			var groupName:string = this.groupMap[panelName];
			if(groupName != null){
				App.ResUtils.loadGroup(groupName, ()=>{
					this.openPanel(panelName, callBack, thisObject);
				},this);
			}else{
				this.openPanel(panelName, callBack, thisObject);
			}
		}
	}

	/**打开弹框*/
	private openPanel(panelName:string, callBack:Function = null, thisObject:any = null){
		var panel:BasePanel = this.panelMap[panelName];
		if(panel){
			panel.once(egret.Event.ADDED_TO_STAGE, ()=>{
				panel.onEnable();
				callBack.apply(thisObject);
			},this);
			App.LayerManager.panelLayer.addChild(panel);
		}
	}

	/**
	 * 关闭弹框
	 * @panelName 弹框名
	*/
	public close(panelName:string){
		var panel:BasePanel = this.panelMap[panelName];
		if(panel){
			panel.once(egret.Event.ADDED_TO_STAGE, ()=>{
				panel.onRemove();
			},this);
			App.LayerManager.panelLayer.removeChild(panel);
		}
	}

	/**关闭所有弹框*/
	public closeAllPanel(){
		for(var key in this.panelMap){
			this.close(key);
		}
	}
}