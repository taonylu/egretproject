package constant
{
	public class GameConst
	{
		/**地图高宽*/
		public static var MapWidth: Number = 850;
		public static var MapHeight: Number = 480;
		/**场景高宽*/
		public static var SceneWidth: Number = 850;
		public static var SceneHeight: Number = 480;
		/**场景一半高宽*/
		public static var HalfSceneWidth: Number = GameConst.SceneWidth / 2;
		public static var HalfSceneHeight: Number = GameConst.SceneHeight / 2;
		/**怪物皮肤种类数量*/
		public static var MonsterSkinNum: int = 7;
		
		/**方块重量*/
		public static var rectWeight:int = 10;
		/**玩家初始重量*/
		public static var playerWeight:int = 10
		/**玩家初始移动*/
		public static var playerSpeed:int = 3;
		/**玩家初始半径*/
		public static var playerRadius:int = 20;	
		/**吃掉物体后体重增加比例*/
		public static var addWidthRate:Number = 0.1;
		/**吃掉物体后速度减少比例*/
		public static var addSpeed:Number = 0.001;
		/**方块上限*/
		public static var rectLimit:int = 200;
	}
}