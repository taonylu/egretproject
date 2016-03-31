package
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2World;

	public class DemoSimpleBox2DWorld extends Sprite
	{
		private var world:b2World;
		public function DemoSimpleBox2DWorld()
		{
			var gravity:b2Vec2 = new b2Vec2(0,9.8);
			var doSleep:Boolean = true;
			world = new b2World(gravity,doSleep);
		}
		
		protected function loop(event:Event):void
		{
			world.Step(1/30,10,10);
		}		

	}
}