package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2DistanceJointDef;
	import Box2D.Dynamics.Joints.b2PrismaticJointDef;
	
	import ldEasyBox2D.LDEasyBody;

	public class DemoDistanceJoint extends AbstractBox2DTest
	{
		public function DemoDistanceJoint(gravity:Number=10)
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
			bodyA.SetAngularVelocity(Math.PI/2);
			var bodyB:b2Body = LDEasyBody.createBox(250,110,250,10);
			
			var anchorA:b2Vec2 = new b2Vec2(250/30,210/30);
			var anchorB:b2Vec2 = new b2Vec2(250/30,110/30);
			var jointDef:b2DistanceJointDef = new b2DistanceJointDef();
			jointDef.Initialize(bodyA,bodyB,anchorA,anchorB);
			world.CreateJoint(jointDef);
			
			bodyA = world.GetGroundBody();
			var anchor:b2Vec2 = bodyB.GetPosition();
			var verticalAxis:b2Vec2 = new b2Vec2(0,1);
			var verticalJointDef:b2PrismaticJointDef = new b2PrismaticJointDef();
			verticalJointDef.Initialize(bodyA,bodyB,anchor,verticalAxis);
			world.CreateJoint(verticalJointDef);
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
			
			playerManger.isReadyToJump = contactListener.isPlayerOnGround;
			playerManger.update();
		}
	}
}