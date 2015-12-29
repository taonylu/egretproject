package game
{
	import constant.GameConst;
	
	public class Player
	{
		public var userID:int = 0;                  //用户ID
		public var userName:String = "";     //用户名
		public var from:String = "";             //来自
		public var skinID:int =0;                   //皮肤ID
		public var speed: Number = 3;         //移动速度
		public var xSpeed: Number = 0;
		public var ySpeed: Number = 0;
		public var mapWidth: Number = 0;   //地图范围
		public var mapHeight: Number = 0;
		public var bLive: Boolean = true;      //是否存活
		public var radius:Number = 20;       //半径
		public var angle:Number = 0;          //移动角度
		public var weight: Number = 10;      //体重
		public var x:Number = 0;                 //x，y坐标
		public var y:Number = 0;
		public var friction: Number = 0.1;    //摩擦力
		public var frictionX: Number = 0;  
		public var frictionY: Number = 0;
		public var hitArea:Number = 0;       //碰撞检测范围
		public var width:Number = 0;          //高宽
		public var height:Number = 0;
		
		public function Player() {
			super();  
			this.mapWidth = GameConst.MapWidth;
			this.mapHeight = GameConst.MapHeight;
			this.radius = GameConst.playerRadius;
			this.width = this.radius*2;
			this.height = this.radius*2;
		}
	}
}