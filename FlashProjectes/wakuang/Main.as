package 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import com.GameManager;
	import com.constant.GameConst;
	import com.common.LayerManager;
	import com.common.SWFProfiler;
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class Main extends Sprite
	{
		//public static var open3366Service:* = null;  
		//public function setService(service:*):void   
		//{  
			//open3366Service = service;   
		//} 
		

		public static var _4399_function_score_id:String = "d8c8d4731a33a0a581edc746e73eadc7200";
		public static var _4399_function_gameList_id:String = "944c23f5e64a80647f8d0f3435f5c7a8";
		public static var serviceHold:* = null;
		public function setHold(hold:*):void
		{
			serviceHold = hold;
		}
		
		public function Main() 
		{
			if (stage) {
				init();
			}else {
				addEventListener(Event.ADDED_TO_STAGE, init);
			}
		}
		
		private function init(e:Event = null):void {
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			GameConst.platform = GameConst.platform4399;
			
			SWFProfiler.init(this.stage, this);
			LayerManager.getInstance().initialize(this);
			GameConst.stage = stage;
			GameManager.getInstance().startup();
		}
		
	}

}