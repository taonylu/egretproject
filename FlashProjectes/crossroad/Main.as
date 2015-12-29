package  
{
	import flash.display.Sprite;
	import flash.events.Event;
	import com.AppFacade;
	import com.common.LayerManager;
	import com.common.ObjectPool;
	import flash.utils.Dictionary;
	import com.view.ui.GreenATile;
	/**
	 * 类    名: 文档类
	 * 内    容: 
	 * 作    者: Rikimaru
	 * 创建日期: 2015/9/19
	 * 修改日期: 2015/9/19
	 * 修改日志:
	 */
	public class Main extends Sprite
	{
		
		public function Main() 
		{
			this.addEventListener(Event.ADDED_TO_STAGE, addToStage);
		}
		
		private function addToStage(e:Event):void {
			this.removeEventListener(Event.ADDED_TO_STAGE, addToStage);
			
			LayerManager.getInstance().initialize(this);
			
			AppFacade.getInstance().startup();
		}
	}

}