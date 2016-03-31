package RUBE
{
	import com.pixeltoyfactory.rube.RubeLoader;
	import com.pixeltoyfactory.rube.RubeRenderer;
	
	import flash.display.Sprite;
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2World;
	
	[SWF(width="800",height="420",frameRate="30")]
	public class DemoRUBE extends Sprite
	{
		[Embed(source = 'RUBE.json', mimeType='application/octet-stream')]
		private var RUBEJson:Class;
		
		private var rubeLoader:RubeLoader;
		private var render:RubeRenderer;
		
		private var world:b2World;
		private var debug:b2DebugDraw;
		private var debugSprite:Sprite;
		public function DemoRUBE(gravity:Number=10)
		{
			createDebug();
			buildGame()
			stage.addEventListener(Event.ENTER_FRAME,update);
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
		}
		private function buildGame():void
		{
			var rubeData:Object = JSON.parse(new RUBEJson());
			
			rubeLoader = new RubeLoader();
			world = rubeLoader.loadWorldFromRube(rubeData);
			world.SetDebugDraw(debug);
			rubeLoader.loadSceneIntoWorld(rubeData,world,new b2Vec2(0,-stage.stageHeight/30));
			
			render = new RubeRenderer(debugSprite,rubeData.image,30,"RUBE/");
		}
		protected function update(event:Event):void
		{
			world.Step(1/30,10,10);
			world.DrawDebugData();
			render.render();
		}
	}
}