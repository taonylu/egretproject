package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	
	import Box2D.Common.Math.b2Math;
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2DistanceJointDef;
	import Box2D.Dynamics.Joints.b2PrismaticJointDef;
	import Box2D.Dynamics.Joints.b2RevoluteJoint;
	import Box2D.Dynamics.Joints.b2RevoluteJointDef;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoNotDistanceJoint extends AbstractBox2DTest
	{
		public function DemoNotDistanceJoint(gravity:Number=10)
		{
			super(10);
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
			var bodyA:b2Body = LDEasyBody.createCircle(250,250,40,1);
			var bodyB:b2Body = LDEasyBody.createBox(250,100,250,10);
			bodyA.SetAngularVelocity(Math.PI/2);
			var distanceBody:b2Body = LDEasyBody.createBox(250,155,10,110);
			
			var anchor:b2Vec2 = new b2Vec2(250/30,210/30);
			var jointDef:b2RevoluteJointDef = new b2RevoluteJointDef();
			jointDef.Initialize(bodyA,distanceBody,anchor);
			world.CreateJoint(jointDef);
			
			anchor = new b2Vec2(250/30,100/30);
			jointDef.Initialize(bodyB,distanceBody,anchor);
			world.CreateJoint(jointDef);
			
			bodyA = world.GetGroundBody();
			anchor = bodyB.GetPosition();
			var axis:b2Vec2 = new b2Vec2(0,1);
			var jdef:b2PrismaticJointDef = new b2PrismaticJointDef();
			jdef.Initialize(bodyA,bodyB,anchor,axis);
			world.CreateJoint(jdef);
			
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