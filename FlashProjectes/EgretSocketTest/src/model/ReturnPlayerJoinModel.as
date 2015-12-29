package model
{
	import constant.NetConst;
	
	import game.Player;
	
	import model.vo.PlayerVO;

	/**返回新玩家加入*/
	public class ReturnPlayerJoinModel
	{
		public var cmd:int = 0;
		public var userID:int = 0;
		public var userName:String = "";
		public var weight:int = 0;
		public var from:String = "";
		public var x:Number = 0;
		public var y:Number = 0;
		public var skinID:int = 0;
		private var json:Object = {};
		
		public function toJSON():Object{
			json["cmd"] =cmd;
			json["userid"] = userID;
			json["username"] = userName;
			json["weight"] = weight;
			json["from"] = from;
			json["x"] = x;
			json["y"] = y;
			json["skinid"] = skinID;
			return json;
		}
		
		public function writePlayer(player:Player):void{
			cmd = NetConst.PLAYER_JOIN;
			userID = player.userID;
			userName = player.userName;
			from = player.from;
			weight = player.weight;
			x = player.x;
			y = player.y;
			skinID =player.skinID;
		}

	}
}