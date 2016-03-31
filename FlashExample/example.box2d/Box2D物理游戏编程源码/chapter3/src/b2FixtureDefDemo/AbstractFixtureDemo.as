package b2FixtureDefDemo {
	import flash.display.Sprite;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2World;
	
	import Whatisb2FixtureDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;
	
	/**
	 * @author yangfei
	 */
	public class AbstractFixtureDemo {
		public var debug : b2DebugDraw;
		public var box2DWorld:b2World;
		public var debugSprite:Sprite;
		
		public function AbstractFixtureDemo(gravity:Number=10) {
			debugSprite = Whatisb2FixtureDef.debugSprite;
			
			box2DWorld = LDEasyWorld.createWorld(0,gravity);
			debug = LDEasyWorld.createDebug(debugSprite);
			
			LDEasyBody.createRectangle(0,0,500,375);
			
			onBox2DWorldReady();
		}
		
		public function editText(title:String,fun:String,tip:String=""):void
		{
			Whatisb2FixtureDef.title.text = title;
			Whatisb2FixtureDef.funTxt.text=fun;
			Whatisb2FixtureDef.tipTxt.text+=tip;
		}
		public function editValueText(value:String):void
		{
			Whatisb2FixtureDef.valueTxt.text=value;
		}
		public function onBox2DWorldReady() : void {
		}
//		public function mouseEventHandler(event : MouseEvent) : void {
//			switch(event.type){
//				case MouseEvent.MOUSE_DOWN:
//					var body:b2Body = LDEasyBox2D.getBodyAtMouse();
//					if(body!=null){
//						LDEasyBox2D.startDragBody(body);
//					}
//					//stage.addEventListener(MouseEvent.MOUSE_DOWN, mouseEventHanlder);
//					break;
//				case MouseEvent.MOUSE_UP:
//					LDEasyBox2D.stopDragBody();
//					//stage.addEventListener(MouseEvent.MOUSE_DOWN, mouseEventHanlder);
//					break;
//				case MouseEvent.MOUSE_MOVE:
//					
//					break;
//			}
//		}
		public function keyBoardEventHandler(event:KeyboardEvent):void{
			
		}
		public function update(): void {
			LDEasyWorld.updateWorld();
		}
	}
}
