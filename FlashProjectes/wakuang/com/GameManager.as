package  com
{
	import com.view.scene.GameScene;
	import com.view.scene.HomeScene;
	import com.common.LayerManager;
	import flash.utils.Dictionary;
	import flash.utils.getDefinitionByName;
	/**
	 * 游戏管理类
	 * @author Rikimaru
	 * 2015/10/20 22:23
	 */
	public class GameManager 
	{
		public var homeScene:HomeScene = new HomeScene();
		public var gameScene:GameScene = new GameScene();
		
		public function GameManager() 
		{
			
		}
		
		public function startup():void {
			LayerManager.getInstance().runScene(homeScene);
		}
		
		
		
		
		private static var instance:GameManager;
		public static function getInstance():GameManager {
			if (instance == null) {
				instance = new GameManager();
			}
			return instance;
		}
		
	}

}