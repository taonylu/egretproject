package buoyancy
{
	import Box2D.Dynamics.b2ContactListener;
	import Box2D.Dynamics.b2Fixture;
	import Box2D.Dynamics.Contacts.b2Contact;
	
	public class DemoBuoyancyContactListener2 extends b2ContactListener
	{
		private var waterController:BuoyancyManager2;
		public function DemoBuoyancyContactListener2(waterController:BuoyancyManager2)
		{
			this.waterController = waterController
		}
		override public function BeginContact(contact:b2Contact):void
		{
			var fixtureA:b2Fixture = contact.GetFixtureA();
			var fixtureB:b2Fixture = contact.GetFixtureB();
			if(fixtureA.GetUserData() == "water"){
				waterController.addStuffIntoWater(fixtureB,fixtureA);
			}
			if(fixtureB.GetUserData() == "water"){
				waterController.addStuffIntoWater(fixtureA,fixtureB);
			}
		}
		
		override public function EndContact(contact:b2Contact):void
		{
			var fixtureA:b2Fixture = contact.GetFixtureA();
			var fixtureB:b2Fixture = contact.GetFixtureB();
			if(fixtureA.GetUserData() == "water"){
				waterController.removeStuffFromWater(fixtureB,fixtureA);
			}
			if(fixtureB.GetUserData() == "water"){
				waterController.removeStuffFromWater(fixtureA,fixtureB);
			}
		}
		
	}
}