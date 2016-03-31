package
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.tools.LDBodyTrail;

	[SWF(width="600")]
	public class DemoApplyForce extends AbstractBox2DTest
	{
		public function DemoApplyForce(gravity:Number=10)
		{
			super(5);
		}
		private var bird:b2Body;
		
		private var birdVelocity:b2Vec2;
		private var force:b2Vec2;
		private var isApplyFroce:Boolean;
		
		private var trail:LDBodyTrail;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			
			bird = LDEasyBody.createCircle(20,350,10);
			
			birdVelocity = new b2Vec2(5,-10);
			bird.SetLinearVelocity(birdVelocity);
			
			force = new b2Vec2(0,0);
			force.x = -bird.GetMass()*30*1;

			isApplyFroce = false;
			
			trail = new LDBodyTrail(this,bird);
		}
		
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			if (event.type==MouseEvent.MOUSE_DOWN) 
			{
				isApplyFroce = true;
				trail.setTrailColor(0xFF0000);
			}
		}
		override protected function update(event:Event):void
		{
			if (isApplyFroce) 
			{
				bird.ApplyForce(force,bird.GetPosition());
			}
			super.update(event);
			world.ClearForces();
			
			trail.update();
		}

	}
}