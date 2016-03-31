package{
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2ContactListener;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	public class DemoFrictionJointContactListener extends b2ContactListener
	{
		private var app:DemoFrictionJoint;
		public function DemoFrictionJointContactListener(main:DemoFrictionJoint):void{
			app = main;
		}
		override public function BeginContact(contact:b2Contact):void
		{
			var bodyA:b2Body = contact.GetFixtureA().GetBody();
			var bodyB:b2Body = contact.GetFixtureB().GetBody();
			var checkResult:Array = checkByUserData(bodyA,bodyB,app.USER_DATA_PLAYER,app.USER_DATA_BALL);
			if(checkResult) {
				contact.SetEnabled(false);
				app.createFrictionJointTo(checkResult[1]);
			}
		}
		override public function EndContact(contact:b2Contact):void
		{
			var bodyA:b2Body = contact.GetFixtureA().GetBody();
			var bodyB:b2Body = contact.GetFixtureB().GetBody();
			var checkResult:Array = checkByUserData(bodyA,bodyB,app.USER_DATA_PLAYER,app.USER_DATA_BALL);
			if(checkResult) {
				app.destroyFrictionJointWith(checkResult[1]);
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