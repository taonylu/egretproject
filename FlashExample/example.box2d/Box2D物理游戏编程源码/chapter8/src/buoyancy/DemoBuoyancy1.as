package buoyancy
{
	import flash.events.Event;
	
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoBuoyancy1 extends AbstractBox2DTest
	{
		public function DemoBuoyancy1(gravity:Number=10)
		{
			super(gravity);
		}
		private var water:b2Body;
		private var waterControl:BuoyancyManager1;
		private var contactListenr:DemoBuoyancyContactListener1;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createStuff();
			createWater();
			
			contactListenr = new DemoBuoyancyContactListener1(waterControl);
			world.SetContactListener(contactListenr);
		}
		
		private function createStuff():void
		{
			LDEasyBody.createBox(200,100,60,40);
			LDEasyBody.createFan(300,100,60,45);
			LDEasyBody.createRegular(250,100,30,3);
		}
		private function createWater():void
		{
			var body:b2Body = LDEasyBody.createBox(250,300,400,200,0);
			var water:b2Fixture = body.GetFixtureList();
			water.SetSensor(true);
			water.SetDensity(5);
			water.SetUserData("water");
			
			waterControl = new BuoyancyManager1(world);
			waterControl.addWater(water);
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			waterControl.update();
		}
	}
}