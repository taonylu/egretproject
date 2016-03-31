package 
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class Main extends Sprite 
	{
		
		public function Main():void 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			//测试
			var reDict:ReDictionary = new ReDictionary();
			reDict.add("a", 123);
			reDict.add(234, "b");
			
			trace("存入值后输出");
			trace(reDict.getKey(123));
			trace(reDict.getValue("a"));
			
			trace("根据key值删除后输出");
			reDict.deleteKey("a");
			trace(reDict.getKey(123));
			trace(reDict.getValue("a"));
			
			trace("根据value值删除后输出");
			reDict.deleteValue("b");
			trace(reDict.getKey("b"));
			trace(reDict.getValue(234));
			
			trace("重新存入值后");
			reDict.add("a", 123);
			reDict.add(234, "b");
			trace(reDict.getKey(123));
			trace(reDict.getValue(234));
			trace("删除全部值后");
			reDict.deleteAll();
			trace(reDict.getKey(123));
			trace(reDict.getValue(234));
		}
		
	}
	
}