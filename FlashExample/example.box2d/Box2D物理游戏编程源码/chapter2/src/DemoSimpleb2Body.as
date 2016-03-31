package
{
	import flash.display.Sprite;
	import flash.events.Event;
	import Box2D.Collision.Shapes.b2CircleShape;
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2BodyDef;
	import Box2D.Dynamics.b2FixtureDef;
	import Box2D.Dynamics.b2World;
	
	public class DemoSimpleb2Body extends Sprite
	{
		private var world:b2World;
		private var delta:Number = 1/30;
		private var positionDelta:Number = 10;
		private var velocityDelta:Number = 10;
		
		public function DemoSimpleb2Body()
		{
			stage.frameRate=30;
			createWorld();
			createCircle();
			createRect();
			
			stage.addEventListener(Event.ENTER_FRAME, loop);
		}
		private function createWorld():void
		{
			var gravity:b2Vec2 = new b2Vec2(0,0);
			var doSleep:Boolean = true;
			
			world = new b2World(gravity,doSleep);
		}
		private function createCircle():void
		{
			var bd:b2BodyDef = new b2BodyDef();
			bd.type = b2Body.b2_dynamicBody;
			bd.position = new b2Vec2(100/30,100/30);
			
			var circle:b2CircleShape = new b2CircleShape(60/30);
			var fd:b2FixtureDef = new b2FixtureDef();
			fd.shape = circle;
			
			var body:b2Body = world.CreateBody(bd);
			body.CreateFixture(fd);
		}
		private function createRect():void
		{
			var bd:b2BodyDef = new b2BodyDef();
			bd.type = b2Body.b2_dynamicBody;
			bd.position = new b2Vec2(200/30,100/30);
			
			var rect:b2PolygonShape = new b2PolygonShape();
			rect.SetAsBox(50/30,25/30);
			var fd:b2FixtureDef = new b2FixtureDef();
			fd.shape = rect;
			
			var body:b2Body = world.CreateBody(bd);
			body.CreateFixture(fd);
		}
		protected function loop(event:Event):void
		{
			world.Step(delta,velocityDelta,positionDelta);
		}
	}
}