package whatis
{
	import flash.geom.Point;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;

	public class WhaisSetTangentSpeed extends AbstractBox2DTest
	{
		public function WhaisSetTangentSpeed(gravity:Number=10)
		{
			super(gravity);
		}
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createConveyor();
			createBody();
			
			world.SetContactListener(new ContactListener());
		}
		
		private function createConveyor():void
		{
			var conveyorWidth:Number = 400;
			var points:Vector.<Point> = new Vector.<Point>();
			var pointNum:Number = 40;
			for (var i:int = 0; i < pointNum; i++) 
			{
				var px:Number = conveyorWidth/pointNum*i;
				var py:Number = 15*Math.sin(px/pointNum);
				points.push(new Point(px,py));
			}
			var conveyor1:b2Body = LDEasyBody.createChain(points);
			conveyor1.SetPosition(new b2Vec2(0,100/30));
			conveyor1.SetUserData(2);
			var conveyor2:b2Body = LDEasyBody.createChain(points);
			conveyor2.SetPosition(new b2Vec2(150/30,200/30));
			conveyor2.SetUserData(-2);
		}
		private function createBody():void
		{
			for (var i:int = 0; i < 10; i++) 
			{
				var b:b2Body = LDEasyBody.createBox(30+i*20,50,10,10);
				b.GetFixtureList().SetFriction(0.8);
			}
		}
	}
}
import Box2D.Collision.b2Manifold;
import Box2D.Dynamics.b2Body;
import Box2D.Dynamics.b2ContactListener;
import Box2D.Dynamics.Contacts.b2Contact;

class ContactListener extends b2ContactListener{
	public function ContactListener():void{
		
	}
	
	override public function PreSolve(contact:b2Contact, oldManifold:b2Manifold):void
	{
		var bodyA:b2Body = contact.GetFixtureA().GetBody();
		var bodyB:b2Body = contact.GetFixtureB().GetBody();
		var speed:Number = 0;
		if(bodyA.GetUserData()!=null) speed = bodyA.GetUserData();
		if(bodyB.GetUserData()!=null) speed = bodyB.GetUserData();
		contact.SetTangentSpeed(speed);
	}
}