package whatis
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2BodyDef;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2FixtureDef;
	import Box2D.Dynamics.b2World;

	public class Whatisb2BodyDef extends Sprite
	{
		private var world:b2World;
		private var gravity:b2Vec2;
		private var doSleep:Boolean;
		
		private var debug:b2DebugDraw;
		private var debugSprite:Sprite;
		
		public function Whatisb2BodyDef()
		{
			stage.frameRate=30;
			gravity = new b2Vec2(0,0);
			doSleep = true;
			world = new b2World(gravity,doSleep);
			
			createDebug();
			createBodies();
			
			stage.addEventListener(Event.ENTER_FRAME,loop);
		}	
		
		protected function loop(event:Event):void
		{
			world.Step(1/30,10,10);
			world.ClearForces();
			world.DrawDebugData();

		}

		private function createBodies():void
		{
			var shape:b2PolygonShape = new b2PolygonShape();
			shape.SetAsBox(30/30, 30/30);
			
			var bd:b2BodyDef = new b2BodyDef();
			bd.type = b2Body.b2_dynamicBody;
			bd.position.Set(60/30, 60/30);
			
			var bfd:b2FixtureDef = new b2FixtureDef();
			bfd.shape = shape;
			
			var body1:b2Body = world.CreateBody(bd);
			body1.CreateFixture(bfd);

			bd.position.Set(160/30,160/30);
			bd.angle = 45/180 * Math.PI;
			var body2:b2Body = world.CreateBody(bd);
			body2.CreateFixture(bfd);
			
			bd.position.Set(260/30,60/30);
			bd.awake=false;
			var body3:b2Body = world.CreateBody(bd);
			body3.CreateFixture(bfd);
		}

		private function createDebug():void
		{
			debugSprite = new Sprite();
			
			debug = new b2DebugDraw();
			debug.SetDrawScale(30);
			debug.SetFillAlpha(.5);
			debug.SetLineThickness(1.0);
			debug.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			debug.SetSprite(debugSprite);
			
			world.SetDebugDraw(debug);
			addChild(debug.GetSprite());
		}

	}
}