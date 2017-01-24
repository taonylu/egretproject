package src.framework.utils 
{
	import flash.display.Sprite;
	import flash.display.Stage;
	import src.framework.utils.StageUtil;
	import src.App;
	/**
	 * 场景管理类
	 * @author rikimaru
	 */
	public class LayerMgr 
	{
		/**场景层*/
		public var sceneLayer:Sprite;
		/**弹框层*/
		public var panelLayer:Sprite;
		/**提示层*/
		public var tipLayer:Sprite;
		/**顶层*/
		public var topLayer:Sprite;
		
		public function LayerMgr() 
		{
			var stage:Stage = App.StageUtils.getStage();

			this.sceneLayer = new Sprite();
			this.sceneLayer.mouseEnabled = false;
			stage.addChild(this.sceneLayer);

			this.panelLayer = new Sprite();
			this.panelLayer.mouseEnabled = false;
			stage.addChild(this.panelLayer);

			this.tipLayer = new Sprite();
			this.tipLayer.mouseEnabled = false;
			stage.addChild(this.tipLayer);
			
			this.topLayer = new Sprite();
			this.topLayer.mouseEnabled = false;
			stage.addChild(this.topLayer);
		}
		
		/**单例*/
		private static var instance:LayerMgr;
		/**获取单例*/
		public static function getInstance():LayerMgr {
			if (instance == null) {
				instance = new LayerMgr();
			}
			return instance;
		}
		
	}

}