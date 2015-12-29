package model
{
	/**接收玩家移动*/
	public class ReturnMoveModel
	{
		/**命令*/
		public var cmd:int = 0;
		/**用户ID*/
		public var userID:int = 0;
		/**角度*/
		public var angle:Number = 0;
		/**x坐标*/
		public var x:Number = 0;
		/**y坐标*/
		public var y:Number = 0;
		/**json数据*/
		private var json:Object = {};
		
		public function toJSON():Object{
			json["cmd"] = cmd;
			json["userid"] = userID;
			json["angle"] = angle;
			json["x"] = x;
			json["y"] = y;
			return json;
		}
		
	}
}