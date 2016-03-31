package
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.tools.LDBodyTrail;

	public class DemoApplyImpulse extends AbstractBox2DTest
	{
		public function DemoApplyImpulse(gravity:Number=10)
		{
			super(5);
		}
		private var bird:b2Body;
		private var birdVelocity:b2Vec2;
		
		private var impulse:b2Vec2;
		private var trail:LDBodyTrail;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			
			bird = LDEasyBody.createBox(20,350,20,20);
			
			birdVelocity = new b2Vec2(4,-6);
			bird.SetLinearVelocity(birdVelocity);
			
			impulse = new b2Vec2();
			impulse.x = bird.GetMass()*10;
			impulse.y = -bird.GetMass()*10;
			
			trail = new LDBodyTrail(this,bird);
		}
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			if (event.type==MouseEvent.MOUSE_DOWN) 
			{
				bird.ApplyImpulse(impulse,bird.GetPosition());
				
				var bullet:b2Body = LDEasyBody.createCircle(bird.GetPosition().x*30,bird.GetPosition().y*30+20,5);
				var bulletImpulse:b2Vec2 = new b2Vec2(0,bullet.GetMass()*20);
				bullet.ApplyImpulse(bulletImpulse,bullet.GetPosition());
				
				trail.setTrailColor(0xFF0000);
			}
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			
			trail.update();
		}
	}
}