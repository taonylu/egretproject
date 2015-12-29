package
{
	import common.ReDictionary;
	
	import constant.GameConst;
	import constant.NetConst;
	
	import flash.display.Sprite;
	import flash.events.*;
	import flash.net.ServerSocket;
	import flash.net.Socket;
	import flash.net.drm.AddToDeviceGroupSetting;
	import flash.text.TextField;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	import flash.utils.Timer;
	import flash.utils.getTimer;
	
	import game.Player;
	import game.Rect;
	
	import model.ReturnEatPlayerModel;
	import model.ReturnEatRectModel;
	import model.ReturnGameReqModel;
	import model.ReturnMoveModel;
	import model.ReturnPlayerJoinModel;
	import model.RevGameReqModel;
	import model.vo.PlayerVO;
	
	import net.BallBattleServer;
	import net.ISocketHand;
	
	import org.osmf.events.TimeEvent;
	
	[SWF(width=850,height=480,backgroundColor=0xffffff,frameRate=60)]
	public class SocketTest extends Sprite implements ISocketHand
	{
		/**调试用文本*/
		private var txt:TextField = new TextField();  
		/** 球球服务器*/
		private var server:BallBattleServer;      
		/**保存链接socket [userID, socket]*/
		private var socketList:ReDictionary = new ReDictionary(); 
		/**保存玩家数据列表 [socket,player]*/
		private var playerDict:Dictionary = new Dictionary();
		/**保存方块*/
		private var rectDict:Dictionary = new Dictionary();   
		/**计时器*/
		private var gameTimer:Timer = new Timer(1000);
		/**游戏时间*/
		private var gameTimeLimit:int = 60*5;
		/**当前玩家在线人数*/
		private var onlineTotal:int = 0 ;  
		
		/**接收游戏请求*/
		private var revGameRequest:RevGameReqModel = new RevGameReqModel();
		/**返回游戏请求*/
		private var returnGameRequest:ReturnGameReqModel = new ReturnGameReqModel();
		/**返回新玩家加入*/
		private var returnPlayerJoin:ReturnPlayerJoinModel = new ReturnPlayerJoinModel();
		/**返回玩家移动*/
		private var returnMove:ReturnMoveModel = new ReturnMoveModel();
		/**返回吃方块*/
		private var returnEatRectModel:ReturnEatRectModel = new ReturnEatRectModel();
		/**返回玩家互吃*/
		private var returnEatPlayerModel:ReturnEatPlayerModel = new ReturnEatPlayerModel();
		
		public function SocketTest()
		{
			txt.text = "";
			txt.width = stage.stageWidth;
			txt.height = stage.stageHeight;
			this.addChild(txt);
			
			server = new BallBattleServer();
			server.setSocketHand(this);
			server.setLogTxt(txt);
			server.createServerSocket();

			createSprite();
			
			
			trace(this.stage.frameRate);
		}
		
		/**创建断开连接按钮*/
		private function createSprite():void{
			var sp:Sprite = new Sprite();
			sp.graphics.beginFill(0xff0000);
			sp.graphics.drawRect(300,0,100,50);
			sp.graphics.endFill();
			this.addChild(sp);
			sp.addEventListener(MouseEvent.CLICK, function():void{
				server.close();
			});
		}
		
		/**接收数据*/
		public function onSocketData(json:Object, socket:Socket):void{
			switch(json["cmd"]){
				case NetConst.GAME_REQUEST:    //接收开始游戏
					revStartGameRequest(json, socket);
					break;
				case NetConst.MOVE_REQUEST:   //接收移动玩家
					revMovePlayer(json, socket);
					break;
			}
		}
		
		/**接收游戏开始请求，返回允许游戏和游戏数据*/
		private function revStartGameRequest(revJson:Object, socket:Socket):void{
			//判断当前玩家人数，如果是第一人，则新建游戏
			if(onlineTotal == 0){
				this.startGame();
			}
			//读取数据
			revGameRequest.readData(revJson);
			
			//随机游客ID
			var userID:int = getTimer();
			
			//拼接返回数据
			returnGameRequest.cmd = NetConst.GAME_REQUEST;
			returnGameRequest.hero = [userID,revGameRequest.userName,  GameConst.playerWeight,"", 
				int(Math.random()*GameConst.MapWidth),  int(Math.random()*GameConst.MapHeight),revJson.skinid ];
			returnGameRequest.errorCode = 0;
			returnGameRequest.writeRectList(rectDict);
			returnGameRequest.writePlayerList(playerDict);
			
			//返回开始游戏请求
			server.sendMessage(socket,returnGameRequest.toJSON());
			
			//保存socket
			socketList.add(userID,socket);   
			
			//保存当前连接玩家
			var player:Player = new Player();
			player.userID =   userID;
			player.userName = revGameRequest.userName;
			player.weight = returnGameRequest.hero[2];
			player.x = returnGameRequest.hero[4];
			player.y = returnGameRequest.hero[5];
			player.skinID = revJson.skinid;
			playerDict[socket] = player;
				
			//增加在线人数
			onlineTotal ++;          
			
			//返回新玩家加入
			returnPlayerJoin.writePlayer(player);
			server.sendALL(returnPlayerJoin.toJSON());
		}

		/**接收玩家移动请求，并广播允许移动*/
		private function revMovePlayer(revJson:Object, socket:Socket):void{
			if(socketList.getKey(socket)!=null && playerDict[socket]!= null){
				var player:Player =playerDict[socket];
				returnMove.cmd = NetConst.MOVE_REQUEST;
				returnMove.userID = player.userID;
				returnMove.angle = revJson.angle;
				returnMove.x = player.x;
				returnMove.y = player.y;
				server.sendALL(returnMove.toJSON());
				
			}
		}
		
		/**开始计时*/
		private function startTimer():void{
			gameTimer.addEventListener(TimerEvent.TIMER, onTimerHandler);
			gameTimer.addEventListener(TimeEvent.COMPLETE, onTimerComplete);
			gameTimer.reset();
			gameTimer.start();
		}
		
		/**停止计时*/
		private function stopTimer():void{
			gameTimer.removeEventListener(TimerEvent.TIMER, onTimerHandler);
			gameTimer.removeEventListener(TimeEvent.COMPLETE, onTimerComplete);
			gameTimer.stop();
		}
		
		/**计时*/
		private function onTimerHandler(e:TimeEvent):void{
			
		}
		
		/**计时结束*/
		private function onTimerComplete(e:TimeEvent):void{
			
		}
		
		/**开始游戏*/
		private function startGame():void
		{
			this.createRect();

		}

		
		/**创建方块*/
		private function createRect():void{
			var len:int = GameConst.rectLimit;
			var mapWidth:int = GameConst.MapWidth;
			var mapHeight:int = GameConst.MapHeight;
			for(var i:int=0;i<len;i++){
				var rect:Rect = new Rect();
				rect.id = i;
				rect.x =  int(Math.random()*mapWidth);
				rect.y =  int(Math.random()*mapHeight);
				rectDict[i] = rect;
			}
		}
		
	}
}





















