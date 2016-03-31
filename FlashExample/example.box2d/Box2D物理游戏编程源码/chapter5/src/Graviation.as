package
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;

	[SWF(width="700",height="400")]
	public class Graviation extends AbstractBox2DTest
	{
		public function Graviation(gravity:Number=10)
		{
			super(0);
		}
		public var planet:b2Body, sensor:b2Body, bird:b2Body;
		private var contactListener:GraviationContactListener;
		
		private var planetGravity:Number = 10;
		private var birdManager:BirdThrower;
		override public function box2DAppReady():void
		{
			planet = LDEasyBody.createCircle(500,200,50,1);
			sensor = LDEasyBody.createCircle(500,200,170,0);
			sensor.GetFixtureList().SetSensor(true);
			bird = LDEasyBody.createBox(100,100,20,20);

			birdManager = new BirdThrower(this,bird,100,300);
			
			contactListener = new GraviationContactListener(this);
			world.SetContactListener(contactListener);
		}
		
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			switch(event.type){
				case MouseEvent.MOUSE_DOWN:
				{
					birdManager.onMouseDown(event);
					stage.addEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
					break;
				}
				case MouseEvent.MOUSE_UP:
				{
					birdManager.onMouseUp(event);
					stage.removeEventListener(MouseEvent.MOUSE_MOVE,mouseEventHandler);
					break;
				}
				case MouseEvent.MOUSE_MOVE:
				{
					birdManager.onMouseMove(event);
					break;
				}
			}
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			
			if (contactListener.isBirdInSensor) 
			{
				var force:b2Vec2 = b2Math.SubtractVV(planet.GetPosition(),bird.GetPosition());
				force.Normalize();
				force.Multiply(planetGravity*bird.GetMass());
				bird.ApplyForce(force,bird.GetPosition());
				bird.SetLinearDamping(0.2);
			}
			birdManager.drawTrail();
		}
		
	}
}