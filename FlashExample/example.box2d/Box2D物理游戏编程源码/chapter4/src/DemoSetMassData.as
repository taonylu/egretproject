package
{
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	import Box2D.Collision.Shapes.b2MassData;
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2BodyDef;
	import Box2D.Dynamics.b2DebugDraw;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyShape;
	
	public class DemoSetMassData extends AbstractBox2DTest
	{
		public function DemoSetMassData()
		{
			super();
		}
		
		private var body:b2Body;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			debug.AppendFlags(b2DebugDraw.e_centerOfMassBit);
			
			createBody();
			var md:b2MassData= new b2MassData();
			body.GetMassData(md);
			
			md.center.Set(0,30/30);
			md.I = md.mass*md.center.LengthSquared() + 20;
			
			body.SetMassData(md);
		}
		
		private function createBody():void
		{
			var bodyDef:b2BodyDef = new b2BodyDef();
			bodyDef.type = b2Body.b2_dynamicBody;
			bodyDef.position.Set(250/30,300/30);
			
			body = world.CreateBody(bodyDef);
			
			var semiCircle:b2PolygonShape = LDEasyShape.createSemiCircle(100,50);
			
			var triangle:b2PolygonShape = new b2PolygonShape();
			var vertices:Vector.<b2Vec2> = new Vector.<b2Vec2>();
			vertices.push(b2Vec2.Make(50/30, 0));
			vertices.push(b2Vec2.Make(-50/30, 0));
			vertices.push(b2Vec2.Make(0, -150/30));
			triangle.SetAsVector(vertices);
			
			body.CreateFixture2(semiCircle,1);
			body.CreateFixture2(triangle,1);
		}
		
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.keyCode!=Keyboard.SPACE) return;
			
			var impulse:b2Vec2 = new b2Vec2(body.GetMass()*2,0);
			if (Math.random()>0.5) impulse.x*=-1;
			body.ApplyImpulse(impulse,body.GetWorldPoint(b2Vec2.Make(0,-20/30)));
		}
		
		
	}
}