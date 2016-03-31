package
{
	import Box2D.Collision.b2WorldManifold;
	import Box2D.Dynamics.b2ContactListener;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	import ldEasyBox2D.LDMath;
	
	public class BallMoveContactListener extends b2ContactListener
	{
		public var isPlayerOnGround:Boolean = false;
		
		public function BallMoveContactListener(){}
		override public function BeginContact(contact:b2Contact):void
		{
			var wm:b2WorldManifold = new b2WorldManifold();
			contact.GetWorldManifold(wm);
			var contactAngle:Number = LDMath.getAngle(wm.m_normal);
			if(contactAngle<-Math.PI/4 && contactAngle> -Math.PI*3/4) isPlayerOnGround = true;
		}
		
		override public function EndContact(contact:b2Contact):void
		{
			isPlayerOnGround = false;
		}
		
	}
}