package
{
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	
	import Box2D.Common.Math.b2Vec2;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.Joints.b2GearJointDef;
	import Box2D.Dynamics.Joints.b2Joint;
	import Box2D.Dynamics.Joints.b2PrismaticJoint;
	import Box2D.Dynamics.Joints.b2PrismaticJointDef;
	import Box2D.Dynamics.Joints.b2RevoluteJoint;
	import Box2D.Dynamics.Joints.b2RevoluteJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyShape;

	[SWF(width="700")]
	public class DemoGearJoint extends AbstractBox2DTest
	{
		public function DemoGearJoint(gravity:Number=10)
		{
			super(10);
		}
		private var player:b2Body;
		private var playerManger:BallMover;
		private var contactListener:BallMoveContactListener;
		
		override public function box2DAppReady():void
		{
			createGearJoint();
			createBodies();
			
			contactListener = new BallMoveContactListener();
			world.SetContactListener(contactListener);
		}
		
		private function createGearJoint():void
		{
			var joint1:b2Joint = getRevoluteJoint(90,200);
			var joint2:b2Joint = getPrismaticJoint(500,200);
			
			var anchor:b2Vec2 = new b2Vec2(250/30,300/30);
			var jointDef:b2GearJointDef = new b2GearJointDef();
			jointDef.joint1 = joint1;
			jointDef.joint2 = joint2;
			jointDef.bodyB = world.GetGroundBody();
			
			world.CreateJoint(jointDef);
		}
		private function getRevoluteJoint(posX:Number,posY:Number):b2RevoluteJoint
		{
			var bodyA:b2Body = world.GetGroundBody();
			var bodyB:b2Body = LDEasyBody.createBox(posX,posY,70,10);
			bodyB.CreateFixture2(LDEasyShape.createBox(10,70),3);
			var anchor:b2Vec2 = bodyB.GetPosition();
			
			var revoJointDef:b2RevoluteJointDef = new b2RevoluteJointDef();
			revoJointDef.Initialize(bodyA,bodyB,anchor);
			revoJointDef.enableMotor = true;
			revoJointDef.motorSpeed = 0;
			revoJointDef.maxMotorTorque = 10;
			var joint:b2RevoluteJoint = world.CreateJoint(revoJointDef) as b2RevoluteJoint;
			return joint;
		}
		private function getPrismaticJoint(posX:Number,posY:Number):b2PrismaticJoint
		{
			var bodyA:b2Body = world.GetGroundBody();
			var bodyB:b2Body = LDEasyBody.createBox(posX,posY,100,10);
			bodyB.CreateFixture2(LDEasyShape.createBox(10,30,-50,-10),3);
			bodyB.CreateFixture2(LDEasyShape.createBox(10,30,50,-10),3);
			
			var anchor:b2Vec2 = new b2Vec2(posX/30,posY/30);
			var axis:b2Vec2 = new b2Vec2(1,0);
			var jointDef:b2PrismaticJointDef = new b2PrismaticJointDef();
			jointDef.Initialize(bodyA,bodyB,anchor,axis);
			
			var joint:b2PrismaticJoint = world.CreateJoint(jointDef) as b2PrismaticJoint;
			return joint;
		}
		private function createBodies():void
		{
			var w:Number = stage.stageWidth;
			var h:Number = stage.stageHeight;
			LDEasyBody.createBox(0,h/2,10,h,0);
			LDEasyBody.createBox(w,h/2,10,h,0);
			LDEasyBody.createBox(w/2,0,w,10,0);
			
			LDEasyBody.createBox(25,200,50,20,0);
			LDEasyBody.createBox(180,200,100,20,0);
			LDEasyBody.createBox(w-50,200,200,20,0);
			
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