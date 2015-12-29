package model
{
	import constant.NetConst;
	/**返回吃方块*/
	public class ReturnEatRectModel
	{
		public var cmd:int = NetConst.EAT_RECT;
		public var eatList:Array = [];
		
		private var json:Object = {};
		
		public function toJSON():Object{
			json["cmd"] =cmd;
			json["eatlist"] = eatList;
			return json;
		}
		
		public function clear():void{
			eatList.length = 0;
		}
	}
}