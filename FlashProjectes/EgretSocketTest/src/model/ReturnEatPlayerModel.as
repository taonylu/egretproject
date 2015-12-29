package model
{
	import constant.NetConst;
	public class ReturnEatPlayerModel
	{
		public var cmd:int = NetConst.EAT_PLAYER;
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