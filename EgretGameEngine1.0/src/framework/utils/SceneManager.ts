/**
 * 场景管理类
 * @author chenkai
 * @date 2016/12/23
 */
class SceneManager extends SingleClass{
	/**面板实例*/
	private sceneMap = {};
	/**面板类定义*/
	private clzMap = {};
	/**当前场景*/
	private curScene:BaseScene;

	public constructor() {
		super();
	}

	/**
	 * 注册场景
	 * @sceneName 场景名
	 * @sceneClz 场景类定义
	 */
	public register(sceneName:string, sceneClz){
		this.clzMap[sceneName] = sceneClz;
	}

	/**
	 * 运行场景
	 * @sceneName 场景名
	 */
	public runScene(sceneName:string){
		var scene:BaseScene = this.sceneMap[sceneName];
		if(scene){
			this.openScene(scene);
		}else{
			var clz = this.clzMap[sceneName];
			if(clz){
				scene = new clz();
				this.sceneMap[sceneName] = scene;
				this.openScene(scene);
			}
		}
	}

	/**
	 * 打开场景
	 * @sceneName 场景名
	 */
	private openScene(scene:BaseScene){
		scene.once(egret.Event.ADDED_TO_STAGE, ()=>{
			scene.onEnable();
		},this);
		App.LayerManager.sceneLayer.addChild(scene);

		var removeScene:BaseScene = this.curScene;
		if(removeScene){
			removeScene.once(egret.Event.REMOVED_FROM_STAGE, ()=>{
				removeScene.onRemove();
			},this);
		}
		
		this.curScene = scene;
	}

	/**
	 * 获取当前场景
	 */
	public getCurScene():BaseScene{
		return this.curScene;
	}
}