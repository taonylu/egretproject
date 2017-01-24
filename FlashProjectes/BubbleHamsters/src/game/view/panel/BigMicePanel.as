package src.game.view.panel  
{
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.utils.setTimeout;
	import src.game.view.panel.BigMicePanel;
	import src.framework.display.BasePanel;
	import src.App;
	import com.greensock.TweenLite;
	/**
	 * 大老鼠过场动画弹框
	 * @author rikimaru
	 * @since 2017/1/23
	 */
	public class BigMicePanel extends BasePanel
	{
		public var bigMice:MovieClip;
		
		public function BigMicePanel() 
		{

		}
		
		override public function onEnable() {
			
		}
		
		override public function onRemove() {
			
		}
		
		/**从右边移动到中间*/
		public function rightToMid() {
			trace(this.bigMice);
			this.bigMice.x = App.StageUtils.stageWidth;
			TweenLite.to(this.bigMice, 1, { x:-(this.bigMice.width - App.StageUtils.stageWidth) / 2 } );
			setTimeout(function():void { 
				dispatchEvent(new Event("rightToMid"));
			}, 1000);
			
		}
		
		/**从中间移动到左边*/
		public function midToLeft() {
			this.bigMice.x = -(this.bigMice.width - App.StageUtils.stageWidth) / 2;
			TweenLite.to(this.bigMice, 1, { x:-this.bigMice.width } );
			setTimeout(function():void { 
				dispatchEvent(new Event("midToLeft"));
			}, 1000);
		}
	}

}















