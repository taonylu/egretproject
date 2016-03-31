package b2PolygonShapeDemo {
	import flash.display.Sprite;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2World;
	
	import Whatisb2PolygonShape;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;
	
	/**
	 * @author yangfei
	 */
	public class AbstractPolygonShapeDemo {
		public var debug : b2DebugDraw;
		public var box2DWorld:b2World;
		public var debugSprite:Sprite;
		
		public function AbstractPolygonShapeDemo(gravity:Number=10) {
			debugSprite = Whatisb2PolygonShape.debugSprite;
			
			box2DWorld = LDEasyWorld.createWorld(0,gravity);
			debug = LDEasyWorld.createDebug(debugSprite);
			
			LDEasyBody.createRectangle(0,0,500,375);
			
			onBox2DWorldReady();
		}
		
		public function editText(title:String,fun:String,tip:String=""):void
		{
			Whatisb2PolygonShape.title.text = title;
			Whatisb2PolygonShape.funTxt.text=fun;
			Whatisb2PolygonShape.tipTxt.text+=tip;
		}
		public function editValueText(value:String):void
		{
			Whatisb2PolygonShape.valueTxt.text=value;
		}
		public function onBox2DWorldReady() : void {
		}
		public function keyBoardEventHandler(event:KeyboardEvent):void{
			
		}
		public function mouseEventHandler(event : MouseEvent) : void {
		}
		public function update(): void {
			LDEasyWorld.updateWorld();
		}
	}
}
