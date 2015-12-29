package com.common 
{
	import com.view.scene.BaseScene;
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.Sprite;
	import flash.display.Stage;
	/**
	 * 图层管理类
	 * @author Rikimaru
	 */
	public class LayerManager 
	{
		/**场景层*/
		public var sceneLayer:Sprite;
		/**弹出框层*/
		public var popLayer:Sprite;
		/**当前场景*/
		private var curScene:BaseScene;
			
		
		/**初始化*/
		public function initialize(root:DisplayObjectContainer):void {
			
			sceneLayer = new Sprite();
			root.addChild(sceneLayer);
			
			popLayer = new Sprite();
			root.addChild(popLayer);
		}
		
		/**运行场景*/
		public function runScene(scene:BaseScene):void {
			
			sceneLayer.addChild(scene);
			
			if(curScene != null){
				sceneLayer.removeChild(curScene);
			}
			
			curScene = scene;
		}
		
		
		
		private static var instance:LayerManager;
		public static function getInstance():LayerManager {
			if (instance == null) {
				instance = new LayerManager();
			}
			return instance;
		}
		
	}

}













