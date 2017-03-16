/**
 * 场景管理类
 * @author chenkai
 * @date 2016/12/23
 * 
 * Example:
 * App.SceneManager.register("HomeScene", HomeScene);
 * App.SceneManager.open("HomeScene");
 */
class SceneManager extends SingleClass {
    /**面板实例*/
    private sceneMap = {};
    /**面板类定义*/
    private clzMap = {};
    /**当前场景*/
    private curScene: BaseScene;

    public constructor() {
        super();
    }

	/**
	 * 注册场景
	 * @sceneName 场景名
	 * @sceneClz 场景类定义
	 */
    public register(sceneName: string,sceneClz) {
        this.clzMap[sceneName] = sceneClz;
    }

	/**
	 * 打开场景
	 * @sceneName 场景名
     * @data 传入数据
	 */
    public open(sceneName: string, data:any =null) {
        var scene: BaseScene = this.sceneMap[sceneName];
        if(scene) {
            this.replaceScene(scene, data);
        } else {
            var clz = this.clzMap[sceneName];
            if(clz) {
                scene = new clz();
                this.sceneMap[sceneName] = scene;
                this.replaceScene(scene, data);
            }
        }
    }

	/**
	 * 打开场景
	 * @sceneName 场景名
     * @data 传入数据
	 */
    private replaceScene(scene: BaseScene, data:any= null) {
        (<BaseScene>scene).once(egret.Event.ADDED_TO_STAGE,() => {
            scene.onEnable(data);
        },this);
        App.LayerManager.sceneLayer.addChild(scene);

        var removeScene: BaseScene = this.curScene;
        if(removeScene) {
            removeScene.once(egret.Event.REMOVED_FROM_STAGE,() => {
                removeScene.onRemove();
            },this);
            App.LayerManager.sceneLayer.removeChild(removeScene);
        }

        this.curScene = scene;
    }

	/**
	 * 获取当前场景
	 */
    public getCurScene(): BaseScene {
        return this.curScene;
    }
}