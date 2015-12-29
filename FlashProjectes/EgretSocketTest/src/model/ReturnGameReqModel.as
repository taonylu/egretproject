package model
{
	import common.ReDictionary;
	
	import constant.NetConst;
	
	import flash.utils.Dictionary;
	
	import game.Player;
	import game.Rect;
	
	import model.vo.HeroVO;
	import model.vo.PlayerVO;

	/**返回用户开始游戏请求*/
	public class ReturnGameReqModel
	{
		/**命令*/
		public var cmd:int = 0;
		/**当前Socket连接的玩家*/
		public var hero:Array = [];
		/**方块数量*/
		public var rectNum:int = 0;
		/**方块列表*/
		public var rectList:Array = [];
		/**玩家数量*/
		public var playerNum:int = 0;
		/**玩家列表*/
		public var playerList:Array = [];
		/**错误码*/
		public var errorCode:int = 0;
		/**json*/
		private var  json:Object = {};

		
		public function toJSON():Object{
			json["cmd"] = cmd;
			json["hero"] = hero;
			json["rectnum"] = rectNum;
			json["rectlist"] = rectList;
			json["playernum"] = playerNum;
			json["playerlist"] = playerList;
			json["errorcode"] = errorCode;
			return json;
		}
		
		/**写入方块列表*/
		public function writeRectList(rectDict:Dictionary):void{
			var rectArr:Array = [];
			var rect:Rect;
			var rectNum:int = 0;
			for(var key:* in rectDict){
				rect = rectDict[key];
				rectArr.push([rect.id, rect.x,rect.y]);
				rectNum++;
			}
			this.rectNum = rectNum;
			this.rectList = rectArr;
		}
		
		public function writePlayerList(playerDict:Dictionary):void{
			var playerArr:Array = [];
			var player:Player;
			var playerNum:int = 0;
			for(var key:* in playerDict){
				player = playerDict[key];
				playerArr.push([player.userID,player.userName,player.weight,player.from,player.x, player.y, player.skinID]);
				playerNum++;
			}
			this.playerList = playerArr;
			this.playerNum = playerNum;
		}
		
	}
}





