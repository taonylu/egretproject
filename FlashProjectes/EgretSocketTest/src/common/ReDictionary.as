package common
{
	import flash.utils.Dictionary;
	
	/**反向词典*/
	public class ReDictionary
	{
		public var dict:Dictionary = new Dictionary();
		public var reDict:Dictionary = new Dictionary();
		
		public function ReDictionary()
		{
			
		}
		
		public function add(key:*, value:*):void{
			reDict[key] = value;
			dict[value] = key;
		}
		
		public function getValue(key:*):*{
			return reDict[key];
		}
		
		public function getKey(value:*):*{
			return dict[value];
		}
		
		public function removeByKey(key:*):void{
			delete dict[reDict[key] ];
			delete reDict[key];
		}
		
		public function removeByValue(value:*):void{
			delete reDict[dict[value]];
			delete dict[value];
		}
		
	}
}