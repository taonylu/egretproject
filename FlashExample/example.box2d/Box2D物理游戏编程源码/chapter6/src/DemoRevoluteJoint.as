package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2RevoluteJointDef;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoRevoluteJoint extends AbstractBox2DTest
	{
		public function DemoRevoluteJoint(gravity:Number=10)
		{
			super(20);
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
			var bodyB:b2Body = LDEasyBody.createBox(250,300,250,10);
			bodyB.GetFixtureList().SetRestitution(0);
			
			var anchor:b2Vec2 = new b2Vec2(250/30,300/30);
			var jointDef:b2RevoluteJointDef = new b2RevoluteJointDef();
			jointDef.Initialize(bodyA,bodyB,anchor);
			
			jointDef.enableLimit = true;
			jointDef.lowerAngle = -Math.PI/6;
			jointDef.upperAngle = Math.PI/6;
			jointDef.enableMotor = true;
			jointDef.maxMotorTorque = 150;
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
			
			LDEasyBody.createBox(50,200,100,20,0);
			LDEasyBody.createBox(w-50,200,100,20,0);
			
			player = LDEasyBody.createCircle(50,100,20);
			player.GetFixtureList().SetDensity(10);
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