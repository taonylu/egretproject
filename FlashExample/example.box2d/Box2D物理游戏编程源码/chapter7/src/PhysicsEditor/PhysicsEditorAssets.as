package PhysicsEditor
{
	import flash.display.Bitmap;

	public class PhysicsEditorAssets
	{
		public static const BASKET:String = "Basket";
		public static const DESK:String = "Desk";
		public static const BOX_SMALL:String = "BoxSmall";
		public static const BOX_BIG:String = "BoxBig";
		public static const FOOTBALL:String = "FootBall";
		
		[Embed(source="assets/basket.png")]
		private static var Basket:Class;
		[Embed(source="assets/desk.png")]
		private static var Desk:Class;
		[Embed(source="assets/boxSmall.png")]
		private static var BoxSmall:Class;
		[Embed(source="assets/boxBig.png")]
		private static var BoxBig:Class;
		[Embed(source="assets/football.png")]
		private static var FootBall:Class;
		
		public function PhysicsEditorAssets()
		{
		}
		public static function getImage(name:String):Bitmap
		{
			return new PhysicsEditorAssets[name]();
			return null;
		}
	}
}