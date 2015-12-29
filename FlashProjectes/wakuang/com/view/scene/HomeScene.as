package com.view.scene 
{
	import com.view.scene.BaseScene;
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import com.constant.GameConst;
	import com.GameManager;
	import com.common.LayerManager;
	import com.common.SoundManager;
	/**
	 * 主页场景
	 * @author Rikimaru
	 * 2015/10/20 22:23
	 */
	public class HomeScene extends BaseScene
	{
		public var startBtn:Sprite;   //开始游戏
		public var moreBtn:Sprite;    //更多游戏
		
		public function HomeScene() 
		{
			super();
		}
		
		override protected function onEnable():void {	
			SoundManager.instance.stopAll();
			configListeners();
		}
		

		override protected function onRemove():void {
			deConfigListeners();
		}
		
		public function configListeners():void {
			startBtn.addEventListener(MouseEvent.CLICK, onStartBtnClick);
			moreBtn.addEventListener(MouseEvent.CLICK, onMoreBtnClick);
		}
		
		public function deConfigListeners():void {
			startBtn.removeEventListener(MouseEvent.CLICK, onStartBtnClick);
			moreBtn.removeEventListener(MouseEvent.CLICK, onMoreBtnClick);
		}
		
		private function onStartBtnClick(e:MouseEvent):void {
			LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
		}
		
		private function onMoreBtnClick(e:MouseEvent):void {
			//if(GameConst.platform == GameConst.platform3366){
				//if(Main.open3366Service != null)  
				//{  
					//Main.open3366Service.recomGame();  
				//} 
			//}else if(GameConst.platform == GameConst.platform4399){
				if(Main.serviceHold){
					Main.serviceHold.showGameList();
				}
			//}
		}
	}

}








