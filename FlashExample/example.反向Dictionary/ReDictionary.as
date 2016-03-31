package  
{
	import flash.utils.Dictionary;
	/**
	 * 反向Dictionary
	 * 相比普通Dictionary，增加value值来进行获取、删除key等逆向操作。
	 * @author Rikimaru
	 * 2015/10/11 22:29
	 */
	public class ReDictionary 
	{
		private var dict:Dictionary = new Dictionary();
		private var reDict:Dictionary = new Dictionary();
		
		public function ReDictionary() 
		{
			
		}
		
		/**添加(key,value)*/
		public function add(key:*, value:*):void {
			dict[key] = value;
			reDict[value] = key;
		}
		
		/**根据value值获取key*/
		public function getKey(value:*):* {
			return reDict[value];
		}
		
		/**根据key值获取value*/
		public function getValue(key:*):* {
			return dict[key];
		}
		
		/**根据key值删除数据*/
		public function deleteKey(key:*):void {
			delete reDict[dict[key]];
			delete dict[key];
		}
		
		/**根据value值删除数据*/
		public function deleteValue(value:*):void {
			delete dict[reDict[value]];
			delete reDict[value];
		}
		
		/**删除所有*/
		public function deleteAll():void {
			for (var key:* in dict) {
				delete dict[key];
			}
			for (var value:* in reDict) {
				delete reDict[value];
			}
		}
	}

}







