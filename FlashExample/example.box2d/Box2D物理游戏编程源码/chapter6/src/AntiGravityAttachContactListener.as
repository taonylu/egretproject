package{
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2ContactListener;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	public class AntiGravityAttachContactListener extends b2ContactListener
	{
		public var isPlayerTouchPlanet:Boolean = false;
		public var contactedPlanet:b2Body;
		private var app:DemoWeldJoint;
		public function AntiGravityAttachContactListener(main:DemoWeldJoint):void{
			app = main;
		}
		override public function BeginContact(contact:b2Contact):void
		{
			var bodyA:b2Body = contact.GetFixtureA().GetBody();
			var bodyB:b2Body = contact.GetFixtureB().GetBody();
			var checkResult:Array = checkByUserData(bodyA,bodyB,app.USER_DATA_PLAYER,app.USER_DATA_PLANET);
			if(checkResult) {
				isPlayerTouchPlanet = true;
				contactedPlanet = checkResult[1];
			}else{
				contactedPlanet = null;
			}
		}
		private function checkByUserData(checkA:b2Body,checkB:b2Body,targetA:String,targetB:String):Array
		{
			var userDataA:String = checkA.GetUserData();
			var userDataB:String = checkB.GetUserData();
			var result:Array;
			if (userDataA == targetA && userDataB == targetB) 
			{
				result = [checkA,checkB];
			}else if(userDataA == targetB && userDataB == targetA){
				result = [checkB,checkA];
			}
			return result;
		}
	}
}