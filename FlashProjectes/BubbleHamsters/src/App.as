package src 
{
	import src.framework.utils.MsgCenter;
	import src.framework.utils.LayerMgr;
	import src.framework.utils.PanelMgr;
	import src.framework.utils.SoundMgr;
	import src.framework.utils.StageUtil;
	import src.framework.utils.SceneMgr;
	import src.game.model.DataCenterD;
	import src.game.view.preload.PreloadScene;
	import src.game.constant.*;
	import src.game.view.home.*;
	import src.game.view.panel.*;
	/**
	 * App主类
	 * @author rikimaru
	 */
	public class App
	{
		/**启动*/
		public function startup() {
			//注册场景
			App.SceneManager.register(SceneConst.PRELOAD, PreloadScene);
			App.SceneManager.register(SceneConst.HOME, HomeScene);
			
			//注册弹框
			App.PanelManager.register(PanelConst.BigMicePanel, BigMicePanel);
			
			//进入预加载界面
			App.SceneManager.replaceScene(SceneConst.PRELOAD);
		}
		
		
		/**事件中心*/
		public static function get MessageCenter():MsgCenter {
			return MsgCenter.getInstance();
		}
		/**舞台工具类*/
		public static function get StageUtils():StageUtil {
			return StageUtil.getInstance();
		}
		/**图层管理类*/
		public static function get LayerManager():LayerMgr {
			return LayerMgr.getInstance();
		}
		/**弹框管理类*/
		public static function get PanelManager():PanelMgr {
			return PanelMgr.getInstance();
		}
		/**场景管理类*/
		public static function get SceneManager():SceneMgr {
			return SceneMgr.getInstance();
		}
		/**数据中心*/
		public static function get DataCenter():DataCenterD {
			return DataCenterD.getInstance();
		}
		/**声音管理*/
		public static function get SoundManager():SoundMgr {
			return SoundMgr.getInstance();
		}
		
		
		/**单例*/
		private static var instance:App;
		/**获取单例*/
		public static function getInstance():App {
			if (instance == null) {
				instance = new App();
			}
			return instance;
		}
	}
}







