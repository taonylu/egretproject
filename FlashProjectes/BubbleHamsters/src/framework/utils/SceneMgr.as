package src.framework.utils 
{
	import flash.events.Event;
	import src.framework.display.BaseScene;
	import src.App;
	/**
	 * 场景管理类
	 * @author rikimaru
	 * @since 2017/1/23
	 */
	public class SceneMgr
	{
		/**面板实例*/
		private var sceneMap = {};
		/**面板类定义*/
		private var clzMap = {};
		/**当前场景*/
		private var curScene: BaseScene;

		/**
		 * 注册场景
		 * @sceneName 场景名
		 * @sceneClz 场景类定义
		 */
		public function register(sceneName:String,sceneClz:*) {
			this.clzMap[sceneName] = sceneClz;
		}

		/**
		 * 运行场景
		 * @sceneName 场景名
		 * @destory 是否销毁上一场景
		 */
		public function replaceScene(sceneName: String,destroy: Boolean = false) {
			var scene: BaseScene = this.sceneMap[sceneName];
			if(scene) {
				this.openScene(scene);
			} else {
				var clz = this.clzMap[sceneName];
				if(clz) {
					scene = new clz();
					this.sceneMap[sceneName] = scene;
					this.openScene(scene,destroy);
				}
			}
		}

		/**
		 * 打开场景
		 * @sceneName 场景名
		 * @destroy 是否销毁上一场景
		 */
		private function openScene(scene: BaseScene, destroy: Boolean = false) {
			scene.addEventListener(Event.ADDED_TO_STAGE, function():void {
				scene.removeEventListener(Event.REMOVED_FROM_STAGE, arguments.callee);
				scene.onEnable();
			});
			App.LayerManager.sceneLayer.addChild(scene);
			var removeScene: BaseScene = this.curScene;
			if (removeScene) {
				removeScene.addEventListener(Event.REMOVED_FROM_STAGE, function():void {
					removeScene.removeEventListener(Event.REMOVED_FROM_STAGE, arguments.callee);
					removeScene.onRemove();
				});
				App.LayerManager.sceneLayer.removeChild(removeScene);
			}
			this.curScene = scene;
		}

		/**
		 * 获取当前场景
		 */
		public function getCurScene(): BaseScene {
			return this.curScene;
		}
		
		/**单例*/
		private static var instance:SceneMgr;
		/**获取单例*/
		public static function getInstance():SceneMgr {
			if (instance == null) {
				instance = new SceneMgr();
			}
			return instance;
		}
	}

}