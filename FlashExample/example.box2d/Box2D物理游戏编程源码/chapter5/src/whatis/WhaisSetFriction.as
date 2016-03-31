package whatis
{
	import Box2D.Dynamics.b2Body;
	import ldEasyBox2D.LDEasyBody;

	public class WhaisSetFriction extends AbstractBox2DTest
	{
		private var counter:Number =0;
		private var contactListener:ContactListener;
		
		public function WhaisSetFriction(gravity:Number=10)
		{
			super(gravity);
		}
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createBody();
			
			contactListener = new ContactListener();
			world.SetContactListener(contactListener);
		}
		private function createBody():void
		{
			var b:b2Body = LDEasyBody.createBox(150,300,300,10,0);
			b.SetAngle(Math.PI/10);
			LDEasyBody.createTrapezium(100,100,30,50,30);
		}	
		
	}
}
import Box2D.Collision.b2Manifold;
import Box2D.Collision.b2WorldManifold;
import Box2D.Common.Math.b2Vec2;
import Box2D.Dynamics.b2Body;
import Box2D.Dynamics.b2ContactListener;
import Box2D.Dynamics.Contacts.b2Contact;

class ContactListener extends b2ContactListener{
	public var n:b2Vec2;
	public var p:b2Vec2;
	public function ContactListener():void{
		
	}
	
	override public function PreSolve(contact:b2Contact, oldManifold:b2Manifold):void
	{
		var bodyA:b2Body = contact.GetFixtureA().GetBody();
		var bodyB:b2Body = contact.GetFixtureB().GetBody();
		var body:b2Body;
		if(bodyA.GetType()==b2Body.b2_staticBody && bodyB.GetType()==b2Body.b2_dynamicBody){
			body=bodyB;
		}else if(bodyB.GetType()==b2Body.b2_staticBody && bodyA.GetType()==b2Body.b2_dynamicBody){
			body = bodyA;
		}
		if(body==null) return;
		var wm:b2WorldManifold = new b2WorldManifold();
		contact.GetWorldManifold(wm);
		n = wm.m_normal;
		var normal:b2Vec2 = body.GetLocalVector(wm.m_normal);
		if(normal.y<0){
			contact.SetFriction(0);
		}else{
			contact.SetFriction(1);
		}
		
	}
}