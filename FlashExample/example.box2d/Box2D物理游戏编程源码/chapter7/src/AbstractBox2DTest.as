package
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2World;
	
	import ldEasyBox2D.LDEasyWorld;
	
	
	public class AbstractBox2DTest extends Sprite
	{
		public function AbstractBox2DTest(gravity:Number=10)
		{
			createBox2DApp(gravity);
			box2DAppReady();
			
			addEventListener(Event.ENTER_FRAME,update);
			
			stage.addEventListener(MouseEvent.MOUSE_DOWN,mouseEventHandler);
			stage.addEventListener(MouseEvent.MOUSE_UP,mouseEventHandler);
			stage.addEventListener(KeyboardEvent.KEY_DOWN,keyBoardEventHandler);
			stage.addEventListener(KeyboardEvent.KEY_UP,keyBoardEventHandler);
		}
		
		protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			
		}
		public var world:b2World;
		public var debug:b2DebugDraw;
		public var debugSprite:Sprite;
		private function createBox2DApp(gravity:Number):void
		{
			stage.frameRate=30;
			debugSprite = new Sprite();
			addChild(debugSprite);
			
			world = LDEasyWorld.createWorld(0,gravity);
			debug = LDEasyWorld.createDebug(debugSprite);
		}
		
		public function box2DAppReady():void
		{
			
		}
		protected function update(event:Event):void
		{
			LDEasyWorld.updateWorld();
		}
		private var bodyAtMouse:b2Body;
		protected function mouseEventHandler(event:MouseEvent):void
		{
			switch(event.type)
			{
				case MouseEvent.MOUSE_DOWN:
				{
					bodyAtMouse = LDEasyWorld.getBodyAt(mouseX,mouseY);
					stage.addEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
					break;
				}
				case MouseEvent.MOUSE_UP:
				{
					LDEasyWorld.stopDragBody();
					stage.removeEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
					break;
				}
				case MouseEvent.MOUSE_MOVE:
				{
					LDEasyWorld.dragBodyTo(bodyAtMouse,mouseX,mouseY);
					break;
				}
				default:
				{
					break;
				}
			}
		}
	}
}