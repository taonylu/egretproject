package separator
{
	import com.pixeltoyfactory.rube.RubeLoader;
	
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	import flash.ui.Keyboard;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2World;
	
	import ldEasyBox2D.LDEasyWorld;
	
	[SWF(width="600",height="450",frameRate="30")]
	public class Demob2Separator extends Sprite
	{
		[Embed(source = 'separator.json', mimeType='application/octet-stream')]
		private var SeparatorJson:Class;
		
		private var rubeLoader:RubeLoader;
		
		private var world:b2World;
		private var debug:b2DebugDraw;
		private var debugSprite:Sprite;
		
		private var bodyCreator:BodyCreator;
		private var canvas:Sprite;
		private var limitRectangle:Rectangle;
		
		public function Demob2Separator(gravity:Number=10)
		{
			createDebug();
			buildGame()
			
			createLimitArea();
			bodyCreator = new BodyPolygonCreator(canvas,limitRectangle,world);
			
			stage.addEventListener(Event.ENTER_FRAME,update);
			stage.addEventListener(MouseEvent.MOUSE_DOWN,mouseEventHandler);
			stage.addEventListener(MouseEvent.MOUSE_UP,mouseEventHandler);
			stage.addEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
			stage.addEventListener(KeyboardEvent.KEY_DOWN,keyboardEventHandler);
		}
		
		protected function keyboardEventHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.NUMBER_1 || event.keyCode == Keyboard.NUMPAD_1) {
				bodyCreator = new BodyHandDrawCreator(canvas,limitRectangle,world);
			}else if(event.keyCode == Keyboard.NUMBER_2 || event.keyCode == Keyboard.NUMPAD_2){
				bodyCreator = new BodyPolygonCreator(canvas,limitRectangle,world);
			}else if(event.keyCode == Keyboard.NUMBER_3 || event.keyCode == Keyboard.NUMPAD_3){
				bodyCreator = new BodyCircleCreator(canvas,limitRectangle,world);
			}
		}
		
		protected function mouseEventHandler(event:MouseEvent):void
		{
			bodyCreator.handleMouseEvent(event);
		}
		private function createLimitArea():void{
			canvas = new Sprite();
			addChild(canvas);
			limitRectangle = new Rectangle(0,0,460,250);
			
			var limitArea:Sprite = new Sprite();
			addChild(limitArea);
			limitArea.graphics.beginFill(0x83aacc,.3);
			limitArea.graphics.drawRect(0,0,limitRectangle.width,limitRectangle.height);
			limitArea.graphics.endFill();
		}
		private function createDebug():void
		{
			debugSprite = new Sprite();
			debugSprite.scaleY = -1;
			addChild(debugSprite);
			debug = new b2DebugDraw();
			debug.SetSprite(debugSprite);
			debug.SetDrawScale(30);
			debug.SetFlags(b2DebugDraw.e_shapeBit);
			debug.SetAlpha(0.8);
			debug.SetFillAlpha(0.5);
			debug.AppendFlags(b2DebugDraw.e_jointBit);
		}
		private function buildGame():void
		{
			var rubeData:Object = JSON.parse(new SeparatorJson());
			rubeLoader = new RubeLoader();
			world = rubeLoader.loadWorldFromRube(rubeData);
			world.SetDebugDraw(debug);
			LDEasyWorld.world = world;
			rubeLoader.loadSceneIntoWorld(rubeData,world,new b2Vec2(0,-stage.stageHeight/30));
		}
		protected function update(event:Event):void
		{
			world.Step(1/30,10,10);
			world.ClearForces();
			world.DrawDebugData();
		}
	}
}