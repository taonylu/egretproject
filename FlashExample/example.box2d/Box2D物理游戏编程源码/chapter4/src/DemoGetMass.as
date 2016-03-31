package
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.tools.LDBodyTrail;

	public class DemoGetMass extends AbstractBox2DTest
	{
		public function DemoGetMass(gravity:Number=10)
		{
			super(5);
		}
		private var bird:b2Body;
		private var isApplyForce:Boolean;
		private var birdVelocity:b2Vec2;
		private var impulse:b2Vec2;
		private var force:b2Vec2;
		
		private var trail:LDBodyTrail;
		
		override public function box2DAppReady():void
		{
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			
			bird = LDEasyBody.createBox(20,350,20,20);
			
			birdVelocity = new b2Vec2(4,-6);
			bird.SetLinearVelocity(birdVelocity);
			
			impulse = new b2Vec2(10,-20);
			
			var a:b2Vec2 = world.GetGravity().Copy();
			a.y = -a.y;
			force = b2Math.MulFV(bird.GetMass(),a);
			
			isApplyForce = false;
			
			trail = new LDBodyTrail(this,bird);
		}
		
		override protected function mouseEventHandler(event:MouseEvent):void
		{
			if (event.type==MouseEvent.MOUSE_DOWN) 
			{
				impulse = b2Math.MulFV(10,bird.GetLinearVelocity());
				bird.ApplyImpulse(impulse,bird.GetPosition());
				isApplyForce =true;
				trail.setTrailColor(0xFF0000);
			}
		}
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			if (isApplyForce) 
			{
				bird.ApplyForce(force,bird.GetPosition());
			}
			
			trail.update();
		}
	}
}