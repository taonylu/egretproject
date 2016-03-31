package
{
	import Box2D.Collision.b2WorldManifold;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2ContactListener;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	public class DemoRayCastContactListener extends b2ContactListener
	{
		public var isPlayerOnGround:Boolean = false;
		
		private var app:DemoRaycast;
		private var tempBodyA:b2Body, tempBodyB:b2Body;
		private var player:b2Body, another:b2Body;
		
		public function DemoRayCastContactListener(main:DemoRaycast)
		{
			app = main;
		}
		override public function BeginContact(contact:b2Contact):void
		{
			var checkResult:Array;
			
			checkResult = sortByOneBody(contact, app.USER_DATA_PLAYER);
			if(checkResult == null) return;
			player = checkResult[0];
			another = checkResult[1];
			isContactWithGround(contact,another,true);
			isContactWithPlatform(contact,another,true);
		}
		
		override public function EndContact(contact:b2Contact):void
		{
			var checkResult:Array;
			
			checkResult = sortByOneBody(contact, app.USER_DATA_PLAYER);
			if(checkResult == null) return;
			another = checkResult[1];
			isContactWithGround(contact,another,false);
			isContactWithPlatform(contact,another,false);
		}
		private function isContactWithGround(contact:b2Contact,ground:b2Body,isBeginContact:Boolean):void{
			if(ground.GetUserData()!= app.USER_DATA_GROUND) return;
			
			var contactPoint:b2Vec2 = getContactPoint(contact);
			contactPoint = ground.GetLocalPoint(contactPoint);
			
			if (isBeginContact) {
				if (contactPoint.y<-50/30) {
					isPlayerOnGround = true;
				}
			}else{
				isPlayerOnGround = false;
			}
		}
		private function isContactWithPlatform(contact:b2Contact,plat:b2Body,isBeginContact:Boolean):void{
			if(plat.GetUserData()!= app.USER_DATA_PLATFORM) return;
			
			var contactPoint:b2Vec2 = getContactPoint(contact);
			contactPoint = plat.GetLocalPoint(contactPoint);
			
			if(isBeginContact){
				if(contactPoint.y<0){
					isPlayerOnGround = true;
				}else{
					contact.SetEnabled(false);
				}
			}else{
				isPlayerOnGround = false;
				contact.SetEnabled(true);
			}
		}
		private function sortByOneBody(contact:b2Contact,targetA:String):Array
		{
			tempBodyA = contact.GetFixtureA().GetBody();
			tempBodyB = contact.GetFixtureB().GetBody();
			var userDataA:String = tempBodyA.GetUserData();
			var userDataB:String = tempBodyB.GetUserData();
			var result:Array;
			if (userDataA== targetA) 
			{
				result = [tempBodyA,tempBodyB];
			}else if(userDataB == targetA){
				result = [tempBodyB,tempBodyA];
			}
			return result;
		}
		private function getContactPoint(contact:b2Contact):b2Vec2{
			var wm:b2WorldManifold = new b2WorldManifold();
			contact.GetWorldManifold(wm);
			var contactPoint:b2Vec2 = wm.m_points[0];
			return contactPoint;
		}
		private function removeFromArray(item:b2Body,arr:Array):void{
			for (var i:int = 0; i < arr.length; i++) 
			{
				if(arr[i]==item) arr.splice(i,1)
			}
		}
	}
}