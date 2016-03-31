package whatis
{
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyShape;

	public class WhaisSetRestitution extends AbstractBox2DTest
	{
		public function WhaisSetRestitution(gravity:Number=10)
		{
			super(gravity);
		}
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createBody();
			
			world.SetContactListener(new ContactListener());
		}
		private function createBody():void
		{
			var b:b2Body = LDEasyBody.getEmptyBody(250,100);
			var shape1:b2PolygonShape = LDEasyShape.createBox(100,20,0,-10);
			var shape2:b2PolygonShape = LDEasyShape.createSemiCircle(100,20);
			b.CreateFixture2(shape1,3).SetUserData(0);
			b.CreateFixture2(shape2,3).SetUserData(1.2);
		}
	}
}
import Box2D.Collision.b2Manifold;
import Box2D.Dynamics.b2ContactListener;
import Box2D.Dynamics.b2Fixture;
import Box2D.Dynamics.Contacts.b2Contact;

class ContactListener extends b2ContactListener{
	public function ContactListener():void{
		
	}
	
	override public function PreSolve(contact:b2Contact, oldManifold:b2Manifold):void
	{
		var fA:b2Fixture = contact.GetFixtureA();
		var fB:b2Fixture = contact.GetFixtureB();
		var speed:Number;
		if(fA.GetUserData()!=null) speed = fA.GetUserData();
		if(fB.GetUserData()!=null) speed = fB.GetUserData();
		contact.SetRestitution(speed);
	}
}