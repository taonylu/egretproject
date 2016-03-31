package buoyancy
{
	import flash.events.Event;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2Fixture;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyWorld;

	[SWF(width="500",height="450")]
	public class DemoBuoyancy2 extends AbstractBox2DTest
	{
		public function DemoBuoyancy2(gravity:Number=10)
		{
			super(gravity);
		}
		private var waterControl:BuoyancyManager2;
		private var contactListenr:DemoBuoyancyContactListener2;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createStuff();
			createWater();
			
			contactListenr = new DemoBuoyancyContactListener2(waterControl);
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
			var body1:b2Body = LDEasyBody.createBox(250,200,200,100);
			var water1:b2Fixture = body1.GetFixtureList();
			water1.SetSensor(true);
			water1.SetDensity(4);
			water1.SetUserData("water");
			body1.CreateFixture2(b2PolygonShape.AsOrientedBox(10/30,50/30,new b2Vec2(-100/30,0)),1);
			body1.CreateFixture2(b2PolygonShape.AsOrientedBox(10/30,50/30,new b2Vec2(100/30,0)),1);
			LDEasyWorld.fixBodyAt(body1,250,0);
			
			var body2:b2Body = LDEasyBody.createBox(250,375,500,150,0);
			var water2:b2Fixture = body2.GetFixtureList();
			water2.SetSensor(true);
			water2.SetDensity(5);
			water2.SetUserData("water");
			
			waterControl = new BuoyancyManager2(world);
			waterControl.addWater(water1);
			waterControl.addWater(water2);
			waterControl.debug = debug;
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			waterControl.update();
		}
	}
}