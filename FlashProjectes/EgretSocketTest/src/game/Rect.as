package game
{
	import constant.GameConst;

	/**方块*/
	public class Rect
	{
		/**方块ID*/
		public var  id:int = 0;
		/**x坐标*/
		public var x:Number = 0;
		/**y坐标*/
		public var y:Number = 0;
		/**重量*/
		public var weight:int = 0;
		
		public function Rect():void{
			this.weight = GameConst.rectWeight;
		}
	}
}