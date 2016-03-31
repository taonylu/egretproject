package
{
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2ContactImpulse;
	import Box2D.Dynamics.b2ContactListener;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	public class BirdImpulseContactListener extends b2ContactListener
	{
		public var isContacted:Boolean = false;
		public var imp:Number;
		private var app:BirdImpulse;
		public function BirdImpulseContactListener(main:BirdImpulse):void{
			app = main;
		}
		override public function PostSolve(contact:b2Contact, impulse:b2ContactImpulse):void
		{
			var bodyA:b2Body = contact.GetFixtureA().GetBody();
			var bodyB:b2Body = contact.GetFixtureB().GetBody();
			var checkResult:Array = checkWithTarget(bodyA,bodyB,app.bird,app.stone);
			if(checkResult!=null){
				imp = impulse.normalImpulses[0];
				isContacted = true;
			}
		}
		private function checkWithTarget(checkA:b2Body,checkB:b2Body,targetA:b2Body,targetB:b2Body):Array{
			var checkResult:Array;
			if(checkA == targetA && checkB == targetB){
				checkResult=[checkA,checkB];
			}else if(checkA == targetB && checkB == targetA){
				checkResult=[checkB,checkA];
			}
			return checkResult;
		}
	}
}