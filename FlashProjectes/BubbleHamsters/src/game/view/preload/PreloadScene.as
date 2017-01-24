package src.game.view.preload 
{
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import src.framework.display.BaseScene;
	import com.greensock.easing.Bounce;
	import src.game.constant.PanelConst;
	import src.App;
	import src.game.constant.SceneConst;
	import src.game.view.panel.BigMicePanel;

	/**
	 * 预加载场景
	 * @author rikimaru
	 * @since 2017/1/23
	 */
	public class PreloadScene extends Sprite
	{
		public var barMask:MovieClip;
		
		public function PreloadScene() 
		{
			this.setProgress(0);
		}
		
		/**
		 * 设置加载进度
		 * @param	value 0-100
		 */
		public function setProgress(value:Number) {
			this.barMask.scaleX = value / 100;
		}
		
		//显示大老鼠过场动画
		public function showBigMice() {
			//显示过场动画
			var panel:BigMicePanel = App.PanelManager.open(PanelConst.BigMicPanel) as BigMicePanel;
			panel.addEventListener("rightToMid", this.showHomeScene);
			panel.addEventListener("midToLeft", this.removeBigMicePanel);
			panel.rightToMid();	
		}
		
		//显示主页场景
		private function showHomeScene(e:Event) {
			App.SceneManager.replaceScene(SceneConst.HomeScene);
			
			var panel:BigMicePanel = App.PanelManager.open(PanelConst.BigMicPanel) as BigMicePanel;
			panel.midToLeft();
		}
		
		//移除大老鼠过场动画
		private function removeBigMicePanel(e:Event) {
			var panel:BigMicePanel = App.PanelManager.open(PanelConst.BigMicPanel) as BigMicePanel;
			panel.removeEventListener("rightToMid", this.showHomeScene);
			panel.removeEventListener("midToLeft", this.removeBigMicePanel);
			App.PanelManager.close(PanelConst.BigMicPanel);
			
		}
	}

}










