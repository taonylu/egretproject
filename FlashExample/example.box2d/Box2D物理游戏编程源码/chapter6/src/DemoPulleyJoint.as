package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2PulleyJoint;
	import Box2D.Dynamics.Joints.b2PulleyJointDef;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoPulleyJoint extends AbstractBox2DTest
	{
		public function DemoPulleyJoint(gravity:Number=10)
		{
			super(gravity);
		}
		private var player:b2Body;
		private var playerManger:BallMover;
		private var contactListener:BallMoveContactListener;
		private var pulleyJoint:b2PulleyJoint;
		
		override public function box2DAppReady():void
		{
			createJoint();
			createBodies();
			
			contactListener = new BallMoveContactListener();
			world.SetContactListener(contactListener);
		}
		
		private function createJoint():void
		{
			var bodyA:b2Body = LDEasyBody.createBox(200,270,100,10);
			bodyA.SetFixedRotation(true);
			bodyA.GetFixtureList().SetDensity(30);
			bodyA.ResetMassData();
			var bodyB:b2Body = LDEasyBody.createBox(300,270,100,10);
			bodyB.SetFixedRotation(true);
			bodyB.GetFixtureList().SetDensity(30);
			bodyB.ResetMassData();
			
			var anchorA:b2Vec2 = bodyA.GetPosition();
			var anchorB:b2Vec2 = bodyB.GetPosition();
			var groundA:b2Vec2 = new b2Vec2(200/30,100/30);
			var groundB:b2Vec2 = new b2Vec2(300/30,100/30);
			
			var jointDef:b2PulleyJointDef = new b2PulleyJointDef();
			jointDef.Initialize(bodyA,bodyB,groundA,groundB,anchorA,anchorB,1);
			
			world.CreateJoint(jointDef);
		}
		
		private function createBodies():void
		{
			var w:Number = stage.stageWidth;
			var h:Number = stage.stageHeight;
			LDEasyBody.createBox(0,h/2,10,h,0);
			LDEasyBody.createBox(w,h/2,10,h,0);
			LDEasyBody.createBox(w/2,0,w,10,0);
			
			LDEasyBody.createBox(50,350,100,20,0);
			LDEasyBody.createBox(w-50,150,100,20,0);
			
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
			
			if (contactListener.isPlayerOnGround) 
			{
				playerManger.isReadyToJump = true;
				contactListener.isPlayerOnGround = false;
			}
			playerManger.update();
		}
	}
}