package model.vo
{
	import flash.geom.Point;

	/**返回游戏请求数据中的玩家*/
	public class HeroVO
	{
		/**用户ID*/
		public var userID:int = 0;
		/**体重*/
		public var weight:int = 0;
		/**来自*/
		public var from:String = "";
		/**位置*/
		public var pos:Point = new Point();
		
		public function HeroVO()
		{
			
		}
	}
}