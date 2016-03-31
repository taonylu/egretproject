package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2LineJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyShape;

	[SWF(width="700")]
	public class DemoLineJoint extends AbstractBox2DTest
	{
		public function DemoLineJoint(gravity:Number=10)
		{
			super(gravity);
		}
		private var player:b2Body;
		private var playerManger:BallMover;
		private var contactListener:BallMoveContactListener;
		
		override public function box2DAppReady():void
		{
			createJoint();
			createBodies();
			
			contactListener = new BallMoveContactListener();
			world.SetContactListener(contactListener);
		}
		
		private function createJoint():void
		{
			var bodyA:b2Body = world.GetGroundBody();
			var car:b2Body = LDEasyBody.createBox(200,300,100,10);
			var shape:b2PolygonShape = LDEasyShape.createBox(10,30,-50,-10);
			car.CreateFixture2(shape,3);
			shape = LDEasyShape.createBox(10,30,50,-10);
			car.CreateFixture2(shape,3);
			
			var anchor:b2Vec2 = new b2Vec2(200/30,100/30);
			var axis:b2Vec2 = new b2Vec2(1,0);
			var jointDef:b2LineJointDef = new b2LineJointDef();
			jointDef.Initialize(bodyA,car,anchor,axis);
			jointDef.enableMotor = true;
			jointDef.maxMotorForce = 20;
			jointDef.motorSpeed = 0;
			
			world.CreateJoint(jointDef);
		}
		private function createBodies():void
		{
			var w:Number = stage.stageWidth;
			var h:Number = stage.stageHeight;
			LDEasyBody.createBox(0,h/2,10,h,0);
			LDEasyBody.createBox(w,h/2,10,h,0);
			LDEasyBody.createBox(w/2,0,w,10,0);
			LDEasyBody.createBox(50,h-50,100,100,0);
			LDEasyBody.createBox(w-50,h-50,100,100,0);
			
			player = LDEasyBody.createCircle(50,100,20);
			playerManger = new BallMover(player);
		}
		
		override protected function keyBoardEventHandler(event:KeyboardEvent):void
		{
			if(event.type == KeyboardEvent.KEY_DOWN) playerManger.onKeyDown(event);
			if(event.type == KeyboardEvent.KEY_UP) playerManger.onKeyUp(event);
		}
		
		override protected function update(event:Event):void
		{
			super.update(event);
			world.ClearForces();
			
			playerManger.isReadyToJump = contactListener.isPlayerOnGround;
			playerManger.update();
		}
	}
}