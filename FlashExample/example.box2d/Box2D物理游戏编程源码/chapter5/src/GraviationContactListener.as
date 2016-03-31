package
{
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2ContactListener;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	public class GraviationContactListener extends b2ContactListener
	{
		public var isBirdInSensor:Boolean = false;
		
		private var app:Graviation;
		public function GraviationContactListener(main:Graviation)
		{
			app = main;
		}
		
		override public function BeginContact(contact:b2Contact):void
		{
			var bodyA:b2Body = contact.GetFixtureA().GetBody();
			var bodyB:b2Body = contact.GetFixtureB().GetBody();
			var checkResult:Array = checkWithTarget(bodyA,bodyB,app.bird,app.sensor);
			if(checkResult){
				isBirdInSensor = true;
			}
		}
		override public function EndContact(contact:b2Contact):void
		{
			var bodyA:b2Body = contact.GetFixtureA().GetBody();
			var bodyB:b2Body = contact.GetFixtureB().GetBody();
			var checkResult:Array = checkWithTarget(bodyA,bodyB,app.bird,app.sensor);
			
			if(checkResult){
				isBirdInSensor = false;
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