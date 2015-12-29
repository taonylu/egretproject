package model
{
	import constant.NetConst;

	/**接收客户端开始游戏请求*/
	public class RevGameReqModel
	{
		/**命令*/
		public var cmd:int = 0;
		/**用户ID*/
		public var userID:int = 0;
		/**用户类型*/
		public var userType:int = 0;
		/**用户昵称*/
		public var userName:String = "";
		/**皮肤ID*/
		public var skinID:String = "";
		
		public function RevGameReqModel()
		{
			
		}
		
		public function readData(json:Object):void{
			cmd = json["cmd"];
			userID = json["userid"];
			userType = json["usertype"];
			userName = json["username"];
			skinID = json["skinid"];
		}
	}
}